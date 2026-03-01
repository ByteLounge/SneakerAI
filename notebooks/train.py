import pandas as pd
import numpy as np
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from sklearn.preprocessing import LabelEncoder
import pickle
import os
import json

def train_model():
    print("Loading data...")
    df = pd.read_csv("../datasets/sneaker_data.csv")
    
    # Feature Engineering
    features = [
        "retail_price", "days_since_release", "is_limited_edition",
        "sentiment_score", "drop_frequency", "volatility_score"
    ]
    
    # Encode Brand
    le_brand = LabelEncoder()
    df['brand_encoded'] = le_brand.fit_transform(df['brand'])
    features.append('brand_encoded')
    
    X = df[features]
    y = df['resale_price']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("Training XGBoost Regressor...")
    model = xgb.XGBRegressor(
        objective='reg:squarederror',
        n_estimators=200,
        learning_rate=0.05,
        max_depth=6,
        random_state=42
    )
    
    model.fit(X_train, y_train)
    
    print("Evaluating Model...")
    preds = model.predict(X_test)
    
    rmse = np.sqrt(mean_squared_error(y_test, preds))
    mae = mean_absolute_error(y_test, preds)
    r2 = r2_score(y_test, preds)
    
    print(f"Metrics - RMSE: {rmse:.2f} | MAE: {mae:.2f} | R2: {r2:.4f}")
    
    # Save Model
    # Important: we save the model to the backend app/models folder so FastAPI can load it!
    os.makedirs("../backend/app/models", exist_ok=True)
    model_path = "../backend/app/models/xgboost_model.pkl"
    with open(model_path, "wb") as f:
        pickle.dump(model, f)
        
    print(f"Model saved to {model_path}")
    
    # Save Label Encoder for Inference
    le_path = "../backend/app/models/label_encoder_brand.pkl"
    with open(le_path, "wb") as f:
        pickle.dump(le_brand, f)
        
    # Save metrics
    metrics = {
        "rmse": rmse,
        "mae": mae,
        "r2": r2
    }
    with open("../backend/app/models/metrics.json", "w") as f:
        json.dump(metrics, f)
        
if __name__ == "__main__":
    train_model()
