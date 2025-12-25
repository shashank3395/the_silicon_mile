/**
 * Textarea Component
 * 
 * A styled textarea component for multi-line text input. Follows the same
 * design system as the Input component for consistency across forms.
 * 
 * @module components/ui/textarea
 */

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Textarea component props interface
 * 
 * Extends all standard HTML textarea element attributes, allowing full
 * customization while maintaining consistent base styling.
 */
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

/**
 * Textarea component
 * 
 * A reusable textarea field with consistent styling that matches the
 * application's design system. Ideal for longer text input such as
 * messages, descriptions, or comments.
 * 
 * Features:
 * - Consistent border and background colors
 * - Focus ring for accessibility
 * - Disabled state styling
 * - Placeholder text styling
 * - Configurable minimum height
 * - Supports rows attribute for height control
 * 
 * @param {TextareaProps} props - Textarea component props
 * @param {React.Ref<HTMLTextAreaElement>} ref - Forwarded ref to the textarea element
 * @returns {JSX.Element} The rendered textarea element
 * 
 * @example
 * // Basic textarea
 * <Textarea placeholder="Enter your message" rows={4} />
 * 
 * @example
 * // With React Hook Form
 * <Textarea {...register("message")} placeholder="Your message" />
 * 
 * @example
 * // With validation styling
 * <Textarea 
 *   className={errors.message ? "border-red-500" : ""}
 *   {...register("message")} 
 * />
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }

