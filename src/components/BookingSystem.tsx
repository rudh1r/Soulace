import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Video, 
  MapPin, 
  CheckCircle,
  AlertCircle,
  Plus
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Alert, AlertDescription } from './ui/alert';

const counselors = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Anxiety & Stress Management',
    experience: '8 years',
    rating: 4.9,
    available: true,
    image: '/placeholder-therapist-1.jpg'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Depression & Mood Disorders',
    experience: '12 years',
    rating: 4.8,
    available: true,
    image: '/placeholder-therapist-2.jpg'
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Academic Pressure & ADHD',
    experience: '6 years',
    rating: 4.9,
    available: false,
    image: '/placeholder-therapist-3.jpg'
  }
];

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
];

const emergencyServices = [
  {
    title: 'Crisis Hotline',
    description: '24/7 immediate support',
    contact: 'Call (555) 123-4567',
    available: true
  },
  {
    title: 'Emergency Chat',
    description: 'Live chat with crisis counselor',
    contact: 'Start Chat',
    available: true
  },
  {
    title: 'Campus Security',
    description: 'For immediate safety concerns',
    contact: 'Call (555) 911-0000',
    available: true
  }
];

export function BookingSystem() {
  const [selectedCounselor, setSelectedCounselor] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [sessionType, setSessionType] = useState('');
  const [reason, setReason] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleBooking = () => {
    if (selectedCounselor && selectedDate && selectedTime && sessionType) {
      setShowConfirmation(true);
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (showConfirmation) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto"
      >
        <Card className="text-center soulace-shadow">
          <CardContent className="p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 soulace-gradient rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-xl font-bold mb-2">Appointment Confirmed!</h2>
            <p className="text-muted-foreground mb-6">
              Your session has been successfully scheduled. You'll receive a confirmation email shortly.
            </p>
            <div className="space-y-2 text-sm text-left bg-muted/30 p-4 rounded-lg mb-6">
              <div className="flex justify-between">
                <span>Counselor:</span>
                <span className="font-medium">
                  {counselors.find(c => c.id === selectedCounselor)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span className="font-medium">{selectedDate}</span>
              </div>
              <div className="flex justify-between">
                <span>Time:</span>
                <span className="font-medium">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span>Type:</span>
                <span className="font-medium">{sessionType}</span>
              </div>
            </div>
            <Button
              onClick={() => setShowConfirmation(false)}
              className="w-full soulace-gradient"
            >
              Book Another Session
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Emergency Notice */}
      <Alert className="border-red-200 bg-red-50">
        <AlertCircle className="h-4 w-4 text-red-600" />
        <AlertDescription>
          <div className="flex items-center justify-between">
            <span className="text-red-800">
              In crisis? Need immediate help?
            </span>
            <Button size="sm" variant="outline" className="text-red-600 border-red-300">
              Get Help Now
            </Button>
          </div>
        </AlertDescription>
      </Alert>

      {/* Emergency Services */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-red-600">
            <Phone className="w-5 h-5 mr-2" />
            Emergency Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {emergencyServices.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium text-sm">{service.title}</h4>
                  <p className="text-xs text-muted-foreground">{service.description}</p>
                </div>
                <Button size="sm" variant="outline" className="text-red-600">
                  {service.contact}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Booking Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-primary" />
            Schedule Counseling Session
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Session Type */}
          <div className="space-y-3">
            <Label>Session Type</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { value: 'video', label: 'Video Call', icon: Video, desc: 'Secure online session' },
                { value: 'phone', label: 'Phone Call', icon: Phone, desc: 'Voice-only session' },
                { value: 'in-person', label: 'In-Person', icon: MapPin, desc: 'Campus office visit' }
              ].map((type) => (
                <Button
                  key={type.value}
                  variant={sessionType === type.value ? "default" : "outline"}
                  onClick={() => setSessionType(type.value)}
                  className={`h-auto p-4 flex flex-col items-center space-y-2 ${
                    sessionType === type.value ? 'soulace-gradient' : ''
                  }`}
                >
                  <type.icon className="w-5 h-5" />
                  <div className="text-center">
                    <p className="text-sm font-medium">{type.label}</p>
                    <p className="text-xs opacity-70">{type.desc}</p>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Counselor Selection */}
          <div className="space-y-3">
            <Label>Choose Your Counselor</Label>
            <div className="grid gap-3">
              {counselors.map((counselor) => (
                <motion.div
                  key={counselor.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant={selectedCounselor === counselor.id ? "default" : "outline"}
                    onClick={() => counselor.available && setSelectedCounselor(counselor.id)}
                    disabled={!counselor.available}
                    className={`w-full h-auto p-4 justify-start ${
                      selectedCounselor === counselor.id ? 'soulace-gradient' : ''
                    } ${!counselor.available ? 'opacity-50' : ''}`}
                  >
                    <div className="flex items-center space-x-4 w-full">
                      <div className={`w-12 h-12 ${
                        selectedCounselor === counselor.id ? 'bg-white/20' : 'bg-muted'
                      } rounded-full flex items-center justify-center`}>
                        <User className={`w-6 h-6 ${
                          selectedCounselor === counselor.id ? 'text-white' : 'text-muted-foreground'
                        }`} />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{counselor.name}</h3>
                          {!counselor.available && (
                            <Badge variant="secondary">Unavailable</Badge>
                          )}
                        </div>
                        <p className={`text-sm ${
                          selectedCounselor === counselor.id ? 'text-white/80' : 'text-muted-foreground'
                        }`}>
                          {counselor.specialty}
                        </p>
                        <p className={`text-xs ${
                          selectedCounselor === counselor.id ? 'text-white/60' : 'text-muted-foreground/60'
                        }`}>
                          {counselor.experience} • ⭐ {counselor.rating}
                        </p>
                      </div>
                    </div>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Preferred Date</Label>
              <Input
                id="date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={getTomorrowDate()}
              />
            </div>
            <div className="space-y-2">
              <Label>Preferred Time</Label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Reason */}
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Session (Optional)</Label>
            <Textarea
              id="reason"
              placeholder="Briefly describe what you'd like to discuss..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
            />
          </div>

          {/* Urgency */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="urgent"
              checked={isUrgent}
              onChange={(e) => setIsUrgent(e.target.checked)}
              className="rounded border-border"
            />
            <Label htmlFor="urgent" className="text-sm">
              This is urgent (within 24 hours)
            </Label>
          </div>

          {/* Submit */}
          <Button
            onClick={handleBooking}
            disabled={!selectedCounselor || !selectedDate || !selectedTime || !sessionType}
            className="w-full soulace-gradient"
          >
            <Plus className="w-4 h-4 mr-2" />
            Schedule Appointment
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            All sessions are confidential and follow strict privacy guidelines.
            You'll receive a confirmation email with session details.
          </p>
        </CardContent>
      </Card>

      {/* Bottom padding for mobile */}
      <div className="h-20 md:h-0" />
    </div>
  );
}