-- ===========================================
-- Parent tables first
-- ===========================================

-- Drop parent tables first
DROP TABLE IF EXISTS users_table CASCADE;
DROP TABLE IF EXISTS tags_table CASCADE;
DROP TABLE IF EXISTS events_table CASCADE;
DROP TABLE IF EXISTS shops_table CASCADE;
DROP TABLE IF EXISTS volunteers_table CASCADE;

-- Table structure for table users_table
CREATE TABLE users_table (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  role VARCHAR(20) NOT NULL DEFAULT 'ROLE_USER',
  enabled BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP,
  passw_reset_token VARCHAR(255),
  passw_reset_token_expires TIMESTAMP,
  email_verified BOOLEAN NOT NULL DEFAULT FALSE,
  deleted_at TIMESTAMP,
  email_verif_token VARCHAR(255),
  email_verif_token_expires TIMESTAMP
);

-- Table structure for table tags_table
CREATE TABLE tags_table (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
);

-- Table structure for table events_table
CREATE TABLE events_table (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255),
  description TEXT NOT NULL,
  is_free BOOLEAN NOT NULL,
  cost DOUBLE PRECISION NOT NULL,
  start_date DATE,
  end_date DATE,
  approved BOOLEAN NOT NULL,
  created_by_id BIGINT,
  link VARCHAR(2048),
  city VARCHAR(255) NOT NULL,
  address VARCHAR(255),
  CONSTRAINT fk_event_creator FOREIGN KEY (created_by_id) REFERENCES users_table(id) ON DELETE SET NULL
);

-- Table structure for table shops_table
CREATE TABLE shops_table (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  city VARCHAR(100),
  link VARCHAR(2048),
  address VARCHAR(255),
  approved BOOLEAN NOT NULL DEFAULT FALSE,
  created_by_id BIGINT,
  CONSTRAINT shops_table_ibfk_1 FOREIGN KEY (created_by_id) REFERENCES users_table(id)
);

-- Table structure for table volunteers_table
CREATE TABLE volunteers_table (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  link VARCHAR(2048),
  city VARCHAR(100),
  address VARCHAR(255),
  approved BOOLEAN NOT NULL DEFAULT FALSE,
  created_by_id BIGINT,
  CONSTRAINT volunteers_table_ibfk_1 FOREIGN KEY (created_by_id) REFERENCES users_table(id)
);

-- ===========================================
-- Child tables with foreign keys
-- ===========================================

-- Drop child tables if they exist (safe to re-run)
DROP TABLE IF EXISTS dine_table CASCADE;
DROP TABLE IF EXISTS dine_tags_table CASCADE;
DROP TABLE IF EXISTS event_tags_table CASCADE;
DROP TABLE IF EXISTS shop_tags_table CASCADE;
DROP TABLE IF EXISTS volunteer_tags_table CASCADE;

-- Table structure for table dine_table
CREATE TABLE dine_table (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  city VARCHAR(100),
  link VARCHAR(2048),
  address VARCHAR(255),
  approved BOOLEAN NOT NULL DEFAULT FALSE,
  created_by_id BIGINT,
  CONSTRAINT dine_table_ibfk_1 FOREIGN KEY (created_by_id) REFERENCES users_table(id)
);

-- Table structure for table dine_tags_table
CREATE TABLE dine_tags_table (
  dine_id BIGINT NOT NULL,
  tag_id INT NOT NULL,
  PRIMARY KEY (dine_id, tag_id),
  CONSTRAINT dine_tags_table_ibfk_1 FOREIGN KEY (dine_id) REFERENCES dine_table(id),
  CONSTRAINT dine_tags_table_ibfk_2 FOREIGN KEY (tag_id) REFERENCES tags_table(id)
);

-- Table structure for table event_tags_table
CREATE TABLE event_tags_table (
  event_id BIGINT NOT NULL,
  tag_id INT NOT NULL,
  PRIMARY KEY (event_id, tag_id),
  CONSTRAINT event_tags_table_ibfk_1 FOREIGN KEY (event_id) REFERENCES events_table(id) ON DELETE CASCADE,
  CONSTRAINT event_tags_table_ibfk_2 FOREIGN KEY (tag_id) REFERENCES tags_table(id) ON DELETE CASCADE
);

-- Table structure for table shop_tags_table
CREATE TABLE shop_tags_table (
  shop_id BIGINT NOT NULL,
  tag_id INT NOT NULL,
  PRIMARY KEY (shop_id, tag_id),
  CONSTRAINT shop_tags_table_ibfk_1 FOREIGN KEY (shop_id) REFERENCES shops_table(id),
  CONSTRAINT shop_tags_table_ibfk_2 FOREIGN KEY (tag_id) REFERENCES tags_table(id)
);

-- Table structure for table volunteer_tags_table
CREATE TABLE volunteer_tags_table (
  volunteer_id BIGINT NOT NULL,
  tag_id INT NOT NULL,
  PRIMARY KEY (volunteer_id, tag_id),
  CONSTRAINT volunteer_tags_table_ibfk_1 FOREIGN KEY (volunteer_id) REFERENCES volunteers_table(id),
  CONSTRAINT volunteer_tags_table_ibfk_2 FOREIGN KEY (tag_id) REFERENCES tags_table(id)
);
