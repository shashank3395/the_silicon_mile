/**
 * Utility functions for common operations across the application
 * @module lib/utils
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines and merges Tailwind CSS class names with proper conflict resolution
 * 
 * This function merges class names using clsx and tailwind-merge, ensuring that
 * Tailwind utility classes are properly merged (e.g., conflicting padding classes
 * will be resolved correctly).
 * 
 * @param {...ClassValue} inputs - Variable number of class name inputs (strings, objects, arrays, etc.)
 * @returns {string} Merged class name string with resolved conflicts
 * 
 * @example
 * // Basic usage
 * cn('px-4', 'py-2') // Returns: 'px-4 py-2'
 * 
 * @example
 * // Conflict resolution (tailwind-merge handles this)
 * cn('px-4', 'px-6') // Returns: 'px-6' (last one wins)
 * 
 * @example
 * // Conditional classes
 * cn('base-class', isActive && 'active-class', isDisabled && 'disabled-class')
 * 
 * @example
 * // Object syntax
 * cn({ 'text-blue': true, 'text-red': false }) // Returns: 'text-blue'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


