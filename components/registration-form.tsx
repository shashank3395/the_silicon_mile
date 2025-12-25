/**
 * Registration Form Component
 * 
 * Multi-step registration form for event participants. Collects all required
 * information for event registration including personal details, company information,
 * and emergency contact information.
 * 
 * Features:
 * - Multi-step form with progress indication
 * - Client-side validation using Zod
 * - Step-by-step validation (validates current step before proceeding)
 * - Submits registration data to Supabase database
 * - Success state with confirmation message
 * 
 * @module components/registration-form
 */

"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, Mail, Building, Hash, Shirt, Phone, ChevronRight, ChevronLeft, Check } from "lucide-react"
import { useRouter } from "next/navigation"

/**
 * Zod schema for registration form validation
 * 
 * Validates all registration fields:
 * - fullName: Minimum 2 characters
 * - corporateEmail: Valid email format
 * - employeeId: Required field
 * - companyName: Minimum 2 characters
 * - tshirtSize: Must be one of: S, M, L, XL
 * - emergencyContact: Minimum 2 characters
 * - emergencyPhone: Minimum 10 characters (basic phone validation)
 */
const registrationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  corporateEmail: z.string().email("Please enter a valid email address"),
  employeeId: z.string().min(1, "Employee ID is required"),
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  tshirtSize: z.enum(["S", "M", "L", "XL"], {
    required_error: "Please select a T-shirt size",
  }),
  emergencyContact: z.string().min(2, "Emergency contact name is required"),
  emergencyPhone: z.string().min(10, "Emergency contact phone is required"),
})

/**
 * TypeScript type inferred from the Zod schema
 * Used for type-safe form data handling
 */
type RegistrationFormData = z.infer<typeof registrationSchema>

/**
 * Form step definitions
 * 
 * Defines the three steps of the registration form with their titles and icons
 */
const steps = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Company Details", icon: Building },
  { id: 3, title: "Additional Info", icon: Shirt },
]

/**
 * Registration form component
 * 
 * Multi-step form component that collects event registration information.
 * The form is divided into three steps:
 * 1. Personal Info: Full name, corporate email, employee ID
 * 2. Company Details: Company name
 * 3. Additional Info: T-shirt size, emergency contact details
 * 
 * Features:
 * - Step-by-step navigation with validation
 * - Progress indicator
 * - Form validation before proceeding to next step
 * - Saves registration to Supabase database
 * - Shows success state after submission
 * 
 * @param {Object} props - Component props
 * @param {string} props.userId - The authenticated user's ID (required for database insert)
 * @returns {JSX.Element} The rendered registration form
 * 
 * @example
 * // Used in app/dashboard/page.tsx
 * const { data: { user } } = await supabase.auth.getUser()
 * <RegistrationForm userId={user.id} />
 */
export default function RegistrationForm({ userId }: { userId: string }) {
  // Router for navigation after successful registration
  const router = useRouter()
  
  // Current step in the multi-step form (1, 2, or 3)
  const [currentStep, setCurrentStep] = useState(1)
  
  // Loading state during form submission
  const [loading, setLoading] = useState(false)
  
  // Error message state for displaying submission errors
  const [error, setError] = useState<string | null>(null)
  
  // Supabase client for database operations
  const supabase = createClient()

  // React Hook Form setup with Zod validation
  const {
    register,          // Register input fields with validation
    handleSubmit,      // Handle form submission
    formState: { errors }, // Form validation errors
    trigger,           // Manually trigger validation for specific fields
    getValues,         // Get current form values
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema), // Use Zod for validation
    mode: "onChange",  // Validate on change for real-time feedback
  })

  /**
   * Validates fields for a specific step
   * 
   * This function determines which fields belong to the current step
   * and validates only those fields before allowing the user to proceed.
   * 
   * Step field mapping:
   * - Step 1: fullName, corporateEmail, employeeId
   * - Step 2: companyName
   * - Step 3: tshirtSize, emergencyContact, emergencyPhone
   * 
   * @param {number} step - The step number to validate (1, 2, or 3)
   * @returns {Promise<boolean>} True if step is valid, false otherwise
   */
  const validateStep = async (step: number): Promise<boolean> => {
    let fields: (keyof RegistrationFormData)[] = []
    
    if (step === 1) {
      fields = ["fullName", "corporateEmail", "employeeId"]
    } else if (step === 2) {
      fields = ["companyName"]
    } else if (step === 3) {
      fields = ["tshirtSize", "emergencyContact", "emergencyPhone"]
    }

    // Trigger validation for the fields in this step
    const result = await trigger(fields)
    return result
  }

  /**
   * Handles navigation to the next step
   * 
   * Validates the current step before allowing progression.
   * Only advances if validation passes and not already on the last step.
   */
  const nextStep = async () => {
    const isValid = await validateStep(currentStep)
    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1)
      setError(null) // Clear any previous errors
    }
  }

  /**
   * Handles navigation to the previous step
   * 
   * Allows users to go back and modify previous step's information.
   * No validation required to go back.
   */
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setError(null) // Clear any previous errors
    }
  }

  /**
   * Handles final form submission
   * 
   * This function:
   * 1. Clears any previous errors
   * 2. Sets loading state
   * 3. Inserts registration data into Supabase database
   * 4. Handles errors if insertion fails
   * 5. Refreshes the page on success to show updated registration status
   * 
   * @param {RegistrationFormData} data - Validated form data from all steps
   */
  const onSubmit = async (data: RegistrationFormData) => {
    setError(null)
    setLoading(true)

    try {
      const { error: insertError } = await supabase
        .from("registrations")
        .insert({
          user_id: userId,
          full_name: data.fullName,
          corporate_email: data.corporateEmail,
          employee_id: data.employeeId,
          company_name: data.companyName,
          tshirt_size: data.tshirtSize,
          emergency_contact: data.emergencyContact,
          emergency_phone: data.emergencyPhone,
          registration_date: new Date().toISOString(),
          status: "confirmed",
        })

      if (insertError) throw insertError

      // Refresh the page to show updated registration status
      router.refresh()
    } catch (err: any) {
      setError(err.message || "An error occurred while submitting your registration")
    } finally {
      setLoading(false)
    }
  }

  const formValues = getValues()

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const StepIcon = step.icon
            const isActive = currentStep === step.id
            const isCompleted = currentStep > step.id
            const isLast = index === steps.length - 1

            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                      isCompleted
                        ? "bg-green-500 border-green-500 text-white"
                        : isActive
                        ? "bg-orange border-orange text-white"
                        : "bg-gray-100 border-gray-300 text-gray-400"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <StepIcon className="w-6 h-6" />
                    )}
                  </div>
                  <span
                    className={`mt-2 text-xs font-medium ${
                      isActive ? "text-orange" : isCompleted ? "text-green-600" : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {!isLast && (
                  <div
                    className={`flex-1 h-0.5 mx-4 ${
                      isCompleted ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm mb-6">
            {error}
          </div>
        )}

        {/* Step 1: Personal Info */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold text-navy mb-6">Personal Information</h3>
            
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
              <label htmlFor="corporateEmail" className="block text-sm font-semibold text-navy mb-2">
                Corporate Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="corporateEmail"
                  type="email"
                  placeholder="john.doe@company.com"
                  {...register("corporateEmail")}
                  className={`pl-10 ${errors.corporateEmail ? "border-red-500" : ""}`}
                />
              </div>
              {errors.corporateEmail && (
                <p className="mt-1 text-sm text-red-500">{errors.corporateEmail.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="employeeId" className="block text-sm font-semibold text-navy mb-2">
                Employee ID *
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="employeeId"
                  type="text"
                  placeholder="EMP12345"
                  {...register("employeeId")}
                  className={`pl-10 ${errors.employeeId ? "border-red-500" : ""}`}
                />
              </div>
              {errors.employeeId && (
                <p className="mt-1 text-sm text-red-500">{errors.employeeId.message}</p>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Company Details */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold text-navy mb-6">Company Details</h3>
            
            <div>
              <label htmlFor="companyName" className="block text-sm font-semibold text-navy mb-2">
                Company Name *
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="companyName"
                  type="text"
                  placeholder="Your Company Name"
                  {...register("companyName")}
                  className={`pl-10 ${errors.companyName ? "border-red-500" : ""}`}
                />
              </div>
              {errors.companyName && (
                <p className="mt-1 text-sm text-red-500">{errors.companyName.message}</p>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Additional Info */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold text-navy mb-6">Additional Information</h3>
            
            <div>
              <label htmlFor="tshirtSize" className="block text-sm font-semibold text-navy mb-2">
                T-shirt Size *
              </label>
              <select
                id="tshirtSize"
                {...register("tshirtSize")}
                className={`w-full h-10 rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  errors.tshirtSize ? "border-red-500" : "border-input"
                }`}
              >
                <option value="">Select size</option>
                <option value="S">Small (S)</option>
                <option value="M">Medium (M)</option>
                <option value="L">Large (L)</option>
                <option value="XL">Extra Large (XL)</option>
              </select>
              {errors.tshirtSize && (
                <p className="mt-1 text-sm text-red-500">{errors.tshirtSize.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="emergencyContact" className="block text-sm font-semibold text-navy mb-2">
                Emergency Contact Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="emergencyContact"
                  type="text"
                  placeholder="Emergency contact full name"
                  {...register("emergencyContact")}
                  className={`pl-10 ${errors.emergencyContact ? "border-red-500" : ""}`}
                />
              </div>
              {errors.emergencyContact && (
                <p className="mt-1 text-sm text-red-500">{errors.emergencyContact.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="emergencyPhone" className="block text-sm font-semibold text-navy mb-2">
                Emergency Contact Phone *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="emergencyPhone"
                  type="tel"
                  placeholder="+91 9876543210"
                  {...register("emergencyPhone")}
                  className={`pl-10 ${errors.emergencyPhone ? "border-red-500" : ""}`}
                />
              </div>
              {errors.emergencyPhone && (
                <p className="mt-1 text-sm text-red-500">{errors.emergencyPhone.message}</p>
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t">
          <Button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            variant="outline"
            className="flex items-center"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {currentStep < 3 ? (
            <Button
              type="button"
              onClick={nextStep}
              className="bg-orange hover:bg-orange-dark text-white font-semibold flex items-center"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={loading}
              className="bg-orange hover:bg-orange-dark text-white font-semibold"
            >
              {loading ? "Submitting..." : "Complete Registration"}
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}

