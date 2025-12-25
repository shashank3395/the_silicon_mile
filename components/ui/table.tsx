/**
 * Table Components
 * 
 * A set of reusable table components for displaying structured data.
 * Follows Shadcn/UI patterns and provides accessible, styled table elements
 * that work together to create consistent data tables throughout the application.
 * 
 * Components:
 * - Table: Main table container with overflow handling
 * - TableHeader: Table header section
 * - TableBody: Table body section
 * - TableFooter: Table footer section
 * - TableRow: Table row element
 * - TableHead: Table header cell
 * - TableCell: Table data cell
 * - TableCaption: Table caption
 * 
 * @module components/ui/table
 */

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Table component - Main table container
 * 
 * Wraps the HTML table element with overflow handling for responsive design.
 * Provides scrolling when content exceeds container width.
 * 
 * @param {React.HTMLAttributes<HTMLTableElement>} props - Standard HTML table attributes
 * @param {React.Ref<HTMLTableElement>} ref - Forwarded ref to the table element
 * @returns {JSX.Element} The rendered table wrapped in a scrollable container
 */
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

/**
 * TableHeader component - Table header section
 * 
 * Container for table header rows. Applies border styling to header rows.
 */
const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

/**
 * TableBody component - Table body section
 * 
 * Container for table data rows. Removes border from the last row.
 */
const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

/**
 * TableFooter component - Table footer section
 * 
 * Container for table footer rows. Includes background styling and border.
 * Typically used for summary information or totals.
 */
const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

/**
 * TableRow component - Table row element
 * 
 * Individual table row. Includes hover effects and selected state styling.
 * Used for both header and data rows.
 */
const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

/**
 * TableHead component - Table header cell
 * 
 * Header cell for table columns. Includes specific styling for header text
 * and supports checkbox columns with adjusted padding.
 */
const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

/**
 * TableCell component - Table data cell
 * 
 * Standard data cell for table rows. Includes padding and alignment,
 * and supports checkbox columns with adjusted padding.
 */
const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
))
TableCell.displayName = "TableCell"

/**
 * TableCaption component - Table caption
 * 
 * Provides accessible caption text for tables. Rendered below the table
 * with muted styling.
 */
const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}



