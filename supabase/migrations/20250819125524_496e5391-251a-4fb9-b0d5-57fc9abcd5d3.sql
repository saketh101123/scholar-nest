
-- Create table for user applications
CREATE TABLE public.applications (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users NOT NULL,
  scholarship_id uuid REFERENCES public.scholarships(id) NOT NULL,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'in_progress', 'submitted', 'under_review', 'accepted', 'rejected')),
  progress integer NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  documents_submitted integer NOT NULL DEFAULT 0,
  total_documents integer NOT NULL DEFAULT 4,
  notes text,
  submitted_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create table for eligibility form data
CREATE TABLE public.user_eligibility (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users NOT NULL,
  gender text NOT NULL,
  caste text,
  religion text,
  current_class text NOT NULL,
  percentage integer,
  family_income integer NOT NULL,
  has_disability boolean NOT NULL DEFAULT false,
  disability_percentage integer DEFAULT 0,
  course_type text,
  family_status text,
  age integer,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS on both tables
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_eligibility ENABLE ROW LEVEL SECURITY;

-- RLS policies for applications
CREATE POLICY "Users can view their own applications" 
  ON public.applications 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own applications" 
  ON public.applications 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own applications" 
  ON public.applications 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own applications" 
  ON public.applications 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Admin policies for applications
CREATE POLICY "Admins can manage all applications" 
  ON public.applications 
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- RLS policies for user_eligibility
CREATE POLICY "Users can view their own eligibility data" 
  ON public.user_eligibility 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own eligibility data" 
  ON public.user_eligibility 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own eligibility data" 
  ON public.user_eligibility 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Admin policies for user_eligibility
CREATE POLICY "Admins can view all eligibility data" 
  ON public.user_eligibility 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- Create trigger to update updated_at column
CREATE TRIGGER update_applications_updated_at 
  BEFORE UPDATE ON public.applications 
  FOR EACH ROW 
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_eligibility_updated_at 
  BEFORE UPDATE ON public.user_eligibility 
  FOR EACH ROW 
  EXECUTE FUNCTION public.update_updated_at_column();
