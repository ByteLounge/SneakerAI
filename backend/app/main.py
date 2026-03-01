from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.core.database import engine, Base, get_db
from app.core.config import settings

# In a real app we'd use Alembic, but for this setup we'll create tables here
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="AI-powered sneaker resale prediction API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "healthy", "version": "1.0.0"}

from app.api import endpoints

app.include_router(endpoints.router, prefix="/api", tags=["api"])
