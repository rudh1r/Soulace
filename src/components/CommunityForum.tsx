import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Users, Heart, Reply, Search, Filter } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  avatar: string;
  timestamp: string;
  replies: number;
  likes: number;
  category: string;
  tags: string[];
  isAnonymous?: boolean;
}

const mockPosts: ForumPost[] = [
  {
    id: '1',
    title: 'Dealing with exam stress - need advice',
    content: 'Hey everyone, I\'m really struggling with stress as my final exams approach. Any tips on managing anxiety would be appreciated.',
    author: 'Anonymous',
    avatar: '',
    timestamp: '2 hours ago',
    replies: 12,
    likes: 8,
    category: 'Stress Management',
    tags: ['exams', 'anxiety', 'stress'],
    isAnonymous: true
  },
  {
    id: '2',
    title: 'Meditation techniques that actually work',
    content: 'I wanted to share some meditation techniques that have really helped me with my mental health journey.',
    author: 'Priya S.',
    avatar: 'PS',
    timestamp: '5 hours ago',
    replies: 23,
    likes: 15,
    category: 'Wellness',
    tags: ['meditation', 'mindfulness', 'self-care']
  },
  {
    id: '3',
    title: 'Finding balance between studies and social life',
    content: 'How do you all manage to maintain friendships while keeping up with academic demands?',
    author: 'Rahul M.',
    avatar: 'RM',
    timestamp: '1 day ago',
    replies: 18,
    likes: 11,
    category: 'Life Balance',
    tags: ['studies', 'social', 'balance']
  }
];

const categories = [
  'All',
  'Stress Management',
  'Wellness',
  'Life Balance',
  'Academic Pressure',
  'Relationships',
  'Mental Health'
];

export function CommunityForum() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [posts] = useState<ForumPost[]>(mockPosts);

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="p-3 soulace-gradient rounded-xl">
            <Users className="h-6 w-6 text-white" />
          </div>
          <h1 className="soulace-text-gradient">Community Forum</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Connect with fellow students, share experiences, and find support in a safe, anonymous space
        </p>
      </div>

      {/* Search and Create Post */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search discussions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button className="soulace-gradient text-white">
          <MessageCircle className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "secondary"}
            className={`cursor-pointer transition-colors ${
              selectedCategory === category 
                ? 'soulace-gradient text-white' 
                : 'hover:bg-accent'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      {/* Forum Posts */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <Card className="p-8 text-center">
            <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No posts found matching your criteria.</p>
          </Card>
        ) : (
          filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6 hover:soulace-shadow transition-shadow cursor-pointer">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10 soulace-gradient text-white">
                    {post.isAnonymous ? '?' : post.avatar}
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-medium mb-2 line-clamp-2">{post.title}</h3>
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-3">
                          {post.content}
                        </p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                        
                        {/* Post metadata */}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{post.author}</span>
                          <span>{post.timestamp}</span>
                          <div className="flex items-center gap-1">
                            <Reply className="h-3 w-3" />
                            <span>{post.replies}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            <span>{post.likes}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Badge variant="secondary">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Safety Notice */}
      <Card className="p-4 bg-blue-50/50 border-blue-200">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <MessageCircle className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Community Guidelines</h4>
            <p className="text-sm text-blue-800">
              This is a safe space for students to share and support each other. Please be respectful, 
              avoid sharing personal information, and report any inappropriate content.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}