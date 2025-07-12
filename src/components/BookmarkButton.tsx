
import { Button } from '@/components/ui/button';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useBookmarks } from '@/hooks/useBookmarks';

interface BookmarkButtonProps {
  scholarship: any;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'ghost' | 'outline';
}

const BookmarkButton = ({ 
  scholarship, 
  size = 'sm', 
  variant = 'ghost' 
}: BookmarkButtonProps) => {
  const { isBookmarked, addBookmark, removeBookmark, getBookmarkId } = useBookmarks();
  
  const bookmarked = isBookmarked(scholarship);
  const bookmarkId = getBookmarkId(scholarship);

  console.log('BookmarkButton render:', {
    scholarshipName: scholarship.name,
    bookmarked,
    bookmarkId
  });

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Bookmark button clicked for:', scholarship.name);
    console.log('Current state - bookmarked:', bookmarked, 'bookmarkId:', bookmarkId);
    
    try {
      if (bookmarked && bookmarkId) {
        console.log('Removing bookmark...');
        await removeBookmark(bookmarkId);
      } else {
        console.log('Adding bookmark...');
        await addBookmark(scholarship);
      }
    } catch (error) {
      console.error('Error in bookmark button click:', error);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={bookmarked ? 'text-yellow-600' : ''}
    >
      {bookmarked ? (
        <BookmarkCheck className="w-4 h-4" />
      ) : (
        <Bookmark className="w-4 h-4" />
      )}
    </Button>
  );
};

export default BookmarkButton;
