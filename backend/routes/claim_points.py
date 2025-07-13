from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.player import Player
from models.claim_points import ClaimPoints
from database.connection import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/players/claim_points")
def claim_points(rfid_number: str, key: str, points: int, db: Session = Depends(get_db)):
    player = db.query(Player).filter(Player.rfid_number == rfid_number).first()
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")
    # Check if already claimed
    already_claimed = db.query(ClaimPoints).filter_by(player_id=player.id, claim_type=key).first()
    if already_claimed:
        raise HTTPException(status_code=400, detail="Already claimed")
    player.points += points
    db.add(ClaimPoints(player_id=player.id, claim_type=key))
    db.commit()
    db.refresh(player)
    return {"success": True, "new_points": player.points}