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