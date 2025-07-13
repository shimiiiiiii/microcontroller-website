# models/claim_prizes.py
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime
from models.base import Base

class ClaimPrizes(Base):
    __tablename__ = "claim_prizes"
    id = Column(Integer, primary_key=True, index=True)
    player_id = Column(Integer, ForeignKey("players.id"))
    prize_name = Column(String)
    claimed_at = Column(DateTime, default=datetime.utcnow)