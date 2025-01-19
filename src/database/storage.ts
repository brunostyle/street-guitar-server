import { createClient } from "@supabase/supabase-js";
const URL = process.env.SUPABASE_URL!;
const ANON_KEY = process.env.SUPABASE_ANON_KEY!;

export const supabase = createClient(URL, ANON_KEY);