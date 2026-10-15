'use client';

import { useEffect, useState } from 'react';

const emptyForm = {
  title: '', description: '', program: 'ANY', branch: 'ANY',
  year: 'ANY', division: 'ANY', priority: 'GENERAL', category: '',
  action_required: 0, action_text: '',
};

export default function Admin() {
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [notices, setNotices] = useState([]);
  const [message, setMessage] = useState('');

  function refresh() {
    fetch('/api/admin-notices')
      .then((res) => res.json())
      .then((d) => setNotices(d.notices));
  }

  useEffect(() => {
    refresh();
  }, []);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function startEdit(n) {
    setEditingId(n.id);
    setForm({
      title: n.title,
      description: n.description,
      program: n.program,
      branch: n.branch,
      year: String(n.year),
      division: n.division,
      priority: n.priority,
      category: n.category || '',
      action_required: n.action_required,
      action_text: n.action_text || '',
    });
    setMessage('');
    window.scrollTo(0, 0);
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch('/api/admin-notices', {
      method: editingId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingId ? { ...form, id: editingId } : form),
    });
    if (res.ok) {
      setMessage(editingId ? 'Notice updated! Students will see what changed.' : 'Notice published!');
      setEditingId(null);
      setForm(emptyForm);
      refresh();
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-6">CampusPulse Admin</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md max-w-xl space-y-3">
        <h2 className="font-bold">{editingId ? `Editing notice #${editingId}` : 'Create a notice'}</h2>

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

        <div className="flex gap-2">
          <button type="submit" className="flex-1 bg-black text-white rounded-lg py-2 font-medium">
            {editingId ? 'Update Notice' : 'Publish Notice'}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} className="px-4 border rounded-lg">
              Cancel
            </button>
          )}
        </div>
        {message && <p className="text-green-600 text-sm">{message}</p>}
      </form>

      <h2 className="text-lg font-bold mt-10 mb-3">All notices</h2>
      <div className="max-w-xl space-y-2">
        {notices.map((n) => (
          <div key={n.id} className="bg-white p-3 rounded-lg shadow-sm flex justify-between items-center">
            <div>
              <p className="font-medium">{n.title}</p>
              <p className="text-xs text-gray-500">
                {n.program} / {n.branch} / Year {n.year} / Div {n.division} • {n.priority}
              </p>
            </div>
            <button onClick={() => startEdit(n)} className="text-sm text-blue-600 underline">
              Edit
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}