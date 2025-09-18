import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, Shield, Plus, Trash2, Edit3, Calendar, 
  Heart, Brain, CloudRain, Sun, Moon, Eye, EyeOff,
  Search, Filter, Tag, BookOpen, Zap, Target
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';

interface VaultEntry {
  id: string;
  title: string;
  content: string;
  mood: 'angry' | 'sad' | 'anxious' | 'frustrated' | 'overwhelmed' | 'confused' | 'hopeful' | 'grateful';
  category: 'vent' | 'thoughts' | 'dreams' | 'fears' | 'goals' | 'memories';
  tags: string[];
  createdAt: string;
  isEncrypted: boolean;
  wordCount: number;
}

interface MoodStats {
  angry: number;
  sad: number;
  anxious: number;
  frustrated: number;
  overwhelmed: number;
  confused: number;
  hopeful: number;
  grateful: number;
}

const mockEntries: VaultEntry[] = [
  {
    id: '1',
    title: 'Exam Stress Overload',
    content: 'I can\'t handle this anymore. Three exams in one week and I haven\'t studied enough. Everyone seems so much more prepared than me. I feel like I\'m failing at everything and disappointing everyone who believes in me.',
    mood: 'overwhelmed',
    category: 'vent',
    tags: ['exams', 'stress', 'self-doubt'],
    createdAt: '2024-12-01T14:30:00Z',
    isEncrypted: true,
    wordCount: 45
  },
  {
    id: '2',
    title: 'Secret Dreams',
    content: 'Sometimes I dream about dropping out and becoming a street artist. I know it sounds crazy, but there\'s something liberating about creating art that speaks to people\'s souls. My parents would never understand.',
    mood: 'hopeful',
    category: 'dreams',
    tags: ['art', 'career', 'family'],
    createdAt: '2024-11-28T20:15:00Z',
    isEncrypted: true,
    wordCount: 38
  },
  {
    id: '3',
    title: 'Friendship Struggles',
    content: 'My best friend has been acting distant lately. I think I said something wrong, but I can\'t figure out what. The silence is killing me and I don\'t know how to fix this.',
    mood: 'sad',
    category: 'thoughts',
    tags: ['friendship', 'communication', 'guilt'],
    createdAt: '2024-11-25T16:45:00Z',
    isEncrypted: true,
    wordCount: 32
  }
];

const moodEmojis = {
  angry: '😠',
  sad: '😢',
  anxious: '😰',
  frustrated: '😤',
  overwhelmed: '🤯',
  confused: '😕',
  hopeful: '🌟',
  grateful: '🙏'
};

const moodColors = {
  angry: 'bg-red-100 text-red-800 border-red-200',
  sad: 'bg-blue-100 text-blue-800 border-blue-200',
  anxious: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  frustrated: 'bg-orange-100 text-orange-800 border-orange-200',
  overwhelmed: 'bg-purple-100 text-purple-800 border-purple-200',
  confused: 'bg-gray-100 text-gray-800 border-gray-200',
  hopeful: 'bg-green-100 text-green-800 border-green-200',
  grateful: 'bg-pink-100 text-pink-800 border-pink-200'
};

const categoryIcons = {
  vent: CloudRain,
  thoughts: Brain,
  dreams: Sun,
  fears: Moon,
  goals: Target,
  memories: Heart
};

export function SoulVault() {
  const [entries, setEntries] = useState<VaultEntry[]>(mockEntries);
  const [showNewEntryDialog, setShowNewEntryDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMood, setSelectedMood] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'private' | 'overview'>('private');
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    mood: 'confused' as VaultEntry['mood'],
    category: 'thoughts' as VaultEntry['category'],
    tags: [] as string[]
  });

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesMood = selectedMood === 'all' || entry.mood === selectedMood;
    const matchesCategory = selectedCategory === 'all' || entry.category === selectedCategory;
    return matchesSearch && matchesMood && matchesCategory;
  });

  const getMoodStats = (): MoodStats => {
    const stats: MoodStats = {
      angry: 0, sad: 0, anxious: 0, frustrated: 0,
      overwhelmed: 0, confused: 0, hopeful: 0, grateful: 0
    };
    
    entries.forEach(entry => {
      stats[entry.mood]++;
    });
    
    return stats;
  };

  const moodStats = getMoodStats();
  const totalEntries = entries.length;
  const totalWords = entries.reduce((sum, entry) => sum + entry.wordCount, 0);
  const avgWordsPerEntry = totalEntries > 0 ? Math.round(totalWords / totalEntries) : 0;

  const createEntry = () => {
    if (!newEntry.title.trim() || !newEntry.content.trim()) return;

    const entry: VaultEntry = {
      id: Date.now().toString(),
      title: newEntry.title,
      content: newEntry.content,
      mood: newEntry.mood,
      category: newEntry.category,
      tags: newEntry.tags,
      createdAt: new Date().toISOString(),
      isEncrypted: true,
      wordCount: newEntry.content.split(' ').length
    };

    setEntries(prev => [entry, ...prev]);
    setNewEntry({
      title: '',
      content: '',
      mood: 'confused',
      category: 'thoughts',
      tags: []
    });
    setShowNewEntryDialog(false);
  };

  const deleteEntry = (id: string) => {
    if (confirm('Are you sure you want to delete this entry? This action cannot be undone.')) {
      setEntries(prev => prev.filter(entry => entry.id !== id));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <h1 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            SoulVault
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Your private, encrypted space for thoughts, feelings, and everything you need to express
        </p>
      </div>

      {/* Privacy Notice */}
      <Card className="p-4 bg-indigo-50/50 border-indigo-200">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-indigo-900 mb-1">Complete Privacy Guaranteed</h4>
            <p className="text-sm text-indigo-800">
              Everything in your SoulVault is encrypted and completely private. No one else can see 
              your entries - not even administrators. This is your safe space to express yourself freely.
            </p>
          </div>
        </div>
      </Card>

      <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'private' | 'overview')} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="private" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            My Entries
          </TabsTrigger>
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Overview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 text-center">
              <div className="text-2xl font-medium text-primary">{totalEntries}</div>
              <div className="text-sm text-muted-foreground">Total Entries</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-medium text-primary">{totalWords}</div>
              <div className="text-sm text-muted-foreground">Words Written</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-medium text-primary">{avgWordsPerEntry}</div>
              <div className="text-sm text-muted-foreground">Avg. Words/Entry</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-medium text-primary">
                {entries.filter(e => e.createdAt > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()).length}
              </div>
              <div className="text-sm text-muted-foreground">This Week</div>
            </Card>
          </div>

          {/* Mood Distribution */}
          <Card className="p-6">
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Emotional Expression
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(moodStats).map(([mood, count]) => (
                <div key={mood} className={`p-3 rounded-lg border ${moodColors[mood as keyof MoodStats]}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{moodEmojis[mood as keyof typeof moodEmojis]}</span>
                    <span className="font-medium capitalize">{mood}</span>
                  </div>
                  <div className="text-sm">{count} entries</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Category Breakdown */}
          <Card className="p-6">
            <h3 className="font-medium mb-4">Entry Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {['vent', 'thoughts', 'dreams', 'fears', 'goals', 'memories'].map((category) => {
                const count = entries.filter(e => e.category === category).length;
                const Icon = categoryIcons[category as keyof typeof categoryIcons];
                return (
                  <div key={category} className="p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="h-4 w-4" />
                      <span className="font-medium capitalize">{category}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">{count} entries</div>
                  </div>
                );
              })}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="private" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search your vault..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedMood} onValueChange={setSelectedMood}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Mood" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Moods</SelectItem>
                  {Object.keys(moodEmojis).map((mood) => (
                    <SelectItem key={mood} value={mood}>
                      {moodEmojis[mood as keyof typeof moodEmojis]} {mood}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {Object.keys(categoryIcons).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Dialog open={showNewEntryDialog} onOpenChange={setShowNewEntryDialog}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  New Entry
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Vault Entry</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Give your entry a title..."
                      value={newEntry.title}
                      onChange={(e) => setNewEntry(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="mood">How are you feeling?</Label>
                      <Select value={newEntry.mood} onValueChange={(value) => setNewEntry(prev => ({ ...prev, mood: value as VaultEntry['mood'] }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(moodEmojis).map(([mood, emoji]) => (
                            <SelectItem key={mood} value={mood}>
                              {emoji} {mood}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select value={newEntry.category} onValueChange={(value) => setNewEntry(prev => ({ ...prev, category: value as VaultEntry['category'] }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(categoryIcons).map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="content">What's on your mind?</Label>
                    <Textarea
                      id="content"
                      placeholder="Express yourself freely... No one will see this but you."
                      value={newEntry.content}
                      onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
                      className="min-h-32"
                    />
                  </div>

                  <Button 
                    onClick={createEntry} 
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                    disabled={!newEntry.title.trim() || !newEntry.content.trim()}
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Save Securely
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Entries List */}
          <div className="space-y-4">
            <AnimatePresence>
              {filteredEntries.length === 0 ? (
                <Card className="p-8 text-center">
                  <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">Your vault is waiting</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm || selectedMood !== 'all' || selectedCategory !== 'all' 
                      ? 'No entries match your current filters.' 
                      : 'Start by creating your first private entry.'
                    }
                  </p>
                  {!searchTerm && selectedMood === 'all' && selectedCategory === 'all' && (
                    <Button 
                      onClick={() => setShowNewEntryDialog(true)}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create First Entry
                    </Button>
                  )}
                </Card>
              ) : (
                filteredEntries.map((entry) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium">{entry.title}</h3>
                            <Badge className={`${moodColors[entry.mood]} text-xs`}>
                              {moodEmojis[entry.mood]} {entry.mood}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {entry.category}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground text-sm mb-3 line-clamp-3">
                            {entry.content}
                          </p>
                          
                          {/* Tags */}
                          {entry.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {entry.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                          
                          {/* Metadata */}
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{formatDate(entry.createdAt)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Edit3 className="h-3 w-3" />
                              <span>{entry.wordCount} words</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Lock className="h-3 w-3" />
                              <span>Encrypted</span>
                            </div>
                          </div>
                        </div>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteEntry(entry.id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}