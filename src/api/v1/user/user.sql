/* @name CheckUserByEmail */
SELECT 
    EXISTS (SELECT 1 FROM users WHERE email = :email) AS "exists";


/* 
    @name CreateUser
    @param user -> (email, display_name, birth_date, user_secret)
*/
INSERT INTO users (email, display_name, birth_date, user_secret)
VALUES :user
RETURNING id, email, display_name, birth_date, created_at, updated_at;


/* @name GetUserByEmailWithSecret */
SELECT
    id,
    email,
    display_name,
    user_secret,
    birth_date,
    created_at,
    updated_at
FROM users
WHERE email = :email;