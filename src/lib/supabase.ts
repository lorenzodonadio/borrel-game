import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nrzkfcqbicdouiebwnjy.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yemtmY3FiaWNkb3VpZWJ3bmp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTM1NjY2NjIsImV4cCI6MTk2OTE0MjY2Mn0.BkTM4g2IThbxzG-i7Le2JOWW6fGg2nXx85fYKfggJcg';
export const supabase = createClient(supabaseUrl, supabaseKey);
