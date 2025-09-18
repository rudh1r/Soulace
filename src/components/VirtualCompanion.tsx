import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, MessageCircle, Gift, Star, Trophy, Smile, Sun, Moon, Coffee, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface Companion {
  name: string;
  level: number;
  experience: number;
  maxExperience: number;
  mood: 'happy' | 'excited' | 'calm' | 'sleepy' | 'energetic';
  energy: number;
  friendship: number;
  lastInteraction: Date;
  accessories: string[];
  achievements: string[];
}

export function VirtualCompanion() {
  const [companion, setCompanion] = useState<Companion>({
    name: 'Luna',
    level: 3,
    experience: 150,
    maxExperience: 200,
    mood: 'happy',
    energy: 85,
    friendship: 72,
    lastInteraction: new Date(),
    accessories: ['sparkle_collar', 'wellness_badge'],
    achievements: ['first_week', 'hydration_hero', 'journal_keeper']
  });

  const [selectedTab, setSelectedTab] = useState('home');
  const [showCustomization, setShowCustomization] = useState(false);
  const [recentActivity, setRecentActivity] = useState([
    { action: 'Completed daily journal', reward: '+10 XP', time: '2 hours ago' },
    { action: 'Reached hydration goal', reward: '+5 XP', time: '4 hours ago' },
    { action: 'Practiced mindfulness', reward: '+8 XP', time: '1 day ago' }
  ]);

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'happy': return <Smile className="w-5 h-5" />;
      case 'excited': return <Zap className="w-5 h-5" />;
      case 'calm': return <Sun className="w-5 h-5" />;
      case 'sleepy': return <Moon className="w-5 h-5" />;
      case 'energetic': return <Coffee className="w-5 h-5" />;
      default: return <Heart className="w-5 h-5" />;
    }
  };

  const getCompanionMessage = () => {
    const messages = {
      happy: [
        "Great job on your wellness journey today! I'm proud of you! 🌟",
        "You're doing amazing! Keep up the fantastic work! ✨",
        "I love seeing you take care of yourself! You're inspiring! 💖"
      ],
      excited: [
        "Wow! You're on fire today! Let's keep this energy going! ⚡",
        "This is so exciting! You're crushing your goals! 🎉",
        "I can't contain my excitement for your progress! Amazing! 🌈"
      ],
      calm: [
        "Take a deep breath with me. You're doing wonderfully. 🌸",
        "Your peaceful energy is beautiful. Keep finding balance. 🕯️",
        "I'm here with you, supporting your journey to wellness. 🌙"
      ]
    };
    
    const moodMessages = messages[companion.mood] || messages.happy;
    return moodMessages[Math.floor(Math.random() * moodMessages.length)];
  };

  const handleInteraction = (type: 'pet' | 'feed' | 'play') => {
    setCompanion(prev => {
      const newExperience = Math.min(prev.experience + 5, prev.maxExperience);
      const newLevel = newExperience === prev.maxExperience ? prev.level + 1 : prev.level;
      const newMaxExp = newLevel > prev.level ? prev.maxExperience + 50 : prev.maxExperience;
      
      return {
        ...prev,
        experience: newLevel > prev.level ? 0 : newExperience,
        level: newLevel,
        maxExperience: newMaxExp,
        energy: Math.min(prev.energy + 10, 100),
        friendship: Math.min(prev.friendship + 2, 100),
        lastInteraction: new Date(),
        mood: type === 'play' ? 'excited' : type === 'feed' ? 'happy' : 'calm'
      };
    });
  };

  const availableAccessories = [
    { id: 'flower_crown', name: 'Flower Crown', cost: 50, unlocked: companion.level >= 2 },
    { id: 'star_pendant', name: 'Star Pendant', cost: 75, unlocked: companion.level >= 4 },
    { id: 'rainbow_wings', name: 'Rainbow Wings', cost: 100, unlocked: companion.level >= 6 },
    { id: 'crystal_halo', name: 'Crystal Halo', cost: 150, unlocked: companion.level >= 8 }
  ];

  return (
    <div className="min-h-screen p-2 md:p-4 space-y-4 md:space-y-6 pb-24 md:pb-4">
      {/* Header */}
      <div className="text-center px-2">
        <h1 className="soulace-text-gradient mb-2 text-xl md:text-2xl">Virtual Companion</h1>
        <p className="text-muted-foreground text-sm md:text-base">Meet your wellness buddy who grows with your journey!</p>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 md:gap-6">
        {/* Companion Display */}
        <div className="lg:col-span-2 order-1">
          <Card className="soulace-shadow border-0">
            <CardHeader className="pb-3 md:pb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                    <Heart className="w-4 h-4 md:w-5 md:h-5 text-primary" fill="currentColor" />
                    {companion.name}
                    <Badge variant="secondary" className="text-xs">Level {companion.level}</Badge>
                  </CardTitle>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1">
                    Last interaction: {companion.lastInteraction.toLocaleTimeString()}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {getMoodIcon(companion.mood)}
                  <span className="text-sm capitalize text-muted-foreground">{companion.mood}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 md:space-y-6 p-3 md:p-6">
              {/* Companion Avatar */}
              <div className="flex justify-center">
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative"
                >
                  <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 soulace-gradient rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-white rounded-full flex items-center justify-center">
                      <motion.div
                        animate={{ y: [-2, 2, -2] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-4xl sm:text-5xl md:text-6xl"
                      >
                        🦋
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Accessories */}
                  {companion.accessories.includes('sparkle_collar') && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="absolute -top-1 -right-1 md:-top-2 md:-right-2"
                    >
                      <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-yellow-400" />
                    </motion.div>
                  )}
                </motion.div>
              </div>

              {/* Companion Message */}
              <Card className="bg-muted/50 border-0">
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-start gap-2 md:gap-3">
                    <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-primary mt-0.5 shrink-0" />
                    <p className="text-xs md:text-sm leading-relaxed">{getCompanionMessage()}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs md:text-sm">Experience</span>
                    <span className="text-xs md:text-sm text-muted-foreground">
                      {companion.experience}/{companion.maxExperience}
                    </span>
                  </div>
                  <Progress value={(companion.experience / companion.maxExperience) * 100} className="h-2" />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs md:text-sm">Energy</span>
                    <span className="text-xs md:text-sm text-muted-foreground">{companion.energy}%</span>
                  </div>
                  <Progress value={companion.energy} className="h-2" />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs md:text-sm">Friendship</span>
                    <span className="text-xs md:text-sm text-muted-foreground">{companion.friendship}%</span>
                  </div>
                  <Progress value={companion.friendship} className="h-2" />
                </div>
              </div>

              {/* Interaction Buttons */}
              <div className="flex gap-2 md:gap-3 justify-center">
                <Button
                  onClick={() => handleInteraction('pet')}
                  variant="outline"
                  size="sm"
                  className="flex-1 hover:soulace-gradient-light text-xs md:text-sm"
                >
                  <Heart className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  Pet
                </Button>
                <Button
                  onClick={() => handleInteraction('feed')}
                  variant="outline"
                  size="sm"
                  className="flex-1 hover:soulace-gradient-light text-xs md:text-sm"
                >
                  <Gift className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  Treat
                </Button>
                <Button
                  onClick={() => handleInteraction('play')}
                  variant="outline"
                  size="sm"
                  className="flex-1 hover:soulace-gradient-light text-xs md:text-sm"
                >
                  <Star className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  Play
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side Panel / Mobile Bottom Section */}
        <div className="space-y-4 order-2 lg:order-none">
          {/* Mobile: Show quick actions first */}
          <div className="lg:hidden">
            <div className="flex gap-2 mb-4">
              <Button
                onClick={() => setShowCustomization(false)}
                variant={!showCustomization ? "default" : "outline"}
                size="sm"
                className="flex-1"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Activity
              </Button>
              <Button
                onClick={() => setShowCustomization(true)}
                variant={showCustomization ? "default" : "outline"}
                size="sm"
                className="flex-1"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Shop
              </Button>
            </div>
          </div>

          {/* Desktop: Use tabs */}
          <div className="hidden lg:block">
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="home">Activity</TabsTrigger>
                <TabsTrigger value="customize">Customize</TabsTrigger>
              </TabsList>

              <TabsContent value="home" className="space-y-4">
                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Trophy className="w-4 h-4" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm truncate">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                        <Badge variant="secondary" className="text-xs ml-2 shrink-0">
                          {activity.reward}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Achievements */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Star className="w-4 h-4" />
                      Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {companion.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                          <Trophy className="w-4 h-4 text-yellow-500 shrink-0" />
                          <span className="text-sm capitalize">{achievement.replace('_', ' ')}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="customize" className="space-y-4">
                {/* Accessories Shop */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Sparkles className="w-4 h-4" />
                      Accessories Shop
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Customize your companion with wellness points!
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {availableAccessories.map((accessory) => (
                      <div
                        key={accessory.id}
                        className={`p-3 rounded-lg border ${
                          accessory.unlocked ? 'bg-background' : 'bg-muted/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm">{accessory.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {accessory.unlocked ? 'Available' : `Unlock at level ${Math.ceil(accessory.cost / 25)}`}
                            </p>
                          </div>
                          <div className="text-right ml-3 shrink-0">
                            <p className="text-sm">{accessory.cost} pts</p>
                            {companion.accessories.includes(accessory.id) ? (
                              <Badge variant="default" className="text-xs">Owned</Badge>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                disabled={!accessory.unlocked}
                                className="text-xs h-6"
                              >
                                Buy
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Mobile: Conditional content based on toggle */}
          <div className="lg:hidden">
            {!showCustomization ? (
              <div className="space-y-4">
                {/* Recent Activity */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Trophy className="w-4 h-4" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm truncate">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                        <Badge variant="secondary" className="text-xs ml-2 shrink-0">
                          {activity.reward}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Achievements */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Star className="w-4 h-4" />
                      Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {companion.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                          <Trophy className="w-4 h-4 text-yellow-500 shrink-0" />
                          <span className="text-sm capitalize truncate">{achievement.replace('_', ' ')}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              /* Accessories Shop Mobile */
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Sparkles className="w-4 h-4" />
                    Accessories Shop
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Customize Luna with wellness points!
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  {availableAccessories.map((accessory) => (
                    <div
                      key={accessory.id}
                      className={`p-3 rounded-lg border ${
                        accessory.unlocked ? 'bg-background' : 'bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm">{accessory.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {accessory.unlocked ? 'Available' : `Unlock at level ${Math.ceil(accessory.cost / 25)}`}
                          </p>
                        </div>
                        <div className="text-right ml-3 shrink-0">
                          <p className="text-sm">{accessory.cost} pts</p>
                          {companion.accessories.includes(accessory.id) ? (
                            <Badge variant="default" className="text-xs">Owned</Badge>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              disabled={!accessory.unlocked}
                              className="text-xs h-6"
                            >
                              Buy
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}