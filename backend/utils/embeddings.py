from langchain_community.embeddings import HuggingFaceEmbeddings


# =========================================
# EMBEDDING MODEL
#
# FIX — upgraded from all-MiniLM-L6-v2
# to BAAI/bge-small-en-v1.5
#
# WHY all-MiniLM-L6-v2 was failing:
# - Only 384 dimensions — too low for
#   distinguishing chunks across very
#   different domain PDFs (e.g. health
#   policy vs AI lecture notes)
# - Short vague queries like "what is ai"
#   scored almost equally against health
#   policy chunks because MiniLM cannot
#   separate domain-specific semantics well
# - Result: wrong PDF's chunks always won
#
# WHY BAAI/bge-small-en-v1.5:
# - Same small size — no RAM/speed penalty
# - Trained specifically for retrieval tasks
#   (not just sentence similarity like MiniLM)
# - Scores domain-specific queries far more
#   accurately across mixed-domain PDFs
# - Free, no API key, runs fully local
# - Top performer on MTEB retrieval benchmark
#   in the small model category
#
# encode_kwargs normalize=True ensures
# cosine similarity scores are consistent
# and comparable across all chunk sizes.
# =========================================

def get_embedding_model():

    embedding_model = HuggingFaceEmbeddings(

        # FIX: upgraded from all-MiniLM-L6-v2
        model_name="BAAI/bge-small-en-v1.5",

        encode_kwargs={
            # Normalize vectors for consistent
            # cosine similarity scoring
            "normalize_embeddings": True
        }

    )

    return embedding_model