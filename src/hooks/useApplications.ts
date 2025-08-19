
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Application {
  id: string;
  user_id: string;
  scholarship_id: string;
  status: 'draft' | 'in_progress' | 'submitted' | 'under_review' | 'accepted' | 'rejected';
  progress: number;
  documents_submitted: number;
  total_documents: number;
  notes?: string;
  submitted_at?: string;
  created_at: string;
  updated_at: string;
  scholarships?: {
    name: string;
    application_deadline: string;
  };
}

export const useApplications = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: applications = [], isLoading, error } = useQuery({
    queryKey: ['applications', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          scholarships (
            name,
            application_deadline
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Application[];
    },
    enabled: !!user,
  });

  const createApplication = useMutation({
    mutationFn: async (applicationData: Partial<Application>) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('applications')
        .insert({
          ...applicationData,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });

  const updateApplication = useMutation({
    mutationFn: async ({ id, ...updateData }: Partial<Application> & { id: string }) => {
      const { data, error } = await supabase
        .from('applications')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });

  return {
    applications,
    isLoading,
    error,
    createApplication,
    updateApplication,
  };
};
