import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import EmailNotVerified from './pages/EmailNotVerified';

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          user ? (
            user.needsVerification ? (
              <Navigate to="/email-not-verified" replace />
            ) : (
              <Navigate to={user.role === 'admin' ? '/admin' : '/student'} replace />
            )
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />
      
      <Route 
        path="/login" 
        element={
          user ? (
            user.needsVerification ? (
              <Navigate to="/email-not-verified" replace />
            ) : (
              <Navigate to={user.role === 'admin' ? '/admin' : '/student'} replace />
            )
          ) : (
            <Login />
          )
        } 
      />
      
      <Route 
        path="/signup" 
        element={
          user ? (
            user.needsVerification ? (
              <Navigate to="/email-not-verified" replace />
            ) : (
              <Navigate to={user.role === 'admin' ? '/admin' : '/student'} replace />
            )
          ) : (
            <Signup />
          )
        } 
      />
      
      <Route path="/verify-email/:token" element={<VerifyEmail />} />
      <Route path="/email-not-verified" element={<EmailNotVerified />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/student"
        element={
          <ProtectedRoute requiredRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
        <Toaster position="top-right" />
      </AuthProvider>
    </Router>
  );
}

export default App;