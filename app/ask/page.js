'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Ask() {
  const [regNo, setRegNo] = useState('');
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('reg_no');
    if (!stored) {
      router.push('/');
      return;
    }
    setRegNo(stored);
  }, [router]);

  async function handleAsk(e) {
    e.preventDefault();
    if (!question.trim()) return;

    const userMessage = { role: 'user', text: question };
    setMessages((m) => [...m, userMessage]);
    setQuestion('');
    setLoading(true);

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reg_no: regNo, question: userMessage.text }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: 'ai', text: data.answer || 'Sorry, something went wrong.' }]);
    } catch {
      setMessages((m) => [...m, { role: 'ai', text: 'Sorry, something went wrong.' }]);
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8 flex flex-col max-w-2xl mx-auto">
      <a href="/dashboard" className="text-sm text-blue-600 underline mb-4">← Back to Dashboard</a>
      <h1 className="text-2xl font-bold mb-4">Ask CampusPulse</h1>

      <div className="flex-1 space-y-3 mb-4 min-h-[300px]">
        {messages.length === 0 && (
          <p className="text-gray-400 text-sm">
            Try: "What changed today?" or "What do I need to do this week?"
          </p>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg max-w-[80%] ${
              m.role === 'user' ? 'bg-black text-white ml-auto' : 'bg-white shadow-sm'
            }`}
          >
            {m.text}
          </div>
        ))}
        {loading && (
          <div className="bg-white shadow-sm p-3 rounded-lg max-w-[80%] text-gray-400">Thinking...</div>
        )}
      </div>

      <form onSubmit={handleAsk} className="flex gap-2">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask anything about your campus updates..."
          className="flex-1 border rounded-lg px-4 py-2"
        />
        <button type="submit" className="bg-black text-white px-5 py-2 rounded-lg font-medium">
          Ask
        </button>
      </form>
    </main>
  );
}