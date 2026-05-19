# # from fastapi import APIRouter


# # router = APIRouter()


# # @router.get("/chat")
# # def chat():

# #     return {
# #         "message": "Chat Route Working"
# #     }

# # from fastapi import APIRouter

# # from pydantic import BaseModel

# # from utils.embeddings import get_embedding_model
# # from utils.vectordb import load_vectorstore
# # from utils.chatbot import create_chatbot


# # router = APIRouter()


# # # REQUEST MODEL
# # class ChatRequest(BaseModel):

# #     question: str


# # @router.post("/chat")
# # def chat(
# #     request: ChatRequest
# # ):

# #     # LOAD EMBEDDING MODEL
# #     embedding_model = get_embedding_model()

# #     # LOAD VECTOR DATABASE
# #     vectorstore = load_vectorstore(
# #         embedding_model
# #     )

# #     # CREATE CHATBOT
# #     retrieval_chain = create_chatbot(
# #         vectorstore
# #     )

# #     # ASK QUESTION
# #     response = retrieval_chain.invoke({
# #         "input": request.question
# #     })

# #     return {
# #         "question": request.question,
# #         "answer": response["answer"]
# #     }

# # for session and memory

# from fastapi import APIRouter

# from pydantic import BaseModel

# import uuid

# from utils.embeddings import get_embedding_model
# from utils.vectordb import load_vectorstore
# from utils.chatbot import create_chatbot

# from utils.memory import save_chat, get_chat_history


# router = APIRouter()


# # REQUEST MODEL
# class ChatRequest(BaseModel):

#     session_id: str

#     question: str


# # CREATE SESSION
# @router.get("/create-session")
# def create_session():

#     session_id = str(uuid.uuid4())

#     return {

#         "session_id": session_id

#     }


# # CHAT API
# @router.post("/chat")
# def chat(
#     request: ChatRequest
# ):

#     # LOAD EMBEDDING MODEL
#     embedding_model = get_embedding_model()

#     # LOAD VECTOR DATABASE
#     vectorstore = load_vectorstore(
#         embedding_model
#     )

#     # CREATE CHATBOT
#     retrieval_chain = create_chatbot(
#         vectorstore
#     )

#     # GET MEMORY
#     history = get_chat_history(
#         request.session_id
#     )

#     # MEMORY TEXT
#     memory_context = ""

#     for q, a in history:

#         memory_context += f"\nUser: {q}"

#         memory_context += f"\nAssistant: {a}\n"

#     # FINAL QUESTION
#     final_question = f"""

#     Previous Conversation:

#     {memory_context}

#     Current Question:

#     {request.question}

#     """

#     # ASK QUESTION
#     response = retrieval_chain.invoke({

#         "input": final_question

#     })

#     answer = response["answer"]

#     # SAVE MEMORY
#     save_chat(

#         request.session_id,

#         request.question,

#         answer

#     )

#     return {

#         "answer": answer

#     }


# from fastapi import APIRouter
# from pydantic import BaseModel
# import uuid

# from utils.embeddings import get_embedding_model
# from utils.vectordb import load_vectorstore
# from utils.chatbot import create_chatbot

# from utils.memory import save_chat, get_chat_history

# router = APIRouter()


# # =========================
# # REQUEST MODEL
# # =========================
# class ChatRequest(BaseModel):
#     session_id: str
#     question: str


# # =========================
# # CREATE SESSION
# # =========================
# @router.get("/create-session")
# def create_session():

#     session_id = str(uuid.uuid4())

#     return {
#         "session_id": session_id
#     }


# # =========================
# # CHAT API
# # =========================
# @router.post("/chat")
# def chat(request: ChatRequest):

#     try:

#         # LOAD EMBEDDINGS
#         embedding_model = get_embedding_model()

#         # LOAD VECTOR STORE
#         vectorstore = load_vectorstore(
#             embedding_model
#         )

#         # CREATE CHATBOT
#         retrieval_chain = create_chatbot(
#             vectorstore
#         )

#         # GET CHAT HISTORY
#         history = get_chat_history(
#             request.session_id
#         )

#         # BUILD MEMORY CONTEXT
#         memory_context = ""

#         for q, a in history:

#             memory_context += f"\nUser: {q}"
#             memory_context += f"\nAssistant: {a}\n"

#         # FINAL QUESTION
#         final_question = f"""

#         Previous Conversation:

#         {memory_context}

#         Current Question:

#         {request.question}

#         """

#         # ASK QUESTION
#         response = retrieval_chain.invoke({
#             "input": final_question
#         })

#         answer = response["answer"]

#         # SAVE CHAT
#         save_chat(
#             request.session_id,
#             request.question,
#             answer
#         )

#         return {
#             "answer": answer
#         }

#     except Exception as e:

#         print("CHAT ERROR:", str(e))

#         return {
#             "answer": "Sorry, I encountered an error while processing your request."
#         }

# from fastapi import APIRouter
# from pydantic import BaseModel
# import uuid

# from utils.embeddings import get_embedding_model
# from utils.vectordb import load_vectorstore
# from utils.chatbot import create_chatbot

# from utils.memory import save_chat, get_chat_history

# router = APIRouter()


# # =========================================
# # REQUEST MODEL
# # =========================================

# class ChatRequest(BaseModel):
#     session_id: str
#     question: str


# # =========================================
# # SIMPLE GREETING DETECTOR
# # =========================================

# def is_greeting(text):

#     greetings = [
#         "hi",
#         "hello",
#         "hey",
#         "good morning",
#         "good evening",
#         "thank you",
#         "thanks"
#     ]

#     text = text.lower().strip()

#     return text in greetings


# # =========================================
# # FRIENDLY RESPONSES
# # =========================================

# def greeting_response(text):

#     text = text.lower().strip()

#     responses = {
#         "hi": "Hi! How can I help you today?",
#         "hello": "Hello! Ready to study together?",
#         "hey": "Hey! What would you like to learn today?",
#         "good morning": "Good morning! Hope you're ready for a productive study session.",
#         "good evening": "Good evening! How can I assist you today?",
#         "thank you": "You're welcome! Happy studying.",
#         "thanks": "You're welcome! Let me know if you need anything else."
#     }

#     return responses.get(
#         text,
#         "Hello! How can I help you?"
#     )


# # =========================================
# # CREATE SESSION
# # =========================================

# @router.get("/create-session")
# def create_session():

#     session_id = str(uuid.uuid4())

#     return {
#         "session_id": session_id
#     }


# # =========================================
# # CHAT API
# # =========================================

# @router.post("/chat")
# def chat(request: ChatRequest):

#     try:

#         question = request.question.strip()

#         # =====================================
#         # HANDLE GREETINGS
#         # =====================================

#         if is_greeting(question):

#             answer = greeting_response(question)

#             save_chat(
#                 request.session_id,
#                 question,
#                 answer
#             )

#             return {
#                 "answer": answer
#             }

#         # =====================================
#         # LOAD EMBEDDING MODEL
#         # =====================================

#         embedding_model = get_embedding_model()

#         # =====================================
#         # LOAD VECTOR DATABASE
#         # =====================================

#         vectorstore = load_vectorstore(
#             embedding_model
#         )

#         # =====================================
#         # CREATE CHATBOT
#         # =====================================

#         retrieval_chain = create_chatbot(
#             vectorstore
#         )

#         # =====================================
#         # GET CHAT HISTORY
#         # =====================================

#         history = get_chat_history(
#             request.session_id
#         )

#         # =====================================
#         # BUILD MEMORY CONTEXT
#         # =====================================

#         memory_context = ""

#         # LAST 5 CONVERSATIONS ONLY
#         # Prevents prompt overload

#         recent_history = history[-5:]

#         for q, a in recent_history:

#             memory_context += f"\nUser: {q}"
#             memory_context += f"\nAssistant: {a}\n"

#         # =====================================
#         # FINAL QUESTION
#         # =====================================

#         final_question = f"""

# Previous Conversation:
# {memory_context}

# Current Question:
# {question}

# """

#         # =====================================
#         # ASK QUESTION
#         # =====================================

#         response = retrieval_chain.invoke({

#             "input": final_question

#         })

#         answer = response["answer"]

#         # =====================================
#         # SAVE MEMORY
#         # =====================================

#         save_chat(

#             request.session_id,

#             question,

#             answer

#         )

#         # =====================================
#         # RETURN RESPONSE
#         # =====================================

#         return {

#             "answer": answer

#         }

#     except Exception as e:

#         print("CHAT ERROR:", str(e))

#         return {

#             "answer": "Sorry, I encountered an error while processing your request."

#         }

# from fastapi import APIRouter
# from pydantic import BaseModel
# import uuid

# from utils.embeddings import get_embedding_model
# from utils.vectordb import load_vectorstore
# from utils.chatbot import create_chatbot

# from utils.memory import save_chat, get_chat_history

# router = APIRouter()


# # =========================================
# # REQUEST MODEL
# # =========================================

# class ChatRequest(BaseModel):

#     session_id: str

#     question: str


# # =========================================
# # SIMPLE GREETING DETECTOR
# # =========================================

# def is_greeting(text):

#     greetings = [

#         "hi",
#         "hello",
#         "hey",
#         "good morning",
#         "good evening",
#         "thank you",
#         "thanks"

#     ]

#     text = text.lower().strip()

#     return text in greetings


# # =========================================
# # FRIENDLY RESPONSES
# # =========================================

# def greeting_response(text):

#     text = text.lower().strip()

#     responses = {

#         "hi": "Hi! How can I help you today?",

#         "hello": "Hello! Ready to study together?",

#         "hey": "Hey! What would you like to learn today?",

#         "good morning":
#         "Good morning! Hope you're ready for a productive study session.",

#         "good evening":
#         "Good evening! How can I assist you today?",

#         "thank you":
#         "You're welcome! Happy studying.",

#         "thanks":
#         "You're welcome! Let me know if you need anything else."

#     }

#     return responses.get(

#         text,

#         "Hello! How can I help you?"

#     )


# # =========================================
# # CREATE SESSION
# # =========================================

# @router.get("/create-session")
# def create_session():

#     session_id = str(uuid.uuid4())

#     return {

#         "session_id": session_id

#     }


# # =========================================
# # CHAT API
# # =========================================

# @router.post("/chat")
# def chat(request: ChatRequest):

#     try:

#         question = request.question.strip()

#         # =====================================
#         # HANDLE GREETINGS
#         # =====================================

#         if is_greeting(question):

#             answer = greeting_response(question)

#             save_chat(

#                 request.session_id,

#                 question,

#                 answer

#             )

#             return {

#                 "answer": answer

#             }

#         # =====================================
#         # LOAD EMBEDDING MODEL
#         # =====================================

#         embedding_model = get_embedding_model()

#         # =====================================
#         # LOAD SESSION VECTOR DATABASE
#         # =====================================

#         vectorstore = load_vectorstore(

#             embedding_model,

#             request.session_id

#         )

#         # =====================================
#         # NO PDF UPLOADED
#         # =====================================

#         if vectorstore is None:

#             return {

#                 "answer":
#                 "Please upload a PDF for this chat session first."

#             }

#         # =====================================
#         # CREATE CHATBOT
#         # =====================================

#         retrieval_chain = create_chatbot(
#             vectorstore
#         )

#         # =====================================
#         # GET CHAT HISTORY
#         # =====================================

#         history = get_chat_history(
#             request.session_id
#         )

#         # =====================================
#         # BUILD MEMORY CONTEXT
#         # =====================================

#         memory_context = ""

#         # LAST 5 CONVERSATIONS ONLY

#         recent_history = history[-5:]

#         for q, a in recent_history:

#             memory_context += f"\nUser: {q}"

#             memory_context += f"\nAssistant: {a}\n"

#         # =====================================
#         # FINAL QUESTION
#         # =====================================

#         final_question = f"""

# Previous Conversation:
# {memory_context}

# Current Question:
# {question}

# """

#         # =====================================
#         # ASK QUESTION
#         # =====================================

#         response = retrieval_chain.invoke({

#             "input": final_question

#         })

#         answer = response["answer"]

#         # =====================================
#         # SAVE CHAT MEMORY
#         # =====================================

#         save_chat(

#             request.session_id,

#             question,

#             answer

#         )

#         # =====================================
#         # RETURN RESPONSE
#         # =====================================

#         return {

#             "answer": answer

#         }

#     except Exception as e:

#         print("CHAT ERROR:", str(e))

#         return {

#             # "answer":
#             # "Sorry, I encountered an error while processing your request."
#             "answer":
#             "Oops! Something went wrong while processing your request 😅 Please try again in a moment."

#         }


# from fastapi import APIRouter
# from pydantic import BaseModel
# import uuid

# from utils.embeddings import get_embedding_model
# from utils.vectordb import load_vectorstore
# from utils.chatbot import create_chatbot

# from utils.memory import save_chat, get_chat_history

# router = APIRouter()


# # =========================================
# # REQUEST MODEL
# # =========================================

# class ChatRequest(BaseModel):

#     session_id: str

#     question: str


# # =========================================
# # SIMPLE GREETING DETECTOR
# # =========================================

# def is_greeting(text):

#     greetings = [

#         "hi",
#         "hello",
#         "hey",
#         "good morning",
#         "good evening",
#         "thank you",
#         "thanks"

#     ]

#     text = text.lower().strip()

#     return text in greetings


# # =========================================
# # FRIENDLY RESPONSES
# # =========================================

# def greeting_response(text):

#     text = text.lower().strip()

#     responses = {

#         "hi": "Hi! How can I help you today? 😊",

#         "hello": "Hello! Ready to study together? 📚",

#         "hey": "Hey! What would you like to learn today? ✨",

#         "good morning":
#         "Good morning! Hope you're ready for a productive study session ☀️",

#         "good evening":
#         "Good evening! How can I assist you today? 🌙",

#         "thank you":
#         "You're welcome! Happy studying 💛",

#         "thanks":
#         "You're welcome! Let me know if you need anything else 😊"

#     }

#     return responses.get(

#         text,

#         "Hello! How can I help you? 😊"

#     )


# # =========================================
# # CREATE SESSION
# # =========================================

# @router.get("/create-session")
# def create_session():

#     session_id = str(uuid.uuid4())

#     return {

#         "session_id": session_id

#     }


# # =========================================
# # CHAT API
# # =========================================

# @router.post("/chat")
# def chat(request: ChatRequest):

#     try:

#         question = request.question.strip()

#         # =====================================
#         # HANDLE GREETINGS
#         # =====================================

#         if is_greeting(question):

#             answer = greeting_response(question)

#             save_chat(

#                 request.session_id,

#                 question,

#                 answer

#             )

#             return {

#                 "answer": answer

#             }

#         # =====================================
#         # LOAD EMBEDDING MODEL
#         # =====================================

#         embedding_model = get_embedding_model()

#         # =====================================
#         # LOAD SESSION VECTOR DATABASE
#         # =====================================

#         vectorstore = load_vectorstore(

#             embedding_model,

#             request.session_id

#         )

#         # =====================================
#         # NO PDF UPLOADED
#         # =====================================

#         if vectorstore is None:

#             normal_answer = f"""
# Hey! I can still help explain "{question}" 😊

# Right now there isn't any PDF uploaded in this chat session, so I’ll answer using general knowledge only.

# If you upload a related PDF, I can give more accurate answers, summaries, quiz questions, flashcards, and detailed explanations directly from your document 📄✨
# """

#             save_chat(

#                 request.session_id,

#                 question,

#                 normal_answer

#             )

#             return {

#                 "answer": normal_answer

#             }

#         # =====================================
#         # CREATE CHATBOT
#         # =====================================

#         retrieval_chain = create_chatbot(
#             vectorstore
#         )

#         # =====================================
#         # GET CHAT HISTORY
#         # =====================================

#         history = get_chat_history(
#             request.session_id
#         )

#         # =====================================
#         # BUILD MEMORY CONTEXT
#         # =====================================

#         memory_context = ""

#         # LAST 5 CONVERSATIONS ONLY

#         recent_history = history[-5:]

#         for q, a in recent_history:

#             memory_context += f"\nUser: {q}"

#             memory_context += f"\nAssistant: {a}\n"

#         # =====================================
#         # FINAL QUESTION
#         # =====================================

#         final_question = f"""

# Previous Conversation:
# {memory_context}

# Current Question:
# {question}

# """

#         # =====================================
#         # ASK QUESTION
#         # =====================================

#         response = retrieval_chain.invoke({

#             "input": final_question

#         })

#         answer = response["answer"]

#         # =====================================
#         # SAVE CHAT MEMORY
#         # =====================================

#         save_chat(

#             request.session_id,

#             question,

#             answer

#         )

#         # =====================================
#         # RETURN RESPONSE
#         # =====================================

#         return {

#             "answer": answer

#         }

#     except Exception as e:

#         print("CHAT ERROR:", str(e))

#         return {

#             "answer":
#             "Oops! I had a little trouble processing that request 😅 Please try again in a moment."

#         }




# from fastapi import APIRouter
# from pydantic import BaseModel
# import uuid
# import os
# import re

# from langchain_groq import ChatGroq
# from dotenv import load_dotenv

# from utils.embeddings import get_embedding_model
# from utils.vectordb import load_vectorstore
# from utils.chatbot import create_chatbot
# from utils.memory import save_chat, get_chat_history

# load_dotenv()

# router = APIRouter()


# # =========================================
# # REQUEST MODEL
# # =========================================

# class ChatRequest(BaseModel):
#     session_id: str
#     question: str


# # =========================================
# # TANGLISH / CASUAL DETECTOR
# # Detects Tamil-English mixed messages and
# # pure casual greetings separately so each
# # gets the right response style.
# # =========================================

# TANGLISH_MARKERS = [
#     "enna", "panru", "panra", "panuren", "paniten", "pannalam",
#     "panu", "pannu", "sollu", "solu", "solen", "solren",
#     "iru", "iruken", "irupan", "iruku",
#     "yaru", "yaar", "nee", "naan", "unga", "unaku", "unakku",
#     "venum", "vendum", "illa", "illai", "aama", "aamaa",
#     "seri", "sari", "super", "summa", "romba",
#     "dei", "da", "di", "bro", "machan",
#     "pdf", "upload", "kekalam", "kelunga",
#     "help", "explain", "summary", "quiz",
# ]

# SIMPLE_GREETINGS = {
#     "hi", "hello", "hey", "good morning", "good evening",
#     "good afternoon", "good night",
#     "thank you", "thanks", "thank u", "thx",
#     "ok", "okay", "k", "sure", "noted",
#     "bye", "goodbye", "see you", "tc",
#     "how are you", "how r u", "wassup", "what's up", "whats up",
#     "sup",
# }

# TANGLISH_GREETINGS = {
#     "vanakkam", "hai", "helo",
#     "epdi iruka", "epdi irukkinga", "epdi irukka",
#     "nandri", "romba thanks", "super da", "ok da", "seri da",
# }


# def is_tanglish(text: str) -> bool:
#     lower = text.lower()
#     return any(marker in lower for marker in TANGLISH_MARKERS)


# def is_simple_greeting(text: str) -> bool:
#     lower = text.lower().strip().rstrip("!?.")
#     return lower in SIMPLE_GREETINGS or lower in TANGLISH_GREETINGS


# # =========================================
# # GREETING RESPONSES
# # =========================================

# GREETING_RESPONSES = {
#     "hi":            "Hi! How can I help you today? 😊",
#     "hello":         "Hello! Ready to study together? 📚",
#     "hey":           "Hey! What would you like to learn today?",
#     "good morning":  "Good morning! Hope you have a productive study session ☀️",
#     "good afternoon":"Good afternoon! What are we studying today?",
#     "good evening":  "Good evening! How can I help you?",
#     "good night":    "Good night! Rest well. Come back anytime you need help 😊",
#     "thank you":     "You're welcome! Happy to help 😊",
#     "thanks":        "You're welcome! Let me know if you need anything else.",
#     "thank u":       "Anytime! 😊",
#     "thx":           "No problem! 😊",
#     "ok":            "Sure! Let me know if you need anything.",
#     "okay":          "Got it! What else can I help you with?",
#     "k":             "Alright! Ask me anything.",
#     "sure":          "Great! Go ahead.",
#     "noted":         "Perfect! What's next?",
#     "bye":           "Goodbye! Come back anytime you need help 😊",
#     "goodbye":       "See you! Happy studying 📚",
#     "see you":       "Take care! 😊",
#     "tc":            "Take care! 😊",
#     "how are you":   "I'm doing great and ready to help! What are we studying today?",
#     "how r u":       "All good and ready to help! What do you need?",
#     "wassup":        "All good! What can I help you with?",
#     "what's up":     "Ready to help! What's on your mind?",
#     "whats up":      "Ready to help! What are we studying?",
#     "sup":           "Hey! What can I do for you?",
#     "vanakkam":      "Vanakkam! Enna help venum? 😊",
#     "epdi iruka":    "Naan super ah iruken! Neenga epdi irukkinga? 😄",
#     "epdi irukkinga":"Naan super ah iruken! Enna help venum?",
#     "nandri":        "Illa, mention pannatheenga! Vera enna venum? 😊",
#     "romba thanks":  "Illa, mention pannatheenga! 😊",
#     "super da":      "Haha, nandri! Enna help venum? 😄",
#     "ok da":         "Seri! Enna help venum?",
#     "seri da":       "Seri! Enna panalam?",
# }


# def get_greeting_response(text: str) -> str | None:
#     key = text.lower().strip().rstrip("!?.")
#     return GREETING_RESPONSES.get(key)


# # =========================================
# # GENERAL KNOWLEDGE LLM
# # Used when no PDF is uploaded so the user
# # still gets a real answer, not a brush-off.
# # =========================================

# def get_general_llm():
#     return ChatGroq(
#         groq_api_key=os.getenv("GROQ_API_KEY"),
#         model_name="llama-3.1-8b-instant",
#         temperature=0.3,
#     )


# GENERAL_SYSTEM_PROMPT = """You are POOKOO AI, a smart and friendly study assistant.
# No document has been uploaded in this session, so answer using your own general knowledge.

# Rules:
# - Write in clean plain text — no markdown symbols like **, ##, or __
# - Be clear, warm, and professional
# - Keep answers concise and easy to understand
# - End with a gentle note that uploading a PDF will give more accurate answers

# Respond now."""


# def answer_from_general_knowledge(question: str) -> str:
#     llm = get_general_llm()
#     prompt = f"{GENERAL_SYSTEM_PROMPT}\n\nQuestion: {question}"
#     response = llm.invoke(prompt)
#     # Extract plain text from LangChain message object
#     if hasattr(response, "content"):
#         return response.content
#     return str(response)


# # =========================================
# # TANGLISH LLM
# # Handles casual Tamil-English messages that
# # aren't simple greetings — full LLM so the
# # response feels natural and contextual.
# # =========================================

# TANGLISH_SYSTEM_PROMPT = """You are POOKOO AI — a friendly, smart study assistant.
# The user is chatting casually in Tanglish (Tamil + English mix).

# Reply naturally in friendly Tanglish — mix Tamil and English like a friend texting.
# Keep it short, warm, and conversational.
# Use 1-2 emojis naturally. Never sound formal.

# If the user is asking about a PDF, studying, or getting help — guide them naturally.

# Examples:
# User: "enna panura"
# You: "Summa ready ah iruken 😄 Unaku enna help venum?"

# User: "pdf upload paniten"
# You: "Super! Ippo andha PDF la irundhu questions kekalam, summary edukalam, quiz try pannalam. Enna start pannalam?"

# User: "explain pannu"
# You: "Sure, simple ah solren 😊"

# Respond now in Tanglish."""


# def answer_tanglish(question: str) -> str:
#     llm = get_general_llm()
#     prompt = f"{TANGLISH_SYSTEM_PROMPT}\n\nUser: {question}"
#     response = llm.invoke(prompt)
#     if hasattr(response, "content"):
#         return response.content
#     return str(response)


# # =========================================
# # CREATE SESSION
# # =========================================

# @router.get("/create-session")
# def create_session():
#     return {"session_id": str(uuid.uuid4())}


# # =========================================
# # CHAT API
# # =========================================

# @router.post("/chat")
# def chat(request: ChatRequest):

#     try:

#         question = request.question.strip()

#         # =====================================
#         # STEP 1 — Simple greeting check
#         # Fast lookup, no LLM needed.
#         # =====================================

#         greeting_reply = get_greeting_response(question)

#         if greeting_reply:
#             save_chat(request.session_id, question, greeting_reply)
#             return {"answer": greeting_reply}

#         # =====================================
#         # STEP 2 — Tanglish casual chat
#         # Detected by keyword markers.
#         # Use LLM for natural contextual reply.
#         # =====================================

#         if is_tanglish(question):
#             tanglish_reply = answer_tanglish(question)
#             save_chat(request.session_id, question, tanglish_reply)
#             return {"answer": tanglish_reply}

#         # =====================================
#         # STEP 3 — Load session vectorstore
#         # =====================================

#         embedding_model = get_embedding_model()

#         vectorstore = load_vectorstore(
#             embedding_model,
#             request.session_id,
#         )

#         # =====================================
#         # STEP 4 — No PDF uploaded
#         # Answer from general knowledge instead
#         # of refusing — much better UX.
#         # =====================================

#         if vectorstore is None:

#             general_answer = answer_from_general_knowledge(question)

#             note = (
#                 "\n\nNote: This answer is based on general knowledge. "
#                 "Upload a related PDF to get more precise, document-specific answers."
#             )

#             full_answer = general_answer + note

#             save_chat(request.session_id, question, full_answer)
#             return {"answer": full_answer}

#         # =====================================
#         # STEP 5 — RAG pipeline (PDF uploaded)
#         # =====================================

#         retrieval_chain = create_chatbot(vectorstore)

#         # =====================================
#         # STEP 6 — Build memory context
#         # Last 5 exchanges only to keep the
#         # prompt focused and fast.
#         # =====================================

#         history        = get_chat_history(request.session_id)
#         recent_history = history[-5:]
#         memory_context = ""

#         for q, a in recent_history:
#             memory_context += f"User: {q}\nAssistant: {a}\n\n"

#         final_question = (
#             f"Previous conversation:\n{memory_context}\n"
#             f"Current question:\n{question}"
#             if memory_context
#             else question
#         )

#         # =====================================
#         # STEP 7 — Get answer
#         # =====================================

#         response = retrieval_chain.invoke({"input": final_question})
#         answer   = response["answer"]

#         # =====================================
#         # STEP 8 — Strip any residual markdown
#         # Last-resort cleanup so ** never shows
#         # in the frontend regardless of LLM slip.
#         # =====================================

#         answer = re.sub(r'\*{1,3}', '', answer)   # remove *, **, ***
#         answer = re.sub(r'#{1,6}\s?', '', answer)  # remove #, ##, ###
#         answer = re.sub(r'_{1,2}', '', answer)     # remove _, __
#         answer = re.sub(r'`{1,3}', '', answer)     # remove `, ```
#         answer = re.sub(r'\n{3,}', '\n\n', answer) # collapse excess blank lines
#         answer = answer.strip()

#         save_chat(request.session_id, question, answer)

#         return {"answer": answer}

#     except Exception as e:

#         print("CHAT ERROR:", str(e))

#         return {
#             "answer": "Oops! I had a little trouble with that one 😅 Please try again in a moment."
#         }




# from fastapi import APIRouter
# from pydantic import BaseModel
# import uuid
# import os
# import re

# from langchain_groq import ChatGroq
# from dotenv import load_dotenv

# from utils.embeddings import get_embedding_model
# from utils.vectordb import load_vectorstore
# from utils.chatbot import create_chatbot
# from utils.memory import save_chat, get_chat_history

# load_dotenv()

# router = APIRouter()


# # =========================================
# # REQUEST MODEL
# # =========================================

# class ChatRequest(BaseModel):
#     session_id: str
#     question: str


# # =========================================
# # GREETING RESPONSES
# # Exact-match lookup — no LLM needed.
# # =========================================

# GREETING_RESPONSES = {
#     "hi":             "Hi! How can I help you today? 😊",
#     "hi bro":         "Hi! How can I help you today? 😊",
#     "hii":            "Hi there! 😊 What can I help you with?",
#     "hiii":           "Hey! 😄 Enna help venum?",
#     "hello":          "Hello! Ready to study together? 📚",
#     "hey":            "Hey! What would you like to learn today?",
#     "helo":           "Hey! 😄 Enna help venum?",
#     "hai":            "Hi! What are we studying today? 😊",
#     "yo":             "Yo! 😄 What do you need?",
#     "bro":            "Hey bro! 😄 Enna help venum?",
#     "dude":           "Hey! What's up? 😄",
#     "machan":         "Enna da machan! 😄 Enna help venum?",
#     "dei":            "Enna da! 😄 Solu, enna help venum?",
#     "da":             "Solu! Enna help venum? 😄",
#     "good morning":   "Good morning! Hope you have a productive study session ☀️",
#     "good afternoon": "Good afternoon! What are we studying today?",
#     "good evening":   "Good evening! How can I help you?",
#     "good night":     "Good night! Rest well. Come back anytime you need help 😊",
#     "thank you":      "You're welcome! Happy to help 😊",
#     "thanks":         "You're welcome! Let me know if you need anything else.",
#     "thank u":        "Anytime! 😊",
#     "thx":            "No problem! 😊",
#     "ok":             "Sure! Let me know if you need anything.",
#     "okay":           "Got it! What else can I help you with?",
#     "k":              "Alright! Ask me anything.",
#     "sure":           "Great! Go ahead.",
#     "noted":          "Perfect! What's next?",
#     "bye":            "Goodbye! Come back anytime you need help 😊",
#     "goodbye":        "See you! Happy studying 📚",
#     "see you":        "Take care! 😊",
#     "tc":             "Take care! 😊",
#     "how are you":    "I'm doing great and ready to help! What are we studying today?",
#     "how r u":        "All good and ready to help! What do you need?",
#     "wassup":         "All good! What can I help you with?",
#     "what's up":      "Ready to help! What's on your mind?",
#     "whats up":       "Ready to help! What are we studying?",
#     "sup":            "Hey! What can I do for you?",
#     "vanakkam":       "Vanakkam! Enna help venum? 😊",
#     "vanakam":        "Vanakam! Enna panalam? 😄",
#     "epdi iruka":     "Naan super ah iruken! Neenga epdi irukkinga? 😄",
#     "epdi irukkinga": "Naan super ah iruken! Enna help venum?",
#     "nandri":         "Illa, mention pannatheenga! Vera enna venum? 😊",
#     "romba thanks":   "Illa, mention pannatheenga! 😊",
#     "super da":       "Haha, nandri! Enna help venum? 😄",
#     "ok da":          "Seri! Enna help venum?",
#     "seri da":        "Seri! Enna panalam?",
#     "seri":           "Seri! Enna panalam? 😄",
#     "seri bro":       "Seri da! Enna help venum? 😊",
#     "enna panra":     "Summa tha iruken 😄 Enna help venum?",
#     "enna panura":    "Summa tha iruken 😄 Enna help venum?",
#     "saptiya":        "Illai 😄 Naan AI — saapida matten! Neenga saptingala?",
#     "enna":           "Enna nu sollunga, help panren! 😄",
#     "doubt iruku":     "enna doubt nu solunga , explain panuren !"
  
# }


# def get_greeting_response(text: str):
#     """
#     Normalize and look up in GREETING_RESPONSES.
#     Strips punctuation/whitespace, lowercases.
#     Returns response string or None.
#     """
#     normalized = text.lower().strip()
#     # Strip trailing punctuation
#     normalized = re.sub(r'[!?.]+$', '', normalized).strip()
#     return GREETING_RESPONSES.get(normalized)


# # =========================================
# # TANGLISH MARKERS
# # Only for longer messages that clearly mix
# # Tamil words — NOT triggered by single words
# # =========================================

# TANGLISH_MARKERS = [
#     "panru", "panra", "panuren", "paniten", "pannalam",
#     "pannu", "sollu", "solu", "solen", "solren",
#     "iruken", "irupan", "iruku",
#     "yaru", "yaar", "nee", "naan", "unga", "unaku", "unakku",
#     "venum", "vendum", "illa", "illai", "aama", "aamaa",
#     "summa", "romba",
#     "pdf upload", "kekalam", "kelunga",
#     "purila", "puriyala", "theriyala",
#     "explain pannu", "sollu bro", "help venum",
# ]


# def is_tanglish(text: str) -> bool:
#     """
#     Returns True only if the text is longer than 4 words
#     AND contains a Tanglish marker phrase.
#     Prevents single English words from being misidentified.
#     """
#     lower = text.lower().strip()
#     word_count = len(lower.split())
#     if word_count < 2:
#         return False
#     return any(marker in lower for marker in TANGLISH_MARKERS)


# # =========================================
# # LLM HELPERS
# # =========================================

# def get_llm():
#     return ChatGroq(
#         groq_api_key=os.getenv("GROQ_API_KEY"),
#         model_name="llama-3.1-8b-instant",
#         temperature=0.5,
#     )

# GENERAL_SYSTEM_PROMPT = """You are POOKOO AI — a smart, warm study assistant acting as a student's personal tutor.

# No document has been uploaded yet, so answer using your general knowledge.

# Explanation style:
# 1. State the core idea clearly in one sentence first
# 2. Give a relatable analogy or real example
# 3. Add technical detail if the question needs it
# 4. End with a short recap for complex topics

# Formatting rules — strictly follow:
# - No asterisks, hash symbols, underscores, backticks, or any markdown
# - Headings written as plain text on their own line followed by a colon
# - Clean readable paragraphs with natural spacing
# - Bullet points only when listing multiple items, written as plain dashes
# - No walls of text

# Honesty rules:
# - Never make up facts
# - If uncertain, say so honestly — one honest line beats guessing

# At the very end, add one friendly line suggesting the student can upload a PDF for more focused answers.

# Respond now."""



# def answer_from_general_knowledge(question: str) -> str:
#     llm = get_llm()
#     prompt = f"{GENERAL_SYSTEM_PROMPT}\n\nQuestion: {question}"
#     response = llm.invoke(prompt)
#     return response.content if hasattr(response, "content") else str(response)


# TANGLISH_SYSTEM_PROMPT = """You are POOKOO AI — a friendly study assistant who understands Tanglish naturally.

# The student is chatting casually in Tamil-English mix. Reply in the same comfortable vibe — warm, short, conversational, like a friend who is also good at studying.

# Rules:
# - Keep it short and natural
# - Use 1 to 2 emojis where they fit naturally
# - No markdown symbols at all
# - If they are asking about a topic, guide them warmly and offer to explain further
# - Never sound formal or robotic

# Respond now in friendly Tanglish."""


# def answer_tanglish(question: str) -> str:
#     llm = get_llm()
#     prompt = f"{TANGLISH_SYSTEM_PROMPT}\n\nUser: {question}"
#     response = llm.invoke(prompt)
#     return response.content if hasattr(response, "content") else str(response)


# # =========================================
# # MARKDOWN CLEANER
# # Strips all markdown symbols from any answer
# # before it reaches the frontend.
# # =========================================

# def clean_markdown(text: str) -> str:
#     # Remove bold/italic markers: **, *, __, _
#     text = re.sub(r'\*{1,3}', '', text)
#     text = re.sub(r'_{1,2}', '', text)
#     # Remove heading markers: ##, ###, etc.
#     text = re.sub(r'^#{1,6}\s?', '', text, flags=re.MULTILINE)
#     # Remove backticks (inline code and code blocks)
#     text = re.sub(r'`{1,3}', '', text)
#     # Remove horizontal rules
#     text = re.sub(r'^[-*_]{3,}\s*$', '', text, flags=re.MULTILINE)
#     # Replace markdown bullet "* item" or "- item" at line start with plain "• item"
#     text = re.sub(r'^\s*[\*\-]\s+', '• ', text, flags=re.MULTILINE)
#     # Collapse 3+ blank lines to 2
#     text = re.sub(r'\n{3,}', '\n\n', text)
#     return text.strip()


# # =========================================
# # CREATE SESSION
# # =========================================

# @router.get("/create-session")
# def create_session():
#     return {"session_id": str(uuid.uuid4())}


# # =========================================
# # CHAT API
# # =========================================

# @router.post("/chat")
# def chat(request: ChatRequest):
#     try:
#         question = request.question.strip()
#         if not question:
#             return {"answer": "Please type something! 😊"}

#         # ─────────────────────────────────────────
#         # STEP 1 — Exact greeting lookup (fast path)
#         # Catches: hi, hello, vanakkam, thanks, etc.
#         # ─────────────────────────────────────────
#         greeting_reply = get_greeting_response(question)
#         if greeting_reply:
#             save_chat(request.session_id, question, greeting_reply)
#             return {"answer": greeting_reply}

#         # ─────────────────────────────────────────
#         # STEP 2 — Tanglish casual chat
#         # Only for multi-word Tamil-English mixes
#         # ─────────────────────────────────────────
#         if is_tanglish(question):
#             tanglish_reply = answer_tanglish(question)
#             tanglish_reply = clean_markdown(tanglish_reply)
#             save_chat(request.session_id, question, tanglish_reply)
#             return {"answer": tanglish_reply}

#         # ─────────────────────────────────────────
#         # STEP 3 — Load session vectorstore
#         # ─────────────────────────────────────────
#         embedding_model = get_embedding_model()
#         vectorstore = load_vectorstore(embedding_model, request.session_id)

#         # ─────────────────────────────────────────
#         # STEP 4 — No PDF uploaded → general LLM
#         # ─────────────────────────────────────────
#         if vectorstore is None:
#             general_answer = answer_from_general_knowledge(question)
#             general_answer = clean_markdown(general_answer)
#             note = (
#                 "\n\nIndha topic ku PDF upload panna na more accurate ah "
#                 "explain panna mudiyum 😄"
#             )
#             full_answer = general_answer + note
#             save_chat(request.session_id, question, full_answer)
#             return {"answer": full_answer}

#         # ─────────────────────────────────────────
#         # STEP 5 — RAG pipeline (PDF uploaded)
#         # ─────────────────────────────────────────
#         retrieval_chain = create_chatbot(vectorstore)

#         history = get_chat_history(request.session_id)
#         recent_history = history[-5:]
#         memory_context = ""
#         for q, a in recent_history:
#             memory_context += f"User: {q}\nAssistant: {a}\n\n"

#         final_question = (
#             f"Previous conversation:\n{memory_context}\nCurrent question:\n{question}"
#             if memory_context else question
#         )
       

#         response = retrieval_chain.invoke({"input": final_question})


       
#         answer = response["answer"]
#         answer = clean_markdown(answer)

#         save_chat(request.session_id, question, answer)
#         return {"answer": answer}

#     except Exception as e:
#         print("CHAT ERROR:", str(e))
#         return {
#             "answer": "Oops! I had a little trouble with that one 😅 Please try again in a moment."
#         }


#today

# from fastapi import APIRouter
# from pydantic import BaseModel
# import uuid
# import os
# import re

# from langchain_groq import ChatGroq
# from dotenv import load_dotenv

# from utils.embeddings import get_embedding_model
# from utils.vectordb import load_vectorstore
# from utils.chatbot import create_chatbot
# from utils.memory import save_chat, get_chat_history

# load_dotenv()

# router = APIRouter()


# # =========================================
# # REQUEST MODEL
# # =========================================

# class ChatRequest(BaseModel):
#     session_id: str
#     question: str


# # =========================================
# # GREETING RESPONSES
# # =========================================

# GREETING_RESPONSES = {
#     "hi":             "Hi! How can I help you today? 😊",
#     "hi bro":         "Hi! What are we studying today?",
#     "hii":            "Hi there! What can I help you with?",
#     "hiii":           "Hey! What do you need help with?",
#     "hello":          "Hello! Ready to study together? 📚",
#     "hey":            "Hey! What would you like to learn today?",
#     "helo":           "Hello! How can I help?",
#     "hai":            "Hi! What are we studying today?",
#     "yo":             "Hey! What do you need?",
#     "bro":            "Hey! What can I help you with?",
#     "dude":           "Hey! What's up?",
#     "machan":         "Enna da machan! 😄 Enna help venum?",
#     "dei":            "Enna da! 😄 Solu, enna help venum?",
#     "da":             "Solu! Enna help venum? 😄",
#     "good morning":   "Good morning! Hope you have a productive study session ☀️",
#     "good afternoon": "Good afternoon! What are we studying today?",
#     "good evening":   "Good evening! How can I help you?",
#     "good night":     "Good night! Rest well. Come back anytime you need help 😊",
#     "thank you":      "You're welcome! Happy to help 😊",
#     "thanks":         "You're welcome! Let me know if you need anything else.",
#     "thank u":        "Anytime! 😊",
#     "thx":            "No problem! 😊",
#     "ok":             "Sure! Let me know if you need anything.",
#     "okay":           "Got it! What else can I help you with?",
#     "k":              "Alright! Ask me anything.",
#     "sure":           "Great! Go ahead.",
#     "noted":          "Perfect! What's next?",
#     "bye":            "Goodbye! Come back anytime you need help 😊",
#     "goodbye":        "See you! Happy studying 📚",
#     "see you":        "Take care! 😊",
#     "tc":             "Take care! 😊",
#     "how are you":    "I'm doing well and ready to help! What are we studying today?",
#     "how r u":        "All good and ready to help! What do you need?",
#     "wassup":         "Hey! What can I help you with?",
#     "what's up":      "Ready to help! What's on your mind?",
#     "whats up":       "Ready to help! What are we studying?",
#     "sup":            "Hey! What can I do for you?",
#     "vanakkam":       "Vanakkam! Enna help venum? 😊",
#     "vanakam":        "Vanakam! Enna panalam? 😄",
#     "epdi iruka":     "Naan super ah iruken! Neenga epdi irukkinga? 😄",
#     "epdi irukkinga": "Naan super ah iruken! Enna help venum?",
#     "nandri":         "Illa, mention pannatheenga! Vera enna venum? 😊",
#     "romba thanks":   "Illa, mention pannatheenga! 😊",
#     "super da":       "Haha, nandri! Enna help venum? 😄",
#     "ok da":          "Seri! Enna help venum?",
#     "seri da":        "Seri! Enna panalam?",
#     "seri":           "Seri! Enna panalam? 😄",
#     "seri bro":       "Seri da! Enna help venum? 😊",
#     "enna panra":     "Summa tha iruken 😄 Enna help venum?",
#     "enna panura":    "Summa tha iruken 😄 Enna help venum?",
#     "saptiya":        "Illai 😄 Naan AI — saapida matten! Neenga saptingala?",
#     "enna":           "Enna nu sollunga, help panren! 😄",
#     "doubt iruku":    "Enna doubt nu solunga, explain panuren!",
# }


# def get_greeting_response(text: str):
#     normalized = text.lower().strip()
#     normalized = re.sub(r'[!?.]+$', '', normalized).strip()
#     return GREETING_RESPONSES.get(normalized)


# # =========================================
# # TANGLISH DETECTION
# # Only triggers when the user is clearly
# # writing in Tamil-English mix — NOT for
# # English academic questions
# # =========================================

# # These are strong Tamil-only words/phrases
# # that clearly indicate Tanglish input
# TANGLISH_STRONG_MARKERS = [
#     "panru", "panra", "panuren", "paniten", "pannalam",
#     "pannu", "sollu", "solu", "solen", "solren",
#     "iruken", "irupan",
#     "venum", "vendum",
#     "purila", "puriyala", "theriyala",
#     "explain pannu", "sollu bro", "help venum",
#     "kekalam", "kelunga",
#     "naan ", "nee ", "unga ", "unaku ", "unakku ",
#     "illa da", "illai da", "aama da",
#     "romba nalla", "super da", "seri da",
# ]

# # English academic/question words — if these appear,
# # treat as English question even if some Tamil words present
# ENGLISH_QUESTION_SIGNALS = [
#     "what", "why", "how", "when", "where", "which", "who",
#     "explain", "describe", "define", "list", "compare",
#     "tell me", "give me", "show me", "what is", "what are",
#     "difference between", "advantages", "disadvantages",
#     "example", "information", "extracted", "table", "pdf",
#     "mark", "answer", "question", "concept", "topic",
# ]


# def is_tanglish(text: str) -> bool:
#     """
#     Returns True ONLY when:
#     1. Text has at least 3 words
#     2. Contains a strong Tamil marker
#     3. Does NOT contain English question signals
#        (those should go through the English pipeline)
#     """
#     lower = text.lower().strip()
#     word_count = len(lower.split())

#     if word_count < 3:
#         return False

#     # If the message looks like an academic/PDF question, always use English
#     if any(signal in lower for signal in ENGLISH_QUESTION_SIGNALS):
#         return False

#     return any(marker in lower for marker in TANGLISH_STRONG_MARKERS)


# # =========================================
# # LLM HELPERS
# # =========================================

# def get_llm():
#     return ChatGroq(
#         groq_api_key=os.getenv("GROQ_API_KEY"),
#         model_name="llama-3.1-8b-instant",
#         temperature=0.5,
#     )


# GENERAL_SYSTEM_PROMPT = """You are POOKOO AI — a professional academic study assistant.

# No document has been uploaded. Answer the student's question using your general knowledge.

# Language rule:
# - Respond in English only. No Tamil. No other language.

# Tone:
# - Professional and clear, like a knowledgeable tutor
# - Helpful and accurate, not overly casual

# Explanation style:
# 1. State the core idea clearly in one sentence
# 2. Give a relatable analogy or real-world example
# 3. Add technical detail if the question needs it
# 4. End with a short recap for complex topics

# Formatting rules:
# - No asterisks, hash symbols, underscores, backticks, or any markdown
# - Headings as plain text on their own line followed by a colon
# - Clean readable paragraphs
# - Plain dashes for bullet lists only when listing multiple items
# - No walls of text

# Honesty:
# - Never fabricate facts
# - If uncertain, say so clearly

# At the very end, add one short professional line suggesting the student can upload a PDF for more focused answers.

# Respond now in English:"""


# def answer_from_general_knowledge(question: str) -> str:
#     llm = get_llm()
#     prompt = f"{GENERAL_SYSTEM_PROMPT}\n\nQuestion: {question}"
#     response = llm.invoke(prompt)
#     return response.content if hasattr(response, "content") else str(response)


# TANGLISH_SYSTEM_PROMPT = """You are POOKOO AI — a friendly study assistant who understands Tanglish naturally.

# The student is chatting casually in Tamil-English mix. Reply in the same comfortable vibe — warm, short, conversational, like a knowledgeable friend.

# Rules:
# - Keep it short and natural, 2 to 4 sentences max
# - Use 1 to 2 emojis where they fit
# - No markdown symbols at all
# - If they ask about a topic, guide them warmly and offer to explain further in English
# - Never sound formal or robotic

# Respond now in friendly Tanglish:"""


# def answer_tanglish(question: str) -> str:
#     llm = get_llm()
#     prompt = f"{TANGLISH_SYSTEM_PROMPT}\n\nUser: {question}"
#     response = llm.invoke(prompt)
#     return response.content if hasattr(response, "content") else str(response)


# # =========================================
# # MARKDOWN CLEANER
# # =========================================

# def clean_markdown(text: str) -> str:
#     text = re.sub(r'\*{1,3}', '', text)
#     text = re.sub(r'_{1,2}', '', text)
#     text = re.sub(r'^#{1,6}\s?', '', text, flags=re.MULTILINE)
#     text = re.sub(r'`{1,3}', '', text)
#     text = re.sub(r'^[-*_]{3,}\s*$', '', text, flags=re.MULTILINE)
#     text = re.sub(r'^\s*[\*\-]\s+', '- ', text, flags=re.MULTILINE)
#     text = re.sub(r'\n{3,}', '\n\n', text)
#     return text.strip()


# # =========================================
# # CREATE SESSION
# # =========================================

# @router.get("/create-session")
# def create_session():
#     return {"session_id": str(uuid.uuid4())}


# # =========================================
# # CHAT API
# # =========================================

# @router.post("/chat")
# def chat(request: ChatRequest):
#     try:
#         question = request.question.strip()
#         if not question:
#             return {"answer": "Please type something! 😊"}

#         # ─────────────────────────────────────────
#         # STEP 1 — Exact greeting lookup
#         # ─────────────────────────────────────────
#         greeting_reply = get_greeting_response(question)
#         if greeting_reply:
#             save_chat(request.session_id, question, greeting_reply)
#             return {"answer": greeting_reply}

#         # ─────────────────────────────────────────
#         # STEP 2 — Tanglish casual chat
#         # Only if user clearly writes in Tanglish
#         # AND it is not an academic/PDF question
#         # ─────────────────────────────────────────
#         if is_tanglish(question):
#             tanglish_reply = answer_tanglish(question)
#             tanglish_reply = clean_markdown(tanglish_reply)
#             save_chat(request.session_id, question, tanglish_reply)
#             return {"answer": tanglish_reply}

#         # ─────────────────────────────────────────
#         # STEP 3 — Load session vectorstore
#         # ─────────────────────────────────────────
#         embedding_model = get_embedding_model()
#         vectorstore = load_vectorstore(embedding_model, request.session_id)

#         # ─────────────────────────────────────────
#         # STEP 4 — No PDF uploaded → general LLM
#         # ─────────────────────────────────────────
#         if vectorstore is None:
#             general_answer = answer_from_general_knowledge(question)
#             general_answer = clean_markdown(general_answer)
#             note = "\n\nYou can upload a PDF for more specific and focused answers on this topic."
#             full_answer = general_answer + note
#             save_chat(request.session_id, question, full_answer)
#             return {"answer": full_answer}

#         # ─────────────────────────────────────────
#         # STEP 5 — RAG pipeline (PDF uploaded)
#         # ─────────────────────────────────────────
#         retrieval_chain = create_chatbot(vectorstore)

#         history = get_chat_history(request.session_id)
#         recent_history = history[-5:]
#         memory_context = ""
#         for q, a in recent_history:
#             memory_context += f"User: {q}\nAssistant: {a}\n\n"

#         final_question = (
#             f"Previous conversation:\n{memory_context}\nCurrent question:\n{question}"
#             if memory_context else question
#         )

#         response = retrieval_chain.invoke({"input": final_question})
#         answer = response["answer"]
#         answer = clean_markdown(answer)

#         save_chat(request.session_id, question, answer)
#         return {"answer": answer}

#     except Exception as e:
#         print("CHAT ERROR:", str(e))
#         return {
#             "answer": "Oops! I had a little trouble with that one 😅 Please try again in a moment."
#         }





# from fastapi import APIRouter
# from pydantic import BaseModel
# import uuid
# import os
# import re

# from langchain_groq import ChatGroq
# from dotenv import load_dotenv

# from utils.embeddings import get_embedding_model
# from utils.vectordb import load_vectorstore
# from utils.chatbot import create_chatbot
# from utils.memory import save_chat, get_chat_history

# load_dotenv()

# router = APIRouter()


# # =========================================
# # REQUEST MODEL
# # =========================================

# class ChatRequest(BaseModel):
#     session_id: str
#     question: str


# # =========================================
# # GREETING RESPONSES
# # =========================================

# GREETING_RESPONSES = {
#     "hi":             "Hey there! 👋 Welcome to POOKOO AI. Upload your PDF and let's get started — I'm here to help you ace it! 📄",
#     "hi bro":         "Hey! 😄 Drop your PDF and let's get to work — I've got your back!",
#     "hii":            "Hii! 👋 Great to see you here. Upload a PDF and let's dive into your material!",
#     "hiii":           "Hey hey! 😊 Ready when you are — just upload your PDF and ask away!",
#     "hello":          "Hello! 👋 Welcome! I'm POOKOO AI, your study buddy. Share your PDF and let's get studying! ",
#     "hey":            "Hey! 😊 Good to have you here. Upload your PDF and fire away with your questions!",
#     "helo":           "Hello there! 👋 I'm here and ready to help. Drop your PDF and let's begin!",
#     "hai":            "Hai! 😄 Welcome! Got a PDF ready? Let's get into it together!",
#     "yo":             "Yo! 😄 What are we studying today? Upload your PDF and let's roll!",
#     "bro":            "Hey bro! 😄 Drop your PDF and let's crack it together!",
#     "dude":           "Hey dude! 😄 Ready to study? Upload your PDF and let's go!",
#     "machan":         "Ayyo machan! 😄 Vanakam! PDF upload panni doubt kelu — naan irukken!",
#     "dei":            "Dei! 😄 Enna panrom? PDF pottu doubt kelu, help panren!",
#     "da":             "Enna da! 😄 PDF upload panni questions kelunga — ready ah irukken!",
#     "good morning":   "Good morning! ☀️ Hope you're feeling fresh and focused. Upload your PDF and let's make this a productive session!",
#     "good afternoon": "Good afternoon! 😊 Perfect time to get some solid studying done. Upload your PDF whenever you're ready!",
#     "good evening":   "Good evening! 🌙 Ready for an evening study session? Drop your PDF and let's get into it!",
#     "good night":     "Good night! 😴 Rest well — come back tomorrow and we'll tackle it together. Sweet dreams! 🌙",
#     "thank you":      "Aww, you're so welcome! 😊 That's what I'm here for. Got more questions? Just ask!",
#     "thanks":         "Happy to help! 😄 Any more doubts? I'm right here!",
#     "thank u":        "Anytime! 😊 Keep those questions coming — that's how we learn!",
#     "thx":            "No problem at all! 😄 Ask away whenever you need!",
#     "ok":             "Sure thing! 😊 Let me know if anything else comes up.",
#     "okay":           "Got it! 😊 Feel free to ask anything else from your PDF.",
#     "k":              "Alright! 😄 I'm here whenever you need me.",
#     "sure":           "Great! Go ahead and ask — I'm listening. 😊",
#     "noted":          "Perfect! 😊 What's your next question?",
#     "bye":            "Bye bye! 👋 Come back anytime you need help. All the best for your studies! 📚",
#     "goodbye":        "Goodbye! 😊 Hope the session was helpful. Go crush that exam! 💪",
#     "see you":        "See you soon! 👋 Take care and keep studying! 😄",
#     "tc":             "Take care! 😊 Come back anytime — I'll be here!",
#     "how are you":    "I'm doing great and fully charged to help you! 😄 What are we studying today?",
#     "how r u":        "All good! 😊 Ready and waiting to help. What's your question?",
#     "wassup":         "Hey! 😄 Not much — just waiting to help you study! Upload your PDF and let's go!",
#     "what's up":      "Hey! 😄 All good here. What topic are we tackling today?",
#     "whats up":       "Hey! 😄 Ready to help! Drop your PDF and let's start.",
#     "sup":            "Sup! 😄 What are we studying? Upload your PDF and let's do this!",
#     "vanakkam":       "Vanakkam! 🙏 Semma happy ah iruken! PDF upload panni doubt kelunga — help panren! 😄",
#     "vanakam":        "Vanakam! 🙏 Enna panalam? PDF pottu questions kelunga!",
#     "epdi iruka":     "Naan super ah iruken, nandri! 😄 Neenga epdi irukkinga? PDF ready ah iruka?",
#     "epdi irukkinga": "Naan romba nalla iruken, thanks! 😊 Enna doubt iruku? Sollunga!",
#     "nandri":         "Illa illa, mention pannatheenga! 😄 Vera enna doubt iruku?",
#     "romba thanks":   "Ayyo, mention pannatheenga! 😄 Innum enna help venum?",
#     "super da":       "Haha, nandri da! 😄 Enna next question? Kelu!",
#     "ok da":          "Seri da! 😊 Innum enna kekkanum?",
#     "seri da":        "Seri! 😄 Next doubt enna? Sollu!",
#     "seri":           "Seri! 😄 Innum enna help venum? Ask panu!",
#     "seri bro":       "Seri da bro! 😄 Enna next? Kelu!",
#     "enna panra":     "Summa tha iruken 😄 Neenga enna panringa? PDF pottu doubt kelunga!",
#     "enna panura":    "Summa waiting ah iruken! 😄 PDF upload panni questions kelu!",
#     "saptiya":        "Illai 😄 Naan AI — saapida matten! Neenga saptingala? PDF pottu study pannunga!",
#     "enna":           "Enna nu kelunga da! 😄 Help pannuren!",
#     "doubt iruku":    "Aama sollunga! 😄 Enna doubt nu kelunga — explain pannuren!",
# }


# def get_greeting_response(text: str):
#     normalized = text.lower().strip()
#     normalized = re.sub(r'[!?.]+$', '', normalized).strip()
#     return GREETING_RESPONSES.get(normalized)


# # =========================================
# # TANGLISH DETECTION
# # =========================================

# TANGLISH_STRONG_MARKERS = [
#     "panru", "panra", "panuren", "paniten", "pannalam",
#     "pannu", "sollu", "solu", "solen", "solren",
#     "iruken", "irupan",
#     "venum", "vendum",
#     "purila", "puriyala", "theriyala",
#     "explain pannu", "sollu bro", "help venum",
#     "kekalam", "kelunga",
#     "naan ", "nee ", "unga ", "unaku ", "unakku ",
#     "illa da", "illai da", "aama da",
#     "romba nalla", "super da", "seri da",
# ]

# ENGLISH_QUESTION_SIGNALS = [
#     "what", "why", "how", "when", "where", "which", "who",
#     "explain", "describe", "define", "list", "compare",
#     "tell me", "give me", "show me", "what is", "what are",
#     "difference between", "advantages", "disadvantages",
#     "example", "information", "extracted", "table", "pdf",
#     "mark", "answer", "question", "concept", "topic",
# ]


# def is_tanglish(text: str) -> bool:
#     lower = text.lower().strip()
#     word_count = len(lower.split())

#     if word_count < 3:
#         return False

#     if any(signal in lower for signal in ENGLISH_QUESTION_SIGNALS):
#         return False

#     return any(marker in lower for marker in TANGLISH_STRONG_MARKERS)


# # =========================================
# # LLM HELPERS
# # =========================================

# def get_llm():
#     return ChatGroq(
#         groq_api_key=os.getenv("GROQ_API_KEY"),
#         model_name="llama-3.1-8b-instant",
#         temperature=0.5,
#     )


# # =========================================
# # NO-PDF RESPONSE (replaces general knowledge answering)
# # Uses LLM to generate a warm, varied "please upload PDF" message
# # =========================================

# NO_PDF_SYSTEM_PROMPT = """You are POOKOO AI — a friendly, professional academic assistant.

# The student has asked a question but has NOT uploaded any PDF yet.

# Your ONLY job here is to let the student know warmly and politely that you work exclusively with uploaded PDFs — you do NOT answer from general knowledge.

# Rules:
# - Be warm, friendly, and encouraging — like a helpful mentor or tutor
# - Keep it short: 2 to 3 sentences max
# - DO NOT answer the question at all — not even partially
# - DO NOT say "I don't know" — make it clear this is by design, not a limitation
# - Vary your response naturally — do not use the same phrasing every time
# - Gently encourage them to upload their PDF or study material
# - You may use 1 emoji maximum
# - No markdown symbols whatsoever

# Example tones (do not copy these exactly, vary naturally):
# - "Hey! I work best with your actual study material. Upload your PDF and I'll give you a proper, focused answer on this!"
# - "Good question! To give you the most accurate answer, I'll need your PDF uploaded. Drop it in and let's get into it!"
# - "I'm built to work from your uploaded documents — that way my answers stay precise and relevant to your course. Upload your PDF and we're good to go!"

# Respond now with a short, warm, natural message encouraging the PDF upload:"""


# def answer_no_pdf(question: str) -> str:
#     """Generate a warm, varied 'please upload PDF' response using LLM."""
#     llm = get_llm()
#     prompt = f"{NO_PDF_SYSTEM_PROMPT}\n\nStudent's question: {question}"
#     response = llm.invoke(prompt)
#     return response.content if hasattr(response, "content") else str(response)


# # =========================================
# # TANGLISH CASUAL CHAT
# # =========================================

# TANGLISH_SYSTEM_PROMPT = """You are POOKOO AI — a friendly academic assistant who naturally understands Tanglish.

# The student is chatting casually in Tamil-English mix (Tanglish). Respond warmly in the same Tanglish vibe — like a helpful, knowledgeable senior or friend who genuinely cares about their studies.

# Rules:
# - Keep it short and natural: 2 to 4 sentences max
# - Use 1 to 2 emojis where they feel natural
# - No markdown symbols at all
# - If you genuinely cannot understand what they said, respond warmly and ask them to rephrase — do NOT guess or make up an answer
# - If they ask a study-related question in Tanglish, gently guide them to ask it properly or upload their PDF
# - Never sound robotic or overly formal
# - If their message is unclear or unrecognizable, say something like: "Oops! Seri ah puriyala 😅 Konjam differently sollunga — help pannuren!"

# Respond now in warm, natural Tanglish:"""


# def answer_tanglish(question: str) -> str:
#     llm = get_llm()
#     prompt = f"{TANGLISH_SYSTEM_PROMPT}\n\nUser: {question}"
#     response = llm.invoke(prompt)
#     return response.content if hasattr(response, "content") else str(response)


# # =========================================
# # MARKDOWN CLEANER
# # =========================================

# def clean_markdown(text: str) -> str:
#     text = re.sub(r'\*{1,3}', '', text)
#     text = re.sub(r'_{1,2}', '', text)
#     text = re.sub(r'^#{1,6}\s?', '', text, flags=re.MULTILINE)
#     text = re.sub(r'`{1,3}', '', text)
#     text = re.sub(r'^[-*_]{3,}\s*$', '', text, flags=re.MULTILINE)
#     text = re.sub(r'^\s*[\*\-]\s+', '- ', text, flags=re.MULTILINE)
#     text = re.sub(r'\n{3,}', '\n\n', text)
#     return text.strip()


# # =========================================
# # CREATE SESSION
# # =========================================

# @router.get("/create-session")
# def create_session():
#     return {"session_id": str(uuid.uuid4())}


# # =========================================
# # CHAT API
# # =========================================

# @router.post("/chat")
# def chat(request: ChatRequest):
#     try:
#         question = request.question.strip()
#         if not question:
#             return {"answer": "Please type something! 😊"}

#         # ─────────────────────────────────────────
#         # STEP 1 — Exact greeting lookup
#         # ─────────────────────────────────────────
#         greeting_reply = get_greeting_response(question)
#         if greeting_reply:
#             save_chat(request.session_id, question, greeting_reply)
#             return {"answer": greeting_reply}

#         # ─────────────────────────────────────────
#         # STEP 2 — Tanglish casual chat
#         # Only if user clearly writes in Tanglish
#         # AND it is not an academic/PDF question
#         # ─────────────────────────────────────────
#         if is_tanglish(question):
#             tanglish_reply = answer_tanglish(question)
#             tanglish_reply = clean_markdown(tanglish_reply)
#             save_chat(request.session_id, question, tanglish_reply)
#             return {"answer": tanglish_reply}

#         # ─────────────────────────────────────────
#         # STEP 3 — Load session vectorstore
#         # ─────────────────────────────────────────
#         embedding_model = get_embedding_model()
#         vectorstore = load_vectorstore(embedding_model, request.session_id)

#         # ─────────────────────────────────────────
#         # STEP 4 — No PDF uploaded → warm redirect
#         # (No general knowledge answering)
#         # ─────────────────────────────────────────
#         if vectorstore is None:
#             no_pdf_reply = answer_no_pdf(question)
#             no_pdf_reply = clean_markdown(no_pdf_reply)
#             save_chat(request.session_id, question, no_pdf_reply)
#             return {"answer": no_pdf_reply}

#         # ─────────────────────────────────────────
#         # STEP 5 — RAG pipeline (PDF uploaded)
#         # ─────────────────────────────────────────
#         retrieval_chain = create_chatbot(vectorstore)

#         history = get_chat_history(request.session_id)
#         recent_history = history[-5:]
#         memory_context = ""
#         for q, a in recent_history:
#             memory_context += f"User: {q}\nAssistant: {a}\n\n"

#         final_question = (
#             f"Previous conversation:\n{memory_context}\nCurrent question:\n{question}"
#             if memory_context else question
#         )

#         response = retrieval_chain.invoke({"input": final_question})
#         answer = response["answer"]
#         answer = clean_markdown(answer)

#         save_chat(request.session_id, question, answer)
#         return {"answer": answer}

#     except Exception as e:
#         print("CHAT ERROR:", str(e))
#         return {
#             "answer": "Oops! Something went sideways on my end 😅 Give it another shot in a moment!"
#         }





# from fastapi import APIRouter
# from pydantic import BaseModel
# import uuid
# import os
# import re

# from langchain_groq import ChatGroq
# from dotenv import load_dotenv

# from utils.embeddings import get_embedding_model
# from utils.vectordb import load_vectorstore
# from utils.chatbot import create_chatbot
# from utils.memory import save_chat, get_chat_history

# load_dotenv()

# router = APIRouter()


# # =========================================
# # REQUEST MODEL
# # =========================================

# class ChatRequest(BaseModel):
#     session_id: str
#     question: str


# # =========================================
# # GREETING RESPONSES
# # Exact-match lookup — no LLM needed.
# # =========================================

# GREETING_RESPONSES = {
#     "hi":             "Hey there! 👋 Welcome to POOKOO AI. Upload your PDF and let's get started — I'm here to help you ace it! 📄",
#     "hi bro":         "Hey! 😄 Drop your PDF and let's get to work — I've got your back!",
#     "hii":            "Hii! 👋 Great to see you here. Upload a PDF and let's dive into your material!",
#     "hiii":           "Hey hey! 😊 Ready when you are — just upload your PDF and ask away!",
#     "hello":          "Hello! 👋 Welcome! I'm POOKOO AI, your study buddy. Share your PDF and let's get studying!",
#     "hey":            "Hey! 😊 Good to have you here. Upload your PDF and fire away with your questions!",
#     "helo":           "Hello there! 👋 I'm here and ready to help. Drop your PDF and let's begin!",
#     "hai":            "Hai! 😄 Welcome! Got a PDF ready? Let's get into it together!",
#     "yo":             "Yo! 😄 What are we studying today? Upload your PDF and let's roll!",
#     "bro":            "Hey bro! 😄 Drop your PDF and let's crack it together!",
#     "dude":           "Hey dude! 😄 Ready to study? Upload your PDF and let's go!",
#     "machan":         "Ayyo machan! 😄 Vanakam! PDF upload panni doubt kelu — naan irukken!",
#     "dei":            "Dei! 😄 Enna panrom? PDF pottu doubt kelu, help panren!",
#     "da":             "Enna da! 😄 PDF upload panni questions kelunga — ready ah irukken!",
#     "good morning":   "Good morning! ☀️ Hope you're feeling fresh and focused. Upload your PDF and let's make this a productive session!",
#     "good afternoon": "Good afternoon! 😊 Perfect time to get some solid studying done. Upload your PDF whenever you're ready!",
#     "good evening":   "Good evening! 🌙 Ready for an evening study session? Drop your PDF and let's get into it!",
#     "good night":     "Good night! 😴 Rest well — come back tomorrow and we'll tackle it together. Sweet dreams! 🌙",
#     "thank you":      "Aww, you're so welcome! 😊 That's what I'm here for. Got more questions? Just ask!",
#     "thanks":         "Happy to help! 😄 Any more doubts? I'm right here!",
#     "thank u":        "Anytime! 😊 Keep those questions coming — that's how we learn!",
#     "thx":            "No problem at all! 😄 Ask away whenever you need!",
#     "ok":             "Sure thing! 😊 Let me know if anything else comes up.",
#     "okay":           "Got it! 😊 Feel free to ask anything else from your PDF.",
#     "k":              "Alright! 😄 I'm here whenever you need me.",
#     "sure":           "Great! Go ahead and ask — I'm listening. 😊",
#     "noted":          "Perfect! 😊 What's your next question?",
#     "bye":            "Bye bye! 👋 Come back anytime you need help. All the best for your studies! 📚",
#     "goodbye":        "Goodbye! 😊 Hope the session was helpful. Go crush that exam! 💪",
#     "see you":        "See you soon! 👋 Take care and keep studying! 😄",
#     "tc":             "Take care! 😊 Come back anytime — I'll be here!",
#     "how are you":    "I'm doing great and fully charged to help you! 😄 What are we studying today?",
#     "how r u":        "All good! 😊 Ready and waiting to help. What's your question?",
#     "wassup":         "Hey! 😄 Not much — just waiting to help you study! Upload your PDF and let's go!",
#     "what's up":      "Hey! 😄 All good here. What topic are we tackling today?",
#     "whats up":       "Hey! 😄 Ready to help! Drop your PDF and let's start.",
#     "sup":            "Sup! 😄 What are we studying? Upload your PDF and let's do this!",
#     "vanakkam":       "Vanakkam! 🙏 Semma happy ah iruken! PDF upload panni doubt kelunga — help panren! 😄",
#     "vanakam":        "Vanakam! 🙏 Enna panalam? PDF pottu questions kelunga!",
#     "epdi iruka":     "Naan super ah iruken, nandri! 😄 Neenga epdi irukkinga? PDF ready ah iruka?",
#     "epdi irukkinga": "Naan romba nalla iruken, thanks! 😊 Enna doubt iruku? Sollunga!",
#     "nandri":         "Illa illa, mention pannatheenga! 😄 Vera enna doubt iruku?",
#     "romba thanks":   "Ayyo, mention pannatheenga! 😄 Innum enna help venum?",
#     "super da":       "Haha, nandri da! 😄 Enna next question? Kelu!",
#     "ok da":          "Seri da! 😊 Innum enna kekkanum?",
#     "seri da":        "Seri! 😄 Next doubt enna? Sollu!",
#     "seri":           "Seri! 😄 Innum enna help venum? Ask panu!",
#     "seri bro":       "Seri da bro! 😄 Enna next? Kelu!",
#     "enna panra":     "Summa tha iruken 😄 Neenga enna panringa? PDF pottu doubt kelunga!",
#     "enna panura":    "Summa waiting ah iruken! 😄 PDF upload panni questions kelu!",
#     "saptiya":        "Illai 😄 Naan AI — saapida matten! Neenga saptingala? PDF pottu study pannunga!",
#     "enna":           "Enna nu kelunga da! 😄 Help pannuren!",
#     "doubt iruku":    "Aama sollunga! 😄 Enna doubt nu kelunga — explain pannuren!",
# }


# def get_greeting_response(text: str):
#     """
#     Normalize and look up in GREETING_RESPONSES.
#     Strips punctuation/whitespace, lowercases.
#     Returns response string or None.
#     """
#     normalized = text.lower().strip()
#     # Strip trailing punctuation
#     normalized = re.sub(r'[!?.]+$', '', normalized).strip()
#     return GREETING_RESPONSES.get(normalized)


# # =========================================
# # TANGLISH MARKERS
# # Only for longer messages that clearly mix
# # Tamil words — NOT triggered by single words
# # =========================================

# TANGLISH_STRONG_MARKERS = [
#     "panru", "panra", "panuren", "paniten", "pannalam",
#     "pannu", "sollu", "solu", "solen", "solren",
#     "iruken", "irupan",
#     "venum", "vendum",
#     "purila", "puriyala", "theriyala",
#     "explain pannu", "sollu bro", "help venum",
#     "kekalam", "kelunga",
#     "naan ", "nee ", "unga ", "unaku ", "unakku ",
#     "illa da", "illai da", "aama da",
#     "romba nalla", "super da", "seri da",
# ]

# ENGLISH_QUESTION_SIGNALS = [
#     "what", "why", "how", "when", "where", "which", "who",
#     "explain", "describe", "define", "list", "compare",
#     "tell me", "give me", "show me", "what is", "what are",
#     "difference between", "advantages", "disadvantages",
#     "example", "information", "extracted", "table", "pdf",
#     "mark", "answer", "question", "concept", "topic",
# ]


# def is_tanglish(text: str) -> bool:
#     """
#     Returns True only if the text is longer than 3 words,
#     contains a strong Tanglish marker phrase,
#     AND does not look like an English academic question.
#     Prevents English questions from being misidentified.
#     """
#     lower = text.lower().strip()
#     word_count = len(lower.split())

#     if word_count < 3:
#         return False

#     if any(signal in lower for signal in ENGLISH_QUESTION_SIGNALS):
#         return False

#     return any(marker in lower for marker in TANGLISH_STRONG_MARKERS)


# # =========================================
# # LLM HELPERS
# # =========================================

# def get_llm():
#     return ChatGroq(
#         groq_api_key=os.getenv("GROQ_API_KEY"),
#         model_name="llama-3.1-8b-instant",
#         temperature=0.5,
#     )


# # =========================================
# # NO-PDF RESPONSE
# # Uses LLM to generate a warm, varied
# # "please upload PDF" message.
# # No general knowledge answering.
# # =========================================

# NO_PDF_SYSTEM_PROMPT = """You are POOKOO AI — a friendly, professional academic assistant.

# The student has asked a question but has NOT uploaded any PDF yet.

# Your ONLY job here is to let the student know warmly and politely that you work exclusively with uploaded PDFs — you do NOT answer from general knowledge.

# Rules:
# - Be warm, friendly, and encouraging — like a helpful mentor or tutor
# - Keep it short: 2 to 3 sentences max
# - DO NOT answer the question at all — not even partially
# - DO NOT say "I don't know" — make it clear this is by design, not a limitation
# - Vary your response naturally — do not use the same phrasing every time
# - Gently encourage them to upload their PDF or study material
# - You may use 1 emoji maximum
# - No markdown symbols whatsoever

# Example tones (do not copy these exactly, vary naturally):
# - "Hey! I work best with your actual study material. Upload your PDF and I'll give you a proper, focused answer on this!"
# - "Good question! To give you the most accurate answer, I'll need your PDF uploaded. Drop it in and let's get into it!"
# - "I'm built to work from your uploaded documents — that way my answers stay precise and relevant to your course. Upload your PDF and we're good to go!"

# Respond now with a short, warm, natural message encouraging the PDF upload:"""


# def answer_no_pdf(question: str) -> str:
#     """Generate a warm, varied 'please upload PDF' response using LLM."""
#     llm = get_llm()
#     prompt = f"{NO_PDF_SYSTEM_PROMPT}\n\nStudent's question: {question}"
#     response = llm.invoke(prompt)
#     return response.content if hasattr(response, "content") else str(response)


# # =========================================
# # TANGLISH CASUAL CHAT
# # =========================================

# TANGLISH_SYSTEM_PROMPT = """You are POOKOO AI — a friendly academic assistant who naturally understands Tanglish.

# The student is chatting casually in Tamil-English mix (Tanglish). Respond warmly in the same Tanglish vibe — like a helpful, knowledgeable senior or friend who genuinely cares about their studies.

# Rules:
# - Keep it short and natural: 2 to 4 sentences max
# - Use 1 to 2 emojis where they feel natural
# - No markdown symbols at all
# - If you genuinely cannot understand what they said, respond warmly and ask them to rephrase — do NOT guess or make up an answer
# - If they ask a study-related question in Tanglish, gently guide them to ask it properly or upload their PDF
# - Never sound robotic or overly formal
# - If their message is unclear or unrecognizable, say something like: "Oops! Seri ah puriyala 😅 Konjam differently sollunga — help pannuren!"

# Respond now in warm, natural Tanglish:"""


# def answer_tanglish(question: str) -> str:
#     llm = get_llm()
#     prompt = f"{TANGLISH_SYSTEM_PROMPT}\n\nUser: {question}"
#     response = llm.invoke(prompt)
#     return response.content if hasattr(response, "content") else str(response)


# # =========================================
# # MARKDOWN CLEANER
# # Strips all markdown symbols from any answer
# # before it reaches the frontend.
# # =========================================

# def clean_markdown(text: str) -> str:
#     # Remove bold/italic markers: **, *, __, _
#     text = re.sub(r'\*{1,3}', '', text)
#     text = re.sub(r'_{1,2}', '', text)
#     # Remove heading markers: ##, ###, etc.
#     text = re.sub(r'^#{1,6}\s?', '', text, flags=re.MULTILINE)
#     # Remove backticks (inline code and code blocks)
#     text = re.sub(r'`{1,3}', '', text)
#     # Remove horizontal rules
#     text = re.sub(r'^[-*_]{3,}\s*$', '', text, flags=re.MULTILINE)
#     # Replace markdown bullet "* item" or "- item" at line start with plain dash
#     text = re.sub(r'^\s*[\*\-]\s+', '- ', text, flags=re.MULTILINE)
#     # Collapse 3+ blank lines to 2
#     text = re.sub(r'\n{3,}', '\n\n', text)
#     return text.strip()


# # =========================================
# # CREATE SESSION
# # =========================================

# @router.get("/create-session")
# def create_session():
#     return {"session_id": str(uuid.uuid4())}


# # =========================================
# # CHAT API
# # =========================================

# @router.post("/chat")
# def chat(request: ChatRequest):
#     try:
#         question = request.question.strip()
#         if not question:
#             return {"answer": "Please type something! 😊"}

#         # ─────────────────────────────────────────
#         # STEP 1 — Exact greeting lookup (fast path)
#         # Catches: hi, hello, vanakkam, thanks, etc.
#         # ─────────────────────────────────────────
#         greeting_reply = get_greeting_response(question)
#         if greeting_reply:
#             save_chat(request.session_id, question, greeting_reply)
#             return {"answer": greeting_reply}

#         # ─────────────────────────────────────────
#         # STEP 2 — Tanglish casual chat
#         # Only for multi-word Tamil-English mixes
#         # AND not an English academic question
#         # ─────────────────────────────────────────
#         if is_tanglish(question):
#             tanglish_reply = answer_tanglish(question)
#             tanglish_reply = clean_markdown(tanglish_reply)
#             save_chat(request.session_id, question, tanglish_reply)
#             return {"answer": tanglish_reply}

#         # ─────────────────────────────────────────
#         # STEP 3 — Load session vectorstore
#         # ─────────────────────────────────────────
#         embedding_model = get_embedding_model()
#         vectorstore = load_vectorstore(embedding_model, request.session_id)

#         # ─────────────────────────────────────────
#         # STEP 4 — No PDF uploaded → warm redirect
#         # (No general knowledge answering)
#         # ─────────────────────────────────────────
#         if vectorstore is None:
#             no_pdf_reply = answer_no_pdf(question)
#             no_pdf_reply = clean_markdown(no_pdf_reply)
#             save_chat(request.session_id, question, no_pdf_reply)
#             return {"answer": no_pdf_reply}

#         # ─────────────────────────────────────────
#         # STEP 5 — RAG pipeline (PDF uploaded)
#         # ─────────────────────────────────────────
#         retrieval_chain = create_chatbot(vectorstore)

#         history = get_chat_history(request.session_id)
#         recent_history = history[-5:]
#         memory_context = ""
#         for q, a in recent_history:
#             memory_context += f"User: {q}\nAssistant: {a}\n\n"

#         final_question = (
#             f"Previous conversation:\n{memory_context}\nCurrent question:\n{question}"
#             if memory_context else question
#         )

#         response = retrieval_chain.invoke({"input": final_question})

#         answer = response["answer"]
#         answer = clean_markdown(answer)

#         save_chat(request.session_id, question, answer)
#         return {"answer": answer}

#     except Exception as e:
#         print("CHAT ERROR:", str(e))
#         return {
#             "answer": "Oops! I had a little trouble with that one 😅 Please try again in a moment."
#         }



from fastapi import APIRouter
from pydantic import BaseModel
import uuid
import os
import re

from langchain_groq import ChatGroq
from dotenv import load_dotenv

from utils.embeddings import get_embedding_model
from utils.vectordb import load_vectorstore
from utils.chatbot import create_chatbot
from utils.memory import save_chat, get_chat_history

load_dotenv()

router = APIRouter()


# =========================================
# REQUEST MODEL
# =========================================

class ChatRequest(BaseModel):
    session_id: str
    question: str


# =========================================
# GREETING RESPONSES
# Exact-match lookup — no LLM needed.
# =========================================

GREETING_RESPONSES = {
    "hi":             "Hey there! 👋 Welcome to POOKOO AI. Upload your PDF and let's get started — I'm here to help you ace it! 📄",
    "hi bro":         "Hey! 😄 Drop your PDF and let's get to work — I've got your back!",
    "hii":            "Hii! 👋 Great to see you here. Upload a PDF and let's dive into your material!",
    "hiii":           "Hey hey! 😊 Ready when you are — just upload your PDF and ask away!",
    "hello":          "Hello! 👋 Welcome! I'm POOKOO AI, your study buddy. Share your PDF and let's get studying!",
    "hey":            "Hey! 😊 Good to have you here. Upload your PDF and fire away with your questions!",
    "helo":           "Hello there! 👋 I'm here and ready to help. Drop your PDF and let's begin!",
    "hai":            "Hai! 😄 Welcome! Got a PDF ready? Let's get into it together!",
    "yo":             "Yo! 😄 What are we studying today? Upload your PDF and let's roll!",
    "bro":            "Hey bro! 😄 Drop your PDF and let's crack it together!",
    "dude":           "Hey dude! 😄 Ready to study? Upload your PDF and let's go!",
    "machan":         "Ayyo machan! 😄 Vanakam! PDF upload panni doubt kelu — naan irukken!",
    "dei":            "Dei! 😄 Enna panrom? PDF pottu doubt kelu, help panren!",
    "da":             "Enna da! 😄 PDF upload panni questions kelunga — ready ah irukken!",
    "good morning":   "Good morning! ☀️ Hope you're feeling fresh and focused. Upload your PDF and let's make this a productive session!",
    "good afternoon": "Good afternoon! 😊 Perfect time to get some solid studying done. Upload your PDF whenever you're ready!",
    "good evening":   "Good evening! 🌙 Ready for an evening study session? Drop your PDF and let's get into it!",
    "good night":     "Good night! 😴 Rest well — come back tomorrow and we'll tackle it together. Sweet dreams! 🌙",
    "thank you":      "Aww, you're so welcome! 😊 That's what I'm here for. Got more questions? Just ask!",
    "thanks":         "Happy to help! 😄 Any more doubts? I'm right here!",
    "thank u":        "Anytime! 😊 Keep those questions coming — that's how we learn!",
    "thx":            "No problem at all! 😄 Ask away whenever you need!",
    "ok":             "Sure thing! 😊 Let me know if anything else comes up.",
    "okay":           "Got it! 😊 Feel free to ask anything else from your PDF.",
    "k":              "Alright! 😄 I'm here whenever you need me.",
    "sure":           "Great! Go ahead and ask — I'm listening. 😊",
    "noted":          "Perfect! 😊 What's your next question?",
    "bye":            "Bye bye! 👋 Come back anytime you need help. All the best for your studies! 📚",
    "goodbye":        "Goodbye! 😊 Hope the session was helpful. Go crush that exam! 💪",
    "see you":        "See you soon! 👋 Take care and keep studying! 😄",
    "tc":             "Take care! 😊 Come back anytime — I'll be here!",
    "how are you":    "I'm doing great and fully charged to help you! 😄 What are we studying today?",
    "how r u":        "All good! 😊 Ready and waiting to help. What's your question?",
    "wassup":         "Hey! 😄 Not much — just waiting to help you study! Upload your PDF and let's go!",
    "what's up":      "Hey! 😄 All good here. What topic are we tackling today?",
    "whats up":       "Hey! 😄 Ready to help! Drop your PDF and let's start.",
    "sup":            "Sup! 😄 What are we studying? Upload your PDF and let's do this!",
    "vanakkam":       "Vanakkam! 🙏 Semma happy ah iruken! PDF upload panni doubt kelunga — help panren! 😄",
    "vanakam":        "Vanakam! 🙏 Enna panalam? PDF pottu questions kelunga!",
    "epdi iruka":     "Naan super ah iruken, nandri! 😄 Neenga epdi irukkinga? PDF ready ah iruka?",
    "epdi irukkinga": "Naan romba nalla iruken, thanks! 😊 Enna doubt iruku? Sollunga!",
    "nandri":         "Illa illa, mention pannatheenga! 😄 Vera enna doubt iruku?",
    "romba thanks":   "Ayyo, mention pannatheenga! 😄 Innum enna help venum?",
    "super da":       "Haha, nandri da! 😄 Enna next question? Kelu!",
    "ok da":          "Seri da! 😊 Innum enna kekkanum?",
    "seri da":        "Seri! 😄 Next doubt enna? Kelu!",
    "seri":           "Seri! 😄 Innum enna help venum? Ask panu!",
    "seri bro":       "Seri da bro! 😄 Enna next? Kelu!",
    "enna panra":     "Summa tha iruken 😄 Neenga enna panringa? PDF pottu doubt kelunga!",
    "enna panura":    "Summa waiting ah iruken! 😄 PDF upload panni questions kelu!",
    "saptiya":        "Illai 😄 Naan AI — saapida matten! Neenga saptingala? PDF pottu study pannunga!",
    "enna":           "Enna nu kelunga da! 😄 Help pannuren!",
    "doubt iruku":    "Aama sollunga! 😄 Enna doubt nu kelunga — explain pannuren!",
}


def get_greeting_response(text: str):
    normalized = text.lower().strip()
    normalized = re.sub(r'[!?.]+$', '', normalized).strip()
    return GREETING_RESPONSES.get(normalized)


# =========================================
# TANGLISH MARKERS
# =========================================

TANGLISH_STRONG_MARKERS = [
    "panru", "panra", "panuren", "paniten", "pannalam",
    "pannu", "sollu", "solu", "solen", "solren",
    "iruken", "irupan",
    "venum", "vendum",
    "purila", "puriyala", "theriyala",
    "explain pannu", "sollu bro", "help venum",
    "kekalam", "kelunga",
    "naan ", "nee ", "unga ", "unaku ", "unakku ",
    "illa da", "illai da", "aama da",
    "romba nalla", "super da", "seri da",
]

ENGLISH_QUESTION_SIGNALS = [
    "what", "why", "how", "when", "where", "which", "who",
    "explain", "describe", "define", "list", "compare",
    "tell me", "give me", "show me", "what is", "what are",
    "difference between", "advantages", "disadvantages",
    "example", "information", "extracted", "table", "pdf",
    "mark", "answer", "question", "concept", "topic",
]


def is_tanglish(text: str) -> bool:
    lower = text.lower().strip()
    word_count = len(lower.split())
    if word_count < 3:
        return False
    if any(signal in lower for signal in ENGLISH_QUESTION_SIGNALS):
        return False
    return any(marker in lower for marker in TANGLISH_STRONG_MARKERS)


# =========================================
# LLM HELPERS
# =========================================

def get_llm():
    return ChatGroq(
        groq_api_key=os.getenv("GROQ_API_KEY"),
        model_name="llama-3.1-8b-instant",
        temperature=0.5,
    )


# =========================================
# NO-PDF RESPONSE
# =========================================

NO_PDF_SYSTEM_PROMPT = """You are POOKOO AI — a friendly, professional academic assistant.

The student has asked a question but has NOT uploaded any PDF yet.

Your ONLY job here is to let the student know warmly and politely that you work exclusively with uploaded PDFs — you do NOT answer from general knowledge.

Rules:
- Be warm, friendly, and encouraging — like a helpful mentor or tutor
- Keep it short: 2 to 3 sentences max
- DO NOT answer the question at all — not even partially
- DO NOT say "I don't know" — make it clear this is by design, not a limitation
- Vary your response naturally — do not use the same phrasing every time
- Gently encourage them to upload their PDF or study material
- You may use 1 emoji maximum
- No markdown symbols whatsoever

Respond now with a short, warm, natural message encouraging the PDF upload:"""


def answer_no_pdf(question: str) -> str:
    llm = get_llm()
    prompt = f"{NO_PDF_SYSTEM_PROMPT}\n\nStudent's question: {question}"
    response = llm.invoke(prompt)
    return response.content if hasattr(response, "content") else str(response)


# =========================================
# TANGLISH CASUAL CHAT
# =========================================

TANGLISH_SYSTEM_PROMPT = """You are POOKOO AI — a friendly academic assistant who naturally understands Tanglish.

The student is chatting casually in Tamil-English mix (Tanglish). Respond warmly in the same Tanglish vibe — like a helpful, knowledgeable senior or friend who genuinely cares about their studies.

Rules:
- Keep it short and natural: 2 to 4 sentences max
- Use 1 to 2 emojis where they feel natural
- No markdown symbols at all
- If you genuinely cannot understand what they said, respond warmly and ask them to rephrase
- Never sound robotic or overly formal

Respond now in warm, natural Tanglish:"""


def answer_tanglish(question: str) -> str:
    llm = get_llm()
    prompt = f"{TANGLISH_SYSTEM_PROMPT}\n\nUser: {question}"
    response = llm.invoke(prompt)
    return response.content if hasattr(response, "content") else str(response)


# =========================================
# MARKDOWN CLEANER
# =========================================

def clean_markdown(text: str) -> str:
    text = re.sub(r'\*{1,3}', '', text)
    text = re.sub(r'_{1,2}', '', text)
    text = re.sub(r'^#{1,6}\s?', '', text, flags=re.MULTILINE)
    text = re.sub(r'`{1,3}', '', text)
    text = re.sub(r'^[-*_]{3,}\s*$', '', text, flags=re.MULTILINE)
    text = re.sub(r'^\s*[\*\-]\s+', '- ', text, flags=re.MULTILINE)
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()


# =========================================
# CREATE SESSION
# =========================================

@router.get("/create-session")
def create_session():
    return {"session_id": str(uuid.uuid4())}


# =========================================
# CHAT API
#
# FIX — memory context was being prepended
# INSIDE the question string passed to the
# retrieval chain. This caused the LLM to
# treat previous conversation topics as the
# current PDF context, overriding what the
# vectorstore actually retrieved.
#
# Example of the bug:
#   User asks about health policy → AI answers
#   User asks "what is AI" →
#   memory_context contained health policy Q&A →
#   LLM saw "previous context: health policy"
#   and concluded the PDFs are about health,
#   ignoring the AI Lecture Notes chunks.
#
# FIX: pass ONLY the current question to the
# retrieval chain (so FAISS retrieves the right
# chunks). Append memory as a clearly labelled
# SUFFIX so the LLM uses it only for
# conversational continuity, not for deciding
# what the PDFs are about.
# =========================================

@router.post("/chat")
def chat(request: ChatRequest):
    try:
        question = request.question.strip()
        if not question:
            return {"answer": "Please type something! 😊"}

        # ─────────────────────────────────────────
        # STEP 1 — Exact greeting lookup (fast path)
        # ─────────────────────────────────────────
        greeting_reply = get_greeting_response(question)
        if greeting_reply:
            save_chat(request.session_id, question, greeting_reply)
            return {"answer": greeting_reply}

        # ─────────────────────────────────────────
        # STEP 2 — Tanglish casual chat
        # ─────────────────────────────────────────
        if is_tanglish(question):
            tanglish_reply = answer_tanglish(question)
            tanglish_reply = clean_markdown(tanglish_reply)
            save_chat(request.session_id, question, tanglish_reply)
            return {"answer": tanglish_reply}

        # ─────────────────────────────────────────
        # STEP 3 — Load session vectorstore
        # ─────────────────────────────────────────
        embedding_model = get_embedding_model()
        vectorstore = load_vectorstore(embedding_model, request.session_id)

        # ─────────────────────────────────────────
        # STEP 4 — No PDF uploaded → warm redirect
        # ─────────────────────────────────────────
        if vectorstore is None:
            no_pdf_reply = answer_no_pdf(question)
            no_pdf_reply = clean_markdown(no_pdf_reply)
            save_chat(request.session_id, question, no_pdf_reply)
            return {"answer": no_pdf_reply}

        # ─────────────────────────────────────────
        # STEP 5 — RAG pipeline (PDF uploaded)
        #
        # FIX: pass ONLY the raw question to the
        # retrieval chain. FAISS uses this to find
        # the most relevant chunks from the correct
        # PDF. Memory is appended as a labelled
        # suffix AFTER retrieval — not before —
        # so it cannot bias which chunks are fetched.
        # ─────────────────────────────────────────
        retrieval_chain = create_chatbot(vectorstore)

        history = get_chat_history(request.session_id)

        # Build memory suffix from last 3 exchanges only
        # (reduced from 5 — less noise, less confusion)
        recent_history = history[-3:]
        memory_suffix = ""
        if recent_history:
            memory_suffix = "\n\n---\nFor conversational continuity only (do NOT use this to decide what the PDFs are about — always use the retrieved context above for the actual answer):\n"
            for q, a in recent_history:
                memory_suffix += f"Previous Q: {q}\nPrevious A: {a}\n\n"

        # FIX: retrieval chain gets the pure question
        # so FAISS finds chunks from the RIGHT PDF.
        # Memory suffix is appended after — LLM reads
        # it for continuity but it cannot hijack retrieval.
        final_question = question + memory_suffix

        response = retrieval_chain.invoke({"input": final_question})

        answer = response["answer"]
        answer = clean_markdown(answer)

        save_chat(request.session_id, question, answer)
        return {"answer": answer}

    except Exception as e:
        print("CHAT ERROR:", str(e))
        return {
            "answer": "Oops! I had a little trouble with that one 😅 Please try again in a moment."
        }