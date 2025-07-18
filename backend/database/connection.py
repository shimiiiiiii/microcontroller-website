from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import player, claim_points, claim_prizes  # Import all models
from models.base import Base


SQLALCHEMY_DATABASE_URL = "sqlite:///./test3.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)
