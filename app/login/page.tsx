/**
 * Login Page Component
 * 
 * User authentication page for existing users to sign in to their accounts.
 * Features:
 * - Email and password authentication
 * - Form validation using Zod
 * - Error handling and display
 * - Redirects to dashboard on successful login
 * - Link to registration page for new users
 * 
 * Route: /login
 * 
 * @module app/login/page
 */

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Lock } from "lucide-react"

/**
 * Zod schema for login form validation
 * 
 * Validates:
 * - email: Must be a valid email address
 * - password: Required field (minimum 1 character)
 */
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})

/**
 * TypeScript type inferred from the Zod schema
 * Used for type-safe form data handling
 */
type LoginFormData = z.infer<typeof loginSchema>

/**
 * Login page component
 * 
 * Renders a login form that allows users to authenticate with their
 * email and password. On successful login, redirects to the dashboard.
 * 
 * Features:
 * - Client-side form validation
 * - Loading state during authentication
 * - Error message display
 * - Link to registration page
 * 
 * @returns {JSX.Element} The rendered login page
 * 
 * @remarks
 * This is a Client Component because it uses React hooks and form handling.
 * The middleware protects the /dashboard route, but users can access this
 * page freely to authenticate.
 */
export default function Login() {
  // Router for navigation after successful login
  const router = useRouter()
  
  // Error state for displaying authentication errors
  const [error, setError] = useState<string | null>(null)
  
  // Loading state during authentication request
  const [loading, setLoading] = useState(false)
  
  // Supabase client for authentication
  const supabase = createClient()

  // React Hook Form setup with Zod validation
  const {
    register,          // Register input fields with validation
    handleSubmit,      // Handle form submission
    formState: { errors }, // Form validation errors
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema), // Use Zod for validation
  })

  /**
   * Handles form submission and user authentication
   * 
   * This function:
   * 1. Clears any previous errors
   * 2. Sets loading state
   * 3. Attempts to sign in the user with Supabase
   * 4. Redirects to dashboard on success
   * 5. Displays error message on failure
   * 
   * @param {LoginFormData} data - Validated form data (email and password)
   */
  const onSubmit = async (data: LoginFormData) => {
    setError(null)
    setLoading(true)

    try {
      // Attempt to sign in with email and password
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      // Throw error if authentication failed
      if (authError) throw authError

      // Redirect to dashboard after successful login
      router.push("/dashboard")
      router.refresh() // Refresh to update auth state
    } catch (err: any) {
      // Display error message to user
      setError(err.message || "Invalid email or password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-navy mb-2">Welcome Back</h1>
          <p className="text-gray-600">
            Sign in to access your dashboard
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-navy mb-2">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-navy mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className={`pl-10 ${errors.password ? "border-red-500" : ""}`}
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-orange hover:bg-orange-dark text-white font-semibold py-6"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/register" className="text-orange hover:text-orange-dark font-semibold">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}



