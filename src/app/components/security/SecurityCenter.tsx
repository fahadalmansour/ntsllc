import React from 'react';
import SecurityComplianceDashboard from '../advanced/SecurityComplianceDashboard';

interface SecurityCenterProps {
  onNavigate: (section: string) => void;
}

const SecurityCenter: React.FC<SecurityCenterProps> = ({ onNavigate }) => {
  return <SecurityComplianceDashboard onNavigate={onNavigate} />;
};

export default SecurityCenter;