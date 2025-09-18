import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, User, Bell, Shield, Palette, Globe, 
  Moon, Sun, Volume2, VolumeX, LogOut, Trash2,
  ChevronRight, Info, Lock, Heart
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface SettingsPageProps {
  user: User | null;
  onLogout: () => void;
}

export function SettingsPage({ user, onLogout }: SettingsPageProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    reminders: true,
    community: true,
    wellness: true,
    crisis: true
  });
  const [privacy, setPrivacy] = useState({
    analytics: true,
    profileVisibility: 'anonymous',
    dataSharing: false
  });
  const [language, setLanguage] = useState('english');
  const [soundEnabled, setSoundEnabled] = useState(true);

  const languages = [
    { value: 'english', label: 'English' },
    { value: 'hindi', label: 'हिंदी (Hindi)' },
    { value: 'tamil', label: 'தமிழ் (Tamil)' },
    { value: 'telugu', label: 'తెలుగు (Telugu)' },
    { value: 'bengali', label: 'বাংলা (Bengali)' }
  ];

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      onLogout();
    }
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Handle account deletion
      onLogout();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="p-3 soulace-gradient rounded-xl">
            <Settings className="h-6 w-6 text-white" />
          </div>
          <h1 className="soulace-text-gradient">Settings</h1>
        </div>
        <p className="text-muted-foreground">
          Customize your SOULACE experience and manage your preferences
        </p>
      </div>

      {/* Profile Section */}
      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="h-16 w-16 soulace-gradient text-white text-xl">
            {user?.avatar || user?.name?.charAt(0) || 'U'}
          </Avatar>
          <div>
            <h3 className="text-xl font-medium">{user?.name}</h3>
            <p className="text-muted-foreground">{user?.email}</p>
            <Badge variant="secondary" className="mt-2">Student</Badge>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" size="sm">
            <User className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
          <Button variant="outline" size="sm">
            <Shield className="h-4 w-4 mr-2" />
            Privacy Settings
          </Button>
        </div>
      </Card>

      {/* Preferences */}
      <Card className="p-6">
        <h3 className="font-medium mb-6 flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Preferences
        </h3>
        
        <div className="space-y-6">
          {/* Theme */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isDarkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              <div>
                <div className="font-medium">Dark Mode</div>
                <div className="text-sm text-muted-foreground">
                  Switch between light and dark themes
                </div>
              </div>
            </div>
            <Switch 
              checked={isDarkMode} 
              onCheckedChange={setIsDarkMode}
            />
          </div>

          <Separator />

          {/* Language */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5" />
              <div>
                <div className="font-medium">Language</div>
                <div className="text-sm text-muted-foreground">
                  Choose your preferred language
                </div>
              </div>
            </div>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Sound */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
              <div>
                <div className="font-medium">Sound Effects</div>
                <div className="text-sm text-muted-foreground">
                  Enable sound notifications and feedback
                </div>
              </div>
            </div>
            <Switch 
              checked={soundEnabled} 
              onCheckedChange={setSoundEnabled}
            />
          </div>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6">
        <h3 className="font-medium mb-6 flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifications
        </h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Wellness Reminders</div>
              <div className="text-sm text-muted-foreground">
                Daily hydration, journaling, and mindfulness reminders
              </div>
            </div>
            <Switch 
              checked={notifications.reminders} 
              onCheckedChange={(checked) => 
                setNotifications(prev => ({ ...prev, reminders: checked }))
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Community Updates</div>
              <div className="text-sm text-muted-foreground">
                New forum posts and community activity
              </div>
            </div>
            <Switch 
              checked={notifications.community} 
              onCheckedChange={(checked) => 
                setNotifications(prev => ({ ...prev, community: checked }))
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Wellness Insights</div>
              <div className="text-sm text-muted-foreground">
                Weekly wellness reports and achievements
              </div>
            </div>
            <Switch 
              checked={notifications.wellness} 
              onCheckedChange={(checked) => 
                setNotifications(prev => ({ ...prev, wellness: checked }))
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Crisis Support</div>
              <div className="text-sm text-muted-foreground">
                Emergency alerts and support notifications (always on)
              </div>
            </div>
            <Switch checked={true} disabled />
          </div>
        </div>
      </Card>

      {/* Privacy & Security */}
      <Card className="p-6">
        <h3 className="font-medium mb-6 flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Privacy & Security
        </h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Anonymous Analytics</div>
              <div className="text-sm text-muted-foreground">
                Help improve the platform with anonymous usage data
              </div>
            </div>
            <Switch 
              checked={privacy.analytics} 
              onCheckedChange={(checked) => 
                setPrivacy(prev => ({ ...prev, analytics: checked }))
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Profile Visibility</div>
              <div className="text-sm text-muted-foreground">
                How you appear in the community forum
              </div>
            </div>
            <Select 
              value={privacy.profileVisibility} 
              onValueChange={(value) => 
                setPrivacy(prev => ({ ...prev, profileVisibility: value }))
              }
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="anonymous">Anonymous</SelectItem>
                <SelectItem value="initials">Initials Only</SelectItem>
                <SelectItem value="full">Full Name</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Data Sharing</div>
              <div className="text-sm text-muted-foreground">
                Share anonymized data with research partners
              </div>
            </div>
            <Switch 
              checked={privacy.dataSharing} 
              onCheckedChange={(checked) => 
                setPrivacy(prev => ({ ...prev, dataSharing: checked }))
              }
            />
          </div>
        </div>
      </Card>

      {/* Support & Information */}
      <Card className="p-6">
        <h3 className="font-medium mb-6 flex items-center gap-2">
          <Info className="h-5 w-5" />
          Support & Information
        </h3>
        
        <div className="space-y-4">
          {[
            { title: 'Help Center', description: 'Get answers to common questions' },
            { title: 'Contact Support', description: 'Reach out to our support team' },
            { title: 'Privacy Policy', description: 'Learn how we protect your data' },
            { title: 'Terms of Service', description: 'Read our terms and conditions' },
            { title: 'About SOULACE', description: 'Learn more about our mission' }
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg hover:bg-muted transition-colors cursor-pointer"
            >
              <div>
                <div className="font-medium">{item.title}</div>
                <div className="text-sm text-muted-foreground">{item.description}</div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          ))}
        </div>
      </Card>

      {/* Account Actions */}
      <Card className="p-6">
        <h3 className="font-medium mb-6 flex items-center gap-2">
          <User className="h-5 w-5" />
          Account
        </h3>
        
        <div className="space-y-4">
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-3" />
            Log Out
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
            onClick={handleDeleteAccount}
          >
            <Trash2 className="h-4 w-4 mr-3" />
            Delete Account
          </Button>
        </div>
      </Card>

      {/* App Info */}
      <Card className="p-4 bg-blue-50/50 border-blue-200">
        <div className="flex items-start gap-3">
          <Heart className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">SOULACE v1.0</h4>
            <p className="text-sm text-blue-800">
              Built with care for student mental wellness. Your privacy and wellbeing 
              are our top priorities. If you're experiencing a crisis, please reach out 
              to our 24/7 support through the AI chat or contact emergency services.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}