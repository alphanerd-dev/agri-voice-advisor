import * as Supabase from '@supabase/supabase-js'

const supabaseUrl = 'https://hdqxupusenblwwsxqklp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkcXh1cHVzZW5ibHd3c3hxa2xwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI2ODE0NzksImV4cCI6MjA5ODI1NzQ3OX0.KkBxe-tZ_OSgE872ovAdoMA4WCvmJg_v8Iv1bimHFQc';

export const supabase = Supabase.createClient(supabaseUrl, supabaseAnonKey)
