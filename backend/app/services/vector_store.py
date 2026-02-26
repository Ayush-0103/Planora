import faiss
import numpy as np

dimension = 384  # all-MiniLM-L6-v2 output size
index = faiss.IndexFlatL2(dimension)

documents = []  # stores original text chunks


def add_embeddings(embeddings, texts):
    global documents

    index.add(embeddings)
    documents.extend(texts)


def search(query_embedding, top_k=3):

    if index.ntotal == 0:
        return []

    distances, indices = index.search(query_embedding, top_k)

    results = []

    for idx in indices[0]:
        if 0 <= idx < len(documents):
            results.append(documents[idx])

    return results