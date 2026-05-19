# # from utils.loader import load_pdf
# # from utils.splitter import split_documents
# # from utils.embeddings import get_embedding_model
# # from utils.vectordb import create_vectorstore
# # from utils.chatbot import create_chatbot



# # # load pdf


# # documents = load_pdf(
# #     "data/PM_Yasasvi_scheme.pdf"
# # )

# # print("PDF Loaded Successfully")



# # # split doc


# # chunks = split_documents(documents)

# # print("Chunks Created:", len(chunks))

# # print(chunks[0])



# # # embedding


# # embedding_model = get_embedding_model()

# # print("Embedding Model Loaded")



# # # vector database


# # vectorstore = create_vectorstore(
# #     chunks,
# #     embedding_model
# # )

# # print("Vector Database Ready")


# # # chatbot


# # retrieval_chain = create_chatbot(vectorstore)

# # print("Chatbot Ready")


# # # chat loop


# # while True:

# #     question = input("\nAsk Question: ")

# #     if question.lower() == "exit":
# #         break

# #     response = retrieval_chain.invoke({
# #         "input": question
# #     })

# #     print("\nAnswer:")
# #     print(response["answer"])

# #multiple pdf

# # from utils.loader import load_pdfs
# # from utils.splitter import split_documents
# # from utils.embeddings import get_embedding_model
# # from utils.vectordb import create_vectorstore
# # from utils.chatbot import create_chatbot
# # from utils.summary import summarize_topic
# # from utils.quiz import generate_quiz


# # # LOAD MULTIPLE PDFs


# # documents = load_pdfs("data")

# # print("All PDFs Loaded Successfully")


# # # SPLIT DOCUMENTS


# # chunks = split_documents(documents)

# # print("Chunks Created:", len(chunks))


# # # LOAD EMBEDDING MODEL


# # embedding_model = get_embedding_model()

# # print("Embedding Model Loaded")


# # # CREATE VECTOR DATABASE


# # vectorstore = create_vectorstore(
# #     chunks,
# #     embedding_model
# # )

# # print("Vector Database Ready")


# # # CREATE CHATBOT


# # retrieval_chain = create_chatbot(vectorstore)

# # print("Student Assistant Ready")


# # # CHAT LOOP


# # while True:

# #     question = input("\nAsk Question: ")

# #     if question.lower() == "exit":
# #         break

# #     response = retrieval_chain.invoke({
# #         "input": question
# #     })

# #     print("\nAnswer:")
# #     print(response["answer"])

# #multiple pdf with summaries and quiz
# from utils.loader import load_pdfs
# from utils.splitter import split_documents
# from utils.embeddings import get_embedding_model
# from utils.vectordb import create_vectorstore
# from utils.chatbot import create_chatbot
# from utils.summary import summarize_topic
# from utils.quiz import generate_quiz



# # LOAD MULTIPLE PDFs


# documents = load_pdfs("data")

# print("All PDFs Loaded Successfully")



# # SPLIT DOCUMENTS


# chunks = split_documents(documents)

# print("Chunks Created:", len(chunks))



# # LOAD EMBEDDING MODEL


# embedding_model = get_embedding_model()

# print("Embedding Model Loaded")



# # CREATE VECTOR DATABASE


# vectorstore = create_vectorstore(
#     chunks,
#     embedding_model
# )

# print("Vector Database Ready")



# # CREATE CHATBOT


# retrieval_chain = create_chatbot(vectorstore)

# print("Student Assistant Ready")



# # CHAT LOOP # work like Command-line tool


# # while True:

# #     question = input("\nAsk Question: ")

# #     # EXIT
# #     if question.lower() == "exit":
# #         break


    
# #     # SUMMARY COMMAND
    

# #     elif question.startswith("summary:"): #Command-based chatbot summary: started one and quiz started one

# #         topic = question.replace(
# #             "summary:",
# #             ""
# #         ).strip()

# #         result = summarize_topic(
# #             retrieval_chain,
# #             topic
# #         )

# #         print("\nSummary:")
# #         print(result)


    
# #     # QUIZ COMMAND
    

# #     elif question.startswith("quiz:"):# rule based

# #         topic = question.replace(
# #             "quiz:",
# #             ""
# #         ).strip()

# #         result = generate_quiz(
# #             retrieval_chain,
# #             topic
# #         )

# #         print("\nQuiz:")
# #         print(result)


   
# #     # NORMAL CHATBOT
   

# #     else:

# #         response = retrieval_chain.invoke({
# #             "input": question
# #         })

# #         print("\nAnswer:")
# #         print(response["answer"])


       
# #         # SHOW SOURCES
      

# #         print("\nSources:")

# #         sources = set()

# #         for doc in response["context"]:

# #             source = doc.metadata.get(
# #                 "source",
# #                 "Unknown Source"
# #             )

# #             if source not in sources:

# #                 print(source)

# #                 sources.add(source)


# while True:

#     question = input("\nAsk Question: ")

#     # EXIT
#     if question.lower() == "exit":
#         break


   
#     # SUMMARY REQUESTS
   

#     elif (
#         "summary" in question.lower()
#         or "summarize" in question.lower()
#     ):

#         result = summarize_topic(
#             retrieval_chain,
#             question
#         )

#         print("\nSummary:")
#         print(result)


   
#     # QUIZ REQUESTS
    

#     elif (
#         "quiz" in question.lower()
#         or "mcq" in question.lower()
#         or "questions" in question.lower()
#     ):

#         result = generate_quiz(
#             retrieval_chain,
#             question
#         )

#         print("\nQuiz:")
#         print(result)


    
#     # NORMAL CHATBOT
   

#     else:

#         response = retrieval_chain.invoke({
#             "input": question
#         })

#         print("\nAnswer:")
#         print(response["answer"])


        
#         # SOURCES
      

#         print("\nSources:")

#         sources = set()

#         for doc in response["context"]:

#             source = doc.metadata.get(
#                 "source",
#                 "Unknown Source"
#             )

#             if source not in sources:

#                 print(source)

#                 sources.add(source)


## file upload bot

# from fastapi import FastAPI

# from routes.upload_routes import router as upload_router
# from routes.chat_routes import router as chat_router
# from routes.summary_routes import router as summary_router
# from routes.quiz_routes import router as quiz_router


# app = FastAPI()


# # REGISTER ROUTES

# app.include_router(upload_router)

# app.include_router(chat_router)

# app.include_router(summary_router)

# app.include_router(quiz_router)


# @app.get("/")
# def home():

#     return {
#         "message": "RAG Student Assistant Backend Running"
#     }


# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware

# from routes.upload_routes import router as upload_router
# from routes.chat_routes import router as chat_router
# from routes.summary_routes import router as summary_router
# from routes.quiz_routes import router as quiz_router


# # CREATE FASTAPI APP

# app = FastAPI()


# # CORS SETTINGS
# # Allows React frontend to talk with FastAPI backend

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# # REGISTER ROUTES

# app.include_router(upload_router)

# app.include_router(chat_router)

# app.include_router(summary_router)

# app.include_router(quiz_router)


# # HOME ROUTE

# @app.get("/")
# def home():

#     return {
#         "message": "RAG Student Assistant Backend Running"
#     }


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