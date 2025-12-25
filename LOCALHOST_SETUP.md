# Steps to Host on Localhost

Follow these steps to run the application on your local machine:

## Prerequisites

1. **Node.js and npm**: Make sure you have Node.js installed (version 18 or higher recommended)
   - Check if installed: `node --version` and `npm --version`
   - Download from [nodejs.org](https://nodejs.org/) if needed

## Step 1: Install Dependencies

Navigate to the project directory and install all required packages:

```bash
cd /Users/shashanksharma/shashank/the_silicon_mile
npm install
```

This will install all dependencies listed in `package.json` including Next.js, React, Supabase, and other required packages.

## Step 2: Set Up Supabase

### 2.1 Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click **New Project**
4. Fill in your project details:
   - Name your project
   - Set a database password (save this securely)
   - Choose a region
5. Click **Create new project** and wait for it to be provisioned (2-3 minutes)

### 2.2 Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon/public key** (a long string starting with `eyJ...`)

### 2.3 Configure Environment Variables

Create a `.env.local` file in the root of your project:

```bash
# In the project root directory
touch .env.local
```

Then open `.env.local` and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

Replace the placeholder values with your actual Supabase URL and anon key from Step 2.2.

### 2.4 Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Open the `supabase_schema.sql` file from your project root
4. Copy all the SQL content
5. Paste it into the SQL Editor
6. Click **Run** (or press Cmd/Ctrl + Enter) to execute the SQL

This creates the `registrations` table and sets up Row Level Security (RLS) policies.

### 2.5 Enable Email Authentication

1. In your Supabase dashboard, go to **Authentication** → **Providers**
2. Make sure **Email** provider is enabled (it should be by default)
3. Optionally, configure email templates (not required for local development)

## Step 3: Run the Development Server

Start the Next.js development server:

```bash
npm run dev
```

The server will start and you should see output like:
```
  ▲ Next.js 14.2.5
  - Local:        http://localhost:3000
```

## Step 4: Access the Application

Open your web browser and navigate to:

**http://localhost:3000**

You should now see the application running on your local machine!

## Step 5: Create Your First User (Optional)

1. Click on **Register** in the navigation
2. Fill in the registration form with your details
3. Submit to create your account
4. You'll be automatically logged in and redirected to the dashboard

## Troubleshooting

### Port 3000 Already in Use

If port 3000 is already occupied, Next.js will automatically try the next available port (3001, 3002, etc.). Check the terminal output for the actual port number.

To use a specific port:

```bash
npm run dev -- -p 3001
```

### Environment Variables Not Loading

- Make sure `.env.local` is in the root directory (same level as `package.json`)
- Restart the development server after creating/modifying `.env.local`
- Check that variable names start with `NEXT_PUBLIC_` for client-side access

### Database Connection Issues

- Verify your Supabase URL and anon key are correct in `.env.local`
- Make sure your Supabase project is active (not paused)
- Check that the SQL schema was executed successfully in the SQL Editor

### Module Not Found Errors

If you see module not found errors:

```bash
# Delete node_modules and package-lock.json, then reinstall
rm -rf node_modules package-lock.json
npm install
```

## Available Scripts

- `npm run dev` - Start development server (with hot reload)
- `npm run build` - Create production build
- `npm start` - Start production server (requires `npm run build` first)
- `npm run lint` - Run ESLint to check for code issues

## Next Steps

- Check out `SUPABASE_SETUP.md` for more Supabase configuration details
- Check out `ADMIN_SETUP.md` if you need to set up admin users
- Explore the application pages: `/`, `/dashboard`, `/events`, `/gallery`, `/admin`

