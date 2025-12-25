/**
 * Supabase client configuration for browser-side usage
 * 
 * This module provides a client-side Supabase client instance that can be used
 * in React components that run in the browser. It uses the browser's storage
 * for session management.
 * 
 * @module lib/supabase/client
 */

import { createBrowserClient } from '@supabase/ssr'

/**
 * Creates and returns a Supabase client instance for use in browser/client components
 * 
 * This function creates a Supabase client that:
 * - Runs in the browser environment
 * - Uses browser storage for session management
 * - Automatically handles authentication state
 * - Can be used in React components marked with "use client"
 * 
 * @returns {ReturnType<typeof createBrowserClient>} A configured Supabase client instance
 * 
 * @throws {Error} Throws an error if Supabase environment variables are not configured
 * 
 * @example
 * // In a client component
 * "use client"
 * import { createClient } from '@/lib/supabase/client'
 * 
 * export default function MyComponent() {
 *   const supabase = createClient()
 *   // Use supabase client for auth, database queries, etc.
 * }
 * 
 * @example
 * // Using for authentication
 * const { data: { user } } = await supabase.auth.getUser()
 * 
 * @example
 * // Using for database queries
 * const { data, error } = await supabase.from('registrations').select('*')
 */
export function createClient() {
  // Retrieve environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Validate that required environment variables are present
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase environment variables!\n\n' +
      'Please create a .env.local file in the root directory with:\n' +
      'NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url\n' +
      'NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key\n\n' +
      'Get these values from: https://supabase.com/dashboard/project/_/settings/api'
    )
  }

  // Create and return the browser client instance
  // This client will handle cookies and session management automatically
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}



