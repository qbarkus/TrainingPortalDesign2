import type { Route } from '../App'
import Masthead from '../components/Masthead'
import teamCover from '../imports/team-cover.png'

export default function Closure({ navigate }: { navigate: (r: Route) => void }) {
  let name = ''
  try { name = JSON.parse(localStorage.getItem('smc-training-progress') || '{}').n || '' } catch {}
  const btn = (primary: boolean): React.CSSProperties => ({ background: primary ? '#F4941C' : 'rgba(255,255,255,.12)', color: '#fff', border: primary ? 'none' : '1.5px solid rgba(255,255,255,.55)', borderRadius: 12, padding: '14px 26px', fontFamily: 'inherit', fontWeight: 700, fontSize: 16.5, cursor: 'pointer' })
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #2680B3 0%, #1D6A96 55%, #17587E 100%)', color: '#fff' }}>
      <Masthead navigate={navigate} currentPage="home" />
      <main style={{ maxWidth: 1240, margin: '0 auto', padding: '44px 40px 64px' }}>
        <p style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#FFD69A' }}>Closing</p>
        <h1 style={{ margin: '0 0 14px', fontSize: 'clamp(34px, 5vw, 58px)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-.02em', maxWidth: '16em' }}>{name ? `Thank you, ${name}. You carry the baton now.` : 'Thank you. You carry the baton now.'}</h1>
        <p style={{ margin: '0 0 28px', fontSize: 'clamp(18px, 2vw, 22px)', lineHeight: 1.5, color: '#E1EEF4', maxWidth: '36em' }}>You know the agency, your seat and the steps around it. Every member, every interaction, one standard of care.</p>
        <img src={teamCover} alt="The Senior Housing Services team holding a baton marked One Team." style={{ display: 'block', width: '100%', height: 'auto', borderRadius: 14, boxShadow: '0 28px 60px rgba(8,40,64,.35)' }} />
        <div style={{ marginTop: 32, display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={() => navigate({ page: 'home' })} style={btn(true)}>Back to training home</button>
          <button onClick={() => navigate({ page: 'role' })} style={btn(false)}>My role</button>
          <span style={{ fontSize: 14.5, color: '#CFE2EE' }}>A Community of Hope, Healing &amp; Justice</span>
        </div>
      </main>
    </div>
  )
}
