
import { Button } from '@/components/ui/button';
import { ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-scholar-blue-600 via-scholar-purple-600 to-scholar-blue-800 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-scholar-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-scholar-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Find Your Perfect{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
              Scholarship
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
            Discover scholarships tailored to your profile. Connect with 
            opportunities that match your academic journey and financial needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button asChild size="lg" className="btn-primary text-lg px-8 py-4 h-auto">
              <Link to="/eligibility" className="flex items-center">
                Check My Eligibility
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-4 h-auto bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm">
              <Link to="/browse" className="flex items-center">
                Browse All Scholarships
                <Search className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Floating Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 animate-float border border-white/20">
            <div className="text-3xl font-bold text-yellow-300 mb-2">42+</div>
            <div className="text-blue-100">Scholarships Available</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 animate-float animation-delay-2000 border border-white/20">
            <div className="text-3xl font-bold text-yellow-300 mb-2">₹75L</div>
            <div className="text-blue-100">Max Funding Available</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 animate-float animation-delay-4000 border border-white/20">
            <div className="text-3xl font-bold text-yellow-300 mb-2">100%</div>
            <div className="text-blue-100">Free to Use</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
