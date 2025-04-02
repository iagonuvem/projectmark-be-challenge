-- DROP tables in correct order
DROP TABLE IF EXISTS resources;
DROP TABLE IF EXISTS topics;
DROP TABLE IF EXISTS users;

-- Create tables
CREATE TABLE IF NOT EXISTS topics (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  parentTopicId TEXT,
  createdAt TEXT NOT NULL,
  versions TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL,
  createdAt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS resources (
  id TEXT PRIMARY KEY,
  topicId TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL,
  FOREIGN KEY (topicId) REFERENCES topics(id) ON DELETE CASCADE
);

-- POPULATE USERS
INSERT INTO users (id, name, email, role, createdAt) VALUES
  ('1', 'Admin', 'admin@email.com', 'Admin', '2025-04-01T10:00:00.000Z'),
  ('2', 'Editor', 'editor@email.com', 'Editor', '2025-04-01T10:00:00.000Z'),
  ('3', 'Viewer', 'viewer@email.com', 'Viewer', '2025-04-01T10:00:00.000Z');

-- POPULATE TOPICS
INSERT INTO topics (id, name, parentTopicId, createdAt, versions) VALUES
  ('t1', 'Programming', NULL, '2025-04-01T10:00:00.000Z', '[{"version":1,"content":"Programming is nice!","updatedAt":"2025-04-01T10:00:00.000Z"}]'),
  ('t2', 'AI', 't1', '2025-04-01T10:00:00.000Z', '[{"version":1,"content":"AI will conquer the world","updatedAt":"2025-04-01T10:00:00.000Z"}]');

-- Inserção de recursos
INSERT INTO resources (id, topicId, url, description, type, createdAt, updatedAt) VALUES
  ('r1', 't1', 'https://example.com/intro', 'Intro to programming', 'article', '2025-04-01T10:00:00.000Z', '2025-04-01T10:00:00.000Z'),
  ('r2', 't2', 'https://example.com/ai', 'AI for begginers', 'video', '2025-04-01T10:00:00.000Z', '2025-04-01T10:00:00.000Z');
