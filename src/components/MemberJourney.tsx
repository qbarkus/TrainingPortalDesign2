import { useState } from 'react'
import type { Route } from '../App'
import { CONTENT, ORDER, ROLES, ROLE_NAMES, GUIDE, SCENE, ACTS, type StepId } from '../data/courseContent'
import Portrait from './Portrait'

const ACT_COLORS = ['#1D6A96', '#2C7A4B', '#C06A00']
const actOf = (id: StepId) => ACTS.findIndex(a => a.steps.includes(id))

type Stage = { n: string; title: string; step?: StepId; act: number; plan?: string; owners?: string[]; guide?: { name: string; initials: string; color: string; line: string } }
const STAGES: Stage[] = [
  { n: 'OUT', title: 'Outreach', act: 0, owners: ['SOC', 'OLS'], plan: 'We meet her where she is, in the cafe, on the street or at the door, and build trust before any paperwork.', guide: { name: 'Curtis Boyd', initials: 'CB', color: '#1D6A96', line: 'I do not start with forms. I start with her name and a reason to come back tomorrow.' } },
  ...ORDER.map(id => ({ n: id, title: String((CONTENT as any)[id].title).replace(/^CE Step \d+\s*·\s*/, ''), step: id, act: actOf(id) })),
  { n: 'TSS', title: 'Home, and kept', act: 2 },
]

const L = 300, R = 120, CX = 570, LX = 270, TOP = 60, BOT = 300, MID = 180
const P = 2 * L + 2 * Math.PI * R
function at(t: number) {
  const s = ((t % 1) + 1) % 1 * P
  if (s < L) return { x: LX + s, y: BOT }
  if (s < L + Math.PI * R) { const f = (s - L) / R; return { x: CX + R * Math.sin(f), y: MID + R * Math.cos(f) } }
  if (s < 2 * L + Math.PI * R) return { x: CX - (s - L - Math.PI * R), y: TOP }
  const f = (s - 2 * L - Math.PI * R) / R
  return { x: LX - R * Math.sin(f), y: MID - R * Math.cos(f) }
}
const N = STAGES.length
const pos = (i: number) => at((i + 0.5) / N)
const handoffs = STAGES.slice(0, -1).map((_, i) => i)

const lastOfAct = (a: number) => STAGES.reduce((m, s, k) => (s.act === a ? k : m), 0)

export default function MemberJourney({ navigate, actsDone = [] }: { navigate?: (r: Route) => void; actsDone?: boolean[] }) {
  let c = 0
  while (c < 3 && actsDone[c]) c++
  const allDone = c === 3
  const place = allDone ? N - 1 : c === 0 ? 0 : lastOfAct(c - 1) + 1
  const [i, setI] = useState(place)
  const mine = (() => { try { return localStorage.getItem('smc-my-role') || '' } catch { return '' } })()
  const cur = STAGES[i], color = ACT_COLORS[cur.act]
  const sid = cur.step
  const owners = cur.owners ?? (sid ? Object.keys(ROLES).filter(r => ROLES[r][sid]) : ['TSSC'])
  const me = pos(i)
  const guide = cur.guide ?? GUIDE[sid ?? 'S7']
  const next = STAGES[i + 1]
  const btn = (disabled: boolean, primary: boolean): React.CSSProperties => ({ background: primary ? '#F4941C' : '#E7F3FB', color: primary ? '#fff' : '#1D6A96', border: 'none', borderRadius: 10, padding: '10px 18px', fontFamily: 'inherit', fontWeight: 700, fontSize: 15, cursor: disabled ? 'default' : 'pointer', opacity: disabled ? .4 : 1 })

  return (
    <div>
      <p style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 600, color: c > 0 ? '#1E6B43' : '#3C4A55' }}>
        {allDone ? 'All three acts complete. The baton is home.' : c === 0 ? 'Your baton starts at Outreach. Finish Act One to move it forward.' : `${ACTS[c - 1].label} complete. Your baton moved on to ${STAGES[place].step ? `CE step ${STAGES[place].step!.slice(1)}, ${STAGES[place].title}` : STAGES[place].title}.`}
      </p>
      <svg viewBox="0 0 840 384" role="img" aria-label="Relay track showing the housing journey" style={{ width: '100%', height: 'auto', display: 'block' }}>
        <rect x={126} y={36} width={588} height={288} rx={144} fill="#F2B98A" />
        <rect x={174} y={84} width={492} height={192} rx={96} fill="#D5EBD9" />
        <rect x={150} y={60} width={540} height={240} rx={120} fill="none" stroke="#fff" strokeWidth={2} strokeDasharray="2 0" opacity={.9} />
        <rect x={126} y={36} width={588} height={288} rx={144} fill="none" stroke="#fff" strokeWidth={3} />
        <rect x={174} y={84} width={492} height={192} rx={96} fill="none" stroke="#fff" strokeWidth={3} />
        <text x={420} y={172} textAnchor="middle" fontSize={26} fontWeight={700} fill="#1D6A96">The Coordinated Entry workflow</text>
        <text x={420} y={202} textAnchor="middle" fontSize={16} fill="#3C4A55">It starts with outreach</text>

        {(() => { const a = at(0), start = { x1: a.x, y1: BOT - 48, x2: a.x, y2: BOT + 48 }; return <line {...start} stroke="#22333F" strokeWidth={4} strokeDasharray="6 5" /> })()}
        <text x={LX} y={BOT + 66} textAnchor="middle" fontSize={13} fontWeight={700} fill="#22333F">START</text>

        {handoffs.map(h => {
          const p = at((h + 1) / N), q = at((h + 1) / N + 0.001)
          const dx = q.x - p.x, dy = q.y - p.y, d = Math.hypot(dx, dy), nx = -dy / d, ny = dx / d
          return <g key={h}><line x1={p.x - nx * 40} y1={p.y - ny * 40} x2={p.x + nx * 40} y2={p.y + ny * 40} stroke="#F4941C" strokeWidth={7} strokeLinecap="round" /><line x1={p.x - nx * 40} y1={p.y - ny * 40} x2={p.x + nx * 40} y2={p.y + ny * 40} stroke="#fff" strokeWidth={2} strokeDasharray="3 6" /></g>
        })}

        {STAGES.map((s, k) => {
          const p = pos(k), done = k < place || allDone, c = ACT_COLORS[s.act]
          return (
            <g key={s.n} role="button" tabIndex={0} aria-label={`Stage ${k + 1}: ${s.title}`} onClick={() => setI(k)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setI(k) } }} style={{ cursor: 'pointer', outline: 'none' }}>
              {k === place && <circle cx={p.x} cy={p.y} r={25} fill="none" stroke="#F4941C" strokeWidth={4} />}
              <circle cx={p.x} cy={p.y} r={17} fill={done ? c : '#fff'} stroke={c} strokeWidth={3} />
              <text x={p.x} y={p.y + 5} textAnchor="middle" fontSize={14} fontWeight={700} fill={done ? '#fff' : c}>{k === N - 1 ? '★' : k === 0 ? '→' : k}</text>
            </g>
          )
        })}

        <g style={{ transform: `translate(${me.x}px, ${me.y - 34}px)`, transition: 'transform .7s cubic-bezier(.4,.1,.2,1)', pointerEvents: 'none' }}>
          <path d="M0 26 L-9 8 A16 16 0 1 1 9 8 Z" fill={color} stroke="#fff" strokeWidth={2.5} />
          <circle cx={0} cy={-2} r={8} fill="#fff" />
          <rect x={10} y={-14} width={22} height={6} rx={3} fill="#F4941C" stroke="#fff" strokeWidth={1.5} transform="rotate(-25 10 -11)" />
        </g>
      </svg>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 18px', margin: '10px 0 18px', fontSize: 14, color: '#3C4A55' }}>
        {ACTS.map((a, k) => <span key={a.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}><i style={{ width: 12, height: 12, borderRadius: '50%', background: ACT_COLORS[k] }} />{a.label}: steps {a.steps.map(x => x.slice(1)).join(', ')}</span>)}
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}><i style={{ width: 18, height: 6, borderRadius: 3, background: '#F4941C' }} />Baton pass</span>
      </div>

      <div style={{ background: '#fff', border: '1px solid #C9D6DF', borderLeft: `6px solid ${color}`, borderRadius: 16, padding: '20px 24px', boxShadow: '0 6px 18px rgba(29,106,150,.08)' }}>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color }}>Where she is now · {sid ? `CE step ${sid.slice(1)} of 7` : cur.n === 'OUT' ? 'The start of the journey' : 'after the lease'}</div>
        <h3 style={{ margin: '4px 0 6px', fontSize: 24, fontWeight: 700, color: '#1D6A96', lineHeight: 1.2 }}>{cur.title}</h3>
        <p style={{ margin: '0 0 12px', fontSize: 16.5, color: '#22333F' }}>{cur.plan ?? (sid ? SCENE[sid].plan : 'Hector Salas and Tenancy Sustaining Services help her keep her home. The baton from the lease signature is in his hands.')}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '0 0 12px' }}>
          <div style={{ width: 46, height: 46, borderRadius: '50%', overflow: 'hidden', flex: '0 0 auto', background: guide.color }}><Portrait initials={guide.initials} alt={guide.name} /></div>
          <p style={{ margin: 0, fontSize: 15, fontStyle: 'italic', color: '#3C4A55' }}>“{guide.line}” <span style={{ fontStyle: 'normal', color: '#6C7A85' }}>{guide.name}</span></p>
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#F4941C', marginBottom: 6 }}>Seats that run this step</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {owners.map(r => <span key={r} style={{ padding: '4px 12px', borderRadius: 999, fontSize: 13.5, fontWeight: 600, background: r === mine ? '#F4941C' : '#E7F3FB', color: r === mine ? '#fff' : '#1D6A96' }}>{ROLE_NAMES[r]}{r === mine ? ' · you' : ''}</span>)}
        </div>
        {next && <p style={{ margin: '12px 0 0', fontSize: 15.5, color: '#8A4E08', fontWeight: 600 }}>Baton pass: hand off in writing to {next.step ? `CE step ${next.step.slice(1)}, ${next.title}` : 'Tenancy Sustaining Services'}, and keep helping until they have picked up.</p>}
        <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
          <button disabled={i === 0} onClick={() => setI(i - 1)} style={btn(i === 0, false)}>← Back</button>
          <button disabled={i === N - 1} onClick={() => setI(i + 1)} style={btn(i === N - 1, true)}>Run to the next step →</button>
          {navigate && sid && <button onClick={() => navigate({ page: 'academy', act: cur.act + 1 })} style={btn(false, false)}>Open this step in the Academy</button>}
        </div>
      </div>
    </div>
  )
}
