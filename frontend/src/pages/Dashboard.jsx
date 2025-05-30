import React, { useEffect, useState } from 'react';
import { apiFetch } from '../api/api';

export default function Dashboard() {
  const [stats, setStats] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const students = await apiFetch('students');
        const teachers = await apiFetch('teachers');
        const groups = await apiFetch('studentgroups');
        setStats({
          students: students.length,
          teachers: teachers.length,
          groups: groups.length,
        });
      } catch (e) {
        setError('Failed to load stats');
      }
    })();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {error && <div style={{color:'red'}}>{error}</div>}
      <ul>
        <li>Total students: {stats.students}</li>
        <li>Total teachers: {stats.teachers}</li>
        <li>Total groups: {stats.groups}</li>
      </ul>
    </div>
  );
}