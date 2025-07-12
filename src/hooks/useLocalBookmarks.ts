
import { useState, useEffect } from 'react';

interface LocalBookmark {
  id: string;
  scholarship_data: any;
  saved_at: string;
  notes?: string;
}

export const useLocalBookmarks = () => {
  const [localBookmarks, setLocalBookmarks] = useState<LocalBookmark[]>([]);

  const getSessionId = () => {
    let sessionId = localStorage.getItem('bookmarkSessionId');
    if (!sessionId) {
      sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('bookmarkSessionId', sessionId);
    }
    return sessionId;
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

  const saveLocalBookmarks = (bookmarks: LocalBookmark[]) => {
    localStorage.setItem('localBookmarks', JSON.stringify(bookmarks));
    setLocalBookmarks(bookmarks);
  };

  const addLocalBookmark = (scholarship: any, notes?: string) => {
    const newBookmark: LocalBookmark = {
      id: `local-${Date.now()}`,
      scholarship_data: scholarship,
      saved_at: new Date().toISOString(),
      notes,
    };

    const existing = localBookmarks.find(b => 
      b.scholarship_data.name === scholarship.name
    );

    if (existing) {
      return { success: false, message: 'Already saved' };
    }

    const updated = [newBookmark, ...localBookmarks];
    saveLocalBookmarks(updated);
    return { success: true, message: 'Saved locally' };
  };

  const removeLocalBookmark = (id: string) => {
    const updated = localBookmarks.filter(b => b.id !== id);
    saveLocalBookmarks(updated);
  };

  const isLocallyBookmarked = (scholarship: any) => {
    return localBookmarks.some(b => b.scholarship_data.name === scholarship.name);
  };

  const getLocalBookmarkId = (scholarship: any) => {
    const bookmark = localBookmarks.find(b => b.scholarship_data.name === scholarship.name);
    return bookmark?.id;
  };

  const clearLocalBookmarks = () => {
    localStorage.removeItem('localBookmarks');
    setLocalBookmarks([]);
  };

  useEffect(() => {
    loadLocalBookmarks();
  }, []);

  return {
    localBookmarks,
    addLocalBookmark,
    removeLocalBookmark,
    isLocallyBookmarked,
    getLocalBookmarkId,
    clearLocalBookmarks,
  };
};
