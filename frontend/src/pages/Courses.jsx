import React, { useEffect, useState } from 'react';
import { apiFetch } from '../api/api';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  async function fetchCourses() {
    try {
      setCourses(await apiFetch('courses'));
    } catch (e) {
      setError('Failed to load courses');
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  async function addCourse(e) {
    e.preventDefault();
    try {
      await apiFetch('courses', {
        method: 'POST',
        body: JSON.stringify({ title, description }),
      });
      setTitle('');
      setDescription('');
      fetchCourses();
    } catch (e) {
      setError('Failed to add course');
    }
  }

  return (
    <div>
      <h2>Courses</h2>
      {error && <div style={{color: 'red'}}>{error}</div>}
      <form onSubmit={addCourse}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
        <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
        <button type="submit">Add Course</button>
      </form>
      <ul>
        {courses.map(c => (
          <li key={c.id}>{c.title} {c.description && `- ${c.description}`}</li>
        ))}
      </ul>
    </div>
  );
}