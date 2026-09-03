import { NextResponse } from 'next/server';
import { getStudent, getNoticesForStudent } from '../../../lib/queries.js';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const regNo = searchParams.get('reg_no');

  if (!regNo) {
    return NextResponse.json({ error: 'reg_no is required' }, { status: 400 });
  }

  const student = getStudent(regNo);
  if (!student) {
    return NextResponse.json({ error: 'Student not found' }, { status: 404 });
  }

  const notices = getNoticesForStudent(student);
  return NextResponse.json({ student, notices });
}