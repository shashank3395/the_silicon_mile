# Corporate Wellness - Next.js Application

A modern, professional Next.js application built with TypeScript, Tailwind CSS, and Shadcn/UI, featuring a Corporate Wellness theme with Navy Blue, White, and Energy Orange color palette.

## Features

- ✅ Next.js 14 with App Router
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ Shadcn/UI components
- ✅ Responsive Navbar with mobile menu
- ✅ Professional Footer
- ✅ Corporate Wellness color theme (Navy Blue, White, Energy Orange)

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with Navbar and Footer
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles with theme colors
│   ├── gallery/
│   │   └── page.tsx        # Gallery page
│   ├── events/
│   │   └── page.tsx        # Events page
│   └── register/
│       └── page.tsx        # Register page
├── components/
│   ├── navbar.tsx          # Responsive navigation bar
│   ├── footer.tsx          # Footer component
│   └── ui/
│       └── button.tsx      # Shadcn/UI Button component
└── lib/
    └── utils.ts            # Utility functions (cn helper)
```

## Color Palette

- **Navy Blue**: `#1e3a5f` (Primary brand color)
- **White**: `#ffffff` (Background and text)
- **Energy Orange**: `#ff6b35` (Accent and CTA buttons)

## Pages

- **Home** (`/`) - Landing page with welcome message
- **Gallery** (`/gallery`) - Photo gallery page
- **Events** (`/events`) - Events listing page
- **Register** (`/register`) - Registration page

## Build

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```


