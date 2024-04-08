-- Up Migration

ALTER TABLE product
ADD COLUMN image_id UUID NULL;

ALTER TABLE product
ADD CONSTRAINT fk_product_upload
FOREIGN KEY (image_id) REFERENCES upload (id)
ON DELETE SET NULL;

CREATE INDEX idx_fk_product_upload ON product (image_id);

-- Down Migration

DROP INDEX idx_fk_product_upload;
ALTER TABLE product DROP CONSTRAINT fk_product_upload;
ALTER TABLE product DROP COLUMN image_id;