-- SELECT *
-- FROM route_items AS ri
-- JOIN routes AS r ON ri.id_of_route = r.route_id
-- WHERE ri.id = $2

UPDATE route_items
SET picture_of_route = $3
WHERE id_of_route = $1 AND id = $2;

-- SELECT picture_of_route
-- FROM ri
-- WHERE id_of_route = $1;