from sqlalchemy import Column, Integer, String, Boolean
from models.base import Base

class Player(Base):
    __tablename__ = "players"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    rfid_number = Column(String, unique=True, index=True)  
    points = Column(Integer, default=0)
    is_admin = Column(Boolean, default=False)
    credits = Column(Integer, default=0)

    def __repr__(self):
        return f"<player(id={self.id}, name={self.name}, rfid_number={self.rfid_number}, points={self.points}, is_admin={self.is_admin}, credits={self.credits})>"