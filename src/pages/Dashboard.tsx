
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

const Dashboard = () => {
  const { user } = useAuth();
  const { bookmarks } = useBookmarks();

  // Mock application data - in real app this would come from database
  const applications = [
    {
      id: '1',
      scholarshipName: 'Merit Excellence Scholarship',
      status: 'in_progress',
      deadline: '2024-03-15',
      progress: 75,
      documentsSubmitted: 3,
      totalDocuments: 4,
    },
    {
      id: '2',
      scholarshipName: 'STEM Innovation Grant',
      status: 'submitted',
      deadline: '2024-02-28',
      progress: 100,
      documentsSubmitted: 5,
      totalDocuments: 5,
    },
    {
      id: '3',
      scholarshipName: 'Community Leadership Award',
      status: 'draft',
      deadline: '2024-04-10',
      progress: 25,
      documentsSubmitted: 1,
      totalDocuments: 6,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'submitted': return 'Submitted';
      case 'in_progress': return 'In Progress';
      case 'draft': return 'Draft';
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
                <div className="space-y-6">
                  {applications.map((app) => (
                    <div key={app.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{app.scholarshipName}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getStatusColor(app.status)}>
                              {getStatusText(app.status)}
                            </Badge>
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Due in {getDaysUntilDeadline(app.deadline)} days
                            </span>
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
                          {app.documentsSubmitted} of {app.totalDocuments} documents submitted
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
                <Button className="w-full" variant="default">
                  <FileText className="h-4 w-4 mr-2" />
                  Start New Application
                </Button>
                <Button className="w-full" variant="outline">
                  <Award className="h-4 w-4 mr-2" />
                  Browse Scholarships
                </Button>
                <Button className="w-full" variant="outline">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Document Checklist
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
                <div className="space-y-3">
                  {applications
                    .filter(app => app.status !== 'submitted')
                    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
                    .map((app) => (
                      <div key={app.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{app.scholarshipName}</p>
                          <p className="text-xs text-muted-foreground">
                            {getDaysUntilDeadline(app.deadline)} days left
                          </p>
                        </div>
                        <Badge variant={getDaysUntilDeadline(app.deadline) <= 7 ? 'destructive' : 'secondary'}>
                          {new Date(app.deadline).toLocaleDateString()}
                        </Badge>
                      </div>
                    ))}
                </div>
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
