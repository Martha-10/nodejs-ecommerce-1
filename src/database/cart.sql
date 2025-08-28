-- ========================================
-- TABLA: cart_items
-- ========================================
DROP TABLE IF EXISTS cart_items;

CREATE TABLE cart_items (
  user_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  PRIMARY KEY (user_id),
  CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO cart_items (user_id, quantity) VALUES
  (8, 2);