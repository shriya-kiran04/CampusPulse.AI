import { NextResponse } from 'next/server';
import { getNoticeWithHistory } from '../../../../lib/queries.js';

export async function GET(request, { params }) {
  const { id } = await params;
  const data = getNoticeWithHistory(id);
  if (!data.notice) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(data);
}