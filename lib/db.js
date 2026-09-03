import Database from 'better-sqlite3';

const db = new Database('campuspulse.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS students (
    reg_no TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    program TEXT NOT NULL,
    branch TEXT NOT NULL,
    year INTEGER NOT NULL,
    division TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS notices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    program TEXT NOT NULL,
    branch TEXT NOT NULL,
    year TEXT NOT NULL,
    division TEXT NOT NULL,
    priority TEXT NOT NULL,
    category TEXT,
    action_required INTEGER DEFAULT 0,
    action_text TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS notice_versions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    notice_id INTEGER NOT NULL,
    snapshot_json TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (notice_id) REFERENCES notices(id)
  );
`);

export default db;