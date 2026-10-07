import { useState, useEffect } from 'react'
import MeetTeam from '../components/MeetTeam'
import MemberJourney from '../components/MemberJourney'
import Masthead from '../components/Masthead'
import type { Route } from '../App'
import { CONTENT, ROLES, ROLE_NAMES, ROLE_IDS, ACTS, ORDER, type StepId } from '../data/courseContent'
import cesCardCover from '../imports/coordinated-entry-cover.png'

type Props = { navigate: (r: Route) => void; initialAct?: number }

const CE_FLOW = [
  { num: 'Step 1', name: 'Triage', note: 'Safety, health, housing status' },
  { num: 'Step 2', name: 'HMIS Profile', note: 'One record, searched first' },
  { num: 'Step 3', name: 'Problem Solving', note: 'Resolve before assessment' },
  { num: 'Step 4', name: 'Pre-Questions', note: 'Crisis or housing road' },
  { num: 'Step 5', name: 'CE Enrollment', note: 'Once per episode' },
  { num: 'Step 6', name: 'Crisis Assessment', note: 'Shelter, TH, queue' },
  { num: 'Step 7', name: 'Housing Assessment', note: 'Score, gate, match, handoff' },
]

const ROLE_BLURBS: Record<string, string> = {
  SOC: 'You run Steps 1, 3 and 4. Triage is your opening conversation and problem solving is your main tool.',
  OLS: 'You run Steps 1 through 4. You capture in the field; the documentation flow follows.',
  HSAA: 'You run Steps 1, 2 and 5. You are often the first contact and the one who keeps the record alive.',
  HSW: 'You run all seven steps. The full CE workflow, from triage through the match and handoff.',
  SHSM: 'You run all seven steps, with oversight responsibility across the team.',
  HN: 'You run Steps 1, 2, 3, 5, 6 and 7. Match readiness is yours to protect.',
  TSHC: 'You run Steps 1, 4, 6 and 7. The crisis queue and transitional housing pathway are your daily work.',
  TSSC: 'You run Steps 1, 5 and 7. You receive the baton at the lease signature.',
  DCC: 'You run Steps 1, 2, 5 and 7. Moving assessments from HMIS and reconciling data quality is your core work.',
  CD: 'You run all seven steps, with clinical oversight across the program.',
}

export default function Academy({ navigate, initialAct = 0 }: Props) {
  const [name, setName] = useState('')
  const [roleId, setRoleId] = useState('')
  const [act, setAct] = useState(initialAct)
  const [intro, setIntro] = useState(0)
  const [editing, setEditing] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('smc-training-progress')
      if (!raw) setRoleId(localStorage.getItem('smc-my-role') || '')
      if (raw) {
        const data = JSON.parse(raw)
        setName(data.n || '')
        setRoleId(data.r || localStorage.getItem('smc-my-role') || '')
        setCompletedSteps(data.d || [])
      }
    } catch {}
  }, [])

  function savePref(n: string, r: string) {
    try {
      const raw = localStorage.getItem('smc-training-progress')
      const data = raw ? JSON.parse(raw) : { d: [] }
      data.n = n
      data.r = r
      if (r) localStorage.setItem('smc-my-role', r)
      localStorage.setItem('smc-training-progress', JSON.stringify(data))
    } catch {}
  }

  function onName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value)
    savePref(e.target.value, roleId)
  }

  const [roleQ, setRoleQ] = useState('')
  const [roleOpen, setRoleOpen] = useState(false)
  function pickRole(id: string) {
    setRoleId(id)
    savePref(name, id)
    setRoleQ('')
    setRoleOpen(false)
  }
  const roleMatches = ROLE_IDS.filter(id => ROLE_NAMES[id].toLowerCase().includes(roleQ.trim().toLowerCase()))

  const hasRole = !!roleId
  const showName = !name.trim() || editing
  const showRole = !hasRole || editing
  const mySteps = hasRole ? ORDER.filter(id => ROLES[roleId]?.[id]) : ORDER
  const totalMins = mySteps.reduce((sum, id) => sum + CONTENT[id].mins, 0)
  const doneCount = mySteps.filter(id => completedSteps.includes(id)).length
  const progressPct = mySteps.length > 0 ? Math.round((doneCount / mySteps.length) * 100) : 0

  function getTransferCode() {
    try {
      const raw = localStorage.getItem('smc-training-progress') || '{}'
      return 'SMC-' + btoa(unescape(encodeURIComponent(raw)))
    } catch { return 'SMC-' }
  }

  const isBegin = act === 0

  return (
    <div style={{ minHeight: '100vh', background: '#EAF3F9', color: '#22333F' }}>
      <Masthead navigate={navigate} currentPage="academy" />

      {/* Returning user bar */}
      {hasRole && name && (
        <div style={{ background: '#1D6A96', color: '#fff', borderBottom: '1px solid rgba(255,255,255,.12)' }}>
          <div style={{ maxWidth: '62em', margin: '0 auto', padding: '.85em 1.4em', display: 'flex', alignItems: 'center', gap: '1em', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.7em', flex: '1 1 16em', minWidth: 0 }}>
              <span style={{ flexShrink: 0, width: '2.2em', height: '2.2em', borderRadius: '50%', background: '#F4941C', color: '#fff', fontSize: '.9em', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {name.charAt(0).toUpperCase()}
              </span>
              <div style={{ lineHeight: 1.25 }}>
                <div style={{ fontSize: '.66em', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' as const, color: '#FFD69A' }}>Welcome back</div>
                <div style={{ fontSize: '.98em', fontWeight: 600 }}>{name} · {ROLE_NAMES[roleId] || roleId}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '.6em' }}>
              <button
                onClick={() => {
                  if (!window.confirm('Start over? This clears your step progress and seat selection.')) return
                  try { localStorage.removeItem('smc-training-progress'); Object.keys(localStorage).filter(k => k.startsWith('smc-course-pos-')).forEach(k => localStorage.removeItem(k)) } catch {}
                  setName(''); setRoleId(''); setCompletedSteps([])
                }}
                style={{ padding: '.7em 1em', border: '1.5px solid rgba(255,255,255,.4)', borderRadius: 12, background: 'rgba(255,255,255,.1)', color: '#fff', fontFamily: 'inherit', fontSize: '.82em', fontWeight: 600, cursor: 'pointer' }}
              >
                Start over
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Act nav pills */}
      {hasRole && (
        <nav style={{ background: '#fff', borderBottom: '1px solid #DCE7EE' }}>
          <div style={{ maxWidth: '62em', margin: '0 auto', padding: '.7em 1.4em', display: 'flex', gap: '.5em', flexWrap: 'wrap' }}>
            {['Before you begin', ...ACTS.map(a => a.label)].map((label, i) => (
              <button
                key={i}
                onClick={() => setAct(i)}
                style={{ padding: '.55em 1em', border: `1.5px solid ${act === i ? '#2680B3' : '#C9D6DF'}`, borderRadius: 999, background: act === i ? '#2680B3' : '#fff', color: act === i ? '#fff' : '#22333F', fontFamily: 'inherit', fontSize: '.86em', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' as const }}
              >
                {label}
              </button>
            ))}
          </div>
        </nav>
      )}

      {/* Before you begin (page 0) */}
      {isBegin && (
        <>
          {intro === 0 && (
            <>
          <section style={{ background: '#1B3346' }}>
            <img
              src={cesCardCover}
              alt="Coordinated Entry: A path home."
              style={{ display: 'block', width: '100%', maxWidth: '74em', margin: '0 auto', height: 'auto' }}
            />
          </section>
              <section style={{ maxWidth: '62em', margin: '0 auto', padding: '2.4em 1.4em 3em' }}>
                <h2 style={{ margin: '0 0 .4em', fontSize: 'clamp(1.5em, 3.4vw, 2em)', fontWeight: 600, color: '#2680B3' }}>The journey you will run, in 3 acts</h2>
                <p style={{ margin: '0 0 1.2em', lineHeight: 1.6, color: '#3C4A55', maxWidth: '40em' }}>It starts with outreach. Each stop on the track is a Coordinated Entry step, colored by act. Finish an act and your baton moves to the next place on the track. Tap any stop to see who runs it.</p>
                <MemberJourney actsDone={ACTS.map(a => { const m = a.steps.filter(id => mySteps.includes(id)); return m.length > 0 && m.every(id => completedSteps.includes(id)) })} />
              </section>
          <section style={{ background: '#1D6A96', color: '#fff' }}>
            <div style={{ maxWidth: '52em', margin: '0 auto', padding: '2.4em 1.4em 2.6em', textAlign: 'center' }}>
              <p style={{ margin: '0 0 .6em', fontSize: '.74em', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase' as const, color: '#FFD69A' }}>Practice your role</p>
              <p style={{ margin: '0 auto 1.6em', maxWidth: '34em', fontSize: '1.05em', lineHeight: 1.6, color: '#E7F0F6' }}>
                You walked Ms. Evelyn Turner's journey. Now walk the system that carries it: the county's seven Coordinated Entry steps, from triage to a signed lease and the warm handoff to Tenancy Sustaining Services, with only the steps your seat owns.
              </p>
              <div style={{ display: 'flex', gap: '.8em', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setIntro(1)}
                  style={{ padding: '.9em 1.7em', border: 'none', borderRadius: 12, background: '#F4941C', color: '#fff', fontFamily: 'inherit', fontSize: '1em', fontWeight: 600, cursor: 'pointer', boxShadow: '0 12px 26px rgba(244,148,28,.36)' }}
                >
                  Start onboarding →
                </button>
                <button
                  onClick={() => navigate({ page: 'home' })}
                  style={{ padding: '.9em 1.5em', border: '1.5px solid rgba(255,255,255,.5)', borderRadius: 12, background: 'rgba(255,255,255,.12)', color: '#fff', fontFamily: 'inherit', fontSize: '1em', fontWeight: 600, cursor: 'pointer' }}
                >
                  Training home
                </button>
              </div>
              <div style={{ display: 'flex', gap: '1.6em', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.8em', color: '#CFE2EE', fontSize: '.86em' }}>
                <span>Every step is a baton pass</span>
                <span style={{ opacity: .5 }}>·</span>
                <span>7 CE steps, grouped in 3 acts</span>
                <span style={{ opacity: .5 }}>·</span>
                <span>about 60 minutes, at your pace</span>
                <span style={{ opacity: .5 }}>·</span>
                <span>the care plan leads every step</span>
              </div>
            </div>
          </section>

            </>
          )}
          {intro === 1 && (
            <>
          {/* Seat selector */}
          <section style={{ maxWidth: '62em', margin: '0 auto', padding: '0 1.4em 3em' }}>
            <p style={{ margin: '0 0 .5em', fontSize: '.72em', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase' as const, color: '#F4941C' }}>Page 2 of 3 · Before you begin</p>
            <h2 style={{ margin: '0 0 .7em', fontSize: 'clamp(1.6em, 3.8vw, 2.2em)', fontWeight: 600, color: '#2680B3' }}>{showName && showRole ? 'Tell us your name and your role' : showRole ? `Welcome, ${name.trim().split(' ')[0]}. What is your role?` : showName ? 'Tell us your name' : 'Your seat on the team'}</h2>
            <p style={{ margin: '0 0 1.6em', fontSize: '1.02em', lineHeight: 1.6, color: '#3C4A55', maxWidth: '42em' }}>
              Coordinated Entry is run by a team, and no one seat runs all of it. Your seat decides which steps you own, and the Academy shows you only those.{!showName && !showRole ? ' Confirm yours below.' : ''}
            </p>
            <div style={{ background: '#fff', border: '1px solid #DCE7EE', borderRadius: 18, padding: '1.5em 1.6em', boxShadow: '0 16px 40px rgba(6,48,79,.08)' }}>
              {!showName && !showRole ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '1em', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '1.15em', fontWeight: 700, color: '#2680B3' }}>Welcome back, {name.trim().split(' ')[0]}</div>
                    <div style={{ fontSize: '.95em', color: '#3C4A55' }}>{ROLE_NAMES[roleId]}</div>
                  </div>
                  <button onClick={() => setEditing(true)} style={{ background: 'none', border: 'none', color: '#2680B3', fontFamily: 'inherit', fontWeight: 600, fontSize: '.92em', cursor: 'pointer', textDecoration: 'underline' }}>Not you? Change</button>
                </div>
              ) : (
              <div style={{ display: 'flex', gap: '1.1em', flexWrap: 'wrap' }}>
                {showName && <label style={{ flex: '1 1 14em', display: 'flex', flexDirection: 'column', gap: '.45em' }}>
                  <span style={{ fontSize: '.76em', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: '#6C7A85' }}>Your name</span>
                  <input
                    value={name}
                    onChange={onName}
                    placeholder="First and last name"
                    style={{ width: '100%', padding: '.75em .9em', border: '1.5px solid #C9D6DF', borderRadius: 12, background: '#fff', color: '#22333F', fontFamily: 'inherit', fontSize: '1em' }}
                  />
                </label>}
                {showRole && <label style={{ flex: '2 1 20em', display: 'flex', flexDirection: 'column', gap: '.45em' }}>
                  <span style={{ fontSize: '.76em', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: '#6C7A85' }}>Your seat</span>
                  <div style={{ position: 'relative' }}>
                    <input
                      value={roleOpen ? roleQ : (roleId ? ROLE_NAMES[roleId] : roleQ)}
                      onChange={e => { setRoleQ(e.target.value); setRoleOpen(true); if (roleId) { setRoleId(''); savePref(name, '') } }}
                      onFocus={() => { setRoleQ(''); setRoleOpen(true) }}
                      onBlur={() => setTimeout(() => setRoleOpen(false), 150)}
                      onKeyDown={e => { if (e.key === 'Enter' && roleMatches.length > 0) { e.preventDefault(); pickRole(roleMatches[0]) } }}
                      placeholder="Start typing your role..."
                      role="combobox"
                      aria-expanded={roleOpen}
                      style={{ width: '100%', padding: '.75em .9em', border: '1.5px solid #C9D6DF', borderRadius: 12, background: '#fff', color: '#22333F', fontFamily: 'inherit', fontSize: '1em' }}
                    />
                    {roleOpen && (
                      <ul style={{ position: 'absolute', zIndex: 10, left: 0, right: 0, top: 'calc(100% + 4px)', margin: 0, padding: 4, listStyle: 'none', maxHeight: 260, overflowY: 'auto', background: '#fff', border: '1px solid #C9D6DF', borderRadius: 12, boxShadow: '0 12px 30px rgba(6,48,79,.15)' }}>
                        {roleMatches.length === 0 && <li style={{ padding: '.6em .8em', color: '#6C7A85' }}>No matching role</li>}
                        {roleMatches.map(id => (
                          <li key={id} onMouseDown={e => { e.preventDefault(); pickRole(id) }} style={{ padding: '.6em .8em', borderRadius: 8, cursor: 'pointer', color: '#22333F', background: id === roleId ? '#EAF3F9' : 'transparent' }}>{ROLE_NAMES[id]}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </label>}
              </div>
              )}

              {hasRole && (
                <div style={{ marginTop: '1.3em', paddingTop: '1.2em', borderTop: '1px solid #E7EEF3' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1em', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1 1 16em', height: '.7em', background: '#E7EEF3', borderRadius: 999, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${progressPct}%`, background: '#2E7D50', borderRadius: 999, transition: 'width .4s' }} />
                    </div>
                    <span style={{ fontSize: '.92em', fontWeight: 700, color: '#2680B3' }}>{doneCount} of {mySteps.length} steps done</span>
                    <span style={{ fontSize: '.86em', color: '#6C7A85' }}>~{totalMins} minutes total</span>
                  </div>
                  <p style={{ margin: '.8em 0 0', fontSize: '.94em', lineHeight: 1.55, color: '#3C4A55' }}>{ROLE_BLURBS[roleId] || 'Your steps are shown below.'}</p>
                  <div style={{ marginTop: '1em', background: '#EAF3F9', borderRadius: 12, padding: '1em 1.1em' }}>
                    <div style={{ fontSize: '.72em', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' as const, color: '#2680B3', marginBottom: '.3em' }}>Your destination</div>
                    <p style={{ margin: 0, fontSize: '.94em', lineHeight: 1.55, color: '#22333F' }}>
                      Finish able to explain where your seat fits, carry out the steps you own, protect the member experience, and make a clear handoff to the next person.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div style={{ marginTop: '1.5em', display: 'flex', justifyContent: 'space-between', gap: '.8em', flexWrap: 'wrap' }}>
              <button onClick={() => setIntro(0)} style={{ padding: '.9em 1.5em', border: '1.5px solid #C9D6DF', borderRadius: 12, background: '#fff', color: '#22333F', fontFamily: 'inherit', fontSize: '1em', fontWeight: 600, cursor: 'pointer' }}>← Back</button>
              <button
                disabled={!(hasRole && name.trim())}
                onClick={() => setIntro(2)}
                style={{ padding: '.9em 2em', border: 'none', borderRadius: 12, background: hasRole && name.trim() ? '#F4941C' : '#C9D6DF', color: '#fff', fontFamily: 'inherit', fontSize: '1em', fontWeight: 600, cursor: hasRole && name.trim() ? 'pointer' : 'not-allowed' }}
              >
                Meet the team →
              </button>
            </div>
          </section>
            </>
          )}
          {intro === 2 && hasRole && name.trim() && (
            <>
              <MeetTeam name={name} roleId={roleId} />
          {/* CE Overview */}
          <section style={{ maxWidth: '62em', margin: '0 auto', padding: '3em 1.4em 0' }}>
            <p style={{ margin: '0 0 .5em', fontSize: '.72em', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase' as const, color: '#F4941C' }}>First, the basics</p>
            <h2 style={{ margin: '0 0 .7em', fontSize: 'clamp(1.6em, 3.8vw, 2.2em)', fontWeight: 600, color: '#2680B3' }}>What Coordinated Entry is</h2>
            <p style={{ margin: '0 0 1.2em', fontSize: '1.02em', lineHeight: 1.65, color: '#3C4A55', maxWidth: '44em' }}>
              Coordinated Entry, or CE, is Alameda County's single front door to the homelessness crisis response system. Instead of every agency keeping its own list and its own rules, the county uses one shared process: everyone is welcomed the same way, assessed with the same tool, and placed on the same countywide queues.
            </p>
            <p style={{ margin: '0 0 1.4em', fontSize: '1.02em', lineHeight: 1.65, color: '#3C4A55', maxWidth: '44em' }}>
              St. Mary's Center is one of those doors, for older adults. We do the welcoming, the problem solving, the assessment, and the navigation. <strong>We do not do the matching</strong>, and CE must be completed before Housing Navigation can begin.
            </p>

            <div style={{ background: '#fff', border: '1px solid #DCE7EE', borderRadius: 18, padding: '1.4em 1.6em', marginBottom: '1em', boxShadow: '0 12px 30px rgba(6,48,79,.06)' }}>
              <div style={{ fontSize: '.72em', fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase' as const, color: '#2680B3', marginBottom: '.9em' }}>The CE 2.0 workflow at a glance</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 11em), 1fr))', gap: '.6em' }}>
                {CE_FLOW.map((f, i) => (
                  <div key={i} style={{ borderLeft: '4px solid #F4941C', background: '#F7FBFD', borderRadius: 10, padding: '.7em .9em' }}>
                    <div style={{ fontSize: '.7em', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' as const, color: '#8A4E08' }}>{f.num}</div>
                    <div style={{ fontSize: '.96em', fontWeight: 600, color: '#2680B3', lineHeight: 1.3 }}>{f.name}</div>
                    <div style={{ fontSize: '.84em', color: '#5A6873', lineHeight: 1.45 }}>{f.note}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 16em), 1fr))', gap: '.8em', marginBottom: '1.4em' }}>
              <div style={{ background: '#E8F3EF', border: '1px solid #BFE0D2', borderRadius: 14, padding: '1em 1.2em' }}>
                <div style={{ fontSize: '.72em', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' as const, color: '#1E6B43', marginBottom: '.3em' }}>What CE 2.0 changed</div>
                <p style={{ margin: 0, fontSize: '.94em', lineHeight: 1.55, color: '#22333F' }}>The system moved from intake, assessment and waiting, to a problem-solving conversation centered on the person, their strengths and their own resources.</p>
              </div>
              <div style={{ background: '#FBF6EF', border: '1px solid #EEDFC7', borderRadius: 14, padding: '1em 1.2em' }}>
                <div style={{ fontSize: '.72em', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' as const, color: '#8A4E08', marginBottom: '.3em' }}>Why it matters for seniors</div>
                <p style={{ margin: 0, fontSize: '.94em', lineHeight: 1.55, color: '#22333F' }}>Older adults are often invisibly housed, rarely self-identify as homeless, and can be poorly served by a congregate placement. The craft of applying CE well to a 70-year-old is what this Academy teaches.</p>
              </div>
            </div>
          </section>

              <section style={{ maxWidth: '62em', margin: '0 auto', padding: '2em 1.4em 3em', display: 'flex', justifyContent: 'space-between', gap: '.8em', flexWrap: 'wrap' }}>
                <button onClick={() => setIntro(1)} style={{ padding: '.9em 1.5em', border: '1.5px solid #C9D6DF', borderRadius: 12, background: '#fff', color: '#22333F', fontFamily: 'inherit', fontSize: '1em', fontWeight: 600, cursor: 'pointer' }}>← Back</button>
                <button onClick={() => setAct(1)} style={{ padding: '.9em 2em', border: 'none', borderRadius: 12, background: '#F4941C', color: '#fff', fontFamily: 'inherit', fontSize: '1em', fontWeight: 600, cursor: 'pointer', boxShadow: '0 12px 26px rgba(244,148,28,.36)' }}>Find my steps →</button>
              </section>
            </>
          )}
        </>
      )}

      {/* Act screens */}
      {!isBegin && (
        <main style={{ maxWidth: '62em', margin: '0 auto', padding: '2.4em 1.4em 4em' }}>
          {ACTS.map((actData, actIdx) => {
            if (act !== actIdx + 1) return null
            const actSteps = actData.steps.filter(id => !hasRole || ROLES[roleId]?.[id])

            return (
              <div key={actIdx} className="animate-up">
                <p style={{ margin: '0 0 .4em', fontSize: '.72em', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase' as const, color: '#F4941C' }}>{actData.label} · {actIdx + 1} of {ACTS.length}</p>
                <h2 style={{ margin: '0 0 .3em', fontSize: 'clamp(1.6em, 3.8vw, 2.2em)', fontWeight: 600, color: '#2680B3' }}>
                  {actIdx === 0 ? 'Access: the front door to CE' : actIdx === 1 ? 'Assessment and queues' : 'The match and the handoff'}
                </h2>
                <p style={{ margin: '0 0 1.8em', fontSize: '1em', lineHeight: 1.6, color: '#5A6873' }}>
                  {actIdx === 0 && 'Steps 1, 2 and 3 are system access. Many housing crises resolve here and never need a formal assessment.'}
                  {actIdx === 1 && 'Steps 4, 5 and 6 route members to the right road and keep them on it.'}
                  {actIdx === 2 && 'Step 7 covers the housing assessment, the county gate, and the warm handoff to Tenancy Sustaining Services.'}
                </p>

                {actSteps.length === 0 ? (
                  <div style={{ background: '#fff', border: '1px solid #DCE7EE', borderRadius: 16, padding: '2em', textAlign: 'center', color: '#5A6873' }}>
                    None of the steps in this act are assigned to your seat.
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                    {actSteps.map(id => {
                      const step = CONTENT[id]
                      const done = completedSteps.includes(id)
                      return (
                        <StepRow
                          key={id}
                          id={id}
                          step={step}
                          done={done}
                          onStart={() => navigate({ page: 'course', courseId: id })}
                        />
                      )
                    })}
                  </div>
                )}

                {/* Living care plan panel */}
                <CarePlanPanel completedSteps={completedSteps} mySteps={actSteps as StepId[]} />

                {/* Act Three: exam and transfer code */}
                {actIdx === 2 && doneCount === mySteps.length && mySteps.length > 0 && (
                  <div style={{ marginTop: '1.5em', background: '#fff', border: '1px solid #DCE7EE', borderRadius: 18, padding: '1.4em 1.6em' }}>
                    <p style={{ margin: '0 0 .4em', fontSize: '.72em', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase' as const, color: '#F4941C' }}>Certificate unlocked</p>
                    <h3 style={{ margin: '0 0 .5em', fontSize: '1.3em', fontWeight: 600, color: '#2680B3' }}>All your steps are complete</h3>
                    <p style={{ margin: '0 0 1em', fontSize: '.98em', lineHeight: 1.6, color: '#3C4A55' }}>Take the final exam to earn your Academy certificate.</p>
                    <button
                      onClick={() => navigate({ page: 'exam', examType: 'ces' })}
                      style={{ padding: '.8em 1.6em', border: 'none', borderRadius: 12, background: '#F4941C', color: '#fff', fontFamily: 'inherit', fontSize: '1em', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Take the exam →
                    </button>

                    <div style={{ marginTop: '1.4em', paddingTop: '1.2em', borderTop: '1px solid #E7EEF3' }}>
                      <div style={{ fontSize: '.72em', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' as const, color: '#5A6873', marginBottom: '.5em' }}>Your transfer code</div>
                      <code style={{ display: 'block', background: '#EAF3F9', border: '1px dashed #C9D6DF', borderRadius: 12, padding: '.7em .9em', fontSize: '.78em', color: '#2680B3', wordBreak: 'break-all' as const }}>
                        {getTransferCode()}
                      </code>
                    </div>
                  </div>
                )}

                {/* Prev / Next */}
                <div style={{ marginTop: '2em', display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                  <button
                    onClick={() => setAct(act - 1)}
                    style={{ padding: '.75em 1.3em', border: '1.5px solid #C9D6DF', borderRadius: 12, background: '#fff', color: '#2680B3', fontFamily: 'inherit', fontSize: '.94em', fontWeight: 600, cursor: 'pointer' }}
                  >
                    ← Back
                  </button>
                  {actIdx < ACTS.length - 1 && (
                    <button
                      onClick={() => setAct(act + 1)}
                      style={{ padding: '.8em 1.5em', border: 'none', borderRadius: 12, background: '#2680B3', color: '#fff', fontFamily: 'inherit', fontSize: '.96em', fontWeight: 600, cursor: 'pointer', boxShadow: '0 10px 22px rgba(28,92,122,.26)' }}
                    >
                      {ACTS[actIdx + 1]?.label} →
                    </button>
                  )}
                  {actIdx === ACTS.length - 1 && (
                    <button
                      onClick={() => navigate({ page: 'exam', examType: 'ces' })}
                      style={{ padding: '.8em 1.5em', border: 'none', borderRadius: 12, background: '#F4941C', color: '#fff', fontFamily: 'inherit', fontSize: '.96em', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Take the exam →
                    </button>
                  )}
                </div>
              </div>
            )
          })}
          <details style={{ marginTop: '2.4em', background: '#fff', border: '1px solid #DCE7EE', borderRadius: 14, padding: '.9em 1.2em' }}>
            <summary style={{ cursor: 'pointer', fontSize: '.9em', fontWeight: 700, color: '#2680B3' }}>See the whole Coordinated Entry track</summary>
            <div style={{ marginTop: '1em' }}>
              <MemberJourney actsDone={ACTS.map(a => { const m = a.steps.filter(id => mySteps.includes(id)); return m.length > 0 && m.every(id => completedSteps.includes(id)) })} />
            </div>
          </details>
        </main>
      )}
    </div>
  )
}

function StepRow({ id, step, done, onStart }: { id: StepId; step: typeof CONTENT[StepId]; done: boolean; onStart: () => void }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '1em', padding: '1.1em 1.4em',
      background: '#fff', borderRadius: 14, marginBottom: 10,
      borderLeft: `5px solid ${done ? '#1E6B43' : '#F4941C'}`,
      border: '1px solid #DCE7EE',
      borderLeftWidth: 5,
      boxShadow: '0 2px 8px rgba(6,48,79,.04)',
    }}>
      <div style={{ flex: '0 0 auto', width: '2.4em', height: '2.4em', borderRadius: '50%', background: done ? '#1E6B43' : '#EAF3F9', color: done ? '#fff' : '#1D6A96', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '.95em' }}>{done ? '✓' : id.replace('S', '')}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.7em', flexWrap: 'wrap', marginBottom: '.25em' }}>
          <h3 style={{ margin: 0, fontSize: '1.02em', fontWeight: 600, color: '#1D6A96' }}>{step.title}</h3>
          {done && (
            <span style={{ background: '#E8F3EF', border: '1px solid #BFE0D2', color: '#1E6B43', fontSize: '.72em', fontWeight: 700, letterSpacing: '.06em', padding: '.2em .6em', borderRadius: 999 }}>Done</span>
          )}
          <span style={{ fontSize: '.82em', color: '#5A6873' }}>{step.mins} minutes</span>
        </div>
        <p style={{ margin: '0 0 .7em', fontSize: '.94em', lineHeight: 1.5, color: '#5A6873' }}>{step.openTitle}</p>
        <button
          onClick={onStart}
          style={{ padding: '.55em 1.1em', border: done ? '1.5px solid #2680B3' : 'none', borderRadius: 10, background: done ? '#fff' : '#2680B3', color: done ? '#2680B3' : '#fff', fontFamily: 'inherit', fontSize: '.88em', fontWeight: 600, cursor: 'pointer' }}
        >
          {done ? 'Redo' : 'Start →'}
        </button>
      </div>
    </div>
  )
}

function CarePlanPanel({ completedSteps, mySteps }: { completedSteps: string[]; mySteps: StepId[] }) {
  const CARE_LINES: Record<StepId, string> = {
    S1: 'Safety, health and housing status confirmed; member welcomed.',
    S2: 'One profile, searched before created, with a current release on file.',
    S3: 'Problem-solving conversation held; resolution attempted and documented.',
    S4: 'Next step routed: crisis assessment, housing assessment, or neither.',
    S5: 'CE enrollment open; Current Living Situation recorded at every contact.',
    S6: 'Crisis needs assessed; queue standing protected while she waits.',
    S7: 'Housing assessment complete, match readiness held, lease signed and handed to TSS.',
  }

  return (
    <div style={{ marginTop: '1.5em', background: '#E8F3EF', border: '1px solid #BFE0D2', borderRadius: 14, padding: '1em 1.2em' }}>
      <div style={{ fontSize: '.72em', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' as const, color: '#1E6B43', marginBottom: '.7em' }}>Ms. Turner's living care plan</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '.4em' }}>
        {mySteps.map(id => {
          const done = completedSteps.includes(id)
          return (
            <div key={id} style={{ display: 'flex', alignItems: 'center', gap: '.7em' }}>
              <span style={{ flexShrink: 0, width: '1.2em', height: '1.2em', borderRadius: '50%', background: done ? '#1E6B43' : '#C9D6DF', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.7em', fontWeight: 700 }}>
                {done ? '✓' : ''}
              </span>
              <span style={{ fontSize: '.9em', color: done ? '#1E6B43' : '#8C98A2', fontWeight: done ? 600 : 400 }}>
                {CARE_LINES[id]}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
