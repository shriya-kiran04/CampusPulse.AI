import { NextResponse } from 'next/server';
import { getAllNotices, createNotice, updateNotice } from '../../../lib/queries.js';

export async function GET() {
  const notices = getAllNotices();
  return NextResponse.json({ notices });
}

export async function POST(request) {
  const body = await request.json();
  createNotice(body);
  return NextResponse.json({ success: true });
}

export async function PUT(request) {
  const { id, ...fields } = await request.json();
  const ok = updateNotice(id, fields);
  if (!ok) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}