from fastapi import APIRouter, UploadFile, File
import shutil
from app.services.rag_service import process_pdf, answer_question

router = APIRouter(prefix="/rag", tags=["RAG"])


@router.post("/upload")
def upload_pdf(file: UploadFile = File(...)):
    file_path = f"temp_{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return process_pdf(file_path)


@router.post("/ask")
def ask_question(question: str):
    answer = answer_question(question)
    return {"answer": answer}