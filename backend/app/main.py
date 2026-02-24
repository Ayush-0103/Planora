from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.database import Base, engine
import app.models  # IMPORTANT: loads all models
from app.routes.auth import router as auth_router

app = FastAPI(title="Planora API")

# Create tables
Base.metadata.create_all(bind=engine)

# Allow frontend connection
origins = [
    "http://localhost:5173",
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

app.include_router(auth_router)
from app.routes.study_plans import router as study_plans_router
app.include_router(study_plans_router)