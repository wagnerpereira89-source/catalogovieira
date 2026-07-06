import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { theme } from '../theme'
import Container from '../components/Container'
import CategoryIcon from '../components/CategoryIcon'

export default function Categorias() {
  const [categorias, setCategorias] = useState([])
  const [nova, setNova] = useState('')
  const [erro, setErro] = useState('')

  async function carregar() {
    const { data } = await supabase.from('categories').select('*').order('sort_order')
    if (data) setCategorias(data)
  }
  useEffect(() => { carregar() }, [])

  async function adicionar(e) {
    e.preventDefault()
    const nome = nova.trim()
    if (!nome) return
    setErro('')
    const maiorOrdem = Math.max(0, ...categorias.map((c) => c.sort_order))
    const { error } = await supabase.from('categories').insert({ name: nome, sort_order: maiorOrdem + 1 })
    if (error) { setErro('Não deu pra adicionar (nome repetido?).'); return }
    setNova('')
    carregar()
  }

  async function remover(cat) {
    const { count } = await supabase.from('products').select('id', { count: 'exact', head: true }).eq('category', cat.name)
    if (count > 0) {
      alert(`"${cat.name}" tem ${count} produto(s). Mova ou exclua eles antes de remover a categoria.`)
      return
    }
    if (!confirm(`Remover a categoria "${cat.name}"?`)) return
    await supabase.from('categories').delete().eq('id', cat.id)
    carregar()
  }

  return (
    <div data-theme="dark" style={{ minHeight: '100vh', background: theme.bg, paddingBottom: 60 }}>
      <header style={{ borderBottom: `1px solid ${theme.divider}` }}>
        <Container style={{ display: 'flex', alignItems: 'center', height: 60, gap: 12 }}>
          <Link to="/admin" style={{ color: theme.textSecondary, fontSize: 13, textDecoration: 'none' }}>← Voltar</Link>
          <span style={{ color: theme.textPrimary, fontWeight: 700, fontSize: 15 }}>Categorias</span>
        </Container>
      </header>

      <Container max={560} style={{ padding: '24px 20px 0' }}>
        <form onSubmit={adicionar} style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
          <input
            value={nova}
            onChange={(e) => setNova(e.target.value)}
            placeholder="Nova categoria..."
            style={{ flex: 1, background: theme.chip, border: `1px solid ${theme.chipBorder}`, borderRadius: 8, padding: '10px 12px', color: theme.textPrimary, fontSize: 14, fontFamily: 'inherit', outline: 'none' }}
          />
          <button type="submit" style={{ background: theme.red, color: '#fff', border: 'none', borderRadius: 8, padding: '10px 18px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
            Adicionar
          </button>
        </form>
        {erro && <p style={{ color: theme.red, fontSize: 13, marginBottom: 12 }}>{erro}</p>}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {categorias.map((c) => (
            <div key={c.id} style={{ background: theme.card, border: `1px solid ${theme.cardBorder}`, borderRadius: 10, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ color: '#F26A6A', display: 'flex' }}><CategoryIcon name={c.name} size={20} /></span>
              <span style={{ flex: 1, color: theme.textPrimary, fontSize: 14, fontWeight: 500 }}>{c.name}</span>
              <button onClick={() => remover(c)} style={{ background: 'transparent', border: 'none', color: theme.textMuted, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
                Remover
              </button>
            </div>
          ))}
        </div>
        <p style={{ color: theme.textMuted, fontSize: 12, marginTop: 16, lineHeight: 1.5 }}>
          Categorias novas usam um ícone genérico por enquanto — me avisa qual criar que eu desenho um sob medida.
        </p>
      </Container>
    </div>
  )
}
