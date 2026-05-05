import React from 'react';
import CapacitySystemTest from './CapacitySystemTest';

interface CapacityTestProps {
  onNavigate: (section: string) => void;
}

const CapacityTest: React.FC<CapacityTestProps> = ({ onNavigate }) => {
  return <CapacitySystemTest onNavigate={onNavigate} />;
};

export default CapacityTest;