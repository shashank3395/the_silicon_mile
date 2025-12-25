/**
 * Root Layout Component
 * 
 * This is the root layout for the entire Next.js application. It wraps all pages
 * and provides shared structure, styling, and context providers.
 * 
 * Responsibilities:
 * - Sets up the HTML document structure
 * - Applies global font (Inter from Google Fonts)
 * - Includes global CSS styles
 * - Wraps app with AuthProvider for authentication context
 * - Provides consistent layout with Navbar and Footer on all pages
 * 
 * @module app/layout
 */

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { AuthProvider } from "@/components/auth-provider"

/**
 * Inter font configuration
 * 
 * Loads the Inter font family from Google Fonts with Latin character subset.
 * This font is applied globally to the body element.
 */
const inter = Inter({ subsets: ["latin"] })

/**
 * Metadata for the application
 * 
 * Used for SEO and browser tab information. This metadata is applied to all
 * pages by default, but can be overridden in individual page components.
 */
export const metadata: Metadata = {
  title: "Corporate Wellness - Employee Health & Well-being",
  description: "Empowering organizations to prioritize employee health and well-being through comprehensive wellness programs.",
}

/**
 * Root layout component
 * 
 * This component defines the root HTML structure for all pages in the application.
 * It:
 * - Sets the HTML lang attribute
 * - Applies the Inter font to the body
 * - Wraps children with AuthProvider for global auth state
 * - Includes Navbar at the top
 * - Includes Footer at the bottom
 * - Renders page-specific content in between
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The page content to render
 * @returns {JSX.Element} The root layout structure
 * 
 * @remarks
 * This is a Server Component by default (no "use client" directive).
 * The AuthProvider is a Client Component, so it can handle browser-side auth state.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}

