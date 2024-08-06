import { createClient } from "@supabase/supabase-js";


const REACT_APP_SUPABASE_URL = "https://qdxgttniwwbbcyoqixmu.supabase.co"
const REACT_APP_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkeGd0dG5pd3diYmN5b3FpeG11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI5MjM4OTcsImV4cCI6MjAzODQ5OTg5N30.5EkfXVSH6w7x-_r-b-Db4rXVdgoUpKpypYQD04jJ80g"


export const supabase = createClient(REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_ANON_KEY);
