import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { theme } from '../theme'
import { fetchProduct } from '../lib/api'
import { buildProductLink } from '../lib/whatsapp'
import { formatPrice } from '../components/ProductCard'
import TireImage from '../components/TireImage'
import Header from '../components/Header'
import Container from '../components/Container'

const chip = {
  fontSize: 12,
  color: theme.textPrimary,
  background: theme.chip,
  border: `1px solid ${theme.chipBorder}`,
  padding: '4px 10px',
  borderRadius: 6,
}

export default function Produto() {
  const { id } = useParams()
  const [produto, setProduto] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [qtd, setQtd] = useState(1)
  const [fotoAtiva, setFotoAtiva] = useState(0)

  useEffect(() => {
    fetchProduct(id)
      .then(setProduto)
      .catch(console.error)
      .finally(() => setCarregando(false))
  }, [id])

  if (carregando) {
    return (
      <div style={{ minHeight: '100vh', background: theme.bg }}>
        <Header />
        <Container style={{ padding: '48px 20px', textAlign: 'center' }}>
          <p style={{ color: theme.textMuted, fontSize: 14 }}>Carregando...</p>
        </Container>
      </div>
    )
  }

  if (!produto) {
    return (
      <div style={{ minHeight: '100vh', background: theme.bg }}>
        <Header />
        <Container style={{ padding: '40px 20px', textAlign: 'center' }}>
          <p style={{ color: theme.textSecondary, fontSize: 15 }}>Produto não encontrado.</p>
          <Link to="/catalogo" style={{ color: theme.red, fontSize: 14, display: 'inline-block', marginTop: 16 }}>← Voltar ao catálogo</Link>
        </Container>
      </div>
    )
  }

  const preco = formatPrice(produto.price)
  const isPneu = produto.category === 'Pneus'
  const link = buildProductLink({ name: produto.name, brand: produto.brand, size: produto.size, qty: qtd })
  const fotos = produto.photos || []

  const opcoes = [
    { valor: 1, rotulo: '1 pneu' },
    { valor: 2, rotulo: 'Par' },
    { valor: 4, rotulo: 'Jogo de 4' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, paddingBottom: 90 }}>
      <Header />

      <Container max={900} style={{ padding: '14px 20px 0' }}>
        <Link to="/catalogo" style={{ color: theme.textSecondary, fontSize: 13, textDecoration: 'none' }}>← Voltar ao catálogo</Link>
      </Container>

      <Container max={900} style={{ padding: '0 20px', marginTop: 14 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
          {/* Foto principal + galeria */}
          <div style={{ flex: '1 1 300px' }}>
            <div style={{ background: theme.photoBg, borderRadius: 16, overflow: 'hidden', aspectRatio: '1 / 1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {fotos.length > 0 ? (
                <img src={fotos[fotoAtiva]} alt={produto.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              ) : (
                <TireImage photos={[]} size={180} bg={theme.photoBg} />
              )}
            </div>
            {fotos.length > 1 && (
              <div style={{ display: 'flex', gap: 8, padding: '10px 0 0', justifyContent: 'center' }}>
                {fotos.map((f, i) => (
                  <button
                    key={i}
                    onClick={() => setFotoAtiva(i)}
                    style={{
                      width: 52, height: 52, borderRadius: 8, padding: 0, cursor: 'pointer', overflow: 'hidden',
                      border: `2px solid ${i === fotoAtiva ? theme.red : theme.cardBorder}`,
                      background: theme.bgElevated,
                    }}
                  >
                    <img src={f} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Infos */}
          <div style={{ flex: '1 1 320px', padding: '4px 0 24px' }}>
            <div style={{ color: theme.textMuted, fontSize: 12 }}>{produto.category}</div>
            {produto.brand && <div style={{ color: theme.textSecondary, fontSize: 13, marginTop: 4 }}>{produto.brand}</div>}
            <h1 style={{ color: theme.textPrimary, fontSize: 23, fontWeight: 700, marginTop: 2 }}>{produto.name}</h1>

            {(produto.size || produto.loadIndex || produto.type || produto.aro) && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
                {produto.size && <span style={chip}>{produto.size}</span>}
                {!produto.size && produto.aro && <span style={chip}>Aro {produto.aro}</span>}
                {produto.loadIndex && <span style={chip}>{produto.loadIndex}</span>}
                {produto.type && <span style={chip}>{produto.type}</span>}
              </div>
            )}

            {preco ? (
              <div style={{ marginTop: 18 }}>
                <div style={{ color: theme.red, fontSize: 27, fontWeight: 700 }}>{preco}</div>
                <div style={{ color: theme.textMuted, fontSize: 12 }}>por unidade</div>
              </div>
            ) : (
              <div style={{ marginTop: 18, color: theme.textSecondary, fontSize: 18, fontWeight: 600 }}>Sob consulta</div>
            )}

            {produto.description && (
              <p style={{ color: theme.textSecondary, fontSize: 14, lineHeight: 1.6, marginTop: 18 }}>{produto.description}</p>
            )}

            {isPneu && (
              <div style={{ marginTop: 22 }}>
                <div style={{ color: theme.textSecondary, fontSize: 13, marginBottom: 8 }}>Quantidade</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {opcoes.map((o) => {
                    const ativo = qtd === o.valor
                    return (
                      <button
                        key={o.valor}
                        onClick={() => setQtd(o.valor)}
                        style={{
                          flex: 1, padding: 10, fontSize: 13, fontWeight: 500, borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit',
                          background: ativo ? theme.red : theme.chip,
                          color: ativo ? '#fff' : theme.textPrimary,
                          border: `1px solid ${ativo ? theme.red : theme.chipBorder}`,
                        }}
                      >
                        {o.rotulo}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>

      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '12px 16px', background: theme.bg, borderTop: `1px solid ${theme.divider}` }}>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: theme.whatsapp, color: '#0A0A0B', fontSize: 15, fontWeight: 600, padding: 14, borderRadius: 10, textDecoration: 'none', maxWidth: 520, margin: '0 auto' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#0A0A0B" aria-hidden="true">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15c-1.53 0-3.03-.41-4.34-1.19l-.31-.18-3.12.82.83-3.04-.2-.32a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.24-8.24s8.24 3.7 8.24 8.24-3.7 8.27-8.28 8.27zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.79.97-.15.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.16 1.75 2.67 4.25 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z"/>
          </svg>
          Solicitar orçamento
        </a>
      </div>
    </div>
  )
}
