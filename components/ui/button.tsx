/**
 * Button Component
 * 
 * A reusable, accessible button component with multiple variants and sizes.
 * Built on top of Radix UI's Slot component for composition and follows
 * Shadcn/UI patterns for consistency.
 * 
 * @module components/ui/button
 */

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Button variant definitions using class-variance-authority
 * 
 * Defines all available button styles and sizes. The base classes are applied
 * to all buttons, while variants and sizes are applied conditionally.
 * 
 * Variants:
 * - default: Primary button with primary color scheme
 * - destructive: For dangerous actions (e.g., delete)
 * - outline: Outlined button with transparent background
 * - secondary: Secondary button style
 * - ghost: Minimal button with no background
 * - link: Styled as a link
 * 
 * Sizes:
 * - default: Standard button size
 * - sm: Small button
 * - lg: Large button
 * - icon: Square button for icons only
 */
const buttonVariants = cva(
  // Base classes applied to all button variants
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * Button component props interface
 * 
 * Extends standard HTML button attributes and adds button-specific props
 * for variant and size configuration.
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * When true, the button will render as a Slot component, allowing it to
   * merge props with its child component. Useful for rendering buttons as
   * Link components from Next.js.
   * 
   * @default false
   */
  asChild?: boolean
}

/**
 * Button component
 * 
 * A flexible, accessible button component with multiple variants and sizes.
 * Supports composition through the asChild prop, allowing it to render as
 * other components (e.g., Next.js Link).
 * 
 * @param {ButtonProps} props - Button component props
 * @param {React.Ref<HTMLButtonElement>} ref - Forwarded ref to the button element
 * @returns {JSX.Element} The rendered button element
 * 
 * @example
 * // Basic usage
 * <Button>Click me</Button>
 * 
 * @example
 * // With variant
 * <Button variant="destructive">Delete</Button>
 * 
 * @example
 * // As a Link (using asChild)
 * <Button asChild variant="outline">
 *   <Link href="/dashboard">Go to Dashboard</Link>
 * </Button>
 * 
 * @example
 * // With size and onClick handler
 * <Button size="lg" onClick={handleClick}>
 *   Large Button
 * </Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // Use Slot component if asChild is true, otherwise use button element
    // This allows the button to compose with other components
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }


