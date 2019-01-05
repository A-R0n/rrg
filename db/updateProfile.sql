UPDATE climber 
SET username = $1, location_ = $2, biography = $3, image_url = $4
WHERE id = $5;