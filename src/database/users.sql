-- ========================================
-- ELIMINAR Y CREAR BASE DE DATOS
-- ========================================
DROP DATABASE IF EXISTS ecommerce;
CREATE DATABASE ecommerce;

USE ecommerce;

-- ========================================
-- TABLA: users
-- ========================================
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  role ENUM ('admin','employee','customer') DEFAULT 'customer',
  name VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO users (id, role, name, password, email) VALUES
  (1, NULL, 'Maria Almeida', '$2b$10$vNPDPAva//83gbyad.lIfuo7buBxwvlOuJgWYdJi7PH/5AZ.h/rrm', 'user@user.com'),
  (2, NULL, 'Maria', '$2b$10$./ejLdYX5K8nKF8C1MdrAOPq5MILYUccGke/AmJqPjxrI0w5uqN/.', 'admin@assemblerschool.com'),
  (3, NULL, 'Betty Boop', '$2b$10$Nf8LdZP/xa0jlVNfP6g5a.Mzsa21KME8l.QHnhCpU4P1ShQTyNnna', 'betty@boop.com'),
  (4, NULL, 'Maria12', '$2b$10$AcLQmQ6RuXSAN.mql0/jre2HCYwvd8Jv1rP3fb2jFteH.v8pwrgS.', 'admin@assemblerschool.com'),
  (5, NULL, 'Alfred Garcia', '$2b$10$fNyGBL3Wkkv1cWXlYePreOh1cHjHIhEGcKXXlrKqrI.SRkgDe2cdW', 'alfred@garcia.com'),
  (6, 'admin', 'Jesus Alves', '$2b$10$h/kKGgYBj1fsrf1HYLGfeeiwPllq2cja17ichrnjBm9TT8b8WiNBO', 'admin@admin.com'),
  (7, 'employee', 'John Talbain', '$2b$10$vNPDPAva//83gbyad.lIfuo7buBxwvlOuJgWYdJi7PH/5AZ.h/rrm', 'employee@employee.com'),
  (8, NULL, 'Guilherme Carra', '$2b$10$f0rgUInqHFsrAyfK/vwPtO.psMpygisDA9n9ifQEDofaaf/WKkXzm', 'gui_gc@hotmail.com');
