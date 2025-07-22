
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface NotificationPreferences {
  deadlineReminders: boolean;
  weeklyDigest: boolean;
  newScholarships: boolean;
  applicationUpdates: boolean;
}

interface EmailNotification {
  id: string;
  type: 'deadline_reminder' | 'weekly_digest' | 'new_scholarship' | 'application_update';
  title: string;
  message: string;
  scheduledFor: Date;
  sent: boolean;
}

export const useEmailNotifications = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    deadlineReminders: true,
    weeklyDigest: true,
    newScholarships: false,
    applicationUpdates: true,
  });
  
  const [notifications, setNotifications] = useState<EmailNotification[]>([]);
  const [loading, setLoading] = useState(false);

  // Load user preferences
  useEffect(() => {
    if (user) {
      loadNotificationPreferences();
    }
  }, [user]);

  const loadNotificationPreferences = async () => {
    // In a real app, this would fetch from the database
    // For now, using localStorage
    const saved = localStorage.getItem(`notifications_${user?.id}`);
    if (saved) {
      setPreferences(JSON.parse(saved));
    }
  };

  const updatePreferences = async (newPreferences: NotificationPreferences) => {
    setLoading(true);
    try {
      // In a real app, this would update the database
      localStorage.setItem(`notifications_${user?.id}`, JSON.stringify(newPreferences));
      setPreferences(newPreferences);
      
      toast({
        title: 'Preferences Updated',
        description: 'Your notification preferences have been saved.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update notification preferences.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const scheduleDeadlineReminder = (scholarshipName: string, deadline: Date, daysBeforeDeadline: number = 7) => {
    if (!preferences.deadlineReminders) return;

    const reminderDate = new Date(deadline);
    reminderDate.setDate(reminderDate.getDate() - daysBeforeDeadline);

    const notification: EmailNotification = {
      id: `reminder_${Date.now()}`,
      type: 'deadline_reminder',
      title: `Scholarship Deadline Reminder: ${scholarshipName}`,
      message: `Don't forget! The deadline for ${scholarshipName} is in ${daysBeforeDeadline} days (${deadline.toLocaleDateString()}).`,
      scheduledFor: reminderDate,
      sent: false,
    };

    setNotifications(prev => [...prev, notification]);
    
    // In a real app, this would be handled by a backend service
    console.log('Scheduled email notification:', notification);
  };

  const sendImmediateNotification = async (type: EmailNotification['type'], title: string, message: string) => {
    const notification: EmailNotification = {
      id: `immediate_${Date.now()}`,
      type,
      title,
      message,
      scheduledFor: new Date(),
      sent: true,
    };

    setNotifications(prev => [...prev, notification]);

    // Show toast as immediate feedback
    toast({
      title: title,
      description: message,
    });

    // In a real app, this would send an actual email
    console.log('Sent immediate notification:', notification);
  };

  const getUpcomingNotifications = () => {
    const now = new Date();
    const next7Days = new Date();
    next7Days.setDate(next7Days.getDate() + 7);

    return notifications.filter(
      notification => 
        !notification.sent && 
        notification.scheduledFor >= now && 
        notification.scheduledFor <= next7Days
    );
  };

  const markNotificationAsSent = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, sent: true }
          : notification
      )
    );
  };

  return {
    preferences,
    updatePreferences,
    scheduleDeadlineReminder,
    sendImmediateNotification,
    getUpcomingNotifications,
    markNotificationAsSent,
    notifications,
    loading,
  };
};
