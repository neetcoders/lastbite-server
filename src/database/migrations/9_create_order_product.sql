-- Up Migration

CREATE TABLE order_product (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    order_id UUID NOT NULL,
    product_id UUID NOT NULL,

    quantity INT NOT NULL,
    selected BOOLEAN NOT NULL DEFAULT TRUE,
    
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now(),

    CONSTRAINT fk_order_product_order FOREIGN KEY (order_id) REFERENCES orders (id),
    CONSTRAINT fk_order_product_product FOREIGN KEY (product_id) REFERENCES product (id),
    CONSTRAINT check_order_product_quantity CHECK (quantity > 0)
);

CREATE INDEX idx_fk_order_product_order ON order_product (order_id);
CREATE INDEX idx_fk_order_product_product ON order_product (product_id);

CREATE TRIGGER trigger_update_timestamp
AFTER UPDATE ON order_product
FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();

-- Down Migration

DROP TABLE order_product;