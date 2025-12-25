# Admin Setup Guide

This guide explains how to set up admin users for the admin dashboard.

## Setting Admin Role

Admin users are identified by having `role: "admin"` in their user metadata. There are two ways to set this:

### Method 1: Set During User Creation (Recommended)

When creating a user account, you can set the admin role in the signup metadata. However, for security, it's better to set this after account creation through the Supabase dashboard.

### Method 2: Update User Metadata in Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Users**
3. Find the user you want to make an admin
4. Click on the user to open their details
5. Scroll down to **User Metadata** section
6. Click **Edit** and add:
   ```json
   {
     "role": "admin"
   }
   ```
7. Click **Save**

### Method 3: Update via SQL (Advanced)

You can also update user metadata directly via SQL in the Supabase SQL Editor:

```sql
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data || '{"role": "admin"}'::jsonb
WHERE email = 'admin@example.com';
```

Replace `admin@example.com` with the email of the user you want to make an admin.

## Updating RLS Policies for Admin Access

To allow admins to view all registrations, you need to update the Row Level Security (RLS) policies. Run this SQL in your Supabase SQL Editor:

```sql
-- Drop existing select policy
DROP POLICY IF EXISTS "Users can view their own registrations" ON registrations;

-- Create new policy that allows users to view their own registrations OR admins to view all
CREATE POLICY "Users can view their own registrations or admins can view all"
  ON registrations
  FOR SELECT
  USING (
    auth.uid() = user_id OR
    (auth.jwt() ->> 'user_metadata')::jsonb ->> 'role' = 'admin'
  );
```

## Testing Admin Access

1. Log in with an admin account
2. Navigate to `/admin`
3. You should see the admin dashboard with all registrations
4. If you're redirected to `/dashboard`, check that:
   - The user has `role: "admin"` in their metadata
   - The RLS policies have been updated

## Security Notes

- Admin role is checked on the server side in the `/admin` page component
- Non-admin users are automatically redirected to `/dashboard`
- The admin page fetches all registrations, so ensure RLS policies allow this
- Consider implementing more granular permissions in production (e.g., separate admin table)



