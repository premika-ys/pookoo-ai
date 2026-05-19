# from fastapi import APIRouter, HTTPException

# from pydantic import BaseModel

# from passlib.context import CryptContext

# from jose import jwt

# from datetime import datetime, timedelta

# from utils.database import connect_db


# router = APIRouter()

# pwd_context = CryptContext(
#     schemes=["bcrypt"],
#     deprecated="auto"
# )

# SECRET_KEY = "POOKOO_SECRET"

# ALGORITHM = "HS256"


# # =========================
# # REQUEST MODELS
# # =========================

# class SignupRequest(BaseModel):

#     name: str

#     email: str

#     password: str


# class LoginRequest(BaseModel):

#     email: str

#     password: str

# # class UpdateProfileRequest(BaseModel):

# #     email: str

# #     name: str

# #     university: str = ""


# # =========================
# # CREATE TOKEN
# # =========================

# def create_access_token(data: dict):

#     to_encode = data.copy()

#     expire = datetime.utcnow() + timedelta(hours=10)

#     to_encode.update({
#         "exp": expire
#     })

#     token = jwt.encode(
#         to_encode,
#         SECRET_KEY,
#         algorithm=ALGORITHM
#     )

#     return token


# # =========================
# # SIGNUP
# # =========================

# @router.post("/auth/signup")
# def signup(request: SignupRequest):

#     conn = connect_db()

#     cursor = conn.cursor()

#     # CHECK USER
#     cursor.execute(

#         "SELECT * FROM users WHERE email=?",

#         (request.email,)
#     )

#     existing_user = cursor.fetchone()

#     if existing_user:

#         raise HTTPException(
#             status_code=400,
#             detail="Email already exists"
#         )

#     # HASH PASSWORD
#     hashed_password = pwd_context.hash(
#         request.password
#     )

#     # INSERT USER
#     cursor.execute(

#         """

#         INSERT INTO users (
#             name,
#             email,
#             password
#         )

#         VALUES (?, ?, ?)

#         """,

#         (
#             request.name,
#             request.email,
#             hashed_password
#         )
#     )

#     conn.commit()

#     conn.close()

#     token = create_access_token({

#         "sub": request.email

#     })

#     return {

#         "message": "Signup successful",

#         "token": token,

#         "user": {

#             "name": request.name,

#             "email": request.email
#         }
#     }


# # =========================
# # LOGIN
# # =========================

# @router.post("/auth/login")
# def login(request: LoginRequest):

#     conn = connect_db()

#     cursor = conn.cursor()

#     cursor.execute(

#         "SELECT * FROM users WHERE email=?",

#         (request.email,)
#     )

#     user = cursor.fetchone()

#     conn.close()

#     if not user:

#         raise HTTPException(
#             status_code=400,
#             detail="Invalid email"
#         )

#     stored_password = user[3]

#     valid = pwd_context.verify(

#         request.password,

#         stored_password
#     )

#     if not valid:

#         raise HTTPException(
#             status_code=400,
#             detail="Invalid password"
#         )

#     token = create_access_token({

#         "sub": request.email

#     })

#     return {

#         "message": "Login successful",

#         "token": token,

#         "user": {

#             "name": user[1],

#             "email": user[2]
#         }
#     }







from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from utils.database import connect_db
import bcrypt
import jwt
import os
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

SECRET_KEY = os.getenv("SECRET_KEY", "pookoo_secret_key_2024")
ALGORITHM = "HS256"


# =========================================
# MODELS
# =========================================

class SignupRequest(BaseModel):
    name: str
    email: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str


# =========================================
# HELPER — store token in DB
# =========================================

def store_token(token: str, email: str):
    """Store token→email mapping so session routes can verify auth."""
    try:
        conn = connect_db()
        cursor = conn.cursor()
        # Ensure table exists
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS user_tokens (
                token TEXT PRIMARY KEY,
                email TEXT NOT NULL
            )
        """)
        cursor.execute(
            "INSERT OR REPLACE INTO user_tokens (token, email) VALUES (?, ?)",
            (token, email)
        )
        conn.commit()
        conn.close()
    except Exception as e:
        print("STORE TOKEN ERROR:", str(e))


def create_token(email: str) -> str:
    payload = {
        "sub": email,
        "exp": datetime.utcnow() + timedelta(days=30)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


# =========================================
# SIGNUP
# =========================================

@router.post("/auth/signup")
def signup(request: SignupRequest):
    conn = connect_db()
    cursor = conn.cursor()

    # Check if email already exists
    cursor.execute("SELECT id FROM users WHERE email = ?", (request.email,))
    existing = cursor.fetchone()
    if existing:
        conn.close()
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash password
    hashed = bcrypt.hashpw(request.password.encode(), bcrypt.gensalt()).decode()

    cursor.execute(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        (request.name, request.email, hashed)
    )
    conn.commit()
    conn.close()

    token = create_token(request.email)
    store_token(token, request.email)

    return {
        "token": token,
        "access_token": token,
        "user": {"name": request.name, "email": request.email}
    }


# =========================================
# LOGIN
# =========================================

@router.post("/auth/login")
def login(request: LoginRequest):
    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT name, email, password FROM users WHERE email = ?",
        (request.email,)
    )
    row = cursor.fetchone()
    conn.close()

    if not row:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    name, email, hashed_pw = row

    if not bcrypt.checkpw(request.password.encode(), hashed_pw.encode()):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_token(email)
    store_token(token, email)

    return {
        "token": token,
        "access_token": token,
        "user": {"name": name, "email": email}
    }