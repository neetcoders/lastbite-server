-- Up Migration

CREATE INDEX idx_product_name ON product USING GIN (to_tsvector('simple', display_name));

-- Down Migration

DROP INDEX idx_product_name;