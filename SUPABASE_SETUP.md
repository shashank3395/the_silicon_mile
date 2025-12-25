# Supabase Authentication Setup

This project uses Supabase for authentication. Follow these steps to set up your Supabase project:

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Create a new project
4. Wait for the project to be fully provisioned

## 2. Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (this is your `NEXT_PUBLIC_SUPABASE_URL`)
   - **anon/public key** (this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

## 3. Configure Environment Variables

Create a `.env.local` file in the root of your project with the following:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace `your_supabase_project_url` and `your_supabase_anon_key` with the values from step 2.

## 4. Create the Registrations Table

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the contents of `supabase_schema.sql` from the project root
4. Click **Run** to execute the SQL
5. This will create the `registrations` table with proper security policies

Alternatively, you can run the SQL file directly:
- The schema file is located at `supabase_schema.sql` in the project root
- It includes:
  - Table creation with all required fields
  - Row Level Security (RLS) policies
  - Indexes for performance
  - Automatic timestamp updates

## 5. Enable Email Authentication

1. In your Supabase dashboard, go to **Authentication** → **Providers**
2. Make sure **Email** provider is enabled
3. Configure email templates if needed (optional)

## 6. Install Dependencies

Run the following command to install all required dependencies:

```bash
npm install
```

## 7. Run the Development Server

```bash
npm run dev
```

## Features

- ✅ User signup with email and password
- ✅ User login with email and password
- ✅ Protected dashboard route
- ✅ Automatic session management
- ✅ Logout functionality
- ✅ Responsive navigation that updates based on auth state

## User Flow

1. **Signup**: Users can create an account at `/register`
2. **Login**: Existing users can sign in at `/login`
3. **Dashboard**: Authenticated users are redirected to `/dashboard` after login/signup
4. **Navigation**: Navbar shows "Dashboard" and "Logout" when authenticated, "Register" when not

## Registration Form

The dashboard includes a multi-step registration form that appears when a user hasn't registered yet. The form collects:

- Full Name
- Corporate Email
- Employee ID
- Company Name
- T-shirt Size (S/M/L/XL)
- Emergency Contact Name
- Emergency Contact Phone

All registration data is saved to the `registrations` table in Supabase, linked to the user's ID.

## Notes

- User metadata (full name, company) is stored in the user's profile during signup.
- The middleware automatically protects the `/dashboard` route and redirects unauthenticated users to `/login`.
- Registration data is stored in the `registrations` table with Row Level Security (RLS) enabled, ensuring users can only access their own registrations.
- The registration form uses React Hook Form with Zod validation for a smooth user experience.

