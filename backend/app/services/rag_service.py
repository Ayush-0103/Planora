from pypdf import PdfReader
import numpy as np
import os
from dotenv import load_dotenv
from openai import OpenAI

from app.services.embedding_service import generate_embedding
from app.services.vector_store import add_embeddings, search

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def extract_text_from_pdf(file_path: str):
    reader = PdfReader(file_path)
    text = ""

    for page in reader.pages:
        extracted = page.extract_text()
        if extracted:
            text += extracted + "\n"

    return text


def chunk_text(text: str, chunk_size: int = 500):
    chunks = []
    for i in range(0, len(text), chunk_size):
        chunks.append(text[i:i + chunk_size])
    return chunks


def process_pdf(file_path: str):
    text = extract_text_from_pdf(file_path)
    chunks = chunk_text(text)

    embeddings = []
    for chunk in chunks:
        embedding = generate_embedding(chunk)
        embeddings.append(embedding)

    embeddings = np.vstack(embeddings)

    add_embeddings(embeddings, chunks)

    return {
        "message": "PDF processed successfully",
        "chunks_added": len(chunks)
    }


def answer_question(question: str):

    # 1️⃣ Embed query
    query_embedding = generate_embedding(question)
    query_embedding = np.array([query_embedding])

    # 2️⃣ Retrieve top chunks
    retrieved_chunks = search(query_embedding, top_k=3)

    context = "\n\n".join(retrieved_chunks)

    prompt = f"""
Answer the question ONLY from the provided context.
If answer is not found, say "Answer not found in provided material."

Context:
{context}

Question:
{question}
"""

    # 3️⃣ Ask LLM
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a strict academic assistant."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.2
    )

    return response.choices[0].message.content