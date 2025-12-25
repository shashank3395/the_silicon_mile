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

type RegistrationFormData = z.infer<typeof registrationSchema>

const steps = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Company Details", icon: Building },
  { id: 3, title: "Additional Info", icon: Shirt },
]

export default function RegistrationForm({ userId }: { userId: string }) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
  })

  const validateStep = async (step: number): Promise<boolean> => {
    let fields: (keyof RegistrationFormData)[] = []
    
    if (step === 1) {
      fields = ["fullName", "corporateEmail", "employeeId"]
    } else if (step === 2) {
      fields = ["companyName"]
    } else if (step === 3) {
      fields = ["tshirtSize", "emergencyContact", "emergencyPhone"]
    }

    const result = await trigger(fields)
    return result
  }

  const nextStep = async () => {
    const isValid = await validateStep(currentStep)
    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1)
      setError(null)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setError(null)
    }
  }

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

