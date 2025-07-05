-- Create scholarships table to store all scholarship data
CREATE TABLE public.scholarships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  provider TEXT NOT NULL,
  amount TEXT NOT NULL,
  description TEXT NOT NULL,
  eligibility TEXT NOT NULL,
  category TEXT NOT NULL,
  level TEXT NOT NULL,
  application_deadline TEXT NOT NULL,
  official_website TEXT NOT NULL,
  requirements JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create saved_scholarships table for user bookmarks
CREATE TABLE public.saved_scholarships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  scholarship_id UUID REFERENCES public.scholarships(id) ON DELETE CASCADE NOT NULL,
  saved_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  notes TEXT,
  UNIQUE(user_id, scholarship_id)
);

-- Create local_bookmarks table for non-authenticated users
CREATE TABLE public.local_bookmarks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  scholarship_data JSONB NOT NULL,
  bookmarked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.scholarships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_scholarships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.local_bookmarks ENABLE ROW LEVEL SECURITY;

-- Policies for scholarships (public read access)
CREATE POLICY "Anyone can view scholarships" 
ON public.scholarships 
FOR SELECT 
USING (true);

-- Policies for saved_scholarships
CREATE POLICY "Users can view their own saved scholarships" 
ON public.saved_scholarships 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can save scholarships" 
ON public.saved_scholarships 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their saved scholarships" 
ON public.saved_scholarships 
FOR DELETE 
USING (auth.uid() = user_id);

-- Policies for local_bookmarks (session-based access)
CREATE POLICY "Anyone can manage local bookmarks" 
ON public.local_bookmarks 
FOR ALL 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_scholarships_updated_at
BEFORE UPDATE ON public.scholarships
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();