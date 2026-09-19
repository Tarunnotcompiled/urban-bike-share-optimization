from flask import Flask, jsonify
import pandas as pd

app = Flask(__name__)

DATA_FILE = "data/bike_share_data.csv"


@app.route("/")
def home():
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
