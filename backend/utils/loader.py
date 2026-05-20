"""
loader.py
─────────
Provides two loaders:
  load_pdfs(data_folder)                  – existing: loads ALL PDFs in a folder
  load_selected_pdfs(data_folder, names)  – NEW: loads ONLY the listed filenames

The existing load_pdfs function is untouched so nothing else breaks.
"""

import os

from langchain_community.document_loaders import PyPDFLoader
# from langchain.schema import Document
from langchain_core.documents import Document

try:
    from unstructured.partition.pdf import partition_pdf
    UNSTRUCTURED_AVAILABLE = True
except ImportError:
    UNSTRUCTURED_AVAILABLE = False


# ─── Shared helper ────────────────────────────────────────────────────────────

def _load_single_pdf(pdf_path: str, filename: str) -> list:
    """Load one PDF file, falling back to OCR if normal extraction fails."""
    try:
        loader = PyPDFLoader(pdf_path)
        documents = loader.load()
        print(f"  Normal extraction: {filename}")
    except Exception as e:
        print(f"  Normal extraction failed for {filename}: {e}")
        if UNSTRUCTURED_AVAILABLE:
            print(f"  Switching to OCR for {filename}...")
            elements = partition_pdf(
                filename=pdf_path,
                strategy="hi_res",
                infer_table_structure=True,
            )
            text = "\n".join([str(el) for el in elements])
            documents = [Document(page_content=text, metadata={"source": filename})]
        else:
            print(f"  unstructured not available; skipping {filename}")
            documents = []

    # Ensure source metadata is set
    for doc in documents:
        doc.metadata["source"] = filename

    return documents


# ─── Original function (UNCHANGED) ───────────────────────────────────────────

def load_pdfs(data_folder: str) -> list:
    """Load ALL PDFs from data_folder. Used by the main chatbot pipeline."""
    all_documents = []

    for file in os.listdir(data_folder):
        if not file.endswith(".pdf"):
            continue

        pdf_path = os.path.join(data_folder, file)
        print(f"\nLoading {file}...")

        documents = _load_single_pdf(pdf_path, file)
        all_documents.extend(documents)

        if documents:
            print(f"{file} loaded successfully ({len(documents)} chunks)")

    return all_documents


# ─── NEW: selective loader ────────────────────────────────────────────────────

def load_selected_pdfs(data_folder: str, selected_filenames: list) -> list:
    """
    Load ONLY the PDFs whose filenames appear in selected_filenames.

    Args:
        data_folder:        Path to the session's uploads directory
                            e.g. "uploads/<session_id>"
        selected_filenames: List of bare filenames sent by the frontend
                            e.g. ["AI_Research.pdf", "NLP_Notes.pdf"]

    Returns:
        List of LangChain Document objects from the selected files only.
    """
    if not selected_filenames:
        # Caller passed an empty list — fall back to all PDFs
        print("load_selected_pdfs: no filenames given, loading all PDFs")
        return load_pdfs(data_folder)

    # Normalise for case-insensitive comparison
    wanted = {name.strip() for name in selected_filenames}

    all_documents = []

    for filename in os.listdir(data_folder):
        if not filename.endswith(".pdf"):
            continue
        if filename not in wanted:
            continue

        pdf_path = os.path.join(data_folder, filename)
        print(f"\nSelectively loading {filename}...")

        documents = _load_single_pdf(pdf_path, filename)
        all_documents.extend(documents)

        if documents:
            print(f"{filename} loaded ({len(documents)} chunks)")

    if not all_documents:
        print("load_selected_pdfs: no matching files found in folder")

    return all_documents