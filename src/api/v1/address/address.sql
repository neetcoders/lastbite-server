/* @name CreateStoreAddress */
INSERT INTO address (street, coordinates)
VALUES (:street, ST_MakePoint(:longitude, :latitude))
RETURNING 
    id, 
    street,
    ST_X(coordinates::geometry) as "longitude",
    ST_Y(coordinates::geometry) as "latitude",
    created_at,
    updated_at;


/* @name CreateUserAddress */
INSERT INTO address (street, coordinates, user_id)
VALUES (:street, ST_MakePoint(:longitude, :latitude), :user_id)
RETURNING
    id, 
    street,
    ST_X(coordinates::geometry) as "longitude",
    ST_Y(coordinates::geometry) as "latitude",
    created_at,
    updated_at;


/* @name GetAddressByID */
SELECT 
    id, 
    street, 
    ST_X(coordinates::geometry) as "longitude",
    ST_Y(coordinates::geometry) as "latitude", 
    created_at, 
    updated_at
FROM address
WHERE
    id = :id
    AND user_id = :user_id;


/* @name GetAllUserAddresses */
SELECT 
    id, 
    street, 
    ST_X(coordinates::geometry) as "longitude",
    ST_Y(coordinates::geometry) as "latitude",
    created_at, 
    updated_at
FROM address
WHERE user_id = :user_id;


/* @name UpdateUserAddressByID */
UPDATE address
SET
    street = :street,
    coordinates = ST_MakePoint(:longitude, :latitude)
WHERE
    id = :id
    AND user_id = :user_id
RETURNING
    id, 
    street,
    ST_X(coordinates::geometry) as "longitude",
    ST_Y(coordinates::geometry) as "latitude",
    created_at,
    updated_at;


/* @name DeleteUserAddressByID */
DELETE FROM address
WHERE
    id = :id
    AND user_id = :user_id
RETURNING id;


/* @name UpdateUserActiveAddress */
UPDATE users
SET active_address_id = :active_address_id
WHERE id = (
    SELECT user_id FROM address
    WHERE id = :active_address_id
    AND user_id = :user_id
)
RETURNING active_address_id;


/* @name GetUserActiveAddress */
SELECT
    id, 
    street, 
    ST_X(coordinates::geometry) as "longitude",
    ST_Y(coordinates::geometry) as "latitude", 
    created_at, 
    updated_at
FROM address
WHERE id = (
    SELECT active_address_id
    FROM users
    WHERE id = :user_id
    LIMIT 1
);