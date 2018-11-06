INSERT INTO climber
  (id)
VALUES
  ($1);

SELECT *
FROM climber
WHERE id = $1;