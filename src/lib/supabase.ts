import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vkfklzawkkpkuamuhiuy.supabase.co';
const supabaseKey = 'sb_publishable_zQCuW8goMYBdyJ9hi0K24Q_5U-QX4HT';

export const supabase = createClient(supabaseUrl, supabaseKey);