from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from controller import controller  
from database.connection import SessionLocal  
from schemas import player  
from models import player as models

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Route to create a player
@router.post("/create-players/", response_model=player.Player)
def create_player(player: player.PlayerCreate, db: Session = Depends(get_db)):
    return controller.create_player(
        db=db,
        name=player.name,
        rfid_number=player.rfid_number,
        is_admin=player.is_admin
    )

@router.get("/players/rfid/{rfid_number}", response_model=player.Player)  
def get_player_by_rfid(rfid_number: str, db: Session = Depends(get_db)):
    player = db.query(models.Player).filter(models.Player.rfid_number == rfid_number).first()
    if player:
        return player
    else:
        raise HTTPException(status_code=404, detail="Player not found")

# Route to get all players
@router.get("/players/", response_model=list[player.Player])
def read_players(db: Session = Depends(get_db)):
    return controller.get_players(db=db)

# Route to get a player by ID
@router.get("/players/{player_id}", response_model=player.Player)
def read_player(player_id: int, db: Session = Depends(get_db)):
    return controller.get_player_by_id(db=db, player_id=player_id)