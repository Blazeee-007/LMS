
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { Toaster } from './components/ui/toaster';
import { ModeToggle } from './components/ModeToggle';
import { ProtectedRoute } from './components/ProtectedRoute';

import Index from './pages/Index';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import LeaveBalance from './pages/LeaveBalance';
import CalendarView from './pages/CalendarView';
import NotFound from './pages/NotFound';
import AttendanceView from './pages/AttendanceView';
import FacultyDashboard from './pages/FacultyDashboard';

function App() {
  return (
    <>
      <Router>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            
            {/* Student Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute allowedRoles={["student"]}>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/leave-balance" element={
              <ProtectedRoute>
                <LeaveBalance />
              </ProtectedRoute>
            } />
            <Route path="/calendar" element={
              <ProtectedRoute>
                <CalendarView />
              </ProtectedRoute>
            } />
            <Route path="/attendance" element={
              <ProtectedRoute allowedRoles={["student"]}>
                <AttendanceView />
              </ProtectedRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute requireAdmin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
            {/* Faculty Routes */}
            <Route path="/faculty-dashboard" element={
              <ProtectedRoute allowedRoles={["faculty"]}>
                <FacultyDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </UserProvider>
      </Router>
      <Toaster />
      <ModeToggle />
    </>
  );
}

export default App;
