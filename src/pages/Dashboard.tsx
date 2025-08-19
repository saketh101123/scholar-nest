
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, FileText, Award, TrendingUp, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useApplications } from '@/hooks/useApplications';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const { bookmarks } = useBookmarks();
  const { applications, isLoading } = useApplications();
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'under_review': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'submitted': return 'Submitted';
      case 'in_progress': return 'In Progress';
      case 'draft': return 'Draft';
      case 'under_review': return 'Under Review';
      case 'accepted': return 'Accepted';
      case 'rejected': return 'Rejected';
      default: return 'Unknown';
    }
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="text-center py-8">
              <p>Please sign in to access your dashboard.</p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gradient">Welcome back, {user.email?.split('@')[0]}!</h1>
          <p className="text-muted-foreground mt-2">Track your scholarship applications and stay organized</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Applications</p>
                  <p className="text-2xl font-bold">{applications.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Submitted</p>
                  <p className="text-2xl font-bold">
                    {applications.filter(app => app.status === 'submitted').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-orange-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold">
                    {applications.filter(app => app.status === 'in_progress').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Award className="h-8 w-8 text-purple-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Saved</p>
                  <p className="text-2xl font-bold">{bookmarks.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Application Tracking */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Application Tracker
                </CardTitle>
                <CardDescription>
                  Monitor the progress of your scholarship applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                {applications.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">No applications yet</p>
                    <Button onClick={() => navigate('/browse')}>
                      Browse Scholarships
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {applications.map((app) => (
                      <div key={app.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold">{app.scholarships?.name || 'Unknown Scholarship'}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={getStatusColor(app.status)}>
                                {getStatusText(app.status)}
                              </Badge>
                              {app.scholarships?.application_deadline && (
                                <span className="text-sm text-muted-foreground flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  Due in {getDaysUntilDeadline(app.scholarships.application_deadline)} days
                                </span>
                              )}
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{app.progress}%</span>
                          </div>
                          <Progress value={app.progress} className="h-2" />
                          <div className="text-sm text-muted-foreground">
                            {app.documents_submitted} of {app.total_documents} documents submitted
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Upcoming Deadlines */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="default" onClick={() => navigate('/eligibility')}>
                  <FileText className="h-4 w-4 mr-2" />
                  Check Eligibility
                </Button>
                <Button className="w-full" variant="outline" onClick={() => navigate('/browse')}>
                  <Award className="h-4 w-4 mr-2" />
                  Browse Scholarships
                </Button>
                <Button className="w-full" variant="outline" onClick={() => navigate('/saved')}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Saved Scholarships
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent>
                {applications.filter(app => 
                  app.status !== 'submitted' && 
                  app.status !== 'accepted' && 
                  app.status !== 'rejected' &&
                  app.scholarships?.application_deadline
                ).length === 0 ? (
                  <p className="text-muted-foreground text-sm">No upcoming deadlines</p>
                ) : (
                  <div className="space-y-3">
                    {applications
                      .filter(app => 
                        app.status !== 'submitted' && 
                        app.status !== 'accepted' && 
                        app.status !== 'rejected' &&
                        app.scholarships?.application_deadline
                      )
                      .sort((a, b) => {
                        if (!a.scholarships?.application_deadline || !b.scholarships?.application_deadline) return 0;
                        return new Date(a.scholarships.application_deadline).getTime() - 
                               new Date(b.scholarships.application_deadline).getTime();
                      })
                      .map((app) => (
                        <div key={app.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div>
                            <p className="font-medium text-sm">{app.scholarships?.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {app.scholarships?.application_deadline && 
                                getDaysUntilDeadline(app.scholarships.application_deadline)} days left
                            </p>
                          </div>
                          <Badge variant={
                            app.scholarships?.application_deadline && 
                            getDaysUntilDeadline(app.scholarships.application_deadline) <= 7 ? 
                            'destructive' : 'secondary'
                          }>
                            {app.scholarships?.application_deadline && 
                              new Date(app.scholarships.application_deadline).toLocaleDateString()}
                          </Badge>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
