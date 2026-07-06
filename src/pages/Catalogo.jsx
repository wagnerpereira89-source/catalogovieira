import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { theme } from '../theme'
import { fetchProducts, fetchCategories } from '../lib/api'
import ProductCard from '../components/ProductCard'
import WhatsAppButton from '../components/WhatsAppButton'
import Header from '../components/Header'
import Container from '../components/Container'
import { SearchIcon } from '../components/CategoryIcon'

const selectStyle = {
  flex: 1,
  minWidth: 0,
  background: theme.chip,
  color: theme.textPrimary,
  border: `1px solid ${theme.chipBorder}`,
  borderRadius: 8,
  padding: '9px 10px',
  fontSize: 13,
  fontFamily: 'inherit',
  appearance: 'none',
  WebkitAppearance: 'none',
}

export default function Catalogo() {
  const [searchParams, setSearchParams] = useSearchParams()
  const catInicial = searchParams.get('cat') || ''

  const [produtos, setProdutos] = useState([])
  const [todasCategorias, setTodasCategorias] = useState([])
  const [carregando, setCarregando] = useState(true)

  const [busca, setBusca] = useState('')
  const [categoria, setCategoria] = useState(catInicial)
  const [marca, setMarca] = useState('')
  const [aro, setAro] = useState('')

  useEffect(() => {
    Promise.all([fetchProducts(), fetchCategories()])
      .then(([prods, cats]) => {
        setProdutos(prods)
        const usadas = new Set(prods.map((p) => p.category))
        setTodasCategorias(cats.filter((c) => usadas.has(c)))
      })
      .catch(console.error)
      .finally(() => setCarregando(false))
  }, [])

  const escopo = useMemo(
    () => (categoria ? produtos.filter((p) => p.category === categoria) : produtos),
    [produtos, categoria]
  )
  const marcas = useMemo(() => [...new Set(escopo.map((p) => p.brand).filter(Boolean))].sort(), [escopo])
  const aros = useMemo(() => [...new Set(escopo.map((p) => p.aro).filter((a) => a != null))].sort((a, b) => a - b), [escopo])
  const mostrarAro = aros.length > 0

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase()
    return escopo.filter((p) => {
      if (marca && p.brand !== marca) return false
      if (aro && p.aro !== Number(aro)) return false
      if (termo) {
        const alvo = `${p.brand || ''} ${p.name} ${p.size || ''} ${p.category}`.toLowerCase()
        if (!alvo.includes(termo)) return false
      }
      return true
    })
  }, [escopo, busca, marca, aro])

  function trocarCategoria(nova) {
    setCategoria(nova)
    setMarca('')
    setAro('')
    if (nova) setSearchParams({ cat: nova })
    else setSearchParams({})
  }

  function limpar() {
    setBusca(''); setMarca(''); setAro(''); trocarCategoria('')
  }

  const temFiltro = busca || categoria || marca || aro

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, paddingBottom: 100 }}>
      <Header />

      <Container style={{ padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: theme.chip, border: `1px solid ${theme.chipBorder}`, borderRadius: 8, padding: '9px 12px' }}>
          <SearchIcon size={16} style={{ color: theme.textMuted, flexShrink: 0 }} />
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar produto, marca ou medida..."
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: theme.textPrimary, fontSize: 13, fontFamily: 'inherit' }}
          />
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <select value={categoria} onChange={(e) => trocarCategoria(e.target.value)} style={selectStyle}>
            <option value="">Categoria</option>
            {todasCategorias.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={marca} onChange={(e) => setMarca(e.target.value)} style={selectStyle}>
            <option value="">Marca</option>
            {marcas.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          {mostrarAro && (
            <select value={aro} onChange={(e) => setAro(e.target.value)} style={selectStyle}>
              <option value="">Aro</option>
              {aros.map((a) => <option key={a} value={a}>Aro {a}</option>)}
            </select>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '12px 0 8px' }}>
          <span style={{ color: theme.textMuted, fontSize: 12 }}>
            {carregando ? 'Carregando...' : `${filtrados.length} ${filtrados.length === 1 ? 'item' : 'itens'}${categoria ? ` em ${categoria}` : ''}`}
          </span>
          {temFiltro && (
            <button onClick={limpar} style={{ background: 'transparent', border: 'none', color: theme.red, fontSize: 12, cursor: 'pointer', fontWeight: 500, fontFamily: 'inherit' }}>
              Limpar filtros
            </button>
          )}
        </div>

        <div className="produtos-grid" style={{ paddingTop: 4 }}>
          {filtrados.map((p) => <ProductCard key={p.id} produto={p} />)}
        </div>

        {!carregando && filtrados.length === 0 && (
          <p style={{ color: theme.textSecondary, fontSize: 14, textAlign: 'center', padding: '40px 20px' }}>
            Nenhum item encontrado.
          </p>
        )}
      </Container>

      <WhatsAppButton />
    </div>
  )
}
