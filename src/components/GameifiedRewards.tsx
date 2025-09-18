import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  Target, 
  Gift, 
  Crown, 
  Medal,
  Zap,
  Heart,
  Book,
  Droplets,
  PenTool,
  Calendar,
  Users,
  Gamepad2
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  category: string;
  points: number;
  unlocked: boolean;
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
}

interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  category: string;
  available: boolean;
  claimed: boolean;
  companionItem?: boolean;
  companionXP?: number;
}

const achievements: Achievement[] = [
  {
    id: 'first-journal',
    title: 'First Entry',
    description: 'Write your first journal entry',
    icon: PenTool,
    category: 'Journaling',
    points: 50,
    unlocked: true,
    unlockedAt: '2024-01-15',
    progress: 1,
    maxProgress: 1
  },
  {
    id: 'hydration-hero',
    title: 'Hydration Hero',
    description: 'Reach your daily water goal 7 days in a row',
    icon: Droplets,
    category: 'Wellness',
    points: 200,
    unlocked: false,
    progress: 5,
    maxProgress: 7
  },
  {
    id: 'chat-starter',
    title: 'Chat Starter',
    description: 'Have your first conversation with AI support',
    icon: Heart,
    category: 'Support',
    points: 30,
    unlocked: true,
    unlockedAt: '2024-01-14'
  },
  {
    id: 'bookworm',
    title: 'Bookworm',
    description: 'Read 10 wellness articles',
    icon: Book,
    category: 'Learning',
    points: 150,
    unlocked: false,
    progress: 6,
    maxProgress: 10
  },
  {
    id: 'appointment-keeper',
    title: 'Appointment Keeper',
    description: 'Book and attend 3 counseling sessions',
    icon: Calendar,
    category: 'Professional Help',
    points: 300,
    unlocked: false,
    progress: 1,
    maxProgress: 3
  },
  {
    id: 'community-member',
    title: 'Community Member',
    description: 'Make 5 posts in the community forum',
    icon: Users,
    category: 'Community',
    points: 100,
    unlocked: false,
    progress: 2,
    maxProgress: 5
  }
];

const rewards: Reward[] = [
  // Virtual Companion Items
  {
    id: 'companion-hat',
    title: 'Cozy Hat for Companion',
    description: 'A warm, stylish hat to keep your virtual companion cozy',
    cost: 150,
    category: 'Companion Items',
    available: true,
    claimed: false,
    companionItem: true,
    companionXP: 25
  },
  {
    id: 'companion-garden',
    title: 'Zen Garden Accessory',
    description: 'A peaceful zen garden for your companion to meditate in',
    cost: 300,
    category: 'Companion Items',
    available: true,
    claimed: false,
    companionItem: true,
    companionXP: 50
  },
  {
    id: 'companion-book',
    title: 'Wisdom Book Collection',
    description: 'A collection of inspiring books for your companion to read',
    cost: 250,
    category: 'Companion Items',
    available: true,
    claimed: false,
    companionItem: true,
    companionXP: 40
  },
  {
    id: 'companion-sports',
    title: 'Sports Equipment Set',
    description: 'Encourage your companion to stay active with sports gear',
    cost: 400,
    category: 'Companion Items',
    available: true,
    claimed: false,
    companionItem: true,
    companionXP: 60
  },
  {
    id: 'companion-art',
    title: 'Art Supplies Kit',
    description: 'Let your companion express creativity with art supplies',
    cost: 350,
    category: 'Companion Items',
    available: true,
    claimed: false,
    companionItem: true,
    companionXP: 55
  },
  // App Rewards
  {
    id: 'theme-ocean',
    title: 'Ocean Theme',
    description: 'Unlock the calming ocean theme for your app',
    cost: 200,
    category: 'Themes',
    available: true,
    claimed: false
  },
  {
    id: 'meditation-pack',
    title: 'Premium Meditation Pack',
    description: 'Access to 20 guided meditation sessions',
    cost: 500,
    category: 'Content',
    available: true,
    claimed: false
  },
  {
    id: 'custom-avatar',
    title: 'Custom Avatar',
    description: 'Personalize your profile with custom avatars',
    cost: 150,
    category: 'Customization',
    available: true,
    claimed: true
  },
  {
    id: 'wellness-journal',
    title: 'Digital Wellness Journal',
    description: 'Download a PDF wellness journal template',
    cost: 100,
    category: 'Resources',
    available: true,
    claimed: false
  },
  {
    id: 'priority-booking',
    title: 'Priority Booking',
    description: 'Get priority access to counselor appointments',
    cost: 800,
    category: 'Services',
    available: false,
    claimed: false
  }
];

const levels = [
  { level: 1, title: 'Wellness Beginner', minPoints: 0, maxPoints: 200 },
  { level: 2, title: 'Mindful Explorer', minPoints: 200, maxPoints: 500 },
  { level: 3, title: 'Wellness Warrior', minPoints: 500, maxPoints: 1000 },
  { level: 4, title: 'Mental Health Advocate', minPoints: 1000, maxPoints: 2000 },
  { level: 5, title: 'Wellness Master', minPoints: 2000, maxPoints: 5000 },
];

export function GameifiedRewards() {
  const [totalPoints, setTotalPoints] = useState(420);
  const [dailyPoints, setDailyPoints] = useState(85);
  const [weeklyGoal, setWeeklyGoal] = useState(300);
  const [claimedRewards, setClaimedRewards] = useState<string[]>(['custom-avatar']);
  const [companionLevel, setCompanionLevel] = useState(3);
  const [companionXP, setCompanionXP] = useState(75);
  const [companionItems, setCompanionItems] = useState<string[]>([]);

  const currentLevel = levels.find(level => 
    totalPoints >= level.minPoints && totalPoints < level.maxPoints
  ) || levels[levels.length - 1];
  
  const nextLevel = levels.find(level => level.minPoints > totalPoints);
  const progressToNextLevel = nextLevel 
    ? ((totalPoints - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100
    : 100;

  const weeklyProgress = (dailyPoints * 7) / weeklyGoal * 100;

  const claimReward = (rewardId: string) => {
    const reward = rewards.find(r => r.id === rewardId);
    if (reward && totalPoints >= reward.cost && !claimedRewards.includes(rewardId)) {
      setTotalPoints(prev => prev - reward.cost);
      setClaimedRewards(prev => [...prev, rewardId]);
      
      // If it's a companion item, add XP and item
      if (reward.companionItem) {
        setCompanionXP(prev => prev + (reward.companionXP || 0));
        setCompanionItems(prev => [...prev, rewardId]);
        
        // Check for level up (every 100 XP)
        if (companionXP + (reward.companionXP || 0) >= companionLevel * 100) {
          setCompanionLevel(prev => prev + 1);
          setCompanionXP(0);
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center justify-center w-16 h-16 soulace-gradient rounded-2xl mb-4"
        >
          <Trophy className="w-8 h-8 text-white" />
        </motion.div>
        <h1 className="text-2xl font-bold mb-2">Wellness Rewards</h1>
        <p className="text-muted-foreground">
          Earn points for healthy habits and unlock amazing rewards
        </p>
      </div>

      {/* Current Level & Points */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="soulace-gradient text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Crown className="w-8 h-8 text-yellow-200" />
                <div>
                  <h3 className="font-bold text-lg">{currentLevel.title}</h3>
                  <p className="text-white/80 text-sm">Level {currentLevel.level}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{totalPoints}</div>
                <div className="text-white/80 text-sm">Total Points</div>
              </div>
            </div>
            
            {nextLevel && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to {nextLevel.title}</span>
                  <span>{totalPoints} / {nextLevel.minPoints}</span>
                </div>
                <Progress value={progressToNextLevel} className="bg-white/20" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Virtual Companion Status */}
        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Heart className="w-8 h-8 text-pink-200" />
                <div>
                  <h3 className="font-bold text-lg">Soul Companion</h3>
                  <p className="text-white/80 text-sm">Level {companionLevel}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{companionItems.length}</div>
                <div className="text-white/80 text-sm">Items Owned</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>XP to next level</span>
                <span>{companionXP} / {companionLevel * 100}</span>
              </div>
              <Progress value={(companionXP / (companionLevel * 100)) * 100} className="bg-white/20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily/Weekly Progress */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">Today's Points</h3>
              <Zap className="w-5 h-5 text-amber-500" />
            </div>
            <div className="text-2xl font-bold text-amber-600 mb-1">{dailyPoints}</div>
            <p className="text-sm text-muted-foreground">Keep up the great work!</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">Weekly Goal</h3>
              <Target className="w-5 h-5 text-green-500" />
            </div>
            <div className="space-y-2">
              <Progress value={weeklyProgress} className="h-2" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {Math.min(dailyPoints * 7, weeklyGoal)} / {weeklyGoal}
                </span>
                <span className="font-medium text-green-600">
                  {Math.round(weeklyProgress)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="achievements">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="achievements">
            <Medal className="w-4 h-4 mr-2" />
            Achievements
          </TabsTrigger>
          <TabsTrigger value="companion">
            <Heart className="w-4 h-4 mr-2" />
            Companion
          </TabsTrigger>
          <TabsTrigger value="rewards">
            <Gift className="w-4 h-4 mr-2" />
            Shop
          </TabsTrigger>
        </TabsList>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-4">
          <div className="grid gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`${achievement.unlocked ? 'soulace-shadow' : 'opacity-60'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        achievement.unlocked 
                          ? 'soulace-gradient text-white' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        <achievement.icon className="w-6 h-6" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className={`font-medium ${
                              achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'
                            }`}>
                              {achievement.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {achievement.description}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge 
                              variant={achievement.unlocked ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {achievement.category}
                            </Badge>
                            {achievement.unlocked && (
                              <Badge className="text-xs bg-amber-100 text-amber-700">
                                +{achievement.points} pts
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        {achievement.progress !== undefined && achievement.maxProgress && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="font-medium">
                                {achievement.progress} / {achievement.maxProgress}
                              </span>
                            </div>
                            <Progress 
                              value={(achievement.progress / achievement.maxProgress) * 100} 
                              className="h-2"
                            />
                          </div>
                        )}
                        
                        {achievement.unlocked && achievement.unlockedAt && (
                          <p className="text-xs text-green-600 mt-2">
                            ✓ Unlocked on {new Date(achievement.unlockedAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Companion Tab */}
        <TabsContent value="companion" className="space-y-4">
          {/* Companion Preview */}
          <Card className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="mb-4">
              <div className="w-24 h-24 mx-auto bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-4xl mb-4">
                🐾
              </div>
              <h3 className="text-xl font-medium mb-2">Your Soul Companion</h3>
              <p className="text-muted-foreground mb-4">
                Level {companionLevel} • {companionXP}/{companionLevel * 100} XP to next level
              </p>
              <Badge className="bg-purple-100 text-purple-800">
                Coming Soon: Full Companion Experience!
              </Badge>
            </div>
          </Card>

          {/* Companion Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="w-5 h-5" />
                Companion Items ({companionItems.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {companionItems.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">🎁</div>
                  <p className="text-muted-foreground">
                    No companion items yet. Earn points and buy some gifts for your companion!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {companionItems.map((itemId) => {
                    const item = rewards.find(r => r.id === itemId);
                    return item ? (
                      <div key={itemId} className="p-4 border rounded-lg text-center">
                        <div className="text-2xl mb-2">
                          {item.id.includes('hat') ? '🎩' :
                           item.id.includes('garden') ? '🌸' :
                           item.id.includes('book') ? '📚' :
                           item.id.includes('sports') ? '⚽' :
                           item.id.includes('art') ? '🎨' : '🎁'}
                        </div>
                        <h4 className="font-medium text-sm">{item.title.replace('for Companion', '')}</h4>
                        <Badge variant="secondary" className="text-xs mt-1">
                          +{item.companionXP} XP
                        </Badge>
                      </div>
                    ) : null;
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Companion Activities Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Future Companion Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { emoji: '🎮', title: 'Interactive Games', desc: 'Play mini-games with your companion' },
                  { emoji: '💬', title: 'Daily Conversations', desc: 'Chat with your companion about your day' },
                  { emoji: '🏆', title: 'Companion Achievements', desc: 'Unlock special companion milestones' },
                  { emoji: '📊', title: 'Wellness Tracking', desc: 'Your companion helps track your progress' }
                ].map((feature, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl mb-2">{feature.emoji}</div>
                    <h4 className="font-medium mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rewards Tab */}
        <TabsContent value="rewards" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {rewards.map((reward, index) => (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`${
                  !reward.available || claimedRewards.includes(reward.id) 
                    ? 'opacity-60' 
                    : 'hover:soulace-shadow transition-shadow'
                }`}>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium mb-1">{reward.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {reward.description}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            {reward.category}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">
                            {reward.cost}
                          </div>
                          <div className="text-xs text-muted-foreground">points</div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        {claimedRewards.includes(reward.id) ? (
                          <Badge className="bg-green-100 text-green-700">
                            ✓ Claimed
                          </Badge>
                        ) : !reward.available ? (
                          <Badge variant="secondary">Coming Soon</Badge>
                        ) : totalPoints >= reward.cost ? (
                          <Button
                            size="sm"
                            onClick={() => claimReward(reward.id)}
                            className="soulace-gradient"
                          >
                            Claim Reward
                          </Button>
                        ) : (
                          <Badge variant="outline" className="text-red-600">
                            Need {reward.cost - totalPoints} more points
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Daily Challenges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Gamepad2 className="w-5 h-5 mr-2 text-primary" />
            Today's Challenges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { task: 'Write a journal entry', points: 30, completed: true },
              { task: 'Drink 8 glasses of water', points: 40, completed: false },
              { task: 'Use AI chat for support', points: 25, completed: true },
              { task: 'Read a wellness article', points: 35, completed: false },
            ].map((challenge, index) => (
              <div 
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  challenge.completed ? 'bg-green-50 border border-green-200' : 'bg-muted/30'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    challenge.completed 
                      ? 'bg-green-500 border-green-500' 
                      : 'border-muted-foreground'
                  }`}>
                    {challenge.completed && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className={`text-sm ${
                    challenge.completed ? 'text-green-700 line-through' : ''
                  }`}>
                    {challenge.task}
                  </span>
                </div>
                <Badge variant={challenge.completed ? "secondary" : "outline"}>
                  +{challenge.points} pts
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bottom padding for mobile */}
      <div className="h-20 md:h-0" />
    </div>
  );
}