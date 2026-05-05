import React from 'react';
import Auth from '../Auth';

interface AuthPageProps {
  onNavigate: (section: string) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onNavigate }) => {
  return <Auth onNavigate={onNavigate} />;
};

export default AuthPage;