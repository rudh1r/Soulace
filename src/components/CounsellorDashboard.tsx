import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Phone, 
  Video, 
  Send,
  MoreVertical,
  Star,
  Calendar,
  FileText,
  BarChart3,
  Settings,
  Bell,
  User,
  Heart,
  Shield,
  Headphones
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Progress } from './ui/progress';

interface Student {
  id: string;
  name: string;
  avatar?: string;
  status: 'waiting' | 'chatting' | 'completed';
  waitTime: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  concerns: string[];
  previousSessions: number;
  lastActive: Date;
  language: string;
}

interface ChatSession {
  id: string;
  student: Student;
  startTime: Date;
  messages: Message[];
  status: 'active' | 'ended';
  notes: string;
  duration: number;
}

interface Message {
  id: string;
  content: string;
  sender: 'student' | 'counsellor';
  timestamp: Date;
  type: 'text' | 'system';
}

const mockQueue: Student[] = [
  {
    id: '1',
    name: 'Arjun M.',
    avatar: '👨‍🎓',
    status: 'waiting',
    waitTime: 15,
    priority: 'high',
    concerns: ['Anxiety', 'Academic Stress'],
    previousSessions: 3,
    lastActive: new Date(),
    language: 'English'
  },
  {
    id: '2',
    name: 'Priya S.',
    avatar: '👩‍🎓',
    status: 'waiting',
    waitTime: 8,
    priority: 'medium',
    concerns: ['Depression', 'Family Issues'],
    previousSessions: 1,
    lastActive: new Date(),
    language: 'Hindi'
  },
  {
    id: '3',
    name: 'Ravi K.',
    avatar: '👨‍💻',
    status: 'waiting',
    waitTime: 22,
    priority: 'urgent',
    concerns: ['Crisis Support', 'Suicidal Thoughts'],
    previousSessions: 0,
    lastActive: new Date(),
    language: 'Tamil'
  }
];

export function CounsellorDashboard() {
  const [activeSession, setActiveSession] = useState<ChatSession | null>(null);
  const [queuedStudents, setQueuedStudents] = useState<Student[]>(mockQueue);
  const [isAvailable, setIsAvailable] = useState(true);
  const [currentMessage, setCurrentMessage] = useState('');
  const [sessionNotes, setSessionNotes] = useState('');
  const [selectedTab, setSelectedTab] = useState('queue');

  const counsellorStats = {
    sessionsToday: 8,
    averageRating: 4.9,
    totalSessions: 247,
    averageSessionTime: '32 min',
    responseTime: '< 2 min',
    satisfaction: 96
  };

  const recentSessions = [
    {
      id: '1',
      studentName: 'Anonymous Student',
      duration: '45 min',
      rating: 5,
      concerns: ['Anxiety', 'Academic Stress'],
      completedAt: '2 hours ago'
    },
    {
      id: '2',
      studentName: 'Anonymous Student',
      duration: '30 min',
      rating: 5,
      concerns: ['Relationship Issues'],
      completedAt: '4 hours ago'
    },
    {
      id: '3',
      studentName: 'Anonymous Student',
      duration: '52 min',
      rating: 4,
      concerns: ['Depression', 'Career Guidance'],
      completedAt: '1 day ago'
    }
  ];

  const startSession = (student: Student) => {
    const session: ChatSession = {
      id: Date.now().toString(),
      student,
      startTime: new Date(),
      messages: [
        {
          id: '1',
          content: `Hi ${student.name.split(' ')[0]}, I'm here to support you today. Thank you for reaching out. How are you feeling right now?`,
          sender: 'counsellor',
          timestamp: new Date(),
          type: 'text'
        }
      ],
      status: 'active',
      notes: '',
      duration: 0
    };

    setActiveSession(session);
    setQueuedStudents(prev => prev.filter(s => s.id !== student.id));
    setSelectedTab('chat');
  };

  const sendMessage = () => {
    if (!currentMessage.trim() || !activeSession) return;

    const message: Message = {
      id: Date.now().toString(),
      content: currentMessage,
      sender: 'counsellor',
      timestamp: new Date(),
      type: 'text'
    };

    setActiveSession(prev => prev ? {
      ...prev,
      messages: [...prev.messages, message]
    } : null);
    setCurrentMessage('');
  };

  const endSession = () => {
    if (activeSession) {
      setActiveSession(prev => prev ? { ...prev, status: 'ended' } : null);
      // In real app, save session data
      setTimeout(() => {
        setActiveSession(null);
        setSessionNotes('');
        setSelectedTab('queue');
      }, 2000);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      default: return 'bg-blue-500 text-white';
    }
  };

  const getPriorityIcon = (priority: string) => {
    if (priority === 'urgent') return <AlertCircle className="h-3 w-3" />;
    if (priority === 'high') return <Clock className="h-3 w-3" />;
    return null;
  };

  return (
    <div className="min-h-screen p-4 md:p-6 space-y-6 pb-24 md:pb-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="soulace-text-gradient text-xl md:text-2xl">Counsellor Dashboard</h1>
          <p className="text-muted-foreground">Manage your sessions and support students</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm">Available</span>
            <Switch
              checked={isAvailable}
              onCheckedChange={setIsAvailable}
            />
          </div>
          <Badge className={isAvailable ? 'bg-green-500' : 'bg-gray-500'}>
            {isAvailable ? 'Online' : 'Offline'}
          </Badge>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{counsellorStats.sessionsToday}</div>
            <div className="text-xs text-muted-foreground">Sessions Today</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{counsellorStats.averageRating}</div>
            <div className="text-xs text-muted-foreground">Avg Rating</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{counsellorStats.averageSessionTime}</div>
            <div className="text-xs text-muted-foreground">Avg Duration</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <MessageCircle className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{counsellorStats.responseTime}</div>
            <div className="text-xs text-muted-foreground">Response Time</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{counsellorStats.satisfaction}%</div>
            <div className="text-xs text-muted-foreground">Satisfaction</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <BarChart3 className="h-8 w-8 text-indigo-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{counsellorStats.totalSessions}</div>
            <div className="text-xs text-muted-foreground">Total Sessions</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="queue">
            Queue ({queuedStudents.length})
          </TabsTrigger>
          <TabsTrigger value="chat" disabled={!activeSession}>
            Active Chat
          </TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="queue" className="space-y-4">
          {queuedStudents.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">No students in queue</h3>
                <p className="text-muted-foreground">Students will appear here when they request support</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {queuedStudents
                .sort((a, b) => {
                  const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
                  return priorityOrder[b.priority] - priorityOrder[a.priority];
                })
                .map((student) => (
                  <Card key={student.id} className="hover:soulace-shadow transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={student.avatar} />
                            <AvatarFallback>{student.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">{student.name}</h4>
                              <Badge className={getPriorityColor(student.priority)}>
                                {getPriorityIcon(student.priority)}
                                <span className="ml-1 capitalize">{student.priority}</span>
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>Waiting: {student.waitTime} min</span>
                              <span>Language: {student.language}</span>
                              <span>Previous: {student.previousSessions} sessions</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex flex-wrap gap-1 mb-2">
                            {student.concerns.map((concern) => (
                              <Badge key={concern} variant="outline" className="text-xs">
                                {concern}
                              </Badge>
                            ))}
                          </div>
                          <Button
                            onClick={() => startSession(student)}
                            disabled={!isAvailable}
                            className="soulace-gradient text-white"
                          >
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Start Session
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="chat" className="space-y-4">
          {!activeSession ? (
            <Card>
              <CardContent className="p-8 text-center">
                <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">No active session</h3>
                <p className="text-muted-foreground">Start a session from the queue to begin chatting</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {/* Chat Area */}
              <div className="md:col-span-2">
                <Card className="h-[600px] flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={activeSession.student.avatar} />
                          <AvatarFallback>{activeSession.student.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{activeSession.student.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            <span>Active session</span>
                            <span>•</span>
                            <span>{Math.floor((Date.now() - activeSession.startTime.getTime()) / 60000)} min</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Video className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={endSession}>
                          End Session
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col">
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                      {activeSession.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'counsellor' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs p-3 rounded-lg ${
                              message.sender === 'counsellor'
                                ? 'soulace-gradient text-white'
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${
                              message.sender === 'counsellor' ? 'text-white/70' : 'text-muted-foreground'
                            }`}>
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Message Input */}
                    <div className="flex gap-2">
                      <Input
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        placeholder="Type your response..."
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        className="flex-1"
                      />
                      <Button onClick={sendMessage} disabled={!currentMessage.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Session Info & Notes */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Student Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Concerns</label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {activeSession.student.concerns.map((concern) => (
                          <Badge key={concern} variant="outline" className="text-xs">
                            {concern}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Previous Sessions</label>
                      <p className="text-sm text-muted-foreground">{activeSession.student.previousSessions}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Language</label>
                      <p className="text-sm text-muted-foreground">{activeSession.student.language}</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Session Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={sessionNotes}
                      onChange={(e) => setSessionNotes(e.target.value)}
                      placeholder="Add notes about this session..."
                      className="min-h-[200px]"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="grid gap-4">
            {recentSessions.map((session) => (
              <Card key={session.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{session.studentName}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span>Duration: {session.duration}</span>
                        <span>{session.completedAt}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {session.concerns.map((concern) => (
                          <Badge key={concern} variant="outline" className="text-xs">
                            {concern}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < session.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Session Notes & Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Quick Resources</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {[
                    'Anxiety Techniques',
                    'Depression Support',
                    'Crisis Intervention',
                    'Mindfulness Exercises',
                    'Academic Stress',
                    'Relationship Issues'
                  ].map((resource) => (
                    <Button key={resource} variant="outline" size="sm" className="text-xs">
                      {resource}
                    </Button>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <label className="text-sm font-medium">Personal Notes</label>
                <Textarea
                  placeholder="Add your personal notes, reminders, or observations..."
                  className="min-h-[300px] mt-2"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}