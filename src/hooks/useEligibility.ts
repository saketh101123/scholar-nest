
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface EligibilityData {
  id?: string;
  user_id?: string;
  gender: string;
  caste?: string;
  religion?: string;
  current_class: string;
  percentage?: number;
  family_income: number;
  has_disability: boolean;
  disability_percentage?: number;
  course_type?: string;
  family_status?: string;
  age?: number;
  created_at?: string;
  updated_at?: string;
}

export const useEligibility = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: eligibilityData, isLoading, error } = useQuery({
    queryKey: ['eligibility', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('user_eligibility')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      return data as EligibilityData | null;
    },
    enabled: !!user,
  });

  const saveEligibility = useMutation({
    mutationFn: async (formData: EligibilityData) => {
      if (!user) throw new Error('User not authenticated');
      
      const eligibilityPayload = {
        ...formData,
        user_id: user.id,
      };

      // Try to update first, if no record exists, insert
      const { data: existingData } = await supabase
        .from('user_eligibility')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (existingData) {
        // Update existing record
        const { data, error } = await supabase
          .from('user_eligibility')
          .update(eligibilityPayload)
          .eq('user_id', user.id)
          .select()
          .single();

        if (error) throw error;
        return data;
      } else {
        // Insert new record
        const { data, error } = await supabase
          .from('user_eligibility')
          .insert(eligibilityPayload)
          .select()
          .single();

        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eligibility'] });
    },
  });

  return {
    eligibilityData,
    isLoading,
    error,
    saveEligibility,
  };
};
