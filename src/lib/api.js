import { supabase, supabaseReady } from './supabase'
import { produtosFake, CATEGORIAS } from '../data/produtosFake'

// ============================================================
// Camada de dados do site público.
// - Com Supabase configurado (env vars na Vercel): lê do banco.
// - Sem Supabase: usa os produtos fake (modo demonstração).
// As páginas não precisam saber de onde vêm os dados.
// ============================================================

export const modoDemo = !supabaseReady

// Converte uma linha do banco pro formato usado nas telas
function mapProduct(row) {
  return {
    id: row.id,
    category: row.category,
    name: row.name,
    brand: row.brand,
    size: row.size,
    aro: row.aro,
    type: row.type,
    loadIndex: row.load_index,
    price: row.price != null ? Number(row.price) : null,
    description: row.description,
    photos: row.photos || [],
    featured: row.featured,
    active: row.active,
  }
}

// Todos os produtos ativos (site público)
export async function fetchProducts() {
  if (!supabaseReady) return produtosFake.filter((p) => p.active)
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data.map(mapProduct)
}

// Um produto pelo id (página de detalhes)
export async function fetchProduct(id) {
  if (!supabaseReady) return produtosFake.find((p) => p.id === id) || null
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .maybeSingle()
  if (error) throw error
  return data ? mapProduct(data) : null
}

// Lista de nomes de categorias, na ordem definida
export async function fetchCategories() {
  if (!supabaseReady) return CATEGORIAS
  const { data, error } = await supabase
    .from('categories')
    .select('name, sort_order')
    .order('sort_order', { ascending: true })
  if (error) throw error
  return data.map((c) => c.name)
}
