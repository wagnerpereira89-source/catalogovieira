// Persistência do tema claro/escuro.
const KEY = 'vieira-theme'

export function getTheme() {
  try { return localStorage.getItem(KEY) || 'dark' } catch { return 'dark' }
}
export function applyTheme(t) {
  document.documentElement.dataset.theme = t
}
export function setTheme(t) {
  try { localStorage.setItem(KEY, t) } catch { /* ignore */ }
  applyTheme(t)
}
export function initTheme() {
  applyTheme(getTheme())
}
