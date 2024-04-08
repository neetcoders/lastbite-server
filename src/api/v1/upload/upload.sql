/* 
    @name CreateStoreUpload 
    @param upload -> (id, ext, store_id)
*/
INSERT INTO upload (id, ext, store_id)
VALUES :upload
RETURNING id;