// Ícones SVG desenhados sob medida, um por categoria — mesmo traço (stroke 1.8, cantos arredondados).
// Uso: <CategoryIcon name="Pneus" size={22} />
// A cor vem de currentColor, então o pai controla via style={{ color }}.

const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }

const icons = {
  // Pneu: anel duplo com sulcos na banda
  'Pneus': (
    <g {...S}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8" />
    </g>
  ),
  // Roda de alumínio: aro com raios
  'Roda de alumínio': (
    <g {...S}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2.2" />
      <path d="M12 9.8V3.2M14 13.2l5.6 3.4M10 13.2l-5.6 3.4M13.9 10.6l5.7-3.2M10.1 10.6L4.4 7.4" />
    </g>
  ),
  // Lanterna: farol com feixes de luz
  'Lanterna': (
    <g {...S}>
      <path d="M9 6.5c3.6 0 6.5 2.5 6.5 5.5S12.6 17.5 9 17.5C6 17.5 3.5 15 3.5 12S6 6.5 9 6.5z" />
      <path d="M18.5 8.5H21M18.5 12H21.5M18.5 15.5H21" />
      <path d="M9 9c-1.4.5-2.3 1.6-2.3 3S7.6 14.5 9 15" />
    </g>
  ),
  // Ar-condicionado: floco de neve
  'Ar-condicionado': (
    <g {...S}>
      <path d="M12 3v18M12 3l-2.2 2.2M12 3l2.2 2.2M12 21l-2.2-2.2M12 21l2.2-2.2" />
      <path d="M4.2 7.5l15.6 9M4.2 7.5L7.2 7M4.2 7.5l.5 3M19.8 16.5l-3 .5M19.8 16.5l-.5-3" />
      <path d="M4.2 16.5l15.6-9M4.2 16.5l.5-3M4.2 16.5l3 .5M19.8 7.5l-.5 3M19.8 7.5l-3-.5" />
    </g>
  ),
  // Cinemáticos: peça/junta articulada (genérico até confirmar o que é)
  'Cinemáticos': (
    <g {...S}>
      <circle cx="6.5" cy="12" r="3" />
      <circle cx="17.5" cy="7" r="2.5" />
      <circle cx="17.5" cy="17" r="2.5" />
      <path d="M9.2 10.6l5.8-2.6M9.2 13.4l5.8 2.6" />
    </g>
  ),
  // Badana: apara-barro pendurado com respingos
  'Badanas': (
    <g {...S}>
      <path d="M7 3.5h10M8 3.5v13a1.5 1.5 0 0 0 1.5 1.5h5A1.5 1.5 0 0 0 16 16.5v-13" />
      <path d="M10.5 7.5h3M10.5 11h3" />
      <path d="M6.5 20.5h.01M12 21.5h.01M17.5 20.5h.01" />
    </g>
  ),
  // Buzina: corneta com ondas de som
  'Buzinas': (
    <g {...S}>
      <path d="M3.5 10v4h3l5 4V6l-5 4h-3z" />
      <path d="M15.5 9.5a3.5 3.5 0 0 1 0 5M18.5 7.5a7 7 0 0 1 0 9" />
    </g>
  ),
  // Ponteira de escape: tubo com fumaça
  'Ponteira de escape': (
    <g {...S}>
      <path d="M3 14.5h11l3-2v6l-3-2H3z" />
      <ellipse cx="17.6" cy="15.5" rx="1" ry="2.6" />
      <path d="M17 8.5c1.2-1 3-1 4 0M18.5 5.5c.8-.7 2-.7 2.8 0" />
    </g>
  ),
  // Geladeira: gabinete com duas portas e puxadores
  'Geladeiras': (
    <g {...S}>
      <rect x="6.5" y="3" width="11" height="18" rx="1.5" />
      <path d="M6.5 10h11M9 6.2v1.6M9 12.5v2.5" />
    </g>
  ),
}

// fallback: caixa genérica
const fallback = (
  <g {...S}>
    <rect x="4" y="6" width="16" height="13" rx="2" />
    <path d="M4 10h16M9 6V4.5h6V6" />
  </g>
)

export default function CategoryIcon({ name, size = 22, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={style} aria-hidden="true">
      {icons[name] || fallback}
    </svg>
  )
}

export function SearchIcon({ size = 16, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={style} aria-hidden="true">
      <g {...S}>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="M15.5 15.5L20.5 20.5" />
      </g>
    </svg>
  )
}
