import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SplashScreen } from './components/SplashScreen';
import { AuthPage } from './components/AuthPage';
import { Dashboard } from './components/Dashboard';
import { LiveCounsellorChat } from './components/LiveCounsellorChat';
import { CounsellorDashboard } from './components/CounsellorDashboard';
import { BookingSystem } from './components/BookingSystem';
import { ResourcesHub } from './components/ResourcesHub';
import { JournalingApp } from './components/JournalingApp';
import { MobileNav } from './components/MobileNav';
import { DesktopSidebar } from './components/DesktopSidebar';
import { HydrationReminder } from './components/HydrationReminder';
import { VirtualCompanion } from './components/VirtualCompanion';
import { CommunityForum } from './components/CommunityForum';
import { WellnessGames } from './components/WellnessGames';
import { AdminAnalytics } from './components/AdminAnalytics';
import { SettingsPage } from './components/SettingsPage';
import { GoalsTracker } from './components/GoalsTracker';
import { SoulVault } from './components/SoulVault';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  userType?: 'student' | 'counsellor';
  status?: 'active' | 'pending';
}

type AppState = 'splash' | 'auth' | 'main';
type ActiveTab = 'home' | 'chat' | 'booking' | 'resources' | 'community' | 'hydration' | 'journal' | 'games' | 'analytics' | 'settings' | 'goals' | 'vault' | 'companion' | 'counsellor-dashboard';

export default function App() {
  const [appState, setAppState] = useState<AppState>('splash');
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('soulace_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setAppState('main');
    }
  }, []);

  const handleSplashComplete = () => {
    setAppState('auth');
  };

  const handleAuth = (userData: User) => {
    setUser(userData);
    localStorage.setItem('soulace_user', JSON.stringify(userData));
    setAppState('main');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('soulace_user');
    setAppState('auth');
    setActiveTab('home');
  };

  const renderMainContent = () => {
    // Show counsellor dashboard for counsellor users
    if (user?.userType === 'counsellor') {
      switch (activeTab) {
        case 'home':
        case 'counsellor-dashboard':
          return <CounsellorDashboard />;
        case 'analytics':
          return <AdminAnalytics />;
        case 'settings':
          return <SettingsPage user={user} onLogout={handleLogout} />;
        default:
          return <CounsellorDashboard />;
      }
    }

    // Student interface
    switch (activeTab) {
      case 'home':
        return <Dashboard user={user} setActiveTab={setActiveTab} />;
      case 'chat':
        return <LiveCounsellorChat />;
      case 'booking':
        return <BookingSystem />;
      case 'resources':
        return <ResourcesHub />;
      case 'community':
        return <CommunityForum />;
      case 'hydration':
        return <HydrationReminder />;
      case 'journal':
        return <JournalingApp />;
      case 'games':
        return <WellnessGames />;
      case 'analytics':
        return <AdminAnalytics />;
      case 'settings':
        return <SettingsPage user={user} onLogout={handleLogout} />;
      case 'goals':
        return <GoalsTracker />;
      case 'vault':
        return <SoulVault />;
      case 'companion':
        return <VirtualCompanion />;
      default:
        return <Dashboard user={user} setActiveTab={setActiveTab} />;
    }
  };

  if (appState === 'splash') {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (appState === 'auth') {
    return <AuthPage onAuth={handleAuth} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Layout */}
      <div className="flex h-screen">
        <DesktopSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          user={user}
          onLogout={handleLogout}
        />
        
        {/* Main Content */}
        <div className="flex-1 md:ml-72 overflow-hidden">
          <main className="h-full overflow-y-auto p-4 md:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                {renderMainContent()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} user={user} />
    </div>
  );
}

