-- Up Migration

CREATE TYPE ORDER_STATUS AS ENUM ('in-cart-unselected', 'in-cart-selected', 'waiting', 'processed', 'ready', 'done', 'cancelled', 'rejected');

CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    customer_id UUID NOT NULL,
    store_id UUID NOT NULL,

    status ORDER_STATUS NOT NULL DEFAULT 'in-cart-selected',

    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now(),

    CONSTRAINT fk_orders_users FOREIGN KEY (customer_id) REFERENCES users (id),
    CONSTRAINT fk_orders_store FOREIGN KEY (store_id) REFERENCES store (id)
);

CREATE INDEX idx_fk_orders_users ON orders (customer_id);
CREATE INDEX idx_fk_orders_store ON orders (store_id);

CREATE TRIGGER trigger_update_timestamp
AFTER UPDATE ON orders
FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();

-- Down Migration

DROP TABLE orders;
DROP TYPE ORDER_STATUS;