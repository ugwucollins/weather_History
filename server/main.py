
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from model import WeatherHistory, Locations, Summary,  Base
from schema import WeatherResponse, CreateLocation, SummaryLocation
from typing import List
from getLocation import getLocationData, Location_Arrays
from config import settings
from fastapi.encoders import jsonable_encoder

DATABASE_URL = settings.DATABASE_URL
engine = create_engine(DATABASE_URL, connect_args={'check_same_thread': False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)


app = FastAPI(title=settings.APP_NAME,
              description=settings.APP_NAME_DESCRIPTION, version='1.0.0')

origins = [
    settings.CLIENT_URL,
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get('/health')
def index():
    return JSONResponse(
        status_code=200,
        content={"message": 'Weather History FastApi', "success": True}
    )


@app.get('/weather/{location}', response_model=WeatherResponse)
async def GetWeatherLocation(location: str, db: Session = Depends(get_db)):
    records = db.query(WeatherHistory).filter(
        WeatherHistory.location == location.lower()).first()
    JsonRecords = jsonable_encoder(records)

    if not records:
        getLocations = await getLocationData(location.lower())

        add_location = WeatherHistory(
            location=location.lower(),

            daily=getLocations.get('daily'),

            temperature_min=getLocations.get(
                'daily', {}).get('temperature_2m_min'),
            temperature_max=getLocations.get(
                'daily', {}).get('temperature_2m_max'),
            precipitation=getLocations.get(
                'daily', {}).get('precipitation_sum'),
            wind_speed=getLocations.get('daily', {}).get('wind_speed_10m_max'),
        )

        JsonLocationRecords = jsonable_encoder(add_location)
        db.add(add_location)
        db.commit()

        db.refresh(add_location)
        return JSONResponse(
            status_code=200,
            content={"message": "Location Data", "success": True, "data": JsonLocationRecords})

    return JSONResponse(
        status_code=200,
        content={"message": "Location Data",
                 "success": True, "data": JsonRecords}
    )


@app.get('/summary/{location}', response_model=SummaryLocation)
async def GetSummaryLocation(location: str, db: Session = Depends(get_db)):
    records = db.query(Summary).filter(
        Summary.location == location.lower()).first()
    jsonRecords = jsonable_encoder(records)

    if not records:
        getLocations = await getLocationData(location.lower())

        add_summary_location = Summary(
            location=location.lower(),

            date=getLocations.get('current', {}).get('time'),

            temperature=getLocations.get('current', {}).get('temperature_2m'),
            precipitation=getLocations.get('current', {}).get('precipitation'),
            wind_speed=getLocations.get('current', {}).get('wind_speed_10m'),
            weather=getLocations.get('current', {}).get('weather_code'),
            humidity=getLocations.get('current', {}).get(
                'relative_humidity_2m')
        )

        db.add(add_summary_location)
        db.commit()
        JsonSummaryRecords = jsonable_encoder(add_summary_location)

        db.refresh(add_summary_location)
        return JSONResponse(
            status_code=200,
            content={"message": "Summary Data", "success": True, "data": JsonSummaryRecords})
    return JSONResponse(
        status_code=200,
        content={"message": "summary Location Data", "success": True, "data": jsonRecords})


@app.get('/locations', response_model=List[CreateLocation])
def GetLocation(db: Session = Depends(get_db)):
    records = db.query(Locations).all()

    jsonRecords = jsonable_encoder(records)

    if not records:
        for currentLocation in Location_Arrays:
            newRecords = Locations(
                location=currentLocation['location'], lon=currentLocation['lon'], lat=currentLocation['lat'])
            print(newRecords)
            db.add(newRecords)
            db.commit()
            db.refresh(newRecords)

            return JSONResponse(
                status_code=200,
                content={"message": "all Locations", "success": True, "data": newRecords})

        if not newRecords:
            raise HTTPException(
                status_code=404, detail='Weather Location not found', success=False)

    return JSONResponse(
        status_code=200,
        content={"message": "all Locations", "success": True, "data": jsonRecords})
