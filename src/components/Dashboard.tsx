import { motion } from 'framer-motion';
import { 
  Heart, 
  Droplets, 
  Calendar, 
  MessageCircle, 
  Trophy, 
  TrendingUp,
  Sun,
  Moon,
  Star,
  Target,
  Zap,
  Book,
  Lock,
  Footprints,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

interface DashboardProps {
  user: any;
  setActiveTab: (tab: string) => void;
}

const quickStats = [
  {
    title: 'Daily Mood',
    value: '😊',
    subtitle: 'Good',
    icon: Heart,
    color: 'text-green-500',
    bg: 'bg-green-50'
  },
  {
    title: 'Active Goals',
    value: '3/5',
    subtitle: 'Completed',
    icon: Target,
    color: 'text-blue-500',
    bg: 'bg-blue-50'
  },
  {
    title: 'Steps Today',
    value: '6,542',
    subtitle: '8K Goal',
    icon: Footprints,
    color: 'text-green-500',
    bg: 'bg-green-50'
  },
  {
    title: 'Screen Time',
    value: '4.2h',
    subtitle: '6h Limit',
    icon: Star,
    color: 'text-purple-500',
    bg: 'bg-purple-50'
  }
];

const todayTasks = [
  { task: 'Morning mindfulness', completed: true, points: 50 },
  { task: 'Journal entry', completed: true, points: 30 },
  { task: 'Hydration goal', completed: false, points: 40 },
  { task: 'Evening reflection', completed: false, points: 35 },
];

const upcomingEvents = [
  {
    title: 'Counseling Session',
    time: '2:00 PM Today',
    type: 'appointment',
    urgent: true
  },
  {
    title: 'Peer Support Group',
    time: 'Tomorrow 4:00 PM',
    type: 'community',
    urgent: false
  },
  {
    title: 'Mindfulness Workshop',
    time: 'Friday 10:00 AM',
    type: 'workshop',
    urgent: false
  }
];

export function Dashboard({ user, setActiveTab }: DashboardProps) {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good Morning' : currentHour < 18 ? 'Good Afternoon' : 'Good Evening';
  const greetingIcon = currentHour < 18 ? Sun : Moon;

  return (
    <div className="space-y-4 md:space-y-6 pb-24 md:pb-4">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="soulace-gradient rounded-2xl p-4 md:p-6 text-white relative overflow-hidden mx-2 md:mx-0"
      >
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-2">
            {greetingIcon === Sun ? (
              <Sun className="w-6 h-6 text-yellow-200" />
            ) : (
              <Moon className="w-6 h-6 text-blue-200" />
            )}
            <span className="text-white/80">{greeting},</span>
          </div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
            {user?.name?.split(' ')[0] || 'Student'}!
          </h1>
          <p className="text-white/80 mb-3 md:mb-4 text-sm md:text-base">
            How are you feeling today? Let's continue your wellness journey.
          </p>
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            <Button
              onClick={() => setActiveTab('chat')}
              className="bg-white/20 hover:bg-white/30 text-white border-white/20 text-xs md:text-sm"
              variant="outline"
              size="sm"
            >
              <MessageCircle className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Talk to </span>AI Support
            </Button>
            <Button
              onClick={() => setActiveTab('journal')}
              className="bg-white/20 hover:bg-white/30 text-white border-white/20 text-xs md:text-sm"
              variant="outline"
              size="sm"
            >
              <Book className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Quick </span>Journal
            </Button>
            <Button
              onClick={() => setActiveTab('goals')}
              className="bg-white/20 hover:bg-white/30 text-white border-white/20 text-xs md:text-sm"
              variant="outline"
              size="sm"
            >
              <Target className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
              Goals
            </Button>
          </div>
        </div>
        
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 px-2 md:px-0">
        {quickStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:soulace-shadow transition-shadow cursor-pointer">
              <CardContent className="p-3 md:p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-1.5 md:p-2 rounded-lg ${stat.bg}`}>
                    <stat.icon className={`w-3 h-3 md:w-4 md:h-4 ${stat.color}`} />
                  </div>
                  {stat.title === 'Water Intake' && (
                    <Zap className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-lg md:text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-2 gap-4 md:gap-6 px-2 md:px-0">
        {/* Daily Tasks */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-base md:text-lg">
                <Target className="w-4 h-4 md:w-5 md:h-5 mr-2 text-primary" />
                Daily Wellness Goals
              </CardTitle>
              <CardDescription className="text-xs md:text-sm">Complete these tasks to earn wellness points</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 md:space-y-3">
              {todayTasks.map((task, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-2 md:p-3 rounded-lg border transition-colors ${
                    task.completed 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-muted/30 border-border hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center space-x-2 md:space-x-3 flex-1 min-w-0">
                    <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      task.completed 
                        ? 'bg-green-500 border-green-500' 
                        : 'border-muted-foreground'
                    }`}>
                      {task.completed && (
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className={`text-xs md:text-sm truncate ${
                      task.completed ? 'text-green-700 line-through' : 'text-foreground'
                    }`}>
                      {task.task}
                    </span>
                  </div>
                  <Badge variant={task.completed ? "secondary" : "outline"} className="text-xs ml-2 shrink-0">
                    {task.points} pts
                  </Badge>
                </div>
              ))}
              <div className="pt-2">
                <div className="flex justify-between text-xs md:text-sm text-muted-foreground mb-1">
                  <span>Progress</span>
                  <span>2/4 completed</span>
                </div>
                <Progress value={50} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-base md:text-lg">
                <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-2 text-primary" />
                Upcoming Events
              </CardTitle>
              <CardDescription className="text-xs md:text-sm">Your scheduled appointments and activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 md:space-y-3">
              {upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  className={`p-2 md:p-3 rounded-lg border transition-colors hover:bg-muted/50 ${
                    event.urgent ? 'border-amber-200 bg-amber-50' : 'border-border'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-xs md:text-sm truncate flex-1">{event.title}</h4>
                    {event.urgent && (
                      <Badge variant="outline" className="text-xs border-amber-400 text-amber-600 ml-2 shrink-0">
                        Today
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{event.time}</p>
                </div>
              ))}
              <Button
                onClick={() => setActiveTab('booking')}
                variant="outline"
                className="w-full mt-3 text-xs md:text-sm"
                size="sm"
              >
                <Calendar className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                Book New Appointment
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="px-2 md:px-0"
      >
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base md:text-lg">Quick Actions</CardTitle>
            <CardDescription className="text-xs md:text-sm">Access your most-used features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
              {[
                { label: 'Goals & Rewards', icon: Target, tab: 'goals', color: 'text-blue-500' },
                { label: 'Meet Luna', icon: Sparkles, tab: 'companion', color: 'text-pink-500' },
                { label: 'SoulVault', icon: Lock, tab: 'vault', color: 'text-purple-500' },
                { label: 'Emergency Support', icon: Heart, tab: 'chat', color: 'text-red-500' },
              ].map((action, index) => (
                <Button
                  key={action.label}
                  onClick={() => setActiveTab(action.tab)}
                  variant="outline"
                  className="h-auto p-3 md:p-4 flex flex-col items-center space-y-1 md:space-y-2 hover:soulace-gradient hover:text-white transition-all"
                >
                  <action.icon className={`w-5 h-5 md:w-6 md:h-6 ${action.color}`} />
                  <span className="text-xs text-center leading-tight">{action.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Bottom padding for mobile navigation */}
      <div className="h-32 md:h-0" />
    </div>
  );
}