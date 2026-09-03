'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const priorityStyles = {
  CRITICAL: { emoji: '🔴', border: 'border-red-400', bg: 'bg-red-50' },
  IMPORTANT: { emoji: '🟡', border: 'border-yellow-400', bg: 'bg-yellow-50' },
  GENERAL: { emoji: '🔵', border: 'border-blue-400', bg: 'bg-blue-50' },
};

export default function Dashboard() {
  const [data, setData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const regNo = localStorage.getItem('reg_no');
    if (!regNo) {
      router.push('/');
      return;
    }
    fetch(`/api/notices?reg_no=${regNo}`)
      .then((res) => res.json())
      .then(setData);
  }, [router]);

  if (!data) return <main className="p-8">Loading...</main>;

  const { student, notices } = data;

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold">Good day, {student.name} 👋</h1>
      <p className="text-gray-500 mb-6">
        {student.program} {student.branch} • Year {student.year} • Division {student.division}
      </p>

      <div className="space-y-4 max-w-2xl">
        {notices.map((n) => {
          const style = priorityStyles[n.priority] || priorityStyles.GENERAL;
          return (
            <div key={n.id} className={`border-l-4 ${style.border} ${style.bg} p-4 rounded-lg shadow-sm`}>
              <div className="text-sm font-semibold mb-1">
                {style.emoji} {n.priority}
              </div>
              <h2 className="font-bold text-lg">{n.title}</h2>
              <p className="text-gray-700 mt-1">{n.description}</p>
              {n.action_required === 1 && (
                <p className="mt-2 text-sm font-medium text-gray-900">
                  ✅ Action: {n.action_text}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}