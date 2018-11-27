SELECT *
FROM route_items AS ri
JOIN routes AS r ON ri.id_of_route = r.route_id
JOIN climber AS c ON ri.id = c.id
ORDER BY time_stamp desc;