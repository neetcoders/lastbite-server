/* 
    @name CreateProduct
    @param product -> (display_name, description, price_before, price_after, expiration_date, stock, store_id, category_id)
*/
INSERT INTO product (display_name, description, price_before, price_after, expiration_date, stock, store_id, category_id)
VALUES :product
RETURNING id;


/* @name UpdateProductDetails */
UPDATE product
SET
    display_name = :display_name,
    description = :description,
    price_before = :price_before,
    price_after = :price_after,
    expiration_date = :expiration_date,
    category_id = :category_id
WHERE 
    id = :id
    AND store_id = :store_id
RETURNING id;


/* @name UpdateProductStock */
UPDATE product
SET stock = :stock
WHERE 
    id = :id
    AND store_id = :store_id
RETURNING id;


/* @name GetProductOwnerByID */
SELECT store_id
FROM product
WHERE id = :id;


/* @name GetProductByID */
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
    ST_X(a.coordinates::geometry) as "address_longitude",
    ST_Y(a.coordinates::geometry) as "address_latitude",
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


/* @name DeleteProductByID */
DELETE FROM product
WHERE 
    id = :id
    AND store_id = :store_id;


/* @name GetMinimumProduct */
SELECT id, stock, store_id, category_id
FROM product
WHERE id = :id;


/* @name GetProductFromNearestStores */
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
    ST_X(a.coordinates::geometry) as "address_longitude",
    ST_Y(a.coordinates::geometry) as "address_latitude",
    ST_DISTANCE(a.coordinates, :user_coordinates) as "address_distance",
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
WHERE ST_DISTANCE(a.coordinates, :user_coordinates) < :max_distance
ORDER BY ST_DISTANCE(a.coordinates, :user_coordinates) ASC, p.updated_at DESC, id ASC
LIMIT :limit OFFSET :offset;