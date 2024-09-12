DO $$ 
DECLARE
    rec RECORD;
BEGIN
    -- Disable all constraints
    FOR rec IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'ALTER TABLE ' || rec.tablename || ' DISABLE TRIGGER ALL';
    END LOOP;

    -- Delete all tables
    FOR rec IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP TABLE IF EXISTS ' || rec.tablename || ' CASCADE';
    END LOOP;

    -- Drop sequences
    FOR rec IN (SELECT sequence_name FROM information_schema.sequences WHERE sequence_schema = 'public') LOOP
        EXECUTE 'DROP SEQUENCE IF EXISTS ' || rec.sequence_name || ' CASCADE';
    END LOOP;

    -- Drop views
    FOR rec IN (SELECT table_name FROM information_schema.views WHERE table_schema = 'public') LOOP
        EXECUTE 'DROP VIEW IF EXISTS ' || rec.table_name || ' CASCADE';
    END LOOP;
END $$;
