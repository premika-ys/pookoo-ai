# from fastapi import APIRouter
# from pydantic import BaseModel
# import json
# import re

# from utils.embeddings import get_embedding_model
# from utils.vectordb import load_vectorstore
# from utils.chatbot import create_chatbot

# router = APIRouter()


# # =========================
# # REQUEST MODEL
# # =========================

# class FlashCardRequest(BaseModel):
#     session_id: str


# # =========================
# # FLASHCARD API
# # =========================

# @router.post("/flashcards")
# def generate_flashcards(request: FlashCardRequest):

#     try:

#         print("Generating flashcards...")

#         # =========================
#         # LOAD EMBEDDING MODEL
#         # =========================

#         embedding_model = get_embedding_model()

#         # =========================
#         # LOAD VECTORSTORE
#         # =========================

#         vectorstore = load_vectorstore(
#             embedding_model
#         )

#         # =========================
#         # CREATE CHATBOT
#         # =========================

#         retrieval_chain = create_chatbot(
#             vectorstore
#         )

#         # =========================
#         # FLASHCARD PROMPT
#         # =========================

#         flashcard_prompt = """

# Generate 10 educational flashcards ONLY from the uploaded PDF.

# IMPORTANT RULES:

# 1. Use ONLY uploaded PDF knowledge
# 2. Return ONLY JSON
# 3. No explanation
# 4. No markdown
# 5. No extra text
# 6. Each flashcard must contain:
#    - question
#    - answer

# Return format:

# [
#   {
#     "question": "What is AI?",
#     "answer": "Artificial Intelligence"
#   }
# ]

# """

#         # =========================
#         # ASK AI
#         # =========================

#         response = retrieval_chain.invoke({
#             "input": flashcard_prompt
#         })

#         answer = response["answer"]

#         print("RAW FLASHCARD RESPONSE:")
#         print(answer)

#         # =========================
#         # CLEAN RESPONSE
#         # =========================

#         answer = answer.replace("```json", "")
#         answer = answer.replace("```", "")
#         answer = answer.strip()

#         # =========================
#         # EXTRACT JSON ARRAY
#         # =========================

#         match = re.search(r"\[.*\]", answer, re.DOTALL)

#         if match:

#             answer = match.group(0)

#         else:

#             return {
#                 "flashcards": []
#             }

#         # =========================
#         # PARSE JSON
#         # =========================

#         try:

#             flashcard_data = json.loads(answer)

#         except Exception as e:

#             print("JSON PARSE ERROR:", str(e))

#             return {
#                 "flashcards": []
#             }

#         # =========================
#         # VALIDATE FLASHCARD FORMAT
#         # =========================

#         formatted_flashcards = []

#         for item in flashcard_data:

#             if (
#                 "question" in item and
#                 "answer" in item
#             ):

#                 formatted_flashcards.append({
#                     "question": item["question"],
#                     "answer": item["answer"]
#                 })

#         print("FINAL FLASHCARDS:")
#         print(formatted_flashcards)

#         return {
#             "flashcards": formatted_flashcards
#         }

#     except Exception as e:

#         print("FLASHCARD ERROR:", str(e))

#         return {
#             "flashcards": []
#         }

# from fastapi import APIRouter
# from pydantic import BaseModel
# import json
# import re

# from utils.embeddings import get_embedding_model
# from utils.vectordb import load_vectorstore
# from utils.chatbot import create_chatbot

# router = APIRouter()


# # =========================
# # REQUEST MODEL
# # =========================

# class FlashCardRequest(BaseModel):

#     session_id: str


# # =========================
# # FLASHCARD API
# # =========================

# @router.post("/flashcards")
# def generate_flashcards(request: FlashCardRequest):

#     try:

#         print("Generating flashcards...")

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

#                 "flashcards": []

#             }

#         # =====================================
#         # CREATE CHATBOT
#         # =====================================

#         retrieval_chain = create_chatbot(
#             vectorstore
#         )

#         # =====================================
#         # FLASHCARD PROMPT
#         # =====================================

#         flashcard_prompt = """

# Generate 10 educational flashcards ONLY from the uploaded PDF.

# IMPORTANT RULES:

# 1. Use ONLY uploaded PDF knowledge
# 2. Return ONLY JSON
# 3. No explanation
# 4. No markdown
# 5. No extra text
# 6. Each flashcard must contain:
#    - question
#    - answer

# Return format:

# [
#   {
#     "question": "What is AI?",
#     "answer": "Artificial Intelligence"
#   }
# ]

# """

#         # =====================================
#         # ASK AI
#         # =====================================

#         response = retrieval_chain.invoke({

#             "input": flashcard_prompt

#         })

#         answer = response["answer"]

#         print("RAW FLASHCARD RESPONSE:")
#         print(answer)

#         # =====================================
#         # CLEAN RESPONSE
#         # =====================================

#         answer = answer.replace("```json", "")
#         answer = answer.replace("```", "")
#         answer = answer.strip()

#         # =====================================
#         # EXTRACT JSON ARRAY
#         # =====================================

#         match = re.search(r"\[.*\]", answer, re.DOTALL)

#         if match:

#             answer = match.group(0)

#         else:

#             return {

#                 "flashcards": []

#             }

#         # =====================================
#         # PARSE JSON
#         # =====================================

#         try:

#             flashcard_data = json.loads(answer)

#         except Exception as e:

#             print("JSON PARSE ERROR:", str(e))

#             return {

#                 "flashcards": []

#             }

#         # =====================================
#         # VALIDATE FLASHCARD FORMAT
#         # =====================================

#         formatted_flashcards = []

#         for item in flashcard_data:

#             if (

#                 "question" in item and
#                 "answer" in item

#             ):

#                 formatted_flashcards.append({

#                     "question": item["question"],
#                     "answer": item["answer"]

#                 })

#         print("FINAL FLASHCARDS:")
#         print(formatted_flashcards)

#         return {

#             "flashcards": formatted_flashcards

#         }

#     except Exception as e:

#         print("FLASHCARD ERROR:", str(e))

#         return {

#             "flashcards": []

#         }


"""
flashcards.py  (flashcard_routes.py)
─────────────────────────────────────
Changes from original:
  • FlashCardRequest now accepts an optional `selected_pdfs` list.
  • When provided, a temporary in-memory vectorstore is built from those files.
  • When omitted, the existing session vectorstore is used (no regression).
"""

import os
import json
import re
from typing import List, Optional

from fastapi import APIRouter
from pydantic import BaseModel

from utils.embeddings import get_embedding_model
from utils.vectordb import load_vectorstore
from utils.chatbot import create_chatbot

from utils.loader import load_selected_pdfs

router = APIRouter()


# ─── Shared temp-vectorstore helper ──────────────────────────────────────────

def _build_temp_vectorstore(embedding_model, session_id: str, selected_pdfs: list):
    try:
        from langchain_community.vectorstores import FAISS
        from langchain.text_splitter import RecursiveCharacterTextSplitter
    except ImportError:
        return None

    uploads_dir = os.path.join("uploads", session_id)
    if not os.path.isdir(uploads_dir):
        return None

    documents = load_selected_pdfs(uploads_dir, selected_pdfs)
    if not documents:
        return None

    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=150)
    chunks = splitter.split_documents(documents)
    if not chunks:
        return None

    return FAISS.from_documents(chunks, embedding_model)


# ─── Request model ────────────────────────────────────────────────────────────

class FlashCardRequest(BaseModel):
    session_id: str
    selected_pdfs: Optional[List[str]] = []   # new optional field


# ─── Route ────────────────────────────────────────────────────────────────────

@router.post("/flashcards")
def generate_flashcards(request: FlashCardRequest):

    try:
        print("Generating flashcards...")

        embedding_model = get_embedding_model()

        if request.selected_pdfs:
            print(f"Flashcards: using selected PDFs: {request.selected_pdfs}")
            vectorstore = _build_temp_vectorstore(
                embedding_model, request.session_id, request.selected_pdfs
            )
        else:
            vectorstore = load_vectorstore(embedding_model, request.session_id)

        if vectorstore is None:
            return {"flashcards": []}

        retrieval_chain = create_chatbot(vectorstore)

        flashcard_prompt = """

Generate 10 educational flashcards ONLY from the uploaded PDF.

IMPORTANT RULES:

1. Use ONLY uploaded PDF knowledge
2. Return ONLY JSON
3. No explanation
4. No markdown
5. No extra text
6. Each flashcard must contain:
   - question
   - answer

Return format:

[
  {
    "question": "What is AI?",
    "answer": "Artificial Intelligence"
  }
]

"""

        response = retrieval_chain.invoke({"input": flashcard_prompt})
        answer   = response["answer"]

        print("RAW FLASHCARD RESPONSE:")
        print(answer)

        answer = answer.replace("```json", "").replace("```", "").strip()

        match = re.search(r"\[.*\]", answer, re.DOTALL)
        if match:
            answer = match.group(0)
        else:
            return {"flashcards": []}

        try:
            flashcard_data = json.loads(answer)
        except Exception as e:
            print("JSON PARSE ERROR:", str(e))
            return {"flashcards": []}

        formatted_flashcards = [
            {"question": item["question"], "answer": item["answer"]}
            for item in flashcard_data
            if "question" in item and "answer" in item
        ]

        print("FINAL FLASHCARDS:", formatted_flashcards)
        return {"flashcards": formatted_flashcards}

    except Exception as e:
        print("FLASHCARD ERROR:", str(e))
        return {"flashcards": []}