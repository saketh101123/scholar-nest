
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, User, GraduationCap, DollarSign } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useEligibility, EligibilityData } from '@/hooks/useEligibility';
import { useToast } from '@/components/ui/use-toast';

const Eligibility = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { saveEligibility } = useEligibility();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<EligibilityData>({
    gender: '',
    caste: '',
    religion: '',
    current_class: '',
    percentage: 0,
    family_income: 0,
    has_disability: false,
    disability_percentage: 0,
    course_type: '',
    family_status: '',
    age: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save your eligibility data.",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }
    
    try {
      await saveEligibility.mutateAsync(formData);
      
      toast({
        title: "Eligibility Saved",
        description: "Your eligibility data has been saved successfully.",
      });
      
      // Store form data in localStorage for backward compatibility
      localStorage.setItem('eligibilityFormData', JSON.stringify(formData));
      navigate('/results');
    } catch (error) {
      console.error('Error saving eligibility:', error);
      toast({
        title: "Error",
        description: "Failed to save eligibility data. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: keyof EligibilityData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Check Your Scholarship Eligibility</h1>
          <p className="text-xl text-gray-600">
            Fill out the form below to discover scholarships that match your profile
          </p>
          {!user && (
            <p className="text-sm text-orange-600 mt-2">
              Sign in to save your eligibility data permanently
            </p>
          )}
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-scholar text-white rounded-t-lg">
            <CardTitle className="text-2xl">Student Information Form</CardTitle>
            <CardDescription className="text-white/90">
              Please provide accurate information to get the best scholarship matches
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 mb-4">
                  <User className="h-5 w-5 text-scholar-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="gender" className="text-sm font-medium text-gray-700">Gender *</Label>
                    <Select onValueChange={(value) => handleInputChange('gender', value)} required>
                      <SelectTrigger className="form-input">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="age" className="text-sm font-medium text-gray-700">Age</Label>
                    <Input
                      type="number"
                      id="age"
                      className="form-input"
                      placeholder="Enter your age"
                      onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="caste" className="text-sm font-medium text-gray-700">Category/Caste</Label>
                    <Select onValueChange={(value) => handleInputChange('caste', value)}>
                      <SelectTrigger className="form-input">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="General">General</SelectItem>
                        <SelectItem value="SC">SC (Scheduled Caste)</SelectItem>
                        <SelectItem value="ST">ST (Scheduled Tribe)</SelectItem>
                        <SelectItem value="OBC">OBC (Other Backward Class)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="religion" className="text-sm font-medium text-gray-700">Religion</Label>
                    <Select onValueChange={(value) => handleInputChange('religion', value)}>
                      <SelectTrigger className="form-input">
                        <SelectValue placeholder="Select religion" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hindu">Hindu</SelectItem>
                        <SelectItem value="Muslim">Muslim</SelectItem>
                        <SelectItem value="Christian">Christian</SelectItem>
                        <SelectItem value="Sikh">Sikh</SelectItem>
                        <SelectItem value="Buddhist">Buddhist</SelectItem>
                        <SelectItem value="Jain">Jain</SelectItem>
                        <SelectItem value="Parsi">Parsi</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="familyStatus" className="text-sm font-medium text-gray-700">Family Status</Label>
                    <Select onValueChange={(value) => handleInputChange('family_status', value)}>
                      <SelectTrigger className="form-input">
                        <SelectValue placeholder="Select family status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single_girl_child">Single Girl Child</SelectItem>
                        <SelectItem value="multiple_children">Multiple Children</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 mb-4">
                  <GraduationCap className="h-5 w-5 text-scholar-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Academic Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="currentClass" className="text-sm font-medium text-gray-700">Current Class/Level *</Label>
                    <Select onValueChange={(value) => handleInputChange('current_class', value)} required>
                      <SelectTrigger className="form-input">
                        <SelectValue placeholder="Select your current level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="8">Class 8</SelectItem>
                        <SelectItem value="9">Class 9</SelectItem>
                        <SelectItem value="10">Class 10</SelectItem>
                        <SelectItem value="11">Class 11</SelectItem>
                        <SelectItem value="12">Class 12</SelectItem>
                        <SelectItem value="UG">Undergraduate (UG)</SelectItem>
                        <SelectItem value="PG">Postgraduate (PG)</SelectItem>
                        <SelectItem value="PhD">PhD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="percentage" className="text-sm font-medium text-gray-700">Academic Percentage/Marks</Label>
                    <Input
                      type="number"
                      id="percentage"
                      max="100"
                      className="form-input"
                      placeholder="Enter your percentage"
                      onChange={(e) => handleInputChange('percentage', parseInt(e.target.value) || 0)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="courseType" className="text-sm font-medium text-gray-700">Course Type</Label>
                    <Select onValueChange={(value) => handleInputChange('course_type', value)}>
                      <SelectTrigger className="form-input">
                        <SelectValue placeholder="Select course type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="technical">Technical/Engineering</SelectItem>
                        <SelectItem value="medical">Medical</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="commerce">Commerce</SelectItem>
                        <SelectItem value="arts">Arts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 mb-4">
                  <DollarSign className="h-5 w-5 text-scholar-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Financial Information</h3>
                </div>
                
                <div>
                  <Label htmlFor="familyIncome" className="text-sm font-medium text-gray-700">Annual Family Income (₹) *</Label>
                  <Input
                    type="number"
                    id="familyIncome"
                    className="form-input"
                    placeholder="Enter annual family income in rupees"
                    onChange={(e) => handleInputChange('family_income', parseInt(e.target.value) || 0)}
                    required
                  />
                </div>
              </div>

              {/* Disability Information */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="hasDisability"
                    checked={formData.has_disability}
                    onCheckedChange={(checked) => handleInputChange('has_disability', checked)}
                  />
                  <Label htmlFor="hasDisability" className="text-sm font-medium text-gray-700">
                    Do you have any disability?
                  </Label>
                </div>
                
                {formData.has_disability && (
                  <div>
                    <Label htmlFor="disabilityPercentage" className="text-sm font-medium text-gray-700">
                      Disability Percentage
                    </Label>
                    <Input
                      type="number"
                      id="disabilityPercentage"
                      max="100"
                      className="form-input"
                      placeholder="Enter disability percentage"
                      onChange={(e) => handleInputChange('disability_percentage', parseInt(e.target.value) || 0)}
                    />
                  </div>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full btn-primary text-lg py-4"
                disabled={saveEligibility.isPending}
              >
                {saveEligibility.isPending ? 'Saving...' : 'Find My Scholarships'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Eligibility;
