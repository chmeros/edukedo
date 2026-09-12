-- Architekturplanung Abschnitt 9: Die erste Kern-Migration aktiviert die benötigten
-- Postgres-Extensions, bevor irgendeine Tabelle sie verwendet (citext für
-- "user".email/parent.email, pgcrypto für gen_random_uuid()).
CREATE EXTENSION IF NOT EXISTS citext;
CREATE EXTENSION IF NOT EXISTS pgcrypto;
