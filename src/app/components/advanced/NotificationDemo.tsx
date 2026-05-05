import React from 'react';

interface NotificationDemoProps {
  onNavigate: (section: string) => void;
}

const NotificationDemo: React.FC<NotificationDemoProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-[#00d4ff]">
          Notification System Demo
        </h1>
        <div className="grid gap-6">
          <div className="neo-card p-6">
            <h2 className="text-2xl font-semibold mb-4 text-[#00ff88]">
              Real-time Notifications
            </h2>
            <p className="text-[#C0C5CE] mb-4">
              Experience our advanced notification system with real-time updates,
              customizable alerts, and intelligent prioritization.
            </p>
            <button 
              onClick={() => onNavigate('dashboard')}
              className="neo-button-primary"
            >
              View Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDemo;