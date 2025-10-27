// supabaseClient.js
import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const SUPABASE_URL = 'https://YOUR_PROJECT_URL.supabase.co'
const SUPABASE_ANON_KEY = 'YOUR_PUBLIC_ANON_KEY'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
