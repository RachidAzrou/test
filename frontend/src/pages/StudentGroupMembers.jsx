import React, { useEffect, useState } from 'react';
import { apiFetch } from '../api/api';

export default function StudentGroupMembers({ groupId }) {
  const [members, setMembers] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  // Haal alle studenten op voor dropdown/selectie
  async function fetchStudents() {
    try {
      setStudents(await apiFetch('students'));
    } catch (e) {
      setError('Failed to load students');
    }
  }

  // Haal groepsleden op
  async function fetchMembers() {
    try {
      setMembers(await apiFetch(`studentgroupmembers/${groupId}`));
    } catch (e) {
      setError('Failed to load members');
    }
  }

  useEffect(() => {
    fetchStudents();
    fetchMembers();
    // eslint-disable-next-line
  }, [groupId]);

  async function addMember(e) {
    e.preventDefault();
    try {
      await apiFetch('studentgroupmembers', {
        method: 'POST',
        body: JSON.stringify({ studentGroupId: groupId, studentId }),
      });
      setStudentId('');
      fetchMembers();
    } catch (e) {
      setError('Failed to add member');
    }
  }

  async function deleteMember(id) {
    if (!window.confirm('Remove this student from group?')) return;
    try {
      await apiFetch(`studentgroupmembers/${id}`, { method: 'DELETE' });
      fetchMembers();
    } catch (e) {
      setError('Failed to remove member');
    }
  }

  // Helper om studentnaam te tonen
  function studentName(id) {
    const s = students.find(st => st.id === id);
    return s ? s.name : id;
  }

  return (
    <div>
      <h3>Group Members</h3>
      {error && <div style={{color:'red'}}>{error}</div>}
      <form onSubmit={addMember}>
        <select value={studentId} onChange={e => setStudentId(e.target.value)} required>
          <option value="">Select student</option>
          {students.map(s => (
            <option key={s.id} value={s.id}>{s.name} (ID: {s.id})</option>
          ))}
        </select>
        <button type="submit">Add Member</button>
      </form>
      <ul>
        {members.map(m => (
          <li key={m.id}>
            {studentName(m.studentId)}
            <button onClick={() => deleteMember(m.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}