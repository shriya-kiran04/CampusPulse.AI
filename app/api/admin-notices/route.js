import { NextResponse } from 'next/server';
import { getAllNotices, createNotice } from '../../../lib/queries.js';

export async function GET() {
  const notices = getAllNotices();
  return NextResponse.json({ notices });
}

export async function POST(request) {
  const body = await request.json();
  createNotice(body);
  return NextResponse.json({ success: true });
}