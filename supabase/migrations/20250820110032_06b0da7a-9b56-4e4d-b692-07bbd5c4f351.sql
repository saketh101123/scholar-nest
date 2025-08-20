-- Fix function search path security warnings
CREATE OR REPLACE FUNCTION public.verify_otp(
  p_email text,
  p_code text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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

CREATE OR REPLACE FUNCTION public.create_otp(
  p_email text,
  p_code text,
  p_expires_at timestamp with time zone
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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

CREATE OR REPLACE FUNCTION public.cleanup_expired_otps()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  DELETE FROM public.otp_codes 
  WHERE expires_at < now() - interval '1 hour';
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;