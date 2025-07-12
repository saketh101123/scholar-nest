
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useLocalBookmarks } from './useLocalBookmarks';

interface Bookmark {
  id: string;
  scholarship_data: any;
  saved_at: string;
  notes?: string;
}

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const {
    localBookmarks,
    addLocalBookmark,
    removeLocalBookmark,
    isLocallyBookmarked,
    getLocalBookmarkId,
    clearLocalBookmarks,
  } = useLocalBookmarks();

  // Load user bookmarks from database
  const loadUserBookmarks = async () => {
    if (!user) return;

    setLoading(true);
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
      toast({
        title: 'Error',
        description: 'Failed to load bookmarks.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Add bookmark for authenticated users
  const addUserBookmark = async (scholarship: any, notes?: string) => {
    if (!user) return { success: false, message: 'Not authenticated' };

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
      return { success: true, message: 'Bookmark saved!' };
    } catch (error: any) {
      if (error.code === '23505') {
        return { success: false, message: 'Already saved' };
      }
      throw error;
    }
  };

  // Remove bookmark for authenticated users
  const removeUserBookmark = async (id: string) => {
    if (!user) return;

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
  };

  // Main bookmark functions
  const addBookmark = async (scholarship: any, notes?: string) => {
    if (user) {
      try {
        const result = await addUserBookmark(scholarship, notes);
        if (result.success) {
          toast({
            title: 'Bookmark saved!',
            description: 'Scholarship added to your saved list.',
          });
        } else {
          toast({
            title: result.message,
            description: 'This scholarship is already in your saved list.',
            variant: 'destructive',
          });
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to save bookmark.',
          variant: 'destructive',
        });
      }
    } else {
      const result = addLocalBookmark(scholarship, notes);
      if (result.success) {
        toast({
          title: 'Bookmark saved locally!',
          description: 'Sign in to sync your bookmarks across devices.',
        });
      } else {
        toast({
          title: result.message,
          description: 'This scholarship is already in your bookmarks.',
          variant: 'destructive',
        });
      }
    }
  };

  const removeBookmark = async (id: string) => {
    if (user && !id.startsWith('local-')) {
      await removeUserBookmark(id);
    } else {
      removeLocalBookmark(id);
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
      return isLocallyBookmarked(scholarship);
    }
  };

  const getBookmarkId = (scholarship: any) => {
    if (user) {
      const bookmark = bookmarks.find(b => b.scholarship_data.name === scholarship.name);
      return bookmark?.id;
    } else {
      return getLocalBookmarkId(scholarship);
    }
  };

  const getAllBookmarks = () => {
    return user ? bookmarks : localBookmarks;
  };

  // Migrate local bookmarks when user signs in
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
        clearLocalBookmarks();
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

  // Effects
  useEffect(() => {
    if (user) {
      loadUserBookmarks();
    }
  }, [user]);

  useEffect(() => {
    if (user && localBookmarks.length > 0) {
      migrateLocalBookmarks();
    }
  }, [user, localBookmarks.length]);

  return {
    bookmarks: getAllBookmarks(),
    addBookmark,
    removeBookmark,
    isBookmarked,
    getBookmarkId,
    loading,
  };
};
