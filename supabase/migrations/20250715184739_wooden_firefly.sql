/*
  # Create leads and scrape_logs tables

  1. New Tables
    - `leads`
      - `id` (uuid, primary key)
      - `bedrijfsnaam` (text)
      - `adres` (text)
      - `branche` (text)
      - `contactpersoon` (text)
      - `functie` (text)
      - `email` (text)
      - `telefoon` (text)
      - `created_at` (timestamp)
    - `scrape_logs`
      - `id` (uuid, primary key)
      - `status` (text)
      - `timestamp` (timestamp)
      - `message` (text)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bedrijfsnaam text NOT NULL,
  adres text NOT NULL,
  branche text NOT NULL,
  contactpersoon text NOT NULL,
  functie text NOT NULL,
  email text NOT NULL,
  telefoon text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS scrape_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  status text NOT NULL,
  timestamp timestamptz DEFAULT now(),
  message text NOT NULL
);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE scrape_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for leads table
CREATE POLICY "Authenticated users can read leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert leads"
  ON leads
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update leads"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete leads"
  ON leads
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for scrape_logs table
CREATE POLICY "Authenticated users can read logs"
  ON scrape_logs
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert logs"
  ON scrape_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_branche ON leads(branche);
CREATE INDEX IF NOT EXISTS idx_scrape_logs_timestamp ON scrape_logs(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_scrape_logs_status ON scrape_logs(status);