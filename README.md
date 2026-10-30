# 🚲 Real-Time Urban Bike-Share Optimization Platform

A data-driven bike-sharing platform designed to analyze station activity, monitor bike availability, understand demand patterns, and support better bike distribution across urban areas.

---

## 1. Project Overview

The Urban Bike-Share Optimization Platform aims to improve the efficiency of city bike-sharing systems through data analysis, demand monitoring, and future predictive optimization.

The project currently includes:
- Python Flask backend.
- Bike-sharing sample dataset.
- Data analysis module.
- Interactive web dashboard.
- Station availability monitoring.
- Average demand analysis.
- REST API endpoints.

## 2. Project Objectives

1. Analyze bike-sharing usage patterns.
2. Monitor available bikes and parking docks.
3. Identify stations with higher demand.
4. Visualize station-level demand.
5. Improve bike distribution across stations.
6. Build a foundation for machine-learning-based demand prediction.
7. Support sustainable urban transportation.

## 3. Technology Stack

| Technology | Purpose |
|---|---|
| Python | Backend programming |
| Flask | Web server and APIs |
| Pandas | Data processing |
| NumPy | Numerical operations |
| HTML | Dashboard structure |
| CSS | Dashboard styling |
| JavaScript | Dashboard functionality |
| Chart.js | Demand visualization |
| CSV | Sample dataset storage |
| Git & GitHub | Version control |

## 4. Project Folder Structure

```text
urban-bike-share-optimization/
│
├── app.py
├── run_app.bat
├── requirements.txt
├── README.md
│
├── data/
│   └── bike_share_data.csv
│
├── src/
│   └── data_analysis.py
│
└── frontend/
    ├── index.html
    ├── README.md
    │
    ├── css/
    │   └── style.css
    │
    └── js/
        └── app.js
```

## 5. System Requirements

Before running the project, install:

- Python 3.10 or newer.
- Visual Studio Code.
- Git.
- A modern web browser.
- Internet connection for the Chart.js CDN.

Check Python installation:

```bash
python --version
```

Check Git installation:

```bash
git --version
```

## 6. Installation and Setup

### Step 1: Clone the repository

```bash
git clone https://github.com/Tarunnotcompiled/urban-bike-share-optimization.git
```

### Step 2: Open the project directory

```bash
cd urban-bike-share-optimization
```

### Step 3: Open in VS Code

```bash
code .
```

### Step 4: Create a virtual environment (recommended)

```bash
python -m venv venv
```

Activate it on Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

If PowerShell blocks activation, you can skip the virtual environment and install dependencies directly.

### Step 5: Install dependencies

```bash
pip install -r requirements.txt
```

## 7. Running the Project

There are two ways to start the application.

### Method 1: Using Python

From the project root directory:

```bash
python app.py
```

### Method 2: Using the Windows launcher

Double-click:

```text
run_app.bat
```

The Flask server will start locally.

Open your browser and visit:

```text
http://127.0.0.1:5000/
```

The dashboard should now be visible.

**Important:** Keep the terminal running while using the dashboard. Press `Ctrl + C` to stop the server.

## 8. Dashboard Features

The dashboard provides:

- Total bikes overview.
- Available bikes monitoring.
- Available docking spaces.
- Average station demand.
- Station-wise availability table.
- Demand visualization chart.
- API connection status.
- Manual data refresh.

The dashboard retrieves information from the Flask backend.

## 9. Backend API Endpoints

The application provides the following endpoints:

| Endpoint | Method | Description |
|---|---|---|
| `/` | GET | Opens the dashboard |
| `/api` | GET | Checks API status |
| `/stations` | GET | Returns station availability |
| `/demand` | GET | Returns average demand by station |

### Test API endpoints

Open these URLs in your browser after starting Flask:

```text
http://127.0.0.1:5000/api
http://127.0.0.1:5000/stations
http://127.0.0.1:5000/demand
```

The endpoints return JSON responses.

## 10. Data Analysis

The dataset is stored in:

```text
data/bike_share_data.csv
```

The backend uses Pandas to:

- Read bike-sharing records.
- Group records by station.
- Calculate bike availability.
- Calculate available docking spaces.
- Calculate average demand.

The analysis module is located in:

```text
src/data_analysis.py
```

The current dataset contains sample/demo data. Real-time external data integration is a future development task.

## 11. GitHub Upload and Updates

To upload project changes to the existing GitHub repository:

### Step 1: Check current changes

```bash
git status
```

### Step 2: Add files

```bash
git add .
```

### Step 3: Commit changes

```bash
git commit -m "Update urban bike share project"
```

### Step 4: Push changes

```bash
git push origin main
```

### Step 5: Verify

Visit:

https://github.com/Tarunnotcompiled/urban-bike-share-optimization

Refresh the repository and verify that the latest files are visible.

**Note:** Git does not automatically upload local changes. Run the add, commit, and push commands whenever you want to publish updates.

## 12. Troubleshooting

### Problem: Python is not recognized

Check your Python installation and PATH configuration.

```bash
python --version
```

### Problem: Flask module not found

```bash
pip install -r requirements.txt
```

### Problem: CSV file not found

Make sure the dataset exists at:

```text
data/bike_share_data.csv
```

### Problem: Dashboard does not open

1. Check that Flask is running.
2. Confirm the terminal shows the local server address.
3. Open `http://127.0.0.1:5000/`.
4. Check the browser console for frontend errors.

### Problem: Git push rejected

Run:

```bash
git pull --rebase origin main
```

Resolve any conflicts if prompted, then:

```bash
git push origin main
```

Do not use force push unless you have checked the consequences.

## 13. Future Scope

The following features are planned for future development:

- Machine learning-based bike demand prediction.
- Weather API integration.
- Real-time bike availability data.
- Database integration using PostgreSQL or MongoDB.
- Bike redistribution recommendations.
- Advanced analytics and reporting.
- Interactive station maps.
- Model performance evaluation.
- Cloud deployment.

These are planned features and are not all implemented in the current version.

## 14. Sustainable Development Goals

**SDG 11 – Sustainable Cities and Communities**

The project aims to support sustainable urban mobility by improving bike-sharing operations and encouraging efficient use of shared transportation resources.

## 15. Final Project Workflow

```text
Dataset
   ↓
Data Processing
   ↓
Flask Backend
   ↓
REST API
   ↓
Web Dashboard
   ↓
Demand Monitoring
   ↓
Future Predictive Optimization
```

## 16. Conclusion

The Real-Time Urban Bike-Share Optimization Platform provides an initial foundation for monitoring and analyzing bike-sharing systems.

By combining Python, Flask, Pandas, and web technologies, the project demonstrates how data-driven applications can support urban mobility.

Future integration of machine learning, live data, and optimization algorithms can extend the platform into a more advanced bike redistribution and demand prediction system.

---

**Repository:** https://github.com/Tarunnotcompiled/urban-bike-share-optimization

**Project:** Real-Time Urban Bike-Share Optimization Platform

**Status:** Initial working application with Flask APIs and web dashboard.
