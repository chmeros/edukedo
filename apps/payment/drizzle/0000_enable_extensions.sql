-- Analog zu apps/api/drizzle/0000_enable_extensions.sql: aktiviert pgcrypto (fuer gen_random_uuid())
-- in der eigenen, physisch getrennten Payment-Datenbank, bevor irgendeine Tabelle es verwendet.
CREATE EXTENSION IF NOT EXISTS pgcrypto;
