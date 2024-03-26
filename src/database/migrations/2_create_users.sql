-- Up Migration

CREATE EXTENSION IF NOT EXISTS citext;

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email CITEXT NOT NULL,
    display_name TEXT NOT NULL,
    birth_date DATE NOT NULL,
    user_secret TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE INDEX idx_users_email ON users (email);

CREATE TRIGGER trigger_update_timestamp
AFTER UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();

-- Down Migration

DROP TABLE users;