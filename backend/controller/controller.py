from sqlalchemy.orm import Session
from models.player import Player 

# Create a new player
def create_player(db: Session, name: str, rfid_number: str):
    db_player = Player(name=name, rfid_number=rfid_number, points=0)  
    db.add(db_player)
    db.commit()
    db.refresh(db_player)
    return db_player

# Get a list of players
def get_players(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Player).offset(skip).limit(limit).all()

# Get a player by ID
def get_player_by_id(db: Session, player_id: int):
    return db.query(Player).filter(Player.id == player_id).first()
