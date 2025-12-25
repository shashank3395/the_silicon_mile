/**
 * Navigation Bar Component
 * 
 * Main navigation component that appears at the top of every page.
 * Features:
 * - Responsive design with mobile hamburger menu
 * - Dynamic navigation links based on authentication state
 * - Admin link for users with admin role
 * - Logout functionality
 * - Sticky positioning for always-visible navigation
 * 
 * @module components/navbar
 */

"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Menu, X, LogOut, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAuth } from "@/components/auth-provider"

/**
 * Navigation bar component
 * 
 * Renders the main site navigation with:
 * - Logo/brand name
 * - Public navigation links (Home, Gallery, Announcements, Events)
 * - Conditional links based on auth state:
 *   - Authenticated: Dashboard, Admin (if admin), Logout
 *   - Unauthenticated: Register
 * - Mobile-responsive hamburger menu
 * 
 * Navigation structure:
 * - Public routes: Always visible
 * - Authenticated routes: Only visible when user is logged in
 * - Admin route: Only visible when user has admin role
 * 
 * @returns {JSX.Element} The rendered navigation bar
 * 
 * @example
 * // Used in app/layout.tsx
 * <Navbar />
 */
const Navbar = () => {
  // State for mobile menu open/close
  const [isOpen, setIsOpen] = useState(false)
  
  // Get authentication state from context
  const { user, loading, signOut } = useAuth()
  
  // Router for navigation after logout
  const router = useRouter()

  /**
   * Public navigation links that are always visible
   * These routes don't require authentication
   */
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Gallery" },
    { href: "/announcements", label: "Announcements" },
    { href: "/events", label: "Events" },
  ]

  /**
   * Handles user logout
   * 
   * This function:
   * 1. Signs out the user via Supabase
   * 2. Closes the mobile menu if open
   * 3. Redirects to home page
   * 4. Refreshes the router to update the page state
   */
  const handleLogout = async () => {
    await signOut()
    setIsOpen(false)
    router.push("/")
    router.refresh()
  }

  return (
    <nav className="bg-navy text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-white hover:text-orange transition-colors">
              Corporate Wellness
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:text-orange transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
            {!loading && (
              <>
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="text-white hover:text-orange transition-colors font-medium"
                    >
                      Dashboard
                    </Link>
                    {user.user_metadata?.role === "admin" && (
                      <Link
                        href="/admin"
                        className="text-white hover:text-orange transition-colors font-medium flex items-center"
                      >
                        <Shield size={16} className="mr-1" />
                        Admin
                      </Link>
                    )}
                    <Button
                      onClick={handleLogout}
                      variant="outline"
                      className="bg-transparent border-white text-white hover:bg-white hover:text-navy font-semibold px-6"
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button
                    asChild
                    className="bg-orange hover:bg-orange-dark text-white font-semibold px-6"
                  >
                    <Link href="/register">Register</Link>
                  </Button>
                )}
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-orange transition-colors p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="px-2 pt-2 pb-4 space-y-2 bg-navy-dark">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-white hover:text-orange hover:bg-navy-light rounded-md transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
            {!loading && (
              <>
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 text-white hover:text-orange hover:bg-navy-light rounded-md transition-colors font-medium"
                    >
                      Dashboard
                    </Link>
                    {user.user_metadata?.role === "admin" && (
                      <Link
                        href="/admin"
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-2 text-white hover:text-orange hover:bg-navy-light rounded-md transition-colors font-medium flex items-center"
                      >
                        <Shield size={16} className="mr-2" />
                        Admin
                      </Link>
                    )}
                    <div className="px-3 pt-2">
                      <Button
                        onClick={handleLogout}
                        className="w-full bg-transparent border-2 border-white text-white hover:bg-white hover:text-navy font-semibold"
                      >
                        <LogOut size={16} className="mr-2" />
                        Logout
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="px-3 pt-2">
                    <Button
                      asChild
                      className="w-full bg-orange hover:bg-orange-dark text-white font-semibold"
                    >
                      <Link href="/register" onClick={() => setIsOpen(false)}>
                        Register
                      </Link>
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

