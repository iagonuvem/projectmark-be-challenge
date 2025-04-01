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

INSERT INTO users (id, name, email, role, createdAt) VALUES (1, 'Admin', 'admin@email.com', 'Admin', '2025-04-01T10:00:00.000Z');
INSERT INTO users (id, name, email, role, createdAt) VALUES (2, 'Editor', 'editor@email.com', 'Editor', '2025-04-01T10:00:00.000Z');
INSERT INTO users (id, name, email, role, createdAt) VALUES (3, 'Viewer', 'viewer@email.com', 'Viewer', '2025-04-01T10:00:00.000Z')