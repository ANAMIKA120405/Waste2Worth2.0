// supabaseClient.js
import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const SUPABASE_URL = 'https://vbgtozxgseepvnphvrma.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZiZ3Rvenhnc2VlcHZucGh2cm1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3OTI2NTAsImV4cCI6MjA3NDM2ODY1MH0.U7ToX0nez3j6OUZCWHumJ8Ky-3jrfgDwUpiDjx6TZVw'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
