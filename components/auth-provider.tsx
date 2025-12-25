/**
 * Authentication Provider Component
 * 
 * Provides global authentication state to all components in the application
 * using React Context API. Manages user session state, loading states, and
 * provides sign-out functionality.
 * 
 * This component must be used as a client component ("use client") because
 * it uses React hooks and browser APIs.
 * 
 * @module components/auth-provider
 */

"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

/**
 * Authentication context type definition
 * 
 * Defines the shape of the authentication context value that will be
 * provided to all consuming components.
 */
interface AuthContextType {
  /** Current authenticated user object, or null if not authenticated */
  user: User | null
  /** Whether authentication state is currently being checked */
  loading: boolean
  /** Function to sign out the current user */
  signOut: () => Promise<void>
}

/**
 * Authentication context instance
 * 
 * Created with default values. Components using this context will receive
 * these values if used outside of the AuthProvider.
 */
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
})

/**
 * Authentication Provider component
 * 
 * Wraps the application (or a portion of it) to provide authentication state
 * to all child components. This component:
 * 
 * 1. Initializes the Supabase client
 * 2. Fetches the current user session on mount
 * 3. Listens for authentication state changes (login, logout, token refresh)
 * 4. Provides user state, loading state, and signOut function via context
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that will have access to auth context
 * @returns {JSX.Element} The AuthContext provider wrapping the children
 * 
 * @example
 * // In app/layout.tsx
 * <AuthProvider>
 *   <Navbar />
 *   <main>{children}</main>
 * </AuthProvider>
 * 
 * @example
 * // Using in a component
 * import { useAuth } from '@/components/auth-provider'
 * 
 * function MyComponent() {
 *   const { user, loading, signOut } = useAuth()
 *   if (loading) return <div>Loading...</div>
 *   if (!user) return <div>Please log in</div>
 *   return <div>Welcome, {user.email}!</div>
 * }
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // State management for current user and loading status
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  
  // Initialize Supabase client for browser-side operations
  const supabase = createClient()

  /**
   * Effect hook to initialize and monitor authentication state
   * 
   * This effect:
   * 1. Fetches the current session on component mount
   * 2. Sets up a listener for authentication state changes
   * 3. Updates user state whenever auth state changes (login, logout, token refresh)
   * 4. Cleans up the subscription on component unmount
   */
  useEffect(() => {
    // Get initial session from Supabase
    // This checks if the user is already logged in when the app loads
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Set up listener for authentication state changes
    // This will fire on: login, logout, token refresh, session expiration
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // Update user state based on session
      // If session exists, extract user; otherwise set to null
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Cleanup: unsubscribe from auth state changes when component unmounts
    return () => subscription.unsubscribe()
  }, [supabase])

  /**
   * Signs out the current user
   * 
   * This function:
   * 1. Calls Supabase signOut() to clear the session
   * 2. Updates local user state to null
   * 
   * Note: The auth state change listener will also fire, but we update
   * state immediately for immediate UI feedback.
   * 
   * @returns {Promise<void>} Promise that resolves when sign out is complete
   */
  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  // Provide auth context value to all child components
  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Hook to access authentication context
 * 
 * Custom hook that provides easy access to the authentication context.
 * Must be used within an AuthProvider component.
 * 
 * @returns {AuthContextType} The authentication context value containing user, loading, and signOut
 * 
 * @throws {Error} Will throw an error if used outside of AuthProvider
 * 
 * @example
 * function MyComponent() {
 *   const { user, loading, signOut } = useAuth()
 *   
 *   if (loading) return <div>Loading...</div>
 *   if (!user) return <div>Not logged in</div>
 *   
 *   return (
 *     <div>
 *       <p>Logged in as {user.email}</p>
 *       <button onClick={signOut}>Sign Out</button>
 *     </div>
 *   )
 * }
 */
export const useAuth = () => useContext(AuthContext)



