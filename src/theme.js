// Tokens de cor via CSS variables (definidas em global.css).
// Assim o tema claro/escuro troca tudo de uma vez, sem mexer nos componentes.
// Vermelho e verde do WhatsApp são fixos nos dois temas.
export const theme = {
  bg: 'var(--bg)',
  bgElevated: 'var(--bg-elevated)',
  card: 'var(--card)',
  cardBorder: 'var(--card-border)',
  divider: 'var(--divider)',

  textPrimary: 'var(--text-primary)',
  textSecondary: 'var(--text-secondary)',
  textMuted: 'var(--text-muted)',

  red: '#E4222E',
  redDark: '#B81A24',

  whatsapp: '#25D366',
  whatsappDark: '#128C7E',

  chip: 'var(--chip)',
  chipBorder: 'var(--chip-border)',
  photoBg: 'var(--photo-bg)',
}
