import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sboyblmykmzlvyerrhci.supabase.co';
const supabaseKey = 'sbp_f3d234dd42709a547f0f39f0154fef35ed189fb7';

export const supabase = createClient(supabaseUrl, supabaseKey);