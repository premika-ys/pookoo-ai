# from fastapi import APIRouter
# from fastapi import UploadFile
# from fastapi import File

# import shutil


# router = APIRouter()


# @router.post("/upload-pdf")
# async def upload_pdf(
#     file: UploadFile = File(...)
# ):

#     # SAVE FILE PATH
#     file_path = f"uploads/{file.filename}"


#     # SAVE PDF
#     with open(file_path, "wb") as buffer:

#         shutil.copyfileobj(
#             file.file,
#             buffer
#         )


#     return {
#         "message": f"{file.filename} uploaded successfully"
#     }

# from fastapi import APIRouter, UploadFile, File

# import os

# from utils.loader import load_pdfs
# from utils.splitter import split_documents
# from utils.embeddings import get_embedding_model
# from utils.vectordb import create_vectorstore


# router = APIRouter()


# @router.post("/upload-pdf")
# async def upload_pdf(
#     file: UploadFile = File(...)
# ):

#     # CREATE uploads FOLDER
#     os.makedirs(
#         "uploads",
#         exist_ok=True
#     )

#     # FILE PATH
#     file_path = os.path.join(
#         "uploads",
#         file.filename
#     )

#     # SAVE PDF
#     with open(
#         file_path,
#         "wb"
#     ) as buffer:

#         buffer.write(
#             await file.read()
#         )

   
#     # LOAD PDF
   

#     documents = load_pdfs(
#         "uploads"
#     )

   
#     # SPLIT DOCUMENTS
   

#     chunks = split_documents(
#         documents
#     )

   
#     # LOAD EMBEDDING MODEL
   

#     embedding_model = get_embedding_model()

   
#     # CREATE VECTOR DATABASE
   

#     create_vectorstore(
#         chunks,
#         embedding_model
#     )

#     return {
#         "message":
#         f"{file.filename} uploaded and processed successfully"
#     }


# from fastapi import APIRouter, UploadFile, File, Form

# import os

# from utils.loader import load_pdfs
# from utils.splitter import split_documents
# from utils.embeddings import get_embedding_model
# from utils.vectordb import create_vectorstore


# router = APIRouter()


# @router.post("/upload-pdf")
# async def upload_pdf(

#     session_id: str = Form(...),

#     file: UploadFile = File(...)

# ):

#     # =========================
#     # SESSION FOLDER
#     # =========================

#     session_folder = f"uploads/{session_id}"

#     os.makedirs(
#         session_folder,
#         exist_ok=True
#     )

#     # =========================
#     # SAVE PDF
#     # =========================

#     file_path = os.path.join(
#         session_folder,
#         file.filename
#     )

#     with open(
#         file_path,
#         "wb"
#     ) as buffer:

#         buffer.write(
#             await file.read()
#         )

#     # =========================
#     # LOAD PDF
#     # =========================

#     documents = load_pdfs(
#         session_folder
#     )

#     # =========================
#     # SPLIT DOCUMENTS
#     # =========================

#     chunks = split_documents(
#         documents
#     )

#     # =========================
#     # EMBEDDING MODEL
#     # =========================

#     embedding_model = get_embedding_model()

#     # =========================
#     # SESSION VECTORSTORE
#     # =========================

#     create_vectorstore(

#         chunks,

#         embedding_model,

#         session_id
#     )

#     return {

#         "message":
#         f"{file.filename} uploaded successfully",

#         "session_id": session_id
#     }

#today

# from fastapi import APIRouter, UploadFile, File, Form

# import os

# from utils.loader import load_pdfs
# from utils.splitter import split_documents
# from utils.embeddings import get_embedding_model
# from utils.vectordb import create_vectorstore


# router = APIRouter()


# @router.post("/upload-pdf")
# async def upload_pdf(
#     session_id: str = Form(...),
#     file: UploadFile = File(...)
# ):

#     try:

#         # =========================
#         # CREATE SESSION UPLOAD FOLDER
#         # =========================

#         upload_path = f"uploads/{session_id}"

#         os.makedirs(
#             upload_path,
#             exist_ok=True
#         )

#         # =========================
#         # SAVE PDF
#         # =========================

#         file_path = os.path.join(
#             upload_path,
#             file.filename
#         )

#         with open(file_path, "wb") as buffer:

#             buffer.write(
#                 await file.read()
#             )

#         # =========================
#         # LOAD PDF
#         # =========================

#         documents = load_pdfs(
#             upload_path
#         )

#         # =========================
#         # SPLIT DOCUMENTS
#         # =========================

#         chunks = split_documents(
#             documents
#         )

#         # =========================
#         # LOAD EMBEDDING MODEL
#         # =========================

#         embedding_model = get_embedding_model()

#         # =========================
#         # CREATE SESSION VECTORSTORE
#         # =========================

#         create_vectorstore(
#             chunks,
#             embedding_model,
#             session_id
#         )

#         return {

#             "message":
#             f"{file.filename} uploaded successfully for this chat session."

#         }

#     except Exception as e:

#         print("UPLOAD ERROR:", str(e))

#         return {

#             "message":
#             "Oops 😅 I couldn't process that PDF. Please try uploading it again."

#         }



from fastapi import APIRouter, UploadFile, File, Form

import os

from utils.loader import load_selected_pdfs
from utils.splitter import split_documents
from utils.embeddings import get_embedding_model
from utils.vectordb import create_vectorstore


router = APIRouter()


@router.post("/upload-pdf")
async def upload_pdf(
    session_id: str = Form(...),
    file: UploadFile = File(...)
):

    try:

        # =========================
        # CREATE SESSION UPLOAD FOLDER
        # =========================

        upload_path = f"uploads/{session_id}"

        os.makedirs(
            upload_path,
            exist_ok=True
        )

        # =========================
        # SAVE PDF
        # =========================

        file_path = os.path.join(
            upload_path,
            file.filename
        )

        with open(file_path, "wb") as buffer:

            buffer.write(
                await file.read()
            )

        # =========================
        # LOAD ONLY THE NEW PDF
        # FIX: previously load_pdfs() loaded ALL
        # PDFs in the folder on every upload, which
        # caused duplicate chunks in the vectorstore
        # when a second PDF was added. Now we load
        # only the file that was just uploaded.
        # The vectorstore.add_documents() in
        # create_vectorstore() handles appending it
        # to the existing index correctly.
        # =========================

        documents = load_selected_pdfs(
            upload_path,
            [file.filename]
        )

        # =========================
        # SPLIT DOCUMENTS
        # =========================

        chunks = split_documents(
            documents
        )

        # =========================
        # LOAD EMBEDDING MODEL
        # =========================

        embedding_model = get_embedding_model()

        # =========================
        # CREATE / APPEND TO SESSION VECTORSTORE
        # =========================

        create_vectorstore(
            chunks,
            embedding_model,
            session_id
        )

        return {

            "message":
            f"{file.filename} uploaded successfully for this chat session."

        }

    except Exception as e:

        print("UPLOAD ERROR:", str(e))

        return {

            "message":
            "Oops 😅 I couldn't process that PDF. Please try uploading it again."

        }