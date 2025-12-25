/**
 * Dashboard Page Component
 * 
 * User dashboard page that displays user information and registration status.
 * Features:
 * - Protected route (requires authentication)
 * - Displays user profile information
 * - Shows event registration form if user hasn't registered
 * - Shows registration status and details if user has registered
 * - Provides event information and next steps
 * 
 * Route: /dashboard
 * 
 * @module app/dashboard/page
 */

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { CheckCircle, Clock, User, Building, Mail, Calendar } from "lucide-react"
import RegistrationForm from "@/components/registration-form"

/**
 * Dashboard page component
 * 
 * Server Component that:
 * 1. Checks if user is authenticated (redirects to /login if not)
 * 2. Retrieves user metadata (name, company, email)
 * 3. Checks if user has registered for the event
 * 4. Displays registration form if not registered
 * 5. Displays registration status and details if registered
 * 
 * @returns {Promise<JSX.Element>} The rendered dashboard page
 * 
 * @remarks
 * This is a Server Component, so it can directly access the database
 * and check authentication state on the server. This provides better
 * security and performance than client-side checks.
 */
export default async function Dashboard() {
  // Get Supabase client for server-side operations
  const supabase = await createClient()
  
  // Get current authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Redirect to login if user is not authenticated
  if (!user) {
    redirect("/login")
  }

  // Extract user metadata stored during registration
  // These values are stored in the user's metadata object in Supabase Auth
  const fullName = user.user_metadata?.full_name || "Not provided"
  const company = user.user_metadata?.company || "Not provided"
  const email = user.email || "Not provided"

  // Check if user has registered for the event
  // Query the registrations table for this user's registration
  const { data: registration, error } = await supabase
    .from("registrations")
    .select("*")
    .eq("user_id", user.id)
    .single()

  // Determine if user has completed event registration
  // Registration exists if data is returned and no error occurred
  const hasRegistered = !!registration && !error

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-navy mb-2">
          Welcome back, {fullName.split(" ")[0]}!
        </h1>
        <p className="text-gray-600 text-lg">
          {hasRegistered
            ? "Here's your registration status and event information"
            : "Complete your registration for The Silicon Mile 5K"}
        </p>
      </div>

      {!hasRegistered ? (
        /* Registration Form */
        <div className="mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-navy mb-2">Register for The Silicon Mile 5K</h2>
            <p className="text-gray-600">
              Fill out the form below to complete your registration for the Fall Edition
            </p>
          </div>
          <RegistrationForm userId={user.id} />
        </div>
      ) : (
        /* Registration Status Card */
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 border-l-4 border-orange">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-navy mb-2">Registration Status</h2>
              <p className="text-gray-600">The Silicon Mile 5K - Fall Edition</p>
            </div>
            <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-full">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">{registration.status?.toUpperCase() || "CONFIRMED"}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-navy/10 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-navy" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Registration Date</p>
                <p className="font-semibold text-navy">
                  {registration.registration_date
                    ? new Date(registration.registration_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "N/A"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-orange/10 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-orange" />
              </div>
              <div>
                <p className="text-sm text-gray-600">T-shirt Size</p>
                <p className="font-semibold text-navy">{registration.tshirt_size || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Registration Details */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-bold text-navy mb-4">Registration Details</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="font-semibold text-navy">{registration.full_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Corporate Email</p>
                <p className="font-semibold text-navy">{registration.corporate_email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Employee ID</p>
                <p className="font-semibold text-navy">{registration.employee_id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Company Name</p>
                <p className="font-semibold text-navy">{registration.company_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Emergency Contact</p>
                <p className="font-semibold text-navy">{registration.emergency_contact}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Emergency Phone</p>
                <p className="font-semibold text-navy">{registration.emergency_phone}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Information */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-navy/10 p-3 rounded-lg">
              <User className="w-6 h-6 text-navy" />
            </div>
            <h3 className="text-xl font-bold text-navy">Profile Information</h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Full Name</p>
              <p className="font-semibold text-navy">{fullName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Company</p>
              <p className="font-semibold text-navy">{company}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-semibold text-navy">{email}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-orange/10 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-orange" />
            </div>
            <h3 className="text-xl font-bold text-navy">Upcoming Event</h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Event Name</p>
              <p className="font-semibold text-navy">The Silicon Mile 5K - Fall Edition</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Date</p>
              <p className="font-semibold text-navy">September 28, 2024</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Location</p>
              <p className="font-semibold text-navy">Hyderabad Tech Park</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-navy to-navy-light rounded-lg shadow-lg p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Quick Actions</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a
            href="/events"
            className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors"
          >
            <p className="font-semibold mb-1">View Events</p>
            <p className="text-sm text-white/80">Browse upcoming events</p>
          </a>
          <a
            href="/gallery"
            className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors"
          >
            <p className="font-semibold mb-1">View Gallery</p>
            <p className="text-sm text-white/80">See event photos</p>
          </a>
          <a
            href="/announcements"
            className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors"
          >
            <p className="font-semibold mb-1">Announcements</p>
            <p className="text-sm text-white/80">Latest updates</p>
          </a>
        </div>
      </div>
    </div>
  )
}

