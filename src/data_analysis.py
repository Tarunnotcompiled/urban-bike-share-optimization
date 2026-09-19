import pandas as pd


def load_data():
    """Load bike-share data from CSV file."""
    return pd.read_csv("data/bike_share_data.csv")


def analyze_data():
    """Perform basic bike-share analysis."""
    data = load_data()

    print("\n===== Bike-Share Dataset =====")
    print(data.head())

    print("\n===== Dataset Information =====")
    print(f"Total records: {len(data)}")
    print(f"Number of stations: {data['station_id'].nunique()}")

    print("\n===== Average Demand by Station =====")

    station_demand = (
        data.groupby("station_name")["demand"]
        .mean()
        .sort_values(ascending=False)
    )

    print(station_demand)

    print("\n===== Average Bike Availability =====")

    availability = data.groupby("station_name")["available_bikes"].mean()
    print(availability)

    print("\n===== Highest Demand Station =====")

    highest_demand_station = station_demand.idxmax()
    highest_demand = station_demand.max()

    print(
        f"{highest_demand_station} "
        f"has the highest average demand: {highest_demand:.2f}"
    )


if __name__ == "__main__":
    analyze_data()
