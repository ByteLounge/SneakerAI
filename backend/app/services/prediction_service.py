import pickle
import os
import numpy as np

MODEL_PATH = os.path.join(os.path.dirname(__file__), "../models/xgboost_model.pkl")
ENCODER_PATH = os.path.join(os.path.dirname(__file__), "../models/label_encoder_brand.pkl")

# Load models and encoders if available
model = None
brand_encoder = None

try:
    with open(MODEL_PATH, "rb") as f:
        model = pickle.load(f)
    print("XGBoost model loaded successfully.")
except Exception as e:
    print(f"Warning: Could not load the model. {e}")

try:
    with open(ENCODER_PATH, "rb") as f:
        brand_encoder = pickle.load(f)
    print("Brand encoder loaded successfully.")
except Exception as e:
    print(f"Warning: Could not load the brand encoder. {e}")

def predict_resale_price(
    retail_price: float,
    days_since_release: int,
    is_limited_edition: bool,
    sentiment_score: float,
    drop_frequency: int,
    volatility_score: float,
    brand: str
) -> dict:
    
    if model is None or brand_encoder is None:
        return {"error": "Model or encoder not loaded. Please train the model first."}
        
    try:
        # Encode the brand
        # If unseen brand, assign a generic value or fallback (using transform with unseen might fail depending on sklearn handling,
        # but for this dataset, we use known brands).
        encoded_brand = brand_encoder.transform([brand])[0]
    except Exception as e:
        # Fallback for unknown brands
        encoded_brand = 0
        
    features = np.array([[
        retail_price,
        days_since_release,
        int(is_limited_edition),
        sentiment_score,
        drop_frequency,
        volatility_score,
        encoded_brand
    ]])
    
    # Predict
    predicted_price = model.predict(features)[0]
    
    # Compute Confidence Score (mock logic based on volatility and sentiment)
    confidence = 100 - (volatility_score * 30)
    if is_limited_edition:
        confidence -= 10 # Harder to predict
    confidence = min(max(confidence, 10.0), 99.9)

    return {
        "predicted_price": max(round(float(predicted_price), 2), retail_price * 0.4), # Prevent negative/extreme low predictions
        "confidence_score": round(confidence, 1)
    }

def calculate_rarity_score(production_count: int, drop_frequency: int) -> float:
    # Scale from 0 to 100 where higher is rarer
    base = 100.0
    # Penalty for high production
    penalty1 = (production_count / 10000.0) * 2
    # Penalty for frequent drops
    penalty2 = drop_frequency * 3
    
    score = base - penalty1 - penalty2
    return max(0.0, min(100.0, round(score, 1)))
