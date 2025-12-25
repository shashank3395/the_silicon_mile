/**
 * Contact Form Component
 * 
 * A contact form component for users to send messages to the organization.
 * Features client-side validation using Zod schema and React Hook Form.
 * 
 * Currently implements a placeholder submission handler. In production,
 * this should integrate with an email service or API endpoint.
 * 
 * @module components/contact-form
 */

"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"

/**
 * Zod schema for contact form validation
 * 
 * Validates:
 * - name: Minimum 2 characters
 * - company: Minimum 2 characters
 * - message: Minimum 10 characters
 */
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

/**
 * TypeScript type inferred from the Zod schema
 * Used for type-safe form data handling
 */
type ContactFormData = z.infer<typeof contactSchema>

/**
 * Contact form component
 * 
 * Renders a contact form with:
 * - Name field (required)
 * - Company field (required)
 * - Message textarea (required)
 * - Submit button with loading state
 * - Client-side validation with error messages
 * 
 * @returns {JSX.Element} The rendered contact form
 * 
 * @example
 * // Used on the home page
 * <ContactForm />
 * 
 * @remarks
 * Currently shows an alert on submission. Should be updated to:
 * - Send data to an API endpoint
 * - Show success/error toast notifications
 * - Integrate with email service (SendGrid, Resend, etc.)
 */
const ContactForm = () => {
  // React Hook Form setup with Zod validation
  const {
    register,          // Register input fields with validation
    handleSubmit,      // Handle form submission
    formState: { errors, isSubmitting }, // Form state: errors and loading state
    reset,             // Reset form after submission
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema), // Use Zod for validation
  })

  /**
   * Handles form submission
   * 
   * Currently implements a placeholder that:
   * 1. Simulates an API call with a 1-second delay
   * 2. Logs the form data to console
   * 3. Resets the form
   * 4. Shows a success alert
   * 
   * TODO: Replace with actual API integration
   * 
   * @param {ContactFormData} data - Validated form data
   */
  const onSubmit = async (data: ContactFormData) => {
    // Simulate API call (replace with actual API endpoint)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Form submitted:", data)
    
    // Reset form after successful submission
    reset()
    
    // Show success message (replace with toast notification in production)
    alert("Thank you for your message! We'll get back to you soon.")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-navy mb-2">
          Name *
        </label>
        <Input
          id="name"
          type="text"
          placeholder="Your full name"
          {...register("name")}
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-semibold text-navy mb-2">
          Company *
        </label>
        <Input
          id="company"
          type="text"
          placeholder="Your company name"
          {...register("company")}
          className={errors.company ? "border-red-500" : ""}
        />
        {errors.company && (
          <p className="mt-1 text-sm text-red-500">{errors.company.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-navy mb-2">
          Message *
        </label>
        <Textarea
          id="message"
          placeholder="Tell us how we can help..."
          rows={5}
          {...register("message")}
          className={errors.message ? "border-red-500" : ""}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto bg-orange hover:bg-orange-dark text-white font-semibold px-8 py-6"
      >
        {isSubmitting ? (
          "Sending..."
        ) : (
          <>
            <Send size={18} className="mr-2" />
            Send Message
          </>
        )}
      </Button>
    </form>
  )
}

export default ContactForm



