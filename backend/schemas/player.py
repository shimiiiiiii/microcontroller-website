from pydantic import BaseModel

class PlayerBase(BaseModel):
    name: str
    rfid_number: str
    points: int = 0  

class PlayerCreate(PlayerBase):
    pass

class Player(PlayerBase):
    id: int

    class Config:
        orm_mode = True  
