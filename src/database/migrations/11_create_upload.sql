-- Up Migration

CREATE TABLE upload (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ext TEXT NOT NULL,

    user_id UUID NULL,
    store_id UUID NULL,
    
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now(),

    CONSTRAINT fk_upload_users FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_upload_store FOREIGN KEY (store_id) REFERENCES store (id) ON DELETE CASCADE,
    CONSTRAINT check_upload_fk CHECK ((user_id IS NULL AND store_id IS NOT NULL) OR (user_id IS NOT NULL AND store_id IS NULL))
);

CREATE INDEX idx_fk_upload_users ON upload (user_id);
CREATE INDEX idx_fk_upload_store ON upload (store_id);

CREATE TRIGGER trigger_update_timestamp
AFTER UPDATE ON upload
FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();

-- Down Migration

DROP TABLE upload;