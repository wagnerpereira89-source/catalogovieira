import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { theme } from '../theme'
import { formatPrice } from '../components/ProductCard'
import Container from '../components/Container'
import { SearchIcon } from '../components/CategoryIcon'

// Lista de produtos do admin: buscar, ativar/desativar, destacar, editar, excluir.
export default function Dashboard() {
  const [produtos, setProdutos] = useState([])
  const [busca, setBusca] = useState('')
  const [carregando, setCarregando] = useState(true)
  const navigate = useNavigate()

  async function carregar() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error) setProdutos(data)
    setCarregando(false)
  }

  useEffect(() => { carregar() }, [])

  async function alternar(p, campo) {
    const { error } = await supabase.from('products').update({ [campo]: !p[campo] }).eq('id', p.id)
    if (!error) setProdutos((lista) => lista.map((x) => (x.id === p.id ? { ...x, [campo]: !p[campo] } : x)))
  }

  async function excluir(p) {
    if (!confirm(`Excluir "${p.name}"? Essa ação não tem volta.`)) return
    const { error } = await supabase.from('products').delete().eq('id', p.id)
    if (!error) setProdutos((lista) => lista.filter((x) => x.id !== p.id))
  }

  async function sair() {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  const termo = busca.trim().toLowerCase()
  const filtrados = termo
    ? produtos.filter((p) => `${p.brand || ''} ${p.name} ${p.size || ''} ${p.category}`.toLowerCase().includes(termo))
    : produtos

  const btnMini = (ativo) => ({
    fontSize: 12,
    fontWeight: 500,
    padding: '6px 10px',
    borderRadius: 7,
    cursor: 'pointer',
    fontFamily: 'inherit',
    background: ativo ? 'rgba(228,34,46,0.12)' : theme.chip,
    color: ativo ? '#F26A6A' : theme.textSecondary,
    border: `1px solid ${ativo ? 'rgba(228,34,46,0.35)' : theme.chipBorder}`,
  })

  return (
    <div data-theme="dark" style={{ minHeight: '100vh', background: theme.bg, paddingBottom: 60 }}>
      <header style={{ borderBottom: `1px solid ${theme.divider}` }}>
        <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
          <span style={{ color: theme.textPrimary, fontWeight: 700, fontSize: 15 }}>
            <span style={{ color: theme.red }}>Admin</span> · Vieira Pneus
          </span>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link to="/" style={{ color: theme.textSecondary, fontSize: 13, textDecoration: 'none', padding: '8px 4px' }}>Ver site</Link>
            <button onClick={sair} style={{ background: 'transparent', border: 'none', color: theme.textSecondary, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Sair</button>
          </div>
        </Container>
      </header>

      <Container style={{ padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h1 style={{ color: theme.textPrimary, fontSize: 20, fontWeight: 700 }}>Produtos</h1>
          <div style={{ display: 'flex', gap: 8 }}>
            <Link to="/admin/categorias" style={{ fontSize: 13, color: theme.textPrimary, background: theme.chip, border: `1px solid ${theme.chipBorder}`, padding: '9px 14px', borderRadius: 8, textDecoration: 'none' }}>
              Categorias
            </Link>
            <Link to="/admin/produto/novo" style={{ fontSize: 13, fontWeight: 600, color: '#fff', background: theme.red, padding: '9px 16px', borderRadius: 8, textDecoration: 'none' }}>
              + Novo produto
            </Link>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: theme.chip, border: `1px solid ${theme.chipBorder}`, borderRadius: 8, padding: '9px 12px', marginBottom: 16 }}>
          <SearchIcon size={16} style={{ color: theme.textMuted, flexShrink: 0 }} />
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar produto..."
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: theme.textPrimary, fontSize: 13, fontFamily: 'inherit' }}
          />
        </div>

        {carregando ? (
          <p style={{ color: theme.textMuted, fontSize: 14, padding: '30px 0', textAlign: 'center' }}>Carregando...</p>
        ) : filtrados.length === 0 ? (
          <div style={{ background: theme.card, border: `1px solid ${theme.cardBorder}`, borderRadius: 12, padding: 30, textAlign: 'center' }}>
            <p style={{ color: theme.textSecondary, fontSize: 14 }}>
              {produtos.length === 0 ? 'Nenhum produto ainda. Clique em "+ Novo produto" pra cadastrar o primeiro.' : 'Nada encontrado nessa busca.'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtrados.map((p) => (
              <div key={p.id} style={{ background: theme.card, border: `1px solid ${theme.cardBorder}`, borderRadius: 12, padding: '14px 16px', display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap', opacity: p.active ? 1 : 0.55 }}>
                <div style={{ width: 52, height: 52, borderRadius: 8, background: theme.bgElevated, overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {p.photos && p.photos[0]
                    ? <img src={p.photos[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <span style={{ color: theme.textMuted, fontSize: 10 }}>sem foto</span>}
                </div>
                <div style={{ flex: '1 1 180px', minWidth: 0 }}>
                  <div style={{ color: theme.textPrimary, fontSize: 14, fontWeight: 600 }}>
                    {p.brand ? `${p.brand} ` : ''}{p.name}
                  </div>
                  <div style={{ color: theme.textMuted, fontSize: 12, marginTop: 2 }}>
                    {p.category}{p.size ? ` · ${p.size}` : ''} · {p.price != null ? formatPrice(Number(p.price)) : 'Sob consulta'}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <button onClick={() => alternar(p, 'active')} style={btnMini(p.active)}>
                    {p.active ? 'Ativo' : 'Inativo'}
                  </button>
                  <button onClick={() => alternar(p, 'featured')} style={btnMini(p.featured)}>
                    {p.featured ? '★ Destaque' : '☆ Destaque'}
                  </button>
                  <Link to={`/admin/produto/${p.id}/editar`} style={{ ...btnMini(false), textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                    Editar
                  </Link>
                  <button onClick={() => excluir(p)} style={{ ...btnMini(false), color: theme.red }}>
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}
