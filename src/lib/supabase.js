import { createClient } from '@supabase/supabase-js'

// As variáveis vêm do painel da Vercel (Settings > Environment Variables):
//   VITE_SUPABASE_URL
//   VITE_SUPABASE_ANON_KEY
// Enquanto elas não existirem, o client fica como null e o site continua
// abrindo normalmente (a gente só liga o Supabase no próximo passo).
const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = url && anonKey ? createClient(url, anonKey) : null

export const supabaseReady = Boolean(supabase)
