
---

# SneakerAI

SneakerAI is an AI-powered platform designed to predict the resale value of sneakers by analyzing historical pricing trends, brand reputation, social media hype, and other key factors. The goal is to empower sneaker enthusiasts, resellers, and investors with data-driven insights to make informed decisions in the dynamic sneaker resale market.

## Features

- Machine Learning-based price prediction for resale markets
- Real-time sneaker drop analysis
- Social media sentiment integration (Twitter, Google Trends)
- Sneaker rarity and hype detection
- Visual trend dashboards and charts
- Eco-Score for sustainable sneaker choices (optional)
- Admin dashboard and user-facing UI
- API support for price prediction and data querying

## Technologies Used

- **Frontend:** Flutter / ReactJS
- **Backend:** Flask / FastAPI (Python)
- **Machine Learning:** scikit-learn, XGBoost, pandas, NumPy
- **Database:** MongoDB / Firebase / PostgreSQL
- **Data Collection:** StockX API, GOAT API, Twitter API, Web Scraping
- **Visualization:** D3.js / Chart.js / Matplotlib
- **Cloud:** Google Cloud / AWS / Heroku
- **Authentication:** Firebase Auth / OAuth2
- **Optional Add-ons:** Blockchain-based ownership tagging (NFT), Augmented Reality try-on

## Sustainable Development Goals (SDG) Alignment

SneakerAI contributes to several UN SDGs:
- **SDG 9:** Industry, Innovation and Infrastructure
- **SDG 12:** Responsible Consumption and Production
- **SDG 13:** Climate Action
- **SDG 8:** Decent Work and Economic Growth

## Project Structure
```bash
SneakerAI/
│
├── backend/                           # All backend code (API, ML models, DB, etc.)
│   ├── app/                           # Core application logic
│   │   ├── models/                    # Data models and ML-related classes
│   │   │   └── sneaker.py
│   │   ├── routes/                    # API endpoints
│   │   │   └── predict.py
│   │   ├── services/                  # Business logic and ML services
│   │   │   └── price_predictor.py
│   │   ├── utils/                     # Utility functions and helpers
│   │   │   └── data_preprocessing.py
│   │   └── main.py                    # FastAPI/Flask entry point
│   │
│   ├── ml_model/                      # ML training and prediction scripts
│   │   ├── data/                      # Cleaned datasets and feature-engineered data
│   │   │   └── sneaker_data_clean.csv
│   │   ├── model/                     # Saved models
│   │   │   └── xgboost_model.pkl
│   │   ├── train_model.py             # Training script
│   │   └── predict.py                 # Inference script
│   │
│   ├── requirements.txt               # Python dependencies
│   └── README.md
│
├── frontend/                          # User interface (choose one: Flutter or React)
│   ├── flutter_app/                   # Flutter mobile app
│   │   ├── lib/
│   │   │   ├── screens/               # Pages (Home, Prediction, History)
│   │   │   ├── widgets/               # Custom UI components
│   │   │   └── main.dart
│   │   ├── assets/
│   │   │   └── fonts/
│   │   │       └── Poppins-Regular.ttf
│   │   └── pubspec.yaml
│   │
│   └── react_app/                     # (Alternatively) React-based web frontend
│       ├── public/
│       ├── src/
│       │   ├── components/            # Reusable components
│       │   ├── pages/                 # Page-level components
│       │   ├── services/              # API calls and utilities
│       │   └── App.js
│       └── package.json
│
├── datasets/                          # Raw and intermediate datasets
│   ├── raw_stockx_data.csv
│   └── sneaker_trends.csv
│
├── notebooks/                         # Jupyter Notebooks for exploration and experiments
│   └── sneaker_price_modeling.ipynb
│
├── docs/                              # Documentation, diagrams, project plans
│   ├── architecture_diagram.png
│   └── model_summary.md
│
├── .gitignore
├── LICENSE
└── README.md
```

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/SneakerAI.git
cd SneakerAI
```

2. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python app/main.py
```

3. Frontend Setup (Flutter or React)
```bash
cd frontend/flutter_app
flutter pub get
flutter run
```
Or if using React:
```bash
cd frontend/react_app
npm install
npm start
```

Dataset and Model Training

Collect sneaker resale data from StockX/GOAT or public datasets

Train the model using ml_model/train_model.py

Use predict.py for live or batch predictions


Contribution Guidelines

1. Fork this repository


2. Create a new branch (git checkout -b feature-name)


3. Commit your changes (git commit -m "Add new feature")


4. Push to the branch (git push origin feature-name)


5. Create a Pull Request



License

This project is licensed under the MIT License. See the LICENSE file for details.

Contact

For questions, collaborations, or partnership opportunities:

Name: Yash Sanikop

Email: [konuriyash@gmail.com]

GitHub: [https://github.com/ByteLounge]


---
