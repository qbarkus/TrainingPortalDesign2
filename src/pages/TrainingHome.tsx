import { useState, useEffect } from 'react'
import Masthead from '../components/Masthead'
import type { Route } from '../App'
import { buildModules, buildStages, stageStatus, type Mod, type Tag } from '../data/modules'
import StatusBadge from '../components/StatusBadge'
import { ROLE_NAMES } from '../data/courseContent'
import { ROLE_PATHS } from '../data/rolePaths'

type Props = { navigate: (r: Route) => void }




/* Initials avatar used for team and guides */
export function InitialsAvatar({ initials, color, size = 80, fontSize = 28 }: { initials: string; color: string; size?: number; fontSize?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: color, color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize, fontWeight: 700, letterSpacing: '.04em', flexShrink: 0,
    }}>
      {initials}
    </div>
  )
}


const TAG_STYLE: Record<Tag, { bg: string; fg: string }> = {
  CORE: { bg: '#E7F3FB', fg: '#1D6A96' },
  'YOUR ROLE': { bg: '#FFF1DD', fg: '#8A4E08' },
  'SYSTEM PRACTICE': { bg: '#E3F3EA', fg: '#1E6B43' },
}

function PathHero({ navigate, savedName }: { navigate: (r: Route) => void; savedName: string }) {
  const role = (() => { try { return localStorage.getItem('smc-my-role') || '' } catch { return '' } })()
  const first = savedName.trim().split(' ')[0]
  const rp = ROLE_PATHS[role]
  const roleName = ROLE_NAMES[role]

  if (!rp) {
    return (
      <section style={{ background: '#2D718E', color: '#fff' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '56px 32px 64px', textAlign: 'center' }}>
          <p style={{ margin: '0 0 10px', fontSize: 12, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: '#FFD69A' }}>St. Mary's Center · Senior Housing Services Academy</p>
          <h1 style={{ margin: '0 0 14px', fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 700, lineHeight: 1.12 }}>Choose your role to begin</h1>
          <p style={{ margin: '0 0 24px', fontSize: 18, color: '#E1EEF4' }}>The moment you choose your role, the Academy becomes your learning path.</p>
          <button onClick={() => navigate({ page: 'cover' })} style={{ background: '#F4941C', color: '#fff', fontWeight: 700, fontSize: 16, padding: '13px 24px', borderRadius: 12, border: 'none', fontFamily: 'inherit', cursor: 'pointer' }}>Go to the welcome screen →</button>
        </div>
      </section>
    )
  }

  const mods = buildModules(role)
  const done = mods.filter(m => m.status === 'Completed').length
  const next = mods.find(m => m.status !== 'Completed') ?? mods[mods.length - 1]
  const stages = buildStages(role)
  const stageDone = stages.filter(st => stageStatus(st) === 'Completed').length
  const nextStage = stages.find(st => stageStatus(st) !== 'Completed') ?? stages[5]
  const LESSON_TITLE: Record<string, string> = { '02': 'The framework and what we believe', '03': 'The department and its services', KYP: 'Your seat in the relay', '05': 'What Coordinated Entry is' }
  const row = (m: Mod, idx: number, st: { n: string }) => {
    const isDone = m.status === 'Completed', isNext = m === next
    return (
      <button key={m.n} id={`mod-${m.n}`} onClick={() => navigate(m.n === 'KYP' ? m.go : { page: 'intro', module: m.n })} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px 16px', width: '100%', textAlign: 'left', background: '#fff', border: `1.5px solid ${isNext ? '#F4941C' : '#C9D6DF'}`, borderRadius: 14, padding: '14px 18px', fontFamily: 'inherit', color: '#22333F', cursor: 'pointer', boxShadow: isNext ? '0 8px 22px rgba(244,148,28,.2)' : '0 4px 12px rgba(29,106,150,.06)' }}>
        <span style={{ flex: '0 0 auto', width: 48, height: 48, borderRadius: '50%', background: isDone ? '#2C7A4B' : '#fff', color: isDone ? '#fff' : '#1D6A96', border: `3px solid ${isDone ? '#2C7A4B' : isNext ? '#F4941C' : '#C9D6DF'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14 }}>{isDone ? '✓' : `${st.n}.${idx + 1}`}</span>
        <span style={{ flex: '1 1 14em', minWidth: 0 }}>
          <span style={{ display: 'block', fontSize: 18, fontWeight: 700, color: '#1D6A96', lineHeight: 1.25 }}>{LESSON_TITLE[m.n] ?? m.title}</span>
          <span style={{ display: 'block', fontSize: 15, color: '#3C4A55', lineHeight: 1.45 }}>{m.line}</span>
        </span>
        <span style={{ flex: '0 0 auto' }}><StatusBadge status={m.status} /></span>
      </button>
    )
  }
  return (
    <>
      <section style={{ background: '#2D718E', color: '#fff' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '44px 32px 52px' }}>
          <p style={{ margin: '0 0 12px', fontSize: 12.5, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: '#FFD69A' }}>St. Mary's Center · Senior Housing Services Academy</p>
          <h1 style={{ margin: '0 0 6px', fontSize: 'clamp(34px, 4.4vw, 54px)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-.02em' }}>{first ? `Welcome, ${first}` : 'Welcome'}</h1>
          <p style={{ margin: '0 0 6px', fontSize: 'clamp(22px, 2.6vw, 30px)', fontWeight: 600, color: '#fff' }}>Your {rp.title} Learning Path</p>
          <p style={{ margin: '0 0 18px', fontSize: 18, color: '#CFE2EE' }}>{rp.sub}</p>
          <p style={{ margin: '0 0 22px', fontSize: 19, lineHeight: 1.5, color: '#E1EEF4', maxWidth: '34em' }}>Learn your role. Practice the workflow. Serve with dignity.</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 26 }}>
            {[['Foundation', '1'], ['Short courses', '5'], ['Final', '6']].map(([t, id]) => <button key={t} onClick={() => document.getElementById(`stage-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })} aria-label={`Jump to ${t}`} style={{ fontFamily: 'inherit', color: '#fff', cursor: 'pointer',  padding: '6px 14px', borderRadius: 999, background: 'rgba(255,255,255,.14)', border: '1.5px solid rgba(255,255,255,.4)', fontSize: 12.5, fontWeight: 700, letterSpacing: '.14em' }}>{t}</button>)}
          </div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
            <button onClick={() => navigate(stageStatus(nextStage) === 'Not started' ? { page: 'stage', n: nextStage.n } : nextStage.items.find(i => i.status !== 'Completed')?.n === 'KYP' ? { page: 'kyp', role } : { page: 'intro', module: (nextStage.items.find(i => i.status !== 'Completed') ?? next).n })} style={{ background: '#F4941C', color: '#fff', fontWeight: 700, fontSize: 16.5, padding: '14px 26px', borderRadius: 12, border: 'none', fontFamily: 'inherit', cursor: 'pointer' }}>{done === mods.length ? 'Review your path' : done === 0 ? 'Start ' + nextStage.title : 'Continue ' + nextStage.title} →</button>
            <span style={{ fontSize: 15, color: '#CFE2EE' }}>{stageDone} of 6 steps complete · {roleName}</span>
            <button onClick={() => navigate({ page: 'cover' })} style={{ background: 'none', border: 'none', padding: 0, color: '#fff', fontFamily: 'inherit', fontSize: 15, textDecoration: 'underline', textUnderlineOffset: 3, cursor: 'pointer' }}>Change name or role</button>
          </div>
        </div>
      </section>
      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '8px 32px 12px' }}>
        {['Foundation', 'Short courses', 'Final'].map(ph => (
          <div key={ph} style={{ marginTop: 40 }}>
            <p style={{ margin: '0 0 14px', fontSize: 12.5, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: '#F4941C' }}>{ph}</p>
            <div style={{ display: 'grid', gap: 14 }}>
              {stages.filter(st => st.phase === ph).map(st => {
                const ss = stageStatus(st), isDone = ss === 'Completed', isNow = st === nextStage
                const real = st.items, got = real.filter(i => i.status === 'Completed').length
                return (
                  <div key={st.n} id={`stage-${st.n}`} style={{ background: '#fff', border: `2px solid ${isNow ? '#F4941C' : '#DCE7EE'}`, borderRadius: 18, padding: '20px 22px', boxShadow: isNow ? '0 10px 28px rgba(244,148,28,.16)' : 'none' }}>
                    <div onClick={() => navigate({ page: 'stage', n: st.n })} role="link" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter') navigate({ page: 'stage', n: st.n }) }} style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', cursor: 'pointer' }}>
                      <span style={{ flex: '0 0 auto', width: 52, height: 52, borderRadius: '50%', background: isDone ? '#2C7A4B' : '#fff', color: isDone ? '#fff' : '#1D6A96', border: `3px solid ${isDone ? '#2C7A4B' : isNow ? '#F4941C' : '#C9D6DF'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 20 }}>{isDone ? '✓' : st.n}</span>
                      <div style={{ flex: '1 1 16em', minWidth: 0 }}>
                        <h3 style={{ margin: 0, fontSize: 'clamp(19px, 2.2vw, 24px)', fontWeight: 700, color: '#1D6A96', lineHeight: 1.2 }}>{st.title}</h3>
                        <p style={{ margin: '2px 0 0', fontSize: 16, color: '#3C4A55' }}>{st.line}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <StatusBadge status={ss} />
                        {real.length === 1 && <div style={{ fontSize: 14, fontWeight: 700, color: '#F4941C', marginTop: 4 }}>{ss === 'Completed' ? 'Review' : ss === 'In progress' ? 'Continue' : 'Start'} →</div>}
                        {real.length > 1 && <div style={{ fontSize: 13.5, color: '#5A6873', marginTop: 4 }}>{got} of {real.length} lessons</div>}
                      </div>
                    </div>
                    {st.items.length > 1 && <div style={{ display: 'grid', gap: 8, marginTop: 16 }}>{st.items.map((m, i) => row(m, i, st))}</div>}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
        <p style={{ margin: '32px 0 0', fontSize: 16, color: '#3C4A55' }}>Also available: <button onClick={() => navigate({ page: 'paths' })} style={{ background: 'none', border: 'none', padding: 0, fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 700, color: '#2680B3', textDecoration: 'underline', textUnderlineOffset: 3, cursor: 'pointer' }}>short courses and system practice</button>. Finished everything? <button onClick={() => navigate({ page: 'closure' })} style={{ background: 'none', border: 'none', padding: 0, fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 700, color: '#2680B3', textDecoration: 'underline', textUnderlineOffset: 3, cursor: 'pointer' }}>Close out with the team</button>.</p>
      </section>
    </>
  )
}

export default function TrainingHome({ navigate }: Props) {
  const [codeInput, setCodeInput] = useState('')
  const [restoreMsg, setRestoreMsg] = useState('')
  const [restoreOk, setRestoreOk] = useState(false)
  const [savedName, setSavedName] = useState('')
  const [hasProgress, setHasProgress] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('smc-training-progress')
      if (raw) {
        const data = JSON.parse(raw)
        setSavedName(data.n || '')
        setHasProgress(true)
      }
      if (localStorage.getItem('roadhome.v1')) setHasProgress(true)
    } catch {}
  }, [])

  function startFresh() {
    if (!window.confirm('Start fresh on this computer? This clears all saved progress on this device only.')) return
    try {
      Object.keys(localStorage)
        .filter(k => k === 'smc-training-progress' || k === 'roadhome.v1' || k === 'smc-foundation' || k === 'smc-documentation' || k === 'smc-notes' || k === 'smc-roadhome' || k === 'smc-david' || k === 'smc-practice' || k === 'smc-my-role' || k === 'smc-role-viewed' || k === 'smc-kyp' || k === 'smc-celebrated' || k.startsWith('smc-course-pos-') || k.startsWith('smc-exam-'))
        .forEach(k => localStorage.removeItem(k))
    } catch {}
    setSavedName(''); setHasProgress(false)
    setRestoreMsg('Everything on this computer has been cleared.')
    setRestoreOk(true); setCodeInput('')
  }

  function restoreCode() {
    const code = codeInput.trim()
    try {
      const b64 = code.replace(/^SMC-/i, '')
      const data = JSON.parse(decodeURIComponent(escape(atob(b64))))
      if (!data || typeof data !== 'object' || !('r' in data)) throw new Error('bad')
      localStorage.setItem('smc-training-progress', JSON.stringify(data))
      setSavedName(data.n || ''); setHasProgress(true)
      setRestoreMsg('Progress restored. Open the Academy to continue.')
      setRestoreOk(true)
    } catch {
      setRestoreMsg("That code didn't work. Check for missing characters and try again.")
      setRestoreOk(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#EAF3F9', color: '#22333F' }}>
      <Masthead navigate={navigate} currentPage="home" />

      <PathHero navigate={navigate} savedName={savedName} />

      {/* Progress panel */}
      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '64px 32px 72px' }}>
        <div style={{ background: '#EAF3F9', borderRadius: 18, padding: '32px 36px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 28, alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: '0 0 6px', fontSize: 21, fontWeight: 600, color: '#1D6A96' }}>Your progress</h3>
            <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: '#3C4A55' }}>Progress saves on this computer. To continue on another one, paste the training code from your Academy page. Sharing a computer? Start fresh before the next person begins.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <input value={codeInput} onChange={e => setCodeInput(e.target.value)} placeholder="Paste your training code" style={{ flex: '1 1 14em', minWidth: 0, padding: '12px 14px', border: '1.5px solid #C9D6DF', borderRadius: 10, fontFamily: 'inherit', fontSize: 15, background: '#fff', color: '#22333F' }} />
              <button onClick={restoreCode} style={{ background: '#2680B3', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 22px', fontFamily: 'inherit', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Restore</button>
            </div>
            <button onClick={startFresh} style={{ alignSelf: 'flex-start', background: 'transparent', border: 'none', padding: 0, fontFamily: 'inherit', fontSize: 15, fontWeight: 500, color: '#2680B3', textDecoration: 'underline', textUnderlineOffset: 3, cursor: 'pointer' }}>Start fresh on this computer</button>
            {restoreMsg && <p style={{ margin: 0, fontSize: 14.5, fontWeight: 600, color: restoreOk ? '#1E6B43' : '#B23A22' }}>{restoreMsg}</p>}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#1D6A96', color: '#CFE2EE' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: 32, display: 'flex', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>St. Mary's Center</div>
            <div style={{ fontSize: 14 }}>A Community of Hope, Healing &amp; Justice</div>
          </div>
          <div style={{ display: 'flex', gap: 24, fontSize: 14.5, flexWrap: 'wrap' }}>
            <button onClick={() => navigate({ page: 'foundation' })} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14.5 }}>Aging With Dignity</button>
            <button onClick={() => navigate({ page: 'academy' })} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14.5 }}>Role academy</button>
            <button onClick={() => navigate({ page: 'exam', examType: 'ces' })} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14.5 }}>Exams</button>
          </div>
        </div>
      </footer>
    </div>
  )
}
