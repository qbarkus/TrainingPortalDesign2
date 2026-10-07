import { useEffect, useMemo, useRef, useState } from 'react'
import type { Route } from '../App'
import { SanjayButton } from '../components/AskSanjay'
import Portrait from '../components/Portrait'
import arrival from '../imports/road-home-arrival.jpg'
import team from '../imports/team-cover.png'
import smcLogo from '../imports/SMC_Official_Logo_Horizontal.png'
import { SCREENS, ASSESSMENT } from '../data/dignity'
import slide_welcome from '../imports/ChatGPT_Image_Oct_6__2026__02_05_37_AM-1.png'
import slide_framework from '../imports/ChatGPT_Image_Oct_6__2026__02_05_38_AM-2.png'
import slide_ageism1 from '../imports/ChatGPT_Image_Oct_6__2026__02_05_39_AM-3.png'
import slide_ageism2 from '../imports/ChatGPT_Image_Oct_6__2026__02_05_40_AM-4.png'
import slide_ageism3 from '../imports/ChatGPT_Image_Oct_6__2026__02_05_41_AM-5.png'
import slide_practice from '../imports/ChatGPT_Image_Oct_6__2026__02_05_42_AM-6.png'
import slide_door from '../imports/ChatGPT_Image_Oct_6__2026__02_05_43_AM-7.png'
import slide_spectrum from '../imports/ChatGPT_Image_Oct_6__2026__02_05_51_AM-8.png'
import slide_supports from '../imports/ChatGPT_Image_Oct_6__2026__02_05_52_AM-9.png'
import slide_move from '../imports/ChatGPT_Image_Oct_6__2026__02_05_53_AM-10.png'
const SLIDES = { welcome: slide_welcome, framework: slide_framework, ageism1: slide_ageism1, ageism2: slide_ageism2, ageism3: slide_ageism3, practice: slide_practice, door: slide_door, spectrum: slide_spectrum, supports: slide_supports, move: slide_move }
const QUIZ = [{ yes: true, why: 'Assuming someone cannot learn because of age is an age-based assumption.' }, { yes: false, why: 'Offering a seat is a courtesy, not a judgment about ability.' }, { yes: true, why: 'Talking over an older adult treats their voice as less important.' }, { yes: false, why: 'Asking what would help puts the person in charge of their own support.' }]
const QX = [[2.4, 23.6], [27.1, 48.3], [51.8, 72.9], [76.5, 97.6]]

const KEY = 'smc-dignity'
const NAVY = '#12476A'
const PASS = 80
type Saved = { page: number; picks: Record<string, number>; answers: Record<number, number>; order: number[]; submitted: boolean; passed: boolean }
const fresh = (): Saved => ({ page: 0, picks: {}, answers: {}, order: shuffle(ASSESSMENT.map((_, i) => i)), submitted: false, passed: false })
const ASSESS = SCREENS.length

function shuffle<T>(a: T[]): T[] { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]] } return b }

const eyebrow = { margin: '0 0 .6em', fontSize: '.78em', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase' as const, color: '#F4941C' }
const h1 = { margin: '0 0 .5em', fontSize: 'clamp(2em, 5vw, 3.2em)', fontWeight: 800, lineHeight: 1.1, color: NAVY, letterSpacing: '-.01em' }
const btn = (primary: boolean, off = false) => ({ padding: '.85em 1.9em', border: primary ? 'none' : '1.5px solid #C9D6DF', borderRadius: 999, background: off ? '#C9D6DF' : primary ? '#F4941C' : '#fff', color: primary ? '#fff' : '#22333F', fontFamily: 'inherit', fontSize: '1em', fontWeight: 700, cursor: off ? 'not-allowed' : 'pointer' }) as const

function Options({ opts, picked, a, onPick }: { opts: string[]; picked: number | undefined; a: number; onPick: (i: number) => void }) {
  const done = picked !== undefined
  return (
    <div style={{ display: 'grid', gap: '.6em' }}>
      {opts.map((o, i) => {
        const good = done && i === a, bad = done && picked === i && i !== a
        return (
          <button key={i} disabled={done} onClick={() => onPick(i)} style={{ textAlign: 'left', display: 'flex', gap: '.8em', padding: '.85em 1.1em', borderRadius: 14, fontFamily: 'inherit', fontSize: '1em', cursor: done ? 'default' : 'pointer', color: '#22333F', background: good ? '#E3F3EA' : bad ? '#FBECE8' : '#fff', border: `2px solid ${good ? '#2E7D50' : bad ? '#C4462F' : '#C9D6DF'}` }}>
            <strong style={{ color: good ? '#2E7D50' : bad ? '#C4462F' : '#1D6A96' }}>{String.fromCharCode(65 + i)}</strong><span>{o}</span>
          </button>
        )
      })}
    </div>
  )
}

export default function Dignity({ navigate }: { navigate: (r: Route) => void }) {
  const [s, setS] = useState<Saved>(() => {
    try {
      const v = JSON.parse(localStorage.getItem(KEY) || 'null')
      if (v && typeof v.page === 'number' && Array.isArray(v.order) && v.order.length === ASSESSMENT.length) return { ...fresh(), ...v, page: Math.min(v.page, ASSESS) }
    } catch {}
    return fresh()
  })
  const [qi, setQi] = useState(0)
  const [reflect, setReflect] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const mainRef = useRef<HTMLElement>(null)
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(s)) } catch {} }, [s])
  useEffect(() => () => { try { window.speechSynthesis?.cancel() } catch {} }, [])

  const [bridge, setBridge] = useState(false)
  const [bPick, setBPick] = useState<number | null>(null)
  const p = s.page
  const sc = p < ASSESS ? SCREENS[p] : null
  const go = (n: number) => { try { window.speechSynthesis?.cancel() } catch {} setSpeaking(false); setReflect(false); setS(x => ({ ...x, page: n })); window.scrollTo(0, 0) }
  const pct = Math.round((p / (ASSESS + 1)) * 100)
  const exit = () => navigate({ page: 'home' })

  const BRIDGE = (<>
    <p style={eyebrow}>From Aging With Dignity to The Road Home</p>
    <h1 style={h1}>When health changes the road ahead, who gets to decide what home should look like?</h1>
    <p style={{ margin: '0 0 .8em', fontSize: '1.15em', fontWeight: 700, color: NAVY }}>Housing and health are deeply connected.</p>
    <p style={{ margin: '0 0 1em', fontSize: '1.1em' }}>A safe place to live can affect medication, recovery, sleep, nutrition, mobility, transportation, and connection to care.</p>
    <p style={{ margin: '0 0 1em', fontSize: '1.1em' }}>But supporting health does not mean deciding someone’s life for them. Our responsibility is to provide good information, identify risk, offer options, and make the path clear.</p>
    <p style={{ margin: '0 0 1.4em', fontSize: '1.1em', fontWeight: 700, color: NAVY }}>The choice still belongs to the person living it.</p>
    <div style={{ background: '#fff', border: '1px solid #DCE7EE', borderRadius: 18, padding: '1.2em 1.3em', margin: '0 0 1.4em' }}>
      <p style={{ ...eyebrow, margin: '0 0 .5em' }}>Dignity in practice</p>
      <p style={{ margin: '0 0 .8em' }}>Ms. Turner has a health condition that makes sleeping in her car increasingly concerning. Staff believe Transitional Housing would be safer. She understands the option and says no.</p>
      <p style={{ margin: '0 0 .8em', fontWeight: 800, color: NAVY }}>What does Aging With Dignity require from us?</p>
      <div style={{ display: 'grid', gap: '.5em' }}>
        {['Convince her to accept because health and safety come first.', 'Respect the decision without discussing it further.', 'Make sure she understands the risks and options, respect her informed choice, update the plan, and continue working with her.', 'Ask the Manager to decide.'].map((o, i) => {
          const done = bPick !== null, good = done && i === 2, bad = done && bPick === i && i !== 2
          return <button key={i} disabled={done} onClick={() => setBPick(i)} style={{ textAlign: 'left', display: 'flex', gap: '.8em', padding: '.75em 1em', borderRadius: 12, fontFamily: 'inherit', fontSize: '1em', cursor: done ? 'default' : 'pointer', color: '#22333F', background: good ? '#E3F3EA' : bad ? '#FBECE8' : '#fff', border: `2px solid ${good ? '#2E7D50' : bad ? '#C4462F' : '#C9D6DF'}` }}><strong style={{ color: good ? '#2E7D50' : bad ? '#C4462F' : '#1D6A96' }}>{String.fromCharCode(65 + i)}</strong><span>{o}</span></button>
        })}
      </div>
      {bPick !== null && <div style={{ marginTop: '1em', padding: '1em 1.2em', borderRadius: 12, background: bPick === 2 ? '#E3F3EA' : '#FFF4DE', borderLeft: `5px solid ${bPick === 2 ? '#2E7D50' : '#F4941C'}` }}>
        <strong>{bPick === 2 ? 'Strong response. ' : 'The strong response is C. '}Safety matters. So does autonomy.</strong>
        <p style={{ margin: '.4em 0 0' }}>Trauma-informed practice does not require staff to agree with every decision. It requires us to inform honestly, assess risk, preserve choice where the decision belongs to the member, and keep the relationship intact.</p>
      </div>}
    </div>
    {bPick !== null && <>
      <p style={{ margin: '0 0 1.2em', fontSize: '1.15em', fontWeight: 700, color: '#C0610A' }}>Next, follow one member down The Road Home.</p>
      <button onClick={() => navigate({ page: 'journey' })} style={btn(true)}>Next: The Road Home →</button>
    </>}
  </>)

  const narration = sc ? (sc.kind === 'text' ? [sc.title, ...sc.paras, ...(sc.list ?? []), ...(sc.lines ?? [])] : sc.kind === 'check' ? [sc.check.setup ?? '', sc.check.q] : sc.kind === 'slide' ? [sc.alt] : [sc.setup, sc.quote, sc.ask]).join(' ') : ''
  const listen = () => {
    const synth = window.speechSynthesis
    if (!synth) return
    if (speaking) { synth.cancel(); setSpeaking(false); return }
    const u = new SpeechSynthesisUtterance(narration)
    u.rate = 0.95; u.onend = () => setSpeaking(false)
    synth.cancel(); synth.speak(u); setSpeaking(true)
  }

  const pick = (k: string, i: number) => setS(x => x.picks[k] === undefined ? { ...x, picks: { ...x.picks, [k]: i } } : x)
  const checkPicked = sc && sc.kind === 'check' ? s.picks['s' + p] : undefined
  const blocked = (sc?.kind === 'check' && checkPicked === undefined) || (sc?.kind === 'slide' && !!sc.quiz && QUIZ.some((_, i) => s.picks['a' + i] === undefined))

  const results = useMemo(() => {
    const correct = ASSESSMENT.filter((q, i) => s.answers[i] === q.a).length
    const crit = ASSESSMENT.filter(q => q.critical)
    const critOk = crit.filter(q => s.answers[ASSESSMENT.indexOf(q)] === q.a).length
    const pc = Math.round((correct / ASSESSMENT.length) * 100)
    return { correct, crit: crit.length, critOk, pc, passed: pc >= PASS && critOk === crit.length }
  }, [s.answers])

  const submit = () => setS(x => ({ ...x, submitted: true, passed: results.passed }))
  const retake = () => { setQi(0); setS(x => ({ ...fresh(), page: ASSESS, picks: x.picks })); window.scrollTo(0, 0) }
  const q = ASSESSMENT[s.order[qi]]
  const qIdx = s.order[qi]
  const answered = s.answers[qIdx] !== undefined

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #fff 0%, #EAF3F9 100%)', color: '#22333F', fontSize: 17, lineHeight: 1.65, display: 'flex', flexDirection: 'column' }}>
      <header style={{ background: 'rgba(255,255,255,.94)', borderBottom: '1px solid #DCE7EE', position: 'sticky', top: 0, zIndex: 20 }}>
        <div style={{ maxWidth: '64em', margin: '0 auto', padding: '.7em 1.4em', display: 'flex', alignItems: 'center', gap: '1.2em', flexWrap: 'wrap' }}>
          <img src={smcLogo} alt="St. Mary's Center" style={{ height: 42, width: 'auto' }} />
          <span style={{ borderLeft: '2px solid #DCE7EE', paddingLeft: '1.2em', fontWeight: 700, color: '#1D6A96', fontSize: '.95em' }}>Aging With Dignity</span>
          <div style={{ flex: '1 1 12em', minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.84em', color: '#5A6873', fontWeight: 600 }}><span>{sc ? `Screen ${p + 1} of ${ASSESS}` : 'Assessment'}</span><span>{pct}%</span></div>
            <div style={{ height: 8, borderRadius: 999, background: '#E1EAF0', overflow: 'hidden' }}><div style={{ height: '100%', width: pct + '%', background: '#F4941C', borderRadius: 999, transition: 'width .3s' }} /></div>
          </div>
          <button onClick={exit} style={{ ...btn(false), padding: '.55em 1.2em', fontSize: '.9em', color: '#C0610A', borderColor: '#F4C58A' }}>Save &amp; Exit</button>
          <SanjayButton />
        </div>
      </header>

      <main ref={mainRef} key={`${p}-${qi}-${s.submitted}`} style={{ flex: 1, width: '100%', maxWidth: sc?.kind === 'slide' ? '64em' : '52em', margin: '0 auto', padding: sc?.kind === 'slide' ? '1.6em 1.4em 3em' : '2.6em 1.4em 3em' }}>
        {sc && (<>
          {sc.kind !== 'slide' && <><p style={eyebrow}>{sc.eyebrow}</p>
          <h1 style={h1}>{sc.title}</h1></>}

          {sc.kind === 'slide' && (<>
            <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', boxShadow: '0 10px 32px rgba(18,71,106,.18)' }}>
              <img src={SLIDES[sc.slide]} alt={sc.alt} style={{ display: 'block', width: '100%', height: 'auto' }} />
              {sc.hot === 'next' && <button aria-label="Begin module" onClick={() => go(p + 1)} style={{ position: 'absolute', left: '74.6%', top: '65.5%', width: '21.8%', height: '8.2%', background: 'transparent', border: 'none', cursor: 'pointer' }} />}
              {sc.slide === 'move' && <button onClick={() => go(p + 1)} style={{ position: 'absolute', left: '55.2%', top: '86%', width: '30%', height: '8.2%', borderRadius: 999, border: 'none', cursor: 'pointer', background: 'linear-gradient(180deg,#FB9A25,#F07F12)', color: '#fff', fontFamily: 'inherit', fontWeight: 700, fontSize: 'clamp(.8em, 2vw, 1.35em)', whiteSpace: 'nowrap', boxShadow: '0 0 0 4px rgba(255,248,236,.9)' }}>Continue →</button>}
              {sc.quiz && QUIZ.map((qz, i) => [true, false].map(yes => {
                const pk = s.picks['a' + i], done = pk !== undefined, mine = done && (pk === 1) === yes, right = yes === qz.yes
                return <button key={i + '' + yes} disabled={done} aria-label={`Card ${i + 1}: ${yes ? 'Yes, ageism' : 'No, not ageism'}`} onClick={() => pick('a' + i, yes ? 1 : 0)} style={{ position: 'absolute', left: QX[i][0] + '%', width: (QX[i][1] - QX[i][0]) + '%', top: yes ? '69.4%' : '75.7%', height: '5.2%', borderRadius: 999, cursor: done ? 'default' : 'pointer', background: mine ? (right ? 'rgba(46,125,80,.88)' : 'rgba(196,70,47,.88)') : 'transparent', border: mine ? '3px solid #fff' : 'none', color: '#fff', fontFamily: 'inherit', fontWeight: 800, fontSize: 'clamp(.6em, 1.6vw, 1em)' }}>{mine ? (right ? 'Correct' : 'Not quite') : ''}</button>
              }))}
            </div>
            {sc.quiz && <div style={{ display: 'grid', gap: '.5em', marginTop: '1em' }}>
              {QUIZ.map((qz, i) => s.picks['a' + i] === undefined ? null : <p key={i} style={{ margin: 0, padding: '.7em 1em', borderRadius: 12, background: '#fff', borderLeft: `5px solid ${(s.picks['a' + i] === 1) === qz.yes ? '#2E7D50' : '#F4941C'}` }}><strong style={{ color: NAVY }}>Card {i + 1}: {qz.yes ? 'Yes, ageism. ' : 'No, not ageism. '}</strong>{qz.why}</p>)}
              {QUIZ.some((_, i) => s.picks['a' + i] === undefined) && <p style={{ margin: 0, color: '#5A6873', fontWeight: 600 }}>Answer all four cards to continue.</p>}
            </div>}
          </>)}

          {sc.kind === 'text' && sc.image && (sc.image === 'turner'
            ? <div style={{ width: 150, height: 150, borderRadius: '50%', overflow: 'hidden', margin: '0 0 1.2em', border: '4px solid #fff', boxShadow: '0 6px 20px rgba(20,60,90,.2)' }}><Portrait initials="ET" alt="Ms. Evelyn Turner" /></div>
            : <img src={sc.image === 'arrival' ? arrival : team} alt="" style={{ width: '100%', maxHeight: 340, objectFit: 'cover', objectPosition: sc.image === 'team' ? 'center 70%' : 'center', borderRadius: 20, margin: '0 0 1.4em', boxShadow: '0 8px 28px rgba(20,60,90,.18)' }} />)}

          {sc.kind === 'text' && (<>
            {sc.paras.map((t, i) => <p key={i} style={{ margin: '0 0 1em', fontSize: '1.12em', color: '#2E3E4A' }}>{t}</p>)}
            {sc.list && <ul style={{ margin: '0 0 1em', padding: 0, listStyle: 'none', display: 'grid', gap: '.5em' }}>{sc.list.map(t => <li key={t} style={{ borderLeft: '4px solid #F4941C', background: '#fff', borderRadius: '0 12px 12px 0', padding: '.7em 1em', fontWeight: 600, color: NAVY }}>{t}</li>)}</ul>}
            {sc.lines && (sc.lines.length > 1
              ? <div style={{ display: 'flex', gap: '.6em', flexWrap: 'wrap' }}>{sc.lines.map(t => <span key={t} style={{ padding: '.5em 1.2em', borderRadius: 999, background: NAVY, color: '#fff', fontWeight: 700 }}>{t}</span>)}</div>
              : <p style={{ margin: '.4em 0 0', fontSize: '1.15em', fontWeight: 700, color: NAVY }}>{sc.lines[0]}</p>)}
          </>)}

          {sc.kind === 'check' && (<>
            {sc.check.setup && <p style={{ margin: '0 0 1em', fontSize: '1.12em', padding: '1em 1.2em', background: '#fff', borderRadius: 14, border: '1px solid #DCE7EE' }}>{sc.check.setup}</p>}
            <p style={{ margin: '0 0 .8em', fontWeight: 800, fontSize: '1.15em', color: NAVY }}>{sc.check.q}</p>
            <Options opts={sc.check.opts} picked={checkPicked} a={sc.check.a} onPick={i => pick('s' + p, i)} />
            {checkPicked !== undefined && (
              <div style={{ marginTop: '1.2em', padding: '1em 1.2em', borderRadius: 14, background: checkPicked === sc.check.a ? '#E3F3EA' : '#FFF4DE', borderLeft: `5px solid ${checkPicked === sc.check.a ? '#2E7D50' : '#F4941C'}` }}>
                <strong>{checkPicked === sc.check.a ? 'Right. ' : `Not quite. The strongest answer is ${String.fromCharCode(65 + sc.check.a)}. `}</strong>
                <span style={{ fontWeight: 700, color: NAVY }}>{sc.check.label}: </span>{sc.check.why}
              </div>
            )}
          </>)}

          {sc.kind === 'reflect' && (<>
            <p style={{ margin: '0 0 .6em', fontSize: '1.12em' }}>{sc.setup}</p>
            <p style={{ margin: '0 0 1em', fontSize: '1.4em', fontStyle: 'italic', color: NAVY, borderLeft: '4px solid #F4941C', paddingLeft: '1em' }}>{sc.quote}</p>
            <p style={{ margin: '0 0 .8em', fontWeight: 800, fontSize: '1.12em', color: NAVY }}>{sc.ask}</p>
            {!reflect
              ? <button onClick={() => setReflect(true)} style={btn(false)}>Show a model answer</button>
              : <div style={{ padding: '1em 1.2em', borderRadius: 14, background: '#E8F3EF', borderLeft: '5px solid #2E7D50' }}><strong style={{ color: '#1E6B43' }}>Model answer: </strong>{sc.model}</div>}
          </>)}

          {'speechSynthesis' in window && <button onClick={listen} style={{ ...btn(false), marginTop: '1.6em', padding: '.5em 1.2em', fontSize: '.9em' }}>{speaking ? 'Stop narration' : 'Listen to this screen'}</button>}
        </>)}

        {!sc && !s.submitted && (<>
          <p style={eyebrow}>Final assessment · Question {qi + 1} of {ASSESSMENT.length}</p>
          <h1 style={{ ...h1, fontSize: 'clamp(1.5em, 3.4vw, 2.1em)' }}>{q.topic}</h1>
          <div style={{ height: 6, borderRadius: 999, background: '#E1EAF0', overflow: 'hidden', margin: '0 0 1.4em' }}><div style={{ height: '100%', width: `${(qi / ASSESSMENT.length) * 100}%`, background: '#2680B3' }} /></div>
          <p style={{ margin: '0 0 1em', fontSize: '1.15em', fontWeight: 600, color: '#22333F' }}>{q.q}</p>
          <Options opts={q.opts} picked={s.answers[qIdx]} a={q.a} onPick={i => setS(x => x.answers[qIdx] === undefined ? { ...x, answers: { ...x.answers, [qIdx]: i } } : x)} />
          {answered && <p style={{ margin: '1em 0 0', fontWeight: 600, color: s.answers[qIdx] === q.a ? '#1E6B43' : '#8A4E08' }}>{s.answers[qIdx] === q.a ? 'Correct. ' : 'Noted. '}{q.fb}</p>}
        </>)}

        {!sc && s.submitted && bridge && (<>
          {BRIDGE}
        </>)}

        {!sc && s.submitted && !bridge && (<>
          <p style={eyebrow}>Assessment result</p>
          <h1 style={h1}>{results.passed ? 'Passed' : 'Not yet'}</h1>
          {results.passed ? (<>
            <p style={{ fontSize: '1.15em' }}>You demonstrated the foundation. You showed that you can recognize dignity not only as a value, but as a practice standard. You are ready to carry these principles into the next part of the Senior Housing Services Academy.</p>
          </>) : (<>
            <p style={{ fontSize: '1.15em' }}>You’re close. Review the areas that need another look. This assessment is about judgment, not memorization. We’ve highlighted the topics connected to the questions you missed. Review those sections, then try again.</p>
          </>)}
          <div style={{ display: 'flex', gap: '1em', flexWrap: 'wrap', margin: '1.2em 0' }}>
            <div style={{ background: '#fff', border: '1px solid #DCE7EE', borderRadius: 14, padding: '.8em 1.2em' }}><div style={{ fontSize: '1.6em', fontWeight: 800, color: NAVY }}>{results.pc}%</div><div style={{ fontSize: '.85em', color: '#5A6873' }}>{results.correct} of {ASSESSMENT.length} · {PASS}% needed</div></div>
            <div style={{ background: '#FFF4DE', border: '1.5px solid #F4941C', borderRadius: 14, padding: '.8em 1.2em' }}><div style={{ fontSize: '1.6em', fontWeight: 800, color: '#8A4E08' }}>{results.critOk} of {results.crit}</div><div style={{ fontSize: '.85em' }}>critical questions correct</div></div>
          </div>
          {!results.passed && (
            <div style={{ margin: '0 0 1.2em' }}>
              <p style={{ ...eyebrow, color: '#8A4E08' }}>Topics to review</p>
              <div style={{ display: 'flex', gap: '.4em', flexWrap: 'wrap' }}>
                {ASSESSMENT.filter((x, i) => s.answers[i] !== x.a).map(x => <span key={x.topic} style={{ padding: '.25em .8em', borderRadius: 999, background: '#fff', border: '1.5px solid #F0B8A6', color: '#B23A22', fontSize: '.88em', fontWeight: 700 }}>{x.topic}{x.critical ? ' · critical' : ''}</span>)}
              </div>
            </div>
          )}
          <div style={{ display: 'flex', gap: '.8em', flexWrap: 'wrap' }}>
            {results.passed
              ? <button onClick={() => { setBridge(true); window.scrollTo(0, 0) }} style={btn(true)}>Continue →</button>
              : <><button onClick={() => go(0)} style={btn(false)}>Review My Topics →</button><button onClick={retake} style={btn(true)}>Retake Assessment →</button></>}
          </div>
          <div style={{ display: 'grid', gap: '.6em', marginTop: '2em' }}>
            {ASSESSMENT.map((x, i) => {
              const ok = s.answers[i] === x.a
              return <div key={i} style={{ background: '#fff', borderRadius: 12, borderLeft: `5px solid ${ok ? '#2E7D50' : '#C4462F'}`, padding: '.7em 1em', fontSize: '.92em' }}>
                <strong style={{ color: ok ? '#1E6B43' : '#B23A22' }}>{ok ? '✓' : '✕'} {x.topic}</strong>{x.critical ? <span style={{ color: '#8A4E08' }}> · critical</span> : null}
                {!ok && <div style={{ color: '#3C4A55' }}>Strongest answer: {x.opts[x.a]}</div>}
                {x.fb && <div style={{ color: '#5A6873' }}>{x.fb}</div>}
              </div>
            })}
          </div>
        </>)}
      </main>

      {!(!sc && s.submitted) && (
        <footer style={{ borderTop: '1px solid #DCE7EE', background: 'rgba(255,255,255,.94)' }}>
          <div style={{ maxWidth: '52em', margin: '0 auto', padding: '.9em 1.4em', display: 'flex', justifyContent: 'space-between', gap: '.8em' }}>
            <button onClick={() => sc ? (p > 0 && go(p - 1)) : qi > 0 ? setQi(qi - 1) : go(ASSESS - 1)} style={{ ...btn(false), visibility: sc && p === 0 ? 'hidden' : 'visible' }}>← Back</button>
            {sc
              ? <button disabled={blocked} onClick={() => go(p + 1)} style={btn(true, blocked)}>{p === ASSESS - 1 ? 'Begin the assessment' : 'Continue'} →</button>
              : qi < ASSESSMENT.length - 1
                ? <button disabled={!answered} onClick={() => setQi(qi + 1)} style={btn(true, !answered)}>Next →</button>
                : <button disabled={!answered} onClick={submit} style={btn(true, !answered)}>Submit assessment →</button>}
          </div>
        </footer>
      )}
    </div>
  )
}
