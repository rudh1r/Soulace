import { motion } from 'framer-motion';
import { 
  Home, 
  MessageCircle, 
  Calendar, 
  BookOpen, 
  Users, 
  Droplets,
  PenTool,
  Gamepad2,
  Target,
  Lock,
  Sparkles
} from 'lucide-react';

interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user?: any;
}

const getNavItems = (userType?: string) => {
  if (userType === 'counsellor') {
    return [
      { id: 'home', label: 'Home', icon: Home },
      { id: 'counsellor-dashboard', label: 'Sessions', icon: MessageCircle },
    ];
  }

  return [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'chat', label: 'Talk', icon: MessageCircle },
    { id: 'booking', label: 'Book', icon: Calendar },
    { id: 'resources', label: 'Learn', icon: BookOpen },
    { id: 'community', label: 'Community', icon: Users },
  ];
};

const getSecondaryItems = (userType?: string) => {
  if (userType === 'counsellor') {
    return [];
  }

  return [
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'companion', label: 'Luna', icon: Sparkles },
    { id: 'vault', label: 'Vault', icon: Lock },
    { id: 'hydration', label: 'Water', icon: Droplets },
    { id: 'journal', label: 'Journal', icon: PenTool },
    { id: 'games', label: 'Games', icon: Gamepad2 },
  ];
};

export function MobileNav({ activeTab, setActiveTab, user }: MobileNavProps) {
  const navItems = getNavItems(user?.userType);
  const secondaryItems = getSecondaryItems(user?.userType);
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden safe-area-pb">
      {/* Main Navigation */}
      <div className="bg-white/95 backdrop-blur-md border-t border-primary/10 px-2 py-2">
        <div className="flex justify-around items-center">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center p-2 rounded-lg transition-colors min-h-[44px] justify-center ${
                activeTab === item.id 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {activeTab === item.id && (
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 soulace-gradient rounded-full"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                />
              )}
              <item.icon className={`w-5 h-5 mb-1 ${
                activeTab === item.id ? 'text-primary' : ''
              }`} />
              <span className="text-xs font-medium">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Secondary Quick Access Bar - Only show for students */}
      {secondaryItems.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-green-50 px-2 py-2 border-t border-primary/5">
          <div className="flex justify-around items-center">
            {secondaryItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center p-1 rounded-md transition-colors min-h-[40px] justify-center ${
                  activeTab === item.id 
                    ? 'text-primary' 
                    : 'text-muted-foreground/70 hover:text-foreground'
                }`}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <item.icon className={`w-4 h-4 mb-0.5 ${
                  activeTab === item.id ? 'text-primary' : ''
                }`} />
                <span className="text-xs">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}