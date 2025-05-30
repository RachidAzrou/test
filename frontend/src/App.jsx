import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StudentGroups from './pages/StudentGroups';
import StudentGroupMembers from './pages/StudentGroupMembers';
import Notifications from './pages/Notifications';
import Dashboard from './pages/Dashboard';
// ...andere imports

function App() {
  const userId = /* haal userId uit auth context/token */;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/groups" element={<StudentGroups />} />
        <Route path="/groups/:groupId/members" element={<StudentGroupMembers />} />
        <Route path="/notifications" element={<Notifications userId={userId} />} />
        {/* ...andere routes */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;