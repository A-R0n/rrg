UPDATE route_items
SET description_ = $2
WHERE id_of_route = $1
AND id = $3;

-- INSERT INTO route_items (id_of_route, description_, id)
-- VALUES ($1, $2, $3)
