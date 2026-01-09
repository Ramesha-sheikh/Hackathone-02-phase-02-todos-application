/**
 * Signup page for the Todo application
 */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveToken } from '../../lib/auth';
import { authAPI } from '../../lib/api';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    try {
      // Call the auth backend to register the user
      const response = await authAPI.register({
        email,
        name: name || email.split('@')[0], // Use name if provided, otherwise derive from email
        password
      });

      // Save the token returned from the auth service
      if (response.access_token) {
        console.log('Signup successful, saving token...');
        saveToken(response.access_token);
        console.log('Token saved, redirecting to tasks...');

        // Redirect to tasks page after successful signup
        // Using window.location for more reliable redirect after auth
        window.location.href = '/tasks';
      } else {
        setError('Registration failed: No token received');
      }
    } catch (err: any) {
      if (err instanceof Error) {
        setError(err.message || 'An error occurred during signup');
      } else if (typeof err === 'string') {
        setError(err);
      } else {
        setError('An error occurred during signup');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-block p-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
            <div className="bg-white rounded-full px-6 py-3">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Premium Todo
              </h1>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Create Your Account</h2>
          <p className="mt-2 text-gray-600">Join our premium task management platform</p>
        </div>

        <div className="bg-white rounded-2xl shadow-premium p-8 border border-gray-100/50">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-lg bg-red-50 p-4 border border-red-100">
                <div className="text-sm text-red-700 flex items-center">
                  <span className="mr-2">⚠️</span> {error}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  placeholder="Create a strong password"
                />
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <div className="text-sm">
                <a href="/login" className="font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200">
                  Already have an account? Sign in
                </a>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full button-primary py-3.5 text-base"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="loading-spinner mr-3"></div> Creating account...
                  </div>
                ) : 'Create Account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}