'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function NoticeDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [explanation, setExplanation] = useState(null);
  const [explaining, setExplaining] = useState(false);

  useEffect(() => {
    fetch(`/api/notice/${id}`)
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        if (d.history && d.history.length > 0) {
          setExplaining(true);
          fetch(`/api/explain/${id}`)
            .then((res) => res.json())
            .then((e) => setExplanation(e.explanation))
            .finally(() => setExplaining(false));
        }
      });
  }, [id]);

  if (!data) return <main className="p-8">Loading...</main>;

  const { notice, history } = data;
  const original = history[0];
  const hasChanged = original && original.description !== notice.description;

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <a href="/dashboard" className="text-sm text-blue-600 underline">← Back to Dashboard</a>
      <h1 className="text-2xl font-bold mt-4">{notice.title}</h1>
      <p className="text-gray-700 mt-2 max-w-xl">{notice.description}</p>

      {notice.action_required === 1 && (
        <p className="mt-3 font-medium">✅ Action: {notice.action_text}</p>
      )}

      {hasChanged && (
        <>
          <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg shadow-sm max-w-xl">
            <h2 className="font-bold mb-2">✨ AI Summary</h2>
            {explaining && <p className="text-sm text-gray-500">Explaining what changed...</p>}
            {!explaining && explanation && (
              <p className="text-sm text-gray-900">{explanation}</p>
            )}
            {!explaining && !explanation && (
              <p className="text-sm text-gray-500">AI summary unavailable right now.</p>
            )}
          </div>

          <div className="mt-4 bg-white border-l-4 border-red-400 p-4 rounded-lg shadow-sm max-w-xl">
            <h2 className="font-bold mb-2">🔴 What Changed</h2>
            <p className="text-sm text-gray-500 mb-2">Original description:</p>
            <p className="text-sm text-gray-700 italic mb-3">{original.description}</p>
            <p className="text-sm text-gray-500 mb-2">Updated description:</p>
            <p className="text-sm text-gray-900 font-medium">{notice.description}</p>
          </div>
        </>
      )}

      {!hasChanged && (
        <p className="mt-6 text-sm text-gray-400">No changes have been made to this notice.</p>
      )}
    </main>
  );
}