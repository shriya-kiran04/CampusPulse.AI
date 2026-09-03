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