import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { theme } from '../theme'
import { fetchProducts, fetchCategories } from '../lib/api'
import ProductCard from '../components/ProductCard'
import WhatsAppButton from '../components/WhatsAppButton'
import Header from '../components/Header'
import Container from '../components/Container'
import CategoryIcon from '../components/CategoryIcon'

export default function Home() {
  const [produtos, setProdutos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    Promise.all([fetchProducts(), fetchCategories()])
      .then(([prods, cats]) => {
        setProdutos(prods)
        // só mostra categorias que têm produto
        const usadas = new Set(prods.map((p) => p.category))
        setCategorias(cats.filter((c) => usadas.has(c)))
      })
      .catch(console.error)
      .finally(() => setCarregando(false))
  }, [])

  const destaques = produtos.filter((p) => p.featured)
  const contagem = {}
  for (const p of produtos) contagem[p.category] = (contagem[p.category] || 0) + 1

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, paddingBottom: 100 }}>
      <Header />

      <section style={{ borderBottom: `1px solid ${theme.divider}` }}>
        <Container style={{ padding: '56px 20px', textAlign: 'center' }}>
          <h1 style={{ color: theme.textPrimary, fontSize: 32, fontWeight: 700, lineHeight: 1.25, maxWidth: 640, margin: '0 auto' }}>
            Os melhores pneus e acessórios de São Bento do Sul
          </h1>
          <p style={{ color: theme.textSecondary, fontSize: 15, marginTop: 14, lineHeight: 1.6, maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
            Escolha pela categoria, marca ou medida, confira os detalhes e peça seu orçamento direto no WhatsApp.
          </p>
          <Link to="/catalogo" style={{ display: 'inline-block', marginTop: 24, background: theme.red, color: '#fff', fontSize: 15, fontWeight: 600, padding: '13px 30px', borderRadius: 10, textDecoration: 'none' }}>
            Ver catálogo
          </Link>
        </Container>
      </section>

      {carregando ? (
        <Container style={{ padding: '48px 20px', textAlign: 'center' }}>
          <p style={{ color: theme.textMuted, fontSize: 14 }}>Carregando...</p>
        </Container>
      ) : (
        <>
          {categorias.length > 0 && (
            <Container style={{ padding: '36px 20px 8px' }}>
              <h2 style={{ color: theme.textPrimary, fontSize: 19, fontWeight: 700, marginBottom: 16 }}>Categorias</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
                {categorias.map((cat) => (
                  <Link key={cat} to={`/catalogo?cat=${encodeURIComponent(cat)}`} className="cat-card">
                    <div className="cat-glow" />
                    <div className="cat-chip">
                      <CategoryIcon name={cat} size={22} />
                    </div>
                    <div className="cat-nome" style={{ fontSize: 15, fontWeight: 600, marginTop: 14 }}>{cat}</div>
                    <div className="cat-count" style={{ fontSize: 12.5, marginTop: 3 }}>
                      {contagem[cat]} {contagem[cat] === 1 ? 'item' : 'itens'}
                    </div>
                    <svg className="cat-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M7 17L17 7M9 7h8v8" />
                    </svg>
                  </Link>
                ))}
              </div>
            </Container>
          )}

          {destaques.length > 0 && (
            <Container style={{ padding: '36px 20px 8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
                <h2 style={{ color: theme.textPrimary, fontSize: 19, fontWeight: 700 }}>Destaques</h2>
                <Link to="/catalogo" style={{ color: theme.red, fontSize: 13, textDecoration: 'none', fontWeight: 500 }}>Ver todos →</Link>
              </div>
              <div className="produtos-grid">
                {destaques.map((p) => <ProductCard key={p.id} produto={p} />)}
              </div>
            </Container>
          )}

          {produtos.length === 0 && (
            <Container style={{ padding: '48px 20px', textAlign: 'center' }}>
              <p style={{ color: theme.textSecondary, fontSize: 14 }}>
                Nenhum produto cadastrado ainda. Cadastre o primeiro no painel admin.
              </p>
            </Container>
          )}
        </>
      )}

      <WhatsAppButton />
    </div>
  )
}
