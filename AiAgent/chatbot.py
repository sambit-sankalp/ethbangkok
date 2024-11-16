import os
import subprocess
import sys  # Import sys to use sys.executable
from langchain_groq import ChatGroq
from langchain.chains import LLMChain
from langchain_core.prompts import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    MessagesPlaceholder,
)
from langchain_core.messages import SystemMessage
from langchain.chains.conversation.memory import ConversationBufferWindowMemory
from prompts import prompt_data
from cdp_langchain.agent_toolkits import CdpToolkit
from cdp_langchain.utils import CdpAgentkitWrapper
from cdp import Wallet, hash_message
from cdp_langchain.tools import CdpTool
from pydantic import BaseModel, Field
from langgraph.prebuilt import create_react_agent
from langchain_core.messages import HumanMessage

# Initialize LangChain components
groq_api_key = "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"
model = "llama3-8b-8192"
system_prompt = prompt_data 

groq_chat = ChatGroq(groq_api_key=groq_api_key, model_name=model)
conversational_memory_length = 5
memory = ConversationBufferWindowMemory(
    k=conversational_memory_length, memory_key="chat_history", return_messages=True
)

# Attributes required for DSL Parser
required_attributes = [
    "source_address",
    "from_network",
    "to_network",
    "from_asset",
    "to_asset",
    "amount",
    "slippage_tolerance",
    "deadline",
    "max_gas_fee",
]


# # Get all available tools
# tools = cdp_toolkit.get_tools()

# # Create the agent
# agent_executor = create_react_agent(
#     groq_chat,
#     tools=tools,
#     state_modifier="You are a helpful chatbot that can interact with the Sepolia blockchain using CDP AgentKit. You can create wallets and swap tokens"
# )

class InvokeContract(BaseModel):
    """Input argument schema for contract invocation action."""

    def call_invoke_contract(wallet: Wallet, source_chain: str) -> None:
        """Invoke source chain contract using agent's wallet.
            This invocation locks funds into the source chain address

        Args:
            wallet (Wallet): The wallet to sign the message from.

        Returns:
            None

        """

        invocation = wallet.invoke_contract(
        contract_address=get_contract_address(source_chain), # source chain contract address
        abi=get_contract_abi(),
        method="deposit",
        amount=transaction["data"]["amount"],
        asset_id="eth"
        )

        invocation.wait()


    def initialize_agent():
        """Initialize the agent with CDP Agentkit."""
        # TODO: Load the LLM model and CDP Agentkit values from the environment.

        agentkit = CdpAgentkitWrapper(**values)

        # Initialize CDP Agentkit Toolkit and get tools.
        cdp_toolkit = CdpToolkit.from_cdp_agentkit_wrapper(agentkit)
        tools = cdp_toolkit.get_tools()

        # Define a new tool for signing messages.
        invokeTool = CdpTool(
        name="call_invoke_contract",
        description=INVOKE_CONTRACT_PROMPT,
        cdp_agentkit_wrapper=agentkit,
        args_schema=SignMessageInput,
        func=call_invoke_contract,
        )

        all_tools = tools.append(invokeTool)

        # Store buffered conversation history in memory.
        memory = MemorySaver()
        config = {"configurable": {"thread_id": "CDP Agentkit Chatbot Example!"}}

        # Create ReAct Agent using the LLM and CDP Agentkit tools.
        return create_react_agent(
            llm,
            tools=all_tools,
            checkpointer=memory,
            state_modifier="You are a helpful chatbot that can interact on various chains using the Coinbase Developer Platform Agentkit. You have the power lock in user funds into the source chain contract to facilitate intent-based transactions.",
        ), config

    # Function to interact with the agent
    def ask_agent(agent_executor, question: str):
        for chunk in agent_executor.stream(
            {"messages": [HumanMessage(content=question)]},
            {"configurable": {"thread_id": "my_first_agent"}}
        ):

            # return agent response
            return chunk["agent"]["messages"][0].content


def get_missing_fields(data):
    """
    Determine which fields are missing from the transaction data.
    Input should be a dictionary.
    """
    if not isinstance(data, dict):
        raise ValueError("Input data must be a dictionary.")
    return [key for key, value in data.items() if value == ""]

def generate_response(chat_history, user_input):
    prompt = ChatPromptTemplate.from_messages(
        [
            SystemMessage(content=system_prompt),
            MessagesPlaceholder(variable_name="chat_history"),
            HumanMessagePromptTemplate.from_template("{human_input}"),
        ]
    )

    conversation = LLMChain(
        llm=groq_chat,
        prompt=prompt,
        verbose=False,
        memory=memory,
    )
    
    return conversation.predict(human_input=user_input)

