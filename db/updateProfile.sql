UPDATE climber 
SET username = $1, biography = $2, location_ = $3, image_url = $4
WHERE id = $5;