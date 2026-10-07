import { useState } from 'react'
type IconProps = { x?: number; y?: number; width?: number; height?: number; size?: number; color?: string; strokeWidth?: number }
const mk = (d: string[]) => ({ x, y, width, height, size, color = '#fff', strokeWidth = 2 }: IconProps) => (
  <svg x={x} y={y} width={width ?? size} height={height ?? size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden>{d.map(p => <path key={p} d={p} />)}</svg>
)
const Home = mk(['M3 11l9-8 9 8', 'M5 10v10h14V10', 'M10 20v-6h4v6'])
const HeartHandshake = mk(['M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z'])
const Users = mk(['M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6', 'M16 11a2.5 2.5 0 1 0 0-5', 'M17 14c2.2.4 4 2.7 4 6'])
const Share2 = mk(['M6 12m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0', 'M18 5m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0', 'M18 19m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0', 'M8.2 11l7.6-4.5', 'M8.2 13l7.6 4.5'])
const Sprout = mk(['M12 21v-9', 'M12 12c0-4 3-6 7-6 0 4-3 6-7 6z', 'M12 15c0-3-2-5-6-5 0 3 2 5 6 5z'])
const Check = mk(['M5 12.5l4.5 4.5L19 7.5'])

const ITEMS = [
  { id: 'Stability', tag: 'Housing first', color: '#F4941C', Icon: Home, body: 'Safe and stable housing creates the foundation for health, recovery, connection, and aging in place. We respond to homelessness while also working upstream to prevent housing loss whenever possible.', looks: ['Helping members move from the street to a lease', 'Providing case management and housing navigation', 'Supporting long-term stability and aging in place'] },
  { id: 'Dignity', tag: 'Respect and consistency', color: '#2F9BE0', Icon: HeartHandshake, body: 'Every member is greeted by name, heard fully and treated the same way at every seat. Respect is not a bonus. It is the standard of care.', looks: ['Using the name a member prefers', 'Explaining what happens next in plain words', 'Giving the same standard of care at every door'] },
  { id: 'Access', tag: 'No wrong door', color: '#4E9F3D', Icon: Users, body: 'A member should never be turned away for knocking on the wrong door. Wherever they arrive, someone walks them to the right one.', looks: ['Warm handoffs instead of a phone number', 'Meeting members in the cafe, on the street or at the door', 'Removing barriers like paperwork and travel'] },
  { id: 'Coordination', tag: 'One shared system', color: '#7B66C2', Icon: Share2, body: 'Our seats, programs and partners work from one record and one care plan, so a member never has to tell their story twice.', looks: ['Handing off in writing, with the baton passed well', 'One care plan that leads every step', 'Notes someone who was not there can follow'] },
  { id: 'Whole-Person Care', tag: 'Integrated support', color: '#1B9A98', Icon: Sprout, body: 'Housing matters because so much else depends on it. Food, health, recovery, connection, finances and a voice in decisions matter too.', looks: ['Linking members to health and recovery services', 'Supporting food, income and benefits', 'Asking what the member wants for their own life'] },
]

const CX = 200, CY = 200, R = 190, r = 90
const rad = (d: number) => (d * Math.PI) / 180
const pt = (radius: number, deg: number) => [CX + radius * Math.cos(rad(deg)), CY + radius * Math.sin(rad(deg))]
function sector(a0: number, a1: number) {
  const [x0, y0] = pt(R, a0), [x1, y1] = pt(R, a1), [x2, y2] = pt(r, a1), [x3, y3] = pt(r, a0)
  return `M${x0} ${y0} A${R} ${R} 0 0 1 ${x1} ${y1} L${x2} ${y2} A${r} ${r} 0 0 0 ${x3} ${y3} Z`
}

export default function DignityWheel({ onNext }: { onNext?: () => void }) {
  const [sel, setSel] = useState(0)
  const cur = ITEMS[sel]
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 330px), 1fr))', gap: '1.6em', alignItems: 'center' }}>
      <div>
        <svg viewBox="0 0 400 400" role="group" aria-label="The Aging With Dignity framework wheel" style={{ width: '100%', maxWidth: 440, height: 'auto', display: 'block', margin: '0 auto', overflow: 'visible' }}>
          {ITEMS.map((it, i) => {
            const mid = -90 + 72 * i, on = i === sel
            const [dx, dy] = [Math.cos(rad(mid)) * 9, Math.sin(rad(mid)) * 9]
            const [tx, ty] = pt(142, mid)
            const words = it.id.split(/(?<=-)|\s/).length > 1 && it.id === 'Whole-Person Care' ? ['Whole-Person', 'Care'] : [it.id]
            const parts = it.tag.split(' '), cut = Math.ceil(parts.length / 2)
            const tagLines = it.tag.length > 13 ? [parts.slice(0, cut).join(' '), parts.slice(cut).join(' ')] : [it.tag]
            return (
              <g key={it.id} role="button" tabIndex={0} aria-pressed={on} aria-label={`${it.id}: ${it.tag}`} onClick={() => setSel(i)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSel(i) } }} style={{ cursor: 'pointer', outline: 'none', transform: on ? `translate(${dx}px, ${dy}px)` : 'none', transition: 'transform .25s ease' }}>
                <path d={sector(mid - 35, mid + 35)} fill={it.color} stroke="#fff" strokeWidth={on ? 5 : 3} opacity={on ? 1 : .86} style={{ filter: on ? 'drop-shadow(0 6px 10px rgba(20,50,80,.35))' : 'none', transition: 'opacity .2s' }} />
                <it.Icon x={tx - 14} y={ty - 42} width={28} height={28} color="#fff" strokeWidth={2} />
                <text x={tx} y={ty + 2} textAnchor="middle" fontSize={words.length > 1 ? 12 : 15} fontWeight={700} fill="#fff">
                  {words.map((w, k) => <tspan key={w} x={tx} dy={k === 0 ? 0 : 15}>{w}</tspan>)}
                </text>
                <text x={tx} y={ty + 2 + (words.length - 1) * 15 + 15} textAnchor="middle" fontSize={11} fill="#fff" opacity={.95}>
                  {tagLines.map((w, k) => <tspan key={w} x={tx} dy={k === 0 ? 0 : 13}>{w}</tspan>)}
                </text>
              </g>
            )
          })}
          <circle cx={CX} cy={CY} r={r - 4} fill="#fff" />
          <text x={CX} y={CY - 2} textAnchor="middle" fontSize={22} fontWeight={700} fill="#12476A">Aging</text>
          <text x={CX} y={CY + 22} textAnchor="middle" fontSize={22} fontWeight={700} fill="#12476A">With Dignity</text>
          <line x1={CX - 30} y1={CY + 34} x2={CX + 30} y2={CY + 34} stroke="#F4941C" strokeWidth={3} strokeLinecap="round" />
        </svg>
        <p style={{ margin: '.8em 0 0', textAlign: 'center', fontStyle: 'italic', color: '#5A6873', fontSize: '.95em' }}>Tap a section to learn more.</p>
      </div>

      <div aria-live="polite" style={{ background: '#fff', borderRadius: 18, padding: '1.4em 1.5em', border: '1px solid #DCE7EE', borderTop: `6px solid ${cur.color}`, boxShadow: '0 8px 24px rgba(29,106,150,.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.8em', marginBottom: '.8em' }}>
          <span style={{ width: 52, height: 52, borderRadius: '50%', background: cur.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}><cur.Icon size={26} color="#fff" /></span>
          <div>
            <div style={{ fontSize: '1.5em', fontWeight: 700, color: '#12476A', lineHeight: 1.15 }}>{cur.id}</div>
            <div style={{ fontSize: '.78em', fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#5A6873' }}>{cur.tag}</div>
          </div>
        </div>
        <p style={{ margin: '0 0 .9em', lineHeight: 1.55 }}>{cur.body}</p>
        <div style={{ fontSize: '.76em', fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#12476A', margin: '0 0 .5em' }}>What this looks like</div>
        <ul style={{ margin: '0 0 1em', padding: 0, listStyle: 'none', display: 'grid', gap: '.4em' }}>
          {cur.looks.map(l => <li key={l} style={{ display: 'flex', gap: '.6em', alignItems: 'flex-start', fontSize: '.95em' }}><span style={{ flex: '0 0 auto', width: 20, height: 20, borderRadius: '50%', background: '#F4941C', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}><Check size={13} color="#fff" strokeWidth={3} /></span>{l}</li>)}
        </ul>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5em' }}>
          {ITEMS.map((it, i) => (
            <button key={it.id} onClick={() => setSel(i)} aria-pressed={i === sel} style={{ padding: '.5em 1em', borderRadius: 999, border: `1.5px solid ${i === sel ? it.color : '#C9D6DF'}`, background: i === sel ? it.color : '#fff', color: i === sel ? '#fff' : '#12476A', fontFamily: 'inherit', fontWeight: 600, fontSize: '.88em', cursor: 'pointer' }}>{it.id}</button>
          ))}
        </div>
        {onNext && <button onClick={onNext} style={{ marginTop: '1.1em', width: '100%', padding: '.85em 1em', border: 'none', borderRadius: 999, background: '#F4941C', color: '#fff', fontFamily: 'inherit', fontWeight: 700, fontSize: '1em', cursor: 'pointer' }}>Continue to the Member Journey →</button>}
      </div>
    </div>
  )
}
