// Centraliza o conteúdo com largura máxima — resolve o "espremido na esquerda" no desktop.
export default function Container({ children, max = 1120, style }) {
  return (
    <div style={{ width: '100%', maxWidth: max, margin: '0 auto', padding: '0 20px', ...style }}>
      {children}
    </div>
  )
}
