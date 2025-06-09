
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScholarshipCard from '@/components/ScholarshipCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search, AlertCircle } from 'lucide-react';
import { scholarshipsData, Scholarship } from '@/data/scholarships';

const Results = () => {
  const navigate = useNavigate();
  const [eligibleScholarships, setEligibleScholarships] = useState<Scholarship[]>([]);
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    const storedData = localStorage.getItem('eligibilityFormData');
    if (!storedData) {
      navigate('/eligibility');
      return;
    }

    const data = JSON.parse(storedData);
    setFormData(data);

    // Filter scholarships based on eligibility
    const eligible = scholarshipsData.filter(scholarship => {
      return checkEligibility(scholarship, data);
    });

    setEligibleScholarships(eligible);
  }, [navigate]);

  const checkEligibility = (scholarship: Scholarship, userData: any): boolean => {
    console.log('Checking eligibility for:', scholarship.name);
    console.log('User data:', userData);

    // Check income eligibility
    if (scholarship.requirements?.income && userData.familyIncome > scholarship.requirements.income) {
      console.log('Income too high:', userData.familyIncome, '>', scholarship.requirements.income);
      return false;
    }

    // Check percentage/marks eligibility
    if (scholarship.requirements?.percentage && userData.percentage < scholarship.requirements.percentage) {
      console.log('Percentage too low:', userData.percentage, '<', scholarship.requirements.percentage);
      return false;
    }

    // Check caste/category eligibility
    if (scholarship.category !== 'All' && scholarship.category !== 'General') {
      if (scholarship.category === 'Women' && userData.gender !== 'female') {
        console.log('Not eligible - women only scholarship');
        return false;
      }
      if (scholarship.category === 'SC' && userData.caste !== 'SC') {
        console.log('Not eligible - SC only scholarship');
        return false;
      }
      if (scholarship.category === 'ST' && userData.caste !== 'ST') {
        console.log('Not eligible - ST only scholarship');
        return false;
      }
      if (scholarship.category === 'Minority') {
        const minorities = ['Muslim', 'Christian', 'Sikh', 'Buddhist', 'Parsi', 'Jain'];
        if (!minorities.includes(userData.religion)) {
          console.log('Not eligible - minority only scholarship');
          return false;
        }
      }
    }

    // Check disability eligibility
    if (scholarship.requirements?.disability && (!userData.hasDisability || userData.disabilityPercentage < scholarship.requirements.disability)) {
      console.log('Not eligible - disability requirements not met');
      return false;
    }

    // Check gender-specific requirements
    if (scholarship.requirements?.gender && userData.gender !== scholarship.requirements.gender) {
      console.log('Not eligible - gender requirement not met');
      return false;
    }

    // Check family status
    if (scholarship.requirements?.family_status && userData.familyStatus !== scholarship.requirements.family_status) {
      console.log('Not eligible - family status requirement not met');
      return false;
    }

    // Check age eligibility
    if (scholarship.requirements?.age && userData.age > scholarship.requirements.age) {
      console.log('Not eligible - age requirement not met');
      return false;
    }

    // Check course type eligibility
    if (scholarship.requirements?.course_type && userData.courseType !== scholarship.requirements.course_type) {
      console.log('Not eligible - course type requirement not met');
      return false;
    }

    console.log('Eligible for:', scholarship.name);
    return true;
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => navigate('/eligibility')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Form
          </Button>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Scholarship Results</h1>
            <p className="text-xl text-gray-600">
              Based on your profile, we found {eligibleScholarships.length} scholarship{eligibleScholarships.length !== 1 ? 's' : ''} you're eligible for
            </p>
          </div>
        </div>

        {eligibleScholarships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eligibleScholarships.map((scholarship, index) => (
              <div key={index} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <ScholarshipCard scholarship={scholarship} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">No Matching Scholarships Found</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              We couldn't find any scholarships that match your current profile. 
              Try updating your information or browse all available scholarships.
            </p>
            <div className="space-x-4">
              <Button onClick={() => navigate('/eligibility')} className="btn-primary">
                Update Information
              </Button>
              <Button variant="outline" onClick={() => navigate('/browse')}>
                <Search className="mr-2 h-4 w-4" />
                Browse All Scholarships
              </Button>
            </div>
          </div>
        )}

        {eligibleScholarships.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Want to see more options?
            </p>
            <Button variant="outline" onClick={() => navigate('/browse')}>
              <Search className="mr-2 h-4 w-4" />
              Browse All Scholarships
            </Button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Results;
