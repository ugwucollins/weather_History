from pydantic import BaseModel
from datetime import datetime
from typing import List


class SummaryLocation(BaseModel):
    id: str
    date: str
    location: str
    weather: str
    temperature: float | None
    humidity: float | None
    precipitation: float | None
    wind_speed: float | None
    fetched_at: datetime


class WeatherHistory(BaseModel):
    location: str
    temperature_min: List[float | None | str] | None
    temperature_max: List[float | None | str] | None
    precipitation: List[float | None | str] | None
    wind_speed: List[float | None | str] | None
    daily: dict
    fetched_at: datetime


class WeatherResponse(BaseModel):
    id: int
    location: str
    temperature_min: List[float | None | str] | None
    temperature_max: List[float | None | str] | None
    precipitation: List[float | None | str] | None
    wind_speed: List[float | None | str] | None
    daily: dict
    fetched_at: datetime

    class Config:
        orm_mode = True


class CreateLocation(BaseModel):
    id: int
    location: str
    lon: str | float
    lat: str | float
    created_at: datetime

    class Config:
        orm_mode = True
