import db from './lib/db.js';

// Clear existing data so this script can be re-run safely
db.exec('DELETE FROM notice_versions');
db.exec('DELETE FROM notices');
db.exec('DELETE FROM students');

// --- Students ---
const insertStudent = db.prepare(`
  INSERT INTO students (reg_no, name, program, branch, year, division)
  VALUES (?, ?, ?, ?, ?, ?)
`);

insertStudent.run('BT23CSE1042', 'Rahul Sharma', 'B.Tech', 'CSE', 3, 'B');
insertStudent.run('BT23CSE1015', 'Ananya Rao', 'B.Tech', 'CSE', 3, 'A');
insertStudent.run('BT22ECE2031', 'Kabir Mehta', 'B.Tech', 'ECE', 2, 'A');
insertStudent.run('MCA24A007', 'Sneha Patil', 'MCA', 'MCA', 1, 'A');

// --- Notices ---
const insertNotice = db.prepare(`
  INSERT INTO notices (title, description, program, branch, year, division, priority, category, action_required, action_text)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

// Critical: applies to Rahul's exact group (B.Tech, CSE, 3rd year, Division B)
const dbmsResult = insertNotice.run(
  'DBMS Practical Examination',
  'DBMS practical scheduled for 12 September at 10:00 AM in Room 301.',
  'B.Tech', 'CSE', '3', 'B',
  'CRITICAL', 'EXAM', 1,
  'Attend the practical on 12 September at 10:00 AM in Room 301.'
);

// Important: applies to all CSE 3rd years (any division)
insertNotice.run(
  'Internship Registration Deadline',
  'B.Tech CSE 3rd Year students must complete internship registration by 8 September via the placement portal.',
  'B.Tech', 'CSE', '3', 'ANY',
  'IMPORTANT', 'DEADLINE', 1,
  'Submit your resume and complete registration by 8 September.'
);

// General: applies to everyone
insertNotice.run(
  'College Sports Meet Registration',
  'Annual sports meet registrations are now open for all students.',
  'ANY', 'ANY', 'ANY', 'ANY',
  'GENERAL', 'EVENT', 0,
  null
);

// General: applies only to MCA
insertNotice.run(
  'MCA Semester 3 Exam Forms Available',
  'MCA students can now download semester 3 exam forms from the student portal.',
  'MCA', 'MCA', 'ANY', 'ANY',
  'IMPORTANT', 'EXAM', 1,
  'Download and submit your exam form before the deadline.'
);

// General: applies to a different division only (should NOT show for Rahul)
insertNotice.run(
  'ECE Workshop Postponed',
  'The ECE 2nd year workshop originally scheduled for this week has been postponed.',
  'B.Tech', 'ECE', '2', 'A',
  'GENERAL', 'EVENT', 0,
  null
);

// --- Save a "version" of the DBMS notice, then update it, to demo change detection ---
const dbmsId = dbmsResult.lastInsertRowid;
const dbmsRow = db.prepare('SELECT * FROM notices WHERE id = ?').get(dbmsId);

db.prepare(`
  INSERT INTO notice_versions (notice_id, snapshot_json)
  VALUES (?, ?)
`).run(dbmsId, JSON.stringify(dbmsRow));

db.prepare(`
  UPDATE notices
  SET description = ?, action_text = ?
  WHERE id = ?
`).run(
  'DBMS practical RESCHEDULED to 15 September at 2:00 PM in Room 204.',
  'Attend the practical on 15 September at 2:00 PM in Room 204 (moved from 12 Sept, 10 AM, Room 301).',
  dbmsId
);

console.log('Seed complete!');
console.log('Students:', db.prepare('SELECT * FROM students').all());
console.log('Notices:', db.prepare('SELECT id, title, program, branch, year, division, priority FROM notices').all());