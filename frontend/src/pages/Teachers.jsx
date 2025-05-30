import React, { useEffect, useState } from 'react';
import { apiFetch } from '../api/api';

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  async function fetchTeachers() {
    try {
      setTeachers(await apiFetch('teachers'));
    } catch (e) {
      setError('Failed to load teachers');
    }
  }

  useEffect(() => {
    fetchTeachers();
  }, []);

  async function addTeacher(e) {
    e.preventDefault();
    try {
      await apiFetch('teachers', {
        method: 'POST',
        body: JSON.stringify({ name, email }),
      });
      setName('');
      setEmail('');
      fetchTeachers();
    } catch (e) {
      setError('Failed to add teacher');
    }
  }

  return (
    <div>
      <h2>Teachers</h2>
      {error && <div style={{color: 'red'}}>{error}</div>}
      <form onSubmit={addTeacher}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
        <button type="submit">Add Teacher</button>
      </form>
      <ul>
        {teachers.map(t => (
          <li key={t.id}>{t.name} ({t.email})</li>
        ))}
      </ul>
    </div>
  );
}