import Masthead from '../components/Masthead'
import type { Route } from '../App'
import { buildModules, currentRole } from '../data/modules'

const COLORS = ['#F4941C', '#FFD69A', '#63C7EF', '#2C7A4B', '#fff', '#2680B3']
const BITS = Array.from({ length: 36 }, (_, i) => ({
  left: (i * 29 + 7) % 100,
  delay: ((i * 37) % 24) / 10,
  dur: 3.2 + ((i * 13) % 20) / 10,
  size: 8 + ((i * 7) % 8),
  color: COLORS[i % COLORS.length],
  round: i % 3 === 0,
}))

export default function Celebrate({ navigate, module }: { navigate: (r: Route) => void; module: string }) {
  const mods = buildModules(currentRole())
  const m = mods.find(x => x.n === module) ?? mods[0]
  const done = mods.filter(x => x.status === 'Completed').length
  const all = done === mods.length
  const ORDER = ['01', '02', '04', '03', '06', '05', '07', '08', '09', '10']
  const next = ORDER.map(n => mods.find(x => x.n === n)).find(x => x && x.status !== 'Completed')
  const btn = (primary: boolean): React.CSSProperties => ({ background: primary ? '#F4941C' : 'rgba(255,255,255,.12)', color: '#fff', border: primary ? 'none' : '1.5px solid rgba(255,255,255,.55)', borderRadius: 12, padding: '14px 26px', fontFamily: 'inherit', fontWeight: 700, fontSize: 16.5, cursor: 'pointer' })

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #2680B3 0%, #1D6A96 55%, #12476A 100%)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden className="confetti" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {BITS.map((b, i) => <i key={i} style={{ position: 'absolute', top: -20, left: `${b.left}%`, width: b.size, height: b.size * (b.round ? 1 : 1.6), borderRadius: b.round ? '50%' : 2, background: b.color, animation: `confettiFall ${b.dur}s ${b.delay}s ease-in both` }} />)}
      </div>
      <Masthead navigate={navigate} currentPage="home" />
      <main style={{ position: 'relative', maxWidth: 860, margin: '0 auto', padding: '48px 28px 72px', textAlign: 'center' }}>
        <div style={{ width: 112, height: 112, margin: '0 auto 22px', borderRadius: '50%', background: '#2C7A4B', border: '6px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 18px 40px rgba(6,48,79,.35)', animation: 'popIn .6s cubic-bezier(.2,1.4,.4,1) both' }}>
          <svg width="58" height="58" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
        </div>
        <p style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#FFD69A' }}>{all ? 'Learning path complete' : `Module ${m.n} complete`}</p>
        <h1 style={{ margin: '0 0 10px', fontSize: 'clamp(34px, 5vw, 56px)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-.02em' }}>{all ? 'You finished every module.' : 'You finished this one.'}</h1>
        <p style={{ margin: '0 0 6px', fontSize: 'clamp(20px, 2.4vw, 26px)', fontWeight: 600, color: '#fff' }}>{m.title}</p>
        <p style={{ margin: '0 auto 34px', fontSize: 18, lineHeight: 1.5, color: '#E1EEF4', maxWidth: '30em' }}>{all ? 'The baton has crossed the finish line. Take a moment, then close out with the team.' : 'Baton passed. One leg of your path is behind you.'}</p>

        <div role="img" aria-label={`${done} of ${mods.length} modules complete`} style={{ background: 'rgba(255,255,255,.1)', border: '1.5px solid rgba(255,255,255,.28)', borderRadius: 18, padding: '22px 18px 18px', margin: '0 auto 34px', maxWidth: 720 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '10px 0' }}>
            {mods.map((x, i) => {
              const isDone = x.status === 'Completed', isThis = x.n === m.n
              return (
                <div key={x.n} style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ width: 38, height: 38, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13.5, fontWeight: 700, background: isDone ? '#2C7A4B' : 'transparent', color: '#fff', border: `3px solid ${isDone ? (isThis ? '#FFD69A' : '#2C7A4B') : next && next.n === x.n ? '#F4941C' : 'rgba(255,255,255,.4)'}`, boxShadow: isThis ? '0 0 0 5px rgba(255,214,154,.3)' : 'none' }}>{isDone ? '✓' : x.n}</span>
                  {i < mods.length - 1 && <span style={{ width: 14, height: 3, background: isDone ? '#2C7A4B' : 'rgba(255,255,255,.3)' }} />}
                </div>
              )
            })}
          </div>
          <p style={{ margin: '16px 0 0', fontSize: 15.5, color: '#CFE2EE' }}><strong style={{ color: '#fff' }}>{done} of {mods.length}</strong> modules complete</p>
        </div>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          {all
            ? <button onClick={() => navigate({ page: 'closure' })} style={btn(true)}>Close out with the team →</button>
            : next && <button onClick={() => navigate({ page: 'intro', module: next.n })} style={btn(true)}>Next: {next.title} →</button>}
          <button onClick={() => navigate({ page: 'home' })} style={btn(false)}>Back to my path</button>
        </div>
      </main>
    </div>
  )
}
