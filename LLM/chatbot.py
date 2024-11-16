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


# Helper function to check missing fields
def get_missing_fields(data):
    """
    Determine which fields are missing from the transaction data.
    Input should be a dictionary.
    """
    if not isinstance(data, dict):
        raise ValueError("Input data must be a dictionary.")
    return [key for key, value in data.items() if value == ""]


# Generate chatbot response
def generate_response(chat_history, user_input):
    prompt = ChatPromptTemplate.from_messages(
        [
            SystemMessage(content="You are a helpful bot."),
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
