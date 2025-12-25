/**
 * Admin Dashboard Page Component
 * 
 * Administrative page for managing all event registrations.
 * Features:
 * - Protected route (requires authentication AND admin role)
 * - Displays all event registrations in a sortable table
 * - Admin-only access (non-admin users redirected to dashboard)
 * - Real-time data from database
 * 
 * Route: /admin
 * 
 * @module app/admin/page
 */

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import AdminTable from "@/components/admin-table"
import { Shield, Download } from "lucide-react"

/**
 * Admin dashboard page component
 * 
 * Server Component that:
 * 1. Checks if user is authenticated (redirects to /login if not)
 * 2. Checks if user has admin role (redirects to /dashboard if not admin)
 * 3. Fetches all event registrations from the database
 * 4. Displays registrations in an admin table with sorting/filtering
 * 
 * Admin Role:
 * Admin role is stored in user.user_metadata.role and should be set to "admin"
 * in the Supabase dashboard. See ADMIN_SETUP.md for instructions.
 * 
 * @returns {Promise<JSX.Element>} The rendered admin dashboard page
 * 
 * @remarks
 * This is a Server Component for security. Admin checks happen on the server
 * before any sensitive data is fetched or displayed.
 * 
 * Row Level Security (RLS) policies in the database also ensure that only
 * admin users can query all registrations, providing defense in depth.
 */
export default async function AdminPage() {
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

  // Check if user has admin role
  // Admin role is stored in user.user_metadata.role
  // Default to "user" if role is not set
  const userRole = user.user_metadata?.role || "user"
  
  // Redirect non-admin users to their dashboard
  // Only users with role === "admin" can access this page
  if (userRole !== "admin") {
    redirect("/dashboard")
  }

  // Fetch all registrations from the database
  // Ordered by registration date (newest first)
  // RLS policies ensure only admins can see all registrations
  const { data: registrations, error } = await supabase
    .from("registrations")
    .select("*")
    .order("registration_date", { ascending: false })

  // Log errors but don't crash the page
  // In production, you might want to show an error message to the admin
  if (error) {
    console.error("Error fetching registrations:", error)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-orange/10 p-3 rounded-lg">
            <Shield className="w-8 h-8 text-orange" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-navy">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 text-lg mt-1">
              Manage all event registrations
            </p>
          </div>
        </div>
      </div>

      <AdminTable registrations={registrations || []} />
    </div>
  )
}



