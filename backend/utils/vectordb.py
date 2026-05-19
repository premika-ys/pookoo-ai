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