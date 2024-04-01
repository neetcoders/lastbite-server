-- Up Migration

CREATE TABLE product (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    display_name TEXT NOT NULL,
    description TEXT NULL,
    price_before DECIMAL(10, 2) NOT NULL,
    price_after DECIMAL(10, 2) NOT NULL,
    expiration_date DATE NOT NULL,
    stock INT NOT NULL,
    store_id UUID NOT NULL,
    category_id UUID NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now(),

    CONSTRAINT fk_product_store FOREIGN KEY (store_id) REFERENCES store (id),
    CONSTRAINT fk_product_category FOREIGN KEY (category_id) REFERENCES category (id)
);

CREATE INDEX idx_fk_product_store ON product (store_id);
CREATE INDEX idx_fk_product_category ON product (category_id);

CREATE TRIGGER trigger_update_timestamp
AFTER UPDATE ON product
FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();

-- Down Migration

DROP TABLE product;