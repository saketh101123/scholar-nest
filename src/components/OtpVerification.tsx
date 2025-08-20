
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Mail, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface OtpVerificationProps {
  email: string;
  onVerified: (verified: boolean) => void;
  onBack: () => void;
  mode: 'signin' | 'signup';
}

const OtpVerification = ({ email, onVerified, onBack, mode }: OtpVerificationProps) => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const sendOtp = async () => {
    try {
      const response = await supabase.functions.invoke('send-otp', {
        body: { email }
      });

      if (response.error) {
        throw response.error;
      }

      toast({
        title: 'OTP Sent',
        description: 'Please check your email for the verification code.',
      });
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      setError('Failed to send OTP. Please try again.');
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    setError('');
    await sendOtp();
    setCountdown(60);
    setCanResend(false);
    setIsLoading(false);
  };

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit code');
      setIsLoading(false);
      return;
    }

    try {
      // Verify OTP using secure function
      const { data: isValid, error: otpError } = await supabase
        .rpc('verify_otp', {
          p_email: email,
          p_code: otp
        });

      if (otpError || !isValid) {
        setError('Invalid or expired verification code');
        setIsLoading(false);
        return;
      }

      onVerified(true);
      
      toast({
        title: 'Email Verified',
        description: 'Your email has been successfully verified.',
      });
    } catch (error: any) {
      console.error('Error verifying OTP:', error);
      setError('Verification failed. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Mail className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
        <CardDescription>
          We've sent a 6-digit verification code to<br />
          <span className="font-medium text-gray-900">{email}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={verifyOtp} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div>
            <Label htmlFor="otp">Verification Code</Label>
            <Input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Enter 6-digit code"
              className="text-center text-2xl tracking-widest"
              maxLength={6}
              required
            />
          </div>

          <div className="flex flex-col space-y-3">
            <Button type="submit" className="w-full" disabled={isLoading || otp.length !== 6}>
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </Button>

            <div className="flex items-center justify-between text-sm">
              <button
                type="button"
                onClick={onBack}
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </button>

              <button
                type="button"
                onClick={handleResend}
                disabled={!canResend || isLoading}
                className="flex items-center text-blue-600 hover:text-blue-800 disabled:text-gray-400"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                {canResend ? 'Resend Code' : `Resend in ${countdown}s`}
              </button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default OtpVerification;
