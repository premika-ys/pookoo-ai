from fastapi import APIRouter, Header, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import json
import os

from utils.database import connect_db

router = APIRouter()


# =========================================
# MODELS
# =========================================

class MessageModel(BaseModel):
    id: str
    role: str
    content: str
    timestamp: Optional[str] = None


class PdfModel(BaseModel):
    id: Optional[str] = None
    filename: str
    name: str
    size: Optional[str] = None


class SaveSessionRequest(BaseModel):
    session_id: str
    title: str
    messages: List[MessageModel] = []
    pdfs: List[PdfModel] = []


# =========================================
# HELPER — extract user email from token
# =========================================

def get_email_from_token(authorization: str) -> str:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing token")
    token = authorization.replace("Bearer ", "").strip()
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("SELECT email FROM user_tokens WHERE token = ?", (token,))
    row = cursor.fetchone()
    conn.close()
    if not row:
        raise HTTPException(status_code=401, detail="Invalid token")
    return row[0]


# =========================================
# ENSURE TABLES EXIST
# =========================================

def ensure_session_tables():
    conn = connect_db()
    cursor = conn.cursor()

    # user_tokens: maps JWT token → email for simple auth lookup
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS user_tokens (
            token TEXT PRIMARY KEY,
            email TEXT NOT NULL
        )
    """)

    # sessions: stores session metadata per user
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS sessions (
            session_id TEXT NOT NULL,
            user_email TEXT NOT NULL,
            title TEXT DEFAULT 'New Chat',
            updated_at TEXT,
            PRIMARY KEY (session_id, user_email)
        )
    """)

    # session_messages: stores messages per session
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS session_messages (
            id TEXT NOT NULL,
            session_id TEXT NOT NULL,
            role TEXT NOT NULL,
            content TEXT NOT NULL,
            timestamp TEXT,
            PRIMARY KEY (id, session_id)
        )
    """)

    # session_pdfs: stores PDF metadata per session
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS session_pdfs (
            session_id TEXT NOT NULL,
            filename TEXT NOT NULL,
            name TEXT NOT NULL,
            size TEXT,
            PRIMARY KEY (session_id, filename)
        )
    """)

    conn.commit()
    conn.close()


ensure_session_tables()


# =========================================
# SAVE SESSION
# POST /sessions/save
# FIX: SQLite with composite PRIMARY KEY needs
# INSERT OR REPLACE instead of ON CONFLICT DO UPDATE
# because ON CONFLICT clause must name all columns
# of the composite key explicitly, and SQLite's
# upsert syntax only works cleanly with single-col keys.
# INSERT OR REPLACE handles composite keys correctly.
# =========================================

@router.post("/sessions/save")
def save_session(
    request: SaveSessionRequest,
    authorization: str = Header(None)
):
    try:
        email = get_email_from_token(authorization)
        conn = connect_db()
        cursor = conn.cursor()

        from datetime import datetime
        updated_at = datetime.now().isoformat()

        # ── FIX: use INSERT OR REPLACE for composite PRIMARY KEY ──
        cursor.execute("""
            INSERT OR REPLACE INTO sessions
                (session_id, user_email, title, updated_at)
            VALUES (?, ?, ?, ?)
        """, (request.session_id, email, request.title, updated_at))

        # Replace messages for this session
        cursor.execute(
            "DELETE FROM session_messages WHERE session_id = ?",
            (request.session_id,)
        )
        for msg in request.messages:
            cursor.execute("""
                INSERT OR REPLACE INTO session_messages
                    (id, session_id, role, content, timestamp)
                VALUES (?, ?, ?, ?, ?)
            """, (msg.id, request.session_id, msg.role, msg.content, msg.timestamp))

        # Replace PDFs for this session
        cursor.execute(
            "DELETE FROM session_pdfs WHERE session_id = ?",
            (request.session_id,)
        )
        for pdf in request.pdfs:
            cursor.execute("""
                INSERT OR REPLACE INTO session_pdfs
                    (session_id, filename, name, size)
                VALUES (?, ?, ?, ?)
            """, (request.session_id, pdf.filename, pdf.name, pdf.size))

        conn.commit()
        conn.close()
        return {"status": "saved"}

    except HTTPException:
        raise
    except Exception as e:
        print("SAVE SESSION ERROR:", str(e))
        return {"status": "error", "detail": str(e)}


# =========================================
# LIST SESSIONS
# GET /sessions/list
# =========================================

@router.get("/sessions/list")
def list_sessions(authorization: str = Header(None)):
    try:
        email = get_email_from_token(authorization)
        conn = connect_db()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT session_id, title, updated_at
            FROM sessions
            WHERE user_email = ?
            ORDER BY updated_at DESC
        """, (email,))
        rows = cursor.fetchall()
        conn.close()

        sessions = []
        for row in rows:
            sessions.append({
                "id": row[0],
                "title": row[1],
                "updatedAt": row[2] or "",
            })

        return {"sessions": sessions}

    except HTTPException:
        raise
    except Exception as e:
        print("LIST SESSIONS ERROR:", str(e))
        return {"sessions": []}


# =========================================
# GET SESSION MESSAGES
# GET /sessions/messages/{session_id}
# =========================================

@router.get("/sessions/messages/{session_id}")
def get_session_messages(
    session_id: str,
    authorization: str = Header(None)
):
    try:
        get_email_from_token(authorization)
        conn = connect_db()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT id, role, content, timestamp
            FROM session_messages
            WHERE session_id = ?
            ORDER BY timestamp ASC
        """, (session_id,))
        rows = cursor.fetchall()
        conn.close()

        messages = []
        for row in rows:
            messages.append({
                "id": row[0],
                "role": row[1],
                "content": row[2],
                "timestamp": row[3],
            })

        return {"messages": messages}

    except HTTPException:
        raise
    except Exception as e:
        print("GET MESSAGES ERROR:", str(e))
        return {"messages": []}


# =========================================
# GET SESSION PDFs
# GET /sessions/pdfs/{session_id}
# =========================================

@router.get("/sessions/pdfs/{session_id}")
def get_session_pdfs_from_db(
    session_id: str,
    authorization: str = Header(None)
):
    try:
        get_email_from_token(authorization)
        conn = connect_db()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT filename, name, size
            FROM session_pdfs
            WHERE session_id = ?
        """, (session_id,))
        rows = cursor.fetchall()
        conn.close()

        pdfs = []
        for row in rows:
            pdfs.append({
                "id": row[0],
                "filename": row[0],
                "name": row[1],
                "size": row[2] or "",
            })

        return {"pdfs": pdfs}

    except HTTPException:
        raise
    except Exception as e:
        print("GET PDFS ERROR:", str(e))
        return {"pdfs": []}


# =========================================
# DELETE SESSION
# DELETE /sessions/{session_id}
# Removes from DB but NOT from filesystem
# =========================================

@router.delete("/sessions/{session_id}")
def delete_session_from_db(
    session_id: str,
    authorization: str = Header(None)
):
    try:
        email = get_email_from_token(authorization)
        conn = connect_db()
        cursor = conn.cursor()

        cursor.execute(
            "DELETE FROM sessions WHERE session_id = ? AND user_email = ?",
            (session_id, email)
        )
        cursor.execute(
            "DELETE FROM session_messages WHERE session_id = ?",
            (session_id,)
        )
        cursor.execute(
            "DELETE FROM session_pdfs WHERE session_id = ?",
            (session_id,)
        )
        conn.commit()
        conn.close()
        return {"status": "deleted"}

    except HTTPException:
        raise
    except Exception as e:
        print("DELETE SESSION ERROR:", str(e))
        return {"status": "error"}


# =========================================
# OLD /session-pdfs route kept for compat
# =========================================

@router.get("/session-pdfs/{session_id}")
def get_session_pdfs_legacy(session_id: str):
    upload_path = f"uploads/{session_id}"
    if not os.path.exists(upload_path):
        return {"pdfs": []}
    pdfs = []
    for file in os.listdir(upload_path):
        if file.endswith(".pdf"):
            file_path = os.path.join(upload_path, file)
            size_kb = round(os.path.getsize(file_path) / 1024, 1)
            pdfs.append({
                "id": file,
                "filename": file,
                "name": file,
                "size": f"{size_kb} KB"
            })
    return {"pdfs": pdfs}