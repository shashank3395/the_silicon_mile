import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import AdminTable from "@/components/admin-table"
import { Shield, Download } from "lucide-react"

export default async function AdminPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Check if user has admin role
  // Admin role is stored in user metadata or can be checked from a separate table
  const userRole = user.user_metadata?.role || "user"
  
  if (userRole !== "admin") {
    redirect("/dashboard")
  }

  // Fetch all registrations
  const { data: registrations, error } = await supabase
    .from("registrations")
    .select("*")
    .order("registration_date", { ascending: false })

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



