/**
 * Registration Page Component
 * 
 * User registration page for new users to create an account.
 * Features:
 * - Account creation with email and password
 * - User metadata collection (full name, company)
 * - Form validation using Zod
 * - Error handling and display
 * - Redirects to dashboard on successful registration
 * - Link to login page for existing users
 * 
 * Route: /register
 * 
 * @module app/register/page
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
import { Mail, Lock, User, Building } from "lucide-react"

/**
 * Zod schema for registration form validation
 * 
 * Validates:
 * - email: Must be a valid email address
 * - password: Minimum 6 characters
 * - fullName: Minimum 2 characters
 * - company: Minimum 2 characters
 */
const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
})

/**
 * TypeScript type inferred from the Zod schema
 * Used for type-safe form data handling
 */
type SignupFormData = z.infer<typeof signupSchema>

/**
 * Registration page component
 * 
 * Renders a registration form that allows new users to create an account.
 * On successful registration, redirects to the dashboard where they can
 * complete their event registration.
 * 
 * Features:
 * - Client-side form validation
 * - Loading state during account creation
 * - Error message display
 * - Link to login page
 * - Stores user metadata (name, company) in Supabase
 * 
 * @returns {JSX.Element} The rendered registration page
 * 
 * @remarks
 * This is a Client Component because it uses React hooks and form handling.
 * User metadata (full_name, company) is stored in the user's metadata object
 * in Supabase Auth, making it accessible throughout the application.
 */
export default function Register() {
  // Router for navigation after successful registration
  const router = useRouter()
  
  // Error state for displaying registration errors
  const [error, setError] = useState<string | null>(null)
  
  // Loading state during account creation
  const [loading, setLoading] = useState(false)
  
  // Supabase client for authentication
  const supabase = createClient()

  // React Hook Form setup with Zod validation
  const {
    register,          // Register input fields with validation
    handleSubmit,      // Handle form submission
    formState: { errors }, // Form validation errors
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema), // Use Zod for validation
  })

  /**
   * Handles form submission and user account creation
   * 
   * This function:
   * 1. Clears any previous errors
   * 2. Sets loading state
   * 3. Creates a new user account with Supabase
   * 4. Stores user metadata (full_name, company)
   * 5. Redirects to dashboard on success
   * 6. Displays error message on failure
   * 
   * @param {SignupFormData} data - Validated form data
   */
  const onSubmit = async (data: SignupFormData) => {
    setError(null)
    setLoading(true)

    try {
      // Create new user account with email/password
      // Also store user metadata (name and company) for later use
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            company: data.company,
          },
        },
      })

      // Throw error if account creation failed
      if (authError) throw authError

      // If user was created successfully, redirect to dashboard
      if (authData.user) {
        // Redirect to dashboard after successful signup
        router.push("/dashboard")
        router.refresh() // Refresh to update auth state
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during signup")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-navy mb-2">Create Account</h1>
          <p className="text-gray-600">
            Join The Silicon Mile 5K and start your wellness journey
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
              <label htmlFor="fullName" className="block text-sm font-semibold text-navy mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  {...register("fullName")}
                  className={`pl-10 ${errors.fullName ? "border-red-500" : ""}`}
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-semibold text-navy mb-2">
                Company *
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="company"
                  type="text"
                  placeholder="Your Company Name"
                  {...register("company")}
                  className={`pl-10 ${errors.company ? "border-red-500" : ""}`}
                />
              </div>
              {errors.company && (
                <p className="mt-1 text-sm text-red-500">{errors.company.message}</p>
              )}
            </div>

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
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-orange hover:text-orange-dark font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
