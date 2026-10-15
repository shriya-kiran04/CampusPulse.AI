import db from './db.js';

export function getStudent(regNo) {
  return db.prepare('SELECT * FROM students WHERE reg_no = ?').get(regNo);
}

export function getNoticesForStudent(student) {
  return db.prepare(`
    SELECT * FROM notices
    WHERE (program = ? OR program = 'ANY')
      AND (branch = ? OR branch = 'ANY')
      AND (year = ? OR year = 'ANY')
      AND (division = ? OR division = 'ANY')
    ORDER BY
      CASE priority
        WHEN 'CRITICAL' THEN 1
        WHEN 'IMPORTANT' THEN 2
        ELSE 3
      END,
      created_at DESC
  `).all(student.program, student.branch, String(student.year), student.division);
}
export function getAllNotices() {
  return db.prepare('SELECT * FROM notices ORDER BY created_at DESC').all();
}

export function createNotice(notice) {
  const stmt = db.prepare(`
    INSERT INTO notices (title, description, program, branch, year, division, priority, category, action_required, action_text)
    VALUES (@title, @description, @program, @branch, @year, @division, @priority, @category, @action_required, @action_text)
  `);
  return stmt.run(notice);
}
export function getNoticeWithHistory(id) {
  const notice = db.prepare('SELECT * FROM notices WHERE id = ?').get(id);
  const versions = db.prepare('SELECT * FROM notice_versions WHERE notice_id = ? ORDER BY created_at ASC').all(id);
  return {
    notice,
    history: versions.map(v => JSON.parse(v.snapshot_json)),
  };
}
export function updateNotice(id, fields) {
  const current = db.prepare('SELECT * FROM notices WHERE id = ?').get(id);
  if (!current) return null;

  // Save the old version first, so we can show what changed
  db.prepare('INSERT INTO notice_versions (notice_id, snapshot_json) VALUES (?, ?)')
    .run(id, JSON.stringify(current));

  db.prepare(`
    UPDATE notices
    SET title=@title, description=@description, program=@program, branch=@branch,
        year=@year, division=@division, priority=@priority, category=@category,
        action_required=@action_required, action_text=@action_text
    WHERE id=@id
  `).run({ ...fields, id });

  return true;
}