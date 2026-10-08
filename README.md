# SAFEZONE AI – SMART HAZARD MAPPING & RELOCATION SYSTEM

> **“Identify Risk. Protect Communities. Act Early.”**

SafeZone AI is a full-stack AI/ML-powered disaster risk assessment and relocation-support platform designed to help authorities identify potentially hazardous areas, analyze vulnerable populations, visualize risk on interactive GIS maps, and recommend designated safe shelters according to official evacuation plans.

---

## 🌟 KEY FEATURES

1. **AI/ML Risk Estimation Engine**: Evaluates environmental telemetry (rainfall, water level, wind speed, temperature), terrain features (elevation, slope), historical disaster frequency, and population density to compute composite risk scores (0–100) and risk classifications (`LOW`, `MEDIUM`, `HIGH`, `EXTREME`).
2. **Interactive GIS Hazard & Evacuation Map**: Built with Leaflet.js and OpenStreetMap. Color-coded risk circles (🟢 Low, 🟡 Medium, 🟠 High, 🔴 Extreme), live shelter markers, and dynamic evacuation route polylines.
3. **Multi-Factor Shelter Recommendation Algorithm**: Ranks shelters by safety status, Haversine distance, available capacity, and accessibility score.
4. **Real-Time Weather Integration**: Fetches live telemetry via OpenWeather API with intelligent demo telemetry fallbacks.
5. **Vulnerability & Population Analytics**: Visualizes total population, households, vulnerable groups, and estimated affected population with Chart.js charts.
6. **Emergency Alert Broadcast Feed**: Public early warning advisory system with emergency action recommendations.
7. **Emergency Operations Center (EOC) Admin Portal**: Secure portal for registering designated shelters, issuing emergency warnings, and updating disaster logs.

---

## 🏗️ SYSTEM ARCHITECTURE & WORKFLOW

```
DATA SOURCES
  ├── OpenWeather API Telemetry
  ├── GIS & Terrain Coordinates
  ├── Historical Disaster Frequency
  └── Demographics & Population Data
        ↓
FLASK BACKEND SERVER
  ├── REST APIs (/api/risk/analyze, /api/weather, /api/shelters, /api/dashboard)
  ├── SQLAlchemy ORM (MySQL / SQLite Fallback Engine)
  ├── Geocoding & Shelter Recommendation Engine
  └── AI/ML Risk Engine
        ↓
RISK ASSESSMENT (0-100 Score)
  ├── 🟢 0–25: LOW
  ├── 🟡 26–50: MEDIUM
  ├── 🟠 51–75: HIGH
  └── 🔴 76–100: EXTREME
        ↓
GIS HAZARD & EVACUATION MAP
        ↓
POPULATION VULNERABILITY ANALYSIS
        ↓
DESIGNATED SHELTER RECOMMENDATION & ROUTE GUIDANCE
```

---

## 📁 PROJECT STRUCTURE

```
safezone-ai/
│
├── frontend/
│   ├── index.html             # Main Dashboard & Multi-page SPA
│   ├── dashboard.html         # Dashboard Route Wrapper
│   ├── map.html               # GIS Hazard Map Route Wrapper
│   ├── risk.html              # Risk Analysis Simulator Route Wrapper
│   ├── population.html        # Population Analytics Route Wrapper
│   ├── shelters.html          # Shelter Management Route Wrapper
│   ├── alerts.html            # Emergency Alerts Feed Route Wrapper
│   ├── admin.html             # EOC Admin Portal Route Wrapper
│   ├── css/
│   │   └── style.css          # Design System Stylesheet
│   └── js/
│       ├── api.js             # API Client & Offline Fallback Engine
│       ├── map.js             # Leaflet GIS Map Controller
│       ├── dashboard.js       # Analytics & Chart.js Engine
│       ├── risk.js            # Risk Analysis Simulation Handler
│       ├── population.js      # Population Analytics Engine
│       ├── shelters.js        # Shelter Management & Recommender
│       ├── alerts.js          # Emergency Alert Broadcast Engine
│       └── admin.js           # EOC Command Auth & Forms
│
├── backend/
│   ├── app.py                 # Flask Main Entry Point & Static Server
│   ├── config.py              # Environment & DB Configuration
│   ├── models.py              # SQLAlchemy Database Models
│   ├── routes/
│   │   ├── __init__.py
│   │   └── api_routes.py      # REST API Endpoints Blueprint
│   ├── services/
│   │   ├── __init__.py
│   │   ├── weather_service.py # OpenWeather API Integration
│   │   ├── geocoding_service.py # Address-to-Coordinate Geocoder
│   │   └── shelter_service.py # Shelter Suitability Recommendation Engine
│   ├── ml/
│   │   ├── __init__.py
│   │   └── risk_model.py      # AI Machine Learning Risk Engine
│   └── requirements.txt       # Python Package Dependencies
│
├── data/
│   └── demo_data.csv          # Sample Disaster & Weather Telemetry Dataset
│
├── database/
│   └── schema.sql             # MySQL DDL & Seed Data Script
│
├── .env                       # Active Environment Variables
├── .env.example               # Environment Variables Template
├── .gitignore                 # Git Ignored Files
└── README.md                  # System Documentation
```

---

## ⚙️ SETUP & INSTALLATION INSTRUCTIONS

### 1. Prerequisites
* Python 3.10+ installed
* MySQL Server (Optional — automatic SQLite fallback is included so the app runs out-of-the-box!)

### 2. Backend Setup
1. Open terminal in the project directory:
   ```bash
   cd c:/hackathon
   ```
2. Install dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```
3. Configure Environment Variables (`.env`):
   ```env
   OPENWEATHER_API_KEY=your_openweather_api_key_here
   GEOCODING_API_KEY=your_geocoding_key_here
   MYSQL_HOST=localhost
   MYSQL_PORT=3306
   MYSQL_DATABASE=safezone
   MYSQL_USER=root
   MYSQL_PASSWORD=password
   PORT=5000
   ```

4. Start Flask Server:
   ```bash
   python backend/app.py
   ```
   *The server will start on `http://127.0.0.1:5000` and automatically initialize database tables and seed sample demo data.*

### 3. Frontend Access
* Open your browser and navigate to `http://127.0.0.1:5000`
* Or open `frontend/index.html` directly in any modern Web Browser.

---

## 🔑 DEMO ADMIN CREDENTIALS

To access the Emergency Operations Center (EOC) Command Portal under the **Admin** tab:

* **Email:** `admin@safezone.ai`
* **Password:** `admin123`

---

## 📡 REST API ENDPOINTS

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/dashboard` | Aggregated executive metrics for cards & charts |
| `GET` | `/api/hazards` | List of all monitored hazard zones with risk scores |
| `GET` | `/api/hazards/<id>` | Comprehensive hazard profile for a location |
| `POST` | `/api/risk/analyze` | Executes ML risk assessment on input metrics |
| `GET` | `/api/weather/<location>` | Current weather telemetry via OpenWeather |
| `GET` | `/api/population/<location>` | Demographic & vulnerability statistics |
| `GET` | `/api/shelters` | List of all designated safe shelters |
| `GET` | `/api/shelters/recommend` | Runs shelter recommendation engine |
| `GET` | `/api/alerts` | Active emergency early warning broadcast feed |
| `POST` | `/api/alerts` | Dispatches new emergency alert (Admin) |
| `POST` | `/api/shelters` | Registers new designated shelter (Admin) |
| `PUT` | `/api/shelters/<id>` | Updates shelter capacity and occupancy |
| `GET` | `/api/geocode` | Converts address string to coordinates |
| `POST` | `/api/login` | Officer / Admin authentication |

---

## 🤖 MACHINE LEARNING RISK MODEL EXPLANATION

The AI/ML module evaluates 8 environmental and geographical parameters:
1. **Rainfall (mm)**
2. **Water Level (m)**
3. **Temperature (°C)**
4. **Wind Speed (km/h)**
5. **Elevation (m)**
6. **Slope (°)**
7. **Historical Disaster Frequency Index (0.0 – 1.0)**
8. **Population Density (per km²)**

The engine computes a composite risk score (0–100) and maps it to risk levels:
* **0 – 25**: `LOW RISK` (🟢)
* **26 – 50**: `MEDIUM RISK` (🟡)
* **51 – 75**: `HIGH RISK` (🟠)
* **76 – 100**: `EXTREME RISK` (🔴)

It also calculates feature importances to highlight primary contributing risk factors (e.g. "Torrential Downpour (35% Weight)", "Water Level Rise (35% Weight)").

---

## 🏠 SHELTER SUITABILITY RECOMMENDATION ALGORITHM

The system ranks nearby shelters using a multi-factor suitability formula:

$$\text{Suitability Score} = (0.45 \times \text{Distance Score} + 0.35 \times \text{Capacity Score} + 0.20 \times \text{Access Score}) \times \text{Safety Multiplier}$$

* **Distance Score**: Evaluated using the **Haversine formula**. Closer shelters score higher.
* **Capacity Score**: Ratio of available unallocated spaces to total capacity.
* **Accessibility**: Road condition rating (`Good` = 1.0, `Moderate` = 0.8, `Poor` = 0.5).
* **Safety Multiplier**: Structural approval (`Approved` = 1.0, `Conditional` = 0.5, `Unsafe` = 0.0).

---

## ⚠️ DISCLAIMER
*This system provides a prototype risk-estimation model intended strictly for decision support during disaster management planning. Shelter recommendations and risk scores do not replace official emergency evacuation orders issued by government authorities.*
