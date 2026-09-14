import { Link } from 'react-router-dom'
import { theme } from '../theme'
import WhatsAppButton from '../components/WhatsAppButton'
import Header from '../components/Header'
import Container from '../components/Container'
import lojaFoto from '../assets/loja-vieira.jpg'

// Sócios da empresa
const SOCIOS = [
  {
    nome: 'Robson Daniel Vieira',
    cargo: 'Sócio-fundador',
    bio: 'Mais de 15 anos de experiência no ramo de pneus. Seu conhecimento técnico e prático do setor foi fundamental para o crescimento da Vieira Pneus e para a construção de relações duradouras com clientes e parceiros.',
  },
  {
    nome: 'Alessandra Alexi Vieira',
    cargo: 'Sócia e gestora financeira',
    bio: 'Depois de quase 10 anos no setor bancário, passou a integrar a gestão da Vieira Pneus, trazendo sua experiência nas áreas financeira, comercial e de relacionamento para fortalecer os processos, o planejamento e a expansão do negócio.',
  },
]

// Serviços resumidos (chips)
const SERVICOS = [
  'Recapagem de pneus',
  'Borracharia',
  'Pneus novos',
  'Alinhamento de caminhões',
  'Acessórios',
  'Manutenção de frotas',
]

export default function Sobre() {
  return (
    <div style={{ minHeight: '100vh', background: theme.bg, paddingBottom: 100 }}>
      <Header />

      {/* Hero */}
      <section style={{ borderBottom: `1px solid ${theme.divider}` }}>
        <Container style={{ padding: '52px 20px', textAlign: 'center' }}>
          <h1 style={{ color: theme.textPrimary, fontSize: 32, fontWeight: 700, lineHeight: 1.25 }}>
            Sobre Nós
          </h1>
          <p style={{ color: theme.textSecondary, fontSize: 15, marginTop: 14, lineHeight: 1.6, maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
            Há mais de 15 anos cuidando de pneus, frotas e veículos pesados em São Bento do Sul.
          </p>
        </Container>
      </section>

      {/* Foto da loja */}
      <Container style={{ padding: '28px 20px 8px', maxWidth: 900 }}>
        <div style={{ borderRadius: 14, overflow: 'hidden', border: `1px solid ${theme.cardBorder}`, background: theme.photoBg }}>
          <img
            src={lojaFoto}
            alt="Estrutura da Vieira Pneus e Recapagens em São Bento do Sul"
            style={{ display: 'block', width: '100%', height: 'auto' }}
          />
        </div>
      </Container>

      {/* História */}
      <Container style={{ padding: '20px 20px 8px', maxWidth: 760 }}>
        <p style={{ color: theme.textSecondary, fontSize: 15.5, lineHeight: 1.7, marginBottom: 16 }}>
          A <strong style={{ color: theme.textPrimary, fontWeight: 600 }}>Vieira Pneus e Recapagens</strong> nasceu da experiência, do trabalho e da paixão pelo segmento de pneus. Há mais de 15 anos no mercado, construímos nossa trajetória com foco em qualidade, confiança e compromisso com nossos clientes — especialmente no atendimento a transportadoras, frotistas e veículos pesados.
        </p>
        <p style={{ color: theme.textSecondary, fontSize: 15.5, lineHeight: 1.7 }}>
          Hoje, a Vieira Pneus reúne experiência técnica e gestão profissional em uma estrutura completa voltada ao segmento automotivo, com forte atuação em veículos pesados. Mais do que prestar serviços, buscamos ser parceiros dos nossos clientes, oferecendo agilidade, segurança, qualidade e soluções que ajudam a reduzir custos e manter a frota rodando.
        </p>
      </Container>

      {/* Sócios */}
      <Container style={{ padding: '28px 20px 8px', maxWidth: 900 }}>
        <h2 style={{ color: theme.textPrimary, fontSize: 19, fontWeight: 700, marginBottom: 16 }}>
          Quem está à frente
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
          {SOCIOS.map((s) => (
            <div
              key={s.nome}
              style={{ background: theme.card, border: `1px solid ${theme.cardBorder}`, borderRadius: 12, padding: '20px 18px' }}
            >
              <div style={{ color: theme.textPrimary, fontSize: 16.5, fontWeight: 700 }}>{s.nome}</div>
              <div style={{ display: 'inline-block', color: theme.red, fontSize: 12.5, fontWeight: 600, marginTop: 6, padding: '3px 10px', background: theme.chip, border: `1px solid ${theme.chipBorder}`, borderRadius: 999 }}>
                {s.cargo}
              </div>
              <p style={{ color: theme.textSecondary, fontSize: 14, lineHeight: 1.6, marginTop: 12 }}>
                {s.bio}
              </p>
            </div>
          ))}
        </div>
      </Container>

      {/* Serviços */}
      <Container style={{ padding: '28px 20px 8px', maxWidth: 760 }}>
        <h2 style={{ color: theme.textPrimary, fontSize: 19, fontWeight: 700, marginBottom: 14 }}>
          O que oferecemos
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
          {SERVICOS.map((item) => (
            <span
              key={item}
              style={{ color: theme.textPrimary, fontSize: 13.5, fontWeight: 500, padding: '8px 14px', background: theme.chip, border: `1px solid ${theme.chipBorder}`, borderRadius: 999 }}
            >
              {item}
            </span>
          ))}
        </div>
      </Container>

      {/* Slogan + CTA */}
      <Container style={{ padding: '32px 20px 8px', maxWidth: 760 }}>
        <div style={{ background: theme.card, border: `1px solid ${theme.cardBorder}`, borderRadius: 14, padding: '28px 22px', textAlign: 'center' }}>
          <p style={{ color: theme.textPrimary, fontSize: 17, fontWeight: 700, lineHeight: 1.5 }}>
            Experiência que gera confiança.<br />Soluções que mantêm você em movimento.
          </p>
          <Link
            to="/catalogo"
            style={{ display: 'inline-block', marginTop: 20, background: theme.red, color: '#fff', fontSize: 15, fontWeight: 600, padding: '13px 30px', borderRadius: 10, textDecoration: 'none' }}
          >
            Ver catálogo
          </Link>
        </div>
      </Container>

      <WhatsAppButton />
    </div>
  )
}
