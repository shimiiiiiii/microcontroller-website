from sqlalchemy.orm import Session
from models.player import Player 

# Create a new player
def create_player(db: Session, name: str, rfid_number: str, is_admin: bool = False, credits: int = 0):
    db_player = Player(name=name, rfid_number=rfid_number, points=0, is_admin=is_admin, credits=credits)
    db.add(db_player)
    db.commit()
    db.refresh(db_player)
    return db_player

# Get a list of players
def get_players(db: Session):
    return db.query(Player).all()

# Get a player by ID
def get_player_by_id(db: Session, player_id: int):
    return db.query(Player).filter(Player.id == player_id).first()
