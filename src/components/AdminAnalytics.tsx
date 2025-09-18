import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Tooltip, Legend
} from 'recharts';
import { 
  Shield, Users, MessageSquare, BookOpen, Activity, 
  TrendingUp, Calendar, Filter, Download, AlertTriangle 
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

// Mock data for analytics
const userEngagementData = [
  { month: 'Jan', activeUsers: 245, newUsers: 52, sessions: 1840 },
  { month: 'Feb', activeUsers: 289, newUsers: 67, sessions: 2156 },
  { month: 'Mar', activeUsers: 334, newUsers: 89, sessions: 2543 },
  { month: 'Apr', activeUsers: 387, newUsers: 94, sessions: 2867 },
  { month: 'May', activeUsers: 423, newUsers: 76, sessions: 3124 },
  { month: 'Jun', activeUsers: 456, newUsers: 82, sessions: 3456 }
];

const featureUsageData = [
  { name: 'AI Chat', value: 35, color: '#3b82f6' },
  { name: 'Journaling', value: 25, color: '#10b981' },
  { name: 'Resources', value: 20, color: '#f59e0b' },
  { name: 'Booking', value: 12, color: '#ef4444' },
  { name: 'Community', value: 8, color: '#8b5cf6' }
];

const wellnessMetrics = [
  { week: 'Week 1', moodScore: 6.2, stressLevel: 4.1, engagementRate: 78 },
  { week: 'Week 2', moodScore: 6.5, stressLevel: 3.9, engagementRate: 81 },
  { week: 'Week 3', moodScore: 6.8, stressLevel: 3.7, engagementRate: 85 },
  { week: 'Week 4', moodScore: 7.1, stressLevel: 3.4, engagementRate: 88 }
];

const crisisAlerts = [
  {
    id: '1',
    type: 'high-risk',
    message: 'User reported severe anxiety symptoms',
    timestamp: '2 hours ago',
    status: 'pending',
    severity: 'high'
  },
  {
    id: '2',
    type: 'medium-risk',
    message: 'Multiple stress indicators detected',
    timestamp: '5 hours ago',
    status: 'reviewed',
    severity: 'medium'
  },
  {
    id: '3',
    type: 'low-risk',
    message: 'Mood tracking shows downward trend',
    timestamp: '1 day ago',
    status: 'resolved',
    severity: 'low'
  }
];

export function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState('6m');
  const [selectedMetric, setSelectedMetric] = useState('all');

  const stats = [
    {
      title: 'Total Active Users',
      value: '1,247',
      change: '+12.5%',
      trend: 'up',
      icon: Users
    },
    {
      title: 'Crisis Interventions',
      value: '23',
      change: '-8.2%',
      trend: 'down',
      icon: Shield
    },
    {
      title: 'Resource Access',
      value: '8,542',
      change: '+18.7%',
      trend: 'up',
      icon: BookOpen
    },
    {
      title: 'Community Posts',
      value: '456',
      change: '+24.1%',
      trend: 'up',
      icon: MessageSquare
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-3 mb-2">
            <div className="p-3 soulace-gradient rounded-xl">
              <BarChart className="h-6 w-6 text-white" />
            </div>
            <h1 className="soulace-text-gradient">Admin Analytics</h1>
          </div>
          <p className="text-muted-foreground">
            Anonymous insights into student wellness and platform usage
          </p>
        </div>
        
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">1 Month</SelectItem>
              <SelectItem value="3m">3 Months</SelectItem>
              <SelectItem value="6m">6 Months</SelectItem>
              <SelectItem value="1y">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Icon className="h-5 w-5 text-muted-foreground" />
                <Badge 
                  variant={stat.trend === 'up' ? 'default' : 'secondary'}
                  className={stat.trend === 'up' ? 'text-green-600 bg-green-50' : ''}
                >
                  {stat.change}
                </Badge>
              </div>
              <div className="text-2xl font-semibold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.title}</div>
            </Card>
          );
        })}
      </div>

      {/* Crisis Alerts */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <h3 className="font-medium">Crisis Alerts</h3>
          </div>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        
        <div className="space-y-3">
          {crisisAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border ${
                alert.severity === 'high' ? 'border-red-200 bg-red-50' :
                alert.severity === 'medium' ? 'border-orange-200 bg-orange-50' :
                'border-yellow-200 bg-yellow-50'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge 
                      variant={
                        alert.severity === 'high' ? 'destructive' :
                        alert.severity === 'medium' ? 'default' : 'secondary'
                      }
                      className="text-xs"
                    >
                      {alert.severity.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                  </div>
                  <p className="text-sm">{alert.message}</p>
                </div>
                <Badge 
                  variant={alert.status === 'resolved' ? 'default' : 'secondary'}
                  className={alert.status === 'resolved' ? 'bg-green-100 text-green-800' : ''}
                >
                  {alert.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Analytics Tabs */}
      <Tabs defaultValue="engagement" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="engagement">User Engagement</TabsTrigger>
          <TabsTrigger value="wellness">Wellness Metrics</TabsTrigger>
          <TabsTrigger value="features">Feature Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="engagement" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-medium mb-4">Monthly User Growth</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={userEngagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="activeUsers" 
                    stroke="#3b82f6" 
                    name="Active Users"
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="newUsers" 
                    stroke="#10b981" 
                    name="New Users"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="font-medium mb-4">Session Activity</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={userEngagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sessions" fill="#3b82f6" name="Sessions" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="wellness" className="space-y-4">
          <Card className="p-6">
            <h3 className="font-medium mb-4">Weekly Wellness Trends</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={wellnessMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="moodScore" 
                  stroke="#10b981" 
                  name="Average Mood Score"
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="stressLevel" 
                  stroke="#ef4444" 
                  name="Stress Level"
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="engagementRate" 
                  stroke="#3b82f6" 
                  name="Engagement Rate (%)"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-medium mb-4">Feature Usage Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={featureUsageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {featureUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="font-medium mb-4">Feature Engagement Details</h3>
              <div className="space-y-4">
                {featureUsageData.map((feature, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: feature.color }}
                      />
                      <span className="font-medium">{feature.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{feature.value}%</div>
                      <div className="text-xs text-muted-foreground">of total usage</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Privacy Notice */}
      <Card className="p-4 bg-blue-50/50 border-blue-200">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Privacy & Data Protection</h4>
            <p className="text-sm text-blue-800">
              All data shown is anonymized and aggregated. Individual user information is never 
              accessible through this dashboard. Crisis alerts are handled through secure, 
              confidential channels as per institutional guidelines.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}