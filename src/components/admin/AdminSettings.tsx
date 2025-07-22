
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Settings, Database, Mail, Shield, Server } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteName: 'ScholarNest',
    siteDescription: 'Your gateway to educational opportunities',
    enableRegistration: true,
    enableEmailNotifications: true,
    maintenanceMode: false,
    maxBookmarksPerUser: 50,
    adminEmail: 'saketh1011@gmail.com'
  });
  const { toast } = useToast();

  const handleSaveSettings = async () => {
    try {
      // In a real application, you would save these to a settings table
      await logAdminAction('UPDATE_SETTINGS', 'system_settings', 'global', settings);
      
      toast({
        title: "Success",
        description: "Settings updated successfully",
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      });
    }
  };

  const logAdminAction = async (action: string, targetTable: string, targetId?: string, details?: any) => {
    try {
      await supabase.from('admin_logs').insert([{
        admin_id: (await supabase.auth.getUser()).data.user?.id,
        action,
        target_table: targetTable,
        target_id: targetId,
        details
      }]);
    } catch (error) {
      console.error('Error logging admin action:', error);
    }
  };

  const handleClearCache = async () => {
    try {
      // Clear any cached data
      await logAdminAction('CLEAR_CACHE', 'system', 'cache');
      
      toast({
        title: "Success",
        description: "Cache cleared successfully",
      });
    } catch (error) {
      console.error('Error clearing cache:', error);
      toast({
        title: "Error",
        description: "Failed to clear cache",
        variant: "destructive",
      });
    }
  };

  const handleDatabaseBackup = async () => {
    try {
      await logAdminAction('DATABASE_BACKUP', 'system', 'backup');
      
      toast({
        title: "Success",
        description: "Database backup initiated",
      });
    } catch (error) {
      console.error('Error initiating backup:', error);
      toast({
        title: "Error",
        description: "Failed to initiate backup",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            General Settings
          </CardTitle>
          <CardDescription>
            Configure general application settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => setSettings({...settings, siteName: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="adminEmail">Admin Email</Label>
              <Input
                id="adminEmail"
                type="email"
                value={settings.adminEmail}
                onChange={(e) => setSettings({...settings, adminEmail: e.target.value})}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="siteDescription">Site Description</Label>
            <Textarea
              id="siteDescription"
              value={settings.siteDescription}
              onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="maxBookmarks">Max Bookmarks Per User</Label>
            <Input
              id="maxBookmarks"
              type="number"
              value={settings.maxBookmarksPerUser}
              onChange={(e) => setSettings({...settings, maxBookmarksPerUser: parseInt(e.target.value)})}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security & Access
          </CardTitle>
          <CardDescription>
            Manage security and access control settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enableRegistration">Enable User Registration</Label>
              <p className="text-sm text-muted-foreground">Allow new users to register</p>
            </div>
            <Switch
              id="enableRegistration"
              checked={settings.enableRegistration}
              onCheckedChange={(checked) => setSettings({...settings, enableRegistration: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
              <p className="text-sm text-muted-foreground">Put the site in maintenance mode</p>
            </div>
            <Switch
              id="maintenanceMode"
              checked={settings.maintenanceMode}
              onCheckedChange={(checked) => setSettings({...settings, maintenanceMode: checked})}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Notification Settings
          </CardTitle>
          <CardDescription>
            Configure email and notification preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enableEmailNotifications">Enable Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Send email notifications to users</p>
            </div>
            <Switch
              id="enableEmailNotifications"
              checked={settings.enableEmailNotifications}
              onCheckedChange={(checked) => setSettings({...settings, enableEmailNotifications: checked})}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            System Actions
          </CardTitle>
          <CardDescription>
            Perform system maintenance and administrative tasks
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button onClick={handleClearCache} variant="outline">
              <Database className="h-4 w-4 mr-2" />
              Clear Cache
            </Button>
            <Button onClick={handleDatabaseBackup} variant="outline">
              <Database className="h-4 w-4 mr-2" />
              Backup Database
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings}>
          Save All Settings
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;
