# from fastapi import APIRouter


# router = APIRouter()


# @router.get("/summary")
# def summary():

#     return {
#         "message": "Summary Route Working"
#     }

# from fastapi import APIRouter
# from pydantic import BaseModel

# from utils.embeddings import get_embedding_model
# from utils.vectordb import load_vectorstore
# from utils.chatbot import create_chatbot

# router = APIRouter()


# # =========================
# # REQUEST MODEL
# # =========================

# class SummaryRequest(BaseModel):
#     session_id: str


# # =========================
# # SUMMARY API
# # =========================

# @router.post("/summary")
# def generate_summary(request: SummaryRequest):

#     try:

#         # LOAD EMBEDDING MODEL
#         embedding_model = get_embedding_model()

#         # LOAD VECTORSTORE
#         vectorstore = load_vectorstore(
#             embedding_model
#         )

#         # CREATE CHATBOT
#         retrieval_chain = create_chatbot(
#             vectorstore
#         )

#         # SUMMARY PROMPT
#         summary_prompt = """

# Generate a clean student-friendly summary
# from the uploaded PDF content.

# Rules:
# - Use ONLY PDF context
# - Keep summary clear and structured
# - Use bullet points
# - Include important concepts only
# - Make it easy for revision

# Give:
# 1. Introduction
# 2. Key Concepts
# 3. Important Points
# 4. Final Conclusion

# """

#         # ASK AI
#         response = retrieval_chain.invoke({
#             "input": summary_prompt
#         })

#         summary = response["answer"]

#         return {
#             "summary": summary
#         }

#     except Exception as e:

#         print("SUMMARY ERROR:", str(e))

#         return {
#             "summary": "Unable to generate summary."
#         }

# from fastapi import APIRouter
# from pydantic import BaseModel

# from utils.embeddings import get_embedding_model
# from utils.vectordb import load_vectorstore
# from utils.chatbot import create_chatbot

# router = APIRouter()


# # =========================
# # REQUEST MODEL
# # =========================

# class SummaryRequest(BaseModel):

#     session_id: str


# # =========================
# # SUMMARY API
# # =========================

# @router.post("/summary")
# def generate_summary(request: SummaryRequest):

#     try:

#         # =====================================
#         # LOAD EMBEDDING MODEL
#         # =====================================

#         embedding_model = get_embedding_model()

#         # =====================================
#         # LOAD SESSION VECTORSTORE
#         # =====================================

#         vectorstore = load_vectorstore(

#             embedding_model,

#             request.session_id

#         )

#         # =====================================
#         # NO PDF FOUND
#         # =====================================

#         if vectorstore is None:

#             return {

#                 "summary":
#                 "Please upload a PDF in this chat session first 📄✨"

#             }

#         # =====================================
#         # CREATE CHATBOT
#         # =====================================

#         retrieval_chain = create_chatbot(
#             vectorstore
#         )

#         # =====================================
#         # SUMMARY PROMPT
#         # =====================================

#         summary_prompt = """

# Generate a clean student-friendly summary
# from the uploaded PDF content.

# Rules:
# - Use ONLY PDF context
# - Keep summary clear and structured
# - Use bullet points
# - Include important concepts only
# - Make it easy for revision

# Give:
# 1. Introduction
# 2. Key Concepts
# 3. Important Points
# 4. Final Conclusion

# """

#         # =====================================
#         # ASK AI
#         # =====================================

#         response = retrieval_chain.invoke({

#             "input": summary_prompt

#         })

#         summary = response["answer"]

#         return {

#             "summary": summary

#         }

#     except Exception as e:

#         print("SUMMARY ERROR:", str(e))

#         return {

#             "summary":
#             "Oops! I couldn't generate the summary right now 😅 Please try again."

#         }


"""
summary_routes.py
─────────────────
Changes from original:
  • SummaryRequest now accepts an optional `selected_pdfs` list.
  • When selected_pdfs is provided (and non-empty), a temporary in-memory
    vectorstore is built from those files only.
  • When selected_pdfs is empty / omitted, the existing session vectorstore
    is used unchanged — zero regression on current behaviour.
"""

# import os
# from typing import List, Optional

# from fastapi import APIRouter
# from pydantic import BaseModel

# from utils.embeddings import get_embedding_model
# from utils.vectordb import load_vectorstore
# from utils.chatbot import create_chatbot

# # NEW import — only the selective loader is new
# from utils.loader import load_selected_pdfs

# router = APIRouter()


# # ─── Helpers (kept identical to quiz/flashcard pattern) ───────────────────────

# def _build_temp_vectorstore(embedding_model, session_id: str, selected_pdfs: list):
#     """
#     Build a temporary in-memory FAISS vectorstore from selected PDFs only.
#     Returns None if no documents could be loaded.
#     """
#     try:
#         from langchain_community.vectorstores import FAISS
#         from langchain.text_splitter import RecursiveCharacterTextSplitter
#     except ImportError:
#         print("FAISS or text splitter not available")
#         return None

#     uploads_dir = os.path.join("uploads", session_id)

#     if not os.path.isdir(uploads_dir):
#         print(f"Uploads directory not found: {uploads_dir}")
#         return None

#     documents = load_selected_pdfs(uploads_dir, selected_pdfs)

#     if not documents:
#         return None

#     splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=150)
#     chunks = splitter.split_documents(documents)

#     if not chunks:
#         return None

#     vectorstore = FAISS.from_documents(chunks, embedding_model)
#     return vectorstore


# # ─── Request model ────────────────────────────────────────────────────────────

# class SummaryRequest(BaseModel):
#     session_id: str
#     selected_pdfs: Optional[List[str]] = []   # ← NEW (defaults to all)


# # ─── Route ────────────────────────────────────────────────────────────────────

# @router.post("/summary")
# def generate_summary(request: SummaryRequest):

#     try:

#         embedding_model = get_embedding_model()

#         # ── Decide which vectorstore to use ──────────────────────────────
#         if request.selected_pdfs:
#             # User selected specific PDFs → build a temporary vectorstore
#             print(f"Summary: using selected PDFs: {request.selected_pdfs}")
#             vectorstore = _build_temp_vectorstore(
#                 embedding_model,
#                 request.session_id,
#                 request.selected_pdfs,
#             )
#         else:
#             # No selection → use the full session vectorstore (original behaviour)
#             vectorstore = load_vectorstore(embedding_model, request.session_id)

#         if vectorstore is None:
#             return {
#                 "summary": "Please upload a PDF in this chat session first 📄✨"
#             }

#         # ── Create chatbot & prompt (unchanged) ──────────────────────────
#         retrieval_chain = create_chatbot(vectorstore)

#         summary_prompt = """

# Generate a clean student-friendly summary
# from the uploaded PDF content.

# Rules:
# - Use ONLY PDF context
# - Keep summary clear and structured
# - Use bullet points
# - Include important concepts only
# - Make it easy for revision

# Give:
# 1. Introduction
# 2. Key Concepts
# 3. Important Points
# 4. Final Conclusion

# """

#         response = retrieval_chain.invoke({"input": summary_prompt})
#         summary  = response["answer"]

#         return {"summary": summary}

#     except Exception as e:
#         print("SUMMARY ERROR:", str(e))
#         return {
#             "summary": "Oops! I couldn't generate the summary right now 😅 Please try again."
#         }


import os
from typing import List, Optional

from fastapi import APIRouter
from pydantic import BaseModel

from utils.embeddings import get_embedding_model
from utils.vectordb import load_vectorstore
from utils.chatbot import create_chatbot
from utils.loader import load_selected_pdfs

router = APIRouter()


# ─── Helpers ──────────────────────────────────────────────────────────────────

def _build_temp_vectorstore(embedding_model, session_id: str, selected_pdfs: list):
    try:
        from langchain_community.vectorstores import FAISS
        from langchain.text_splitter import RecursiveCharacterTextSplitter
    except ImportError:
        print("FAISS or text splitter not available")
        return None

    uploads_dir = os.path.join("uploads", session_id)

    if not os.path.isdir(uploads_dir):
        print(f"Uploads directory not found: {uploads_dir}")
        return None

    documents = load_selected_pdfs(uploads_dir, selected_pdfs)

    if not documents:
        return None

    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=150)
    chunks = splitter.split_documents(documents)

    if not chunks:
        return None

    vectorstore = FAISS.from_documents(chunks, embedding_model)
    return vectorstore


def summarize_topic(retrieval_chain, topic):
    prompt = f"""
You are a professional academic assistant. Give a detailed, well-structured English summary about the following topic from the uploaded PDF.

STRICT RULES:
- Respond ONLY in English. No Tamil. No other language.
- Do NOT use any markdown symbols: no **, no ##, no *, no __, no backticks
- Use plain text only
- Headings must be written as plain uppercase text followed by a colon on their own line
- Use numbered points or plain dashes for lists

Topic: {topic}

FORMAT YOUR RESPONSE EXACTLY LIKE THIS:

INTRODUCTION:
Write 2-3 sentences giving a clear overview of this topic.

KEY CONCEPTS:
1. Concept name - brief explanation
2. Concept name - brief explanation
3. Concept name - brief explanation

IMPORTANT POINTS:
- Point one
- Point two
- Point three

CONCLUSION:
Write 2-3 sentences summarizing the key takeaways about this topic.

Use ONLY content from the uploaded PDF. Be accurate, concise, and helpful for exam revision.
"""

    response = retrieval_chain.invoke({"input": prompt})
    return response["answer"]


# ─── Request model ────────────────────────────────────────────────────────────

class SummaryRequest(BaseModel):
    session_id: str
    selected_pdfs: Optional[List[str]] = []


# ─── Route ────────────────────────────────────────────────────────────────────

@router.post("/summary")
def generate_summary(request: SummaryRequest):
    try:
        embedding_model = get_embedding_model()

        if request.selected_pdfs:
            print(f"Summary: using selected PDFs: {request.selected_pdfs}")
            vectorstore = _build_temp_vectorstore(
                embedding_model,
                request.session_id,
                request.selected_pdfs,
            )
        else:
            vectorstore = load_vectorstore(embedding_model, request.session_id)

        if vectorstore is None:
            return {
                "summary": "Please upload a PDF in this chat session first 📄✨"
            }

        retrieval_chain = create_chatbot(vectorstore)

        summary_prompt = """
You are a professional academic assistant. Generate a clean, well-structured English summary of the uploaded PDF content.

STRICT RULES:
- Respond ONLY in English. No Tamil. No other language.
- Do NOT use any markdown symbols: no **, no ##, no *, no __, no backticks
- Use plain text only
- Headings must be written as plain uppercase text followed by a colon on their own line
- Use numbered points or plain dashes for lists

FORMAT YOUR RESPONSE EXACTLY LIKE THIS:

INTRODUCTION:
Write 2-3 sentences giving a clear overview of what this document is about.

KEY CONCEPTS:
1. Concept name - brief explanation
2. Concept name - brief explanation
3. Concept name - brief explanation
(list all major concepts from the PDF)

IMPORTANT POINTS:
- Point one
- Point two
- Point three
(list the most critical facts, definitions, or ideas a student must know)

CONCLUSION:
Write 2-3 sentences summarizing what a student should take away from this document.

Use ONLY content from the uploaded PDF. Be accurate, concise, and helpful for exam revision.
"""

        response = retrieval_chain.invoke({"input": summary_prompt})
        summary  = response["answer"]

        return {"summary": summary}

    except Exception as e:
        print("SUMMARY ERROR:", str(e))
        return {
            "summary": "Oops! I couldn't generate the summary right now 😅 Please try again."
        }


