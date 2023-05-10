import { Database } from './supabaseInterface';

export type Contact = Database['public']['Tables']['contacts']['Row'];