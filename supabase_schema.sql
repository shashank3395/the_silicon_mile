-- Create registrations table for The Silicon Mile 5K event registrations

CREATE TABLE IF NOT EXISTS registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  corporate_email TEXT NOT NULL,
  employee_id TEXT NOT NULL,
  company_name TEXT NOT NULL,
  tshirt_size TEXT NOT NULL CHECK (tshirt_size IN ('S', 'M', 'L', 'XL')),
  emergency_contact TEXT NOT NULL,
  emergency_phone TEXT NOT NULL,
  registration_date TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_registrations_user_id ON registrations(user_id);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_registrations_status ON registrations(status);

-- Create index on registration_date for sorting
CREATE INDEX IF NOT EXISTS idx_registrations_date ON registrations(registration_date DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can view their own registrations OR admins can view all
CREATE POLICY "Users can view their own registrations or admins can view all"
  ON registrations
  FOR SELECT
  USING (
    auth.uid() = user_id OR
    (auth.jwt() ->> 'user_metadata')::jsonb ->> 'role' = 'admin'
  );

-- Create policy: Users can insert their own registrations
CREATE POLICY "Users can insert their own registrations"
  ON registrations
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policy: Users can update their own registrations
CREATE POLICY "Users can update their own registrations"
  ON registrations
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_registrations_updated_at
  BEFORE UPDATE ON registrations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

