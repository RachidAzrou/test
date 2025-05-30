import React, { useEffect, useState } from 'react';
import { apiFetch } from '../api/api';

export default function StudentGroups() {
  const [groups, setGroups] = useState([]);
  const [name, setName] = useState('');
  const [batchId, setBatchId] = useState('');
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');

  async function fetchGroups() {
    try {
      setGroups(await apiFetch('studentgroups'));
    } catch (e) {
      setError('Failed to load groups');
    }
  }

  useEffect(() => { fetchGroups(); }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (editId) {
        await apiFetch(`studentgroups/${editId}`, {
          method: 'PUT',
          body: JSON.stringify({ name, batchId }),
        });
        setEditId(null);
      } else {
        await apiFetch('studentgroups', {
          method: 'POST',
          body: JSON.stringify({ name, batchId }),
        });
      }
      setName('');
      setBatchId('');
      fetchGroups();
    } catch (e) {
      setError('Failed to save group');
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this group?')) return;
    try {
      await apiFetch(`studentgroups/${id}`, { method: 'DELETE' });
      fetchGroups();
    } catch (e) {
      setError('Failed to delete group');
    }
  }

  function handleEdit(group) {
    setEditId(group.id);
    setName(group.name);
    setBatchId(group.batchId);
  }

  return (
    <div>
      <h2>Student Groups</h2>
      {error && <div style={{color: 'red'}}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Group name" required />
        <input value={batchId} onChange={e => setBatchId(e.target.value)} placeholder="Batch ID" required />
        <button type="submit">{editId ? "Update" : "Add"} Group</button>
        {editId && <button type="button" onClick={() => { setEditId(null); setName(''); setBatchId(''); }}>Cancel</button>}
      </form>
      <ul>
        {groups.map(g => (
          <li key={g.id}>
            {g.name} (Batch ID: {g.batchId})
            <button onClick={() => handleEdit(g)}>Edit</button>
            <button onClick={() => handleDelete(g.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}