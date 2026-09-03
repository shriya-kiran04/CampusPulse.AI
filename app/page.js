'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [regNo, setRegNo] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const res = await fetch(`/api/notices?reg_no=${regNo}`);
    if (!res.ok) {
      setError('Registration number not found. Try BT23CSE1042.');
      return;
    }
    localStorage.setItem('reg_no', regNo);
    router.push('/dashboard');
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-96">
        <h1 className="text-2xl font-bold mb-1">CampusPulse.AI</h1>
        <p className="text-gray-500 mb-6">Your campus. Your course. Your updates.</p>
        <input
          type="text"
          placeholder="Enter Registration Number"
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 mb-3"
        />
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <button
          type="submit"
          className="w-full bg-black text-white rounded-lg py-2 font-medium"
        >
          Continue
        </button>
      </form>
    </main>
  );
}