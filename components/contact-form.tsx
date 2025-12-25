"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormData = z.infer<typeof contactSchema>

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Form submitted:", data)
    // Reset form after successful submission
    reset()
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



