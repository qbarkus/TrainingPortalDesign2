import { useEffect, useState, type ReactNode } from 'react'
import type { Route } from '../App'
import Masthead from '../components/Masthead'
import CourseBar from '../components/CourseBar'
import sheet from '../imports/Housing_Case_Management_Snapshot.png'

type Saved = { page: number; picks: Record<string, number> }
const KEY = 'smc-david'
const BLUE = '#1D6A96'
const card = { background: '#fff', border: '1px solid #DCE7EE', borderRadius: 18, padding: '1.2em 1.4em' }
const label = { margin: '0 0 .4em', fontSize: '.72em', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' as const, color: '#8A4E08' }
const h2 = { margin: '0 0 .5em', fontSize: 'clamp(1.6em, 3.8vw, 2.2em)', fontWeight: 700, lineHeight: 1.2, color: '#2680B3' }
const btn = (primary: boolean, disabled = false) => ({ padding: '.85em 1.8em', border: primary ? 'none' : '1.5px solid #C9D6DF', borderRadius: 12, background: disabled ? '#C9D6DF' : primary ? '#F4941C' : '#fff', color: primary ? '#fff' : '#22333F', fontFamily: 'inherit', fontSize: '1em', fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer' })

type Step = { title: string; story: string; q: string; opts: string[]; a: number; feedback: string; action: string; why: string; remember: string }
export const DSTEPS: Step[] = [
  { title: 'A missed appointment', story: 'David Miller was due to meet his worker at 10:00. It is 10:20 and he has not come.', q: 'What do you do first?', opts: ['Close his file, he is not engaged', 'Try to reach him, then document the attempt', 'Wait until next month and see'], a: 1, feedback: 'One missed meeting is information, not a reason to close.', action: 'Call him. Whatever happens, write a brief contact note: Purpose, Intervention and Outcome, Next steps. Category: Contact Attempt, subcategory No Contact / Not Billable.', why: 'The work still shows, even when nobody picks up.', remember: 'A missed contact gets an attempt and a note.' },
  { title: 'A voicemail is not contact', story: 'You call twice. Both go to voicemail, and you leave a message asking David to call back about housing.', q: 'Is this direct contact?', opts: ['Yes, you spoke to his voicemail', 'No. Voicemail is not direct contact', 'Only if you leave two messages'], a: 1, feedback: 'Direct contact means in person, by phone or by video, with the member reached.', action: 'Enter it as No Contact / Not Billable with the brief note. Date it the day you called.', why: 'Entering it keeps a record that outreach happened, which matters later if the file ever needs to close.', remember: 'Email, text and voicemail are never direct contact.' },
  { title: 'Re-engagement', story: 'A week later David picks up. He says, “I’m not ready right now, but maybe later.”', q: 'How do you respond?', opts: ['Press him to commit now', 'Respect it, leave the door open, and say what you can offer', 'Mark him uncooperative and move on'], a: 1, feedback: 'Readiness is his to name. Your job is to keep the way back open.', action: 'Write the Interaction Summary in neutral words: what he said, what you offered, and the next touch with an owner and a date. Write “declined the referral,” not “was uncooperative.”', why: 'Someone who was not there should be able to tell what you did and what David said.', remember: '“Not now” is not “no.” Document it plainly and stay reachable.' },
  { title: 'Asking for a second opinion', story: 'Weeks pass. Several attempts have gone unanswered and you are unsure what to do next.', q: 'Who do you talk to before deciding?', opts: ['Nobody, it is your call', 'Your manager, and you record the consultation', 'Another member’s worker, to compare cases'], a: 1, feedback: 'Do not decide alone, and keep other members out of it.', action: 'Consult your manager, and note that you did and what was agreed. Never name another member.', why: 'A consulted decision protects David and protects you.', remember: 'When unsure, consult first.' },
  { title: 'Ready to close?', story: 'There has been no encounter with David for a long stretch, and every attempt is documented.', q: 'When is a file ready to close for no contact?', opts: ['After the first missed meeting', 'When no encounter has happened for 90 days after documented outreach, and your manager agrees', 'When you are tired of trying'], a: 1, feedback: 'Lost to services means no encounter for 90 days after documented outreach.', action: 'Confirm the attempts are all in, talk to your manager, and then exit the file the way your department directs.', why: 'This is why every attempt got a note, even the voicemails.', remember: 'Closure is a decision with your manager, backed by documented outreach.' },
]
const PAGES = ['Meet David', ...DSTEPS.map(s => s.title), 'Your summary']
const last = PAGES.length - 1

const Block = ({ t, children, tone = '#fff' }: { t: string; children: ReactNode; tone?: string }) => (
  <div style={{ ...card, background: tone, marginBottom: '.9em' }}><p style={label}>{t}</p><div style={{ lineHeight: 1.55, color: '#22333F' }}>{children}</div></div>
)
const Face = ({ size }: { size: number | string }) => (
  <div role="img" aria-label="David Miller" style={{ width: size, aspectRatio: '1 / 1', borderRadius: '50%', flexShrink: 0, backgroundImage: `url(${sheet})`, backgroundRepeat: 'no-repeat', backgroundSize: `${(1536 / 255) * 100}% auto`, backgroundPosition: `${(640 / (1536 - 255)) * 100}% ${(532 / (1024 - 255)) * 100}%` }} />
)

export default function David({ navigate }: { navigate: (r: Route) => void }) {
  const [s, setS] = useState<Saved>(() => {
    try {
      const v = JSON.parse(localStorage.getItem(KEY) || '{}')
      return { page: typeof v.page === 'number' && v.page >= 0 && v.page <= last ? v.page : 0, picks: v.picks && typeof v.picks === 'object' ? v.picks : {} }
    } catch { return { page: 0, picks: {} } }
  })
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(s)) } catch {} }, [s])
  const p = s.page
  const go = (n: number) => { setS(x => ({ ...x, page: n })); window.scrollTo(0, 0) }
  const step = p >= 1 && p <= DSTEPS.length ? DSTEPS[p - 1] : null
  const key = `s${p}`
  const answered = step ? s.picks[key] !== undefined : false
  const score = DSTEPS.filter((x, i) => s.picks[`s${i + 1}`] === x.a).length

  return (
    <div style={{ minHeight: '100vh', background: '#EAF3F9', color: '#22333F', fontSize: 17, lineHeight: 1.6 }}>
      <Masthead navigate={navigate} currentPage="david" />
      <CourseBar kicker="Short course" title="David Miller: Staying Reachable" step={p + 1} total={PAGES.length} onExit={() => navigate({ page: 'home' })} />
      <main key={p} style={{ maxWidth: '54em', margin: '0 auto', padding: '2.2em 1.4em 4em' }}>
        <p style={{ margin: '0 0 .5em', fontSize: '.72em', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#F4941C' }}>{step ? `Step ${p} of ${DSTEPS.length}` : PAGES[p]}</p>

        {p === 0 && (<>
          <h2 style={h2}>When a member goes quiet</h2>
          <div style={{ ...card, display: 'flex', gap: '1.2em', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1em' }}>
            <Face size={120} />
            <div style={{ flex: '1 1 14em' }}>
              <p style={{ margin: 0, fontWeight: 700, color: BLUE }}>David Miller</p>
              <p style={{ margin: '.1em 0 .5em', fontSize: '.9em', color: '#5A6873' }}>Disengaged member. Follow-up and re-engagement scenarios.</p>
              <p style={{ margin: 0, fontStyle: 'italic' }}>“I’m not ready right now, but maybe later.”</p>
            </div>
          </div>
          <Block t="What you will practice">Missed contacts, outreach attempts, re-engagement, consulting your manager, and knowing when a file is ready to close.</Block>
          <Block t="Same shape as Ms. Turner’s Journey" tone="#E7F3FB">Story, then a decision, then the action, why it matters, and one thing to remember.</Block>
        </>)}

        {step && (<>
          <h2 style={h2}>{step.title}</h2>
          <div style={{ ...card, display: 'flex', gap: '1em', alignItems: 'center', marginBottom: '.9em' }}>
            <Face size={84} />
            <div><p style={label}>Story</p>{step.story}</div>
          </div>
          <Block t="What would you do?" tone="#E7F3FB">
            <p style={{ margin: '0 0 .7em', fontWeight: 600, color: BLUE }}>{step.q}</p>
            <div style={{ display: 'grid', gap: '.5em' }}>
              {step.opts.map((o, n) => {
                const chosen = s.picks[key] === n; const good = answered && n === step.a; const bad = answered && chosen && n !== step.a
                return <button key={n} disabled={answered} onClick={() => setS(x => ({ ...x, picks: { ...x.picks, [key]: n } }))} style={{ textAlign: 'left', padding: '.75em 1em', borderRadius: 12, fontFamily: 'inherit', fontSize: '1em', cursor: answered ? 'default' : 'pointer', color: '#22333F', background: good ? '#E3F3EA' : bad ? '#FBE9E7' : '#fff', border: `2px solid ${good ? '#1E6B43' : bad ? '#B23A22' : '#C9D6DF'}` }}>{o}</button>
              })}
            </div>
            {answered && <p style={{ margin: '.8em 0 0', fontWeight: 600 }}>{s.picks[key] === step.a ? 'Right. ' : `Not quite. The answer is: ${step.opts[step.a]}. `}{step.feedback}</p>}
          </Block>
          {answered && (<>
            <Block t="What you do">{step.action}</Block>
            <Block t="Why it matters">{step.why}</Block>
            <div style={{ ...card, background: '#FFF4DE', borderLeft: '5px solid #F4941C' }}><p style={label}>Remember this</p><strong style={{ color: '#8A4E08' }}>{step.remember}</strong></div>
          </>)}
        </>)}

        {p === last && (<>
          <h2 style={h2}>You stayed reachable</h2>
          <Block t="Your results">{score} of {DSTEPS.length} right the first time.</Block>
          <Block t="Five things to carry" tone="#E7F3FB"><ul style={{ margin: 0, paddingLeft: '1.1em' }}>{DSTEPS.map(x => <li key={x.title}>{x.remember}</li>)}</ul></Block>
          <div style={{ display: 'flex', gap: '.8em', flexWrap: 'wrap', marginTop: '1em' }}>
            <button onClick={() => { setS({ page: 0, picks: {} }); window.scrollTo(0, 0) }} style={btn(false)}>Walk through it again</button>
            <button onClick={() => navigate({ page: 'home' })} style={btn(true)}>Back to training home</button>
          </div>
        </>)}

        {p !== last && (
          <div style={{ marginTop: '2em', display: 'flex', justifyContent: 'space-between', gap: '.8em' }}>
            <button onClick={() => go(p - 1)} style={{ ...btn(false), visibility: p === 0 ? 'hidden' : 'visible' }}>← Back</button>
            <button disabled={!!step && !answered} onClick={() => go(p + 1)} style={btn(true, !!step && !answered)}>{p === 0 ? 'Meet David' : 'Next'} →</button>
          </div>
        )}
      </main>
    </div>
  )
}
