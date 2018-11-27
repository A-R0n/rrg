SELECT *
FROM route_items AS ri
JOIN routes AS r ON ri.id_of_route = r.route_id
WHERE ri.id = $1;

UPDATE r
SET route_img = $2
WHERE id = $1;

SELECT route_img 
FROM r
WHERE id = $1;