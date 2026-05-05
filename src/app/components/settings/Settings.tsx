import React from 'react';
import { Settings as SettingsComponent } from '../Settings';

interface SettingsProps {
  onNavigate: (section: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ onNavigate }) => {
  return <SettingsComponent />;
};

export default Settings;