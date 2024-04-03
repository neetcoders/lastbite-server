-- Up Migration

CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE address (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    street TEXT NOT NULL,
    coordinates GEOGRAPHY (POINT, 4326) NOT NULL,
    user_id UUID NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now(),

    CONSTRAINT fk_address_user FOREIGN KEY (user_id) REFERENCES users (id)
);


CREATE INDEX idx_address_coordinate ON address USING GIST (coordinates);
CREATE INDEX idx_fk_address_user ON address (user_id);

CREATE TRIGGER trigger_update_timestamp
AFTER UPDATE ON address
FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();

-- Down Migration

DROP TABLE address;