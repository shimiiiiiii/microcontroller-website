from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import claim_points, claim_prizes, player

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # or ["*"] for all origins (not recommended for production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(claim_points.router)
app.include_router(claim_prizes.router)
app.include_router(player.router)




