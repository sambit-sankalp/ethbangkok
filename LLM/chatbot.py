from langchain.chains import LLMChain
from langchain_core.prompts import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    MessagesPlaceholder,
)
from langchain_core.messages import SystemMessage
from langchain.chains.conversation.memory import ConversationBufferWindowMemory
from langchain_groq import ChatGroq

# Initialize LangChain components
groq_api_key = "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"
model = "llama3-8b-8192"

groq_chat = ChatGroq(groq_api_key=groq_api_key, model_name=model)
conversational_memory_length = 5
memory = ConversationBufferWindowMemory(
    k=conversational_memory_length, memory_key="chat_history", return_messages=True
)
