-- Up Migration

CREATE TABLE address (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    street TEXT NOT NULL,
    longitude FLOAT NOT NULL,
    latitude FLOAT NOT NULL,
    user_id UUID NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now(),

    CONSTRAINT fk_address_user FOREIGN KEY (user_id) REFERENCES users (id)
);


CREATE INDEX idx_address_coordinate ON address (longitude, latitude);
CREATE INDEX idx_fk_address_user ON address (user_id);

CREATE TRIGGER trigger_update_timestamp
AFTER UPDATE ON address
FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();

-- Down Migration

DROP TABLE address;