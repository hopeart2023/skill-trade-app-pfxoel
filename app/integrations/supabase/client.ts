
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://kuxbnbplndjuyfauqxop.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1eGJuYnBsbmRqdXlmYXVxeG9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3MzMxMTAsImV4cCI6MjA3NzMwOTExMH0.vViZnlvSwFBhrYC0pefLnPZql3gMw_dZIvSWsQNFYCw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
