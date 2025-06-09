
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, MessageCircle, Phone, Mail } from 'lucide-react';

const FAQ = () => {
  const faqs = [
    {
      question: "How does ScholarNest work?",
      answer: "ScholarNest uses an intelligent matching system that analyzes your personal, academic, and financial information to find scholarships you're eligible for. Simply fill out our form, and we'll show you all the scholarships that match your profile."
    },
    {
      question: "Is ScholarNest free to use?",
      answer: "Yes, ScholarNest is completely free for students. We believe that finding scholarship opportunities should be accessible to everyone, regardless of their financial situation."
    },
    {
      question: "How accurate is the eligibility matching?",
      answer: "Our matching algorithm is highly accurate and based on the official eligibility criteria published by scholarship providers. However, we always recommend verifying the requirements on the official scholarship website before applying."
    },
    {
      question: "Can I apply for scholarships directly through ScholarNest?",
      answer: "No, ScholarNest helps you discover scholarships you're eligible for. To apply, you'll need to visit the official scholarship website using the links we provide in each scholarship card."
    },
    {
      question: "How often is the scholarship database updated?",
      answer: "We regularly update our scholarship database to ensure you have access to the latest opportunities. New scholarships are added as they become available, and expired ones are removed."
    },
    {
      question: "What information do I need to provide?",
      answer: "You'll need basic information including your gender, caste/category, religion, academic level, marks/percentage, family income, and any disability status. All information is kept secure and is only used for matching purposes."
    },
    {
      question: "Are these scholarships only for Karnataka students?",
      answer: "While our platform focuses on scholarships available to Karnataka students, many of the scholarships listed are national-level programs open to students from all states, including Karnataka."
    },
    {
      question: "What if I don't find any matching scholarships?",
      answer: "If no scholarships match your current profile, try updating your information or browse all available scholarships. You can also check back later as new opportunities are added regularly."
    },
    {
      question: "How do I know if a scholarship is legitimate?",
      answer: "All scholarships in our database are from verified government agencies, educational institutions, and reputable organizations. We provide direct links to official websites for each scholarship."
    },
    {
      question: "Can I save scholarships for later?",
      answer: "Currently, we recommend bookmarking the scholarship pages or noting down the details. We're working on adding user accounts and saved scholarships in future updates."
    }
  ];

  const contactOptions = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get detailed help via email",
      contact: "support@scholarnest.com"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak with our support team",
      contact: "+91 80 1234 5678"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Quick answers to your questions",
      contact: "Available 9 AM - 6 PM"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-scholar text-white rounded-full mb-6">
            <HelpCircle className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about using ScholarNest
          </p>
        </div>

        {/* FAQ Accordion */}
        <Card className="shadow-xl border-0 mb-12">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Common Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:text-scholar-blue-600">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact Support Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Our support team is here to assist you with any questions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactOptions.map((option, index) => (
            <Card key={index} className="text-center card-hover border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-scholar text-white rounded-lg mb-4">
                  <option.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{option.title}</h3>
                <p className="text-gray-600 mb-3">{option.description}</p>
                <p className="text-scholar-blue-600 font-medium">{option.contact}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FAQ;
