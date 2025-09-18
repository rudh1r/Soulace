import { motion } from 'framer-motion';
import { 
  Home, 
  MessageCircle, 
  Calendar, 
  BookOpen, 
  Users, 
  Heart,
  Droplets,
  PenTool,
  Gamepad2,
  Settings,
  LogOut,
  Bell,
  BarChart3,
  Target,
  Lock,
  Sparkles
} from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface DesktopSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: any;
  onLogout: () => void;
}

const getNavItems = (userType?: string) => {
  if (userType === 'counsellor') {
    return [
      { id: 'home', label: 'Dashboard', icon: Home },
      { id: 'counsellor-dashboard', label: 'Live Sessions', icon: MessageCircle, badge: 'Live' },
      { id: 'analytics', label: 'Analytics', icon: BarChart3 },
      { id: 'settings', label: 'Settings', icon: Settings },
    ];
  }

  return [
    { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'chat', label: 'Talk to Counsellor', icon: MessageCircle, badge: 'Live' },
    { id: 'booking', label: 'Book Appointment', icon: Calendar },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'community', label: 'Community', icon: Users, badge: '12' },
  ];
};

const getWellnessItems = (userType?: string) => {
  if (userType === 'counsellor') {
    return [];
  }

  return [
    { id: 'goals', label: 'Goals & Rewards', icon: Target, badge: 'Active' },
    { id: 'companion', label: 'Virtual Companion', icon: Sparkles, badge: 'Luna' },
    { id: 'vault', label: 'SoulVault', icon: Lock },
    { id: 'hydration', label: 'Hydration', icon: Droplets },
    { id: 'journal', label: 'Journal', icon: PenTool },
    { id: 'games', label: 'Mind Games', icon: Gamepad2 },
  ];
};

const getAdminItems = (userType?: string) => {
  if (userType === 'counsellor') {
    return [];
  }

  return [
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];
};

export function DesktopSidebar({ activeTab, setActiveTab, user, onLogout }: DesktopSidebarProps) {
  const navItems = getNavItems(user?.userType);
  const wellnessItems = getWellnessItems(user?.userType);
  const adminItems = getAdminItems(user?.userType);
  return (
    <div className="hidden md:flex md:w-72 md:flex-col fixed inset-y-0 z-50">
      <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-primary/10">
        {/* Header */}
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-6 mb-8">
            <div className="flex items-center space-x-3">
              <img
                src="/logo.jpg"
                alt="Soulace logo"
                className="w-10 h-10 rounded-xl object-contain bg-white shadow"
              />
              <div>
                <h1 className="text-xl font-bold soulace-text-gradient">SOULACE</h1>
                <p className="text-xs text-muted-foreground">Mental Wellness</p>
              </div>
            </div>
          </div>

          {/* User Profile */}
          <div className="px-6 mb-6">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-green-50">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="soulace-gradient text-white">
                  {user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {user?.name || 'Student'}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email || 'student@example.com'}
                </p>
              </div>
              <Bell className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6 space-y-1">
            {/* Main Navigation */}
            <div className="space-y-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg w-full text-left transition-colors ${
                    activeTab === item.id
                      ? 'soulace-gradient text-white soulace-shadow'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${
                    activeTab === item.id ? 'text-white' : 'text-muted-foreground group-hover:text-foreground'
                  }`} />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <Badge 
                      variant={activeTab === item.id ? "secondary" : "outline"}
                      className="text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </motion.button>
              ))}
            </div>

            {wellnessItems.length > 0 && (
              <>
                <Separator className="my-4" />

                {/* Wellness Section */}
                <div className="space-y-1">
                  <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Wellness Tools
                  </h3>
                  {wellnessItems.map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg w-full text-left transition-colors ${
                        activeTab === item.id
                          ? 'soulace-gradient text-white soulace-shadow'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <item.icon className={`mr-3 h-5 w-5 ${
                        activeTab === item.id ? 'text-white' : 'text-muted-foreground group-hover:text-foreground'
                      }`} />
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <Badge 
                          variant={activeTab === item.id ? "secondary" : "outline"}
                          className="text-xs"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </motion.button>
                  ))}
                </div>
              </>
            )}

            {adminItems.length > 0 && (
              <>
                <Separator className="my-4" />

                {/* Admin Section */}
                <div className="space-y-1">
                  <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Administration
                  </h3>
                  {adminItems.map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg w-full text-left transition-colors ${
                        activeTab === item.id
                          ? 'soulace-gradient text-white soulace-shadow'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <item.icon className={`mr-3 h-5 w-5 ${
                        activeTab === item.id ? 'text-white' : 'text-muted-foreground group-hover:text-foreground'
                      }`} />
                      <span className="flex-1">{item.label}</span>
                    </motion.button>
                  ))}
                </div>
              </>
            )}
          </nav>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 p-6 border-t border-primary/10">
          <Button
            variant="outline"
            onClick={onLogout}
            className="w-full justify-start hover:bg-destructive hover:text-destructive-foreground"
          >
            <LogOut className="mr-3 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}