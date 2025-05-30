import React, { useEffect, useState } from 'react';
import { apiFetch } from '../api/api';

export default function Notifications({ userId }) {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');

  async function fetchNotes() {
    try {
      setNotes(await apiFetch(`notifications/inbox/${userId}`));
    } catch (e) {
      setError('Failed to load notifications');
    }
  }

  useEffect(() => { fetchNotes(); }, [userId]);

  async function markRead(id) {
    try {
      await apiFetch(`notifications/inbox/read/${id}`, { method: 'POST' });
      fetchNotes();
    } catch (e) {
      setError('Failed to mark as read');
    }
  }

  return (
    <div>
      <h2>Notifications</h2>
      {error && <div style={{color:'red'}}>{error}</div>}
      <ul>
        {notes.map(n => (
          <li key={n.id} style={{ fontWeight: n.read ? 'normal' : 'bold' }}>
            {n.message}
            {!n.read && <button onClick={() => markRead(n.id)}>Mark as read</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}