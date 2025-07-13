from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.player import Player
from models.claim_prizes import ClaimPrizes
from database.connection import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/players/claim_prizes/")
def claim_prize(rfid_number: str, prize_name: str, points: int, db: Session = Depends(get_db)):
    player = db.query(Player).filter(Player.rfid_number == rfid_number).first()
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")
    already_claimed = db.query(ClaimPrizes).filter_by(player_id=player.id, prize_name=prize_name).first()
    if already_claimed:
        raise HTTPException(status_code=400, detail="Prize already claimed")
    if player.points < points:
        raise HTTPException(status_code=400, detail="Not enough points")
    player.points -= points
    db.add(ClaimPrizes(player_id=player.id, prize_name=prize_name))
    db.commit()
    db.refresh(player)
    return {"success": True, "new_points": player.points}