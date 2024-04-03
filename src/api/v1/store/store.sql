/* @name CheckStoreByEmail */
SELECT 
    EXISTS (SELECT 1 FROM store WHERE email = :email) AS "exists";


/* 
    @name CreateStore
    @param store -> (email, display_name, address_id, store_secret)
*/
INSERT INTO store (email, display_name, address_id, store_secret)
VALUES :store
RETURNING id, email, display_name, address_id, created_at, updated_at;


/* @name GetStoreByEmailWithSecret */
SELECT
    s.id,
    s.email,
    s.display_name,
    s.bio,
    s.store_secret,
    a.street,
    a.coordinates,
    a.created_at as "address_created_at",
    a.updated_at as "adress_updated_at",
    s.created_at,
    s.updated_at
FROM store s
INNER JOIN address a ON a.id = s.address_id 
WHERE email = :email;


/* @name GetStoreById */
SELECT
    s.email,
    s.display_name,
    s.bio,
    s.store_secret,
    a.street,
    a.coordinates,
    a.created_at as "address_created_at",
    a.updated_at as "adress_updated_at",
    s.created_at,
    s.updated_at
FROM store s
INNER JOIN address a ON a.id = s.address_id
WHERE s.id = :id;