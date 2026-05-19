# from langchain_community.vectorstores import FAISS
# import os

# VECTOR_DB_PATH = "vectorstore"

# def create_vectorstore(chunks, embedding_model):

#     faiss_file = os.path.join(
#         VECTOR_DB_PATH,
#         "index.faiss"
#     )

   
#     # load exit db 
    

#     if os.path.exists(faiss_file):

#         vectorstore = FAISS.load_local(
#             VECTOR_DB_PATH,
#             embedding_model,
#             allow_dangerous_deserialization=True
#         )

#         print("Existing Vector DB Loaded")

#    #create new db

#     else:

#         vectorstore = FAISS.from_documents(
#             documents=chunks,
#             embedding=embedding_model
#         )

#         vectorstore.save_local(
#             VECTOR_DB_PATH
#         )

#         print("New Vector DB Created")

#     return vectorstore

##upload file bot

# from langchain_community.vectorstores import FAISS


# def create_vectorstore(
#     chunks,
#     embedding_model
# ):

#     vectorstore = FAISS.from_documents(
#         chunks,
#         embedding_model
#     )

#     # SAVE VECTOR DATABASE
#     vectorstore.save_local(
#         "vectorstore"
#     )

#     return vectorstore



# # LOAD EXISTING VECTORSTORE
# def load_vectorstore(
#     embedding_model
# ):

#     vectorstore = FAISS.load_local(
#         "vectorstore",
#         embedding_model,
#         allow_dangerous_deserialization=True
#     )

#     return vectorstore

# from langchain_community.vectorstores import FAISS


# # =========================================
# # CREATE VECTOR STORE
# # =========================================

# def create_vectorstore(
#     chunks,
#     embedding_model
# ):

#     # CREATE FAISS DATABASE

#     vectorstore = FAISS.from_documents(

#         chunks,

#         embedding_model

#     )

#     # SAVE VECTOR DATABASE

#     vectorstore.save_local(
#         "vectorstore"
#     )

#     print("Vectorstore created successfully.")

#     return vectorstore


# # =========================================
# # LOAD VECTOR STORE
# # =========================================

# def load_vectorstore(
#     embedding_model
# ):

#     vectorstore = FAISS.load_local(

#         "vectorstore",

#         embedding_model,

#         allow_dangerous_deserialization=True

#     )

#     print("Vectorstore loaded successfully.")

#     return vectorstore


# # =========================================
# # SMART RETRIEVER
# # =========================================

# def get_retriever(vectorstore):

#     retriever = vectorstore.as_retriever(

#         search_type="mmr",

#         search_kwargs={

#             # NUMBER OF FINAL CHUNKS
#             "k": 6,

#             # SEARCH MORE CHUNKS INTERNALLY
#             "fetch_k": 20,

#             # DIVERSITY CONTROL
#             "lambda_mult": 0.7

#         }

#     )

#     return retriever

# from langchain_community.vectorstores import FAISS

# import os


# # =========================================
# # CREATE VECTOR STORE
# # =========================================

# def create_vectorstore(

#     chunks,

#     embedding_model,

#     session_id

# ):

#     # =========================
#     # SESSION VECTORSTORE PATH
#     # =========================

#     vectorstore_path = f"vectorstore/{session_id}"

#     os.makedirs(
#         vectorstore_path,
#         exist_ok=True
#     )

#     # =========================
#     # CREATE FAISS DATABASE
#     # =========================

#     vectorstore = FAISS.from_documents(

#         chunks,

#         embedding_model

#     )

#     # =========================
#     # SAVE VECTORSTORE
#     # =========================

#     vectorstore.save_local(
#         vectorstore_path
#     )

#     print(f"Vectorstore created for session: {session_id}")

#     return vectorstore


# # =========================================
# # LOAD VECTOR STORE
# # =========================================

# def load_vectorstore(

#     embedding_model,

#     session_id

# ):

#     # =========================
#     # SESSION VECTORSTORE PATH
#     # =========================

#     vectorstore_path = f"vectorstore/{session_id}"

#     # =========================
#     # CHECK EXISTENCE
#     # =========================

#     if not os.path.exists(vectorstore_path):

#         return None

#     # =========================
#     # LOAD VECTORSTORE
#     # =========================

#     vectorstore = FAISS.load_local(

#         vectorstore_path,

#         embedding_model,

#         allow_dangerous_deserialization=True

#     )

#     print(f"Vectorstore loaded for session: {session_id}")

#     return vectorstore


# # =========================================
# # SMART RETRIEVER
# # =========================================

# def get_retriever(vectorstore):

#     retriever = vectorstore.as_retriever(

#         search_type="mmr",

#         search_kwargs={

#             "k": 6,

#             "fetch_k": 20,

#             "lambda_mult": 0.7

#         }

#     )

#     return retriever

# from langchain_community.vectorstores import FAISS

# import os


# # =========================================
# # CREATE / UPDATE VECTOR STORE
# # =========================================

# def create_vectorstore(

#     chunks,

#     embedding_model,

#     session_id

# ):

#     # =========================
#     # SESSION VECTORSTORE PATH
#     # =========================

#     vectorstore_path = f"vectorstore/{session_id}"

#     os.makedirs(
#         "vectorstore",
#         exist_ok=True
#     )

#     # =========================
#     # IF VECTORSTORE EXISTS
#     # APPEND NEW DOCUMENTS
#     # =========================

#     if os.path.exists(vectorstore_path):

#         print("Existing vectorstore found. Adding new PDFs...")

#         vectorstore = FAISS.load_local(

#             vectorstore_path,

#             embedding_model,

#             allow_dangerous_deserialization=True

#         )

#         # ADD NEW CHUNKS
#         vectorstore.add_documents(chunks)

#     else:

#         print("Creating new vectorstore...")

#         vectorstore = FAISS.from_documents(

#             chunks,

#             embedding_model

#         )

#     # =========================
#     # SAVE VECTORSTORE
#     # =========================

#     vectorstore.save_local(
#         vectorstore_path
#     )

#     print(f"Vectorstore ready for session: {session_id}")

#     return vectorstore


# # =========================================
# # LOAD VECTOR STORE
# # =========================================

# def load_vectorstore(

#     embedding_model,

#     session_id

# ):

#     # =========================
#     # SESSION VECTORSTORE PATH
#     # =========================

#     vectorstore_path = f"vectorstore/{session_id}"

#     # =========================
#     # CHECK EXISTENCE
#     # =========================

#     if not os.path.exists(vectorstore_path):

#         return None

#     # =========================
#     # LOAD VECTORSTORE
#     # =========================

#     vectorstore = FAISS.load_local(

#         vectorstore_path,

#         embedding_model,

#         allow_dangerous_deserialization=True

#     )

#     print(f"Vectorstore loaded for session: {session_id}")

#     return vectorstore


# # =========================================
# # SMART RETRIEVER
# # =========================================

# def get_retriever(vectorstore):

#     retriever = vectorstore.as_retriever(

#         search_type="mmr",

#         search_kwargs={

#             "k": 6,

#             "fetch_k": 20,

#             "lambda_mult": 0.7

#         }

#     )

#     return retriever



# from langchain_community.vectorstores import FAISS

# import os


# # =========================================
# # CREATE / UPDATE VECTOR STORE
# # =========================================

# def create_vectorstore(

#     chunks,

#     embedding_model,

#     session_id

# ):

#     # =========================
#     # SESSION VECTORSTORE PATH
#     # =========================

#     vectorstore_path = f"vectorstore/{session_id}"

#     os.makedirs(
#         "vectorstore",
#         exist_ok=True
#     )

#     # =========================
#     # IF VECTORSTORE EXISTS
#     # APPEND NEW DOCUMENTS
#     # =========================

#     if os.path.exists(vectorstore_path):

#         print("Existing vectorstore found. Adding new PDFs...")

#         vectorstore = FAISS.load_local(

#             vectorstore_path,

#             embedding_model,

#             allow_dangerous_deserialization=True

#         )

#         # ADD NEW CHUNKS
#         vectorstore.add_documents(chunks)

#     else:

#         print("Creating new vectorstore...")

#         vectorstore = FAISS.from_documents(

#             chunks,

#             embedding_model

#         )

#     # =========================
#     # SAVE VECTORSTORE
#     # =========================

#     vectorstore.save_local(
#         vectorstore_path
#     )

#     print(f"Vectorstore ready for session: {session_id}")

#     return vectorstore


# # =========================================
# # LOAD VECTOR STORE
# # =========================================

# def load_vectorstore(

#     embedding_model,

#     session_id

# ):

#     # =========================
#     # SESSION VECTORSTORE PATH
#     # =========================

#     vectorstore_path = f"vectorstore/{session_id}"

#     # =========================
#     # CHECK EXISTENCE
#     # =========================

#     if not os.path.exists(vectorstore_path):

#         return None

#     # =========================
#     # LOAD VECTORSTORE
#     # =========================

#     vectorstore = FAISS.load_local(

#         vectorstore_path,

#         embedding_model,

#         allow_dangerous_deserialization=True

#     )

#     print(f"Vectorstore loaded for session: {session_id}")

#     return vectorstore


# # =========================================
# # SMART RETRIEVER
# # Multi-PDF aware: fetches more candidates
# # and uses similarity (not MMR) so chunks
# # from ALL uploaded PDFs get a fair chance
# # to surface based on the question's topic.
# #
# # Why these values:
# #   k=10       — return top 10 chunks so even
# #                smaller PDFs get representation
# #   fetch_k=50 — scan 50 candidates before
# #                ranking, ensuring chunks from
# #                every PDF are in the pool
# #   lambda_mult=0.5 — balanced diversity so
# #                one PDF doesn't dominate
# # =========================================

# def get_retriever(vectorstore):

#     retriever = vectorstore.as_retriever(

#         search_type="mmr",

#         search_kwargs={

#             "k": 10,

#             "fetch_k": 50,

#             "lambda_mult": 0.5

#         }

#     )

#     return retriever



# from langchain_community.vectorstores import FAISS

# import os


# # =========================================
# # CREATE / UPDATE VECTOR STORE
# # =========================================

# def create_vectorstore(

#     chunks,

#     embedding_model,

#     session_id

# ):

#     # =========================
#     # SESSION VECTORSTORE PATH
#     # =========================

#     vectorstore_path = f"vectorstore/{session_id}"

#     os.makedirs(
#         "vectorstore",
#         exist_ok=True
#     )

#     # =========================
#     # IF VECTORSTORE EXISTS
#     # APPEND NEW DOCUMENTS
#     # =========================

#     if os.path.exists(vectorstore_path):

#         print("Existing vectorstore found. Adding new PDFs...")

#         vectorstore = FAISS.load_local(

#             vectorstore_path,

#             embedding_model,

#             allow_dangerous_deserialization=True

#         )

#         # ADD NEW CHUNKS ONLY
#         vectorstore.add_documents(chunks)

#     else:

#         print("Creating new vectorstore...")

#         vectorstore = FAISS.from_documents(

#             chunks,

#             embedding_model

#         )

#     # =========================
#     # SAVE VECTORSTORE
#     # =========================

#     vectorstore.save_local(
#         vectorstore_path
#     )

#     print(f"Vectorstore ready for session: {session_id}")

#     return vectorstore


# # =========================================
# # LOAD VECTOR STORE
# # =========================================

# def load_vectorstore(

#     embedding_model,

#     session_id

# ):

#     # =========================
#     # SESSION VECTORSTORE PATH
#     # =========================

#     vectorstore_path = f"vectorstore/{session_id}"

#     # =========================
#     # CHECK EXISTENCE
#     # =========================

#     if not os.path.exists(vectorstore_path):

#         return None

#     # =========================
#     # LOAD VECTORSTORE
#     # =========================

#     vectorstore = FAISS.load_local(

#         vectorstore_path,

#         embedding_model,

#         allow_dangerous_deserialization=True

#     )

#     print(f"Vectorstore loaded for session: {session_id}")

#     return vectorstore


# # =========================================
# # SMART RETRIEVER
# #
# # WHY SIMILARITY INSTEAD OF MMR:
# # MMR (Maximal Marginal Relevance) penalises
# # chunks that are similar to each other to
# # maximise diversity. When one PDF is much
# # larger than another, MMR ends up spreading
# # results across both PDFs even when the
# # question is clearly about only one of them.
# # This causes relevant chunks from the target
# # PDF to be dropped in favour of unrelated
# # chunks from the other PDF.
# #
# # Similarity search ranks purely by relevance
# # to the question — whichever PDF has the
# # most relevant content wins, which is exactly
# # what we want for accurate Q&A.
# #
# # VALUES:
# #   search_type="similarity" — pure relevance
# #   k=6 — top 6 most relevant chunks
# #         enough context without noise
# # =========================================

# def get_retriever(vectorstore):

#     retriever = vectorstore.as_retriever(

#         search_type="similarity",

#         search_kwargs={

#                        "k": 6,

#             "fetch_k": 20,

#           "lambda_mult": 0.7

#         }

#     )

#     return retriever




from langchain_community.vectorstores import FAISS

import os


# =========================================
# CREATE / UPDATE VECTOR STORE
# =========================================

def create_vectorstore(

    chunks,

    embedding_model,

    session_id

):

    # =========================
    # SESSION VECTORSTORE PATH
    # =========================

    vectorstore_path = f"vectorstore/{session_id}"

    os.makedirs(
        "vectorstore",
        exist_ok=True
    )

    # =========================
    # IF VECTORSTORE EXISTS
    # APPEND NEW DOCUMENTS
    # =========================

    if os.path.exists(vectorstore_path):

        print("Existing vectorstore found. Adding new PDFs...")

        vectorstore = FAISS.load_local(

            vectorstore_path,

            embedding_model,

            allow_dangerous_deserialization=True

        )

        # ADD NEW CHUNKS ONLY
        vectorstore.add_documents(chunks)

    else:

        print("Creating new vectorstore...")

        vectorstore = FAISS.from_documents(

            chunks,

            embedding_model

        )

    # =========================
    # SAVE VECTORSTORE
    # =========================

    vectorstore.save_local(
        vectorstore_path
    )

    print(f"Vectorstore ready for session: {session_id}")

    return vectorstore


# =========================================
# LOAD VECTOR STORE
# =========================================

def load_vectorstore(

    embedding_model,

    session_id

):

    # =========================
    # SESSION VECTORSTORE PATH
    # =========================

    vectorstore_path = f"vectorstore/{session_id}"

    # =========================
    # CHECK EXISTENCE
    # =========================

    if not os.path.exists(vectorstore_path):

        return None

    # =========================
    # LOAD VECTORSTORE
    # =========================

    vectorstore = FAISS.load_local(

        vectorstore_path,

        embedding_model,

        allow_dangerous_deserialization=True

    )

    print(f"Vectorstore loaded for session: {session_id}")

    return vectorstore


# =========================================
# SMART RETRIEVER
#
# FIX — k increased from 6 → 10:
# With 2 PDFs (144 total chunks), k=6 was
# too aggressive. The 2nd PDF's chunks were
# being outscored by the 1st PDF's chunks on
# every query, so questions about the 2nd PDF
# got no relevant context at all.
#
# k=10 ensures enough chunks are pulled that
# both PDFs have a fair chance of contributing
# relevant context for any question.
#
# fetch_k=30 (the candidate pool FAISS scans
# before scoring) gives the similarity search
# enough candidates to find the right chunks
# even when the PDFs are very different sizes.
#
# WHY SIMILARITY INSTEAD OF MMR:
# MMR penalises similar chunks for diversity.
# When one PDF is much larger, MMR spreads
# results across both PDFs even when the
# question is about only one — dropping the
# most relevant chunks. Similarity ranks
# purely by relevance to the question.
# =========================================

def get_retriever(vectorstore):

    retriever = vectorstore.as_retriever(

        search_type="similarity",

        search_kwargs={

            # FIX: increased from 6 → 10
            # so 2nd PDF chunks aren't starved
            "k": 10,

            # FIX: scan 30 candidates before
            # scoring — gives FAISS enough pool
            # to surface chunks from both PDFs
            "fetch_k": 30,

        }

    )

    return retriever