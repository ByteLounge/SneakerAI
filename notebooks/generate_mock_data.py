import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta
import os

def generate_mock_sneaker_data(num_samples=5000):
    brands = ["Nike", "Adidas", "Jordan", "Yeezy", "New Balance", "Asics"]
    models = ["Air Force 1", "Dunk Low", "Air Max 90", "Yeezy Boost 350", "Jordan 1 Retro", "Jordan 4", "550", "Gel-Lyte III"]
    colorways = ["Bred", "Chicago", "Panda", "Triple White", "Triple Black", "UNC", "Mocha", "Sail"]
    
    data = []
    
    base_date = datetime.now()
    
    for i in range(num_samples):
        brand = random.choice(brands)
        model_name = random.choice(models)
        
        # Make Retail Price depend slightly on Brand/Model
        if brand in ["Jordan", "Yeezy"]:
            retail_price = random.randint(150, 250)
        else:
            retail_price = random.randint(90, 180)
            
        release_date = base_date - timedelta(days=random.randint(10, 1000))
        days_since_release = (base_date - release_date).days
        
        is_limited = random.choice([True, False, False, False]) # 25% chance of being limited
        
        # Synthetic Hype & Sentiment
        sentiment_score = round(random.uniform(-1.0, 1.0), 2)
        if is_limited:
            hype_factor = random.uniform(1.2, 3.5)
            sentiment_score = min(1.0, sentiment_score + 0.4)
            drop_frequency = random.randint(1, 3) # Drops rarely
        else:
            hype_factor = random.uniform(0.8, 1.5)
            drop_frequency = random.randint(5, 20) # Drops often
            
        # Synthetic Resale Price based on features
        # Base multiplier
        multiplier = hype_factor
        
        # Older limited shoes might appreciate more
        if is_limited and days_since_release > 365:
            multiplier += random.uniform(0.5, 2.0)
            
        # Social sentiment affects price
        if sentiment_score > 0.5:
            multiplier += 0.3
        elif sentiment_score < -0.5:
            multiplier -= 0.2
            
        # Ensure it doesn't go below retail drastically if it's hyped
        resale_price = max(retail_price * 0.5, retail_price * multiplier)
        
        # Volatility
        volatility_score = round(random.uniform(0.0, 1.0), 2)
        
        row = {
            "sku": f"{brand[:3].upper()}-{random.randint(10000, 99999)}",
            "brand": brand,
            "model_name": model_name,
            "colorway": random.choice(colorways),
            "retail_price": retail_price,
            "release_date": release_date.strftime("%Y-%m-%d"),
            "days_since_release": days_since_release,
            "is_limited_edition": int(is_limited),
            "sentiment_score": sentiment_score,
            "drop_frequency": drop_frequency,
            "volatility_score": volatility_score,
            "resale_price": round(resale_price, 2)
        }
        data.append(row)
        
    df = pd.DataFrame(data)
    
    # Save to datasets folder
    os.makedirs("../datasets", exist_ok=True)
    df.to_csv("../datasets/sneaker_data.csv", index=False)
    print(f"Generated {num_samples} mock records in ../datasets/sneaker_data.csv")
    
if __name__ == "__main__":
    generate_mock_sneaker_data()
