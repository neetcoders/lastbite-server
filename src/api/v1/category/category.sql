/* @name GetCategoryIDBySlug */
SELECT id
FROM category
WHERE slug = :slug;