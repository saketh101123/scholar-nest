
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';

const AuthButton = () => {
  const { user, signOut } = useAuth();

  if (user) {
    return (
      <div className="flex items-center space-x-2">
        <Link to="/saved">
          <Button variant="ghost" size="sm">
            <User className="w-4 h-4 mr-2" />
            Saved
          </Button>
        </Link>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => signOut()}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <Link to="/auth">
      <Button variant="default" size="sm">
        Sign In
      </Button>
    </Link>
  );
};

export default AuthButton;
