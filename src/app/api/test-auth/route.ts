import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';

export async function GET() {
  try {
    // Test server-side Supabase client
    const serverSupabase = await createServerSupabaseClient();
    const serverSession = await serverSupabase.auth.getSession();
    
    // Include environment variables in response (without sensitive values)
    const envInfo = {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 
        `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 10)}...` : 'missing',
    };
    
    return NextResponse.json({
      status: 'success',
      serverSession: serverSession.data,
      environmentInfo: envInfo,
    });
  } catch (error) {
    console.error('Auth test error:', error);
    return NextResponse.json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
} 