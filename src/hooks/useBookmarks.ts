
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Bookmark {
  id: string;
  scholarship_data: any;
  saved_at: string;
  notes?: string;
}

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [localBookmarks, setLocalBookmarks] = useState<any[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();

  // Session ID for local bookmarks
  const getSessionId = () => {
    let sessionId = localStorage.getItem('bookmarkSessionId');
    if (!sessionId) {
      sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('bookmarkSessionId', sessionId);
    }
    return sessionId;
  };

  // Load bookmarks on mount
  useEffect(() => {
    if (user) {
      loadUserBookmarks();
    } else {
      loadLocalBookmarks();
    }
  }, [user]);

  const loadUserBookmarks = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('saved_scholarships')
        .select('*')
        .eq('user_id', user.id)
        .order('saved_at', { ascending: false });

      if (error) throw error;
      setBookmarks(data || []);
    } catch (error: any) {
      console.error('Error loading bookmarks:', error);
    }
  };

  const loadLocalBookmarks = () => {
    const stored = localStorage.getItem('localBookmarks');
    if (stored) {
      try {
        setLocalBookmarks(JSON.parse(stored));
      } catch (error) {
        setLocalBookmarks([]);
      }
    }
  };

  const saveLocalBookmarks = (bookmarks: any[]) => {
    localStorage.setItem('localBookmarks', JSON.stringify(bookmarks));
    setLocalBookmarks(bookmarks);
  };

  const addBookmark = async (scholarship: any, notes?: string) => {
    if (user) {
      // Save to database for authenticated users
      try {
        const { data, error } = await supabase
          .from('saved_scholarships')
          .insert({
            user_id: user.id,
            scholarship_data: scholarship,
            notes: notes,
          })
          .select()
          .single();

        if (error) throw error;

        setBookmarks(prev => [data, ...prev]);
        toast({
          title: 'Bookmark saved!',
          description: 'Scholarship added to your saved list.',
        });
      } catch (error: any) {
        if (error.code === '23505') {
          toast({
            title: 'Already saved',
            description: 'This scholarship is already in your saved list.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Error',
            description: 'Failed to save bookmark.',
            variant: 'destructive',
          });
        }
      }
    } else {
      // Save locally for non-authenticated users
      const newBookmark = {
        id: `local-${Date.now()}`,
        scholarship_data: scholarship,
        saved_at: new Date().toISOString(),
        notes,
      };

      const existing = localBookmarks.find(b => 
        b.scholarship_data.name === scholarship.name
      );

      if (existing) {
        toast({
          title: 'Already saved',
          description: 'This scholarship is already in your bookmarks.',
          variant: 'destructive',
        });
        return;
      }

      const updated = [newBookmark, ...localBookmarks];
      saveLocalBookmarks(updated);
      
      toast({
        title: 'Bookmark saved locally!',
        description: 'Sign in to sync your bookmarks across devices.',
      });
    }
  };

  const removeBookmark = async (id: string) => {
    if (user && !id.startsWith('local-')) {
      // Remove from database
      try {
        const { error } = await supabase
          .from('saved_scholarships')
          .delete()
          .eq('id', id);

        if (error) throw error;

        setBookmarks(prev => prev.filter(b => b.id !== id));
        toast({
          title: 'Bookmark removed',
          description: 'Scholarship removed from your saved list.',
        });
      } catch (error: any) {
        toast({
          title: 'Error',
          description: 'Failed to remove bookmark.',
          variant: 'destructive',
        });
      }
    } else {
      // Remove from local storage
      const updated = localBookmarks.filter(b => b.id !== id);
      saveLocalBookmarks(updated);
      toast({
        title: 'Bookmark removed',
        description: 'Scholarship removed from local bookmarks.',
      });
    }
  };

  const isBookmarked = (scholarship: any) => {
    if (user) {
      return bookmarks.some(b => b.scholarship_data.name === scholarship.name);
    } else {
      return localBookmarks.some(b => b.scholarship_data.name === scholarship.name);
    }
  };

  const getBookmarkId = (scholarship: any) => {
    if (user) {
      const bookmark = bookmarks.find(b => b.scholarship_data.name === scholarship.name);
      return bookmark?.id;
    } else {
      const bookmark = localBookmarks.find(b => b.scholarship_data.name === scholarship.name);
      return bookmark?.id;
    }
  };

  const getAllBookmarks = () => {
    return user ? bookmarks : localBookmarks;
  };

  // Migrate local bookmarks to user account when they sign in
  const migrateLocalBookmarks = async () => {
    if (!user || localBookmarks.length === 0) return;

    try {
      const migrations = localBookmarks.map(bookmark => ({
        user_id: user.id,
        scholarship_data: bookmark.scholarship_data,
        notes: bookmark.notes,
      }));

      const { error } = await supabase
        .from('saved_scholarships')
        .insert(migrations);

      if (!error) {
        // Clear local bookmarks after successful migration
        localStorage.removeItem('localBookmarks');
        setLocalBookmarks([]);
        loadUserBookmarks();
        
        toast({
          title: 'Bookmarks synced!',
          description: `${migrations.length} local bookmarks have been synced to your account.`,
        });
      }
    } catch (error: any) {
      console.error('Migration error:', error);
    }
  };

  // Auto-migrate when user signs in
  useEffect(() => {
    if (user && localBookmarks.length > 0) {
      migrateLocalBookmarks();
    }
  }, [user]);

  return {
    bookmarks: getAllBookmarks(),
    addBookmark,
    removeBookmark,
    isBookmarked,
    getBookmarkId,
    loading: false,
  };
};
