
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle, Users, Award, Search, ArrowRight } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: Search,
      title: 'Smart Matching',
      description: 'Our intelligent system analyzes your profile and matches you with the most relevant scholarships.',
    },
    {
      icon: CheckCircle,
      title: 'Eligibility Check',
      description: 'Quickly determine which scholarships you qualify for based on your personal and academic details.',
    },
    {
      icon: Award,
      title: 'Comprehensive Database',
      description: 'Access a curated list of scholarships specifically available for Karnataka students.',
    },
    {
      icon: Users,
      title: 'Student-Friendly',
      description: 'Designed with students in mind, our platform is easy to navigate and understand.',
    },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      course: 'Engineering Student',
      quote: 'ScholarNest helped me find the perfect scholarship for my engineering studies. The process was so simple!',
    },
    {
      name: 'Rajesh Kumar',
      course: 'Medical Student',
      quote: 'I discovered scholarships I never knew existed. This platform is a game-changer for students.',
    },
    {
      name: 'Anitha Reddy',
      course: 'Commerce Graduate',
      quote: 'The eligibility matching feature saved me hours of research. Highly recommend to all students!',
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How ScholarNest Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Finding the right scholarship has never been easier. Follow these simple steps to discover opportunities that match your profile.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center animate-slide-up">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-scholar-blue-100 text-scholar-blue-600 rounded-full mb-6">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Enter Your Details</h3>
              <p className="text-gray-600">
                Fill out our simple form with your academic and personal information.
              </p>
            </div>

            <div className="text-center animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-scholar-purple-100 text-scholar-purple-600 rounded-full mb-6">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Get Matched</h3>
              <p className="text-gray-600">
                Our smart algorithm instantly finds scholarships you're eligible for.
              </p>
            </div>

            <div className="text-center animate-slide-up" style={{animationDelay: '0.4s'}}>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-6">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Apply & Succeed</h3>
              <p className="text-gray-600">
                Click through to apply directly on the official scholarship websites.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/eligibility">
              <Button className="btn-primary text-lg px-8 py-4">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose ScholarNest?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've built the most comprehensive and user-friendly scholarship platform for Karnataka students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center card-hover border-0 shadow-lg">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-scholar text-white rounded-lg mb-4 mx-auto">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Student Success Stories</h2>
            <p className="text-xl text-gray-600">
              Hear from students who found their perfect scholarships through ScholarNest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-hover border-0 shadow-lg">
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-scholar rounded-full flex items-center justify-center text-white font-semibold mr-3">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.course}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
