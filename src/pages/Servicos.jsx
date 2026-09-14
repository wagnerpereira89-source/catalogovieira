import { theme } from '../theme'
import WhatsAppButton from '../components/WhatsAppButton'
import Header from '../components/Header'
import Container from '../components/Container'
import { WHATSAPP_NUMBER } from '../lib/whatsapp'

// Traço padrão dos ícones (igual ao CategoryIcon do site)
const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }

// Ícones desenhados sob medida pra cada serviço
const ICONS = {
  // Borracharia: pneu + chave de boca (montagem/conserto)
  borracharia: (
    <g {...S}>
      <circle cx="10" cy="12" r="6.5" />
      <circle cx="10" cy="12" r="2.4" />
      <path d="M15.6 8.2l3.1-3.1a2.4 2.4 0 0 1 .2 3.4l-2.2 2.2" />
      <path d="M18.9 5.1l-1.9 1.9 1.1 1.1 1.9-1.9" />
    </g>
  ),
  // Recapagem: prédio/fábrica com chaminé
  recapagem: (
    <g {...S}>
      <path d="M3 20.5V11l5 3V11l5 3V7.5h7.5v13z" />
      <path d="M17 4.5V7.5" />
      <path d="M6.5 17.5h1.5M11 17.5h1.5M15.5 17.5H17" />
    </g>
  ),
  // Loja de acessórios: prateleira/estante com itens
  loja: (
    <g {...S}>
      <path d="M4 4.5h16M4 12h16M4 19.5h16" />
      <path d="M6.5 4.5v7.5M17.5 4.5v7.5M9.5 12v7.5M14.5 12v7.5" />
    </g>
  ),
}

const SERVICOS = [
  {
    id: 'borracharia',
    titulo: 'Borracharia',
    texto: 'Atendimento a pneus pesados e leves, com montagem, desmontagem, conserto e balanceamento. Estrutura preparada para caminhões, frotas e veículos de passeio — com agilidade pra manter você na estrada.',
    msg: 'Olá! Gostaria de saber mais sobre os serviços de borracharia da Vieira Pneus.',
  },
  {
    id: 'recapagem',
    titulo: 'Fábrica de Recapagem',
    texto: 'Recapagem feita na nossa própria fábrica, com controle de qualidade em cada etapa do processo. Mais vida útil pros seus pneus e economia real pra frota, sem abrir mão da segurança.',
    msg: 'Olá! Gostaria de saber mais sobre a recapagem de pneus da Vieira Pneus.',
  },
  {
    id: 'loja',
    titulo: 'Loja de Acessórios',
    texto: 'Soluções complementares para caminhões e veículos pesados: lanternas, buzinas, acessórios e peças de reposição. Tudo num lugar só pra manutenção da sua frota.',
    msg: 'Olá! Gostaria de saber mais sobre os acessórios da Vieira Pneus.',
  },
]

function linkWhats(msg) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
}

export default function Servicos() {
  return (
    <div style={{ minHeight: '100vh', background: theme.bg, paddingBottom: 100 }}>
      <Header />

      {/* Hero */}
      <section style={{ borderBottom: `1px solid ${theme.divider}` }}>
        <Container style={{ padding: '52px 20px', textAlign: 'center' }}>
          <h1 style={{ color: theme.textPrimary, fontSize: 32, fontWeight: 700, lineHeight: 1.25 }}>
            Serviços
          </h1>
          <p style={{ color: theme.textSecondary, fontSize: 15, marginTop: 14, lineHeight: 1.6, maxWidth: 540, marginLeft: 'auto', marginRight: 'auto' }}>
            Estrutura completa pra cuidar dos pneus e da manutenção da sua frota, do conserto à recapagem.
          </p>
        </Container>
      </section>

      {/* Cards de serviço */}
      <Container style={{ padding: '32px 20px 8px', maxWidth: 1000 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 16 }}>
          {SERVICOS.map((s) => (
            <div
              key={s.id}
              style={{ background: theme.card, border: `1px solid ${theme.cardBorder}`, borderRadius: 14, padding: '24px 20px', display: 'flex', flexDirection: 'column' }}
            >
              {/* Ícone */}
              <div style={{ width: 52, height: 52, borderRadius: 12, background: 'rgba(228,34,46,0.12)', color: theme.red, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
                  {ICONS[s.id]}
                </svg>
              </div>

              <h2 style={{ color: theme.textPrimary, fontSize: 18, fontWeight: 700, marginTop: 16 }}>
                {s.titulo}
              </h2>
              <p style={{ color: theme.textSecondary, fontSize: 14, lineHeight: 1.6, marginTop: 8, flexGrow: 1 }}>
                {s.texto}
              </p>

              {/* Botão de contato */}
              <a
                href={linkWhats(s.msg)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginTop: 18, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: theme.whatsapp, color: '#0A0A0B', fontSize: 14, fontWeight: 600, padding: '11px 18px', borderRadius: 10, textDecoration: 'none' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A0A0B" aria-hidden="true">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15c-1.53 0-3.03-.41-4.34-1.19l-.31-.18-3.12.82.83-3.04-.2-.32a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.24-8.24s8.24 3.7 8.24 8.24-3.7 8.27-8.28 8.27zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.79.97-.15.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.16 1.75 2.67 4.25 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z"/>
                </svg>
                Entrar em contato
              </a>
            </div>
          ))}
        </div>
      </Container>

      <WhatsAppButton />
    </div>
  )
}
