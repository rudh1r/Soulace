import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Send, 
  Phone, 
  Video, 
  MoreVertical, 
  Clock, 
  User, 
  Shield, 
  AlertCircle,
  CheckCircle,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  PhoneOff,
  Users,
  Star,
  Heart
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

interface Message {
  id: string;
  content: string;
  sender: 'student' | 'counsellor';
  timestamp: Date;
  type: 'text' | 'system';
  readBy?: string[];
}

interface Counsellor {
  id: string;
  name: string;
  avatar?: string;
  specialization: string[];
  rating: number;
  status: 'available' | 'busy' | 'offline';
  responseTime: string;
  languages: string[];
  experience: string;
}

interface ChatSession {
  id: string;
  counsellor: Counsellor;
  status: 'waiting' | 'connected' | 'ended';
  startTime?: Date;
  queuePosition?: number;
  estimatedWaitTime?: number;
}

const availableCounsellors: Counsellor[] = [
  {
    id: '1',
    name: 'Dr. Priya Sharma',
    avatar: '👩‍⚕️',
    specialization: ['Anxiety', 'Depression', 'Academic Stress'],
    rating: 4.9,
    status: 'available',
    responseTime: '< 2 mins',
    languages: ['English', 'Hindi', 'Tamil'],
    experience: '8 years'
  },
  {
    id: '2',
    name: 'Dr. Rajesh Kumar',
    avatar: '👨‍⚕️',
    specialization: ['Relationship Issues', 'Family Counseling', 'Career Guidance'],
    rating: 4.8,
    status: 'busy',
    responseTime: '< 5 mins',
    languages: ['English', 'Hindi', 'Bengali'],
    experience: '12 years'
  },
  {
    id: '3',
    name: 'Dr. Ananya Reddy',
    avatar: '👩‍💼',
    specialization: ['Trauma', 'PTSD', 'Mindfulness'],
    rating: 4.9,
    status: 'available',
    responseTime: '< 3 mins',
    languages: ['English', 'Telugu', 'Hindi'],
    experience: '6 years'
  }
];

export function LiveCounsellorChat() {
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [showCounsellorList, setShowCounsellorList] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceCall, setIsVoiceCall] = useState(false);
  const [isVideoCall, setIsVideoCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate real-time counsellor responses
  useEffect(() => {
    if (currentSession?.status === 'connected' && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.sender === 'student') {
        setIsTyping(true);
        const timer = setTimeout(() => {
          setIsTyping(false);
          addCounsellorResponse();
        }, 2000 + Math.random() * 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [messages, currentSession]);

  const addCounsellorResponse = () => {
    const responses = [
      "I understand how you're feeling. Thank you for sharing that with me.",
      "That sounds really challenging. Can you tell me more about when this started?",
      "You're taking a brave step by reaching out. Let's work through this together.",
      "I hear you, and your feelings are completely valid. Have you experienced this before?",
      "That's a lot to handle. What kind of support do you have around you?",
      "It takes courage to open up about these feelings. How has this been affecting your daily life?",
      "I'm here to support you through this. What would feel most helpful right now?"
    ];

    const response = responses[Math.floor(Math.random() * responses.length)];
    
    const newMessage: Message = {
      id: Date.now().toString(),
      content: response,
      sender: 'counsellor',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, newMessage]);
  };

  const connectToCounsellor = (counsellor: Counsellor) => {
    setIsConnecting(true);
    setShowCounsellorList(false);

    // Simulate connection process
    setTimeout(() => {
      if (counsellor.status === 'available') {
        const session: ChatSession = {
          id: Date.now().toString(),
          counsellor,
          status: 'connected',
          startTime: new Date()
        };
        setCurrentSession(session);

        // Add welcome message
        const welcomeMessage: Message = {
          id: 'welcome',
          content: `Hi! I'm ${counsellor.name}. I'm here to support you today. How are you feeling?`,
          sender: 'counsellor',
          timestamp: new Date(),
          type: 'text'
        };
        setMessages([welcomeMessage]);
      } else {
        // Add to queue
        const session: ChatSession = {
          id: Date.now().toString(),
          counsellor,
          status: 'waiting',
          queuePosition: Math.floor(Math.random() * 3) + 1,
          estimatedWaitTime: Math.floor(Math.random() * 10) + 5
        };
        setCurrentSession(session);
      }
      setIsConnecting(false);
    }, 2000);
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !currentSession) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'student',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const endSession = () => {
    if (currentSession) {
      setCurrentSession({ ...currentSession, status: 'ended' });
      const endMessage: Message = {
        id: 'end',
        content: 'Session ended. Thank you for talking with me today. Take care!',
        sender: 'counsellor',
        timestamp: new Date(),
        type: 'system'
      };
      setMessages(prev => [...prev, endMessage]);
    }
  };

  const startVoiceCall = () => {
    setIsVoiceCall(true);
  };

  const startVideoCall = () => {
    setIsVideoCall(true);
    setIsCameraOff(false);
  };

  const endCall = () => {
    setIsVoiceCall(false);
    setIsVideoCall(false);
    setIsMuted(false);
    setIsCameraOff(false);
  };

  if (!currentSession) {
    return (
      <div className="min-h-screen p-4 md:p-6 space-y-6 pb-24 md:pb-4">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 soulace-gradient rounded-xl">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h1 className="soulace-text-gradient text-xl md:text-2xl">Talk to a Counsellor</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Connect with qualified mental health professionals who understand your cultural context
          </p>
        </div>

        {/* Crisis Support Alert */}
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Crisis Support:</strong> If you're in immediate danger or having thoughts of self-harm, 
            please call <strong>KIRAN (1800-599-0019)</strong> or contact emergency services immediately.
          </AlertDescription>
        </Alert>

        {/* Available Counsellors */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Available Counsellors</h2>
            <Badge variant="secondary" className="bg-green-50 text-green-700">
              {availableCounsellors.filter(c => c.status === 'available').length} Available Now
            </Badge>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {availableCounsellors.map((counsellor) => (
              <Card key={counsellor.id} className="hover:soulace-shadow transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={counsellor.avatar} />
                      <AvatarFallback className="text-lg">{counsellor.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{counsellor.name}</h3>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={counsellor.status === 'available' ? 'default' : 'secondary'}
                          className={counsellor.status === 'available' ? 'bg-green-500' : ''}
                        >
                          {counsellor.status === 'available' ? 'Available' : 
                           counsellor.status === 'busy' ? 'Busy' : 'Offline'}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500" fill="currentColor" />
                          <span className="text-xs text-muted-foreground">{counsellor.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Specialization</p>
                    <div className="flex flex-wrap gap-1">
                      {counsellor.specialization.slice(0, 2).map((spec) => (
                        <Badge key={spec} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                      {counsellor.specialization.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{counsellor.specialization.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="text-muted-foreground">Response Time</p>
                      <p className="font-medium">{counsellor.responseTime}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Experience</p>
                      <p className="font-medium">{counsellor.experience}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Languages</p>
                    <p className="text-xs">{counsellor.languages.join(', ')}</p>
                  </div>

                  <Button
                    onClick={() => connectToCounsellor(counsellor)}
                    className="w-full"
                    disabled={isConnecting || counsellor.status === 'offline'}
                  >
                    {isConnecting ? (
                      'Connecting...'
                    ) : counsellor.status === 'available' ? (
                      <>
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Start Chat
                      </>
                    ) : counsellor.status === 'busy' ? (
                      <>
                        <Clock className="w-4 h-4 mr-2" />
                        Join Queue
                      </>
                    ) : (
                      'Offline'
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How it Works */}
        <Card className="bg-gradient-to-r from-blue-50 to-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Your Privacy & Safety
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Confidential & Secure</p>
                  <p className="text-muted-foreground">All conversations are encrypted and confidential</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Licensed Professionals</p>
                  <p className="text-muted-foreground">All counsellors are qualified and licensed</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Cultural Understanding</p>
                  <p className="text-muted-foreground">Counsellors understand Indian cultural context</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentSession.status === 'waiting') {
    return (
      <div className="min-h-screen p-4 md:p-6 pb-24 md:pb-4">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto soulace-gradient rounded-full flex items-center justify-center mb-4">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <CardTitle>You're in the queue</CardTitle>
            <p className="text-muted-foreground">
              Connecting you with {currentSession.counsellor.name}
            </p>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="space-y-2">
              <p className="text-sm">
                Position in queue: <strong>#{currentSession.queuePosition}</strong>
              </p>
              <p className="text-sm text-muted-foreground">
                Estimated wait time: {currentSession.estimatedWaitTime} minutes
              </p>
            </div>
            
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-8 h-8 mx-auto bg-primary/20 rounded-full flex items-center justify-center"
            >
              <div className="w-4 h-4 bg-primary rounded-full" />
            </motion.div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please stay on this page. You'll be connected automatically when it's your turn.
              </AlertDescription>
            </Alert>

            <Button variant="outline" onClick={() => setCurrentSession(null)}>
              Leave Queue
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pb-24 md:pb-4">
      {/* Chat Header */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={currentSession.counsellor.avatar} />
              <AvatarFallback>{currentSession.counsellor.avatar}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{currentSession.counsellor.name}</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-xs text-muted-foreground">Online</span>
                {isTyping && (
                  <span className="text-xs text-primary">typing...</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={startVoiceCall}
              disabled={isVoiceCall || isVideoCall}
            >
              <Phone className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={startVideoCall}
              disabled={isVoiceCall || isVideoCall}
            >
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={endSession}>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Call Controls */}
        {(isVoiceCall || isVideoCall) && (
          <div className="px-4 pb-4">
            <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isVideoCall ? (
                      <Video className="h-4 w-4" />
                    ) : (
                      <Phone className="h-4 w-4" />
                    )}
                    <span className="text-sm font-medium">
                      {isVideoCall ? 'Video Call' : 'Voice Call'} Active
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {isVideoCall && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsCameraOff(!isCameraOff)}
                        className="text-white hover:bg-white/20"
                      >
                        {isCameraOff ? <CameraOff className="h-4 w-4" /> : <Camera className="h-4 w-4" />}
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-white hover:bg-white/20"
                    >
                      {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={endCall}
                      className="text-white hover:bg-red-500/20"
                    >
                      <PhoneOff className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.sender === 'student' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs md:max-w-md p-3 rounded-lg ${
                  message.sender === 'student'
                    ? 'soulace-gradient text-white'
                    : message.type === 'system'
                    ? 'bg-muted text-muted-foreground text-center'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'student' ? 'text-white/70' : 'text-muted-foreground'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-muted p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1"
          />
          <Button onClick={sendMessage} disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          This conversation is confidential and secure. 
          <Heart className="inline h-3 w-3 mx-1 text-red-500" />
        </p>
      </div>
    </div>
  );
}