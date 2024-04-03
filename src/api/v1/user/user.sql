/* @name CheckUserByEmail */
SELECT 
    EXISTS (SELECT 1 FROM users WHERE email = :email) AS "exists";


/* 
    @name CreateUser
    @param user -> (email, display_name, birth_date, user_secret)
*/
INSERT INTO users (email, display_name, birth_date, user_secret)
VALUES :user
RETURNING id;


/* @name GetUserSecretByEmail */
SELECT
    id,
    user_secret
FROM users
WHERE email = :email;


/* @name GetUserById */
SELECT
    email,
    display_name,
    birth_date,
    created_at,
    updated_at
FROM users
WHERE id = :id;


/* @name GetUserWithAddress */
SELECT
    u.email,
    u.display_name,
    u.birth_date,
    a.id as "address_id",
    a.street as "address_street",
    a.coordinates as "address_coordinates",
    a.created_at as "address_created_at",
    a.updated_at as "address_updated_at",
    u.created_at,
    u.updated_at
FROM users u
LEFT JOIN address a ON a.id = u.active_address_id
WHERE u.id = :id;