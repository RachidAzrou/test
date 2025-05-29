import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Students from './pages/Students';
// Add imports for Teachers, Courses, Fees as you expand

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/students">Students</Link>
        {/* Add links for Teachers, Courses, Fees as you expand */}
      </nav>
      <Routes>
        <Route path="/students" element={<Students />} />
        {/* Add routes for Teachers, Courses, Fees as you expand */}
      </Routes>
    </BrowserRouter>
  );
}