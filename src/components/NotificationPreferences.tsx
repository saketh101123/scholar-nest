
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Mail, Calendar, Award } from 'lucide-react';
import { useEmailNotifications } from '@/hooks/useEmailNotifications';

const NotificationPreferences = () => {
  const { preferences, updatePreferences, getUpcomingNotifications, loading } = useEmailNotifications();
  const upcomingNotifications = getUpcomingNotifications();

  const handlePreferenceChange = (key: keyof typeof preferences, value: boolean) => {
    updatePreferences({
      ...preferences,
      [key]: value,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Email Notification Preferences
          </CardTitle>
          <CardDescription>
            Manage how and when you receive notifications about your scholarship applications
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-orange-500" />
                  <span className="font-medium">Deadline Reminders</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Get notified 7 days and 1 day before application deadlines
                </p>
              </div>
              <Switch
                checked={preferences.deadlineReminders}
                onCheckedChange={(checked) => handlePreferenceChange('deadlineReminders', checked)}
                disabled={loading}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">Weekly Digest</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Receive a weekly summary of your applications and new opportunities
                </p>
              </div>
              <Switch
                checked={preferences.weeklyDigest}
                onCheckedChange={(checked) => handlePreferenceChange('weeklyDigest', checked)}
                disabled={loading}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-purple-500" />
                  <span className="font-medium">New Scholarships</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Get notified when new scholarships matching your profile are added
                </p>
              </div>
              <Switch
                checked={preferences.newScholarships}
                onCheckedChange={(checked) => handlePreferenceChange('newScholarships', checked)}
                disabled={loading}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-green-500" />
                  <span className="font-medium">Application Updates</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Receive notifications about application status changes and updates
                </p>
              </div>
              <Switch
                checked={preferences.applicationUpdates}
                onCheckedChange={(checked) => handlePreferenceChange('applicationUpdates', checked)}
                disabled={loading}
              />
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Changes are saved automatically
              </span>
              <Button variant="outline" size="sm">
                Test Notification
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {upcomingNotifications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Notifications</CardTitle>
            <CardDescription>
              Scheduled email notifications for the next 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingNotifications.map((notification) => (
                <div key={notification.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">{notification.message}</p>
                  </div>
                  <Badge variant="outline">
                    {notification.scheduledFor.toLocaleDateString()}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NotificationPreferences;
