from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, JSON
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()


class WeatherHistory(Base):
    __tablename__ = 'weather_history'

    id = Column(Integer, primary_key=True, index=True)
    location = Column(String, nullable=False)
    temperature_min = Column(JSON, nullable=False)
    temperature_max = Column(JSON, nullable=False)
    precipitation = Column(JSON, nullable=False)
    wind_speed = Column(JSON, nullable=False)
    daily = Column(JSON, nullable=False)
    fetched_at = Column(DateTime, default=datetime.utcnow())


class Summary(Base):
    __tablename__ = 'Summary'

    id = Column(Integer, primary_key=True, index=True)
    date = Column(String, nullable=False)
    location = Column(String, nullable=False)
    temperature = Column(Integer, nullable=False)
    precipitation = Column(Integer, nullable=False)
    wind_speed = Column(Integer, nullable=False)
    weather = Column(String, nullable=False)
    humidity = Column(Integer, nullable=False)
    fetched_at = Column(DateTime, default=datetime.utcnow())

    # def __repr__(self):
    #     return f"WeatherHistory(date='{self.date}', temperature='{self.temperature}', humidity='{self.humidity}', wind_speed='{self.wind_speed}', weather='{self.weather}')"


class Locations(Base):
    __tablename__ = 'Locations'

    id = Column(Integer, primary_key=True, index=True)
    location = Column(String, nullable=False)
    lat = Column(String, nullable=False)
    lon = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow())
