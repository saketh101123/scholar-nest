
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, BookOpen, Activity, Calendar, Target } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AnalyticsData {
  totalUsers: number;
  totalScholarships: number;
  recentActivities: number;
  categoryBreakdown: { [key: string]: number };
  levelBreakdown: { [key: string]: number };
  monthlyTrends: { month: string; scholarships: number; users: number }[];
}

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalUsers: 0,
    totalScholarships: 0,
    recentActivities: 0,
    categoryBreakdown: {},
    levelBreakdown: {},
    monthlyTrends: []
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Fetch total users
      const { data: users, error: usersError } = await supabase
        .from('profiles')
        .select('id, role')
        .neq('role', null);

      if (usersError) throw usersError;

      // Fetch scholarships
      const { data: scholarships, error: scholarshipsError } = await supabase
        .from('scholarships')
        .select('*');

      if (scholarshipsError) throw scholarshipsError;

      // Fetch recent admin activities (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data: activities, error: activitiesError } = await supabase
        .from('admin_logs')
        .select('id')
        .gte('created_at', thirtyDaysAgo.toISOString());

      if (activitiesError) throw activitiesError;

      // Process category breakdown
      const categoryBreakdown: { [key: string]: number } = {};
      scholarships?.forEach(scholarship => {
        categoryBreakdown[scholarship.category] = (categoryBreakdown[scholarship.category] || 0) + 1;
      });

      // Process level breakdown
      const levelBreakdown: { [key: string]: number } = {};
      scholarships?.forEach(scholarship => {
        levelBreakdown[scholarship.level] = (levelBreakdown[scholarship.level] || 0) + 1;
      });

      // Generate monthly trends (mock data for now, can be enhanced with real date-based queries)
      const monthlyTrends = [
        { month: 'Jan', scholarships: Math.floor((scholarships?.length || 0) * 0.1), users: Math.floor((users?.length || 0) * 0.2) },
        { month: 'Feb', scholarships: Math.floor((scholarships?.length || 0) * 0.2), users: Math.floor((users?.length || 0) * 0.3) },
        { month: 'Mar', scholarships: Math.floor((scholarships?.length || 0) * 0.4), users: Math.floor((users?.length || 0) * 0.5) },
        { month: 'Apr', scholarships: Math.floor((scholarships?.length || 0) * 0.7), users: Math.floor((users?.length || 0) * 0.7) },
        { month: 'May', scholarships: Math.floor((scholarships?.length || 0) * 0.9), users: Math.floor((users?.length || 0) * 0.9) },
        { month: 'Jun', scholarships: scholarships?.length || 0, users: users?.length || 0 }
      ];

      setAnalytics({
        totalUsers: users?.length || 0,
        totalScholarships: scholarships?.length || 0,
        recentActivities: activities?.length || 0,
        categoryBreakdown,
        levelBreakdown,
        monthlyTrends
      });

    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast({
        title: "Error",
        description: "Failed to fetch analytics data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              Registered platform users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Scholarships</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalScholarships}</div>
            <p className="text-xs text-muted-foreground">
              Available scholarships
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Activities</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.recentActivities}</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Object.keys(analytics.categoryBreakdown).length}</div>
            <p className="text-xs text-muted-foreground">
              Scholarship categories
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Scholarship Categories</CardTitle>
          <CardDescription>
            Distribution of scholarships by category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(analytics.categoryBreakdown).map(([category, count]) => (
              <div key={category} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="text-sm font-medium">{category}</p>
                  <p className="text-xs text-muted-foreground">{count} scholarships</p>
                </div>
                <Badge variant="secondary">{count}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Level Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Education Levels</CardTitle>
          <CardDescription>
            Scholarships by education level
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(analytics.levelBreakdown).map(([level, count]) => (
              <div key={level} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="text-lg font-semibold">{level}</p>
                  <p className="text-sm text-muted-foreground">{count} scholarships</p>
                </div>
                <div className="text-2xl font-bold text-primary">{count}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Growth Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Growth Trends
          </CardTitle>
          <CardDescription>
            Monthly growth in scholarships and users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.monthlyTrends.map((trend, index) => (
              <div key={trend.month} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{trend.month} 2024</span>
                </div>
                <div className="flex gap-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Scholarships</p>
                    <p className="text-lg font-semibold">{trend.scholarships}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Users</p>
                    <p className="text-lg font-semibold">{trend.users}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Insights</CardTitle>
          <CardDescription>
            Key metrics and insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900">Most Popular Category</h4>
              <p className="text-blue-700">
                {Object.entries(analytics.categoryBreakdown).reduce((a, b) => 
                  analytics.categoryBreakdown[a[0]] > analytics.categoryBreakdown[b[0]] ? a : b, 
                  ['None', 0]
                )[0]} ({Object.entries(analytics.categoryBreakdown).reduce((a, b) => 
                  analytics.categoryBreakdown[a[0]] > analytics.categoryBreakdown[b[0]] ? a : b, 
                  ['None', 0]
                )[1]} scholarships)
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900">Total Scholarship Value</h4>
              <p className="text-green-700">
                Rs. {analytics.totalScholarships * 8500} (estimated)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalytics;
