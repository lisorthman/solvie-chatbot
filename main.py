# interactive_chatbot.py
import os
from dotenv import load_dotenv

# Suppress HuggingFace tokenizer warnings
os.environ["TOKENIZERS_PARALLELISM"] = "false"

from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain_groq import ChatGroq

# -----------------------------
# Load environment variables
# -----------------------------
load_dotenv()
groq_api_key = os.getenv("GROQ_API_KEY")
if not groq_api_key:
    raise ValueError("Please set GROQ_API_KEY in your .env file!")

# -----------------------------
# Initialize Groq LLM
# -----------------------------
llm = ChatGroq(
    groq_api_key=groq_api_key,
    model_name="llama-3.1-8b-instant",
    temperature=0.7
)

# -----------------------------
# Step 1: Load PDF
# -----------------------------
pdf_file = "customer_support_guide.pdf"
loader = PyPDFLoader(pdf_file)
pages = loader.load()
print(f"✅ Loaded {len(pages)} pages from PDF")
print("Sample text from page 1:\n", pages[0].page_content[:300])

# -----------------------------
# Step 2: Split into chunks
# -----------------------------
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)
docs = text_splitter.split_documents(pages)
print(f"✅ Split into {len(docs)} chunks")
print("Sample chunk:\n", docs[0].page_content[:500])

# -----------------------------
# Step 3: Create Vector Store
# -----------------------------
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
vectordb = Chroma.from_documents(
    documents=docs,
    embedding=embeddings,
    persist_directory="./chroma_db"
)
print("✅ Vector DB created and persisted at ./chroma_db")

# -----------------------------
# Step 4: Interactive Chat with Memory
# -----------------------------
import json
import os

print("\n💬 You can now ask questions about the PDF. Type 'exit' to quit.\n")

# Load persistent conversation (optional)
conversation_history_file = "chat_history.json"
conversation_history = []

if os.path.exists(conversation_history_file):
    with open(conversation_history_file, "r") as f:
        conversation_history = json.load(f)

MAX_HISTORY = 6  # Number of last messages to keep for context

while True:
    query = input("Your question: ").strip()
    if not query:
        print("⚠️ Please type a question or 'exit' to quit.\n")
        continue

    if query.lower() in ["exit", "quit"]:
        print("👋 Goodbye!")
        break

    # Retrieve top 3 relevant chunks from Chroma
    results = vectordb.similarity_search(query, k=3)
    context = "\n".join([r.page_content for r in results])

    # Build prompt including limited conversation history
    history_text = "\n".join(conversation_history[-MAX_HISTORY:])
    user_message = f"""You are a helpful customer support assistant.
Answer concisely and clearly. Use bullet points for steps.
Do NOT hallucinate—if unknown, say you don't know.

Conversation history:
{history_text}

Context from documents:
{context}

User question:
{query}"""

    # Generate AI response
    try:
        response = llm.invoke(user_message)
        answer = response.content.strip()

        # Print and store in memory
        print(f"\n🤖 AI Response:\n{answer}\n")
        conversation_history.append(f"User: {query}")
        conversation_history.append(f"AI: {answer}")

        # Optional: Save persistent conversation
        with open(conversation_history_file, "w") as f:
            json.dump(conversation_history, f, indent=2)

    except Exception as e:
        print(f"❌ Error generating response: {e}\n")
