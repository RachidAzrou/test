import React, { useEffect, useState } from 'react';
export default function Students() {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/api/students')
      .then(res => res.json())
      .then(setStudents);
  }, []);
  return (
    <div>
      <h2>Students</h2>
      <ul>{students.map(s => <li key={s.id}>{s.name} ({s.email})</li>)}</ul>
    </div>
  );
}import React, { useEffect, useState } from 'react';
import { apiFetch } from '../api/api';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  async function fetchStudents() {
    try {
      setStudents(await apiFetch('students'));
    } catch (e) {
      setError('Failed to load students');
    }
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  async function addStudent(e) {
    e.preventDefault();
    try {
      await apiFetch('students', {
        method: 'POST',
        body: JSON.stringify({ name, email }),
      });
      setName('');
      setEmail('');
      fetchStudents();
    } catch (e) {
      setError('Failed to add student');
    }
  }

  return (
    <div>
      <h2>Students</h2>
      {error && <div style={{color: 'red'}}>{error}</div>}
      <form onSubmit={addStudent}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
        <button type="submit">Add Student</button>
      </form>
      <ul>
        {students.map(s => (
          <li key={s.id}>{s.name} ({s.email})</li>
        ))}
      </ul>
    </div>
  );
}