from pydantic import BaseModel

class PlayerBase(BaseModel):
    name: str
    rfid_number: str
    points: int = 0
    is_admin: bool = False  # <-- Add this line

class PlayerCreate(PlayerBase):
    pass

class Player(PlayerBase):
    id: int

    class Config:
        orm_mode = True
