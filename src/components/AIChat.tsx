import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Bot, 
  User, 
  Heart, 
  AlertTriangle, 
  Phone, 
  MessageSquare,
  Lightbulb,
  Shield
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Avatar, AvatarFallback } from './ui/avatar';

interface Message {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  urgent?: boolean;
}

const initialMessages: Message[] = [
  {
    id: '1',
    type: 'ai',
    content: "Hi there! I'm SOULACE AI, your mental health support companion. I'm here to listen and provide you with coping strategies. How are you feeling today?",
    timestamp: new Date(),
    suggestions: [
      "I'm feeling stressed about exams",
      "I'm having trouble sleeping",
      "I feel anxious about social situations",
      "I need help managing my time"
    ]
  }
];

const emergencyResources = [
  {
    title: "Campus Counseling Center",
    description: "24/7 support for students",
    contact: "Call (555) 123-4567",
    urgent: true
  },
  {
    title: "Crisis Text Line",
    description: "Text HOME to 741741",
    contact: "Text 741741",
    urgent: true
  },
  {
    title: "Student Mental Health Helpline",
    description: "Confidential support",
    contact: "Call (555) 987-6543",
    urgent: false
  }
];

const copingStrategies = [
  {
    title: "Deep Breathing",
    description: "4-7-8 breathing technique",
    icon: Heart,
    action: "Start Exercise"
  },
  {
    title: "Grounding Technique",
    description: "5-4-3-2-1 sensory method",
    icon: Shield,
    action: "Learn More"
  },
  {
    title: "Quick Meditation",
    description: "3-minute mindfulness",
    icon: Lightbulb,
    action: "Begin Now"
  }
];

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmergencyResources, setShowEmergencyResources] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    // Check for crisis keywords
    const crisisKeywords = ['suicide', 'kill myself', 'end it all', 'hurt myself', 'can\'t go on'];
    const isCrisis = crisisKeywords.some(keyword => content.toLowerCase().includes(keyword));

    if (isCrisis) {
      setShowEmergencyResources(true);
    }

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(content),
        timestamp: new Date(),
        suggestions: generateSuggestions(content),
        urgent: isCrisis
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('stress') || lowerMessage.includes('exam')) {
      return "I understand that exam stress can be overwhelming. It's completely normal to feel this way. Let's work on some strategies to help you manage this stress. First, remember that you're not alone in feeling this way.";
    }
    
    if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia')) {
      return "Sleep issues are very common among students. Creating a consistent bedtime routine and limiting screen time before bed can help. Would you like me to guide you through some relaxation techniques?";
    }
    
    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety')) {
      return "Anxiety can feel overwhelming, but there are effective ways to manage it. Grounding techniques, deep breathing, and regular exercise can all help. Remember, seeking support is a sign of strength, not weakness.";
    }
    
    if (lowerMessage.includes('sad') || lowerMessage.includes('depressed')) {
      return "I'm sorry you're feeling this way. These feelings are valid, and it's important to acknowledge them. Connecting with others, maintaining routines, and engaging in activities you enjoy can help. Have you considered speaking with a counselor?";
    }
    
    return "Thank you for sharing that with me. Your feelings are valid and important. It takes courage to reach out. I'm here to support you through this. What would be most helpful for you right now?";
  };

  const generateSuggestions = (userMessage: string): string[] => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('stress')) {
      return [
        "Show me breathing exercises",
        "I need study strategies",
        "Help me prioritize tasks",
        "Connect me with a counselor"
      ];
    }
    
    if (lowerMessage.includes('sleep')) {
      return [
        "Sleep hygiene tips",
        "Relaxation techniques",
        "Create bedtime routine",
        "Talk to sleep specialist"
      ];
    }
    
    return [
      "Tell me more",
      "Show coping strategies",
      "I need professional help",
      "What should I do now?"
    ];
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10 soulace-gradient">
                <AvatarFallback className="text-white">
                  <Bot className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <span>SOULACE AI Support</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Online
                  </Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Confidential • Available 24/7 • Multilingual
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowEmergencyResources(!showEmergencyResources)}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Crisis Help
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Emergency Resources */}
      <AnimatePresence>
        {showEmergencyResources && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4"
          >
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription>
                <div className="space-y-3">
                  <p className="font-medium text-red-800">
                    If you're in crisis or having thoughts of self-harm, please reach out immediately:
                  </p>
                  <div className="grid gap-2">
                    {emergencyResources.map((resource, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                        <div>
                          <p className="font-medium text-sm">{resource.title}</p>
                          <p className="text-xs text-muted-foreground">{resource.description}</p>
                        </div>
                        <Button size="sm" variant="outline" className="text-red-600">
                          <Phone className="w-3 h-3 mr-1" />
                          {resource.contact.includes('Call') ? 'Call' : 'Text'}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Coping Strategies */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Quick Coping Strategies</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {copingStrategies.map((strategy, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-3 flex items-center space-x-2 hover:soulace-gradient hover:text-white"
            >
              <strategy.icon className="w-4 h-4" />
              <div className="text-left">
                <p className="text-xs font-medium">{strategy.title}</p>
                <p className="text-xs opacity-70">{strategy.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <Card className="flex-1 flex flex-col">
        <CardContent className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-[80%] ${
                  message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className={
                      message.type === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'soulace-gradient text-white'
                    }>
                      {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className={`rounded-2xl p-3 ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  } ${message.urgent ? 'border-2 border-red-200' : ''}`}>
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-start space-x-3"
              >
                <Avatar className="h-8 w-8 soulace-gradient">
                  <AvatarFallback className="text-white">
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-2xl p-3">
                  <div className="flex space-x-1">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                      className="w-2 h-2 bg-muted-foreground rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 bg-muted-foreground rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 bg-muted-foreground rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Suggestions */}
            {messages.length > 0 && messages[messages.length - 1].suggestions && !isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap gap-2"
              >
                {messages[messages.length - 1].suggestions!.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSendMessage(suggestion)}
                    className="text-xs hover:soulace-gradient hover:text-white"
                  >
                    {suggestion}
                  </Button>
                ))}
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </CardContent>

        {/* Input Area */}
        <div className="p-4 border-t">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="flex items-center space-x-2"
          >
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message... (Your conversation is confidential)"
              className="flex-1"
              disabled={isTyping}
            />
            <Button
              type="submit"
              size="sm"
              className="soulace-gradient"
              disabled={!inputValue.trim() || isTyping}
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-2 flex items-center">
            <Shield className="w-3 h-3 mr-1" />
            End-to-end encrypted • Confidential • Not stored permanently
          </p>
        </div>
      </Card>

      {/* Bottom padding for mobile */}
      <div className="h-20 md:h-0" />
    </div>
  );
}