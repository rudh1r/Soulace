import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PenTool, 
  Calendar, 
  TrendingUp, 
  Heart, 
  Smile, 
  Meh, 
  Frown, 
  Save,
  Plus,
  BarChart3,
  BookOpen,
  Target
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const moodOptions = [
  { value: 5, label: 'Amazing', icon: Smile, color: 'text-green-500', emoji: '😊' },
  { value: 4, label: 'Good', icon: Smile, color: 'text-green-400', emoji: '🙂' },
  { value: 3, label: 'Okay', icon: Meh, color: 'text-yellow-500', emoji: '😐' },
  { value: 2, label: 'Low', icon: Frown, color: 'text-orange-500', emoji: '🙁' },
  { value: 1, label: 'Very Low', icon: Frown, color: 'text-red-500', emoji: '😢' }
];

const prompts = [
  "What are three things you're grateful for today?",
  "How did you handle stress today?",
  "What made you smile today?",
  "What challenge did you overcome recently?",
  "How are you taking care of yourself?",
  "What are you looking forward to?",
  "Describe a moment when you felt proud of yourself.",
  "What did you learn about yourself today?"
];

const weeklyData = [
  { day: 'Mon', mood: 4, entry: true },
  { day: 'Tue', mood: 3, entry: true },
  { day: 'Wed', mood: 5, entry: false },
  { day: 'Thu', mood: 2, entry: true },
  { day: 'Fri', mood: 4, entry: true },
  { day: 'Sat', mood: 4, entry: false },
  { day: 'Sun', mood: 5, entry: true }
];

const pastEntries = [
  {
    id: '1',
    date: 'Today',
    mood: 4,
    preview: 'Had a good day overall. Managed to complete most of my assignments...',
    wordCount: 145
  },
  {
    id: '2',
    date: 'Yesterday',
    mood: 3,
    preview: 'Feeling a bit overwhelmed with upcoming exams. Need to work on time management...',
    wordCount: 234
  },
  {
    id: '3',
    date: '2 days ago',
    mood: 5,
    preview: 'Great day! Had coffee with friends and felt really connected...',
    wordCount: 189
  }
];

export function JournalingApp() {
  const [currentMood, setCurrentMood] = useState<number | null>(null);
  const [journalEntry, setJournalEntry] = useState('');
  const [gratitude, setGratitude] = useState(['', '', '']);
  const [goals, setGoals] = useState('');
  const [activeTab, setActiveTab] = useState('write');
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  const handleSaveEntry = () => {
    // Here you would save to your backend
    console.log('Saving entry...', {
      mood: currentMood,
      entry: journalEntry,
      gratitude: gratitude.filter(g => g.trim()),
      goals
    });
    
    // Reset form
    setJournalEntry('');
    setCurrentMood(null);
    setGratitude(['', '', '']);
    setGoals('');
    setSelectedPrompt(null);
  };

  const handleGratitudeChange = (index: number, value: string) => {
    const newGratitude = [...gratitude];
    newGratitude[index] = value;
    setGratitude(newGratitude);
  };

  const averageMood = weeklyData.reduce((sum, day) => sum + day.mood, 0) / weeklyData.length;
  const streakDays = 7; // Calculate actual streak
  const totalEntries = pastEntries.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center justify-center w-16 h-16 soulace-gradient rounded-2xl mb-4"
        >
          <PenTool className="w-8 h-8 text-white" />
        </motion.div>
        <h1 className="text-2xl font-bold mb-2">Daily Journal</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Track your mood, reflect on your day, and practice gratitude
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{streakDays}</div>
            <div className="text-xs text-muted-foreground">Day Streak</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-500">{averageMood.toFixed(1)}</div>
            <div className="text-xs text-muted-foreground">Avg Mood</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-500">{totalEntries}</div>
            <div className="text-xs text-muted-foreground">Total Entries</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="write">
            <PenTool className="w-4 h-4 mr-2" />
            Write
          </TabsTrigger>
          <TabsTrigger value="insights">
            <BarChart3 className="w-4 h-4 mr-2" />
            Insights
          </TabsTrigger>
          <TabsTrigger value="history">
            <BookOpen className="w-4 h-4 mr-2" />
            History
          </TabsTrigger>
        </TabsList>

        {/* Write Tab */}
        <TabsContent value="write" className="space-y-6">
          {/* Mood Selector */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="w-5 h-5 mr-2 text-primary" />
                How are you feeling today?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-2">
                {moodOptions.map((mood) => (
                  <Button
                    key={mood.value}
                    variant={currentMood === mood.value ? "default" : "outline"}
                    onClick={() => setCurrentMood(mood.value)}
                    className={`h-auto p-4 flex flex-col items-center space-y-2 ${
                      currentMood === mood.value ? 'soulace-gradient' : ''
                    }`}
                  >
                    <span className="text-2xl">{mood.emoji}</span>
                    <span className="text-xs">{mood.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Writing Prompts */}
          <Card>
            <CardHeader>
              <CardTitle>Writing Prompts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-2">
                {prompts.slice(0, 4).map((prompt, index) => (
                  <Button
                    key={index}
                    variant={selectedPrompt === prompt ? "default" : "outline"}
                    onClick={() => {
                      setSelectedPrompt(prompt);
                      setJournalEntry(prompt + '\n\n');
                    }}
                    className={`h-auto p-3 text-left justify-start ${
                      selectedPrompt === prompt ? 'soulace-gradient' : ''
                    }`}
                  >
                    <span className="text-sm">{prompt}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Journal Entry */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Entry</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="journal-entry">Write about your day...</Label>
                <Textarea
                  id="journal-entry"
                  placeholder="How was your day? What thoughts and feelings came up? What did you learn about yourself?"
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
                <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                  <span>{journalEntry.length} characters</span>
                  <span>{journalEntry.split(' ').filter(word => word.length > 0).length} words</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gratitude Section */}
          <Card>
            <CardHeader>
              <CardTitle>Three Things I'm Grateful For</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {gratitude.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium text-primary">
                    {index + 1}
                  </span>
                  <Input
                    placeholder={`Something you're grateful for...`}
                    value={item}
                    onChange={(e) => handleGratitudeChange(index, e.target.value)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-primary" />
                Tomorrow's Intention
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="What do you want to focus on tomorrow?"
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
              />
            </CardContent>
          </Card>

          {/* Save Button */}
          <Button
            onClick={handleSaveEntry}
            disabled={!currentMood || !journalEntry.trim()}
            className="w-full soulace-gradient"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Entry
          </Button>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          {/* Weekly Mood Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                This Week's Mood Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span>Average Mood: {averageMood.toFixed(1)}/5</span>
                  <Badge variant={averageMood >= 4 ? "default" : averageMood >= 3 ? "secondary" : "destructive"}>
                    {averageMood >= 4 ? 'Great' : averageMood >= 3 ? 'Good' : 'Needs Attention'}
                  </Badge>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {weeklyData.map((day, index) => (
                    <div key={index} className="text-center">
                      <div className="text-xs text-muted-foreground mb-2">{day.day}</div>
                      <div className={`w-full h-16 rounded-lg flex flex-col items-center justify-center space-y-1 ${
                        day.mood >= 4 ? 'bg-green-100 text-green-700' :
                        day.mood >= 3 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        <span className="text-lg">
                          {moodOptions.find(m => m.value === day.mood)?.emoji}
                        </span>
                        <div className={`w-2 h-2 rounded-full ${
                          day.entry ? 'bg-current' : 'bg-gray-300'
                        }`} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <Progress value={85} className="mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Journal completion: 6/7 days this week
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mood Patterns */}
          <Card>
            <CardHeader>
              <CardTitle>Insights & Patterns</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">🌟 Positive Pattern</h4>
                <p className="text-sm text-blue-800">
                  Your mood tends to be higher on days when you write longer journal entries. Keep reflecting!
                </p>
              </div>
              <div className="p-4 bg-amber-50 rounded-lg">
                <h4 className="font-medium text-amber-900 mb-2">⚠️ Area to Watch</h4>
                <p className="text-sm text-amber-800">
                  Thursday seems to be consistently challenging. Consider planning self-care activities.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">💡 Recommendation</h4>
                <p className="text-sm text-green-800">
                  Your gratitude practice is working well! Your mood improves on days with gratitude entries.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-4">
          <div className="space-y-4">
            {pastEntries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:soulace-shadow transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">
                          {moodOptions.find(m => m.value === entry.mood)?.emoji}
                        </span>
                        <div>
                          <h4 className="font-medium">{entry.date}</h4>
                          <p className="text-xs text-muted-foreground">
                            {entry.wordCount} words
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {moodOptions.find(m => m.value === entry.mood)?.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {entry.preview}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <Button variant="outline" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Load More Entries
          </Button>
        </TabsContent>
      </Tabs>

      {/* Bottom padding for mobile */}
      <div className="h-20 md:h-0" />
    </div>
  );
}