import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { theme } from '../theme'
import Container from '../components/Container'

const inputStyle = {
  width: '100%',
  background: theme.chip,
  border: `1px solid ${theme.chipBorder}`,
  borderRadius: 8,
  padding: '10px 12px',
  color: theme.textPrimary,
  fontSize: 14,
  fontFamily: 'inherit',
  outline: 'none',
}
const labelStyle = { display: 'block', color: theme.textSecondary, fontSize: 13, marginBottom: 6 }
const campo = { marginBottom: 16 }

const MAX_FOTOS = 3

export default function ProdutoForm() {
  const { id } = useParams()
  const editando = Boolean(id)
  const navigate = useNavigate()

  const [categorias, setCategorias] = useState([])
  const [form, setForm] = useState({
    category: '', name: '', brand: '', size: '', aro: '', type: '',
    load_index: '', price: '', description: '', featured: false, active: true,
  })
  const [fotos, setFotos] = useState([])       // URLs já salvas
  const [novasFotos, setNovasFotos] = useState([]) // Files aguardando upload
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')

  const isPneu = form.category === 'Pneus'
  const temAro = isPneu || form.category === 'Roda de alumínio'

  useEffect(() => {
    supabase.from('categories').select('name').order('sort_order').then(({ data }) => {
      if (data) setCategorias(data.map((c) => c.name))
    })
    if (editando) {
      supabase.from('products').select('*').eq('id', id).maybeSingle().then(({ data }) => {
        if (data) {
          setForm({
            category: data.category || '', name: data.name || '', brand: data.brand || '',
            size: data.size || '', aro: data.aro ?? '', type: data.type || '',
            load_index: data.load_index || '', price: data.price ?? '',
            description: data.description || '', featured: data.featured, active: data.active,
          })
          setFotos(data.photos || [])
        }
      })
    }
  }, [id, editando])

  function setCampo(nome, valor) {
    setForm((f) => ({ ...f, [nome]: valor }))
  }

  function escolherFotos(e) {
    const arquivos = [...e.target.files]
    const vagas = MAX_FOTOS - fotos.length - novasFotos.length
    setNovasFotos((atual) => [...atual, ...arquivos.slice(0, vagas)])
    e.target.value = ''
  }

  function removerFoto(url) { setFotos((f) => f.filter((x) => x !== url)) }
  function removerNova(idx) { setNovasFotos((f) => f.filter((_, i) => i !== idx)) }

  async function salvar(e) {
    e.preventDefault()
    setErro('')
    if (!form.category) { setErro('Escolha a categoria.'); return }
    if (!form.name.trim()) { setErro('Preencha o nome do produto.'); return }
    setSalvando(true)

    try {
      // 1. sobe as fotos novas pro Storage
      const urls = [...fotos]
      for (const arquivo of novasFotos) {
        const ext = arquivo.name.split('.').pop().toLowerCase()
        const caminho = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
        const { error: upErr } = await supabase.storage.from('product-photos').upload(caminho, arquivo)
        if (upErr) throw upErr
        const { data } = supabase.storage.from('product-photos').getPublicUrl(caminho)
        urls.push(data.publicUrl)
      }

      // 2. monta o registro
      const registro = {
        category: form.category,
        name: form.name.trim(),
        brand: form.brand.trim() || null,
        size: isPneu ? (form.size.trim() || null) : null,
        aro: temAro && form.aro !== '' ? Number(form.aro) : null,
        type: isPneu ? (form.type.trim() || null) : null,
        load_index: isPneu ? (form.load_index.trim() || null) : null,
        price: form.price !== '' ? Number(String(form.price).replace(',', '.')) : null,
        description: form.description.trim() || null,
        photos: urls,
        featured: form.featured,
        active: form.active,
      }

      // 3. insere ou atualiza
      const { error: dbErr } = editando
        ? await supabase.from('products').update(registro).eq('id', id)
        : await supabase.from('products').insert(registro)
      if (dbErr) throw dbErr

      navigate('/admin')
    } catch (err) {
      console.error(err)
      setErro('Não foi possível salvar. Confira os campos e tente de novo.')
    } finally {
      setSalvando(false)
    }
  }

  const totalFotos = fotos.length + novasFotos.length

  return (
    <div data-theme="dark" style={{ minHeight: '100vh', background: theme.bg, paddingBottom: 60 }}>
      <header style={{ borderBottom: `1px solid ${theme.divider}` }}>
        <Container style={{ display: 'flex', alignItems: 'center', height: 60, gap: 12 }}>
          <Link to="/admin" style={{ color: theme.textSecondary, fontSize: 13, textDecoration: 'none' }}>← Voltar</Link>
          <span style={{ color: theme.textPrimary, fontWeight: 700, fontSize: 15 }}>
            {editando ? 'Editar produto' : 'Novo produto'}
          </span>
        </Container>
      </header>

      <Container max={640} style={{ padding: '24px 20px 0' }}>
        <form onSubmit={salvar}>
          <div style={campo}>
            <label style={labelStyle}>Categoria *</label>
            <select value={form.category} onChange={(e) => setCampo('category', e.target.value)} style={inputStyle}>
              <option value="">Escolha...</option>
              {categorias.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div style={campo}>
            <label style={labelStyle}>Nome do produto *</label>
            <input value={form.name} onChange={(e) => setCampo('name', e.target.value)} style={inputStyle} placeholder={isPneu ? 'Ex: Primacy 4' : 'Ex: Buzina a Ar Tripla Cromada'} />
          </div>

          <div style={campo}>
            <label style={labelStyle}>Marca</label>
            <input value={form.brand} onChange={(e) => setCampo('brand', e.target.value)} style={inputStyle} placeholder="Ex: Michelin" />
          </div>

          {isPneu && (
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ ...campo, flex: 1 }}>
                <label style={labelStyle}>Medida</label>
                <input value={form.size} onChange={(e) => setCampo('size', e.target.value)} style={inputStyle} placeholder="195/65 R15" />
              </div>
              <div style={{ ...campo, width: 90 }}>
                <label style={labelStyle}>Aro</label>
                <input type="number" value={form.aro} onChange={(e) => setCampo('aro', e.target.value)} style={inputStyle} placeholder="15" />
              </div>
            </div>
          )}

          {!isPneu && temAro && (
            <div style={{ ...campo, width: 120 }}>
              <label style={labelStyle}>Aro</label>
              <input type="number" value={form.aro} onChange={(e) => setCampo('aro', e.target.value)} style={inputStyle} placeholder="17" />
            </div>
          )}

          {isPneu && (
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ ...campo, flex: 1 }}>
                <label style={labelStyle}>Tipo</label>
                <input value={form.type} onChange={(e) => setCampo('type', e.target.value)} style={inputStyle} placeholder="Passeio / SUV / Carga" />
              </div>
              <div style={{ ...campo, flex: 1 }}>
                <label style={labelStyle}>Índice (carga/velocidade)</label>
                <input value={form.load_index} onChange={(e) => setCampo('load_index', e.target.value)} style={inputStyle} placeholder="91V" />
              </div>
            </div>
          )}

          <div style={campo}>
            <label style={labelStyle}>Preço (R$) — deixe vazio pra "Sob consulta"</label>
            <input value={form.price} onChange={(e) => setCampo('price', e.target.value)} style={inputStyle} placeholder="489,00" inputMode="decimal" />
          </div>

          <div style={campo}>
            <label style={labelStyle}>Descrição</label>
            <textarea value={form.description} onChange={(e) => setCampo('description', e.target.value)} rows={4} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Detalhes do produto..." />
          </div>

          {/* Fotos */}
          <div style={campo}>
            <label style={labelStyle}>Fotos (até {MAX_FOTOS})</label>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {fotos.map((url) => (
                <div key={url} style={{ position: 'relative' }}>
                  <img src={url} alt="" style={{ width: 76, height: 76, objectFit: 'cover', borderRadius: 10, border: `1px solid ${theme.cardBorder}` }} />
                  <button type="button" onClick={() => removerFoto(url)} aria-label="Remover foto"
                    style={{ position: 'absolute', top: -6, right: -6, width: 22, height: 22, borderRadius: '50%', background: theme.red, color: '#fff', border: 'none', cursor: 'pointer', fontSize: 12, lineHeight: 1 }}>
                    ×
                  </button>
                </div>
              ))}
              {novasFotos.map((f, i) => (
                <div key={i} style={{ position: 'relative' }}>
                  <img src={URL.createObjectURL(f)} alt="" style={{ width: 76, height: 76, objectFit: 'cover', borderRadius: 10, border: `1px dashed ${theme.red}` }} />
                  <button type="button" onClick={() => removerNova(i)} aria-label="Remover foto"
                    style={{ position: 'absolute', top: -6, right: -6, width: 22, height: 22, borderRadius: '50%', background: theme.red, color: '#fff', border: 'none', cursor: 'pointer', fontSize: 12, lineHeight: 1 }}>
                    ×
                  </button>
                </div>
              ))}
              {totalFotos < MAX_FOTOS && (
                <label style={{ width: 76, height: 76, borderRadius: 10, border: `1px dashed ${theme.chipBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.textMuted, fontSize: 24, cursor: 'pointer' }}>
                  +
                  <input type="file" accept="image/*" multiple onChange={escolherFotos} style={{ display: 'none' }} />
                </label>
              )}
            </div>
          </div>

          {/* Flags */}
          <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: theme.textPrimary, fontSize: 14, cursor: 'pointer' }}>
              <input type="checkbox" checked={form.active} onChange={(e) => setCampo('active', e.target.checked)} />
              Ativo no site
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: theme.textPrimary, fontSize: 14, cursor: 'pointer' }}>
              <input type="checkbox" checked={form.featured} onChange={(e) => setCampo('featured', e.target.checked)} />
              Destaque na home
            </label>
          </div>

          {erro && <p style={{ color: theme.red, fontSize: 13, marginBottom: 14 }}>{erro}</p>}

          <button
            type="submit"
            disabled={salvando}
            style={{ width: '100%', background: theme.red, color: '#fff', border: 'none', borderRadius: 9, padding: 13, fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', opacity: salvando ? 0.7 : 1 }}
          >
            {salvando ? 'Salvando...' : editando ? 'Salvar alterações' : 'Cadastrar produto'}
          </button>
        </form>
      </Container>
    </div>
  )
}
