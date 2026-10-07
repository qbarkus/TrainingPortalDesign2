import { useEffect, useState } from 'react'
import type { Route } from '../App'
import { SanjayButton } from '../components/AskSanjay'
import smcLogo from '../imports/SMC_Official_Logo_Horizontal.png'
import { KYP, LEGS, ORDER, BANK } from '../data/kyp'

const KEY = 'smc-kyp'
const NAVY = '#12476A'
export const KYP_STEPS = ['Who you are', 'What you own', 'A day in the life', 'Scenario']
export const readKyp = (): Record<string, number[]> => { try { return JSON.parse(localStorage.getItem(KEY) || '{}') } catch { return {} } }
const saveKyp = (role: string, step: number) => { try { const k = readKyp(); k[role] = [...new Set([...(k[role] || []), step])]; localStorage.setItem(KEY, JSON.stringify(k)) } catch {} }

const eyebrow = { margin: '0 0 .6em', fontSize: '.78em', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase' as const, color: '#F4941C' }
const h1 = { margin: '0 0 .5em', fontSize: 'clamp(2em, 5vw, 3.2em)', fontWeight: 800, lineHeight: 1.1, color: NAVY, letterSpacing: '-.01em' }
const lead = { margin: '0 0 1em', fontSize: '1.12em', color: '#2E3E4A' }
const btn = (primary: boolean, off = false) => ({ padding: '.85em 1.9em', border: primary ? 'none' : '1.5px solid #C9D6DF', borderRadius: 999, background: off ? '#C9D6DF' : primary ? '#F4941C' : '#fff', color: primary ? '#fff' : '#22333F', fontFamily: 'inherit', fontSize: '1em', fontWeight: 700, cursor: off ? 'not-allowed' : 'pointer' }) as const

function Relay({ legs }: { legs: number[] }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4em', alignItems: 'center', margin: '0 0 1.4em' }}>
      {LEGS.map((l, i) => (
        <span key={l} style={{ display: 'inline-flex', alignItems: 'center', gap: '.4em' }}>
          <span style={{ padding: '.4em 1em', borderRadius: 999, fontSize: '.82em', fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', background: legs.includes(i) ? NAVY : '#fff', color: legs.includes(i) ? '#fff' : '#6B7A86', border: `1.5px solid ${legs.includes(i) ? NAVY : '#C9D6DF'}` }}>{l}</span>
          {i < LEGS.length - 1 && <span style={{ color: '#F4941C', fontWeight: 800 }}>→</span>}
        </span>
      ))}
    </div>
  )
}

function Choice({ opts, picked, best, onPick }: { opts: string[]; picked: number | null; best: number; onPick: (i: number) => void }) {
  return (
    <div style={{ display: 'grid', gap: '.6em' }}>
      {opts.map((o, i) => {
        const done = picked !== null
        const good = done && i === best, bad = done && picked === i && i !== best
        return <button key={i} disabled={done} onClick={() => onPick(i)} style={{ textAlign: 'left', display: 'flex', gap: '.8em', padding: '.85em 1.1em', borderRadius: 14, fontFamily: 'inherit', fontSize: '1em', cursor: done ? 'default' : 'pointer', color: '#22333F', background: good ? '#E3F3EA' : bad ? '#FBECE8' : '#fff', border: `2px solid ${good ? '#2E7D50' : bad ? '#C4462F' : '#C9D6DF'}` }}><strong style={{ color: good ? '#2E7D50' : bad ? '#C4462F' : '#1D6A96' }}>{String.fromCharCode(65 + i)}</strong><span>{o}</span></button>
      })}
    </div>
  )
}

const SYSTEM_Q = { q: 'A staff member notices something outside their role. What does strong role clarity mean?', opts: ['Ignore it because another role owns it.', 'Take it over so the member does not have to wait.', 'Recognize it, address immediate safety if needed, and make a clear handoff to the role that owns it.', 'Tell the member which department to call.'], best: 2, why: '“Not mine to own” should never become “not my concern.”' }

// pages: 0 opening, 1 how SHS works, 2 read the system, 3 find your position, 4-7 role, 8 baton moments, 9 bank, 10 closing
const LAST = 10

export default function Kyp({ navigate, role: initial }: { navigate: (r: Route) => void; role?: string }) {
  const [role, setRole] = useState<string>(initial && KYP[initial] ? initial : '')
  const [p, setP] = useState(0)
  const [sys, setSys] = useState<number | null>(null)
  const [sc, setSc] = useState<number | null>(null)
  const [open, setOpen] = useState<number[]>([])
  const pos = role ? KYP[role] : null

  const go = (n: number) => { setP(n); setSc(null); window.scrollTo(0, 0) }
  useEffect(() => { if (role && p >= 4 && p <= 7) saveKyp(role, p - 4) }, [role, p])
  const pct = Math.round((p / LAST) * 100)
  const exit = () => navigate({ page: 'home' })
  const blocked = (p === 2 && sys === null) || (p === 3 && !role) || (p === 7 && sc === null)

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #fff 0%, #EAF3F9 100%)', color: '#22333F', fontSize: 17, lineHeight: 1.65, display: 'flex', flexDirection: 'column' }}>
      <header style={{ background: 'rgba(255,255,255,.94)', borderBottom: '1px solid #DCE7EE', position: 'sticky', top: 0, zIndex: 20 }}>
        <div style={{ maxWidth: '64em', margin: '0 auto', padding: '.7em 1.4em', display: 'flex', alignItems: 'center', gap: '1.2em', flexWrap: 'wrap' }}>
          <img src={smcLogo} alt="St. Mary's Center" style={{ height: 42, width: 'auto' }} />
          <span style={{ borderLeft: '2px solid #DCE7EE', paddingLeft: '1.2em', fontWeight: 700, color: '#1D6A96', fontSize: '.95em' }}>Know Your Position</span>
          <div style={{ flex: '1 1 12em', minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.84em', color: '#5A6873', fontWeight: 600 }}><span>{pos && p >= 4 && p <= 7 ? pos.name : `Screen ${p + 1} of ${LAST + 1}`}</span><span>{pct}%</span></div>
            <div style={{ height: 8, borderRadius: 999, background: '#E1EAF0', overflow: 'hidden' }}><div style={{ height: '100%', width: pct + '%', background: '#F4941C', borderRadius: 999, transition: 'width .3s' }} /></div>
          </div>
          <button onClick={exit} style={{ ...btn(false), padding: '.55em 1.2em', fontSize: '.9em', color: '#C0610A', borderColor: '#F4C58A' }}>Save &amp; Exit</button>
          <SanjayButton />
        </div>
      </header>

      <main key={p} style={{ flex: 1, width: '100%', maxWidth: '52em', margin: '0 auto', padding: '2.6em 1.4em 3em' }}>
        {p === 0 && (<>
          <p style={eyebrow}>Know your position</p>
          <h1 style={h1}>One journey. Different seats. One standard of care.</h1>
          <p style={lead}>Senior Housing Services works like a relay. No one person is supposed to do everything.</p>
          <p style={lead}>Outreach builds trust. Membership opens the door. Assessment helps us understand the need. Finding Home turns a plan into housing. Keeping Home helps housing last.</p>
          <p style={lead}>The strength of the system is not that everyone knows how to do everyone else’s job. It is that every person knows:</p>
          <ul style={{ margin: '0 0 1em', padding: 0, listStyle: 'none', display: 'grid', gap: '.5em' }}>
            {['What do I own?', 'What is not mine to own?', 'Who gives me the baton?', 'Who receives it next?', 'How do I know the handoff actually happened?'].map(t => <li key={t} style={{ borderLeft: '4px solid #F4941C', background: '#fff', borderRadius: '0 12px 12px 0', padding: '.6em 1em', fontWeight: 700, color: NAVY }}>{t}</li>)}
          </ul>
          <p style={lead}>That is what this part of the academy is about.</p>
        </>)}

        {p === 1 && (<>
          <p style={eyebrow}>01 · How SHS works</p>
          <h1 style={h1}>Five connected parts</h1>
          <Relay legs={[0, 1, 2, 3, 4]} />
          <p style={lead}>Each role protects a different part of that journey. Aging With Dignity shows up here in a very practical way.</p>
          <p style={lead}>When staff ownership is clear, members repeat themselves less. Tasks do not quietly sit in queues. Two staff people do not unknowingly work the same issue. And a member is less likely to hear: “I thought somebody else was handling that.”</p>
          <p style={{ ...lead, fontWeight: 700, color: NAVY }}>Role clarity is not bureaucracy. Role clarity is continuity of care.</p>
        </>)}

        {p === 2 && (<>
          <p style={eyebrow}>01 · Read the system</p>
          <h1 style={h1}>Read the System</h1>
          <p style={{ ...lead, fontWeight: 700, color: NAVY }}>{SYSTEM_Q.q}</p>
          <Choice opts={SYSTEM_Q.opts} picked={sys} best={SYSTEM_Q.best} onPick={setSys} />
          {sys !== null && <div style={{ marginTop: '1.2em', padding: '1em 1.2em', borderRadius: 14, background: sys === SYSTEM_Q.best ? '#E3F3EA' : '#FFF4DE', borderLeft: `5px solid ${sys === SYSTEM_Q.best ? '#2E7D50' : '#F4941C'}` }}><strong>{sys === SYSTEM_Q.best ? 'Right. ' : 'Not quite. The strongest response is C. '}</strong><span style={{ color: NAVY, fontWeight: 700 }}>Why it matters: </span>{SYSTEM_Q.why}</div>}
        </>)}

        {p === 3 && (<>
          <p style={eyebrow}>02 · Find your position</p>
          <h1 style={h1}>Where do you sit in the relay?</h1>
          <p style={lead}>Choose your position to see the work through your seat.</p>
          <div style={{ display: 'grid', gap: '.5em' }}>
            {ORDER.map(id => {
              const on = role === id, done = (readKyp()[id] || []).length >= KYP_STEPS.length
              return <button key={id} onClick={() => setRole(id)} style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between', gap: '1em', padding: '.85em 1.1em', borderRadius: 14, fontFamily: 'inherit', fontSize: '1.02em', fontWeight: 700, cursor: 'pointer', color: on ? '#fff' : NAVY, background: on ? NAVY : '#fff', border: `2px solid ${on ? NAVY : '#C9D6DF'}` }}><span>{KYP[id].name}</span>{done && <span style={{ color: on ? '#fff' : '#2E7D50' }}>✓ viewed</span>}</button>
            })}
          </div>
          <p style={{ margin: '1.4em 0 0', color: '#5A6873', fontWeight: 600 }}>Different responsibilities. Shared accountability.</p>
        </>)}

        {pos && p === 4 && (<>
          <p style={eyebrow}>{pos.name} · Who you are</p>
          <Relay legs={pos.legs} />
          <h1 style={h1}>{pos.headline}</h1>
          {pos.who.map((t, i) => <p key={i} style={lead}>{t}</p>)}
        </>)}

        {pos && p === 5 && (<>
          <p style={eyebrow}>{pos.name} · What you own</p>
          <h1 style={h1}>You own</h1>
          <ul style={{ margin: '0 0 1.6em', padding: 0, listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: '.5em' }}>
            {pos.owns.map(t => <li key={t} style={{ padding: '.45em 1em', borderRadius: 999, background: '#fff', border: '1.5px solid #C9D6DF', fontWeight: 600, color: NAVY }}>{t}</li>)}
          </ul>
          {pos.hand && (<>
            <p style={{ ...eyebrow, color: '#8A4E08' }}>{pos.handHead ?? 'Not yours → hand it to'}</p>
            <div style={{ display: 'grid', gap: '.5em' }}>
              {pos.hand.map(([a, b]) => <div key={a} style={{ display: 'flex', gap: '.8em', alignItems: 'baseline', flexWrap: 'wrap', background: '#fff', borderRadius: 12, borderLeft: '5px solid #F4941C', padding: '.6em 1em' }}><strong style={{ color: NAVY }}>{a}</strong><span style={{ color: '#F4941C', fontWeight: 800 }}>→</span><span>{b}</span></div>)}
            </div>
          </>)}
        </>)}

        {pos && p === 6 && (<>
          <p style={eyebrow}>{pos.name} · A day in the life</p>
          <h1 style={h1}>A day in the life</h1>
          <ol style={{ margin: '0 0 1.4em', padding: 0, listStyle: 'none', position: 'relative' }}>
            {pos.dayRail.map((t, i) => (
              <li key={i} style={{ display: 'flex', gap: '1em', paddingBottom: '1em', position: 'relative' }}>
                <span style={{ position: 'relative', flex: '0 0 auto', width: 22 }}>
                  <span style={{ display: 'block', width: 16, height: 16, borderRadius: '50%', background: i === 0 ? '#F4941C' : '#fff', border: '3px solid #F4941C', margin: '.35em 3px 0' }} />
                  {i < pos.dayRail.length - 1 && <span style={{ position: 'absolute', left: 10, top: 26, bottom: -12, width: 2, background: '#F4C58A' }} />}
                </span>
                <span style={{ fontSize: i === 0 ? '1.15em' : '1.05em', fontWeight: i === 0 ? 700 : 500, color: i === 0 ? NAVY : '#2E3E4A' }}>{t}</span>
              </li>
            ))}
          </ol>
          <div style={{ background: NAVY, color: '#fff', borderRadius: 18, padding: '1.2em 1.4em' }}>
            {pos.dayClose.map((t, i) => <p key={i} style={{ margin: i ? '.6em 0 0' : 0, fontSize: '1.08em', fontWeight: i === pos.dayClose.length - 1 ? 700 : 500 }}>{t}</p>)}
          </div>
        </>)}

        {pos && p === 7 && (<>
          <p style={eyebrow}>{pos.name} · Practice, not scored</p>
          <h1 style={h1}>{pos.scenario.title}</h1>
          <p style={{ margin: '0 0 1em', fontSize: '1.12em', padding: '1em 1.2em', background: '#fff', borderRadius: 14, border: '1px solid #DCE7EE' }}>{pos.scenario.setup}</p>
          <p style={{ ...lead, fontWeight: 800, color: NAVY }}>{pos.scenario.q}</p>
          <Choice opts={pos.scenario.opts} picked={sc} best={pos.scenario.best} onPick={setSc} />
          {sc !== null && <div style={{ marginTop: '1.2em', padding: '1em 1.2em', borderRadius: 14, background: sc === pos.scenario.best ? '#E3F3EA' : '#FFF4DE', borderLeft: `5px solid ${sc === pos.scenario.best ? '#2E7D50' : '#F4941C'}` }}><strong>{sc === pos.scenario.best ? 'Strong response. ' : `The strong response is ${String.fromCharCode(65 + pos.scenario.best)}. `}</strong><span style={{ color: NAVY, fontWeight: 700 }}>{pos.scenario.label}: </span>{pos.scenario.why}</div>}
        </>)}

        {p === 8 && (<>
          <p style={eyebrow}>The two baton moments</p>
          <h1 style={h1}>Some handoffs change the entire case.</h1>
          <p style={lead}>Under the current v9 SHS model, two transitions deserve special attention.</p>
          <div style={{ display: 'grid', gap: '1em', margin: '0 0 1.4em' }}>
            <div style={{ background: '#fff', borderRadius: 16, borderLeft: '6px solid #F4941C', padding: '1em 1.3em' }}><p style={{ ...eyebrow, margin: 0 }}>Transitional Housing approval</p><p style={{ margin: '.3em 0 0', fontWeight: 800, color: NAVY, fontSize: '1.1em' }}>Housing Navigator → TSHC</p><p style={{ margin: '.3em 0 0' }}>The Housing Navigator closes their Care Plan. The TSHC assumes the hybrid TH/Housing Navigation work.</p></div>
            <div style={{ background: '#fff', borderRadius: 16, borderLeft: '6px solid #F4941C', padding: '1em 1.3em' }}><p style={{ ...eyebrow, margin: 0 }}>Permanent lease signature</p><p style={{ margin: '.3em 0 0', fontWeight: 800, color: NAVY, fontSize: '1.1em' }}>Finding Home → TSS / Keeping Home</p><p style={{ margin: '.3em 0 0' }}>The permanent-housing transition activates the stabilization phase.</p></div>
          </div>
          <div style={{ background: NAVY, color: '#fff', borderRadius: 18, padding: '1.2em 1.4em', fontWeight: 800, fontSize: '1.15em', lineHeight: 1.5 }}>An application is not a handoff.<br />An offer is not a handoff.<br />A start date is not a handoff.</div>
        </>)}

        {p === 9 && (<>
          <p style={eyebrow}>Practice · Not scored</p>
          <h1 style={h1}>Handoff practice</h1>
          <p style={lead}>Eight situations to think through. Tap one to see the strong response.</p>
          <div style={{ display: 'grid', gap: '.6em' }}>
            {BANK.map((b, i) => {
              const on = open.includes(i)
              return (
                <div key={i} style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #DCE7EE', padding: '.9em 1.1em' }}>
                  <button onClick={() => setOpen(o => on ? o.filter(x => x !== i) : [...o, i])} style={{ all: 'unset', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', gap: '1em', width: '100%', fontWeight: 800, color: NAVY }}><span>{i + 1}. {b.title}</span><span style={{ color: '#F4941C' }}>{on ? '−' : '+'}</span></button>
                  <p style={{ margin: '.4em 0 0' }}>{b.setup}</p>
                  {on && <div style={{ marginTop: '.6em', paddingTop: '.6em', borderTop: '1px solid #DCE7EE' }}><p style={{ margin: 0 }}><strong style={{ color: '#1E6B43' }}>Best response: </strong>{b.best}</p><p style={{ margin: '.3em 0 0', color: '#3C4A55' }}><strong style={{ color: NAVY }}>Teaching point: </strong>{b.point}</p></div>}
                </div>
              )
            })}
          </div>
        </>)}

        {p === 10 && (<>
          <p style={eyebrow}>Know your position · Complete</p>
          <h1 style={h1}>Know your work. Know your boundary. Know your handoff.</h1>
          <p style={lead}>Being part of a strong team does not mean doing everything. It means understanding your responsibility well enough to carry it fully, and understanding the next role well enough to pass the work cleanly.</p>
          <p style={lead}>Before you leave this section, you should be able to answer five questions:</p>
          <ul style={{ margin: '0 0 1em', padding: 0, listStyle: 'none', display: 'grid', gap: '.5em' }}>
            {['What do I own?', 'What do I not own?', 'Who gives me the baton?', 'Who receives it next?', 'What does a completed handoff look like?'].map(t => <li key={t} style={{ borderLeft: '4px solid #F4941C', background: '#fff', borderRadius: '0 12px 12px 0', padding: '.6em 1em', fontWeight: 700, color: NAVY }}>{t}</li>)}
          </ul>
          <p style={lead}>When those answers are clear, members experience something important: not ten separate staff people. One coordinated team.</p>
          <div style={{ background: NAVY, color: '#fff', borderRadius: 18, padding: '1.2em 1.4em', margin: '1.4em 0' }}><strong style={{ fontSize: '1.2em' }}>You know your position.</strong><p style={{ margin: '.3em 0 0' }}>Next, we practice how your seat connects to the larger housing system.</p></div>
          <div style={{ display: 'flex', gap: '.8em', flexWrap: 'wrap' }}>
            <button onClick={() => go(3)} style={btn(false)}>See another position</button>
            <button onClick={exit} style={btn(true)}>Back to my path →</button>
          </div>
        </>)}
      </main>

      <footer style={{ borderTop: '1px solid #DCE7EE', background: 'rgba(255,255,255,.94)' }}>
        <div style={{ maxWidth: '52em', margin: '0 auto', padding: '.9em 1.4em', display: 'flex', justifyContent: 'space-between', gap: '.8em' }}>
          <button onClick={() => go(p - 1)} style={{ ...btn(false), visibility: p === 0 ? 'hidden' : 'visible' }}>← Back</button>
          {p < LAST && <button disabled={blocked} onClick={() => go(p === 3 && !role ? 3 : p + 1)} style={btn(true, blocked)}>{p === 0 ? 'Begin' : 'Continue'} →</button>}
        </div>
      </footer>
    </div>
  )
}
