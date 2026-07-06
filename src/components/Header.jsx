import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Container from './Container'
import TopBar from './TopBar'
import logo from '../assets/logo.png'
import { getTheme, setTheme } from '../lib/themeMode'

const ITENS = [
  { to: '/', label: 'Home' },
  { to: '/catalogo', label: 'Produtos' },
  { to: '/servicos', label: 'Serviços' },
  { to: '/loja', label: 'Contato' },
]

export default function Header() {
  const [aberto, setAberto] = useState(false)
  const [tema, setTemaState] = useState(getTheme())
  const { pathname } = useLocation()

  function ativo(to) {
    if (to === '/') return pathname === '/'
    return pathname.startsWith(to)
  }

  function alternarTema() {
    const novo = tema === 'dark' ? 'light' : 'dark'
    setTheme(novo)
    setTemaState(novo)
  }

  return (
    <>
      <TopBar />
      <header style={{ borderBottom: '1px solid var(--header-border)', background: 'var(--header-bg)', position: 'relative', zIndex: 40, transition: 'background .2s ease, border-color .2s ease' }}>
        <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, height: 'clamp(78px, 9vw, 104px)', padding: '0 clamp(22px, 5vw, 48px)' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
            <img className="header-logo" src={logo} alt="Vieira Pneus — Recapadora e Acessórios" />
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <nav className="nav-desktop" style={{ gap: 26, alignItems: 'center' }}>
              {ITENS.map((item) => (
                <Link key={item.to} to={item.to} className={`nav-link${ativo(item.to) ? ' ativo' : ''}`}>
                  {item.label}
                </Link>
              ))}
            </nav>

            <button className="theme-toggle" onClick={alternarTema} aria-label={tema === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}>
              {tema === 'dark' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="4.2" />
                  <path d="M12 2.5v2M12 19.5v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2.5 12h2M19.5 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
                </svg>
              )}
            </button>

            <button
              className="nav-burger"
              onClick={() => setAberto(!aberto)}
              aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 8, alignItems: 'center', color: 'var(--header-text-strong)' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {aberto ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </Container>

        {aberto && (
          <nav style={{ borderTop: '1px solid var(--header-border)', background: 'var(--header-bg)' }}>
            <Container style={{ display: 'flex', flexDirection: 'column', padding: '8px 20px 16px' }}>
              {ITENS.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setAberto(false)}
                  style={{
                    color: ativo(item.to) ? 'var(--header-text-strong)' : 'var(--header-text)',
                    fontSize: 15, fontWeight: 500, textDecoration: 'none',
                    padding: '13px 4px', borderBottom: '1px solid var(--header-border)',
                    borderLeft: ativo(item.to) ? '3px solid #E4222E' : '3px solid transparent',
                    paddingLeft: 12,
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </Container>
          </nav>
        )}
      </header>
    </>
  )
}
