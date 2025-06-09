
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Calendar, DollarSign, User } from 'lucide-react';
import { Scholarship } from '@/data/scholarships';

interface ScholarshipCardProps {
  scholarship: Scholarship;
}

const ScholarshipCard = ({ scholarship }: ScholarshipCardProps) => {
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
    <Card className="h-full card-hover bg-gradient-card border-0 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex gap-2 flex-wrap">
            <Badge className={getCategoryColor(scholarship.category)}>
              <User className="w-3 h-3 mr-1" />
              {scholarship.category}
            </Badge>
            <Badge className={getLevelColor(scholarship.level)}>
              {scholarship.level}
            </Badge>
          </div>
        </div>
        
        <CardTitle className="text-xl font-bold text-gray-900 leading-tight">
          {scholarship.name}
        </CardTitle>
        
        <CardDescription className="text-sm text-gray-600 font-medium">
          {scholarship.provider}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center text-sm text-gray-700">
          <DollarSign className="w-4 h-4 mr-2 text-green-600" />
          <span className="font-semibold text-green-700">{scholarship.amount}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-700">
          <Calendar className="w-4 h-4 mr-2 text-orange-600" />
          <span>{scholarship.application_deadline}</span>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
          {scholarship.description}
        </p>
        
        <div className="pt-2">
          <Button 
            asChild 
            className="w-full btn-primary"
          >
            <a 
              href={scholarship.official_website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center"
            >
              Apply Now
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScholarshipCard;
