
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { Toaster } from './components/ui/toaster';
import { ModeToggle } from './components/ModeToggle';
import { ProtectedRoute } from './components/ProtectedRoute';

import Index from './pages/Index';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import ManageUsers from './pages/ManageUsers';
import Profile from './pages/Profile';
import LeaveBalance from './pages/LeaveBalance';
import CalendarView from './pages/CalendarView';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <Router>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            
            {/* Faculty Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute allowedRoles={["faculty"]}>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute allowedRoles={["faculty"]}>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/leave-balance" element={
              <ProtectedRoute allowedRoles={["faculty"]}>
                <LeaveBalance />
              </ProtectedRoute>
            } />
            <Route path="/calendar" element={
              <ProtectedRoute allowedRoles={["faculty"]}>
                <CalendarView />
              </ProtectedRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute requireAdmin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/manage-users" element={
              <ProtectedRoute requireAdmin={true}>
                <ManageUsers />
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
