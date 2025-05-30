import React, { useEffect, useState } from 'react';
import { apiFetch } from '../api/api';

export default function Fees() {
  const [fees, setFees] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('Unpaid');
  const [error, setError] = useState('');

  async function fetchFees() {
    try {
      setFees(await apiFetch('fees'));
    } catch (e) {
      setError('Failed to load fees');
    }
  }

  useEffect(() => {
    fetchFees();
  }, []);

  async function addFee(e) {
    e.preventDefault();
    try {
      await apiFetch('fees', {
        method: 'POST',
        body: JSON.stringify({ studentId, amount, status }),
      });
      setStudentId('');
      setAmount('');
      setStatus('Unpaid');
      fetchFees();
    } catch (e) {
      setError('Failed to add fee');
    }
  }

  return (
    <div>
      <h2>Fees</h2>
      {error && <div style={{color: 'red'}}>{error}</div>}
      <form onSubmit={addFee}>
        <input value={studentId} onChange={e => setStudentId(e.target.value)} placeholder="Student ID" required />
        <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" required type="number" />
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="Unpaid">Unpaid</option>
          <option value="Paid">Paid</option>
          <option value="Overdue">Overdue</option>
        </select>
        <button type="submit">Add Fee</button>
      </form>
      <ul>
        {fees.map(f => (
          <li key={f.id}>
            Student ID: {f.studentId}, Amount: {f.amount}, Status: {f.status}
          </li>
        ))}
      </ul>
    </div>
  );
}