-- Drop the existing insecure policies
DROP POLICY IF EXISTS "Anyone can verify OTP codes" ON public.otp_codes;
DROP POLICY IF EXISTS "Anyone can update OTP codes" ON public.otp_codes;

-- Create a secure function to verify OTP codes without exposing data
CREATE OR REPLACE FUNCTION public.verify_otp(
  p_email text,
  p_code text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  otp_record record;
BEGIN
  -- Find valid, unverified OTP code
  SELECT id INTO otp_record
  FROM public.otp_codes
  WHERE email = p_email
    AND code = p_code
    AND verified = false
    AND expires_at > now()
  ORDER BY created_at DESC
  LIMIT 1;

  -- If valid OTP found, mark as verified and return true
  IF otp_record.id IS NOT NULL THEN
    UPDATE public.otp_codes
    SET verified = true
    WHERE id = otp_record.id;
    
    RETURN true;
  END IF;

  -- No valid OTP found
  RETURN false;
END;
$$;

-- Create a function to create OTP codes (replaces direct INSERT)
CREATE OR REPLACE FUNCTION public.create_otp(
  p_email text,
  p_code text,
  p_expires_at timestamp with time zone
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.otp_codes (email, code, expires_at)
  VALUES (p_email, p_code, p_expires_at);
  
  RETURN true;
EXCEPTION
  WHEN OTHERS THEN
    RETURN false;
END;
$$;

-- Replace the existing permissive INSERT policy with a more restrictive one
DROP POLICY IF EXISTS "Anyone can create OTP codes" ON public.otp_codes;

-- No direct access policies needed since we use security definer functions
-- This effectively blocks all direct table access