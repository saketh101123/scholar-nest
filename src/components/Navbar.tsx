
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { GraduationCap, Menu, Calendar, LayoutDashboard, Shield } from 'lucide-react';
import AuthButton from './AuthButton';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        console.log('No user found');
        setIsAdmin(false);
        return;
      }

      console.log('Checking admin status for user:', user.email, user.id);

      try {
        // First, let's check if the profile exists
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role, email')
          .eq('id', user.id)
          .single();

        console.log('Profile data:', profile);
        console.log('Profile error:', error);

        if (error) {
          console.error('Error fetching profile:', error);
          
          // If profile doesn't exist, create it for saketh1011@gmail.com
          if (error.code === 'PGRST116' && user.email === 'saketh1011@gmail.com') {
            console.log('Creating admin profile for saketh1011@gmail.com');
            const { data: newProfile, error: createError } = await supabase
              .from('profiles')
              .insert([
                {
                  id: user.id,
                  email: user.email,
                  role: 'admin'
                }
              ])
              .select()
              .single();

            console.log('New profile created:', newProfile);
            console.log('Create error:', createError);

            if (!createError && user.email === 'saketh1011@gmail.com') {
              setIsAdmin(true);
            }
          } else {
            setIsAdmin(false);
          }
        } else {
          console.log('Profile role:', profile?.role);
          console.log('User email:', user.email);
          const isAdminUser = profile?.role === 'admin' && user.email === 'saketh1011@gmail.com';
          console.log('Is admin user:', isAdminUser);
          setIsAdmin(isAdminUser);
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  const isActive = (path: string) => location.pathname === path;

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Browse', href: '/browse' },
    { name: 'Eligibility', href: '/eligibility' },
    ...(user ? [{ name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard }] : []),
    ...(isAdmin ? [{ name: 'Admin', href: '/admin', icon: Shield }] : []),
    { name: 'Calendar', href: '/calendar', icon: Calendar },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-scholar rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">ScholarNest</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link key={item.name} to={item.href}>
                <Button
                  variant={isActive(item.href) ? 'default' : 'ghost'}
                  className="flex items-center space-x-1"
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  <span>{item.name}</span>
                </Button>
              </Link>
            ))}
          </div>

          {/* Auth Button */}
          <div className="hidden md:flex">
            <AuthButton />
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                    >
                      <Button
                        variant={isActive(item.href) ? 'default' : 'ghost'}
                        className="w-full justify-start"
                      >
                        {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                        {item.name}
                      </Button>
                    </Link>
                  ))}
                  <div className="pt-4 border-t">
                    <AuthButton />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
