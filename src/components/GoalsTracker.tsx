import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, Clock, Footprints, Smartphone, Award, 
  CheckCircle, Calendar, TrendingUp, Heart, Star,
  Play, Pause, RotateCcw, Plus, Trophy
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'physical' | 'digital-wellness' | 'mindfulness' | 'social';
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: string;
  reward: {
    points: number;
    companionItem?: string;
    companionXP?: number;
  };
  completed: boolean;
  streak: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const mockGoals: Goal[] = [
  {
    id: '1',
    title: 'Daily Steps Challenge',
    description: 'Walk 8,000 steps every day this week',
    category: 'physical',
    targetValue: 8000,
    currentValue: 5430,
    unit: 'steps',
    deadline: '2024-12-31',
    reward: { points: 150, companionItem: 'Walking Shoes', companionXP: 50 },
    completed: false,
    streak: 3
  },
  {
    id: '2',
    title: 'Screen Time Reduction',
    description: 'Limit screen time to 4 hours per day',
    category: 'digital-wellness',
    targetValue: 240,
    currentValue: 320,
    unit: 'minutes',
    deadline: '2024-12-31',
    reward: { points: 200, companionItem: 'Digital Detox Badge', companionXP: 75 },
    completed: false,
    streak: 1
  },
  {
    id: '3',
    title: 'Mindful Moments',
    description: 'Practice mindfulness for 15 minutes daily',
    category: 'mindfulness',
    targetValue: 15,
    currentValue: 15,
    unit: 'minutes',
    deadline: '2024-12-31',
    reward: { points: 100, companionItem: 'Zen Garden', companionXP: 40 },
    completed: true,
    streak: 7
  }
];

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Completed your first physical activity goal',
    icon: '🚶‍♂️',
    unlockedAt: '2024-12-01',
    rarity: 'common'
  },
  {
    id: '2',
    title: 'Digital Warrior',
    description: 'Reduced screen time for 7 consecutive days',
    icon: '🛡️',
    unlockedAt: '2024-12-05',
    rarity: 'rare'
  },
  {
    id: '3',
    title: 'Mindfulness Master',
    description: 'Completed 30 days of mindfulness practice',
    icon: '🧘‍♀️',
    unlockedAt: '2024-12-10',
    rarity: 'epic'
  }
];

export function GoalsTracker() {
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [achievements] = useState<Achievement[]>(mockAchievements);
  const [showNewGoalDialog, setShowNewGoalDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [companionPoints, setCompanionPoints] = useState(1250);

  const updateGoalProgress = (goalId: string, newValue: number) => {
    setGoals(prevGoals => 
      prevGoals.map(goal => {
        if (goal.id === goalId) {
          const completed = newValue >= goal.targetValue;
          if (completed && !goal.completed) {
            // Goal just completed - trigger celebration
            triggerCelebration(goal);
            setCompanionPoints(prev => prev + goal.reward.points);
          }
          return { ...goal, currentValue: newValue, completed };
        }
        return goal;
      })
    );
  };

  const triggerCelebration = (goal: Goal) => {
    // This will be handled by the parent component's celebration system
    const celebrationEvent = new CustomEvent('goalCompleted', {
      detail: {
        goalTitle: goal.title,
        reward: goal.reward,
        message: `🎉 Amazing! You completed "${goal.title}"! Your virtual companion earned ${goal.reward.points} points and ${goal.reward.companionItem}!`
      }
    });
    window.dispatchEvent(celebrationEvent);
  };

  const filteredGoals = selectedCategory === 'all' 
    ? goals 
    : goals.filter(goal => goal.category === selectedCategory);

  const completedGoals = goals.filter(goal => goal.completed).length;
  const totalGoals = goals.length;
  const completionRate = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'physical': return <Footprints className="h-4 w-4" />;
      case 'digital-wellness': return <Smartphone className="h-4 w-4" />;
      case 'mindfulness': return <Heart className="h-4 w-4" />;
      case 'social': return <Star className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800';
      case 'rare': return 'bg-blue-100 text-blue-800';
      case 'epic': return 'bg-purple-100 text-purple-800';
      case 'legendary': return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-4 md:space-y-6 pb-24 md:pb-4">
      {/* Header */}
      <div className="text-center px-2">
        <div className="inline-flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
          <div className="p-2 md:p-3 soulace-gradient rounded-xl">
            <Target className="h-5 w-5 md:h-6 md:w-6 text-white" />
          </div>
          <h1 className="soulace-text-gradient text-xl md:text-2xl">Goals & Achievements</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base px-4">
          Set wellness goals, track your progress, and earn rewards for your virtual companion
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 px-2">
        <Card className="p-3 md:p-6 text-center">
          <Trophy className="h-6 w-6 md:h-8 md:w-8 text-yellow-500 mx-auto mb-1 md:mb-2" />
          <div className="text-lg md:text-2xl font-medium text-primary">{completedGoals}</div>
          <div className="text-xs md:text-sm text-muted-foreground">Completed</div>
        </Card>
        <Card className="p-3 md:p-6 text-center">
          <Target className="h-6 w-6 md:h-8 md:w-8 text-blue-500 mx-auto mb-1 md:mb-2" />
          <div className="text-lg md:text-2xl font-medium text-primary">{totalGoals}</div>
          <div className="text-xs md:text-sm text-muted-foreground">Total Goals</div>
        </Card>
        <Card className="p-3 md:p-6 text-center">
          <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-green-500 mx-auto mb-1 md:mb-2" />
          <div className="text-lg md:text-2xl font-medium text-primary">{completionRate.toFixed(0)}%</div>
          <div className="text-xs md:text-sm text-muted-foreground">Success Rate</div>
        </Card>
        <Card className="p-3 md:p-6 text-center">
          <Star className="h-6 w-6 md:h-8 md:w-8 text-purple-500 mx-auto mb-1 md:mb-2" />
          <div className="text-lg md:text-2xl font-medium text-primary">{companionPoints}</div>
          <div className="text-xs md:text-sm text-muted-foreground">Luna Points</div>
        </Card>
      </div>

      <Tabs defaultValue="goals" className="space-y-4 px-2">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="goals" className="text-sm">Current Goals</TabsTrigger>
          <TabsTrigger value="achievements" className="text-sm">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="goals" className="space-y-4">
          {/* Category Filter & Add Goal */}
          <div className="flex flex-col gap-3 md:gap-4">
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {['all', 'physical', 'digital-wellness', 'mindfulness', 'social'].map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "secondary"}
                  className={`cursor-pointer transition-colors text-xs md:text-sm ${
                    selectedCategory === category 
                      ? 'soulace-gradient text-white' 
                      : 'hover:bg-accent'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {getCategoryIcon(category)}
                  <span className="ml-1 capitalize">
                    {category === 'all' ? 'All' : category.replace('-', ' ')}
                  </span>
                </Badge>
              ))}
            </div>

            <Dialog open={showNewGoalDialog} onOpenChange={setShowNewGoalDialog}>
              <DialogTrigger asChild>
                <Button className="soulace-gradient text-white w-full md:w-auto md:ml-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Goal
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Goal</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Goal Title</Label>
                    <Input id="title" placeholder="Enter goal title" />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="physical">Physical Activity</SelectItem>
                        <SelectItem value="digital-wellness">Digital Wellness</SelectItem>
                        <SelectItem value="mindfulness">Mindfulness</SelectItem>
                        <SelectItem value="social">Social Connection</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="target">Target Value</Label>
                      <Input id="target" type="number" placeholder="e.g., 8000" />
                    </div>
                    <div>
                      <Label htmlFor="unit">Unit</Label>
                      <Input id="unit" placeholder="e.g., steps" />
                    </div>
                  </div>
                  <Button className="w-full soulace-gradient text-white">
                    Create Goal
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Goals List */}
          <div className="grid gap-4">
            <AnimatePresence>
              {filteredGoals.map((goal) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className={`p-4 md:p-6 ${goal.completed ? 'bg-green-50 border-green-200' : ''}`}>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-4 mb-3 md:mb-4">
                      <div className="flex items-start gap-3 md:gap-4 flex-1">
                        <div className={`p-2 md:p-3 rounded-lg shrink-0 ${goal.completed ? 'bg-green-100' : 'soulace-gradient-light'}`}>
                          {getCategoryIcon(goal.category)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-sm md:text-base truncate">{goal.title}</h3>
                            {goal.completed && <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-600 shrink-0" />}
                          </div>
                          <p className="text-xs md:text-sm text-muted-foreground mb-3 line-clamp-2">{goal.description}</p>
                          
                          {/* Progress */}
                          <div className="mb-3">
                            <div className="flex justify-between text-xs md:text-sm mb-1">
                              <span>{goal.currentValue} / {goal.targetValue} {goal.unit}</span>
                              <span>{Math.min(100, Math.round((goal.currentValue / goal.targetValue) * 100))}%</span>
                            </div>
                            <Progress 
                              value={Math.min(100, (goal.currentValue / goal.targetValue) * 100)}
                              className={`h-2 ${goal.completed ? 'bg-green-200' : ''}`}
                            />
                          </div>

                          {/* Streak & Rewards */}
                          <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 md:h-4 md:w-4 text-orange-500" />
                              <span>{goal.streak}d streak</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 md:h-4 md:w-4 text-yellow-500" />
                              <span>{goal.reward.points} pts</span>
                            </div>
                            {goal.reward.companionItem && (
                              <div className="flex items-center gap-1">
                                <Award className="h-3 w-3 md:h-4 md:w-4 text-purple-500" />
                                <span className="truncate max-w-[100px] md:max-w-none">{goal.reward.companionItem}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Update Progress */}
                    {!goal.completed && (
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateGoalProgress(goal.id, goal.currentValue + 100)}
                          className="flex-1 text-xs md:text-sm"
                        >
                          +100 {goal.unit}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateGoalProgress(goal.id, goal.targetValue)}
                          className="flex-1 text-xs md:text-sm"
                        >
                          Complete Goal
                        </Button>
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className="p-4 md:p-6 text-center">
                <div className="text-2xl md:text-4xl mb-2 md:mb-3">{achievement.icon}</div>
                <h3 className="font-medium mb-1 md:mb-2 text-sm md:text-base">{achievement.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3 line-clamp-2">{achievement.description}</p>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                  <Badge className={`${getRarityColor(achievement.rarity)} text-xs`}>
                    {achievement.rarity}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{achievement.unlockedAt}</span>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}