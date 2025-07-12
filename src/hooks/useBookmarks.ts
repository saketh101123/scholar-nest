
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

  console.log('Current user:', user ? 'logged in' : 'not logged in');
  console.log('User bookmarks count:', bookmarks.length);
  console.log('Local bookmarks count:', localBookmarks.length);

  // Load user bookmarks from database
  const loadUserBookmarks = async () => {
    if (!user) return;

    setLoading(true);
    try {
      console.log('Loading user bookmarks for user:', user.id);
      const { data, error } = await supabase
        .from('saved_scholarships')
        .select('*')
        .eq('user_id', user.id)
        .order('saved_at', { ascending: false });

      if (error) throw error;
      console.log('Loaded bookmarks:', data?.length || 0);
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
      console.log('Adding user bookmark for scholarship:', scholarship.name);
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

      console.log('Successfully added bookmark:', data.id);
      setBookmarks(prev => [data, ...prev]);
      return { success: true, message: 'Bookmark saved!' };
    } catch (error: any) {
      console.error('Error adding bookmark:', error);
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
      console.log('Removing user bookmark:', id);
      const { error } = await supabase
        .from('saved_scholarships')
        .delete()
        .eq('id', id);

      if (error) throw error;

      console.log('Successfully removed bookmark');
      setBookmarks(prev => prev.filter(b => b.id !== id));
      toast({
        title: 'Bookmark removed',
        description: 'Scholarship removed from your saved list.',
      });
    } catch (error: any) {
      console.error('Error removing bookmark:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove bookmark.',
        variant: 'destructive',
      });
    }
  };

  // Main bookmark functions
  const addBookmark = async (scholarship: any, notes?: string) => {
    console.log('addBookmark called for:', scholarship.name);
    
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
        console.error('Error in addBookmark:', error);
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
    console.log('removeBookmark called for id:', id);
    
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
    console.log('Checking if bookmarked:', scholarship.name);
    
    if (user) {
      const found = bookmarks.some(b => {
        const match = b.scholarship_data?.name === scholarship.name;
        console.log(`Comparing "${b.scholarship_data?.name}" with "${scholarship.name}": ${match}`);
        return match;
      });
      console.log('User bookmark result:', found);
      return found;
    } else {
      const found = isLocallyBookmarked(scholarship);
      console.log('Local bookmark result:', found);
      return found;
    }
  };

  const getBookmarkId = (scholarship: any) => {
    if (user) {
      const bookmark = bookmarks.find(b => b.scholarship_data?.name === scholarship.name);
      const id = bookmark?.id;
      console.log('Found user bookmark ID:', id);
      return id;
    } else {
      const id = getLocalBookmarkId(scholarship);
      console.log('Found local bookmark ID:', id);
      return id;
    }
  };

  const getAllBookmarks = () => {
    return user ? bookmarks : localBookmarks;
  };

  // Migrate local bookmarks when user signs in
  const migrateLocalBookmarks = async () => {
    if (!user || localBookmarks.length === 0) return;

    try {
      console.log('Migrating local bookmarks:', localBookmarks.length);
      const migrations = localBookmarks.map(bookmark => ({
        user_id: user.id,
        scholarship_data: bookmark.scholarship_data,
        notes: bookmark.notes,
      }));

      const { error } = await supabase
        .from('saved_scholarships')
        .insert(migrations);

      if (!error) {
        console.log('Migration successful');
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
      console.log('User logged in, loading bookmarks');
      loadUserBookmarks();
    } else {
      console.log('No user, clearing bookmarks');
      setBookmarks([]);
    }
  }, [user]);

  useEffect(() => {
    if (user && localBookmarks.length > 0) {
      console.log('User logged in with local bookmarks, migrating');
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
