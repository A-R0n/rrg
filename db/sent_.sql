UPDATE route_items
SET sent_ = true
WHERE id_of_route = $1;