import React, { useEffect, useState } from 'react';
import { apiFetch } from '../api/api';

export default function Gradebook() {
  const [grades, setGrades] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [grade, setGrade] = useState('');
  const [remarks, setRemarks] = useState('');
  const [error, setError] = useState('');

  async function fetchGrades() {
    try {
      setGrades(await apiFetch('gradebook'));
    } catch (e) {
      setError('Failed to load gradebook');
    }
  }

  useEffect(() => { fetchGrades(); }, []);

  async function addGrade(e) {
    e.preventDefault();
    try {
      await apiFetch('gradebook', {
        method: 'POST',
        body: JSON.stringify({ studentId, courseId, grade, remarks }),
      });
      setStudentId('');
      setCourseId('');
      setGrade('');
      setRemarks('');
      fetchGrades();
    } catch (e) {
      setError('Failed to add grade');
    }
  }

  return (
    <div>
      <h2>Gradebook</h2>
      {error && <div style={{color: 'red'}}>{error}</div>}
      <form onSubmit={addGrade}>
        <input value={studentId} onChange={e => setStudentId(e.target.value)} placeholder="Student ID" required />
        <input value={courseId} onChange={e => setCourseId(e.target.value)} placeholder="Course ID" required />
        <input value={grade} onChange={e => setGrade(e.target.value)} placeholder="Grade" required />
        <input value={remarks} onChange={e => setRemarks(e.target.value)} placeholder="Remarks" />
        <button type="submit">Add Grade</button>
      </form>
      <ul>
        {grades.map(g => (
          <li key={g.id}>
            Student: {g.studentId}, Course: {g.courseId}, Grade: {g.grade}, {g.remarks}
          </li>
        ))}
      </ul>
    </div>
  );
}