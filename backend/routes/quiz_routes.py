"""
quiz_routes.py
──────────────
Changes from original:
  • QuizRequest now accepts an optional `selected_pdfs` list.
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

class QuizRequest(BaseModel):
    session_id: str
    selected_pdfs: Optional[List[str]] = []   # ← NEW


# ─── Route ────────────────────────────────────────────────────────────────────

@router.post("/quiz")
def generate_quiz(request: QuizRequest):

    try:
        print("Generating quiz...")

        embedding_model = get_embedding_model()

        # ── Vectorstore selection ─────────────────────────────────────────
        if request.selected_pdfs:
            print(f"Quiz: using selected PDFs: {request.selected_pdfs}")
            vectorstore = _build_temp_vectorstore(
                embedding_model, request.session_id, request.selected_pdfs
            )
        else:
            vectorstore = load_vectorstore(embedding_model, request.session_id)

        if vectorstore is None:
            return {"quiz": []}

        # ── Chatbot + prompt (unchanged from original) ────────────────────
        retrieval_chain = create_chatbot(vectorstore)

        quiz_prompt = """

Generate 5 multiple choice questions ONLY from the uploaded PDF.

IMPORTANT RULES:

1. Use ONLY uploaded PDF knowledge
2. Return ONLY JSON
3. No explanation
4. No markdown
5. No extra text
6. Each question must contain:
   - question
   - options
   - answer

Return format:

[
  {
    "question": "What is AI?",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "answer": "Option A"
  }
]

"""

        response = retrieval_chain.invoke({"input": quiz_prompt})
        answer   = response["answer"]

        print("RAW QUIZ RESPONSE:")
        print(answer)

        answer = answer.replace("```json", "").replace("```", "").strip()

        match = re.search(r"\[.*\]", answer, re.DOTALL)
        if match:
            answer = match.group(0)
        else:
            return {"quiz": []}

        try:
            quiz_data = json.loads(answer)
        except Exception as e:
            print("JSON PARSE ERROR:", str(e))
            return {"quiz": []}

        formatted_quiz = [
            {
                "question": item["question"],
                "options":  item["options"],
                "answer":   item["answer"],
            }
            for item in quiz_data
            if "question" in item and "options" in item and "answer" in item
        ]

        print("FINAL QUIZ:", formatted_quiz)
        return {"quiz": formatted_quiz}

    except Exception as e:
        print("QUIZ ERROR:", str(e))
        return {"quiz": []}