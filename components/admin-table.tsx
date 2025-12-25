/**
 * Admin Table Component
 * 
 * Data table component for displaying and managing event registrations
 * in the admin dashboard. Features:
 * - Sortable columns
 * - Search/filter functionality
 * - Pagination
 * - Export to CSV functionality
 * - Responsive design
 * 
 * Uses TanStack Table for advanced table functionality.
 * 
 * @module components/admin-table
 */

"use client"

import { useState, useMemo } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Download } from "lucide-react"

/**
 * Registration data structure
 * 
 * Represents a single event registration record from the database.
 * Matches the structure of the registrations table in Supabase.
 */
interface Registration {
  id: string
  user_id: string
  full_name: string
  corporate_email: string
  employee_id: string
  company_name: string
  tshirt_size: string
  emergency_contact: string
  emergency_phone: string
  registration_date: string
  status: string
}

/**
 * AdminTable component props
 */
interface AdminTableProps {
  /** Array of registration records to display in the table */
  registrations: Registration[]
}

/**
 * Admin table component
 * 
 * Displays all event registrations in a sortable, searchable table.
 * Features:
 * - Search/filter by company name
 * - Export filtered results to CSV
 * - Responsive table layout
 * - Status badges with color coding
 * 
 * @param {AdminTableProps} props - Component props
 * @param {Registration[]} props.registrations - Array of registration records
 * @returns {JSX.Element} The rendered admin table
 * 
 * @example
 * // Used in app/admin/page.tsx
 * const { data: registrations } = await supabase.from('registrations').select('*')
 * <AdminTable registrations={registrations || []} />
 */
export default function AdminTable({ registrations }: AdminTableProps) {
  // Search query state for filtering registrations
  const [searchQuery, setSearchQuery] = useState("")

  /**
   * Filters registrations based on the search query
   * 
   * Filters by company name (case-insensitive). Returns all registrations
   * if search query is empty.
   * 
   * Uses useMemo to optimize performance by only recalculating when
   * registrations or searchQuery changes.
   * 
   * @returns {Registration[]} Filtered array of registrations
   */
  const filteredRegistrations = useMemo(() => {
    if (!searchQuery.trim()) {
      return registrations
    }
    return registrations.filter((reg) =>
      reg.company_name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [registrations, searchQuery])

  /**
   * Exports filtered registrations to CSV file
   * 
   * Creates a CSV file with all registration data and triggers a download.
   * The file is named with the current date (e.g., registrations_2024-12-24.csv).
   * 
   * CSV includes all fields from the Registration interface:
   * - Full Name, Corporate Email, Employee ID, Company Name
   * - T-shirt Size, Emergency Contact, Emergency Phone
   * - Registration Date, Status
   */
  const handleExportCSV = () => {
    const headers = [
      "Full Name",
      "Corporate Email",
      "Employee ID",
      "Company Name",
      "T-shirt Size",
      "Emergency Contact",
      "Emergency Phone",
      "Registration Date",
      "Status",
    ]

    const csvRows = [
      headers.join(","),
      ...filteredRegistrations.map((reg) =>
        [
          `"${reg.full_name}"`,
          `"${reg.corporate_email}"`,
          `"${reg.employee_id}"`,
          `"${reg.company_name}"`,
          reg.tshirt_size,
          `"${reg.emergency_contact}"`,
          `"${reg.emergency_phone}"`,
          new Date(reg.registration_date).toLocaleDateString(),
          reg.status,
        ].join(",")
      ),
    ]

    const csvContent = csvRows.join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    
    link.setAttribute("href", url)
    link.setAttribute("download", `registrations_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200">
      {/* Search and Export Bar */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search by company name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            onClick={handleExportCSV}
            className="bg-orange hover:bg-orange-dark text-white font-semibold px-6"
          >
            <Download className="w-4 h-4 mr-2" />
            Export to CSV
          </Button>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredRegistrations.length} of {registrations.length} registrations
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold text-navy">Full Name</TableHead>
              <TableHead className="font-semibold text-navy">Email</TableHead>
              <TableHead className="font-semibold text-navy">Employee ID</TableHead>
              <TableHead className="font-semibold text-navy">Company</TableHead>
              <TableHead className="font-semibold text-navy">T-shirt Size</TableHead>
              <TableHead className="font-semibold text-navy">Emergency Contact</TableHead>
              <TableHead className="font-semibold text-navy">Registration Date</TableHead>
              <TableHead className="font-semibold text-navy">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRegistrations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                  {searchQuery
                    ? `No registrations found matching "${searchQuery}"`
                    : "No registrations found"}
                </TableCell>
              </TableRow>
            ) : (
              filteredRegistrations.map((registration) => (
                <TableRow key={registration.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{registration.full_name}</TableCell>
                  <TableCell>{registration.corporate_email}</TableCell>
                  <TableCell>{registration.employee_id}</TableCell>
                  <TableCell>{registration.company_name}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-navy/10 text-navy">
                      {registration.tshirt_size}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{registration.emergency_contact}</div>
                      <div className="text-sm text-gray-500">{registration.emergency_phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(registration.registration_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        registration.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : registration.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {registration.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}



