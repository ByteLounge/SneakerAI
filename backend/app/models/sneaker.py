from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime
from sqlalchemy.sql import func
from app.core.database import Base

class Sneaker(Base):
    __tablename__ = "sneakers"

    id = Column(Integer, primary_key=True, index=True)
    sku = Column(String, unique=True, index=True, nullable=False)
    brand = Column(String, index=True, nullable=False)
    model_name = Column(String, index=True, nullable=False)
    colorway = Column(String)
    retail_price = Column(Float, nullable=False)
    release_date = Column(DateTime)
    is_limited_edition = Column(Boolean, default=False)
    
    # Pre-computed stats
    hype_score = Column(Float, default=0.0)
    rarity_score = Column(Float, default=0.0)
    sentiment_score = Column(Float, default=0.0)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
