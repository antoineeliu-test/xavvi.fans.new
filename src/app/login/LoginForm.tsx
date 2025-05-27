'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FiMail, FiLock } from 'react-icons/fi';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useAuth } from '@/app/auth-provider';

// Form validation schema
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  
  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setErrorMessage(null);
    
    console.log('Attempting to sign in with:', data.email);
    
    try {
      const { error } = await signIn(data.email, data.password);
      
      if (error) {
        throw error;
      }
      
      console.log('Sign in successful');
      router.push('/admin/dashboard');
      router.refresh();
    } catch (error) {
      console.error('Sign in error:', error);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {errorMessage && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-4">
          {errorMessage}
        </div>
      )}
      
      <div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiMail className="text-gray-400" />
          </div>
          <Input
            {...register('email')}
            type="email"
            placeholder="Email address"
            className="pl-10"
            error={errors.email?.message}
          />
        </div>
      </div>
      
      <div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiLock className="text-gray-400" />
          </div>
          <Input
            {...register('password')}
            type="password"
            placeholder="Password"
            className="pl-10"
            error={errors.password?.message}
          />
        </div>
      </div>
      
      <Button
        type="submit"
        variant="primary"
        isLoading={isLoading}
        className="w-full"
      >
        Sign In
      </Button>
    </form>
  );
} 