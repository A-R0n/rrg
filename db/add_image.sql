UPDATE climber
SET image_url = $1
WHERE id = $2;

SELECT image_url 
FROM climber
WHERE id = $2;