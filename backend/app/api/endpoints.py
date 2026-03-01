from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List
from app.services.prediction_service import predict_resale_price, calculate_rarity_score

router = APIRouter()

class SneakerRequest(BaseModel):
    brand: str
    model_name: str
    retail_price: float
    days_since_release: int
    is_limited_edition: bool
    sentiment_score: float
    drop_frequency: int
    volatility_score: float
    production_count: int = 50000

class PredictionResponse(BaseModel):
    predicted_price: float
    confidence_score: float
    hype_score: float
    rarity_score: float
    sentiment_score: float

@router.post("/predict", response_model=PredictionResponse)
def get_prediction(req: SneakerRequest):
    pred = predict_resale_price(
        retail_price=req.retail_price,
        days_since_release=req.days_since_release,
        is_limited_edition=req.is_limited_edition,
        sentiment_score=req.sentiment_score,
        drop_frequency=req.drop_frequency,
        volatility_score=req.volatility_score,
        brand=req.brand
    )
    
    if "error" in pred:
        raise HTTPException(status_code=500, detail=pred["error"])
        
    rarity = calculate_rarity_score(req.production_count, req.drop_frequency)
    
    # Mock hype calculation mixing components
    hype_score = (req.sentiment_score + 1.0) / 2.0 * 50.0 + (50.0 if req.is_limited_edition else 0.0)
    
    return PredictionResponse(
        predicted_price=pred["predicted_price"],
        confidence_score=pred["confidence_score"],
        hype_score=round(hype_score, 1),
        rarity_score=rarity,
        sentiment_score=req.sentiment_score
    )

@router.get("/trending")
def get_trending():
    # Mock trending sneakers data
    return [
        {"id": 1, "brand": "Nike", "model": "Travis Scott x Air Jordan 1", "trend": "+12%", "current_price": 1250},
        {"id": 2, "brand": "Adidas", "model": "Yeezy Boost 350 V2 Zebra", "trend": "-2%", "current_price": 320},
        {"id": 3, "brand": "New Balance", "model": "jjjjound 990v3", "trend": "+8%", "current_price": 450},
    ]

@router.get("/sentiment/{brand}/{model}")
def get_sentiment(brand: str, model: str):
    # Mock sentiment pulling
    return {"brand": brand, "model": model, "sentiment": 0.82, "source": "Twitter + Google Trends"}

@router.post("/admin/retrain")
def retrain_model():
    # A fully functioning background task would sit here
    return {"status": "Model retraining job queued."}
