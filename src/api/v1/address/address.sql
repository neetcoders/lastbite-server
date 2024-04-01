/* 
    @name CreateStoreAddress
    @param address -> (street, longitude, latitude)
*/
INSERT INTO address (street, longitude, latitude)
VALUES :address
RETURNING id, street, longitude, latitude, created_at, updated_at;