import { theme } from '../theme'

// Mostra a primeira foto do produto. Se não houver foto,
// desenha um pneu (mesmo placeholder do esboço).
// props: photos (array), size (px do diâmetro)
export default function TireImage({ photos = [], size = 90, bg = theme.card }) {
  if (photos && photos.length > 0) {
    return (
      <img
        src={photos[0]}
        alt=""
        style={{ width: size, height: size, objectFit: 'contain' }}
      />
    )
  }

  const border = size * 0.15
  const hubOuter = size * 0.32
  const hubBorder = Math.max(2, size * 0.03)

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: '#0A0A0B',
        border: `${border}px solid #232428`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: hubOuter,
          height: hubOuter,
          borderRadius: '50%',
          background: bg,
          border: `${hubBorder}px solid #3A3B40`,
        }}
      />
    </div>
  )
}
