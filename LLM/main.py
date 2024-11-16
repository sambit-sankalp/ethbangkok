import logging
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from uuid import uuid4
from redis_client import get_redis_client

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

# Initialize Redis client
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
