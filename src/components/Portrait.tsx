import { PORTRAITS } from '../data/portraits'
import sheet from '../imports/Housing_Case_Management_Snapshot.png'

// Boxes cut from the 1536x1024 character library sheet, for people without their own file.
const BOX: Record<string, [number, number, number, number]> = {
  ET: [123, 532, 255, 255],
}

// Square face crops [x, y, side, imageW, imageH] in source pixels, so every head sits fully in frame.
const FACE: Record<string, [number, number, number, number, number]> = {
  GO: [45, 0, 250, 362, 407], EC: [0, 0, 200, 283, 503], SR: [65, 0, 190, 338, 422], TW: [10, 0, 110, 164, 239],
  CB: [21, 0, 170, 272, 556], MV: [11, 0, 90, 145, 212], CM: [0, 0, 200, 218, 492], RD: [20, 0, 210, 338, 418], HS: [0, 5, 215, 287, 502],
}

export default function Portrait({ initials, alt, style }: { initials: string; alt: string; style?: React.CSSProperties }) {
  const own = PORTRAITS[initials]
  const f = FACE[initials]
  if (own && f) {
    const [x, y, side, w, h] = f
    return <div role="img" aria-label={alt} style={{ width: '100%', height: '100%', backgroundImage: `url(${own})`, backgroundRepeat: 'no-repeat', backgroundSize: `${(w / side) * 100}% auto`, backgroundPosition: `${w === side ? 0 : (x / (w - side)) * 100}% ${h === side ? 0 : (y / (h - side)) * 100}%`, ...style }} />
  }
  if (own) return <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}><img src={own} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 18%', ...style }} /></div>
  const b = BOX[initials]
  if (!b) return <span aria-label={alt}>{initials}</span>
  const [x, y, w, h] = b
  return (
    <div role="img" aria-label={alt} style={{ width: '100%', height: '100%', backgroundImage: `url(${sheet})`, backgroundRepeat: 'no-repeat', backgroundSize: `${(1536 / w) * 100}% auto`, backgroundPosition: `${(x / (1536 - w)) * 100}% ${(y / (1024 - h)) * 100}%`, ...style }} />
  )
}
