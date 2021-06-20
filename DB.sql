DROP DATABASE IF EXISTS BrettspillDB;
CREATE DATABASE BrettspillDB;
\c BrettspillDB;

--SHOW TABLES;
SELECT * FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema';
--SELECT * FROM auth_user;