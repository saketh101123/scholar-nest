-- First, drop the OTP codes table since email verification was removed
DROP TABLE IF EXISTS public.otp_codes;

-- Drop the OTP-related functions since they're no longer needed
DROP FUNCTION IF EXISTS public.create_otp(text, text, timestamp with time zone);
DROP FUNCTION IF EXISTS public.verify_otp(text, text);
DROP FUNCTION IF EXISTS public.cleanup_expired_otps();

-- Create a new scholarships table with integer auto-increment ID
CREATE TABLE public.scholarships_new (
  id SERIAL PRIMARY KEY,
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

-- Enable RLS on the new table
ALTER TABLE public.scholarships_new ENABLE ROW LEVEL SECURITY;

-- Create policies for the new table
CREATE POLICY "Admins can manage scholarships" 
ON public.scholarships_new 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.id = auth.uid() 
  AND profiles.role = 'admin'
));

CREATE POLICY "Anyone can view scholarships" 
ON public.scholarships_new 
FOR SELECT 
USING (true);

-- Copy data from old table to new table
INSERT INTO public.scholarships_new (
  name, provider, amount, description, eligibility, 
  category, level, application_deadline, official_website, 
  requirements, created_at, updated_at
)
SELECT 
  name, provider, amount, description, eligibility,
  category, level, application_deadline, official_website,
  requirements, created_at, updated_at
FROM public.scholarships;

-- Update applications table to use integer scholarship_id
ALTER TABLE public.applications 
ADD COLUMN scholarship_id_new INTEGER;

-- Update the applications with the new integer IDs
-- This assumes the scholarships are inserted in the same order
UPDATE public.applications 
SET scholarship_id_new = s_new.id
FROM public.scholarships s_old
JOIN public.scholarships_new s_new ON (
  s_new.name = s_old.name 
  AND s_new.provider = s_old.provider
)
WHERE applications.scholarship_id = s_old.id;

-- Drop the old scholarship_id column and rename the new one
ALTER TABLE public.applications DROP COLUMN scholarship_id;
ALTER TABLE public.applications RENAME COLUMN scholarship_id_new TO scholarship_id;
ALTER TABLE public.applications ALTER COLUMN scholarship_id SET NOT NULL;

-- Update saved_scholarships to work with the new structure
-- Since saved_scholarships stores scholarship_data as JSONB, we need to update the IDs in the JSON
UPDATE public.saved_scholarships 
SET scholarship_data = jsonb_set(
  scholarship_data, 
  '{id}', 
  to_jsonb(s_new.id)
)
FROM public.scholarships s_old
JOIN public.scholarships_new s_new ON (
  s_new.name = s_old.name 
  AND s_new.provider = s_old.provider
)
WHERE (scholarship_data->>'id')::uuid = s_old.id;

-- Drop the old scholarships table
DROP TABLE public.scholarships;

-- Rename the new table to scholarships
ALTER TABLE public.scholarships_new RENAME TO scholarships;

-- Add trigger for updated_at
CREATE TRIGGER update_scholarships_updated_at
  BEFORE UPDATE ON public.scholarships
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();