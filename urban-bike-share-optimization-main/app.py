from pathlib import Path

from flask import Flask, jsonify, send_from_directory
import pandas as pd

BASE_DIR = Path(__file__).resolve().parent
DATA_FILE = BASE_DIR / "data" / "bike_share_data.csv"
FRONTEND_DIR = BASE_DIR / "frontend"

app = Flask(__name__)


@app.route("/")
def home():
    return send_from_directory(FRONTEND_DIR, "index.html")


@app.route("/frontend/<path:filename>")
def frontend_files(filename):
    return send_from_directory(FRONTEND_DIR, filename)


@app.route("/api")
def api_status():
    return jsonify({
        "project": "Real-time Urban Bike-Share Optimization Platform",
        "status": "Project started successfully",
        "message": "Bike-share optimization API is running"
    })


@app.route("/stations")
def get_stations():
    data = pd.read_csv(DATA_FILE)

    stations = (
        data.groupby("station_name")
        .agg({
            "total_bikes": "first",
            "available_bikes": "last",
            "available_docks": "last"
        })
        .reset_index()
    )

    return jsonify(stations.to_dict(orient="records"))


@app.route("/demand")
def get_demand():
    data = pd.read_csv(DATA_FILE)

    demand = (
        data.groupby("station_name")["demand"]
        .mean()
        .reset_index()
    )

    demand.columns = ["station_name", "average_demand"]

    return jsonify(demand.to_dict(orient="records"))


if __name__ == "__main__":
    app.run(debug=True)
