// Barra superior com texto correndo (marquee). Fundo vermelho, texto branco.
// Aparece acima do header, em todas as páginas públicas.
const FRASE = 'Pneus, recapagem e acessórios em São Bento do Sul'

function Sequencia() {
  // repete a frase algumas vezes com separador, pra preencher a linha
  return (
    <span className="marquee-seq" aria-hidden="true">
      {Array.from({ length: 4 }).map((_, i) => (
        <span key={i} className="marquee-item">{FRASE}<span className="marquee-sep">✦</span></span>
      ))}
    </span>
  )
}

export default function TopBar() {
  return (
    <div className="marquee" role="marquee" aria-label={FRASE}>
      <div className="marquee-track">
        <Sequencia />
        <Sequencia />
      </div>
    </div>
  )
}
