
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Quote, ExternalLink } from 'lucide-react';

interface SuccessStory {
  id: string;
  name: string;
  university: string;
  scholarshipName: string;
  amount: string;
  year: number;
  story: string;
  avatar?: string;
  major: string;
  rating: number;
}

const SuccessStories = () => {
  const stories: SuccessStory[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      university: 'Stanford University',
      scholarshipName: 'Merit Excellence Scholarship',
      amount: '$25,000',
      year: 2023,
      story: 'The scholarship application process seemed overwhelming at first, but with careful planning and the document checklist feature, I was able to stay organized. The key was starting early and getting strong letters of recommendation. This scholarship made my dream of attending Stanford possible!',
      major: 'Computer Science',
      rating: 5,
    },
    {
      id: '2',
      name: 'Michael Chen',
      university: 'MIT',
      scholarshipName: 'STEM Innovation Grant',
      amount: '$30,000',
      year: 2023,
      story: 'I applied to over 20 scholarships and received 3 awards. The application tracking system here helped me keep track of deadlines and requirements. My advice: don\'t give up, and make sure your personal statement tells your unique story. Every application is practice for the next one.',
      major: 'Electrical Engineering',
      rating: 5,
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      university: 'Harvard University',
      scholarshipName: 'Community Leadership Award',
      amount: '$40,000',
      year: 2022,
      story: 'Coming from a low-income family, I thought prestigious universities were out of reach. This platform helped me find need-based scholarships I never knew existed. The email notifications for deadlines were a lifesaver. Now I\'m studying pre-med at Harvard!',
      major: 'Biology',
      rating: 5,
    },
    {
      id: '4',
      name: 'David Kim',
      university: 'UC Berkeley',
      scholarshipName: 'Academic Excellence Award',
      amount: '$15,000',
      year: 2023,
      story: 'The scholarship search feature helped me find opportunities that matched my specific background in environmental science. I received this award for my research project on sustainable energy. The detailed application guidelines made the process much clearer.',
      major: 'Environmental Science',
      rating: 4,
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gradient mb-4">Success Stories</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Read inspiring stories from students who successfully secured scholarships through our platform. 
          Their experiences and tips can help guide your own scholarship journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stories.map((story) => (
          <Card key={story.id} className="relative">
            <CardHeader>
              <div className="flex items-start space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={story.avatar} />
                  <AvatarFallback>
                    {story.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{story.name}</h3>
                      <p className="text-sm text-muted-foreground">{story.major}</p>
                    </div>
                    <div className="flex items-center">
                      {renderStars(story.rating)}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary">{story.university}</Badge>
                    <Badge variant="outline">{story.year}</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gradient-scholar/5 p-4 rounded-lg">
                  <h4 className="font-medium text-sm mb-1">{story.scholarshipName}</h4>
                  <p className="text-2xl font-bold text-gradient">{story.amount}</p>
                </div>
                
                <div className="relative">
                  <Quote className="absolute top-0 left-0 h-5 w-5 text-muted-foreground/30" />
                  <p className="text-sm leading-relaxed pl-6 italic">
                    {story.story}
                  </p>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="text-xs text-muted-foreground">
                    Class of {story.year}
                  </span>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Read Full Story
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center">
        <Card className="bg-gradient-scholar/5">
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold mb-2">Share Your Success Story</h3>
            <p className="text-muted-foreground mb-4">
              Help inspire future scholarship recipients by sharing your journey
            </p>
            <Button>
              Submit Your Story
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuccessStories;
