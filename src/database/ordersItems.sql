

-- ========================================
-- TABLA: order_items
-- ========================================
DROP TABLE IF EXISTS order_items;

CREATE TABLE order_items (
  order_id INT NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY (order_id),
  CONSTRAINT fk_orderitems_orders FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO order_items (order_id, quantity) VALUES
  (64, 1), (65, 1), (61, 1), (66, 3), (67, 1), (62, 3), (68, 3),
  (69, 2), (32, 1), (72, 1), (76, 2), (23, 3), (26, 4), (17, 2),
  (71, 1), (70, 2), (21, 2), (20, 2), (24, 2), (27, 1), (11, 1),
  (73, 3), (74, 1), (75, 1), (22, 1), (25, 1), (78, 2), (79, 2);
