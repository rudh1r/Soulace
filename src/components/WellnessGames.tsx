import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Play, Pause, RotateCcw, Timer, Award, Sparkles } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

interface GameStats {
  gamesPlayed: number;
  totalTime: number;
  highScore: number;
  streak: number;
}

type GameType = 'breathing' | 'memory' | 'focus' | 'meditation';

interface Game {
  id: string;
  title: string;
  description: string;
  type: GameType;
  duration: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  icon: string;
}

const games: Game[] = [
  {
    id: '1',
    title: '4-7-8 Breathing',
    description: 'A calming breathing exercise to reduce stress and anxiety',
    type: 'breathing',
    duration: 300, // 5 minutes
    difficulty: 'Easy',
    icon: '🫁'
  },
  {
    id: '2',
    title: 'Memory Garden',
    description: 'Match peaceful nature sounds to improve focus and memory',
    type: 'memory',
    duration: 600, // 10 minutes
    difficulty: 'Medium',
    icon: '🌸'
  },
  {
    id: '3',
    title: 'Focus Flow',
    description: 'Guide a flowing stream through obstacles with mindful attention',
    type: 'focus',
    duration: 480, // 8 minutes
    difficulty: 'Medium',
    icon: '🌊'
  },
  {
    id: '4',
    title: 'Zen Garden',
    description: 'Create beautiful patterns in sand for mindful meditation',
    type: 'meditation',
    duration: 900, // 15 minutes
    difficulty: 'Easy',
    icon: '🪨'
  }
];

export function WellnessGames() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [gamePhase, setGamePhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathingCycle, setBreathingCycle] = useState(0);
  const [stats] = useState<GameStats>({
    gamesPlayed: 12,
    totalTime: 180, // minutes
    highScore: 850,
    streak: 5
  });
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
        
        // Breathing game logic
        if (selectedGame?.type === 'breathing') {
          handleBreathingCycle();
        }
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      handleGameComplete();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isPlaying, timeLeft, gamePhase, breathingCycle]);

  const handleBreathingCycle = () => {
    const cycleTime = (selectedGame?.duration || 300) / 15; // 15 cycles in total
    const phaseTime = cycleTime / 3;
    
    if (timeLeft % phaseTime === 0) {
      if (gamePhase === 'inhale') {
        setGamePhase('hold');
      } else if (gamePhase === 'hold') {
        setGamePhase('exhale');
      } else {
        setGamePhase('inhale');
        setBreathingCycle(prev => prev + 1);
      }
    }
  };

  const startGame = (game: Game) => {
    setSelectedGame(game);
    setTimeLeft(game.duration);
    setIsPlaying(true);
    setGamePhase('inhale');
    setBreathingCycle(0);
  };

  const togglePause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetGame = () => {
    setIsPlaying(false);
    setTimeLeft(selectedGame?.duration || 0);
    setGamePhase('inhale');
    setBreathingCycle(0);
  };

  const handleGameComplete = () => {
    setIsPlaying(false);
    // Add completion logic here
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getBreathingInstruction = () => {
    if (gamePhase === 'inhale') return 'Breathe In';
    if (gamePhase === 'hold') return 'Hold';
    return 'Breathe Out';
  };

  const getBreathingDuration = () => {
    if (gamePhase === 'inhale') return '4 seconds';
    if (gamePhase === 'hold') return '7 seconds';
    return '8 seconds';
  };

  if (selectedGame && isPlaying) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="mb-6">
            <div className="text-4xl mb-2">{selectedGame.icon}</div>
            <h2 className="text-xl font-medium mb-2">{selectedGame.title}</h2>
            <div className="text-2xl font-mono text-primary">
              {formatTime(timeLeft)}
            </div>
          </div>

          {selectedGame.type === 'breathing' && (
            <div className="mb-8">
              <motion.div
                className="w-24 h-24 mx-auto mb-4 rounded-full soulace-gradient flex items-center justify-center"
                animate={{
                  scale: gamePhase === 'inhale' ? 1.2 : gamePhase === 'hold' ? 1.2 : 1,
                }}
                transition={{ duration: gamePhase === 'inhale' ? 4 : gamePhase === 'hold' ? 7 : 8 }}
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-blue-500" />
                </div>
              </motion.div>
              
              <div className="text-lg font-medium mb-2">
                {getBreathingInstruction()}
              </div>
              <div className="text-sm text-muted-foreground mb-4">
                {getBreathingDuration()}
              </div>
              <div className="text-sm text-muted-foreground">
                Cycle {breathingCycle + 1} of 15
              </div>
            </div>
          )}

          {selectedGame.type !== 'breathing' && (
            <div className="mb-8">
              <div className="text-lg font-medium mb-4">
                Follow the peaceful animations and sounds
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="soulace-gradient h-2 rounded-full transition-all duration-1000"
                  style={{ 
                    width: `${((selectedGame.duration - timeLeft) / selectedGame.duration) * 100}%` 
                  }}
                />
              </div>
            </div>
          )}

          <div className="flex gap-3 justify-center">
            <Button variant="outline" size="sm" onClick={togglePause}>
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="sm" onClick={resetGame}>
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setSelectedGame(null)}>
              Exit
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="p-3 soulace-gradient rounded-xl">
            <Gamepad2 className="h-6 w-6 text-white" />
          </div>
          <h1 className="soulace-text-gradient">Wellness Games</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Interactive mindfulness games designed to reduce stress and improve focus
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-medium text-primary">{stats.gamesPlayed}</div>
          <div className="text-sm text-muted-foreground">Games Played</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-medium text-primary">{stats.totalTime}m</div>
          <div className="text-sm text-muted-foreground">Total Time</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-medium text-primary">{stats.highScore}</div>
          <div className="text-sm text-muted-foreground">Best Score</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-medium text-primary">{stats.streak}</div>
          <div className="text-sm text-muted-foreground">Day Streak</div>
        </Card>
      </div>

      {/* Game Selection */}
      <div>
        <h2 className="text-xl font-medium mb-4">Choose Your Game</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {games.map((game) => (
            <Card key={game.id} className="p-6 hover:soulace-shadow transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{game.icon}</div>
                <Badge variant={
                  game.difficulty === 'Easy' ? 'secondary' :
                  game.difficulty === 'Medium' ? 'default' : 'destructive'
                }>
                  {game.difficulty}
                </Badge>
              </div>
              
              <h3 className="font-medium mb-2">{game.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {game.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Timer className="h-4 w-4" />
                  <span>{Math.floor(game.duration / 60)} min</span>
                </div>
                
                <Button 
                  size="sm" 
                  className="soulace-gradient text-white"
                  onClick={() => startGame(game)}
                >
                  <Play className="h-4 w-4 mr-1" />
                  Start
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Achievement Section */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Award className="h-5 w-5 text-yellow-500" />
          <h3 className="font-medium">Recent Achievements</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <div className="text-xl">🏆</div>
              <div>
                <div className="font-medium text-sm">Mindful Warrior</div>
                <div className="text-xs text-muted-foreground">Complete 10 breathing sessions</div>
              </div>
            </div>
            <Badge variant="secondary">New</Badge>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg opacity-60">
            <div className="flex items-center gap-3">
              <div className="text-xl">🎯</div>
              <div>
                <div className="font-medium text-sm">Focus Master</div>
                <div className="text-xs text-muted-foreground">Complete focus game with 90% accuracy</div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">Progress: 7/10</div>
          </div>
        </div>
      </Card>
    </div>
  );
}