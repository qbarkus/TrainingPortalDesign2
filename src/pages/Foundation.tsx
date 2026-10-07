import { useEffect, useState } from 'react'
import type { Route } from '../App'
import Masthead from '../components/Masthead'
import CourseBar from '../components/CourseBar'
import { ASSESSMENT, MINIS, PASS_PCT, type Mini } from '../data/foundation'
import { ROLE_NAMES, CONTENT } from '../data/courseContent'
import { ROLE_REFERENCE } from '../data/jobDescriptions'
import { PORTRAITS } from '../data/portraits'
import { claimCelebration } from '../data/modules'
import HousingSpectrum from '../components/HousingSpectrum'
import DignityWheel from '../components/DignityWheel'
import Portrait from '../components/Portrait'
import { TEAM } from '../data/team'
import batonCover from '../imports/team-cover.png'

type Props = { navigate: (r: Route) => void; start?: number }
type Saved = { first: string; last: string; position: string; department: string; page: number; minis: Record<string, number>; answers: Record<number, number>; submitted: boolean }

const KEY = 'smc-foundation'
const EMPTY: Saved = { first: '', last: '', position: '', department: 'Senior Housing Services', page: 0, minis: {}, answers: {}, submitted: false }

const IDS = ['welcome', 'profile', 'journey', 'about', 'pillars', 'awd', 'health', 'turner1', 'turner2', 'turner3', 'spectrum', 'programs', 'roles', 'team', 'assess']
const PAGES = [
  'Welcome', 'About you', 'Your Learning Journey', "About St. Mary's Center", 'The Six Pillars of AWD', 'Aging with Dignity',
  'Housing Is Health', 'Meet Ms. Turner', 'Ms. Turner Finds a Home', 'Ms. Turner Stays Housed', 'The Housing Spectrum', 'Our Programs', 'Our Roles', 'One Journey. One Team.', 'Skills Assessment',
]
const ASSESS = PAGES.length - 1
const OLD_PAGE = [0, 2, 3, 4, 5, 6, 7, 10, 12, 13]

const PRINCIPLES = ['Housing-first', 'Whole-person', 'Trauma-informed', 'Person-centered', 'Culturally responsive', 'Co-designed', 'Prevention-focused']

const STORY = [
  ['First Contact', 'Tanya from Street Outreach notices Ms. Turner’s car and starts with a simple hello. No forms, no pressure. Just respect.'],
  ['Housing Clinic', 'Ms. Turner visits Housing Clinic. Marisol welcomes her at the front desk: “Let’s get you connected with the right team.”'],
  ['Assessment', 'Elena, her Housing Social Worker, listens to her story and builds a care plan around what matters to her.'],
  ['Housing Navigation', 'Carla, her Housing Navigator, searches listings, calls providers, and never gives up on finding the right fit.'],
  ['Housing Match', 'A senior apartment opens up. Carla helps Ms. Turner complete the application and gather documents.'],
  ['Lease Signing', 'Ms. Turner signs her lease. Her hands shake a little. It’s been a long road.'],
  ['Move-In', 'Keys in hand. The team helps with furniture and essentials. For the first time in months, she sleeps in her own bed.'],
  ['Tenancy Sustaining Services', 'Hector, her TSS Coordinator, checks in, helps with budgeting, and works with her landlord. “Housing is only the beginning. We’ll help you keep it.”'],
  ['Long-Term Stability', 'One year later, Ms. Turner celebrates her housing anniversary: stable, connected, and aging with dignity.'],
]


const PROGRAMS = ['Street Outreach', 'Housing Clinic', 'Coordinated Entry', 'Housing Navigation', 'Tenancy Sustaining Services']

const ROLE_TO_TEAM: Record<string, string> = { CD: 'Dr. Grace Okoro', HSW: 'Elena Castro', SHSM: 'Sanjay Rao', SOC: 'Tanya Wells', OLS: 'Curtis Boyd', HSAA: 'Marisol Vega', HN: 'Carla Montez', TSHC: 'Renee Dawson', TSSC: 'Hector Salas' }

const eyebrow = { margin: '0 0 .5em', fontSize: '.72em', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase' as const, color: '#F4941C' }
const h2 = { margin: '0 0 .6em', fontSize: 'clamp(1.6em, 3.8vw, 2.2em)', fontWeight: 700, lineHeight: 1.2, color: '#2680B3' }
const lead = { margin: '0 0 1.2em', fontSize: '1.08em', lineHeight: 1.6, color: '#3C4A55', maxWidth: '40em' }
const card = { background: '#fff', border: '1px solid #DCE7EE', borderRadius: 18, padding: '1.4em 1.6em', boxShadow: '0 16px 40px rgba(6,48,79,.08)' }
const btn = (primary: boolean, disabled = false) => ({ padding: '.85em 1.8em', border: primary ? 'none' : '1.5px solid #C9D6DF', borderRadius: 12, background: disabled ? '#C9D6DF' : primary ? '#F4941C' : '#fff', color: primary ? '#fff' : '#22333F', fontFamily: 'inherit', fontSize: '1em', fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer' } as const)

function StoryList({ from, to }: { from: number; to: number }) {
  return (
    <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '.6em' }}>
      {STORY.slice(from, to).map(([t, b], k) => (
        <li key={t} style={{ display: 'flex', gap: '1em', ...card, padding: '.9em 1.2em', boxShadow: 'none' }}>
          <span style={{ width: '2.2em', height: '2.2em', borderRadius: '50%', background: '#F4941C', color: '#fff', fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{from + k + 1}</span>
          <div><div style={{ fontWeight: 600, color: '#1D6A96' }}>{t}</div><div style={{ lineHeight: 1.5, color: '#3C4A55' }}>{b}</div></div>
        </li>
      ))}
    </ol>
  )
}

function MiniCheck({ id, picked, onPick }: { id: string; picked: number | undefined; onPick: (i: number) => void }) {
  const m: Mini = MINIS[id]
  const answered = picked !== undefined
  const right = answered && picked === m.a
  return (
    <div style={{ ...card, marginTop: '1.6em', borderTop: '5px solid #F4941C' }}>
      <p style={{ margin: '0 0 .3em', fontSize: '.72em', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#8A4E08' }}>Quick check · not scored</p>
      <p style={{ margin: '0 0 .9em', fontSize: '1.08em', fontWeight: 600, color: '#1D6A96', lineHeight: 1.4 }}>{m.q}</p>
      <div style={{ display: 'grid', gap: '.5em' }}>
        {m.opts.map((o, i) => {
          const chosen = picked === i
          const border = answered && i === m.a ? '#1E6B43' : chosen ? '#B23A22' : '#C9D6DF'
          return (
            <button key={i} onClick={() => onPick(i)} style={{ textAlign: 'left', padding: '.75em 1em', border: `2px solid ${border}`, borderRadius: 12, background: answered && i === m.a ? '#EEF7F1' : chosen ? '#FBEDE9' : '#fff', fontFamily: 'inherit', fontSize: '1em', color: '#22333F', cursor: 'pointer' }}>
              <strong style={{ marginRight: '.6em', color: '#2680B3' }}>{String.fromCharCode(65 + i)}</strong>{o}
            </button>
          )
        })}
      </div>
      {answered && (
        <p style={{ margin: '.9em 0 0', padding: '.8em 1em', borderRadius: 12, background: right ? '#EEF7F1' : '#FFF3E4', color: '#22333F', lineHeight: 1.55 }}>
          <strong style={{ color: right ? '#1E6B43' : '#8A4E08' }}>{right ? 'Correct. ' : 'Not quite. '}</strong>{right ? m.ok : m.no}
        </p>
      )}
    </div>
  )
}

export default function Foundation({ navigate, start }: Props) {
  const [s, setS] = useState<Saved>(() => {
    try { const v = { ...EMPTY, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; const pg = start !== undefined ? start : v.page; return { ...v, page: pg === 1 ? 2 : pg } } catch { return EMPTY }
  })
  const [roleOpen, setRoleOpen] = useState<string>('HSW')

  useEffect(() => {
    if (s.first || s.last || s.position) return
    try {
      const n = String(JSON.parse(localStorage.getItem('smc-training-progress') || '{}').n || '').trim()
      const r = localStorage.getItem('smc-my-role') || ''
      if (n || r) setS(p => ({ ...p, first: n.split(' ')[0] || '', last: n.split(' ').slice(1).join(' '), position: ROLE_NAMES[r] || '' }))
    } catch {}
  }, [])
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(s)) } catch {} }, [s])

  const page = s.page
  const set = (patch: Partial<Saved>) => setS(p => ({ ...p, ...patch }))
  const BOUNDARY: Record<number, string> = { 3: '01', 11: '02', 14: '03' }
  const go = (rawN: number) => {
    const n = rawN === 1 ? (rawN > s.page ? 2 : 0) : rawN
    if (n > s.page && BOUNDARY[n]) {
      try { localStorage.setItem(KEY, JSON.stringify({ ...s, page: n })) } catch {}
      const m = claimCelebration(BOUNDARY[n])
      if (m) { navigate({ page: 'celebrate', module: m }); return }
    }
    set({ page: n }); window.scrollTo(0, 0)
  }
  const fullName = `${s.first} ${s.last}`.trim()

  const picks = (id: string) => ({ picked: s.minis[id], onPick: (i: number) => set({ minis: { ...s.minis, [id]: i } }) })

  const correct = ASSESSMENT.filter((q, i) => s.answers[i] === q.a).length
  const pct = Math.round((correct / ASSESSMENT.length) * 100)
  const passed = pct >= PASS_PCT
  const missed = ASSESSMENT.map((q, i) => ({ q, i })).filter(({ q, i }) => s.answers[i] !== q.a)
  const missedTopics = [...new Map(missed.map(({ q }) => [q.topic, q.page])).entries()]

  const member = TEAM.find(t => t.name === ROLE_TO_TEAM[roleOpen])
  const ref = ROLE_REFERENCE[roleOpen]
  const myRole = Object.keys(ROLE_NAMES).find(k => ROLE_NAMES[k] === s.position)

  const id = IDS[page]
  const [showCert, setShowCert] = useState(false)
  const showResult = page === ASSESS && s.submitted

  return (
    <div style={{ minHeight: '100vh', background: '#EAF3F9', color: '#22333F', fontSize: 17, lineHeight: 1.6 }}>
      <Masthead navigate={navigate} currentPage="foundation" />

      <CourseBar kicker="Step 1" title="Aging With Dignity" step={Math.min(page + (page > 1 ? 0 : 1) + (showResult ? 1 : 0), PAGES.length - 1)} total={PAGES.length - 1} onExit={() => navigate({ page: 'home' })} />

      <main key={page + (showResult ? 'r' + showCert : '')} style={{ maxWidth: '62em', margin: '0 auto', padding: '2.2em 1.4em 4em' }}>
        {page < ASSESS && <p style={eyebrow}>{String(page + (page > 1 ? 0 : 1)).padStart(2, '0')} · {PAGES[page]}</p>}

        {id === 'welcome' && (
          <>
            <div style={{ display: 'flex', gap: '1.4em', alignItems: 'center', background: '#1D6A96', borderRadius: 18, padding: '1.4em 1.6em', marginBottom: '1.6em', flexWrap: 'wrap' }}>
              <img src={PORTRAITS.GO} alt="Dr. Grace Okoro" style={{ width: '9em', height: '9em', objectFit: 'cover', objectPosition: 'center 18%', borderRadius: 16, border: '4px solid rgba(255,255,255,.75)' }} />
              <div style={{ flex: '1 1 16em' }}>
                <p style={{ margin: '0 0 .5em', fontSize: '1.3em', lineHeight: 1.45, color: '#fff', fontStyle: 'italic' }}>“Every door is a welcome. No one is reduced to a category.”</p>
                <div style={{ fontWeight: 600, color: '#FFB238' }}>Dr. Grace Okoro · Clinical Director of Housing Services</div>
              </div>
            </div>
            <h2 style={h2}>Welcome to the Aging With Dignity Foundation</h2>
            <p style={lead}>Everyone on the team starts here, because purpose comes before position. First, a quick question to set the tone.</p>
            <MiniCheck id="M1" {...picks('M1')} />
          </>
        )}

        {id === 'journey' && (
          <>
            <h2 style={h2}>{s.first ? `${s.first}, here is your path` : 'Here is your path'}</h2>
            <p style={lead}>Fourteen short screens, one idea each. Nine quick checks along the way are not scored. The skills assessment at the end is: 20 questions, {PASS_PCT}% to pass, unlimited attempts.</p>
            <ol style={{ ...card, listStyle: 'none', margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 16em), 1fr))', gap: '.5em' }}>
              {PAGES.map((p, i) => i === 1 ? null : (
                <li key={p}>
                  <button onClick={() => go(i)} style={{ width: '100%', display: 'flex', gap: '.7em', alignItems: 'center', textAlign: 'left', padding: '.6em .8em', border: 'none', borderRadius: 10, background: i === 2 ? '#FFF3E4' : '#F7FBFD', fontFamily: 'inherit', fontSize: '.96em', color: '#22333F', cursor: 'pointer' }}>
                    <span style={{ width: '1.9em', height: '1.9em', borderRadius: '50%', background: '#2680B3', color: '#fff', fontSize: '.8em', fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i > 1 ? i : i + 1}</span>{p}
                  </button>
                </li>
              ))}
            </ol>
          </>
        )}

        {id === 'about' && (
          <>
            <h2 style={h2}>Serving seniors and families for more than 50 years</h2>
            <p style={lead}>St. Mary’s Center brings seniors and preschool families under one roof.</p>
            <p style={lead}>Our mission begins with Aging with Dignity. Housing is one part of the journey. Dignity comes first.</p>
            <div style={{ margin: '0 0 1.6em' }}><DignityWheel onNext={() => go(page + 1)} /></div>
            <MiniCheck id="M2" {...picks('M2')} />
          </>
        )}

        {id === 'pillars' && (
          <>
            <h2 style={h2}>Six pillars hold up Aging with Dignity</h2>
            <p style={lead}>Pillar 1, Housing Stability, is the work of our department.</p>
            <p style={lead}>Not every member needs every pillar. Support is matched to each member’s goals, needs, and circumstances.</p>
            <MiniCheck id="M6" {...picks('M6')} />
          </>
        )}

        {id === 'awd' && (
          <>
            <h2 style={h2}>Organized around the older adult, not the funding stream</h2>
            <p style={lead}>Seven principles guide every decision we make.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.6em' }}>
              {PRINCIPLES.map((p, i) => (
                <span key={p} style={{ background: '#fff', border: '1.5px solid #DCE7EE', borderLeft: '5px solid #F4941C', borderRadius: 10, padding: '.55em 1em', fontWeight: 600, color: '#1D6A96' }}>
                  <span style={{ color: '#8A4E08', marginRight: '.5em' }}>{i > 1 ? i : i + 1}</span>{p}
                </span>
              ))}
            </div>
            <MiniCheck id="M3" {...picks('M3')} />
          </>
        )}

        {id === 'health' && (
          <>
            <h2 style={h2}>Housing is Health</h2>
            <p style={lead}>Stable housing makes it possible to manage medications, recover, sleep safely, and stay connected.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 13em), 1fr))', gap: '.9em' }}>
              {[['1 in 5', 'unhoused U.S. adults are 55 or older'], ['1 in 2', 'unhoused adults in California are 50 or older'], ['1 in 4', 'unhoused adults in Alameda County are 55 or older']].map(([n, t]) => (
                <div key={n} style={{ ...card, textAlign: 'center' }}>
                  <div style={{ fontSize: '2.6em', fontWeight: 600, color: '#F4941C', lineHeight: 1 }}>{n}</div>
                  <div style={{ marginTop: '.4em', color: '#3C4A55', lineHeight: 1.4 }}>{t}</div>
                </div>
              ))}
            </div>
            <MiniCheck id="M4" {...picks('M4')} />
          </>
        )}

        {id === 'turner1' && (
          <>
            <h2 style={h2}>Meet Ms. Turner</h2>
            <p style={lead}>Ms. Turner is 68. After a serious illness she fell behind on rent and lost her apartment. Follow her journey, and watch who carries her forward.</p>
            <div style={{ display: 'flex', gap: '1.2em', alignItems: 'center', flexWrap: 'wrap', margin: '0 0 1.2em', ...card }}>
              <div style={{ width: '9em', height: '9em', borderRadius: 16, overflow: 'hidden', flexShrink: 0 }}><Portrait initials="ET" alt="Ms. Evelyn Turner" /></div>
              <p style={{ margin: 0, flex: '1 1 14em', fontStyle: 'italic', fontSize: '1.15em', color: '#1D6A96' }}>“I just want a safe, stable place to call home.”<br /><span style={{ fontStyle: 'normal', fontSize: '.75em', color: '#5A6873' }}>Ms. Evelyn Turner, member, 68</span></p>
            </div>
            <StoryList from={0} to={3} />
          </>
        )}

        {id === 'turner2' && (
          <>
            <h2 style={h2}>Ms. Turner finds a home</h2>
            <p style={lead}>The baton moves from hand to hand, and no one starts over.</p>
            <StoryList from={3} to={6} />
          </>
        )}

        {id === 'turner3' && (
          <>
            <h2 style={h2}>Ms. Turner stays housed</h2>
            <p style={lead}>Housing is only the beginning.</p>
            <StoryList from={6} to={9} />
            <MiniCheck id="M9" {...picks('M9')} />
          </>
        )}

        {id === 'spectrum' && (
          <>
            <h2 style={h2}>The Housing Spectrum</h2>
            <p style={lead}>Where a senior is, and what we do. Tap a stage.</p>
            <HousingSpectrum />
            <MiniCheck id="M5" {...picks('M5')} />
          </>
        )}

        {id === 'programs' && (
          <>
            <h2 style={h2}>Our department</h2>
            <p style={lead}>Housing Clinic is the heartbeat. Around it, every program is a door.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5em', marginBottom: '1.4em' }}>
              {PROGRAMS.map(p => (
                <span key={p} style={{ padding: '.5em 1em', borderRadius: 999, background: p === 'Housing Clinic' ? '#F4941C' : '#fff', color: p === 'Housing Clinic' ? '#fff' : '#1D6A96', border: '1.5px solid #DCE7EE', fontWeight: 600 }}>{p}</span>
              ))}
            </div>
          </>
        )}

        {id === 'roles' && (
          <>
            <h2 style={h2}>Our roles</h2>
            <p style={{ ...lead, marginBottom: '.6em' }}>Select a role to see what it owns.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 11em), 1fr))', gap: '.6em', marginBottom: '1em' }}>
              {Object.keys(ROLE_TO_TEAM).map(k => (
                <button key={k} onClick={() => setRoleOpen(k)} style={{ position: 'relative', textAlign: 'left', padding: '.7em .9em', border: `2px solid ${roleOpen === k ? '#2680B3' : '#DCE7EE'}`, borderRadius: 12, background: roleOpen === k ? '#E8F1F6' : '#fff', fontFamily: 'inherit', cursor: 'pointer' }}>
                  {myRole === k && <span style={{ position: 'absolute', top: -9, right: 8, background: '#F4941C', color: '#fff', fontSize: '.66em', fontWeight: 700, padding: '.2em .7em', borderRadius: 999 }}>YOU</span>}
                  <div style={{ fontWeight: 600, fontSize: '.9em', color: '#1D6A96', lineHeight: 1.3 }}>{ROLE_NAMES[k]}</div>
                  <div style={{ fontSize: '.78em', color: '#5A6873' }}>{ROLE_TO_TEAM[k]}</div>
                </button>
              ))}
            </div>
            {ref && (
              <div style={{ ...card, display: 'flex', gap: '1.2em', flexWrap: 'wrap' }}>
                {member && <div style={{ width: '6.5em', height: '6.5em', borderRadius: 14, overflow: 'hidden', flexShrink: 0 }}><Portrait initials={member.initials} alt={member.name} /></div>}
                <div style={{ flex: '1 1 18em' }}>
                  <div style={{ fontWeight: 600, fontSize: '1.15em', color: '#1D6A96' }}>{ROLE_NAMES[roleOpen]} · {ROLE_TO_TEAM[roleOpen]}</div>
                  <div style={{ fontSize: '.84em', color: '#6C7A85', marginBottom: '.5em' }}>{ref.reports}</div>
                  <p style={{ margin: 0, lineHeight: 1.55 }}><strong style={{ color: '#2680B3' }}>Owns: </strong>{ref.owns}</p>
                </div>
              </div>
            )}
            <MiniCheck id="M7" {...picks('M7')} />
          </>
        )}

        {id === 'team' && (
          <>
            <h2 style={h2}>One journey. One team.</h2>
            <p style={lead}>No one person changed Ms. Turner’s life. A coordinated team did. Each role builds on the role before it, and no one starts over.</p>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '.4em', marginBottom: '1.4em' }}>
              {([
                ['Tanya Wells', 'Outreach'],
                ['Marisol Vega', 'S1+S2'],
                ['Elena Castro', 'S3+S4'],
                ['Carla Montez', 'S5+S6'],
                ['Hector Salas', 'S7+Home'],
              ] as const).map(([n, legKey], i, a) => {
                const m = TEAM.find(t => t.name === n)!
                const leg = legKey.split('+').map(k => k === 'Outreach' || k === 'Home' ? (k === 'Home' ? 'Home, and kept' : 'Outreach') : String((CONTENT as any)[k].title).replace(/^CE Step \d+\s*·\s*/, '')).join(' and ')
                return (
                  <div key={n} style={{ display: 'flex', alignItems: 'center', gap: '.4em' }}>
                    <div style={{ textAlign: 'center', width: '8.2em' }}>
                      <div style={{ width: '4.4em', height: '4.4em', margin: '0 auto .3em', borderRadius: 14, background: m.color, color: '#fff', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                        <Portrait initials={m.initials} alt={n} />
                      </div>
                      <div style={{ fontSize: '.8em', fontWeight: 600, color: '#1D6A96' }}>{n.split(' ')[0]}</div>
                      <div style={{ fontSize: '.72em', color: '#5A6873', lineHeight: 1.3 }}>{leg}</div>
                    </div>
                    {i < a.length - 1 && <span style={{ color: '#F4941C', fontWeight: 700, fontSize: '1.3em' }}>→</span>}
                  </div>
                )
              })}
            </div>
            <p style={{ margin: '0 0 1.2em', fontSize: '.9em', color: '#5A6873' }}>These are the same stages as the member journey track in the Coordinated Entry Academy.</p>
            <img src={batonCover} alt="The St. Mary's Center team holding a baton marked One Team." style={{ display: 'block', width: '100%', borderRadius: 18, boxShadow: '0 16px 40px rgba(6,48,79,.15)' }} />
            <MiniCheck id="M8" {...picks('M8')} />
          </>
        )}

        {page === ASSESS && !s.submitted && <Assessment s={s} set={set} />}

        {showResult && (
          <>
            <div style={{ ...card, borderTop: `8px solid ${passed ? '#1E6B43' : '#F4941C'}`, marginBottom: '1.4em' }}>
              <p style={eyebrow}>Result</p>
              <h2 style={{ ...h2, color: '#1D6A96' }}>{passed ? 'Congratulations!' : 'You’re almost there.'}</h2>
              <p style={lead}>
                {passed
                  ? 'You have passed the Senior Housing Services check. Your single Academy certificate comes after the final assessment (Module 10).'
                  : `You answered ${correct} of ${ASSESSMENT.length} correctly (${pct}%). You need ${PASS_PCT}% to pass. Review the topics below and retake as many times as you like.`}
              </p>
              {passed && <p style={{ margin: '0 0 1em', fontWeight: 600 }}>{correct} of {ASSESSMENT.length} correct · {pct}%</p>}
              <div style={{ display: 'flex', gap: '.8em', flexWrap: 'wrap' }}>
                <button onClick={() => { set({ answers: {}, submitted: false }); window.scrollTo(0, 0) }} style={btn(!passed)}>Retake assessment</button>
                {passed && <button onClick={() => navigate({ page: 'academy' })} style={btn(false)}>Continue to your role academy →</button>}
                <button onClick={() => navigate({ page: 'home' })} style={btn(false)}>Save and exit</button>
              </div>
            </div>
            {!passed && missedTopics.length > 0 && (
              <div style={card}>
                <p style={{ margin: '0 0 .6em', fontWeight: 600, color: '#1D6A96' }}>Topics to review</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5em' }}>
                  {missedTopics.map(([t, pg]) => (
                    <button key={t} onClick={() => { setShowCert(false); go(OLD_PAGE[pg] ?? 2) }} style={{ padding: '.55em 1.1em', border: '1.5px solid #2680B3', borderRadius: 999, background: '#fff', color: '#2680B3', fontFamily: 'inherit', fontWeight: 600, cursor: 'pointer' }}>{t} → screen {(OLD_PAGE[pg] ?? 2) + 1}</button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {page !== ASSESS && (
          <div style={{ marginTop: '2em', display: 'flex', justifyContent: 'space-between', gap: '.8em', flexWrap: 'wrap' }}>
            <button onClick={() => go(page - 1)} disabled={page === 0} style={{ ...btn(false), visibility: page === 0 ? 'hidden' : 'visible' }}>← Back</button>
            <button onClick={() => go(page + 1)} style={btn(true)}>
              {id === 'welcome' ? 'Get started' : page === ASSESS - 1 ? 'Start the assessment' : 'Next'} →
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

function Assessment({ s, set }: { s: Saved; set: (p: Partial<Saved>) => void }) {
  const [i, setI] = useState(0)
  const q = ASSESSMENT[i]
  const last = i === ASSESSMENT.length - 1
  const allAnswered = ASSESSMENT.every((_, n) => s.answers[n] !== undefined)
  return (
    <>
      <p style={eyebrow}>11 · Skills Assessment · Question {i + 1} of {ASSESSMENT.length}</p>
      <p style={{ margin: '0 0 .4em', fontSize: '.8em', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: '#8A4E08' }}>{q.topic}</p>
      <h2 style={{ ...h2, color: '#1D6A96', fontSize: 'clamp(1.3em, 3vw, 1.7em)' }}>{q.q}</h2>
      <div style={{ display: 'grid', gap: '.6em' }}>
        {q.opts.map((o, n) => {
          const chosen = s.answers[i] === n
          return (
            <button key={n} onClick={() => set({ answers: { ...s.answers, [i]: n } })} style={{ textAlign: 'left', padding: '.85em 1.1em', border: `2px solid ${chosen ? '#2680B3' : '#C9D6DF'}`, borderRadius: 12, background: chosen ? '#E8F1F6' : '#fff', fontFamily: 'inherit', fontSize: '1em', color: '#22333F', cursor: 'pointer' }}>
              <strong style={{ marginRight: '.7em', color: '#2680B3' }}>{String.fromCharCode(65 + n)}</strong>{o}
            </button>
          )
        })}
      </div>
      <p style={{ margin: '1em 0 0', fontSize: '.84em', color: '#6C7A85' }}>No feedback until the end. You can go back and change an answer.</p>
      <div style={{ marginTop: '1.6em', display: 'flex', justifyContent: 'space-between', gap: '.8em', flexWrap: 'wrap' }}>
        <button onClick={() => i === 0 ? set({ page: ASSESS - 1 }) : setI(i - 1)} style={btn(false)}>← Back</button>
        {last
          ? <button disabled={!allAnswered} onClick={() => { set({ submitted: true }); window.scrollTo(0, 0) }} style={btn(true, !allAnswered)}>{allAnswered ? 'See my results' : 'Answer every question to finish'}</button>
          : <button disabled={s.answers[i] === undefined} onClick={() => setI(i + 1)} style={btn(true, s.answers[i] === undefined)}>Next →</button>}
      </div>
    </>
  )
}
