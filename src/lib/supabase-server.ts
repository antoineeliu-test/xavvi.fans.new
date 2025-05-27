import { createServerClient } from '@supabase/ssr';
import type { CookieOptions } from '@supabase/ssr';

// Simple server client for read-only operations (data fetching)
export function createServerSupabaseClientSimple() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get() {
          return undefined;
        },
        set() {
          // No-op for read-only operations
        },
        remove() {
          // No-op for read-only operations
        },
      },
    }
  );
}

// Full server client with cookie support (for middleware and auth operations)
export async function createServerSupabaseClient() {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Ignore cookie setting errors in read-only contexts
            console.warn('Failed to set cookie:', error);
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // Ignore cookie removal errors in read-only contexts
            console.warn('Failed to remove cookie:', error);
          }
        },
      },
    }
  );
} 