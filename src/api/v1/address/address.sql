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
RETURNING id, street, longitude, latitude, user_id, created_at, updated_at;