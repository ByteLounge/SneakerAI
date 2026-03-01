  <h1>SneakerAI 👟🤖</h1>
  <p><strong>A premium, full-stack AI-powered sneaker resale prediction platform.</strong></p>
</div>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#quickstart">Quickstart</a> •
  <a href="#machine-learning-pipeline">Machine Learning</a> •
  <a href="#sustainable-development-goals-sdg">SDG Goals</a>
</p>

SneakerAI ingests historical market data, sentiment trends, and rarity metrics to accurately forecast secondary market values using an XGBoost Machine Learning pipeline natively wired to a production-ready FastAPI backend and a visually stunning React framework.

---

## ✨ Features
- **AI-Powered Resale Predictions**: Forecast future value utilizing our custom XGBoost model.
- **Sentiment Analysis**: Dynamic tracking of global brand hype from Twitter and Google Trends (Simulated).
- **Interactive Dashboards**: Real-time market trends, historical price volatility, and model confidence scoring.
- **Eco Score Dashboard**: Carbon footprint tracking for secondary market transactions.
- **Glassmorphism UI**: A premium, modern interface built with Tailwind CSS and Framer Motion.

---

## 🏗️ Architecture

- **Frontend**: React 18, Vite, TailwindCSS (Dark/Glassmorphism theme), Framer Motion, Chart.js
- **Backend**: FastAPI (Python 3.10+), SQLAlchemy, JWT Authentication
- **Database**: PostgreSQL (Dockerized)
- **Machine Learning**: XGBoost Regressor, Scikit-learn, Pandas

---

## 🚀 Quickstart

1. **Clone the Repository** and ensure you have Docker and Docker Compose installed.
   ```bash
   git clone https://github.com/ByteLounge/SneakerAI.git
   cd SneakerAI
   ```

2. **Run Docker Compose** to build and spin up the services:
   ```bash
   docker-compose up --build -d
   ```

3. **Access Services**:
   - 🌐 Frontend Dashboard: [http://localhost:5173](http://localhost:5173)
   - ⚙️ Backend API Docs (Swagger UI): [http://localhost:8000/docs](http://localhost:8000/docs)
   - 🗄️ PostgreSQL Database is exposed on port `5432`.

### Manual Local Run (Without Docker)

**Backend**:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

**Frontend**:
```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 Machine Learning Pipeline

The XGBoost model predicts resale value based on features like `retail_price`, `days_since_release`, `is_limited_edition`, `sentiment_score`, `drop_frequency`, and `volatility_score`.

To generate new mock data and retrain the model locally:
```bash
cd notebooks
pip install -r requirements.txt
python generate_mock_data.py
python train.py
```
This routine updates the model located at `backend/app/models/xgboost_model.pkl`.

---

## UI

<img width="1919" height="914" alt="Screenshot 2026-03-01 162620" src="https://github.com/user-attachments/assets/43ae0b33-e830-4852-bef5-60ddeba87469" />

<img width="1919" height="909" alt="Screenshot 2026-03-01 162649" src="https://github.com/user-attachments/assets/cc991e3b-8da8-4285-9042-fa736285062b" />

<img width="1907" height="914" alt="Screenshot 2026-03-01 162715" src="https://github.com/user-attachments/assets/de9e8808-cdc6-490c-be95-90767182395e" />

<img width="1913" height="906" alt="Screenshot 2026-03-01 162729" src="https://github.com/user-attachments/assets/fc676652-37ab-4d43-b4dc-e676ad8b1348" />

<img width="1912" height="896" alt="Screenshot 2026-03-01 162740" src="https://github.com/user-attachments/assets/9e9aca7f-9bef-4a9e-901f-ac112d6cd7ff" />


## 🎯 Sustainable Development Goals (SDG)

We actively track carbon offsets within the secondary market inside the **Eco Score Dashboard**. Check `docs/sdg_alignment.md` for our full compliance report regarding UN SDGs 9, 12, and 13.
