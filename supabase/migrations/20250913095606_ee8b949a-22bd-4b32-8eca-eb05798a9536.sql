-- Create a security definer function to get current user's role
-- This prevents RLS recursion issues when checking roles
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;

-- Drop the existing hardcoded email-based admin policy
DROP POLICY IF EXISTS "profiles_admin_policy" ON public.profiles;

-- Create new role-based admin policy
CREATE POLICY "Admins can manage all profiles" 
ON public.profiles 
FOR ALL 
USING (public.get_current_user_role() = 'admin');

-- Create a policy for admins to view all profiles (more specific)
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (public.get_current_user_role() = 'admin');

-- Ensure the hardcoded admin user gets admin role
-- Update the specific user to have admin role instead of relying on hardcoded email
UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'saketh1011@gmail.com';