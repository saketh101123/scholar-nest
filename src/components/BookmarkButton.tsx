
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

  const handleClick = async () => {
    if (bookmarked && bookmarkId) {
      await removeBookmark(bookmarkId);
    } else {
      await addBookmark(scholarship);
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
