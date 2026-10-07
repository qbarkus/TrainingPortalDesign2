import { useEffect, useMemo, useState } from 'react'
import type { Route } from '../App'
import { SanjayButton } from '../components/AskSanjay'
import Portrait from '../components/Portrait'
import smcLogo from '../imports/SMC_Official_Logo_Horizontal.png'
import tile0 from '../imports/01_The_Road_Home_Cover.png'
import tile1 from '../imports/02_Meet_Ms_Turner.png'
import tile2 from '../imports/03_Chapter_1_Housing_Support_Plan.png'
import tile3 from '../imports/04_Chapter_2_Document_Readiness.png'
import tile4 from '../imports/05_Chapter_3_Housing_Navigation.png'
import tile5 from '../imports/06_Chapter_4_Cross_Department_Collaboration.png'
import tile6 from '../imports/07_Chapter_5_Transitional_Housing_Decision.png'
import tile7 from '../imports/08_Chapter_6_When_a_Case_Goes_Quiet.png'
import tile8 from '../imports/09_Chapters_7_8_From_a_Lease_to_a_Lasting_Home.png'
const TILES = [tile0,tile1,tile2,tile3,tile4,tile5,tile6,tile7,tile8]
import sheet from '../imports/Housing_Case_Management_Snapshot.png'
import { STEPS as RH_STEPS, WHO } from '../data/roadHome'
import type { Block, Step, Who } from '../data/roadHome'

const NAVY = '#12476A'
type Saved = { page: number; picks: Record<number, number>; seed: number; done: boolean }

const eyebrow = { margin: '0 0 .6em', fontSize: '.78em', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase' as const, color: '#F4941C' }
const h1 = { margin: '0 0 .6em', fontSize: 'clamp(1.9em, 4.6vw, 3em)', fontWeight: 800, lineHeight: 1.12, color: NAVY, letterSpacing: '-.01em' }
const btn = (primary: boolean, off = false) => ({ padding: '.85em 1.9em', border: primary ? 'none' : '1.5px solid #C9D6DF', borderRadius: 999, background: off ? '#C9D6DF' : primary ? '#F4941C' : '#fff', color: primary ? '#fff' : '#22333F', fontFamily: 'inherit', fontSize: '1em', fontWeight: 700, cursor: off ? 'not-allowed' : 'pointer' }) as const
const panel = { background: '#fff', border: '1px solid #DCE7EE', borderRadius: 16, padding: '1em 1.2em' } as const

function rng(seed: number) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296 } }
function order(len: number, seed: number, fixed: boolean) { const o = Array.from({ length: len }, (_, i) => i); if (fixed) return o; const r = rng(seed); for (let i = o.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [o[i], o[j]] = [o[j], o[i]] } return o }

function Face({ w, size = 56 }: { w: Who; size?: number }) {
  const box = { width: size, height: size, borderRadius: '50%', overflow: 'hidden', border: '3px solid #fff', boxShadow: '0 3px 10px rgba(18,71,106,.2)', flexShrink: 0 } as const
  if (w === 'MJ' || w === 'DM') {
    const x0 = w === 'DM' ? 529 : 1035
    return <div role="img" aria-label={WHO[w].name} style={{ ...box, backgroundImage: `url(${sheet})`, backgroundRepeat: 'no-repeat', backgroundSize: `${(1536 / 255) * 100}% auto`, backgroundPosition: `${((x0 + 123) / (1536 - 255)) * 100}% ${(532 / (1024 - 255)) * 100}%` }} />
  }
  return <div style={box}><Portrait initials={w} alt={WHO[w].name} /></div>
}

function Blocks({ blocks }: { blocks: Block[] }) {
  return <>{blocks.map((b, i) => {
    if (b.k === 'n') return <p key={i} style={{ margin: '0 0 1em', fontSize: '1.12em', color: '#2E3E4A' }}>{b.t}</p>
    if (b.k === 'say') return (
      <div key={i} style={{ display: 'flex', gap: '.9em', alignItems: 'flex-start', margin: '0 0 1em' }}>
        <Face w={b.w} />
        <div style={{ ...panel, flex: 1, borderRadius: '4px 16px 16px 16px' }}>
          <div style={{ fontSize: '.8em', fontWeight: 800, color: '#1D6A96', marginBottom: '.2em' }}>{WHO[b.w].name} <span style={{ fontWeight: 600, color: '#6B7A86' }}>· {WHO[b.w].role}</span></div>
          <div style={{ fontSize: '1.08em' }}>{b.t}</div>
        </div>
      </div>
    )
    if (b.k === 'big') return <div key={i} style={{ background: NAVY, color: '#fff', borderRadius: 18, padding: '1.2em 1.4em', margin: '0 0 1.2em' }}><div style={{ fontSize: '1.35em', fontWeight: 800, lineHeight: 1.3 }}>{b.t}</div>{b.sub && <div style={{ marginTop: '.4em', fontSize: '1.05em', color: '#CFE6F2' }}>{b.sub}</div>}</div>
    if (b.k === 'list') return <ul key={i} style={{ margin: '0 0 1em', padding: 0, listStyle: 'none', display: 'grid', gap: '.5em' }}>{b.items.map(t => <li key={t} style={{ borderLeft: '4px solid #F4941C', background: '#fff', borderRadius: '0 12px 12px 0', padding: '.6em 1em', fontWeight: 600, color: NAVY }}>{t}</li>)}</ul>
    if (b.k === 'flow') return <div key={i} style={{ display: 'flex', flexWrap: 'wrap', gap: '.4em', alignItems: 'center', margin: '0 0 1.2em' }}>{b.items.map((t, j) => <span key={t} style={{ display: 'inline-flex', gap: '.4em', alignItems: 'center' }}><span style={{ padding: '.4em .9em', borderRadius: 999, background: '#fff', border: '1.5px solid #C9D6DF', fontWeight: 700, fontSize: '.88em', color: NAVY }}>{t}</span>{j < b.items.length - 1 && <span style={{ color: '#F4941C', fontWeight: 800 }}>→</span>}</span>)}</div>
    if (b.k === 'file') return (
      <div key={i} style={{ border: '1.5px solid #C9D6DF', borderRadius: 14, overflow: 'hidden', background: '#fff', margin: '0 0 1.2em', boxShadow: '0 8px 22px rgba(18,71,106,.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap', padding: '.6em 1em', background: '#1D6A96', color: '#fff', fontSize: '.85em', fontWeight: 700 }}>
          <span>{b.kind} · {b.id}</span><span style={{ letterSpacing: '.14em', color: '#FFD69A' }}>MOCK FILE</span>
        </div>
        {b.fields.map(([k, v, flag], j) => (
          <div key={j} style={{ display: 'grid', gridTemplateColumns: 'minmax(7em, 11em) 1fr', gap: '.3em 1em', padding: '.65em 1em', borderTop: j ? '1px solid #E7EEF3' : 'none', background: flag ? '#FFF4DE' : '#fff' }}>
            <strong style={{ color: '#1D6A96' }}>{k}</strong><span>{v}</span>
          </div>
        ))}
        {b.note && <div style={{ padding: '.6em 1em', background: '#FBF6EF', borderTop: '1px solid #EEDFC7', fontSize: '.88em', color: '#8A4E08' }}>{b.note}</div>}
      </div>
    )
    return <div key={i} style={{ ...panel, margin: '0 0 1.2em', padding: 0, overflow: 'hidden' }}>
      {[b.head, ...b.items].map((r, j) => <div key={j} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '.6em', padding: '.65em 1em', background: j === 0 ? '#EAF3F9' : '#fff', borderTop: j ? '1px solid #E1EAF0' : 'none', fontWeight: j === 0 ? 800 : 500, color: j === 0 ? NAVY : '#22333F', fontSize: '.98em' }}>{r.map((c, k) => <span key={k} style={{ fontWeight: k === 2 && j ? 800 : undefined, color: k === 2 && j ? '#1E6B43' : undefined }}>{c}</span>)}</div>)}
    </div>
  })}</>
}

function Quiz({ st, picked, seed, idx, onPick }: { st: Extract<Step, { t: 'decide' }>; picked: number | undefined; seed: number; idx: number; onPick: (i: number) => void }) {
  const ord = useMemo(() => order(st.opts.length, seed + idx * 101, st.opts.some(o => o.startsWith('All of'))), [st, seed, idx])
  const done = picked !== undefined
  const ok = picked === st.a
  return (<>
    {st.setup && <Blocks blocks={st.setup} />}
    <p style={{ margin: '0 0 .8em', fontSize: '1.2em', fontWeight: 800, color: NAVY }}>{st.q}</p>
    <div style={{ display: 'grid', gap: '.6em' }}>
      {ord.map((oi, pos) => {
        const good = done && oi === st.a, bad = done && picked === oi && oi !== st.a
        return <button key={oi} disabled={done} onClick={() => onPick(oi)} style={{ textAlign: 'left', display: 'flex', gap: '.8em', padding: '.85em 1.1em', borderRadius: 14, fontFamily: 'inherit', fontSize: '1em', cursor: done ? 'default' : 'pointer', color: '#22333F', background: good ? '#E3F3EA' : bad ? '#FBECE8' : '#fff', border: `2px solid ${good ? '#2E7D50' : bad ? '#C4462F' : '#C9D6DF'}` }}><strong style={{ color: good ? '#2E7D50' : bad ? '#C4462F' : '#1D6A96' }}>{String.fromCharCode(65 + pos)}</strong><span>{st.opts[oi]}</span></button>
      })}
    </div>
    {done && <div style={{ marginTop: '1.1em', padding: '1em 1.2em', borderRadius: 14, background: ok ? '#E3F3EA' : '#FFF4DE', borderLeft: `5px solid ${ok ? '#2E7D50' : '#F4941C'}` }}>
      <strong>{ok ? 'Yes. ' : 'Not quite. '}</strong>
      {!ok && st.wrong?.[picked!] && <span>{st.wrong[picked!]} </span>}
      {!ok && <span>The strongest response is: {st.opts[st.a]} </span>}
      <span>{st.fb}</span>
    </div>}
  </>)
}

function Cards({ st }: { st: Extract<Step, { t: 'cards' }> }) {
  const [open, setOpen] = useState<number[]>([])
  return (<>
    {st.intro && <p style={{ margin: '0 0 1em', fontSize: '1.1em', color: '#2E3E4A' }}>{st.intro}</p>}
    <div style={{ display: 'grid', gap: '.6em' }}>
      {st.cards.map(([h, b], i) => {
        const on = open.includes(i)
        return <div key={h} style={{ ...panel, borderColor: on ? '#F4941C' : '#DCE7EE', borderWidth: on ? 2 : 1 }}>
          <button onClick={() => setOpen(o => on ? o.filter(x => x !== i) : [...o, i])} aria-expanded={on} style={{ all: 'unset', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', gap: '1em', width: '100%', fontWeight: 800, color: NAVY }}><span>{h}</span><span style={{ color: '#F4941C' }}>{on ? '−' : '+'}</span></button>
          {on && <div style={{ marginTop: '.5em' }}>{b.map((t, j) => <p key={j} style={{ margin: '0 0 .5em' }}>{t}</p>)}</div>}
        </div>
      })}
    </div>
  </>)
}

function Sort({ st }: { st: Extract<Step, { t: 'sort' }> }) {
  const [open, setOpen] = useState<number[]>([])
  return (<>
    {st.intro && <p style={{ margin: '0 0 1em', fontSize: '1.1em', color: '#2E3E4A' }}>{st.intro}</p>}
    <div style={{ display: 'grid', gap: '.6em' }}>
      {st.items.map((it, i) => {
        const on = open.includes(i)
        return <button key={i} onClick={() => setOpen(o => o.includes(i) ? o : [...o, i])} style={{ textAlign: 'left', padding: '.9em 1.1em', borderRadius: 14, fontFamily: 'inherit', fontSize: '1em', cursor: on ? 'default' : 'pointer', color: '#22333F', background: on ? (it.good ? '#E3F3EA' : '#FFF4DE') : '#fff', border: `2px solid ${on ? (it.good ? '#2E7D50' : '#F4941C') : '#C9D6DF'}` }}>
          <div>{it.p}</div>
          {on ? <div style={{ marginTop: '.5em', fontWeight: 800, color: it.good ? '#1E6B43' : '#8A4E08' }}>{it.v}{it.n && <span style={{ fontWeight: 500, color: '#3C4A55' }}> {it.n}</span>}</div> : <div style={{ marginTop: '.4em', fontSize: '.85em', color: '#1D6A96', fontWeight: 700 }}>Tap to reveal</div>}
        </button>
      })}
    </div>
  </>)
}

function Multi({ st, done, onDone }: { st: Extract<Step, { t: 'multi' }>; done: boolean; onDone: () => void }) {
  const [sel, setSel] = useState<number[]>([])
  return (<>
    <p style={{ margin: '0 0 1em', fontSize: '1.1em', color: '#2E3E4A' }}>{st.intro}</p>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5em', margin: '0 0 1.2em' }}>
      {st.items.map((t, i) => {
        const on = sel.includes(i)
        return <button key={t} onClick={() => setSel(s => on ? s.filter(x => x !== i) : [...s, i])} aria-pressed={on} style={{ padding: '.55em 1.1em', borderRadius: 999, fontFamily: 'inherit', fontSize: '.98em', fontWeight: 600, cursor: 'pointer', background: on ? NAVY : '#fff', color: on ? '#fff' : NAVY, border: `2px solid ${on ? NAVY : '#C9D6DF'}` }}>{t}</button>
      })}
    </div>
    {!done && <button onClick={onDone} style={btn(true)}>Check</button>}
    {done && <div style={{ padding: '1em 1.2em', borderRadius: 14, background: '#E3F3EA', borderLeft: '5px solid #2E7D50' }}>{st.after}</div>}
  </>)
}

const CC_PASS = 80

function Result({ steps, picks, seed, onRetake, onReview }: { steps: Step[]; picks: Record<number, number>; seed: number; onRetake: () => void; onReview: (i: number) => void }) {
  const qs = steps.map((x, i) => [x, i] as const).filter(([x]) => x.t === 'decide' && x.cc) as [Extract<Step, { t: 'decide' }>, number][]
  const missed = qs.filter(([x, i]) => picks[i] !== x.a)
  const pct = Math.round(((qs.length - missed.length) / qs.length) * 100)
  const pass = pct >= CC_PASS
  void seed
  return (<>
    <h1 style={h1}>{pass ? 'Passed. You brought the case home.' : 'Not yet.'}</h1>
    <div style={{ ...panel, display: 'flex', alignItems: 'baseline', gap: '.8em', marginBottom: '1.2em' }}><strong style={{ fontSize: '2.2em', color: pass ? '#1E6B43' : '#C0610A' }}>{pct}%</strong><span style={{ color: '#5A6873' }}>{qs.length - missed.length} of {qs.length} correct. {CC_PASS}% to pass.</span></div>
    {pass ? (<>
      <p style={{ fontSize: '1.12em' }}>You demonstrated that you can move from assessment to planning, readiness, search, decision-making and handoff while keeping Ms. Turner’s dignity and the team’s responsibilities visible.</p>
      <p style={{ fontSize: '1.12em', fontWeight: 700, color: NAVY }}>The work of Finding Home is complete. The next work is Keeping Home.</p>
    </>) : (<>
      <p style={{ fontSize: '1.12em' }}>Review the decisions that need another look. This is coaching, not a gotcha.</p>
      <div style={{ display: 'grid', gap: '.6em', margin: '0 0 1.2em' }}>
        {missed.map(([x, i]) => <div key={i} style={{ ...panel, borderLeft: '5px solid #F4941C' }}>
          <div style={{ fontWeight: 800, color: NAVY }}>{x.title}</div>
          <div style={{ margin: '.3em 0' }}>{x.q}</div>
          <div><strong>Strongest response:</strong> {x.opts[x.a]}</div>
          <div style={{ color: '#3C4A55' }}>{x.fb}</div>
        </div>)}
      </div>
      <button onClick={onRetake} style={btn(true)}>Retake the Case Conference →</button>
    </>)}
  </>)
}

function Reflect({ st }: { st: Extract<Step, { t: 'reflect' }> }) {
  const [show, setShow] = useState(false)
  return (<>
    <h1 style={{ ...h1, fontSize: 'clamp(1.6em, 3.8vw, 2.4em)' }}>{st.prompt}</h1>
    {st.prompts && <ul style={{ margin: '0 0 1em', padding: 0, listStyle: 'none', display: 'grid', gap: '.6em' }}>{st.prompts.map((t, i) => <li key={t} style={{ ...panel, display: 'flex', gap: '.8em', fontWeight: 600, color: NAVY }}><span style={{ color: '#F4941C', fontWeight: 800 }}>{i + 1}</span>{t}</li>)}</ul>}
    <p style={{ margin: '0 0 1em', color: '#5A6873' }}>Take a moment to think this through. There is no score here.</p>
    {st.themes && !show && <button onClick={() => setShow(true)} style={btn(false)}>See what strong responses consider</button>}
    {show && st.themes && <ul style={{ margin: '0 0 1em', padding: 0, listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: '.5em' }}>{st.themes.map(t => <li key={t} style={{ padding: '.45em 1em', borderRadius: 999, background: '#fff', border: '1.5px solid #C9D6DF', fontWeight: 600, color: NAVY }}>{t}</li>)}</ul>}
    {(show || !st.themes) && st.note && <p style={{ fontSize: '1.1em', fontWeight: 700, color: NAVY }}>{st.note}</p>}
  </>)
}

function tileIndex(steps: Step[], p: number): number | null {
  const st = steps[p]
  if (st.t === 'take') return null
  const first = steps.findIndex(x => x.ch === st.ch)
  const eye = 'eye' in st ? st.eye : ''
  if (eye === 'Prologue · Meet Ms. Turner') return 1
  if (p !== first) return null
  if (st.ch === 'Opening') return 0
  const m = /^Chapter (\d) of 8$/.exec(st.ch)
  if (!m) return null
  const c = +m[1]
  return c <= 6 ? c + 1 : 8
}

function Tile({ i }: { i: number }) {
  return <img src={TILES[i]} alt="Road Home chapter illustration" style={{ width: '100%', aspectRatio: '512 / 341', objectFit: 'cover', borderRadius: 18, marginBottom: '1.4em', boxShadow: '0 14px 34px rgba(18,71,106,.18)', display: 'block' }} />
}

export default function RoadHome({ navigate, steps: STEPS = RH_STEPS, storeKey: KEY = 'smc-roadhome', label = 'THE ROAD HOME' }: { navigate: (r: Route) => void; steps?: Step[]; storeKey?: string; label?: string }) {
  const LAST = STEPS.length - 1
  const [s, setS] = useState<Saved>(() => {
    try {
      const v = JSON.parse(localStorage.getItem(KEY) || '{}')
      return { page: typeof v.page === 'number' && v.page >= 0 && v.page <= LAST ? v.page : 0, picks: v.picks && typeof v.picks === 'object' ? v.picks : {}, seed: typeof v.seed === 'number' ? v.seed : Math.floor(Math.random() * 1e9), done: !!v.done }
    } catch { return { page: 0, picks: {}, seed: Math.floor(Math.random() * 1e9), done: false } }
  })
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(s)) } catch {} }, [s])
  const p = s.page
  const st = STEPS[p]
  const go = (n: number) => { setS(x => ({ ...x, page: n })); window.scrollTo(0, 0) }
  const pick = (i: number) => setS(x => ({ ...x, picks: { ...x.picks, [p]: i } }))
  const exit = () => navigate({ page: 'home' })
  const pct = Math.round((p / LAST) * 100)
  const ccQs = STEPS.map((x, i) => [x, i] as const).filter(([x]) => x.t === 'decide' && x.cc) as [Extract<Step, { t: 'decide' }>, number][]
  const ccPass = ccQs.length > 0 && Math.round((ccQs.filter(([x, i]) => s.picks[i] === x.a).length / ccQs.length) * 100) >= 80
  const retake = () => { setS(x => { const picks = { ...x.picks }; ccQs.forEach(([, i]) => delete picks[i]); return { ...x, picks, seed: Math.floor(Math.random() * 1e9), page: ccQs[0][1] - 1 } }); window.scrollTo(0, 0) }
  const gated = ((st.t === 'decide' || st.t === 'multi') && s.picks[p] === undefined) || (st.t === 'result' && !ccPass)
  const finish = () => { setS(x => ({ ...x, done: true })); setTimeout(exit, 0) }
  const scored = STEPS.map((x, i) => [x, i] as const).filter(([x]) => x.t === 'decide' && x.scored)
  const right = scored.filter(([x, i]) => s.picks[i] === (x as Extract<Step, { t: 'decide' }>).a).length
  const last = p === LAST

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #fff 0%, #EAF3F9 100%)', color: '#22333F', fontSize: 17, lineHeight: 1.65, display: 'flex', flexDirection: 'column' }}>
      <header style={{ background: 'rgba(255,255,255,.94)', borderBottom: '1px solid #DCE7EE', position: 'sticky', top: 0, zIndex: 20 }}>
        <div style={{ maxWidth: '64em', margin: '0 auto', padding: '.7em 1.4em', display: 'flex', alignItems: 'center', gap: '1.2em', flexWrap: 'wrap' }}>
          <img src={smcLogo} alt="St. Mary's Center" style={{ height: 42, width: 'auto' }} />
          <span style={{ borderLeft: '2px solid #DCE7EE', paddingLeft: '1.2em', fontWeight: 800, letterSpacing: '.16em', fontSize: '.84em', color: '#F4941C' }}>{label}</span>
          <div style={{ flex: '1 1 12em', minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.84em', color: '#5A6873', fontWeight: 600 }}><span>{st.ch}</span><span>{pct}%</span></div>
            <div style={{ height: 8, borderRadius: 999, background: '#E1EAF0', overflow: 'hidden' }}><div style={{ height: '100%', width: pct + '%', background: '#F4941C', borderRadius: 999, transition: 'width .3s' }} /></div>
          </div>
          <button onClick={exit} style={{ ...btn(false), padding: '.55em 1.2em', fontSize: '.9em', color: '#C0610A', borderColor: '#F4C58A' }}>Save &amp; Exit</button>
          <SanjayButton />
        </div>
      </header>

      <main key={p} style={{ flex: 1, width: '100%', maxWidth: '52em', margin: '0 auto', padding: '2.4em 1.4em 3em' }}>
        {KEY === 'smc-roadhome' && (() => { const ti = tileIndex(STEPS, p); return ti === null ? null : <Tile i={ti} /> })()}
        {st.t !== 'take' && st.t !== 'reflect' && <p style={eyebrow}>{st.eye}</p>}
        {st.t === 'result' && <Result steps={STEPS} picks={s.picks} seed={s.seed} onRetake={retake} onReview={go} />}
        {st.t === 'story' && (<>{st.img && <img src={st.img} alt={st.title || st.eye} style={{ width: '100%', display: 'block', borderRadius: 18, boxShadow: '0 14px 34px rgba(18,71,106,.18)' }} />}{st.title && <h1 style={h1}>{st.title}</h1>}<Blocks blocks={st.blocks} /></>)}
        {st.t === 'cards' && (<><h1 style={h1}>{st.title}</h1><Cards st={st} /></>)}
        {st.t === 'sort' && (<><h1 style={h1}>{st.title}</h1><Sort st={st} /></>)}
        {st.t === 'multi' && (<><h1 style={h1}>{st.title}</h1><Multi st={st} done={s.picks[p] !== undefined} onDone={() => pick(1)} /></>)}
        {st.t === 'decide' && (<>{st.title && <h1 style={h1}>{st.title}</h1>}<Quiz st={st} picked={s.picks[p]} seed={s.seed} idx={p} onPick={pick} /></>)}
        {st.t === 'reflect' && (<><p style={eyebrow}>{st.eye}</p><Reflect st={st} /></>)}
        {st.t === 'take' && (<div style={{ padding: '2.5em 0' }}>
          <p style={eyebrow}>Chapter takeaway</p>
          <h1 style={{ ...h1, fontSize: 'clamp(2em, 5.5vw, 3.4em)' }}>{st.big}</h1>
          {st.sub && <p style={{ margin: 0, fontSize: 'clamp(1.4em, 3.6vw, 2.1em)', fontWeight: 700, color: '#C0610A' }}>{st.sub}</p>}
        </div>)}
        {p === LAST - 1 && st.t !== 'result' && <p style={{ marginTop: '1.5em', color: '#5A6873', fontSize: '.95em' }}>Scored checks: {right} of {scored.length} correct on the first try.</p>}
      </main>

      <footer style={{ borderTop: '1px solid #DCE7EE', background: 'rgba(255,255,255,.94)' }}>
        <div style={{ maxWidth: '52em', margin: '0 auto', padding: '.9em 1.4em', display: 'flex', justifyContent: 'space-between', gap: '.8em' }}>
          <button onClick={() => go(p - 1)} style={{ ...btn(false), visibility: p === 0 ? 'hidden' : 'visible' }}>← Back</button>
          {last
            ? <button onClick={finish} style={btn(true)}>{(st.t === 'story' && st.cta) || 'Finish'} →</button>
            : <button disabled={gated} onClick={() => go(p + 1)} style={btn(true, gated)}>{(st.t === 'story' && st.cta) || 'Continue'} →</button>}
        </div>
      </footer>
    </div>
  )
}
