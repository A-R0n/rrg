UPDATE route_items
SET description_ = $2
WHERE id_of_route = $1
AND id = $3;