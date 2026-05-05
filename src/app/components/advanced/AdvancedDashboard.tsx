import React from 'react';
import { AdvancedDashboard as AdvancedDashboardComponent } from '../AdvancedDashboard';

interface AdvancedDashboardProps {
  onNavigate: (section: string) => void;
}

const AdvancedDashboard: React.FC<AdvancedDashboardProps> = ({ onNavigate }) => {
  return <AdvancedDashboardComponent />;
};

export default AdvancedDashboard;