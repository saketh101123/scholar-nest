
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink, Calendar, DollarSign, User, GraduationCap, FileText, Globe } from 'lucide-react';
import { scholarshipsData } from '@/data/scholarships';

const ScholarshipDetails = () => {
  const { id } = useParams();
  const scholarship = scholarshipsData[parseInt(id || '0')];

  if (!scholarship) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Scholarship Not Found</h1>
            <Link to="/browse">
              <Button className="btn-primary">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Browse
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'women':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'sc':
      case 'st':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'minority':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'general':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLevelColor = (level: string) => {
    if (level.includes('School')) return 'bg-green-100 text-green-800 border-green-200';
    if (level.includes('UG')) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (level.includes('PG')) return 'bg-purple-100 text-purple-800 border-purple-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/browse">
            <Button variant="outline" className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Browse
            </Button>
          </Link>
        </div>

        {/* Main Card */}
        <Card className="bg-gradient-card border-0 shadow-lg mb-8">
          <CardHeader className="pb-6">
            <div className="flex gap-2 flex-wrap mb-4">
              <Badge className={getCategoryColor(scholarship.category)}>
                <User className="w-3 h-3 mr-1" />
                {scholarship.category}
              </Badge>
              <Badge className={getLevelColor(scholarship.level)}>
                <GraduationCap className="w-3 h-3 mr-1" />
                {scholarship.level}
              </Badge>
            </div>
            
            <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
              {scholarship.name}
            </CardTitle>
            
            <p className="text-lg text-gray-600 font-medium">
              {scholarship.provider}
            </p>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Key Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <DollarSign className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Scholarship Amount</h3>
                  <p className="text-green-700 font-semibold text-lg">{scholarship.amount}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Calendar className="w-6 h-6 text-orange-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Application Deadline</h3>
                  <p className="text-gray-700">{scholarship.application_deadline}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="flex items-start space-x-3">
              <FileText className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{scholarship.description}</p>
              </div>
            </div>

            {/* Eligibility */}
            <div className="flex items-start space-x-3">
              <User className="w-6 h-6 text-purple-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Eligibility Criteria</h3>
                <p className="text-gray-700 leading-relaxed">{scholarship.eligibility}</p>
              </div>
            </div>

            {/* Official Website */}
            <div className="flex items-start space-x-3">
              <Globe className="w-6 h-6 text-indigo-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Official Website</h3>
                <a 
                  href={scholarship.official_website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline break-all"
                >
                  {scholarship.official_website}
                </a>
              </div>
            </div>

            {/* Apply Button */}
            <div className="pt-6 border-t border-gray-200">
              <Button 
                asChild 
                size="lg"
                className="w-full btn-primary text-lg py-4"
              >
                <a 
                  href={scholarship.official_website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  Apply Now on Official Website
                  <ExternalLink className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default ScholarshipDetails;
