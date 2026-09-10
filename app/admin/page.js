'use client';

import { useState } from 'react';

export default function Admin() {
  const [form, setForm] = useState({
    title: '', description: '', program: 'ANY', branch: 'ANY',
    year: 'ANY', division: 'ANY', priority: 'GENERAL', category: '',
    action_required: 0, action_text: '',
  });
  const [message, setMessage] = useState('');

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch('/api/admin-notices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setMessage('Notice published!');
      setForm({ ...form, title: '', description: '', action_text: '' });
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-6">CampusPulse Admin</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md max-w-xl space-y-3">
        <input placeholder="Title" value={form.title} onChange={(e) => update('title', e.target.value)}
          className="w-full border rounded-lg px-3 py-2" required />
        <textarea placeholder="Description" value={form.description} onChange={(e) => update('description', e.target.value)}
          className="w-full border rounded-lg px-3 py-2" required />

        <div className="grid grid-cols-2 gap-3">
          <select value={form.program} onChange={(e) => update('program', e.target.value)} className="border rounded-lg px-3 py-2">
            <option value="ANY">Any Program</option>
            <option value="B.Tech">B.Tech</option>
            <option value="MCA">MCA</option>
            <option value="BCA">BCA</option>
          </select>
          <select value={form.branch} onChange={(e) => update('branch', e.target.value)} className="border rounded-lg px-3 py-2">
            <option value="ANY">Any Branch</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="MCA">MCA</option>
          </select>
          <select value={form.year} onChange={(e) => update('year', e.target.value)} className="border rounded-lg px-3 py-2">
            <option value="ANY">Any Year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
          <select value={form.division} onChange={(e) => update('division', e.target.value)} className="border rounded-lg px-3 py-2">
            <option value="ANY">Any Division</option>
            <option value="A">Division A</option>
            <option value="B">Division B</option>
            <option value="C">Division C</option>
          </select>
        </div>

        <select value={form.priority} onChange={(e) => update('priority', e.target.value)} className="w-full border rounded-lg px-3 py-2">
          <option value="CRITICAL">🔴 Critical</option>
          <option value="IMPORTANT">🟡 Important</option>
          <option value="GENERAL">🔵 General</option>
        </select>

        <input placeholder="Category (e.g. EXAM, EVENT, DEADLINE)" value={form.category}
          onChange={(e) => update('category', e.target.value)} className="w-full border rounded-lg px-3 py-2" />

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={form.action_required === 1}
            onChange={(e) => update('action_required', e.target.checked ? 1 : 0)} />
          Action required
        </label>

        {form.action_required === 1 && (
          <input placeholder="What should the student do?" value={form.action_text}
            onChange={(e) => update('action_text', e.target.value)} className="w-full border rounded-lg px-3 py-2" />
        )}

        <button type="submit" className="w-full bg-black text-white rounded-lg py-2 font-medium">
          Publish Notice
        </button>
        {message && <p className="text-green-600 text-sm">{message}</p>}
      </form>
    </main>
  );
}