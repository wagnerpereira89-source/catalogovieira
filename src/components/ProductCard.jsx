import { Link } from 'react-router-dom'
import { theme } from '../theme'
import TireImage from './TireImage'

export function formatPrice(price) {
  if (price == null) return null
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 })
}

export default function ProductCard({ produto }) {
  const preco = formatPrice(produto.price)
  const sub = produto.size || produto.category
  const foto = produto.photos && produto.photos[0]

  return (
    <Link
      to={`/produto/${produto.id}`}
      className="prod-card"
      style={{
        background: theme.card,
        border: `1px solid ${theme.cardBorder}`,
        borderRadius: 16,
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Foto ocupa a largura toda, sobre fundo neutro */}
      <div style={{
        background: theme.photoBg,
        aspectRatio: '1 / 1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {foto
          ? <img src={foto} alt={produto.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          : <TireImage photos={[]} size={96} bg={theme.photoBg} />}
      </div>

      {/* Infos embaixo */}
      <div style={{ padding: '14px 14px 16px', textAlign: 'center' }}>
        {produto.brand && <div style={{ color: theme.textSecondary, fontSize: 12 }}>{produto.brand}</div>}
        <div style={{ color: theme.textPrimary, fontSize: 15, fontWeight: 600, marginTop: 3, lineHeight: 1.3 }}>
          {produto.name}
        </div>
        {sub && <div style={{ color: theme.textSecondary, fontSize: 13, marginTop: 4 }}>{sub}</div>}
        {preco ? (
          <div style={{ color: theme.red, fontSize: 17, fontWeight: 700, marginTop: 10 }}>{preco}</div>
        ) : (
          <div style={{ color: theme.textMuted, fontSize: 13, fontWeight: 500, marginTop: 10 }}>Sob consulta</div>
        )}
      </div>
    </Link>
  )
}
