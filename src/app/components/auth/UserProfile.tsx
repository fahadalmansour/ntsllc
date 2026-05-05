import React from 'react';
import UserProfileComponent from '../UserProfile';

interface UserProfileProps {
  onNavigate: (section: string) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onNavigate }) => {
  return <UserProfileComponent onNavigate={onNavigate} />;
};

export default UserProfile;