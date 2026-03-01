from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "SneakerAI"
    DATABASE_URL: str = "postgresql://sneakerai_user:sneakerai_password@localhost:5432/sneakerai"
    SECRET_KEY: str = "supeR_secreT_kEy_fOr_JWT_ToKenS"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        env_file = ".env"

settings = Settings()
