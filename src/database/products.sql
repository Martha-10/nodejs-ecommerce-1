-- ========================================
-- TABLA: products
-- ========================================
DROP TABLE IF EXISTS products;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  description VARCHAR(200),
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO products (id, title, description) VALUES
  (1, 'Chic French-inspired blouse', '100% organic cotton, Features delicate ruffle details, puff sleeves, flattering tailored fit, Lightweight and breathable'),
  (2, 'High-waisted tailored trousers', 'crafted from premium linen blend, Designed with a relaxed fit, subtle pleats, and side pockets for effortless elegance'),
  (3, 'Oversized hoodie', 'lightweight,Features a cozy fleece lining, dropped shoulders, minimalist embroidered logo.'),
  (4, 'Romantic midi dress', 'lightweight, flowy chiffon, dropped shoulders, Features a cinched waist, soft ruffle trims. perfect for garden parties, summer dates, or weekend getaways.'),
  (5, 'Elegant floor-length dress', 'silky satin with a soft sheen, subtle sweetheart neckline, flowing A-line skirt, fitted bodice, A timeless choice, graceful, and unforgettable.'),
  (6, 'Flirty midi skirt', 'lightweight chiffon with a delicate floral print,subtle pleats, flowy silhouette, moves gracefully, casual weekends, refined, unforgettable, streetwear style.');
