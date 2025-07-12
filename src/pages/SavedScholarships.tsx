
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Bookmark, ExternalLink, Trash2, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SavedScholarship {
  id: string;
  scholarship_data: any;
  saved_at: string;
  notes?: string;
}

const SavedScholarships = () => {
  const [savedScholarships, setSavedScholarships] = useState<SavedScholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchSavedScholarships();
  }, [user, navigate]);

  const fetchSavedScholarships = async () => {
    try {
      const { data, error } = await supabase
        .from('saved_scholarships')
        .select('*')
        .eq('user_id', user?.id)
        .order('saved_at', { ascending: false });

      if (error) throw error;

      setSavedScholarships(data || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to fetch saved scholarships',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const removeSavedScholarship = async (id: string) => {
    try {
      const { error } = await supabase
        .from('saved_scholarships')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setSavedScholarships(prev => prev.filter(s => s.id !== id));
      toast({
        title: 'Removed',
        description: 'Scholarship removed from saved list',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to remove scholarship',
        variant: 'destructive',
      });
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading your saved scholarships...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <Bookmark className="w-8 h-8 mr-3 text-blue-600" />
            Saved Scholarships
          </h1>
          <p className="text-gray-600">Keep track of scholarships you're interested in</p>
        </div>

        {savedScholarships.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No saved scholarships yet</h3>
              <p className="text-gray-500 mb-6">Start browsing scholarships and save the ones you like!</p>
              <Button onClick={() => navigate('/browse')}>Browse Scholarships</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedScholarships.map((saved) => {
              const scholarship = saved.scholarship_data;
              return (
                <Card key={saved.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <Badge className={getCategoryColor(scholarship.category)}>
                        {scholarship.category}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSavedScholarship(saved.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <CardTitle className="text-lg leading-tight">
                      {scholarship.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600">{scholarship.provider}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-green-600 font-semibold text-lg">
                        {scholarship.amount}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {scholarship.level}
                      </Badge>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {scholarship.application_deadline}
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-3">
                      {scholarship.description}
                    </p>

                    {saved.notes && (
                      <div className="bg-yellow-50 p-3 rounded-md">
                        <p className="text-sm text-gray-700">
                          <strong>Notes:</strong> {saved.notes}
                        </p>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        View Details
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        asChild
                      >
                        <a 
                          href={scholarship.official_website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>

                    <div className="text-xs text-gray-500">
                      Saved on {new Date(saved.saved_at).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default SavedScholarships;
