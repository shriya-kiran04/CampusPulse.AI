import { NextResponse } from 'next/server';
import { getNoticeWithHistory } from '../../../../lib/queries.js';
import { explainChange } from '../../../../lib/ai.js';

// Remember answers so repeated page views don't call Gemini again
const cache = new Map();

export async function GET(request, { params }) {
  const { id } = await params;
  const { notice, history } = getNoticeWithHistory(id);

  if (!notice) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  if (history.length === 0) {
    return NextResponse.json({ explanation: null });
  }

  const key = `${id}:${notice.description}`;
  if (cache.has(key)) {
    return NextResponse.json({ explanation: cache.get(key) });
  }

  try {
    const explanation = await explainChange(history[0], notice);
    cache.set(key, explanation);
    return NextResponse.json({ explanation });
  } catch (err) {
    console.error('Gemini error:', err.status, err.message);
    return NextResponse.json({ explanation: null });
  }
}