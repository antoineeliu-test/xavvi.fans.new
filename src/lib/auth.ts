import { supabase } from './supabase';

export async function signIn(email: string, password: string) {
  console.log('Signing in with email:', email);
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
    console.error('Sign in error from Supabase:', error);
    throw new Error(error.message);
  }
  
  console.log('Sign in successful, session:', data.session ? 'exists' : 'missing');
  
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error('Error signing out:', error);
    throw new Error('Failed to sign out');
  }
}

export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
} 