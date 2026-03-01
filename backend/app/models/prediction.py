from sqlalchemy import Column, Integer, Float, ForeignKey, DateTime, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    sneaker_id = Column(Integer, ForeignKey("sneakers.id"), nullable=False, index=True)
    predicted_price = Column(Float, nullable=False)
    confidence_score = Column(Float, nullable=False)
    
    # Metadata about the prediction run
    model_version = Column(String, nullable=False, default="v1.0")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    sneaker = relationship("Sneaker")
