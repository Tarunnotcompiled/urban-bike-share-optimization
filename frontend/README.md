# Frontend

This is the web dashboard for the Real-time Urban Bike-Share Optimization Platform.

## Run it

The frontend is already configured to run through the Flask backend.

From the project root:

```bash
pip install -r requirements.txt
python app.py
```

Then open:

```text
http://127.0.0.1:5000/
```

The dashboard automatically calls:

- `GET /stations`
- `GET /demand`

Chart.js is loaded from its public CDN for the demand chart.
