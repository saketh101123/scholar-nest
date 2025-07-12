
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookmarkButton from '@/components/BookmarkButton';
import { useAuth } from '@/contexts/AuthContext';
import { useBookmarks } from '@/hooks/useBookmarks';
import { ExternalLink, Heart } from 'lucide-react';

const SavedScholarships = () => {
  const { user, loading: authLoading } = useAuth();
  const { bookmarks, loading: bookmarksLoading } = useBookmarks();
  const navigate = useNavigate();

  // Redirect to auth if not logged in and no local bookmarks
  useEffect(() => {
    if (!authLoading && !user && bookmarks.length === 0) {
      navigate('/auth');
    }
  }, [user, authLoading, bookmarks.length, navigate]);

  if (authLoading || bookmarksLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">Loading your saved scholarships...</div>
        </main>
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
            <Heart className="w-8 h-8 mr-3 text-red-500" />
            Saved Scholarships
          </h1>
          <p className="text-gray-600">
            {user ? 'Your bookmarked scholarships' : 'Your locally saved scholarships (sign in to sync across devices)'}
          </p>
        </div>

        {bookmarks.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No saved scholarships yet</h3>
              <p className="text-gray-500 mb-6">Start browsing scholarships and bookmark the ones you're interested in!</p>
              <Button onClick={() => navigate('/browse')}>
                Browse Scholarships
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map((bookmark) => {
              const scholarship = bookmark.scholarship_data;
              return (
                <Card key={bookmark.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{scholarship.name}</CardTitle>
                        <p className="text-sm text-gray-600">{scholarship.provider}</p>
                      </div>
                      <BookmarkButton scholarship={scholarship} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Badge variant="secondary">{scholarship.category}</Badge>
                        <span className="text-green-600 font-semibold">{scholarship.amount}</span>
                      </div>
                      
                      <p className="text-sm text-gray-700 line-clamp-3">
                        {scholarship.description}
                      </p>
                      
                      <div className="text-sm text-gray-500">
                        <strong>Deadline:</strong> {scholarship.application_deadline}
                      </div>
                      
                      {bookmark.notes && (
                        <div className="text-sm">
                          <strong className="text-gray-700">Notes:</strong>
                          <p className="text-gray-600 mt-1">{bookmark.notes}</p>
                        </div>
                      )}
                      
                      <div className="flex space-x-2 pt-2">
                        <Button size="sm" asChild>
                          <a 
                            href={scholarship.official_website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center"
                          >
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Apply
                          </a>
                        </Button>
                        
                        <Button size="sm" variant="outline" asChild>
                          <a href={`/scholarship/${scholarship.name}`}>
                            View Details
                          </a>
                        </Button>
                      </div>
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
