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
}