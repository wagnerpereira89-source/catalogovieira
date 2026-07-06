import { theme } from '../theme'
import WhatsAppButton from '../components/WhatsAppButton'
import Header from '../components/Header'
import Container from '../components/Container'

export default function Placeholder({ title, note }) {
  return (
    <div style={{ minHeight: '100vh', background: theme.bg, paddingBottom: 100 }}>
      <Header />
      <Container style={{ padding: '20px 20px' }}>
        <h1 style={{ color: theme.textPrimary, fontSize: 22, fontWeight: 700, marginBottom: 16 }}>{title}</h1>
        <div style={{ background: theme.card, border: `1px solid ${theme.cardBorder}`, borderRadius: 12, padding: '24px 20px', textAlign: 'center' }}>
          <p style={{ color: theme.red, fontSize: 15, fontWeight: 600 }}>Em construção</p>
          <p style={{ color: theme.textSecondary, fontSize: 14, marginTop: 8, lineHeight: 1.55 }}>{note}</p>
        </div>
      </Container>
      <WhatsAppButton />
    </div>
  )
}
