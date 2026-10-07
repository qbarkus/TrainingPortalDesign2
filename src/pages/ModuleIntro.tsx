import Masthead from '../components/Masthead'
import type { Route } from '../App'
import { buildModules, currentRole } from '../data/modules'
import { ROLE_PATHS } from '../data/rolePaths'

const EXPECT: Record<string, string> = {
  '01': 'A few short screens on who we are and why we do this work. One quick check, not scored.',
  '02': 'Seven short screens on the Aging With Dignity framework. Tap the wheel, answer quick checks as you go.',
  '03': 'Short screens on our department and how each seat connects. Ends with a 20-question skills assessment.',
  '04': 'Walk the member journey from first contact to a home that is kept.',
  '05': 'Learn what Coordinated Entry is and where our staff fit in the relay.',
  '06': 'See your seat on the team, what you own, and where you pass the baton.',
  '07': "Follow Ms. Evelyn Turner through the steps your seat owns. Questions start on the next screen.",
  '08': 'Short real scenarios. Choose what you would do next and get feedback right away.',
  '09': 'What must be documented, where it goes, and why it matters.',
  '10': 'A scenario-based check to confirm you are ready for practice.',
}

export default function ModuleIntro({ navigate, module }: { navigate: (r: Route) => void; module: string }) {
  const role = currentRole()
  const mods = buildModules(role)
  const m = mods.find(x => x.n === module) ?? mods[0]
  const i = mods.indexOf(m)
  const seat = ROLE_PATHS[role]?.title
  const btn = (primary: boolean): React.CSSProperties => ({ background: primary ? '#F4941C' : 'rgba(255,255,255,.12)', color: '#fff', border: primary ? 'none' : '1.5px solid rgba(255,255,255,.55)', borderRadius: 12, padding: '14px 28px', fontFamily: 'inherit', fontWeight: 700, fontSize: 17, cursor: 'pointer' })

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #2680B3 0%, #1D6A96 55%, #12476A 100%)', color: '#fff' }}>
      <Masthead navigate={navigate} currentPage="home" />
      <main style={{ maxWidth: 820, margin: '0 auto', padding: '64px 28px 80px', textAlign: 'center' }}>
        <p style={{ margin: '0 0 10px', fontSize: 13, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#FFD69A' }}>{m.tag} · Module {m.n} of {mods.length}</p>
        <div aria-hidden style={{ fontSize: 'clamp(96px, 16vw, 160px)', fontWeight: 700, lineHeight: 1, color: 'rgba(255,255,255,.16)', letterSpacing: '-.04em' }}>{m.n}</div>
        <h1 style={{ margin: '-10px 0 14px', fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-.02em' }}>{m.title}</h1>
        <p style={{ margin: '0 auto 10px', fontSize: 19, lineHeight: 1.5, color: '#E1EEF4', maxWidth: '30em' }}>{m.line}</p>
        <p style={{ margin: '0 auto 36px', fontSize: 16.5, lineHeight: 1.5, color: '#CFE2EE', maxWidth: '32em' }}>{EXPECT[m.n]}</p>
        {seat && m.tag !== 'CORE' && <p style={{ margin: '-18px 0 30px', fontSize: 14.5, color: '#FFD69A' }}>For your seat: {seat}</p>}
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate(m.go)} style={btn(true)}>{m.status === 'Not started' ? 'Begin module' : m.status === 'Completed' ? 'Review module' : 'Continue module'} →</button>
          <button onClick={() => navigate({ page: 'home' })} style={btn(false)}>Back to my path</button>
        </div>
        <p style={{ margin: '30px 0 0', fontSize: 14, color: '#B9D3E3' }}>{i > 0 ? `Module ${mods[i - 1].n} · ${mods[i - 1].status}` : 'The first leg of your path'}</p>
      </main>
    </div>
  )
}
