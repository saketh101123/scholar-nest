
-- Create table for storing OTP codes
CREATE TABLE public.otp_codes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  code text NOT NULL,
  expires_at timestamp with time zone NOT NULL,
  verified boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Add index for faster lookups
CREATE INDEX idx_otp_codes_email ON public.otp_codes(email);
CREATE INDEX idx_otp_codes_expires_at ON public.otp_codes(expires_at);

-- Enable RLS
ALTER TABLE public.otp_codes ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to insert OTP codes (needed for registration)
CREATE POLICY "Anyone can create OTP codes" 
  ON public.otp_codes 
  FOR INSERT 
  WITH CHECK (true);

-- Policy to allow verification of OTP codes
CREATE POLICY "Anyone can verify OTP codes" 
  ON public.otp_codes 
  FOR SELECT 
  USING (true);

-- Policy to allow updating OTP codes for verification
CREATE POLICY "Anyone can update OTP codes" 
  ON public.otp_codes 
  FOR UPDATE 
  USING (true);

-- Function to clean up expired OTP codes
CREATE OR REPLACE FUNCTION public.cleanup_expired_otps()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
AS $$
  DELETE FROM public.otp_codes 
  WHERE expires_at < now() - interval '1 hour';
$$;

-- Add email column to profiles table if it doesn't exist (for better user management)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'email') THEN
    ALTER TABLE public.profiles ADD COLUMN email text;
  END IF;
END $$;

-- Update the handle_new_user function to also store email
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, email)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    new.email
  );
  RETURN new;
END;
$$;
