-- =============================================
-- NineProo Supabase Setup
-- Run this in your Supabase SQL Editor
-- =============================================

-- 1. Create waitlist_emails table
CREATE TABLE IF NOT EXISTS waitlist_emails (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  source TEXT DEFAULT 'website',
  subscribed BOOLEAN DEFAULT true
);

-- 2. Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_emails_email ON waitlist_emails(email);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE waitlist_emails ENABLE ROW LEVEL SECURITY;

-- 4. Create policy to allow anonymous inserts (for waitlist signups)
CREATE POLICY "Allow anonymous insert" ON waitlist_emails
  FOR INSERT
  WITH CHECK (true);

-- 5. Create policy to allow reading own email (optional - for checking if already registered)
CREATE POLICY "Allow checking email exists" ON waitlist_emails
  FOR SELECT
  USING (true);

-- =============================================
-- OPTIONAL: Admin view (requires auth)
-- =============================================
-- If you want to view all emails from Supabase dashboard,
-- you can do so from Table Editor. For API access from 
-- an admin panel, you'd need to set up authentication.
