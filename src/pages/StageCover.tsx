import Masthead from '../components/Masthead'
import type { Route } from '../App'
import { buildStages, stageStatus, currentRole } from '../data/modules'

export default function StageCover({ navigate, n }: { navigate: (r: Route) => void; n: string }) {
  const stages = buildStages(currentRole())
  const st = stages.find(s => s.n === n) ?? stages[0]
  const status = stageStatus(st)
  const target = st.items.find(i => i.status !== 'Completed') ?? st.items[0]
  const open = (i: typeof target): Route => i.n === 'KYP' ? i.go : { page: 'intro', module: i.n }
  const btn = (primary: boolean): React.CSSProperties => ({ background: primary ? '#F4941C' : 'rgba(255,255,255,.12)', color: '#fff', border: primary ? 'none' : '1.5px solid rgba(255,255,255,.55)', borderRadius: 12, padding: '14px 26px', fontFamily: 'inherit', fontWeight: 700, fontSize: 16.5, cursor: 'pointer' })

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #2680B3 0%, #1D6A96 55%, #12476A 100%)', color: '#fff' }}>
      <Masthead navigate={navigate} currentPage="home" />
      <main style={{ maxWidth: 820, margin: '0 auto', padding: '64px 28px 90px', textAlign: 'center' }}>
        <p style={{ margin: '0 0 10px', fontSize: 13, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#FFD69A' }}>{st.phase} · Step {st.n} of {stages.length}</p>
        <div aria-hidden style={{ fontSize: 'clamp(110px, 20vw, 200px)', fontWeight: 700, lineHeight: 1, color: 'rgba(255,255,255,.16)', letterSpacing: '-.04em' }}>{st.n}</div>
        <h1 style={{ margin: '-14px 0 14px', fontSize: 'clamp(34px, 5.4vw, 60px)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-.02em' }}>{st.title}</h1>
        <p style={{ margin: '0 auto 30px', fontSize: 20, lineHeight: 1.5, color: '#E1EEF4', maxWidth: '28em' }}>{st.line}</p>

        {st.items.length > 1 && (
          <div style={{ display: 'grid', gap: 8, maxWidth: 520, margin: '0 auto 34px', textAlign: 'left' }}>
            {st.items.map(i => (
              <button key={i.n} onClick={() => navigate(open(i))} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 12, background: 'rgba(255,255,255,.1)', border: '1.5px solid rgba(255,255,255,.25)', color: '#fff', fontFamily: 'inherit', fontSize: 16.5, cursor: 'pointer', textAlign: 'left' }}>
                <span style={{ flex: '0 0 auto', width: 26, height: 26, borderRadius: '50%', background: i.status === 'Completed' ? '#2C7A4B' : 'transparent', border: '2px solid rgba(255,255,255,.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{i.status === 'Completed' ? '✓' : ''}</span>
                <span style={{ flex: 1 }}>{i.title}</span>
              </button>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate(st.items.length === 1 ? target.go : open(target))} style={btn(true)}>{status === 'Not started' ? 'Begin' : status === 'Completed' ? 'Review' : 'Continue'} →</button>
          <button onClick={() => navigate({ page: 'home' })} style={btn(false)}>Back to my path</button>
        </div>
        <p style={{ margin: '30px 0 0', fontSize: 14, color: '#B9D3E3' }}>{status}</p>
      </main>
    </div>
  )
}
