import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase, supabaseReady } from '../lib/supabase'
import { theme } from '../theme'
import logo from '../assets/logo.png'

const inputStyle = {
  width: '100%',
  background: theme.chip,
  border: `1px solid ${theme.chipBorder}`,
  borderRadius: 8,
  padding: '11px 12px',
  color: theme.textPrimary,
  fontSize: 14,
  fontFamily: 'inherit',
  outline: 'none',
}

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)
  const navigate = useNavigate()

  async function entrar(e) {
    e.preventDefault()
    if (!supabaseReady) { setErro('Supabase não configurado.'); return }
    setEnviando(true)
    setErro('')
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha })
    setEnviando(false)
    if (error) {
      setErro('E-mail ou senha inválidos.')
      return
    }
    navigate('/admin')
  }

  return (
    <div data-theme="dark" style={{ minHeight: '100vh', background: theme.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <form onSubmit={entrar} style={{ width: '100%', maxWidth: 360 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <img src={logo} alt="Vieira Pneus" style={{ height: 72 }} />
        </div>
        <div style={{ background: theme.card, border: `1px solid ${theme.cardBorder}`, borderRadius: 14, padding: 24 }}>
          <h1 style={{ color: theme.textPrimary, fontSize: 18, fontWeight: 700, marginBottom: 18 }}>Painel admin</h1>
          <label style={{ display: 'block', color: theme.textSecondary, fontSize: 13, marginBottom: 6 }}>E-mail</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} autoComplete="username" />
          <label style={{ display: 'block', color: theme.textSecondary, fontSize: 13, margin: '14px 0 6px' }}>Senha</label>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} style={inputStyle} autoComplete="current-password" />
          {erro && <p style={{ color: theme.red, fontSize: 13, marginTop: 12 }}>{erro}</p>}
          <button
            type="submit"
            disabled={enviando}
            style={{ width: '100%', marginTop: 18, background: theme.red, color: '#fff', border: 'none', borderRadius: 9, padding: 12, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', opacity: enviando ? 0.7 : 1 }}
          >
            {enviando ? 'Entrando...' : 'Entrar'}
          </button>
        </div>
      </form>
    </div>
  )
}
