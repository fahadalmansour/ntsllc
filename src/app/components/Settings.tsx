import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Monitor, 
  Palette, 
  Globe, 
  Keyboard, 
  Database, 
  Shield, 
  Bell,
  Accessibility,
  Download,
  Upload,
  RotateCcw,
  Save,
  Moon,
  Sun,
  Laptop,
  Zap,
  HardDrive,
  Wifi,
  Volume2
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { Slider } from './ui/slider';

export function Settings() {
  const [settings, setSettings] = useState({
    theme: 'dark',
    language: 'en',
    timezone: 'UTC-5',
    autoSave: true,
    notifications: true,
    soundEffects: true,
    animations: true,
    performance: 'balanced',
    backup: true,
    debugMode: false
  });

  const [keyboardShortcuts, setKeyboardShortcuts] = useState({
    commandPalette: 'Ctrl+K',
    quickSave: 'Ctrl+S',
    search: 'Ctrl+F',
    newProject: 'Ctrl+N',
    settings: 'Ctrl+,',
    dashboard: 'Alt+1',
    portfolio: 'Alt+3'
  });

  const [performance, setPerformance] = useState({
    cacheSize: 256,
    maxProjects: 50,
    autoCleanup: true,
    prefetchData: true,
    compressionLevel: 70
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleExportSettings = () => {
    const settingsData = {
      settings,
      keyboardShortcuts,
      performance,
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(settingsData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'neotech-settings.json';
    link.click();
    
    URL.revokeObjectURL(url);
  };

  const handleImportSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target?.result as string);
          if (importedData.settings) setSettings(importedData.settings);
          if (importedData.keyboardShortcuts) setKeyboardShortcuts(importedData.keyboardShortcuts);
          if (importedData.performance) setPerformance(importedData.performance);
          console.log('Settings imported successfully');
        } catch (error) {
          console.error('Failed to import settings:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleResetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default? This action cannot be undone.')) {
      // Reset to default values
      setSettings({
        theme: 'dark',
        language: 'en',
        timezone: 'UTC-5',
        autoSave: true,
        notifications: true,
        soundEffects: true,
        animations: true,
        performance: 'balanced',
        backup: true,
        debugMode: false
      });
      console.log('Settings reset to defaults');
    }
  };

  const handleSaveSettings = () => {
    // TODO: Implement settings save to backend
    console.log('Saving settings:', { settings, keyboardShortcuts, performance });
  };

  return (
    <div className="min-h-screen bg-[#0B0D12] terminal-theme pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-mono text-[#4AE54A] glow-text mb-2">Settings</h1>
          <p className="text-[#C0C5CE] font-mono">Configure your NeoTechnology experience</p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-[#12151C] border border-[#4AE54A]/20">
            <TabsTrigger value="general" className="font-mono data-[state=active]:text-[#4AE54A]">
              <SettingsIcon className="w-4 h-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger value="appearance" className="font-mono data-[state=active]:text-[#4AE54A]">
              <Palette className="w-4 h-4 mr-2" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="keyboard" className="font-mono data-[state=active]:text-[#4AE54A]">
              <Keyboard className="w-4 h-4 mr-2" />
              Keyboard
            </TabsTrigger>
            <TabsTrigger value="performance" className="font-mono data-[state=active]:text-[#4AE54A]">
              <Zap className="w-4 h-4 mr-2" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="advanced" className="font-mono data-[state=active]:text-[#4AE54A]">
              <Database className="w-4 h-4 mr-2" />
              Advanced
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <Card className="bg-[#12151C] border-[#4AE54A]/20 p-6">
              <div className="space-y-6">
                <h3 className="text-xl font-mono text-[#4AE54A]">General Settings</h3>
                
                {/* Language & Region */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[#C0C5CE] font-mono">Language</Label>
                    <Select value={settings.language} onValueChange={(value) => handleSettingChange('language', value)}>
                      <SelectTrigger className="bg-[#0B0D12] border-[#4AE54A]/20 text-[#C0C5CE] font-mono">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#12151C] border-[#4AE54A]/20">
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ar">العربية</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-[#C0C5CE] font-mono">Timezone</Label>
                    <Select value={settings.timezone} onValueChange={(value) => handleSettingChange('timezone', value)}>
                      <SelectTrigger className="bg-[#0B0D12] border-[#4AE54A]/20 text-[#C0C5CE] font-mono">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#12151C] border-[#4AE54A]/20">
                        <SelectItem value="UTC-5">UTC-5 (EST)</SelectItem>
                        <SelectItem value="UTC+0">UTC+0 (GMT)</SelectItem>
                        <SelectItem value="UTC+3">UTC+3 (Gulf)</SelectItem>
                        <SelectItem value="UTC+8">UTC+8 (Asia)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator className="bg-[#4AE54A]/20" />

                {/* System Preferences */}
                <div className="space-y-4">
                  <h4 className="text-lg font-mono text-[#C0C5CE]">System Preferences</h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[#C0C5CE] font-mono">Auto-save Projects</p>
                        <p className="text-[#C0C5CE]/60 font-mono text-sm">Automatically save your work every 30 seconds</p>
                      </div>
                      <Switch
                        checked={settings.autoSave}
                        onCheckedChange={(checked) => handleSettingChange('autoSave', checked)}
                        className="data-[state=checked]:bg-[#4AE54A]"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[#C0C5CE] font-mono">Notifications</p>
                        <p className="text-[#C0C5CE]/60 font-mono text-sm">Receive system and project notifications</p>
                      </div>
                      <Switch
                        checked={settings.notifications}
                        onCheckedChange={(checked) => handleSettingChange('notifications', checked)}
                        className="data-[state=checked]:bg-[#4AE54A]"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[#C0C5CE] font-mono">Sound Effects</p>
                        <p className="text-[#C0C5CE]/60 font-mono text-sm">Play sounds for interactions and notifications</p>
                      </div>
                      <Switch
                        checked={settings.soundEffects}
                        onCheckedChange={(checked) => handleSettingChange('soundEffects', checked)}
                        className="data-[state=checked]:bg-[#4AE54A]"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[#C0C5CE] font-mono">Automatic Backup</p>
                        <p className="text-[#C0C5CE]/60 font-mono text-sm">Backup your data to the cloud automatically</p>
                      </div>
                      <Switch
                        checked={settings.backup}
                        onCheckedChange={(checked) => handleSettingChange('backup', checked)}
                        className="data-[state=checked]:bg-[#4AE54A]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance">
            <Card className="bg-[#12151C] border-[#4AE54A]/20 p-6">
              <div className="space-y-6">
                <h3 className="text-xl font-mono text-[#4AE54A]">Appearance</h3>
                
                {/* Theme Selection */}
                <div className="space-y-4">
                  <h4 className="text-lg font-mono text-[#C0C5CE]">Theme</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: 'dark', label: 'Dark', icon: Moon },
                      { value: 'light', label: 'Light', icon: Sun },
                      { value: 'auto', label: 'Auto', icon: Laptop }
                    ].map(({ value, label, icon: Icon }) => (
                      <button
                        key={value}
                        onClick={() => handleSettingChange('theme', value)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          settings.theme === value
                            ? 'border-[#4AE54A] bg-[#4AE54A]/10'
                            : 'border-[#4AE54A]/20 hover:border-[#4AE54A]/40'
                        }`}
                      >
                        <Icon className="w-8 h-8 text-[#4AE54A] mx-auto mb-2" />
                        <p className="text-[#C0C5CE] font-mono text-sm">{label}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <Separator className="bg-[#4AE54A]/20" />

                {/* Visual Effects */}
                <div className="space-y-4">
                  <h4 className="text-lg font-mono text-[#C0C5CE]">Visual Effects</h4>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#C0C5CE] font-mono">Animations</p>
                      <p className="text-[#C0C5CE]/60 font-mono text-sm">Enable smooth transitions and animations</p>
                    </div>
                    <Switch
                      checked={settings.animations}
                      onCheckedChange={(checked) => handleSettingChange('animations', checked)}
                      className="data-[state=checked]:bg-[#4AE54A]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[#C0C5CE] font-mono">Interface Scale</Label>
                    <div className="px-3">
                      <Slider
                        defaultValue={[100]}
                        max={150}
                        min={75}
                        step={25}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-[#C0C5CE]/60 font-mono mt-1">
                        <span>75%</span>
                        <span>100%</span>
                        <span>125%</span>
                        <span>150%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Keyboard Shortcuts */}
          <TabsContent value="keyboard">
            <Card className="bg-[#12151C] border-[#4AE54A]/20 p-6">
              <div className="space-y-6">
                <h3 className="text-xl font-mono text-[#4AE54A]">Keyboard Shortcuts</h3>
                
                <div className="space-y-4">
                  {Object.entries(keyboardShortcuts).map(([action, shortcut]) => (
                    <div key={action} className="flex items-center justify-between">
                      <div>
                        <p className="text-[#C0C5CE] font-mono capitalize">
                          {action.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="text-[#C0C5CE]/60 font-mono text-sm">
                          {action === 'commandPalette' && 'Open command palette'}
                          {action === 'quickSave' && 'Save current project'}
                          {action === 'search' && 'Search projects and files'}
                          {action === 'newProject' && 'Create new project'}
                          {action === 'settings' && 'Open settings'}
                          {action === 'dashboard' && 'Go to dashboard'}
                          {action === 'portfolio' && 'Go to portfolio'}
                        </p>
                      </div>
                      <Input
                        value={shortcut}
                        onChange={(e) => setKeyboardShortcuts({...keyboardShortcuts, [action]: e.target.value})}
                        className="w-32 bg-[#0B0D12] border-[#4AE54A]/20 text-[#C0C5CE] font-mono text-center"
                        placeholder="Ctrl+K"
                      />
                    </div>
                  ))}
                </div>

                <Separator className="bg-[#4AE54A]/20" />

                <Button
                  onClick={() => setKeyboardShortcuts({
                    commandPalette: 'Ctrl+K',
                    quickSave: 'Ctrl+S',
                    search: 'Ctrl+F',
                    newProject: 'Ctrl+N',
                    settings: 'Ctrl+,',
                    dashboard: 'Alt+1',
                    portfolio: 'Alt+3'
                  })}
                  variant="outline"
                  className="border-[#4AE54A]/30 text-[#C0C5CE] hover:bg-[#4AE54A]/10 font-mono"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset to Defaults
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Performance Settings */}
          <TabsContent value="performance">
            <Card className="bg-[#12151C] border-[#4AE54A]/20 p-6">
              <div className="space-y-6">
                <h3 className="text-xl font-mono text-[#4AE54A]">Performance</h3>
                
                {/* Performance Profile */}
                <div className="space-y-4">
                  <h4 className="text-lg font-mono text-[#C0C5CE]">Performance Profile</h4>
                  <Select value={settings.performance} onValueChange={(value) => handleSettingChange('performance', value)}>
                    <SelectTrigger className="bg-[#0B0D12] border-[#4AE54A]/20 text-[#C0C5CE] font-mono">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#12151C] border-[#4AE54A]/20">
                      <SelectItem value="performance">High Performance</SelectItem>
                      <SelectItem value="balanced">Balanced</SelectItem>
                      <SelectItem value="battery">Battery Saver</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator className="bg-[#4AE54A]/20" />

                {/* Advanced Performance */}
                <div className="space-y-4">
                  <h4 className="text-lg font-mono text-[#C0C5CE]">Advanced Settings</h4>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-[#C0C5CE] font-mono">Cache Size (MB)</Label>
                      <div className="px-3">
                        <Slider
                          value={[performance.cacheSize]}
                          onValueChange={(value) => setPerformance({...performance, cacheSize: value[0]})}
                          max={1024}
                          min={64}
                          step={64}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-[#C0C5CE]/60 font-mono mt-1">
                          <span>64MB</span>
                          <span className="text-[#4AE54A]">{performance.cacheSize}MB</span>
                          <span>1GB</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[#C0C5CE] font-mono">Max Projects in Memory</Label>
                      <Input
                        type="number"
                        value={performance.maxProjects}
                        onChange={(e) => setPerformance({...performance, maxProjects: parseInt(e.target.value)})}
                        className="bg-[#0B0D12] border-[#4AE54A]/20 text-[#C0C5CE] font-mono"
                        min="10"
                        max="100"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[#C0C5CE] font-mono">Auto Cleanup</p>
                        <p className="text-[#C0C5CE]/60 font-mono text-sm">Automatically clean up temporary files</p>
                      </div>
                      <Switch
                        checked={performance.autoCleanup}
                        onCheckedChange={(checked) => setPerformance({...performance, autoCleanup: checked})}
                        className="data-[state=checked]:bg-[#4AE54A]"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[#C0C5CE] font-mono">Prefetch Data</p>
                        <p className="text-[#C0C5CE]/60 font-mono text-sm">Load data before needed for faster performance</p>
                      </div>
                      <Switch
                        checked={performance.prefetchData}
                        onCheckedChange={(checked) => setPerformance({...performance, prefetchData: checked})}
                        className="data-[state=checked]:bg-[#4AE54A]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Advanced Settings */}
          <TabsContent value="advanced">
            <Card className="bg-[#12151C] border-[#4AE54A]/20 p-6">
              <div className="space-y-6">
                <h3 className="text-xl font-mono text-[#4AE54A]">Advanced Settings</h3>
                
                {/* Developer Options */}
                <div className="space-y-4">
                  <h4 className="text-lg font-mono text-[#C0C5CE]">Developer Options</h4>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#C0C5CE] font-mono">Debug Mode</p>
                      <p className="text-[#C0C5CE]/60 font-mono text-sm">Enable detailed logging and debug information</p>
                    </div>
                    <Switch
                      checked={settings.debugMode}
                      onCheckedChange={(checked) => handleSettingChange('debugMode', checked)}
                      className="data-[state=checked]:bg-[#4AE54A]"
                    />
                  </div>
                </div>

                <Separator className="bg-[#4AE54A]/20" />

                {/* Import/Export */}
                <div className="space-y-4">
                  <h4 className="text-lg font-mono text-[#C0C5CE]">Settings Management</h4>
                  
                  <div className="flex flex-wrap gap-4">
                    <Button
                      onClick={handleExportSettings}
                      className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export Settings
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="border-[#4AE54A]/30 text-[#C0C5CE] hover:bg-[#4AE54A]/10 font-mono"
                      onClick={() => document.getElementById('import-input')?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Import Settings
                    </Button>
                    <input
                      id="import-input"
                      type="file"
                      accept=".json"
                      onChange={handleImportSettings}
                      className="hidden"
                    />
                    
                    <Button
                      onClick={handleResetSettings}
                      variant="outline"
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10 font-mono"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset All
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="flex justify-end mt-8">
          <Button
            onClick={handleSaveSettings}
            className="bg-[#4AE54A] text-[#0B0D12] hover:bg-[#4AE54A]/90 font-mono"
          >
            <Save className="w-4 h-4 mr-2" />
            Save All Settings
          </Button>
        </div>
      </div>
    </div>
  );
}

// Export both named and default exports for maximum compatibility
export default Settings;