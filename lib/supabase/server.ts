/**
 * Supabase client configuration for server-side usage
 * 
 * This module provides a server-side Supabase client instance that can be used
 * in Next.js Server Components, Server Actions, and API routes. It properly
 * handles cookies for session management in the server environment.
 * 
 * @module lib/supabase/server
 */

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Creates and returns a Supabase client instance for use in server components and API routes
 * 
 * This function creates a Supabase client that:
 * - Runs on the server (Node.js environment)
 * - Uses Next.js cookies() for session management
 * - Properly handles cookie reading and writing for SSR
 * - Can be used in Server Components and API routes
 * 
 * IMPORTANT: This must be called as an async function in Next.js 15+ because
 * cookies() is now an async API.
 * 
 * @returns {Promise<ReturnType<typeof createServerClient>>} A configured Supabase client instance
 * 
 * @example
 * // In a server component
 * import { createClient } from '@/lib/supabase/server'
 * 
 * export default async function MyPage() {
 *   const supabase = await createClient()
 *   const { data: { user } } = await supabase.auth.getUser()
 *   // Use user data to render page
 * }
 * 
 * @example
 * // In an API route
 * import { createClient } from '@/lib/supabase/server'
 * 
 * export async function GET(request: Request) {
 *   const supabase = await createClient()
 *   const { data } = await supabase.from('registrations').select('*')
 *   return Response.json(data)
 * }
 * 
 * @remarks
 * The try-catch in setAll is necessary because Server Components may not be able
 * to set cookies directly. The middleware handles session refresh, so this error
 * can be safely ignored.
 */
export async function createClient() {
  // Get the cookie store from Next.js (async in Next.js 15+)
  const cookieStore = await cookies()

  // Create and return the server client with cookie handlers
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        /**
         * Retrieves all cookies from the Next.js cookie store
         */
        getAll() {
          return cookieStore.getAll()
        },
        /**
         * Sets cookies in the Next.js cookie store
         * 
         * Note: In Server Components, setting cookies may fail. This is expected
         * and can be ignored because middleware handles session refresh.
         */
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}



