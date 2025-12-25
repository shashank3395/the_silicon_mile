/**
 * Input Component
 * 
 * A styled input field component that follows the design system's theme.
 * Provides consistent styling, focus states, and accessibility features
 * across all forms in the application.
 * 
 * @module components/ui/input
 */

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Input component props interface
 * 
 * Extends all standard HTML input element attributes, allowing full
 * customization while maintaining consistent base styling.
 */
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * Input component
 * 
 * A reusable input field with consistent styling that matches the
 * application's design system. Supports all standard input types
 * (text, email, password, number, etc.).
 * 
 * Features:
 * - Consistent border and background colors
 * - Focus ring for accessibility
 * - Disabled state styling
 * - Placeholder text styling
 * - File input support
 * 
 * @param {InputProps} props - Input component props
 * @param {React.Ref<HTMLInputElement>} ref - Forwarded ref to the input element
 * @returns {JSX.Element} The rendered input element
 * 
 * @example
 * // Basic text input
 * <Input type="text" placeholder="Enter your name" />
 * 
 * @example
 * // Email input with validation
 * <Input type="email" placeholder="email@example.com" required />
 * 
 * @example
 * // With React Hook Form
 * <Input {...register("email")} type="email" />
 * 
 * @example
 * // Password input
 * <Input type="password" placeholder="Enter password" />
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

