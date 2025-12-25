/**
 * Home Page Component
 * 
 * The main landing page of the application. Showcases:
 * - Hero section with event branding and call-to-action buttons
 * - Initiative section explaining the event's purpose
 * - Event timeline with key dates and milestones
 * - Sponsors section highlighting event sponsors
 * - Contact form for inquiries
 * 
 * This is a public page accessible to all visitors, authenticated or not.
 * 
 * @module app/page
 */

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Timeline from "@/components/timeline"
import Sponsors from "@/components/sponsors"
import ContactForm from "@/components/contact-form"
import { Target, Users, Heart, TrendingUp, Mail } from "lucide-react"

/**
 * Home page component
 * 
 * Renders the main landing page with multiple sections:
 * 1. Hero Section: Large banner with event name and primary CTAs
 * 2. Initiative Section: Information about the event's mission
 * 3. Timeline Section: Event schedule and milestones
 * 4. Sponsors Section: Event sponsors and partner information
 * 5. Contact Section: Contact form for visitor inquiries
 * 
 * @returns {JSX.Element} The rendered home page
 * 
 * @remarks
 * This is a Server Component (default in Next.js App Router).
 * All components used here (Timeline, Sponsors, ContactForm) are either
 * Server Components or handle their own client-side logic.
 */
export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1571008887538-b36bb32f4571?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-navy/80" />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            The Silicon Mile 5K
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
            Join Hyderabad's premier corporate wellness event. Run, network, and celebrate health with the tech community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-orange hover:bg-orange-dark text-white font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
            >
              <Link href="/register">Register Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-white/10 border-2 border-white text-white hover:bg-white hover:text-navy font-semibold px-8 py-6 text-lg backdrop-blur-sm transition-all"
            >
              <Link href="/events">Learn More</Link>
            </Button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Our Initiative Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
              Our Initiative
            </h2>
            <div className="w-24 h-1 bg-orange mx-auto mb-6" />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Building a healthier, more connected corporate community in Hyderabad
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <h3 className="text-3xl font-bold text-navy mb-6">
                Corporate Wellness & Networking in Hyderabad
              </h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  The Silicon Mile 5K is more than just a race—it's a movement dedicated to fostering 
                  corporate wellness and meaningful networking within Hyderabad's thriving tech ecosystem.
                </p>
                <p>
                  Our initiative brings together professionals from leading technology companies, startups, 
                  and corporate organizations to promote physical health, mental well-being, and professional 
                  connections. We believe that a healthy workforce is a productive workforce, and that 
                  networking happens best when people come together around shared values.
                </p>
                <p>
                  Through our events, we create opportunities for professionals to step away from their 
                  desks, engage in physical activity, and build lasting relationships with peers across 
                  the industry. Whether you're a seasoned runner or just starting your fitness journey, 
                  The Silicon Mile 5K welcomes everyone.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-navy/5 p-6 rounded-lg text-center">
                <Target className="w-12 h-12 text-orange mx-auto mb-4" />
                <h4 className="font-bold text-navy mb-2">Wellness Focus</h4>
                <p className="text-sm text-gray-600">Promoting physical and mental health</p>
              </div>
              <div className="bg-navy/5 p-6 rounded-lg text-center">
                <Users className="w-12 h-12 text-orange mx-auto mb-4" />
                <h4 className="font-bold text-navy mb-2">Networking</h4>
                <p className="text-sm text-gray-600">Building professional connections</p>
              </div>
              <div className="bg-navy/5 p-6 rounded-lg text-center">
                <Heart className="w-12 h-12 text-orange mx-auto mb-4" />
                <h4 className="font-bold text-navy mb-2">Community</h4>
                <p className="text-sm text-gray-600">Uniting Hyderabad's tech community</p>
              </div>
              <div className="bg-navy/5 p-6 rounded-lg text-center">
                <TrendingUp className="w-12 h-12 text-orange mx-auto mb-4" />
                <h4 className="font-bold text-navy mb-2">Growth</h4>
                <p className="text-sm text-gray-600">Supporting professional development</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Event Timeline Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
              Future Event Timeline
            </h2>
            <div className="w-24 h-1 bg-orange mx-auto mb-6" />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mark your calendars for upcoming events and milestones
            </p>
          </div>
          <Timeline />
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
              Our Sponsors
            </h2>
            <div className="w-24 h-1 bg-orange mx-auto mb-6" />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Proudly supported by leading organizations committed to corporate wellness
            </p>
          </div>
          <Sponsors />
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange/10 rounded-full mb-6">
              <Mail className="w-8 h-8 text-orange" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
              Contact Us
            </h2>
            <div className="w-24 h-1 bg-orange mx-auto mb-6" />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions or want to get involved? We'd love to hear from you!
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  )
}

