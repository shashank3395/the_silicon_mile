/**
 * Next.js Middleware Configuration
 * 
 * This middleware runs on every request and handles:
 * - Supabase session refresh and management
 * - Route protection for authenticated routes
 * - Cookie management for authentication state
 * 
 * The middleware intercepts requests before they reach the page components,
 * allowing us to check authentication status and redirect users as needed.
 * 
 * @module middleware
 */

import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

/**
 * Next.js middleware function that runs on every matching request
 * 
 * This function:
 * 1. Updates the Supabase session (refreshes if needed)
 * 2. Checks authentication status
 * 3. Redirects unauthenticated users from protected routes to /login
 * 4. Returns the response with updated session cookies
 * 
 * @param {NextRequest} request - The incoming HTTP request
 * @returns {Promise<Response>} The response with updated session information
 * 
 * @see {@link updateSession} For detailed session update logic
 */
export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

/**
 * Middleware configuration specifying which routes should be processed
 * 
 * This matcher pattern ensures middleware runs on all routes EXCEPT:
 * - Static files (_next/static/*)
 * - Next.js image optimization files (_next/image/*)
 * - Favicon and other static assets
 * - Image files (svg, png, jpg, jpeg, gif, webp)
 * 
 * This improves performance by skipping middleware on static assets that
 * don't need authentication checks.
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Image file extensions (svg, png, jpg, jpeg, gif, webp)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}



