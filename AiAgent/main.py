import logging
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from uuid import uuid4
from redis_client import get_redis_client
from chatbot import required_attributes, get_missing_fields, generate_response
import re

CHAIN_ID_MAP = {
    "Ethereum": 1,
    "BinanceSmartChain": 56,
    "Polygon": 137,
    "Avalanche": 43114,
    "Arbitrum": 42161,
    "Optimism": 10,
    "Solana": 101,  # Placeholder ID for Solana
    "Sepolia": 11155111,  # Ethereum Sepolia Testnet
    "ScrollSepolia": 534353,  # Scroll Sepolia Testnet
    "ArbitrumSepolia": 421613,  # Arbitrum Sepolia Testnet
}


# Initialize logging
logging.basicConfig(level=logging.INFO)

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your frontend's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

redis_client = get_redis_client()


# Session models for API requests
class SessionRequest(BaseModel):
    session_id: str
    user_input: str


class ConfirmRequest(BaseModel):
    session_id: str


@app.post("/start_session/")
def start_session():
    """
    Start a new chatbot session and initialize data in Redis.
    """
    session_id = str(uuid4())

    # Ensure no key collision in Redis
    while redis_client.exists(session_id):
        logging.warning(f"Session ID collision detected: {session_id}")
        session_id = str(uuid4())

    # Initialize session-specific transaction data as an empty string
    redis_client.set(session_id, "")

    logging.info(f"Session started with session_id: {session_id}")
    return {"session_id": session_id, "message": "Session started successfully."}


def transaction_string_to_dict(transaction_string):
    """
    Converts a Transaction(...) string into a dictionary.
    Example:
        Input: "Transaction(source_address='', destination_address='', from_network='Ethereum', ...)"
        Output: {'source_address': '', 'destination_address': '', 'from_network': 'Ethereum', ...}
    """
    try:
        match = re.search(r"Transaction\((.*)\)", transaction_string)
        if not match:
            raise ValueError("Invalid Transaction string format.")

        content = match.group(1)
        transaction_dict = {}
        for item in content.split(","):
            key, value = item.split("=")
            transaction_dict[key.strip()] = value.strip().strip("'")

        return transaction_dict
    except Exception as e:
        logging.error(f"Error parsing Transaction string: {e}")
        raise ValueError("Failed to parse Transaction string into a dictionary.")


@app.post("/process_input/")
def process_input(request: SessionRequest):
    """
    Process user input, update the session data using LLM, and provide a response.
    """
    session_id = request.session_id
    user_input = request.user_input

    transaction_string = redis_client.get(session_id)
    if transaction_string is None:  # If the key doesn't exist in Redis
        transaction_string = ""
    logging.info(
        f"Transaction string for session {session_id} before update: {transaction_string}"
    )

    llm_prompt = f"""
Session_id:
{session_id}
Every user has a different session id. Treat each user accordingly.
Current transaction data:
{transaction_string}
Do not save this transaction data in your memory. I will give you fresh one every time. Use that to generate response every time.
Keep learning and improving from the chats.
User input: "{user_input}"

Please update the transaction data based on the user's input. Always output the response in the following format:

Transaction(source_address='', destination_address='', from_network='', to_network='', from_asset='', to_asset='', amount='', slippage_tolerance='', deadline='', max_gas_fee='')
Response("Your conversational response here.")

Ensure the format is strictly maintained for every response.
"""

    llm_response = generate_response(transaction_string, llm_prompt)
    logging.info(f"Raw LLM response: {llm_response}")

    try:
        transaction_match = re.search(r"Transaction\((.*)\)", llm_response, re.DOTALL)
        response_match = re.search(r'Response\("(.*?)"\)', llm_response, re.DOTALL)

        if not transaction_match or not response_match:
            raise ValueError(
                "No valid Transaction or Response structure found in LLM response."
            )

        transaction_string = f"Transaction({transaction_match.group(1)})"
        response_string = response_match.group(1)

        logging.info(f"Extracted transaction string: {transaction_string}")
        logging.info(f"Extracted response string: {response_string}")
    except ValueError as e:
        logging.error(f"Failed to parse LLM response: {e}")
        raise HTTPException(status_code=500, detail="LLM response could not be parsed.")

    transaction_dict = transaction_string_to_dict(transaction_string)

    missing_fields = get_missing_fields(transaction_dict)
    logging.info(f"Missing fields for session {session_id}: {missing_fields}")

    redis_client.set(session_id, transaction_string)
    logging.info(
        f"Updated transaction string for session {session_id}: {transaction_string}"
    )

    return {
        "transaction": transaction_string,
        "response": response_string,
        "missing_fields": missing_fields,
    }


@app.get("/get_session/{session_id}")
def get_session_data(session_id: str):
    """
    Retrieve the session data.
    """
    transaction_string = (
        redis_client.get(session_id).decode() if redis_client.exists(session_id) else ""
    )
    if not transaction_string:
        logging.error(f"Session not found or empty: {session_id}")
        raise HTTPException(
            status_code=404, detail="Session not found or no transaction data."
        )

    logging.info(
        f"Retrieved transaction string for session {session_id}: {transaction_string}"
    )
    return {"session_id": session_id, "data": transaction_string}
