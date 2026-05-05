import React, { useState } from 'react';
import { User, Mail, Lock, Chrome, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAuth } from './contexts/AuthContext';

interface AuthProps {
  onBack: () => void;
}

export function Auth({ onBack }: AuthProps) {
  const { signIn, signUp, signInWithGoogle, loading } = useAuth();
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isSignIn) {
        await signIn(formData.email, formData.password);
      } else {
        await signUp(formData.email, formData.password, formData.name);
      }
      // Navigation to dashboard will be handled by App.tsx when user state changes
    } catch (error: any) {
      console.error('Authentication error:', error);
      setError(error.message || 'Authentication failed');
    }
  };

  const handleGoogleAuth = async () => {
    setError('');
    try {
      await signInWithGoogle();
    } catch (error: any) {
      console.error('Google auth error:', error);
      setError(error.message || 'Google authentication failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D12] terminal-theme flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <button 
            onClick={onBack}
            className="inline-flex items-center space-x-2 text-[#C0C5CE] hover:text-[#4AE54A] transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-mono">back to home</span>
          </button>
          
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="text-[#4AE54A] text-lg font-mono">{'>'}</div>
            <h1 className="text-[#C0C5CE] text-xl font-mono font-semibold tracking-wide">
              Neo Technology
            </h1>
          </div>
          <p className="text-[#C0C5CE]/70 font-mono text-sm">
            {isSignIn ? 'sign_in_to_dashboard' : 'create_new_account'}
          </p>
        </div>

        {/* Auth Form */}
        <div className="bg-[#12151C] border border-[#C0C5CE]/20 rounded-lg p-6">
          <div className="flex mb-6">
            <button
              onClick={() => setIsSignIn(true)}
              className={`flex-1 py-2 font-mono text-sm border-b-2 transition-colors ${
                isSignIn 
                  ? 'border-[#4AE54A] text-[#4AE54A]' 
                  : 'border-transparent text-[#C0C5CE]/70 hover:text-[#C0C5CE]'
              }`}
            >
              sign_in
            </button>
            <button
              onClick={() => setIsSignIn(false)}
              className={`flex-1 py-2 font-mono text-sm border-b-2 transition-colors ${
                !isSignIn 
                  ? 'border-[#4AE54A] text-[#4AE54A]' 
                  : 'border-transparent text-[#C0C5CE]/70 hover:text-[#C0C5CE]'
              }`}
            >
              sign_up
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded text-red-400 font-mono text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isSignIn && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#C0C5CE] font-mono text-sm">
                  full_name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#C0C5CE]/50" />
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-10 bg-[#0B0D12] border-[#C0C5CE]/20 text-[#C0C5CE] font-mono placeholder:text-[#C0C5CE]/50 focus:border-[#4AE54A] focus:ring-[#4AE54A]"
                    placeholder="Enter your name"
                    required={!isSignIn}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#C0C5CE] font-mono text-sm">
                email_address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#C0C5CE]/50" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10 bg-[#0B0D12] border-[#C0C5CE]/20 text-[#C0C5CE] font-mono placeholder:text-[#C0C5CE]/50 focus:border-[#4AE54A] focus:ring-[#4AE54A]"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#C0C5CE] font-mono text-sm">
                password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#C0C5CE]/50" />
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 bg-[#0B0D12] border-[#C0C5CE]/20 text-[#C0C5CE] font-mono placeholder:text-[#C0C5CE]/50 focus:border-[#4AE54A] focus:ring-[#4AE54A]"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#4AE54A] hover:bg-[#4AE54A]/90 text-[#0B0D12] font-mono font-semibold py-2 transition-colors"
            >
              {loading ? (isSignIn ? 'signing_in...' : 'creating_account...') : (isSignIn ? 'sign_in' : 'create_account')}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#C0C5CE]/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#12151C] text-[#C0C5CE]/70 font-mono">or</span>
              </div>
            </div>

            <Button
              onClick={handleGoogleAuth}
              disabled={loading}
              variant="outline"
              className="w-full mt-4 bg-transparent border-[#C0C5CE]/20 text-[#C0C5CE] hover:bg-[#C0C5CE]/10 hover:border-[#4AE54A] font-mono transition-colors"
            >
              <Chrome className="w-4 h-4 mr-2" />
              continue_with_google
            </Button>
          </div>

          <p className="mt-6 text-center text-sm text-[#C0C5CE]/70 font-mono">
            {isSignIn ? "don't have an account? " : "already have an account? "}
            <button
              onClick={() => setIsSignIn(!isSignIn)}
              className="text-[#4AE54A] hover:underline"
            >
              {isSignIn ? 'sign_up' : 'sign_in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;