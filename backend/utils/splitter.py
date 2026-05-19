# from langchain_text_splitters import RecursiveCharacterTextSplitter

# def split_documents(documents):

#     splitter = RecursiveCharacterTextSplitter(
#         chunk_size=500,
#         chunk_overlap=50
#     )

#     chunks = splitter.split_documents(documents)

#     return chunks

# from langchain_text_splitters import (
#     RecursiveCharacterTextSplitter
# )


# # =========================================
# # SPLIT DOCUMENTS
# # =========================================

# def split_documents(documents):

#     splitter = RecursiveCharacterTextSplitter(

#         # LARGER CHUNKS
#         chunk_size=1200,

#         # BETTER CONTEXT CONTINUITY
#         chunk_overlap=250,

#         # SMART SEPARATORS
#         separators=[

#             "\n\n",

#             "\n",

#             ". ",

#             " ",

#             ""

#         ]

#     )

#     chunks = splitter.split_documents(
#         documents
#     )

#     print(f"Total chunks created: {len(chunks)}")

#     return chunks



from langchain_text_splitters import (
    RecursiveCharacterTextSplitter
)


# =========================================
# SPLIT DOCUMENTS
#
# FIX — chunk_size reduced 1200 → 800,
# chunk_overlap increased 250 → 200.
#
# WHY:
# Large government/policy PDFs (like PM Yasasvi
# scheme) contain specific facts — scholarship
# amounts, eligibility criteria, clause numbers —
# buried inside long paragraphs. With chunk_size
# 1200, those specific facts share a chunk with
# too much surrounding text, which dilutes their
# relevance score during FAISS similarity search.
#
# Smaller chunks (800 chars) mean each chunk is
# more focused on one specific fact or clause.
# When the student asks "what is the scholarship
# amount", the chunk that CONTAINS that number
# now scores much higher because it is not
# competing with 400 chars of unrelated text
# in the same chunk.
#
# chunk_overlap=200 ensures facts that fall near
# a chunk boundary are still captured in full
# by at least one of the two adjacent chunks.
#
# This benefits ALL PDF types:
# - Policy docs: specific amounts, clauses → more precise
# - Lecture notes: concept definitions → cleaner isolation
# - Research papers: key findings → higher retrieval score
# =========================================

def split_documents(documents):

    splitter = RecursiveCharacterTextSplitter(

        # FIX: reduced from 1200 → 800
        # so specific facts score higher in retrieval
        chunk_size=800,

        # Overlap ensures boundary facts aren't lost
        chunk_overlap=200,

        # SMART SEPARATORS
        separators=[

            "\n\n",

            "\n",

            ". ",

            " ",

            ""

        ]

    )

    chunks = splitter.split_documents(
        documents
    )

    print(f"Total chunks created: {len(chunks)}")

    return chunks