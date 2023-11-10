import {createClient} from '@supabase/supabase-js';

const supabaseUrl = "https://pwmyqpdbvygzsejpkofk.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3bXlxcGRidnlnenNlanBrb2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk1NDY1MjMsImV4cCI6MjAxNTEyMjUyM30.5vGyI4NvADztodign8--kZQVQaU7ewIPMmaFqLgnGSI";


export const supabase = createClient(supabaseUrl, supabaseAnonKey  );