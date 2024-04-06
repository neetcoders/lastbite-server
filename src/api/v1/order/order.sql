/* @name GetOrderInCartId */
SELECT id
FROM orders 
WHERE 
    customer_id = :user_id
    AND store_id = :store_id
    AND status IN ('in-cart-selected', 'in-cart-unselected');


/* @name CreateNewOrder */
INSERT INTO orders (customer_id, store_id)
VALUES (:customer_id, :store_id)
RETURNING id;


/* @name CreateNewWaitingOrder */
INSERT INTO orders (customer_id, store_id, status)
VALUES (:customer_id, :store_id, 'waiting')
RETURNING id;


/* @name CreateOrderProduct */
INSERT INTO order_product (order_id, product_id, quantity)
VALUES (:order_id, :product_id, 1)
RETURNING id;


/* @name GetOrderProductID */
SELECT 
    op.id, 
    op.quantity,
    o.customer_id
FROM order_product op
INNER JOIN orders o ON op.order_id = o.id
WHERE
    order_id = :order_id
    AND product_id = :product_id
    AND o.customer_id = :user_id;


/* @name IncreaseOrderProductQuantity */
UPDATE order_product
SET quantity = quantity + 1
WHERE
    product_id = :product_id
    AND order_id = (
        SELECT id
        FROM orders
        WHERE 
            id = :order_id
            AND customer_id = :customer_id
    )
RETURNING id;


/* @name DecreaseOrderProductQuantity */
UPDATE order_product
SET quantity = GREATEST(1, quantity - 1)
WHERE
    product_id = :product_id
    AND order_id = (
        SELECT id
        FROM orders
        WHERE
            id = :order_id
            AND customer_id = :customer_id
    )
RETURNING id;


/* @name ToggleOrderProductSelected */
UPDATE order_product
SET selected = NOT selected
WHERE
    product_id = :product_id
    AND order_id = (
        SELECT id
        FROM orders
        WHERE
            id = :order_id
            AND customer_id = :customer_id
    )
RETURNING id;


/* @name DeleteOrderProduct */
DELETE FROM order_product
WHERE
    product_id = :product_id
    AND order_id = (
        SELECT id
        FROM orders
        WHERE
            customer_id = :customer_id
            AND status IN ('in-cart-selected', 'in-cart-unselected')
            AND store_id = (
                SELECT store_id FROM product WHERE id = :product_id
            )
    )
RETURNING id;


/* @name DeleteEmptyOrder */
DELETE FROM orders o
WHERE NOT EXISTS (
    SELECT 1 FROM order_product op WHERE op.order_id = o.id
);


/* @name ToggleOrderStoreSelected */
UPDATE orders
SET status = (
    CASE
        WHEN status = 'in-cart-selected' THEN 'in-cart-unselected'::ORDER_STATUS
        WHEN status = 'in-cart-unselected' THEN 'in-cart-selected'::ORDER_STATUS
    END
)
WHERE
    store_id = :store_id
    AND customer_id = :user_id
    AND status IN ('in-cart-selected', 'in-cart-unselected')
RETURNING id;


/* @name DeleteOrderStore */
DELETE FROM orders
WHERE
    store_id = :store_id
    AND customer_id = :user_id
    AND status IN ('in-cart-selected', 'in-cart-unselected')
RETURNING id;


/* @name GetOrderProductQuantity */
SELECT
    p.id,
    op.selected,
    p.display_name,
    p.price_before,
    p.price_after,
    p.stock,
    op.quantity
FROM product p
INNER JOIN order_product op ON op.product_id = p.id
INNER JOIN orders o ON op.order_id = o.id
WHERE
    p.id = :product_id
    AND o.customer_id = :user_id
    AND status IN ('in-cart-selected', 'in-cart-unselected');


/* @name GetOrderByID */
SELECT
    o.id,
    o.status,
    s.id AS "store_id",
    s.display_name AS "store_display_name",
    u.id AS "user_id",
    u.email AS "user_email",
    u.display_name AS "user_display_name",
    a.street AS "address_street", 
    ST_X(coordinates::geometry) as "address_longitude",
    ST_Y(coordinates::geometry) as "address_latitude", 
    p.id AS "product_id",
    op.id AS "order_product_id",
    op.selected AS "order_product_selected",
    op.quantity AS "order_product_quantity",
    p.display_name AS "product_display_name",
    p.price_before AS "product_price_before",
    p.price_after AS "product_price_after",
    p.stock AS "product_stock",
    o.created_at,
    o.updated_at
FROM orders o
INNER JOIN order_product op ON o.id = op.order_id
INNER JOIN store s ON s.id = o.store_id
INNER JOIN product p ON p.id = op.product_id
INNER JOIN users u ON u.id = o.customer_id
LEFT JOIN address a ON u.active_address_id = a.id
WHERE 
    o.id = :id;


/* @name GetUserCartByUser */
SELECT
    o.id,
    o.status,
    s.id AS "store_id",
    s.display_name AS "store_display_name",
    p.id AS "product_id",
    op.id AS "order_product_id",
    op.selected AS "order_product_selected",
    op.quantity AS "order_product_quantity",
    p.display_name AS "product_display_name",
    p.price_before AS "product_price_before",
    p.price_after AS "product_price_after",
    p.stock AS "product_stock",
    o.created_at,
    o.updated_at
FROM orders o
INNER JOIN order_product op ON o.id = op.order_id
INNER JOIN store s ON s.id = o.store_id
INNER JOIN product p ON p.id = op.product_id
WHERE 
    o.customer_id = :user_id
    AND o.status IN ('in-cart-selected', 'in-cart-unselected');


/* @name GetOrderListByUser */
SELECT
    o.id,
    o.status,
    s.id AS "store_id",
    s.display_name AS "store_display_name",
    u.id AS "user_id",
    u.email AS "user_email",
    u.display_name AS "user_display_name",
    p.id AS "product_id",
    op.id AS "order_product_id",
    op.selected AS "order_product_selected",
    op.quantity AS "order_product_quantity",
    p.display_name AS "product_display_name",
    p.price_before AS "product_price_before",
    p.price_after AS "product_price_after",
    p.stock AS "product_stock",
    o.created_at,
    o.updated_at
FROM orders o
INNER JOIN order_product op ON o.id = op.order_id
INNER JOIN store s ON s.id = o.store_id
INNER JOIN product p ON p.id = op.product_id
INNER JOIN users u ON u.id = o.customer_id
WHERE 
    o.customer_id = :user_id
    AND o.status = :status
ORDER BY o.updated_at DESC;


/* @name GetUserCartSelectedIDList */
SELECT id, store_id
FROM orders
WHERE 
    customer_id = :user_id
    AND status = 'in-cart-selected';


/* @name CheckoutSelectedOrderProduct */
UPDATE order_product
SET order_id = :new_order_id
WHERE
    order_id = :old_order_id
    AND selected IS TRUE;


/* @name GetOrderListByStore */
SELECT
    o.id,
    o.status,
    s.id AS "store_id",
    s.display_name AS "store_display_name",
    u.id AS "user_id",
    u.email AS "user_email",
    u.display_name AS "user_display_name",
    p.id AS "product_id",
    op.id AS "order_product_id",
    op.selected AS "order_product_selected",
    op.quantity AS "order_product_quantity",
    p.display_name AS "product_display_name",
    p.price_before AS "product_price_before",
    p.price_after AS "product_price_after",
    p.stock AS "product_stock",
    o.created_at,
    o.updated_at
FROM orders o
INNER JOIN order_product op ON o.id = op.order_id
INNER JOIN store s ON s.id = o.store_id
INNER JOIN product p ON p.id = op.product_id
INNER JOIN users u ON u.id = o.customer_id
WHERE 
    o.store_id = :store_id
    AND o.status = :status
ORDER BY o.updated_at DESC;


/* @name ChangeStoreOrderStatus */
UPDATE orders
SET status = :status
WHERE
    id = :order_id
    AND store_id = :store_id
    AND status NOT IN ('in-cart-selected', 'in-cart-unselected')
RETURNING id;