import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase, supabaseReady } from '../lib/supabase'
import { theme } from '../theme'

// Protege as rotas /admin: só passa com sessão ativa no Supabase.
export default function AdminGuard({ children }) {
  const [sessao, setSessao] = useState(undefined) // undefined = verificando

  useEffect(() => {
    if (!supabaseReady) { setSessao(null); return }
    supabase.auth.getSession().then(({ data }) => setSessao(data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSessao(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  if (!supabaseReady) {
    return (
      <div data-theme="dark" style={{ minHeight: '100vh', background: theme.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <div style={{ background: theme.card, border: `1px solid ${theme.cardBorder}`, borderRadius: 12, padding: 24, maxWidth: 420, textAlign: 'center' }}>
          <p style={{ color: theme.red, fontWeight: 600, fontSize: 15 }}>Supabase não configurado</p>
          <p style={{ color: theme.textSecondary, fontSize: 13, marginTop: 10, lineHeight: 1.6 }}>
            O painel admin precisa das variáveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY
            configuradas na Vercel. Veja o passo a passo no README do projeto.
          </p>
        </div>
      </div>
    )
  }

  if (sessao === undefined) {
    return (
      <div style={{ minHeight: '100vh', background: theme.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: theme.textMuted, fontSize: 14 }}>Verificando acesso...</p>
      </div>
    )
  }

  if (!sessao) return <Navigate to="/admin/login" replace />
  return children
}
