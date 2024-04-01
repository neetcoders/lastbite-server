-- Up Migration

CREATE EXTENSION IF NOT EXISTS citext;

CREATE TABLE store (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email CITEXT NOT NULL,
    display_name TEXT NOT NULL,
    bio TEXT NULL,
    store_secret TEXT NOT NULL,
    address_id UUID NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now(),

    CONSTRAINT fk_store_address FOREIGN KEY (address_id) REFERENCES address (id)
);

CREATE UNIQUE INDEX idx_store_email ON store (email);
CREATE INDEX idx_fk_store_address ON store (address_id);

CREATE TRIGGER trigger_update_timestamp
AFTER UPDATE ON store
FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();

-- Down Migration

DROP TABLE store;