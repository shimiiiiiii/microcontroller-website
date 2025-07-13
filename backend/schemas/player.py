from pydantic import BaseModel

class PlayerBase(BaseModel):
    name: str
    rfid_number: str
    points: int = 0
    is_admin: bool = False
    credits: int = 0

class PlayerCreate(PlayerBase):
    pass

class Player(PlayerBase):
    pass
