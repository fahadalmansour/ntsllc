import React from 'react';
import PerformanceAnalyticsDashboard from './PerformanceAnalyticsDashboard';

interface AnalyticsProps {
  onNavigate: (section: string) => void;
}

const Analytics: React.FC<AnalyticsProps> = ({ onNavigate }) => {
  return <PerformanceAnalyticsDashboard onNavigate={onNavigate} />;
};

export default Analytics;