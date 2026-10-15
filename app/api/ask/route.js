import { NextResponse } from 'next/server';
import { askAboutNotices } from '../../../lib/ai.js';
import { getNoticesForStudent, getStudent } from '../../../lib/queries.js';

export async function POST(request) {
  const { reg_no, question } = await request.json();

  const student = getStudent(reg_no);
  if (!student) {
    return NextResponse.json({ error: 'Student not found' }, { status: 404 });
  }

  const notices = getNoticesForStudent(student);

  try {
    const answer = await askAboutNotices(question, notices);
    return NextResponse.json({ answer });
  } catch (err) {
    console.error('Gemini error:', err.status, err.message);
    return NextResponse.json({
      answer: 'The AI is busy right now. Please try again in a few seconds.',
    });
  }
}