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