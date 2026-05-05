import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Shield, 
  Settings, 
  Camera, 
  Save, 
  Key,
  Bell,
  Globe,
  Smartphone,
  Clock,
  Download,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from './contexts/AuthContext';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';

export function UserProfile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user?.user_metadata?.firstName || '',
    lastName: user?.user_metadata?.lastName || '',
    email: user?.email || '',
    phone: user?.user_metadata?.phone || '',
    company: user?.user_metadata?.company || '',
    timezone: 'UTC-5 (EST)',
    language: 'English'
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    security: true,
    marketing: false,
    updates: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    activityVisible: false,
    emailVisible: false
  });

  const handleProfileSave = () => {
    // TODO: Implement profile update
    console.log('Saving profile:', profileData);
    setIsEditing(false);
  };

  const handleExportData = () => {
    // TODO: Implement data export
    console.log('Exporting user data...');
  };

  const handleDeleteAccount = () => {
    // TODO: Implement account deletion with confirmation
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Deleting account...');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D12] terminal-theme pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-mono text-[#4AE54A] glow-text mb-2">User Profile</h1>
          <p className="text-[#C0C5CE] font-mono">Manage your account settings and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-[#12151C] border border-[#4AE54A]/20">
            <TabsTrigger value="profile" className="font-mono data-[state=active]:text-[#4AE54A]">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="font-mono data-[state=active]:text-[#4AE54A]">
              <Shield className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="font-mono data-[state=active]:text-[#4AE54A]">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="font-mono data-[state=active]:text-[#4AE54A]">
              <Eye className="w-4 h-4 mr-2" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="data" className="font-mono data-[state=active]:text-[#4AE54A]">
              <Download className="w-4 h-4 mr-2" />
              Data
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="bg-[#12151C] border-[#4AE54A]/20 p-6">
              <div className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#4AE54A]/20 to-[#4AE54A]/40 rounded-full flex items-center justify-center">
                      <User className="w-12 h-12 text-[#4AE54A]" />
                    </div>
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#4AE54A] rounded-full flex items-center justify-center text-[#0B0D12] hover:bg-[#4AE54A]/90 transition-colors">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-xl font-mono text-[#C0C5CE]">
                      {profileData.firstName} {profileData.lastName}
                    </h3>
                    <p className="text-[#C0C5CE]/60 font-mono">{profileData.email}</p>
                    <p className="text-[#4AE54A] font-mono text-sm">Professional Account</p>
                  </div>
                </div>

                <Separator className="bg-[#4AE54A]/20" />

                {/* Profile Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[#C0C5CE] font-mono">First Name</Label>
                    <Input
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                      disabled={!isEditing}
                      className="bg-[#0B0D12] border-[#4AE54A]/20 text-[#C0C5CE] font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#C0C5CE] font-mono">Last Name</Label>
                    <Input
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                      disabled={!isEditing}
                      className="bg-[#0B0D12] border-[#4AE54A]/20 text-[#C0C5CE] font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#C0C5CE] font-mono">Email</Label>
                    <Input
                      type="email"
                      value={profileData.email}
                      disabled
                      className="bg-[#0B0D12] border-[#4AE54A]/20 text-[#C0C5CE]/60 font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#C0C5CE] font-mono">Phone</Label>
                    <Input
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      disabled={!isEditing}
                      className="bg-[#0B0D12] border-[#4AE54A]/20 text-[#C0C5CE] font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#C0C5CE] font-mono">Company</Label>
                    <Input
                      value={profileData.company}
                      onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                      disabled={!isEditing}
                      className="bg-[#0B0D12] border-[#4AE54A]/20 text-[#C0C5CE] font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#C0C5CE] font-mono">Timezone</Label>
                    <Input
                      value={profileData.timezone}
                      disabled={!isEditing}
                      className="bg-[#0B0D12] border-[#4AE54A]/20 text-[#C0C5CE] font-mono"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4">
                  {isEditing ? (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                        className="border-[#4AE54A]/30 text-[#C0C5CE] hover:bg-[#4AE54A]/10 font-mono"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleProfileSave}
                        className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => setIsEditing(true)}
                      className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card className="bg-[#12151C] border-[#4AE54A]/20 p-6">
              <div className="space-y-6">
                <h3 className="text-xl font-mono text-[#4AE54A]">Security Settings</h3>
                
                {/* Password Change */}
                <div className="space-y-4">
                  <h4 className="text-lg font-mono text-[#C0C5CE]">Change Password</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[#C0C5CE] font-mono">Current Password</Label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          className="bg-[#0B0D12] border-[#4AE54A]/20 text-[#C0C5CE] font-mono pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 top-2 text-[#C0C5CE] hover:text-[#4AE54A]"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#C0C5CE] font-mono">New Password</Label>
                      <Input
                        type="password"
                        className="bg-[#0B0D12] border-[#4AE54A]/20 text-[#C0C5CE] font-mono"
                      />
                    </div>
                  </div>
                  <Button className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono">
                    <Key className="w-4 h-4 mr-2" />
                    Update Password
                  </Button>
                </div>

                <Separator className="bg-[#4AE54A]/20" />

                {/* Two-Factor Authentication */}
                <div className="space-y-4">
                  <h4 className="text-lg font-mono text-[#C0C5CE]">Two-Factor Authentication</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#C0C5CE] font-mono">Enable 2FA for enhanced security</p>
                      <p className="text-[#C0C5CE]/60 font-mono text-sm">Protect your account with an additional security layer</p>
                    </div>
                    <Switch className="data-[state=checked]:bg-[#4AE54A]" />
                  </div>
                </div>

                <Separator className="bg-[#4AE54A]/20" />

                {/* Session Management */}
                <div className="space-y-4">
                  <h4 className="text-lg font-mono text-[#C0C5CE]">Active Sessions</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-[#0B0D12] rounded border border-[#4AE54A]/20">
                      <div className="flex items-center space-x-3">
                        <Smartphone className="w-5 h-5 text-[#4AE54A]" />
                        <div>
                          <p className="text-[#C0C5CE] font-mono text-sm">Current Session</p>
                          <p className="text-[#C0C5CE]/60 font-mono text-xs">Chrome on Windows</p>
                        </div>
                      </div>
                      <div className="text-[#4AE54A] font-mono text-xs">Active</div>
                    </div>
                  </div>
                  <Button variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10 font-mono">
                    Terminate All Other Sessions
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="bg-[#12151C] border-[#4AE54A]/20 p-6">
              <div className="space-y-6">
                <h3 className="text-xl font-mono text-[#4AE54A]">Notification Preferences</h3>
                
                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <p className="text-[#C0C5CE] font-mono capitalize">
                          {key === 'push' ? 'Push Notifications' : `${key} Notifications`}
                        </p>
                        <p className="text-[#C0C5CE]/60 font-mono text-sm">
                          {key === 'email' && 'Receive updates via email'}
                          {key === 'push' && 'Browser and mobile notifications'}
                          {key === 'security' && 'Security alerts and warnings'}
                          {key === 'marketing' && 'Marketing and promotional content'}
                          {key === 'updates' && 'Product updates and new features'}
                        </p>
                      </div>
                      <Switch
                        checked={value}
                        onCheckedChange={(checked) => setNotifications({...notifications, [key]: checked})}
                        className="data-[state=checked]:bg-[#4AE54A]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy">
            <Card className="bg-[#12151C] border-[#4AE54A]/20 p-6">
              <div className="space-y-6">
                <h3 className="text-xl font-mono text-[#4AE54A]">Privacy Settings</h3>
                
                <div className="space-y-4">
                  {Object.entries(privacy).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <p className="text-[#C0C5CE] font-mono">
                          {key === 'profileVisible' && 'Profile Visibility'}
                          {key === 'activityVisible' && 'Activity Status'}
                          {key === 'emailVisible' && 'Email Visibility'}
                        </p>
                        <p className="text-[#C0C5CE]/60 font-mono text-sm">
                          {key === 'profileVisible' && 'Make your profile visible to other users'}
                          {key === 'activityVisible' && 'Show when you\'re online or active'}
                          {key === 'emailVisible' && 'Display email in public profile'}
                        </p>
                      </div>
                      <Switch
                        checked={value}
                        onCheckedChange={(checked) => setPrivacy({...privacy, [key]: checked})}
                        className="data-[state=checked]:bg-[#4AE54A]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Data Tab */}
          <TabsContent value="data">
            <Card className="bg-[#12151C] border-[#4AE54A]/20 p-6">
              <div className="space-y-6">
                <h3 className="text-xl font-mono text-[#4AE54A]">Data Management</h3>
                
                {/* Export Data */}
                <div className="space-y-4">
                  <h4 className="text-lg font-mono text-[#C0C5CE]">Export Your Data</h4>
                  <p className="text-[#C0C5CE]/60 font-mono text-sm">
                    Download a copy of all your data including profile information, projects, and activity logs.
                  </p>
                  <Button
                    onClick={handleExportData}
                    className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                </div>

                <Separator className="bg-[#4AE54A]/20" />

                {/* Delete Account */}
                <div className="space-y-4">
                  <h4 className="text-lg font-mono text-red-400">Danger Zone</h4>
                  <p className="text-[#C0C5CE]/60 font-mono text-sm">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <Button
                    onClick={handleDeleteAccount}
                    variant="outline"
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10 font-mono"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default UserProfile;