import React, { useEffect, useState } from 'react';
import { apiFetch } from '../api/api';

export default function Timetable() {
  const [entries, setEntries] = useState([]);
  const [courseId, setCourseId] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [batchId, setBatchId] = useState('');
  const [day, setDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');

  async function fetchTimetable() {
    try {
      setEntries(await apiFetch('timetable'));
    } catch (e) {
      setError('Failed to load timetable');
    }
  }

  useEffect(() => { fetchTimetable(); }, []);

  async function addEntry(e) {
    e.preventDefault();
    try {
      await apiFetch('timetable', {
        method: 'POST',
        body: JSON.stringify({ courseId, teacherId, batchId, day, startTime, endTime }),
      });
      setCourseId('');
      setTeacherId('');
      setBatchId('');
      setDay('');
      setStartTime('');
      setEndTime('');
      fetchTimetable();
    } catch (e) {
      setError('Failed to add timetable entry');
    }
  }

  return (
    <div>
      <h2>Timetable</h2>
      {error && <div style={{color:'red'}}>{error}</div>}
      <form onSubmit={addEntry}>
        <input value={courseId} onChange={e => setCourseId(e.target.value)} placeholder="Course ID" required />
        <input value={teacherId} onChange={e => setTeacherId(e.target.value)} placeholder="Teacher ID" required />
        <input value={batchId} onChange={e => setBatchId(e.target.value)} placeholder="Batch ID" required />
        <input value={day} onChange={e => setDay(e.target.value)} placeholder="Day" required />
        <input value={startTime} onChange={e => setStartTime(e.target.value)} placeholder="Start Time (e.g. 09:00)" required />
        <input value={endTime} onChange={e => setEndTime(e.target.value)} placeholder="End Time (e.g. 10:30)" required />
        <button type="submit">Add Entry</button>
      </form>
      <ul>
        {entries.map(t => (
          <li key={t.id}>
            Course: {t.courseId}, Teacher: {t.teacherId}, Batch: {t.batchId}, {t.day} {t.startTime}-{t.endTime}
          </li>
        ))}
      </ul>
    </div>
  );
}