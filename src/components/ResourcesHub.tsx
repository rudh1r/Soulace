import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Play, 
  Headphones, 
  Download, 
  Heart, 
  Brain, 
  Zap, 
  Shield, 
  Clock,
  Globe,
  Search,
  Filter
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const videos = [
  {
    id: '1',
    title: 'Managing Exam Stress: A Student\'s Guide',
    duration: '12 min',
    category: 'Academic Pressure',
    language: 'English',
    views: '2.3k',
    thumbnail: '/placeholder-video-1.jpg',
    description: 'Learn practical techniques to reduce stress during exam periods'
  },
  {
    id: '2',
    title: 'Deep Breathing for Anxiety Relief',
    duration: '8 min',
    category: 'Anxiety Management',
    language: 'Hindi',
    views: '1.8k',
    thumbnail: '/placeholder-video-2.jpg',
    description: 'Simple breathing exercises you can do anywhere'
  },
  {
    id: '3',
    title: 'Building Healthy Sleep Habits',
    duration: '15 min',
    category: 'Sleep Wellness',
    language: 'English',
    views: '3.1k',
    thumbnail: '/placeholder-video-3.jpg',
    description: 'Create a sleep routine that works for your student lifestyle'
  }
];

const audioGuides = [
  {
    id: '1',
    title: 'Progressive Muscle Relaxation',
    duration: '20 min',
    category: 'Relaxation',
    language: 'English',
    downloads: '5.2k'
  },
  {
    id: '2',
    title: 'Guided Meditation for Focus',
    duration: '15 min',
    category: 'Meditation',
    language: 'Tamil',
    downloads: '3.8k'
  },
  {
    id: '3',
    title: 'Self-Compassion Practice',
    duration: '18 min',
    category: 'Self-Care',
    language: 'Telugu',
    downloads: '2.9k'
  }
];

const articles = [
  {
    id: '1',
    title: 'Understanding Depression in College Students',
    readTime: '7 min read',
    category: 'Mental Health',
    language: 'English',
    excerpt: 'Recognize the signs and learn about available support systems...'
  },
  {
    id: '2',
    title: 'Time Management for Better Mental Health',
    readTime: '5 min read',
    category: 'Productivity',
    language: 'Hindi',
    excerpt: 'How organizing your schedule can reduce stress and anxiety...'
  },
  {
    id: '3',
    title: 'Building Support Networks in College',
    readTime: '8 min read',
    category: 'Social Wellness',
    language: 'English',
    excerpt: 'Creating meaningful connections for emotional support...'
  }
];

const categories = [
  { value: 'all', label: 'All Categories', icon: BookOpen },
  { value: 'anxiety', label: 'Anxiety Management', icon: Shield },
  { value: 'depression', label: 'Depression Support', icon: Heart },
  { value: 'stress', label: 'Stress Relief', icon: Zap },
  { value: 'academic', label: 'Academic Pressure', icon: Brain },
  { value: 'sleep', label: 'Sleep Wellness', icon: Clock },
];

const languages = [
  { value: 'all', label: 'All Languages' },
  { value: 'english', label: 'English' },
  { value: 'hindi', label: 'हिंदी' },
  { value: 'tamil', label: 'தமிழ்' },
  { value: 'telugu', label: 'తెలుగు' },
  { value: 'bengali', label: 'বাংলা' },
];

export function ResourcesHub() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [activeTab, setActiveTab] = useState('videos');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center justify-center w-16 h-16 soulace-gradient rounded-2xl mb-4"
        >
          <BookOpen className="w-8 h-8 text-white" />
        </motion.div>
        <h1 className="text-2xl font-bold mb-2">Wellness Resource Hub</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Access educational content, guided meditations, and wellness resources in your preferred language
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    <div className="flex items-center">
                      <category.icon className="w-4 h-4 mr-2" />
                      {category.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-full md:w-40">
                <Globe className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((language) => (
                  <SelectItem key={language.value} value={language.value}>
                    {language.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Resource Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="videos" className="flex items-center">
            <Play className="w-4 h-4 mr-2" />
            Videos
          </TabsTrigger>
          <TabsTrigger value="audio" className="flex items-center">
            <Headphones className="w-4 h-4 mr-2" />
            Audio
          </TabsTrigger>
          <TabsTrigger value="articles" className="flex items-center">
            <BookOpen className="w-4 h-4 mr-2" />
            Articles
          </TabsTrigger>
        </TabsList>

        {/* Videos Tab */}
        <TabsContent value="videos" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:soulace-shadow transition-shadow cursor-pointer group">
                  <div className="relative">
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-green-100 rounded-t-lg flex items-center justify-center">
                      <Play className="w-12 h-12 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <Badge className="absolute top-2 right-2 bg-black/70 text-white">
                      {video.duration}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {video.category}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {video.language}
                      </Badge>
                    </div>
                    <h3 className="font-medium text-sm mb-1 line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                      {video.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{video.views} views</span>
                      <Button size="sm" variant="ghost" className="h-6 px-2">
                        Watch
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Audio Tab */}
        <TabsContent value="audio" className="space-y-4">
          <div className="grid gap-4">
            {audioGuides.map((audio, index) => (
              <motion.div
                key={audio.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:soulace-shadow transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 soulace-gradient rounded-lg flex items-center justify-center">
                        <Headphones className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium text-sm truncate">{audio.title}</h3>
                          <Badge variant="outline" className="text-xs shrink-0">
                            {audio.language}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {audio.duration}
                          </span>
                          <span>{audio.downloads} downloads</span>
                          <Badge variant="secondary" className="text-xs">
                            {audio.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Play className="w-3 h-3 mr-1" />
                          Play
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Articles Tab */}
        <TabsContent value="articles" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:soulace-shadow transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="outline" className="text-xs">
                        {article.category}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {article.language}
                      </Badge>
                    </div>
                    <h3 className="font-medium mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {article.readTime}
                      </span>
                      <Button size="sm" variant="ghost" className="text-primary">
                        Read More →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Featured Section */}
      <Card className="soulace-gradient text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold mb-2">Weekly Featured Content</h3>
              <p className="text-white/80 text-sm mb-4">
                "Mindfulness for Students" - A comprehensive 30-minute guided session
              </p>
              <Button variant="secondary" size="sm">
                <Play className="w-4 h-4 mr-2" />
                Watch Now
              </Button>
            </div>
            <div className="hidden md:block">
              <div className="w-24 h-24 bg-white/20 rounded-lg flex items-center justify-center">
                <Heart className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom padding for mobile */}
      <div className="h-20 md:h-0" />
    </div>
  );
}