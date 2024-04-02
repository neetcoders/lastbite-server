-- Up Migration

ALTER TABLE users
ADD COLUMN active_address_id UUID NULL;

ALTER TABLE users
ADD CONSTRAINT fk_users_address
FOREIGN KEY (active_address_id) REFERENCES address (id)
ON DELETE SET NULL;

CREATE INDEX idx_fk_users_address ON users (active_address_id);


-- Down Migration

DROP INDEX idx_fk_users_address;
ALTER TABLE users DROP CONSTRAINT fk_users_address;
ALTER TABLE users DROP COLUMN active_address_id;