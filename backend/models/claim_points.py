# models/claim_points.py
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime
from models.base import Base

class ClaimPoints(Base):
    __tablename__ = "claim_points"
    id = Column(Integer, primary_key=True, index=True)
    player_id = Column(Integer, ForeignKey("players.id"))
    claim_type = Column(String)  # 'daily', 'weekly', 'event'
    claimed_at = Column(DateTime, default=datetime.utcnow)