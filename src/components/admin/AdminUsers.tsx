
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Search, Mail, Calendar, Shield, Plus, User, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import AddUserForm from './AddUserForm';

interface User {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string;
  first_name?: string;
  last_name?: string;
  role?: string;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email, first_name, last_name, role');

      if (profilesError) {
        console.error('Profiles error:', profilesError);
        throw profilesError;
      }

      const usersData = profiles?.map(profile => ({
        id: profile.id,
        email: profile.email || 'No email',
        created_at: new Date().toISOString(),
        last_sign_in_at: new Date().toISOString(),
        first_name: profile.first_name,
        last_name: profile.last_name,
        role: profile.role || 'user'
      })) || [];

      console.log('Fetched users:', usersData);
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) throw error;

      await logAdminAction('UPDATE_ROLE', 'profiles', userId, { role: newRole });
      
      toast({
        title: "Success",
        description: "User role updated successfully",
      });
      
      fetchUsers();
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive",
      });
    }
  };

  const deleteUser = async (userId: string, userEmail: string) => {
    setDeletingUserId(userId);
    try {
      // First delete from profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (profileError) throw profileError;

      // Use admin function to delete from auth.users
      const { error: authError } = await supabase.functions.invoke('delete-user', {
        body: { userId }
      });

      if (authError) {
        console.error('Auth delete error:', authError);
        // If auth delete fails, we should restore the profile
        throw new Error('Failed to delete user from authentication system');
      }

      await logAdminAction('DELETE_USER', 'auth.users', userId, { email: userEmail });
      
      toast({
        title: "Success",
        description: "User deleted successfully",
      });
      
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      });
    } finally {
      setDeletingUserId(null);
    }
  };

  const logAdminAction = async (action: string, targetTable: string, targetId?: string, details?: any) => {
    try {
      await supabase.from('admin_logs').insert([{
        admin_id: (await supabase.auth.getUser()).data.user?.id,
        action,
        target_table: targetTable,
        target_id: targetId,
        details
      }]);
    } catch (error) {
      console.error('Error logging admin action:', error);
    }
  };

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.first_name && user.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.last_name && user.last_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2 text-muted-foreground">Loading users...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg md:text-xl">User Management</CardTitle>
              <CardDescription className="text-sm">
                View and manage user accounts and permissions
              </CardDescription>
            </div>
            <Button 
              onClick={() => setShowAddUserForm(true)}
              className="w-full sm:w-auto"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="space-y-3 md:space-y-4">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="border">
                <CardContent className="p-3 md:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start sm:items-center space-x-3 md:space-x-4 min-w-0 flex-1">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="text-xs md:text-sm text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-sm md:text-base truncate">
                          {user.first_name && user.last_name 
                            ? `${user.first_name} ${user.last_name}` 
                            : 'User'
                          }
                        </h3>
                        <div className="flex items-center text-muted-foreground text-xs md:text-sm">
                          <Mail className="h-3 w-3 md:h-4 md:w-4 mr-1 flex-shrink-0" />
                          <span className="truncate">{user.email}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground text-xs mt-1">
                          <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-1 flex-shrink-0" />
                          <span>Joined: {new Date(user.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-2">
                      <Badge 
                        variant={user.role === 'admin' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        <Shield className="h-3 w-3 mr-1" />
                        {user.role || 'user'}
                      </Badge>
                      
                      <div className="flex gap-2 w-full sm:w-auto">
                        {user.email !== 'saketh1011@gmail.com' && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateUserRole(user.id, user.role === 'admin' ? 'user' : 'admin')}
                              className="text-xs flex-1 sm:flex-initial"
                            >
                              {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                            </Button>
                            
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-xs text-red-600 hover:text-red-800 hover:bg-red-50 flex-1 sm:flex-initial"
                                  disabled={deletingUserId === user.id}
                                >
                                  <Trash2 className="h-3 w-3 mr-1" />
                                  {deletingUserId === user.id ? 'Deleting...' : 'Delete'}
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete User</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete user "{user.first_name} {user.last_name}" ({user.email})? 
                                    This action cannot be undone and will permanently remove their account and all associated data.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => deleteUser(user.id, user.email)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Delete User
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No users found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <AddUserForm 
        isOpen={showAddUserForm}
        onClose={() => setShowAddUserForm(false)}
        onUserAdded={fetchUsers}
      />
    </div>
  );
};

export default AdminUsers;
