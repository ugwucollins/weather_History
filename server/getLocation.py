from fastapi import HTTPException
import httpx
from datetime import datetime, timedelta
from config import settings
url = settings.WEATHER_URL
locations = {
    'lagos': {
        'lat': 6.5244,
        'lon': 3.3792
    },
    'kano': {
        'lat': 12.0022,
        'lon': 8.5920
    },
    'ibadan': {
        'lat': 7.3775,
        'lon': 3.9470
    },

}


def getLocation(location: str):
    match location.strip().lower():
        case 'lagos':
            lat = locations['lagos']['lat']
            lon = locations['lagos']['lon']
        case 'kano':
            lat = locations['kano']['lat']
            lon = locations['kano']['lon']
        case 'ibadan':
            lat = locations['ibadan']['lat']
            lon = locations['ibadan']['lon']
        case _:
            raise HTTPException(status_code=404, detail="Location not found")
    return lat, lon


async def getLocationData(location: str):

    # params = {
    #     "latitude": lat,
    #     "longitude": lon,
    #     "start_date": "2026-05-01",
    #     "end_date": "2026-06-10",
    #     "daily": ["weather_code", "temperature_2m_max", "temperature_2m_min", "precipitation_hours", "precipitation_sum", "wind_speed_10m_max", "wind_gusts_10m_max"],
    #     "hourly": ["temperature_2m", "weather_code", "wind_speed_10m", "precipitation_probability", "apparent_temperature", "precipitation"],
    #     "current": ["temperature_2m", "precipitation", "weather_code", "wind_speed_10m"],
    #     "wind_speed_unit": "mph",
    # }
    lon, lat = getLocation(location)

    end_date = datetime.utcnow()
    start_date = end_date - timedelta(days=30)
    past_date = end_date - start_date

    params = {
        "latitude": lat,
        "longitude": lon,
        "daily": ["weather_code", "temperature_2m_max", "temperature_2m_min", "precipitation_sum", "wind_speed_10m_max"],
        "current": ["temperature_2m", 'relative_humidity_2m', "rain", "precipitation", "apparent_temperature", "wind_speed_10m", "weather_code"],
        "past_days": past_date.days,
        "wind_speed_unit": "mph",
        "precipitation_unit": "inch",
        'timezone': 'Africa/Lagos'
    }
    # params = {
    #     "latitude": lat,
    #     "longitude": lon,
    #     "daily": ["weather_code", "temperature_2m_max", "temperature_2m_min", "precipitation_hours", "wind_speed_10m_max"],
    #     "hourly": ["temperature_2m", "wind_speed_10m", "weather_code", "precipitation"],
    #     "current": ["temperature_2m", "precipitation", "apparent_temperature", "wind_speed_10m", "weather_code"],
    #     "past_days": 31,
    #     "wind_speed_unit": "mph",
    #     "precipitation_unit": "inch",
    # }

    async with httpx.AsyncClient(timeout=20.0) as client:
        response = await client.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        # print(f'Hello Location {data}')
        try:
            return data
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

Location_Arrays = [
    {
        'location': 'lagos',
        'lon': 3.3792,
        'lat': 6.5244,
    },
    {
        'location': 'kano',
        'lon': 8.5920,
        'lat': 12.0022,
    },
    {
        'location': 'ibadan',
        'lat': 7.3775,
        'lon': 3.9470
    },
]
