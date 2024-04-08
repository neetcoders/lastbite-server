/* @name GetStoreUploadOwner */
SELECT store_id FROM upload
WHERE id = :id;


/* 
    @name CreateStoreUpload 
    @param upload -> (id, ext, store_id)
*/
INSERT INTO upload (id, ext, store_id)
VALUES :upload
RETURNING id;


/* @name RemoveStoreUpload */
DELETE FROM upload
WHERE 
    id = :id
    AND store_id = :store_id
    AND store_id IS NOT NULL
RETURNING id, ext;