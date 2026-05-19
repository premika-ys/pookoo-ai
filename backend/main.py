from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ROUTES
from routes.upload_routes import router as upload_router
from routes.chat_routes import router as chat_router
from routes.summary_routes import router as summary_router
from routes.quiz_routes import router as quiz_router
from routes.auth_routes import router as auth_router
from routes.flashcard_routes import router as flashcard_router
from routes.session_routes import router as session_router


# =========================
# CREATE FASTAPI APP
# =========================

app = FastAPI()


# =========================
# CORS SETTINGS
# Allows React frontend to
# communicate with backend
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================
# REGISTER ROUTES
# =========================

app.include_router(upload_router)

app.include_router(chat_router)

app.include_router(summary_router)

app.include_router(quiz_router)

app.include_router(flashcard_router)

app.include_router(auth_router)
app.include_router(session_router)


# =========================
# HOME ROUTE
# =========================

@app.get("/")
def home():

    return {

        "message": "POOKOO AI Backend Running"

    }