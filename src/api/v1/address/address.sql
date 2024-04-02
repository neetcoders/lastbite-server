/* 
    @name CreateStoreAddress
    @param address -> (street, longitude, latitude)
*/
INSERT INTO address (street, longitude, latitude)
VALUES :address
RETURNING id, street, longitude, latitude, created_at, updated_at;


/* 
    @name CreateUserAddress
    @param address -> (street, longitude, latitude, user_id)
*/
INSERT INTO address (street, longitude, latitude, user_id)
VALUES :address
RETURNING id, street, longitude, latitude, created_at, updated_at;


/* @name GetAddressByID */
SELECT id, street, longitude, latitude, created_at, updated_at
FROM address
WHERE
    id = :id
    AND user_id = :user_id;


/* @name GetAllUserAddresses */
SELECT id, street, longitude, latitude, created_at, updated_at
FROM address
WHERE user_id = :user_id;


/* @name UpdateUserAddressByID */
UPDATE address
SET
    street = :street,
    longitude = :longitude,
    latitude = :latitude
WHERE
    id = :id
    AND user_id = :user_id
RETURNING id, street, longitude, latitude, created_at, updated_at;


/* @name DeleteUserAddressByID */
DELETE FROM address
WHERE
    id = :id
    AND user_id = :user_id
RETURNING id;