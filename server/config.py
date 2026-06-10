from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    APP_NAME: str
    DEBUG_MODE: bool = False  # Provides a default fallback value
    DATABASE_URL: str
    CLIENT_URL: str
    WEATHER_URL: str ='https://api.open-meteo.com/v1/forecast'
    APP_NAME_DESCRIPTION: str

    # Tell Pydantic to read from a .env file
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()
