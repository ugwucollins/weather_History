# Daintymindz Weather Monitor

An internal tool that fetches live weather data for Nigerian agricultural locations, stores a 30-day history, and displays results in a clean web interface. Built for Daintymindz Laboratory field agents to plan data-collection deployments.

---

## Tech Stack

| Layer    | Technology                        |
|----------|-----------------------------------|
| Data     | Open-Meteo API (free, no key)     |
| Storage  | SQLite                            |
| Backend  | Python 3.11 · FastAPI · Uvicorn   |
| Frontend | React 18 · Recharts               |

---

## Prerequisites

- Python
- Node.js
- Git

---

## Installation & Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/ugwucollins/weather_History.git
cd weather_History 
```

### 2. Set up the Python backend

```bash
cd client
npm install
npm run dev



cd server
pip install
unicorn  main:app --reload
```

### 3. Fetch weather data (populates the SQLite database)

```bash
python main.py
```


### 4. Start the FastAPI backend

```bash
uvicorn main:app --reload
```

The API is now running at http://localhost:5173  
Interactive docs are at http://127.0.0.1:8000/docs

### 5. Set up and start the React frontend

Open a **new terminal**:

```bash
cd client 
npm install
npm start
```

The app opens automatically at http://localhost:5173

---

## .env

#Client
VITE_BASE_URL='http://127.0.0.1:8000'

#server
APP_NAME='Weather History'
APP_NAME_DESCRIPTION='A simple API to get weather history data'
DEBUG_MODE=true
DATABASE_URL='sqlite:///./weather_history.db'
CLIENT_URL="http://localhost:5173"
WEATHER_URL='https://api.open-meteo.com/v1/forecast'


## API Endpoints

### `GET /locations`
Returns the list of supported locations.

**Response:**
```json
[
  { "id": 1,  "location": "Lagos",  "lat": 6.5244,  "lon": 3.3792 },
  { "id: 2,   "location": "Kano",   "lat": 12.0022, "lon": 8.592  },
  { "id": 3, "location": "Ibadan", "lat": 7.3775,  "lon": 3.947  }
]
```

---

### `GET /weather/{location}`
Returns 30 daily weather readings for the given location.

**Parameters:** `location` — one of `lagos`, `kano`, `ibadan`

**Success response (200):**
```json
{
  "location": "Lagos",
  "id": 1,
  "readings": [
    {
      "date": "2026-05-10",
      "temp_max": 33.1,
      "daily": {},
      "temp_min": 24.5,
      "precipitation": 0.0,
      "wind_speed_max": 18.2
    }
  ]
} e.t.c
```

**Error responses:**
- `404` — location slug not recognised, or no data in DB yet

---

### `GET /summary/{location}`
Returns aggregated statistics over the 30-day window.

**Parameters:** `location` — one of `lagos`, `kano`, `ibadan`

**Success response (200):**
```json
{
  "location": "Kano",
  "id": 2,
  "avg_temp_max_c": 38.4,
  "avg_temp_min_c": 24.1,
  "total_precipitation_mm": 12.6,
  "max_wind_speed_kmh": 42.0,
  "days_with_data": 30
}
```

**Error responses:**
- `404` — unknown location or no data yet
- `503` — database file missing (run `fetch_weather.py` first)

---

### `GET /health`
Simple liveness check. Returns `{"message": 'Weather History FastApi', "success": True}`.

---

## Error Handling

Two explicit error cases are handled in the code:

**1. Invalid location slug** (`main.py → validate_location`)  
Any request to `/weather/abuja` or any unrecognised slug returns a `404` with a descriptive message listing valid options. The check runs before any DB query.

**2. Missing or empty data for a valid location** (`main.py → get_weather / get_summary`)  
If the location key is correct but the database has no rows yet (e.g. `fetch_weather.py` was never run), the endpoint returns a `404` with a clear instruction to run the fetch script, rather than returning empty arrays silently.

Additional resilience in `fetch_weather.py`:
- `requests.exceptions.Timeout` → logs and skips the location
- `requests.exceptions.HTTPError` / `RequestException` → logs and skips
- Missing array index in the API response → stores `NULL` instead of crashing

---

## Known Limitation

The data pipeline is a one-shot script (`fetch_weather.py`) with no scheduler. The SQLite database is only updated when the script is run manually. In a production environment this should be replaced with a scheduled job (e.g. a cron task or an APScheduler background task inside FastAPI) so the 30-day window always reflects the most recent data without manual intervention.

---

## Rural Deployment Reflection

*(150–200 words — see requirement 6)*

If this tool needed to run on a Raspberry Pi in a rural Nigerian location with intermittent internet, I would make three changes.

**First, I would add an offline-first data cache with exponential-backoff retries.** The current fetch script fails silently when the network is unavailable. On a Pi with intermittent connectivity I would store the last successful fetch timestamp and retry with increasing delays, so the tool keeps working on cached data rather than returning nothing.

**Second, I would replace the React frontend with a lightweight server-rendered HTML page.** React's JavaScript bundle is several hundred kilobytes. On a low-power Pi serving requests over a 2G connection, a Jinja2-rendered HTML page from FastAPI would load far faster and require no separate Node process.

**Third, I would add a local data-expiry policy.** Rural storage is limited. I would keep only the most recent 30 days in SQLite and automatically delete older rows on each fetch run, preventing unbounded disk growth. Combined with a cron-scheduled fetch, this gives a self-maintaining, low-resource deployment appropriate for field conditions.

---

## AI Declaration

The following AI tools were used during this project:

| Tool | Purpose |
|------|---------|
| Claude (Anthropic) | Generated initial project scaffold, FastAPI endpoint structure, React component layout, and README template. All code was reviewed, understood, and adapted by the developer. The reflection and error-handling decisions were made independently. |

The developer is able to explain every line of code in this repository.

---

## Project Structure

```
daintymindz-weather/
├── backend/
│   ├── config.py   # Data pipeline: .env → config.py
│   ├── main.py            # FastAPI application
|   |_ model.py
|   |_ schema.py
│   ├── getLocation.py      # Data pipeline: Open-Meteo → SQLite
│   └── weather_history.db         # Created automatically on first fetch
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── Components/
│   │   ├── context/
│   │   ├── Home/
│   │   ├── App.tsx         # Main React component
│   │   ├── Home.tsx
│   │   └── index.css
│   │   └── index.html
│   └── package.json
└── README.md
```
