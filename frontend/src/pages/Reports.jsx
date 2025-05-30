import React, { useState } from 'react';
import { apiFetch } from '../api/api';

export default function Reports() {
  const [attendance, setAttendance] = useState([]);
  const [grades, setGrades] = useState([]);
  const [unpaidFees, setUnpaidFees] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [error, setError] = useState('');

  async function fetchAttendance() {
    try {
      setAttendance(await apiFetch(`reports/attendance/${studentId}`));
    } catch (e) {
      setError('Failed to load attendance');
    }
  }

  async function fetchGrades() {
    try {
      setGrades(await apiFetch(`reports/grades/${studentId}`));
    } catch (e) {
      setError('Failed to load grades');
    }
  }

  async function fetchUnpaidFees() {
    try {
      setUnpaidFees(await apiFetch('reports/fees/unpaid'));
    } catch (e) {
      setError('Failed to load unpaid fees');
    }
  }

  return (
    <div>
      <h2>Reports</h2>
      {error && <div style={{color:'red'}}>{error}</div>}

      <div>
        <h3>Student Attendance & Grades</h3>
        <input value={studentId} onChange={e => setStudentId(e.target.value)} placeholder="Student ID" />
        <button onClick={fetchAttendance}>Show Attendance</button>
        <button onClick={fetchGrades}>Show Grades</button>
        <ul>
          {attendance.length > 0 && <li><b>Attendance:</b></li>}
          {attendance.map(a => (
            <li key={a.id}>Date: {a.date} | Course: {a.courseId} | Status: {a.status}</li>
          ))}
          {grades.length > 0 && <li><b>Grades:</b></li>}
          {grades.map(g => (
            <li key={g.id}>Course: {g.courseId} | Grade: {g.grade} | {g.remarks}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Unpaid Fees</h3>
        <button onClick={fetchUnpaidFees}>Show Unpaid Fees</button>
        <ul>
          {unpaidFees.map(f => (
            <li key={f.id}>
              Student ID: {f.studentId} | Amount: {f.amount} | Status: {f.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}