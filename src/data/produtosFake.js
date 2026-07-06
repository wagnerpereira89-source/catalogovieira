// Produtos FAKE só pra testar navegação e visual.
// Mesma estrutura que a tabela `products` do Supabase vai devolver depois.
//
// category: a categoria da loja (Pneus, Buzinas, Geladeiras, etc.)
// Campos size/aro/loadIndex/type só fazem sentido pra Pneus — nas outras vêm null.
// price: número => mostra valor | null => "Sob consulta"
// photos: array de URLs (vazio => usa placeholder)

// Ordem de exibição das categorias na home e nos filtros
export const CATEGORIAS = [
  'Pneus',
  'Roda de alumínio',
  'Lanterna',
  'Ar-condicionado',
  'Cinemáticos',
  'Badanas',
  'Buzinas',
  'Ponteira de escape',
  'Geladeiras',
]

export const produtosFake = [
  // ---- PNEUS ----
  { id: '1', category: 'Pneus', name: 'Primacy 4', brand: 'Michelin', size: '195/65 R15', aro: 15, type: 'Passeio', loadIndex: '91V', price: 489, description: 'Pneu de passeio com ótima aderência no molhado e baixa emissão de ruído.', photos: [], featured: true, active: true },
  { id: '2', category: 'Pneus', name: 'Cinturato P7', brand: 'Pirelli', size: '205/55 R16', aro: 16, type: 'Passeio', loadIndex: '91V', price: null, description: 'Foco em economia de combustível e conforto de rodagem.', photos: [], featured: true, active: true },
  { id: '3', category: 'Pneus', name: 'EfficientGrip Performance', brand: 'Goodyear', size: '185/60 R15', aro: 15, type: 'Passeio', loadIndex: '88H', price: 412, description: 'Frenagem reduzida no molhado e baixa resistência ao rolamento.', photos: [], featured: false, active: true },
  { id: '4', category: 'Pneus', name: 'Scorpion ATR', brand: 'Pirelli', size: '265/65 R17', aro: 17, type: 'SUV', loadIndex: '112T', price: 899, description: 'Pneu misto para SUV e picape, bom on-road e off-road leve.', photos: [], featured: false, active: true },
  { id: '5', category: 'Pneus', name: 'Pilot Sport 4', brand: 'Michelin', size: '225/45 R17', aro: 17, type: 'Performance', loadIndex: '94Y', price: 785, description: 'Alta performance esportiva, aderência máxima em curvas e frenagem.', photos: [], featured: true, active: true },

  // ---- RODA DE ALUMÍNIO ----
  { id: '6', category: 'Roda de alumínio', name: 'Roda Esportiva Aro 17', brand: 'KR Wheels', size: null, aro: 17, type: null, loadIndex: null, price: 690, description: 'Roda de alumínio aro 17, acabamento diamantado. Preço por unidade.', photos: [], featured: true, active: true },
  { id: '7', category: 'Roda de alumínio', name: 'Roda Off-Road Aro 15', brand: 'Scorro', size: null, aro: 15, type: null, loadIndex: null, price: null, description: 'Roda de alumínio reforçada para picapes e SUVs.', photos: [], featured: false, active: true },

  // ---- LANTERNA ----
  { id: '8', category: 'Lanterna', name: 'Lanterna Traseira LED', brand: 'Universal', size: null, aro: null, type: null, loadIndex: null, price: 145, description: 'Lanterna traseira em LED, alto brilho, para caminhão/carreta.', photos: [], featured: false, active: true },
  { id: '9', category: 'Lanterna', name: 'Farol Auxiliar Milha', brand: 'Universal', size: null, aro: null, type: null, loadIndex: null, price: 98, description: 'Par de faróis auxiliares de milha, resistentes à água.', photos: [], featured: false, active: true },

  // ---- AR-CONDICIONADO ----
  { id: '10', category: 'Ar-condicionado', name: 'Compressor de Ar Automotivo', brand: 'Universal', size: null, aro: null, type: null, loadIndex: null, price: null, description: 'Compressor para sistema de ar-condicionado automotivo.', photos: [], featured: false, active: true },

  // ---- CINEMÁTICOS ----
  { id: '11', category: 'Cinemáticos', name: 'Cinemático (a confirmar)', brand: 'Universal', size: null, aro: null, type: null, loadIndex: null, price: null, description: 'Descrição a definir com o cliente.', photos: [], featured: false, active: true },

  // ---- BADANAS ----
  { id: '12', category: 'Badanas', name: 'Badana / Apara-barro', brand: 'Universal', size: null, aro: null, type: null, loadIndex: null, price: 75, description: 'Badana de borracha para caminhão, alta durabilidade. Par.', photos: [], featured: false, active: true },

  // ---- BUZINAS ----
  { id: '13', category: 'Buzinas', name: 'Buzina a Ar Tripla Cromada', brand: 'Universal', size: null, aro: null, type: null, loadIndex: null, price: 320, description: 'Kit buzina a ar com três cornetas cromadas e compressor.', photos: [], featured: true, active: true },
  { id: '14', category: 'Buzinas', name: 'Buzina Eletromagnética', brand: 'Universal', size: null, aro: null, type: null, loadIndex: null, price: 60, description: 'Par de buzinas caracol, som grave e agudo.', photos: [], featured: false, active: true },

  // ---- PONTEIRA DE ESCAPE ----
  { id: '15', category: 'Ponteira de escape', name: 'Ponteira Cromada Ø63mm', brand: 'Universal', size: null, aro: null, type: null, loadIndex: null, price: 130, description: 'Ponteira de escape em inox cromado, ponta dupla.', photos: [], featured: false, active: true },

  // ---- GELADEIRAS ----
  { id: '16', category: 'Geladeiras', name: 'Geladeira Automotiva 12V', brand: 'Universal', size: null, aro: null, type: null, loadIndex: null, price: null, description: 'Geladeira/cooler automotivo 12V para caminhão, ideal para viagem.', photos: [], featured: true, active: true },
]

// ---- Helpers de filtro (montados a partir dos próprios produtos) ----
export function getCategorias(lista) {
  const usadas = new Set(lista.map((p) => p.category))
  return CATEGORIAS.filter((c) => usadas.has(c))
}
export function getMarcas(lista) {
  return [...new Set(lista.map((p) => p.brand).filter(Boolean))].sort()
}
export function getAros(lista) {
  return [...new Set(lista.map((p) => p.aro).filter((a) => a != null))].sort((a, b) => a - b)
}

// Conta quantos produtos ativos existem por categoria (pra home)
export function contarPorCategoria(lista) {
  const mapa = {}
  for (const p of lista) mapa[p.category] = (mapa[p.category] || 0) + 1
  return mapa
}
