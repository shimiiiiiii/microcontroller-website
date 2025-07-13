-- database: D:\microcontroller\microcontroller-website\backend\test3.db
-- SQLite
-- UPDATE players SET is_admin = 1 WHERE id = 1234;
-- ALTER TABLE players ADD COLUMN credits INTEGER DEFAULT 0;

-- Claim Points table
CREATE TABLE IF NOT EXISTS claim_points (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    player_id INTEGER,
    claim_type TEXT,
    claimed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (player_id) REFERENCES players(id)
);

-- Claim Prizes table
CREATE TABLE IF NOT EXISTS claim_prizes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    player_id INTEGER,
    prize_name TEXT,
    claimed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (player_id) REFERENCES players(id)
);
