
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Users, GraduationCap, FileText, BarChart3, Settings } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdminScholarships from '@/components/admin/AdminScholarships';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminAnalytics from '@/components/admin/AdminAnalytics';
import AdminLogs from '@/components/admin/AdminLogs';
import AdminSettings from '@/components/admin/AdminSettings';
import { supabase } from '@/integrations/supabase/client';

const Admin = () => {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setCheckingAdmin(false);
        return;
      }

      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
        } else {
          setIsAdmin(profile?.role === 'admin' && user.email === 'saketh1011@gmail.com');
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } finally {
        setCheckingAdmin(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  if (loading || checkingAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-muted-foreground">Loading...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Alert className="max-w-md mx-auto">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Access denied. This area is restricted to authorized administrators only.
            </AlertDescription>
          </Alert>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gradient flex items-center gap-2">
            <Shield className="h-6 w-6 md:h-8 md:w-8" />
            Admin Panel
          </h1>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">
            Comprehensive management dashboard for ScholarNest
          </p>
        </div>

        <Tabs defaultValue="analytics" className="space-y-4 md:space-y-6">
          <div className="overflow-x-auto">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full min-w-fit">
              <TabsTrigger value="analytics" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm px-2 md:px-3">
                <BarChart3 className="h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">Analytics</span>
                <span className="sm:hidden">Stats</span>
              </TabsTrigger>
              <TabsTrigger value="scholarships" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm px-2 md:px-3">
                <GraduationCap className="h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">Scholarships</span>
                <span className="sm:hidden">Schol</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm px-2 md:px-3">
                <Users className="h-3 w-3 md:h-4 md:w-4" />
                Users
              </TabsTrigger>
              <TabsTrigger value="logs" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm px-2 md:px-3">
                <FileText className="h-3 w-3 md:h-4 md:w-4" />
                Logs
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm px-2 md:px-3">
                <Settings className="h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">Settings</span>
                <span className="sm:hidden">Set</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="analytics">
            <AdminAnalytics />
          </TabsContent>

          <TabsContent value="scholarships">
            <AdminScholarships />
          </TabsContent>

          <TabsContent value="users">
            <AdminUsers />
          </TabsContent>

          <TabsContent value="logs">
            <AdminLogs />
          </TabsContent>

          <TabsContent value="settings">
            <AdminSettings />
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Admin;
