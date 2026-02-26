from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from dotenv import load_dotenv

load_dotenv()

from app.database import Base, engine
import app.models  # IMPORTANT: loads all models

from app.routes.auth import router as auth_router
from app.routes.study_plans import router as study_plans_router
from app.routes.rag import router as rag_router


app = FastAPI(title="Planora API")

# Create tables
Base.metadata.create_all(bind=engine)

# Allow frontend connection
origins = [
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Welcome to Planora Backend 🚀"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.get("/db-test")
def db_test():
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))
    return {"db_status": "connected"}


# Routers
app.include_router(auth_router)
app.include_router(study_plans_router)
app.include_router(rag_router)