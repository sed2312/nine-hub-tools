-- Create waitlist_emails table for Pro waitlist signups
CREATE TABLE public.waitlist_emails (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.waitlist_emails ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert their email (public waitlist)
CREATE POLICY "Anyone can join waitlist"
ON public.waitlist_emails
FOR INSERT
WITH CHECK (true);

-- Only allow reading own email (prevents enumeration)
CREATE POLICY "Users cannot read waitlist"
ON public.waitlist_emails
FOR SELECT
USING (false);