UPDATE route_items
SET time_stamp = timeofday()
WHERE id_of_route = $1;