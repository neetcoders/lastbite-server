-- Up Migration

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER 
LANGUAGE plpgsql AS 
$$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$


-- Down Migration

DROP FUNCTION IF EXISTS update_timestamp();