-- Up Migration

CREATE TABLE category (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL,
    display_name TEXT NOT NULL,
    description TEXT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX idx_category_slug ON category (slug);

CREATE TRIGGER trigger_update_timestamp
AFTER UPDATE ON category
FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();

-- Down Migration

DROP TABLE category;