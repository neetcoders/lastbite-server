/* 
    @name CreateProduct
    @param product -> (display_name, description, price_before, price_after, expiration_date, stock, store_id, category_id)
*/
INSERT INTO product (display_name, description, price_before, price_after, expiration_date, stock, store_id, category_id)
VALUES :product
RETURNING id;


/* @name GetProductById */
SELECT
    p.id,
    p.display_name,
    p.description,
    p.price_before,
    p.price_after,
    p.expiration_date,
    p.stock,
    s.id as "store_id",
    s.display_name as "store_display_name",
    s.created_at as "store_created_at",
    s.updated_at as "store_updated_at",
    a.street as "address_street",
    a.longitude as "address_longitude",
    a.latitude as "address_latitude",
    a.created_at as "address_created_at",
    a.updated_at as "address_updated_at",
    c.slug as "category_slug",
    c.display_name as "category_display_name",
    p.created_at,
    p.updated_at
FROM product p
INNER JOIN store s ON s.id = p.store_id
INNER JOIN address a ON a.id = s.address_id
INNER JOIN category c ON c.id = p.category_id
WHERE p.id = :id;