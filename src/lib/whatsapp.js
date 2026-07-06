// ============================================================
// NÚMERO DO WHATSAPP DO VIEIRA — TROCAR AQUI (só neste lugar).
// Formato: 55 (país) + DDD + número, apenas dígitos, sem espaços.
// Exemplo: 47 99123-4567  ->  '5547991234567'
// ============================================================
export const WHATSAPP_NUMBER = '5547999999999' // <-- PLACEHOLDER, trocar depois

// Texto de quantidade pro fim da mensagem
function qtyLabel(qty) {
  if (qty === 4) return ' (jogo de 4)'
  if (qty === 2) return ' (par)'
  return ''
}

// Link com a mensagem de um produto específico
// buildProductLink({ name, brand, size, qty })
export function buildProductLink({ name, brand, size, qty = 1 }) {
  const produto = [brand, name].filter(Boolean).join(' ')
  const medida = size ? ` — ${size}` : ''
  const msg = `Olá! Tenho interesse no pneu ${produto}${medida}${qtyLabel(qty)}. Poderia me passar um orçamento?`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
}

// Link genérico do botão flutuante (sem produto)
export function buildGeneralLink() {
  const msg = 'Olá! Vim pelo site da Vieira Pneus e gostaria de um orçamento.'
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
}
