import { Link, redirect } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const EmailNotVerified = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    toast.error("Loggout Successfully");
    window.location.href = "/login"
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Email Verification Required
          </h2>
          <div className="mt-4">
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
              <p className="mb-2">Please verify your email address before accessing your dashboard.</p>
              <p>Check your email for a verification link.</p>
            </div>
            <div className="mt-4 space-y-2">
              <button
                onClick={handleLogout}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailNotVerified;