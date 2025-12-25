/**
 * Supabase middleware helper for session management
 * 
 * This module provides middleware functions for handling Supabase authentication
 * sessions in Next.js middleware. It ensures that user sessions are properly
 * refreshed on each request and handles route protection.
 * 
 * @module lib/supabase/middleware
 */

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Updates the user session and handles route protection based on authentication status
 * 
 * This function:
 * 1. Creates a Supabase client for middleware context
 * 2. Retrieves the current user session
 * 3. Redirects unauthenticated users away from protected routes
 * 4. Returns a response with updated session cookies
 * 
 * IMPORTANT: This function must be called for every request that needs session
 * management. It should be called from Next.js middleware.
 * 
 * Protected routes:
 * - /dashboard - Requires authentication
 * - /admin - Requires authentication (additional admin check in page component)
 * 
 * Public routes (allowed without authentication):
 * - /login
 * - /register
 * - All other routes
 * 
 * @param {NextRequest} request - The incoming Next.js request object
 * @returns {Promise<NextResponse>} A Next.js response with updated session cookies
 * 
 * @example
 * // In middleware.ts
 * import { updateSession } from '@/lib/supabase/middleware'
 * 
 * export async function middleware(request: NextRequest) {
 *   return await updateSession(request)
 * }
 * 
 * @remarks
 * - Do not add logic between createServerClient and getUser() as it can cause
 *   session issues
 * - The supabaseResponse object must be returned as-is to maintain cookie sync
 *   between browser and server
 */
export async function updateSession(request: NextRequest) {
  // Initialize the response object
  // This will be updated with cookies as they are set
  let supabaseResponse = NextResponse.next({
    request,
  })

  // Create Supabase client for middleware with cookie handlers
  // This client reads from request cookies and writes to response cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        /**
         * Gets all cookies from the incoming request
         */
        getAll() {
          return request.cookies.getAll()
        },
        /**
         * Sets cookies on the response object
         * 
         * This handler updates both the request cookies (for immediate use)
         * and the response cookies (to send to the browser)
         */
        setAll(cookiesToSet) {
          // Update request cookies (for current request processing)
          cookiesToSet.forEach(({ name, value, options }) => 
            request.cookies.set(name, value)
          )
          
          // Create a new response with the request
          supabaseResponse = NextResponse.next({
            request,
          })
          
          // Set cookies on the response (to send to browser)
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // Get the current user from the session
  // This will refresh the session if needed
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Route protection: Redirect unauthenticated users away from protected routes
  // Protected routes: /dashboard and /admin
  // Public routes: /login, /register, and everything else
  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/register') &&
    (request.nextUrl.pathname.startsWith('/dashboard') ||
     request.nextUrl.pathname.startsWith('/admin'))
  ) {
    // User is not authenticated and trying to access a protected route
    // Redirect to login page
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely.

  return supabaseResponse
}

