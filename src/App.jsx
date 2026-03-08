import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Assessment from './pages/Assessment';
import LearningPath from './pages/LearningPath';
import Assistant from './pages/Assistant';
import Profile from './pages/Profile';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Layout />}>
            {/* The index route under Layout defaults to dashboard. If not logged in, Layout will redirect to login. */}
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="assessment" element={<Assessment />} />
            <Route path="path" element={<LearningPath />} />
            <Route path="assistant" element={<Assistant />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
