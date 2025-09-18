import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Mail, Phone, Eye, EyeOff, ArrowRight, Upload, FileText, GraduationCap, Stethoscope, CheckCircle, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Textarea } from './ui/textarea';
import { Alert, AlertDescription } from './ui/alert';

interface AuthPageProps {
  onAuth: (user: any) => void;
}

type UserType = 'student' | 'counselor';
type SignupMethod = 'email' | 'phone';
type RegistrationStep = 'user-type' | 'signup-method' | 'form' | 'documents' | 'verification';

export function AuthPage({ onAuth }: AuthPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState<RegistrationStep>('user-type');
  const [userType, setUserType] = useState<UserType>('student');
  const [signupMethod, setSignupMethod] = useState<SignupMethod>('email');
  const [uploadedDocuments, setUploadedDocuments] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    name: '',
    confirmPassword: '',
    institution: '',
    specialization: '',
    licenseNumber: '',
    experience: '',
    bio: ''
  });

  const handleSubmit = async (e: React.FormEvent, type: 'signin' | 'signup') => {
    e.preventDefault();
    setIsLoading(true);
    
    if (type === 'signup' && userType === 'counselor') {
      // For counselors, proceed to document upload
      setCurrentStep('documents');
      setIsLoading(false);
      return;
    }
    
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      onAuth({
        id: '1',
        name: formData.name || 'Student',
        email: formData.email || formData.phone,
        avatar: null,
        userType: userType,
        status: userType === 'counselor' ? 'pending' : 'active'
      });
    }, 2000);
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onAuth({
        id: '1',
        name: 'Google User',
        email: 'user@gmail.com',
        avatar: null,
        userType: 'student',
        status: 'active'
      });
    }, 1500);
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedDocuments(prev => [...prev, ...files]);
  };

  const removeDocument = (index: number) => {
    setUploadedDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const handleCounselorSubmit = () => {
    setIsLoading(true);
    // Simulate document verification process
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep('verification');
    }, 2000);
  };

  const resetToSignIn = () => {
    setCurrentStep('user-type');
    setFormData({
      email: '',
      phone: '',
      password: '',
      name: '',
      confirmPassword: '',
      institution: '',
      specialization: '',
      licenseNumber: '',
      experience: '',
      bio: ''
    });
    setUploadedDocuments([]);
  };

  const renderUserTypeSelection = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-xl soulace-text-gradient mb-2">Choose Your Role</h2>
        <p className="text-muted-foreground text-sm">Select how you'd like to join SOULACE</p>
      </div>

      <RadioGroup value={userType} onValueChange={(value) => setUserType(value as UserType)}>
        <div className="space-y-3">
          <label 
            htmlFor="student" 
            className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
          >
            <RadioGroupItem value="student" id="student" />
            <div className="flex items-center space-x-3 flex-1">
              <div className="p-2 soulace-gradient rounded-lg">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-medium">Student</span>
                <p className="text-sm text-muted-foreground">Access mental health support and resources</p>
              </div>
            </div>
          </label>

          <label 
            htmlFor="counselor" 
            className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
          >
            <RadioGroupItem value="counselor" id="counselor" />
            <div className="flex items-center space-x-3 flex-1">
              <div className="p-2 soulace-gradient rounded-lg">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-medium">Mental Health Counselor</span>
                <p className="text-sm text-muted-foreground">Provide professional support to students</p>
              </div>
            </div>
          </label>
        </div>
      </RadioGroup>

      <Button
        onClick={() => setCurrentStep('signup-method')}
        className="w-full soulace-gradient hover:opacity-90"
      >
        Continue
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </motion.div>
  );

  const renderSignupMethodSelection = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-xl soulace-text-gradient mb-2">How would you like to sign up?</h2>
        <p className="text-muted-foreground text-sm">Choose your preferred registration method</p>
      </div>

      <RadioGroup value={signupMethod} onValueChange={(value) => setSignupMethod(value as SignupMethod)}>
        <div className="space-y-3">
          <label 
            htmlFor="email-method" 
            className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
          >
            <RadioGroupItem value="email" id="email-method" />
            <div className="flex items-center space-x-3 flex-1">
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <span className="font-medium">Email Address</span>
                <p className="text-sm text-muted-foreground">Sign up with your email</p>
              </div>
            </div>
          </label>

          <label 
            htmlFor="phone-method" 
            className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
          >
            <RadioGroupItem value="phone" id="phone-method" />
            <div className="flex items-center space-x-3 flex-1">
              <Phone className="w-5 h-5 text-primary" />
              <div>
                <span className="font-medium">Phone Number</span>
                <p className="text-sm text-muted-foreground">Sign up with your mobile number</p>
              </div>
            </div>
          </label>
        </div>
      </RadioGroup>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={() => setCurrentStep('user-type')}
          className="flex-1"
        >
          Back
        </Button>
        <Button
          onClick={() => setCurrentStep('form')}
          className="flex-1 soulace-gradient hover:opacity-90"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );

  const renderSignupForm = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4"
    >
      <div className="text-center mb-4">
        <h2 className="text-xl soulace-text-gradient mb-1">
          {userType === 'student' ? 'Student Registration' : 'Counselor Registration'}
        </h2>
        <p className="text-muted-foreground text-sm">Fill in your details to create your account</p>
      </div>

      <form onSubmit={(e) => handleSubmit(e, 'signup')} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="signup-name">Full Name *</Label>
          <Input
            id="signup-name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        {signupMethod === 'email' ? (
          <div className="space-y-2">
            <Label htmlFor="signup-email">Email Address *</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="signup-email"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="pl-10"
                required
              />
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="signup-phone">Phone Number *</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="signup-phone"
                type="tel"
                placeholder="+91 9876543210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="pl-10"
                required
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="signup-institution">Institution *</Label>
          <Input
            id="signup-institution"
            type="text"
            placeholder={userType === 'student' ? "Enter your college/university" : "Enter your practice/clinic name"}
            value={formData.institution}
            onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
            required
          />
        </div>

        {userType === 'counselor' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="signup-specialization">Specialization *</Label>
              <Input
                id="signup-specialization"
                type="text"
                placeholder="e.g., Clinical Psychology, Counseling Psychology"
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-license">License Number *</Label>
              <Input
                id="signup-license"
                type="text"
                placeholder="Enter your professional license number"
                value={formData.licenseNumber}
                onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-experience">Years of Experience *</Label>
              <Input
                id="signup-experience"
                type="number"
                placeholder="5"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-bio">Brief Bio</Label>
              <Textarea
                id="signup-bio"
                placeholder="Tell us about your background and approach to mental health counseling..."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={3}
              />
            </div>
          </>
        )}

        <div className="space-y-2">
          <Label htmlFor="signup-password">Password *</Label>
          <div className="relative">
            <Input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-confirm-password">Confirm Password *</Label>
          <Input
            id="signup-confirm-password"
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setCurrentStep('signup-method')}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            type="submit"
            className="flex-1 soulace-gradient hover:opacity-90"
            disabled={isLoading}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              <>
                {userType === 'counselor' ? 'Next: Upload Documents' : 'Create Account'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );

  const renderDocumentUpload = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-xl soulace-text-gradient mb-2">Upload Professional Documents</h2>
        <p className="text-muted-foreground text-sm">Please upload the required documents for verification</p>
      </div>

      <Alert>
        <FileText className="h-4 w-4" />
        <AlertDescription>
          Required documents: Professional license, degree certificate, and current CV.
          Accepted formats: PDF, JPG, PNG (max 5MB each).
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
          <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
          <div className="space-y-2">
            <p className="text-sm">Drag and drop files here, or</p>
            <Button variant="outline" size="sm" asChild>
              <label htmlFor="document-upload" className="cursor-pointer">
                Browse Files
                <input
                  id="document-upload"
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleDocumentUpload}
                  className="hidden"
                />
              </label>
            </Button>
          </div>
        </div>

        {uploadedDocuments.length > 0 && (
          <div className="space-y-2">
            <Label>Uploaded Documents ({uploadedDocuments.length})</Label>
            <div className="space-y-2">
              {uploadedDocuments.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm truncate">{file.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeDocument(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={() => setCurrentStep('form')}
          className="flex-1"
        >
          Back
        </Button>
        <Button
          onClick={handleCounselorSubmit}
          disabled={uploadedDocuments.length === 0 || isLoading}
          className="flex-1 soulace-gradient hover:opacity-90"
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
            />
          ) : (
            <>
              Submit for Review
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );

  const renderVerificationPending = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-6"
    >
      <div className="mx-auto w-16 h-16 soulace-gradient rounded-full flex items-center justify-center">
        <Clock className="w-8 h-8 text-white" />
      </div>
      
      <div>
        <h2 className="text-xl soulace-text-gradient mb-2">Application Submitted!</h2>
        <p className="text-muted-foreground">
          Thank you for applying to become a counselor on SOULACE. Your application and documents 
          are being reviewed by our team.
        </p>
      </div>

      <div className="bg-muted/50 p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>What happens next?</strong><br />
          • Our team will review your credentials (1-3 business days)<br />
          • You'll receive an email with the verification status<br />
          • Once approved, you can start helping students on SOULACE
        </p>
      </div>

      <Button
        onClick={resetToSignIn}
        variant="outline"
        className="w-full"
      >
        Back to Sign In
      </Button>
    </motion.div>
  );

  const renderSignInForm = () => (
    <form onSubmit={(e) => handleSubmit(e, 'signin')} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signin-email">Email or Phone</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="signin-email"
            type="text"
            placeholder="Enter your email or phone"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="signin-password">Password</Label>
        <div className="relative">
          <Input
            id="signin-password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full soulace-gradient hover:opacity-90"
        disabled={isLoading}
      >
        {isLoading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
          />
        ) : (
          <>
            Sign In
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );

  return (
    <div className="min-h-screen soulace-gradient-light flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <img
            src="/logo.jpg"
            alt="Soulace logo"
            className="inline-block w-16 h-16 rounded-2xl object-contain mb-4 shadow"
          />
          <h1 className="text-3xl font-bold soulace-text-gradient">SOULACE</h1>
          <p className="text-muted-foreground mt-1">Your mental wellness journey starts here</p>
        </motion.div>

        <Card className="soulace-shadow border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle>
              {currentStep === 'verification' ? 'Application Status' : 'Welcome'}
            </CardTitle>
            <CardDescription>
              {currentStep === 'verification' 
                ? 'Your counselor application status'
                : 'Join thousands of students and professionals supporting mental health'
              }
            </CardDescription>
          </CardHeader>

          <CardContent>
            {currentStep === 'verification' ? (
              renderVerificationPending()
            ) : (
              <>
                <Tabs defaultValue="signin" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="signin">Sign In</TabsTrigger>
                    <TabsTrigger value="signup" onClick={() => setCurrentStep('user-type')}>Sign Up</TabsTrigger>
                  </TabsList>

                  <TabsContent value="signin">
                    {renderSignInForm()}
                  </TabsContent>

                  <TabsContent value="signup">
                    {currentStep === 'user-type' && renderUserTypeSelection()}
                    {currentStep === 'signup-method' && renderSignupMethodSelection()}
                    {currentStep === 'form' && renderSignupForm()}
                    {currentStep === 'documents' && renderDocumentUpload()}
                  </TabsContent>
                </Tabs>

                {currentStep === 'user-type' && (
                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <Separator />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full mt-4 hover:soulace-gradient-light"
                      onClick={handleGoogleSignIn}
                      disabled={isLoading}
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Continue with Google
                    </Button>
                  </div>
                )}

                <p className="text-center text-sm text-muted-foreground mt-4">
                  By continuing, you agree to our{' '}
                  <a href="#" className="text-primary hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}