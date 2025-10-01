import { useState } from 'react'; // No need for useEffect anymore
import { Lock } from 'lucide-react';
import CampaignManager from './CampaignManager';

const CORRECT_PASSWORD = 'flashfire@2025';
const PASSWORD_KEY = 'campaign_access_token';

export default function ProtectedCampaignManager() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem(PASSWORD_KEY) === 'true';
  });

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === CORRECT_PASSWORD) {
      sessionStorage.setItem(PASSWORD_KEY, 'true');
      
      setIsAuthenticated(true);
      setError('');
      console.log('Password correct - Access granted');
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
      console.log('Wrong password attempt');
    }
  };

  if (isAuthenticated) {
    return <CampaignManager />;
  }

  // The password form JSX remains the same.
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-orange-100">
          <div className="flex justify-center mb-6">
            <div className="bg-orange-500 p-4 rounded-full">
              <Lock className="text-white" size={32} />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
            Campaign Manager
          </h2>
          <p className="text-gray-600 text-center mb-8">
            This area is protected. Please enter the password to continue.
          </p>
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm font-medium text-center">{error}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                required
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              Access Campaign Manager
            </button>
          </form>
          <p className="text-center text-xs text-gray-500 mt-6">
            {/* ✨ CHANGED: Updated footer text for clarity */}
            Access is remembered for this session.
          </p>
        </div>
      </div>
    </div>
  );
}