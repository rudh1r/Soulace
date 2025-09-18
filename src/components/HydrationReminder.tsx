import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Droplets, 
  Plus, 
  Minus, 
  Target, 
  Clock, 
  TrendingUp,
  Bell,
  Award
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { Label } from './ui/label';

const DAILY_GOAL = 8; // 8 glasses of water
const GLASS_SIZE = 250; // 250ml per glass

export function HydrationReminder() {
  const [currentIntake, setCurrentIntake] = useState(0);
  const [lastDrink, setLastDrink] = useState<Date | null>(null);
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [customGoal, setCustomGoal] = useState(DAILY_GOAL);
  const [weeklyData, setWeeklyData] = useState([
    { day: 'Mon', glasses: 6 },
    { day: 'Tue', glasses: 8 },
    { day: 'Wed', glasses: 5 },
    { day: 'Thu', glasses: 7 },
    { day: 'Fri', glasses: 8 },
    { day: 'Sat', glasses: 4 },
    { day: 'Sun', glasses: 0 } // Today
  ]);

  const progressPercentage = (currentIntake / customGoal) * 100;
  const remainingGlasses = Math.max(0, customGoal - currentIntake);
  const totalMl = currentIntake * GLASS_SIZE;

  useEffect(() => {
    // Load saved data from localStorage
    const savedIntake = localStorage.getItem('soulace_hydration_today');
    const savedLastDrink = localStorage.getItem('soulace_last_drink');
    
    if (savedIntake) {
      setCurrentIntake(parseInt(savedIntake));
    }
    
    if (savedLastDrink) {
      setLastDrink(new Date(savedLastDrink));
    }
  }, []);

  const addGlass = () => {
    const newIntake = currentIntake + 1;
    setCurrentIntake(newIntake);
    setLastDrink(new Date());
    
    // Save to localStorage
    localStorage.setItem('soulace_hydration_today', newIntake.toString());
    localStorage.setItem('soulace_last_drink', new Date().toISOString());
    
    // Update weekly data for today (Sunday)
    setWeeklyData(prev => 
      prev.map((day, index) => 
        index === 6 ? { ...day, glasses: newIntake } : day
      )
    );
  };

  const removeGlass = () => {
    if (currentIntake > 0) {
      const newIntake = currentIntake - 1;
      setCurrentIntake(newIntake);
      localStorage.setItem('soulace_hydration_today', newIntake.toString());
      
      setWeeklyData(prev => 
        prev.map((day, index) => 
          index === 6 ? { ...day, glasses: newIntake } : day
        )
      );
    }
  };

  const getTimeSinceLastDrink = () => {
    if (!lastDrink) return null;
    
    const now = new Date();
    const diffMs = now.getTime() - lastDrink.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours > 0) {
      return `${diffHours}h ${diffMinutes}m ago`;
    } else {
      return `${diffMinutes}m ago`;
    }
  };

  const getMotivationalMessage = () => {
    if (progressPercentage >= 100) {
      return "🎉 Amazing! You've reached your daily goal!";
    } else if (progressPercentage >= 75) {
      return "💪 You're almost there! Keep it up!";
    } else if (progressPercentage >= 50) {
      return "👍 Great progress! You're halfway there!";
    } else if (progressPercentage >= 25) {
      return "🌱 Good start! Keep drinking water regularly.";
    } else {
      return "💧 Let's start hydrating! Your body needs water.";
    }
  };

  const weeklyAverage = weeklyData.reduce((sum, day) => sum + day.glasses, 0) / weeklyData.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-4"
        >
          <Droplets className="w-8 h-8 text-white" />
        </motion.div>
        <h1 className="text-2xl font-bold mb-2">Hydration Tracker</h1>
        <p className="text-muted-foreground">
          Stay hydrated for better focus and mental clarity
        </p>
      </div>

      {/* Current Progress */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-cyan-50" />
        <CardContent className="relative p-6">
          <div className="text-center mb-6">
            <motion.div
              key={currentIntake}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-4xl font-bold text-blue-600 mb-2"
            >
              {currentIntake} / {customGoal}
            </motion.div>
            <p className="text-muted-foreground mb-1">Glasses of water today</p>
            <p className="text-sm text-blue-600 font-medium">
              {totalMl}ml • {remainingGlasses} glasses remaining
            </p>
          </div>

          <Progress value={progressPercentage} className="mb-4 h-3" />
          
          <div className="flex justify-center space-x-4 mb-4">
            <Button
              onClick={removeGlass}
              variant="outline"
              size="lg"
              disabled={currentIntake === 0}
              className="w-12 h-12 rounded-full p-0"
            >
              <Minus className="w-5 h-5" />
            </Button>
            
            <motion.div
              whileTap={{ scale: 0.95 }}
              className="mx-4"
            >
              <Button
                onClick={addGlass}
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 w-16 h-16 rounded-full"
              >
                <Plus className="w-6 h-6" />
              </Button>
            </motion.div>
            
            <Button
              onClick={addGlass}
              variant="outline"
              size="lg"
              className="w-12 h-12 rounded-full p-0"
            >
              <Droplets className="w-5 h-5" />
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm font-medium text-blue-700 mb-1">
              {getMotivationalMessage()}
            </p>
            {lastDrink && (
              <p className="text-xs text-muted-foreground">
                Last drink: {getTimeSinceLastDrink()}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <Target className="w-6 h-6 mx-auto mb-2 text-blue-500" />
            <div className="text-lg font-bold">{customGoal}</div>
            <div className="text-xs text-muted-foreground">Daily Goal</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-500" />
            <div className="text-lg font-bold">{weeklyAverage.toFixed(1)}</div>
            <div className="text-xs text-muted-foreground">Weekly Avg</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <Award className="w-6 h-6 mx-auto mb-2 text-amber-500" />
            <div className="text-lg font-bold">7</div>
            <div className="text-xs text-muted-foreground">Day Streak</div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-primary" />
            This Week's Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {weeklyData.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-muted-foreground mb-2">{day.day}</div>
                <div className={`h-20 w-full rounded-lg flex flex-col items-center justify-center relative ${
                  day.glasses >= customGoal ? 'bg-blue-100' : 
                  day.glasses >= customGoal * 0.75 ? 'bg-blue-50' : 'bg-gray-50'
                }`}>
                  <div className={`text-sm font-medium ${
                    day.glasses >= customGoal ? 'text-blue-700' : 'text-muted-foreground'
                  }`}>
                    {day.glasses}
                  </div>
                  <Droplets className={`w-4 h-4 ${
                    day.glasses >= customGoal ? 'text-blue-500' : 'text-muted-foreground'
                  }`} />
                  {day.glasses >= customGoal && (
                    <Badge className="absolute -top-1 -right-1 w-3 h-3 p-0 bg-green-500">
                      ✓
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="w-5 h-5 mr-2 text-primary" />
            Hydration Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Drink reminders</Label>
              <p className="text-xs text-muted-foreground">
                Get notified every 2 hours to drink water
              </p>
            </div>
            <Button
              variant={remindersEnabled ? "default" : "outline"}
              size="sm"
              onClick={() => setRemindersEnabled(!remindersEnabled)}
            >
              {remindersEnabled ? 'ON' : 'OFF'}
            </Button>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="daily-goal">Daily Goal (glasses)</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="daily-goal"
                type="number"
                min="1"
                max="15"
                value={customGoal}
                onChange={(e) => setCustomGoal(parseInt(e.target.value) || DAILY_GOAL)}
                className="w-20"
              />
              <span className="text-sm text-muted-foreground">
                = {customGoal * GLASS_SIZE}ml
              </span>
            </div>
          </div>

          <div className="p-3 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-1">💡 Hydration Tips</h4>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• Start your day with a glass of water</li>
              <li>• Drink water before, during, and after exercise</li>
              <li>• Keep a water bottle with you</li>
              <li>• Set regular reminders to drink water</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Bottom padding for mobile */}
      <div className="h-20 md:h-0" />
    </div>
  );
}