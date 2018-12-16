UPDATE route_items
SET picture_of_route = $3
WHERE id_of_route = $1 AND id = $2;