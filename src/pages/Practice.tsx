import { useEffect, useState } from 'react'
import type { Route } from '../App'
import Masthead from '../components/Masthead'
import CourseBar from '../components/CourseBar'
import { SCENARIOS } from '../data/mockRecords'

type Saved = { page: number; picks: Record<string, number> }
const KEY = 'smc-practice'
const BLUE = '#1D6A96'
const last = SCENARIOS.length
const card = { background: '#fff', border: '1px solid #DCE7EE', borderRadius: 18, padding: '1.2em 1.4em' }
const label = { margin: '0 0 .4em', fontSize: '.72em', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' as const, color: '#8A4E08' }
const btn = (primary: boolean, disabled = false) => ({ padding: '.85em 1.8em', border: primary ? 'none' : '1.5px solid #C9D6DF', borderRadius: 12, background: disabled ? '#C9D6DF' : primary ? '#F4941C' : '#fff', color: primary || disabled ? '#fff' : BLUE, fontFamily: 'inherit', fontWeight: 700, fontSize: '1em', cursor: disabled ? 'default' : 'pointer' })

export default function Practice({ navigate }: { navigate: (r: Route) => void }) {
  const [s, setS] = useState<Saved>(() => {
    try {
      const v = JSON.parse(localStorage.getItem(KEY) || '{}')
      return { page: typeof v.page === 'number' && v.page >= 0 && v.page <= last ? v.page : 0, picks: v.picks && typeof v.picks === 'object' ? v.picks : {} }
    } catch { return { page: 0, picks: {} } }
  })
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(s)) } catch {} }, [s])
  const p = s.page
  const sc = p >= 1 && p <= last ? SCENARIOS[p - 1] : null
  const key = `s${p}`
  const picked = s.picks[key]
  const answered = picked !== undefined
  const go = (n: number) => { setS(x => ({ ...x, page: n })); window.scrollTo(0, 0) }
  const score = SCENARIOS.filter((x, i) => s.picks[`s${i + 1}`] === x.a).length

  return (
    <div style={{ minHeight: '100vh', background: '#EAF3F9', color: '#22333F', fontSize: 17, lineHeight: 1.6 }}>
      <Masthead navigate={navigate} currentPage="paths" />
      <CourseBar kicker="Academy 2 · In practice" title="Mock Records Practice" step={p + 1} total={last + 2} onExit={() => navigate({ page: 'paths' })} />
      <main key={p} style={{ maxWidth: '54em', margin: '0 auto', padding: '2.2em 1.4em 4em' }}>
        {p === 0 && (<>
          <h2 style={{ margin: '0 0 .5em', fontSize: 'clamp(1.6em, 3.8vw, 2.2em)', color: '#2680B3', lineHeight: 1.2 }}>Look at the record. Spot the problem.</h2>
          <p style={{ margin: '0 0 1em', color: '#3C4A55' }}>{last} short scenarios. Each one shows a mock record like the ones you will see on the job. Read it, make one choice, and get an answer right away.</p>
          <div style={{ ...card, background: '#FFF4DE', borderLeft: '5px solid #F4941C' }}><p style={label}>All mock</p>Every person and record here is fictional. No real member information is used.</div>
        </>)}

        {sc && (<>
          <p style={{ margin: '0 0 .5em', fontSize: '.72em', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#F4941C' }}>Scenario {p} of {last}</p>
          <h2 style={{ margin: '0 0 .4em', fontSize: 'clamp(1.6em, 3.8vw, 2.2em)', color: '#2680B3', lineHeight: 1.2 }}>{sc.title}</h2>
          <p style={{ margin: '0 0 1em' }}>{sc.setup}</p>

          <div style={{ border: '1.5px solid #C9D6DF', borderRadius: 14, overflow: 'hidden', background: '#fff', marginBottom: '1em' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap', padding: '.6em 1em', background: '#1D6A96', color: '#fff', fontSize: '.85em', fontWeight: 700 }}>
              <span>{sc.record.kind} · {sc.record.id}</span>
              <span style={{ letterSpacing: '.14em', color: '#FFD69A' }}>MOCK RECORD</span>
            </div>
            {sc.record.fields.map(([k, v, flag], i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: 'minmax(6.5em, 10em) 1fr', gap: '.3em 1em', padding: '.65em 1em', borderTop: i ? '1px solid #E7EEF3' : 'none', background: flag && answered ? '#FFF4DE' : '#fff' }}>
                <strong style={{ color: BLUE }}>{k}</strong><span>{v}</span>
              </div>
            ))}
          </div>

          <div style={{ ...card, background: '#E7F3FB' }}>
            <p style={{ margin: '0 0 .7em', fontWeight: 600, color: BLUE }}>{sc.q}</p>
            <div style={{ display: 'grid', gap: '.5em' }}>
              {sc.opts.map((o, n) => {
                const good = answered && n === sc.a; const bad = answered && picked === n && n !== sc.a
                return <button key={n} disabled={answered} onClick={() => setS(x => ({ ...x, picks: { ...x.picks, [key]: n } }))} style={{ textAlign: 'left', padding: '.75em 1em', borderRadius: 12, fontFamily: 'inherit', fontSize: '1em', border: `2px solid ${good ? '#1E6B43' : bad ? '#B23A22' : '#C9D6DF'}`, background: good ? '#E3F3EA' : bad ? '#FBE9E7' : '#fff', color: '#22333F', cursor: answered ? 'default' : 'pointer' }}>{o}</button>
              })}
            </div>
            {answered && <p style={{ margin: '.8em 0 0', fontWeight: 600 }}>{picked === sc.a ? 'Right. ' : `Not quite. The answer is: ${sc.opts[sc.a]}. `}{sc.feedback}</p>}
          </div>
          {answered && <div style={{ ...card, marginTop: '.9em', background: '#FFF4DE', borderLeft: '5px solid #F4941C' }}><p style={label}>The fix</p><strong style={{ color: '#8A4E08' }}>{sc.fix}</strong></div>}
        </>)}

        {p === last + 1 && (<>
          <h2 style={{ margin: '0 0 .5em', fontSize: 'clamp(1.6em, 3.8vw, 2.2em)', color: '#2680B3' }}>Records reviewed</h2>
          <div style={{ ...card, marginBottom: '.9em' }}><p style={label}>Your results</p>{score} of {last} right the first time.</div>
          <div style={{ ...card, background: '#E7F3FB' }}><p style={label}>What to carry</p>
            <ul style={{ margin: 0, paddingLeft: '1.1em' }}>{SCENARIOS.map(x => <li key={x.title}>{x.fix}</li>)}</ul></div>
          <div style={{ display: 'flex', gap: '.8em', flexWrap: 'wrap', marginTop: '1em' }}>
            <button onClick={() => { setS({ page: 0, picks: {} }); window.scrollTo(0, 0) }} style={btn(false)}>Practice again</button>
            <button onClick={() => navigate({ page: 'paths' })} style={btn(true)}>Back to learning paths</button>
          </div>
        </>)}

        {p !== last + 1 && (
          <div style={{ marginTop: '2em', display: 'flex', justifyContent: 'space-between', gap: '.8em' }}>
            <button onClick={() => go(p - 1)} style={{ ...btn(false), visibility: p === 0 ? 'hidden' : 'visible' }}>← Back</button>
            <button disabled={!!sc && !answered} onClick={() => go(p + 1)} style={btn(true, !!sc && !answered)}>{p === 0 ? 'Open the first record' : 'Next'} →</button>
          </div>
        )}
      </main>
    </div>
  )
}
