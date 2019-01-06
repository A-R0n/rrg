UPDATE climber 
SET username = $1, location_ = $2, biography = $3
WHERE id = $4;