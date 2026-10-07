import { useEffect, useState } from 'react'
import type { Route } from '../App'
import Masthead from '../components/Masthead'
import CourseBar from '../components/CourseBar'

type Props = { navigate: (r: Route) => void }
type Saved = { page: number; answers: Record<number, number>; yeses: number[]; submitted: boolean }
const KEY = 'smc-documentation'
const EMPTY: Saved = { page: 0, answers: {}, yeses: [], submitted: false }

const eyebrow = { margin: '0 0 .5em', fontSize: '.72em', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase' as const, color: '#F4941C' }
const h2 = { margin: '0 0 .5em', fontSize: 'clamp(1.6em, 3.8vw, 2.2em)', fontWeight: 700, lineHeight: 1.2, color: '#2680B3' }
const lead = { margin: '0 0 1.2em', fontSize: '1.08em', lineHeight: 1.6, color: '#3C4A55', maxWidth: '42em' }
const card = { background: '#fff', border: '1px solid #DCE7EE', borderRadius: 18, padding: '1.2em 1.4em' }
const label = { margin: '0 0 .4em', fontSize: '.72em', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' as const, color: '#8A4E08' }
const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 15em), 1fr))', gap: '.9em' }
const btn = (primary: boolean, disabled = false) => ({ padding: '.85em 1.8em', border: primary ? 'none' : '1.5px solid #C9D6DF', borderRadius: 12, background: disabled ? '#C9D6DF' : primary ? '#F4941C' : '#fff', color: primary ? '#fff' : '#22333F', fontFamily: 'inherit', fontSize: '1em', fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer' } as const)

const LEARN = ['What CalAIM is', 'Is my member CalAIM?', 'The three services', 'Deposits are now Abode’s', 'The Housing Support Plan', 'Keeping the clock', 'TSS paperwork', 'Writing it with your member', 'Goals that work', 'What counts as documented', 'Two systems, one rule', 'Handing off', 'Before you start']
const PAGES = [...LEARN, 'Question 1', 'Question 2', 'Question 3', 'Question 4', 'Question 5', 'Your score']

const Box = ({ t, children }: { t: string; children: React.ReactNode }) => (
  <div style={card}><p style={label}>{t}</p><div style={{ lineHeight: 1.55, color: '#3C4A55' }}>{children}</div></div>
)
const List = ({ items }: { items: string[] }) => (
  <ul style={{ margin: 0, paddingLeft: '1.1em', display: 'grid', gap: '.35em' }}>{items.map(i => <li key={i}>{i}</li>)}</ul>
)

export const QS: { q: string; opts: string[]; a: number; why: string }[] = [
  { q: 'Your member has Medi-Cal and is sleeping in a shelter. Are they a CalAIM member?', opts: ['Yes. Medi-Cal makes them CalAIM', 'Not yet. They are CalAIM once Alameda County Health authorizes them and they are enrolled in the HCS project in HMIS', 'Yes, once I write a Housing Support Plan', 'No. Shelter residents cannot be CalAIM members'], a: 1, why: 'Medi-Cal is the first check, not the last. Tell your manager so the manager can start the referral.' },
  { q: 'A member was enrolled on the 3rd. When is the first HSP due, and when do we aim for?', opts: ['Due in 15 days, aim for 30', 'Due in 30 days (the 2nd of next month), aim for day 15 (the 18th)', 'Due in six months, aim for 30 days', 'Due the same day'], a: 1, why: "The County's deadline is 30 days. We aim for day 15 to leave room if something slips." },
  { q: "Your TSS member came to budgeting group and signed in. Does that count as this month's service?", opts: ['Yes. Attendance is a service', 'No. Signing in is not a service. A note saying what you worked on and what is next can be', 'Yes, if I log it within a week', 'No. Group work never counts'], a: 1, why: 'A service is something you did with or for the member, written down with what happens next.' },
  { q: 'Your Navigation member signed a lease today. What happens to the plan?', opts: ['Nothing. The same plan continues', 'The member is discharged', 'It is rewritten with staying-housed goals, you write the hand-off, and TSS takes over (overlap up to 30 days)', 'It is rewritten at the six-month mark'], a: 2, why: 'The Navigator to TSS hand-off is in writing, and the member is never alone in the change.' },
  { q: 'Your member needs a deposit for the unit they were just approved for. Who provides it, and what do you do?', opts: ['St. Mary’s Center pays it from CalAIM', 'Abode Services. You work with the member on the application in Padmission, and it still goes in the HSP as a goal', 'Alameda County Health pays it directly', 'The landlord waives it'], a: 1, why: 'Housing Deposits are now Abode’s program. Until you have Padmission access, bring applications to your manager.' },
]
export const PASS = 80
const YESES = ['Alameda County Health authorized them, and I can see it in HMIS', 'They are enrolled in the HCS project for this service', 'There is a current Housing Support Plan, or one is due and on my calendar', "I know how I am going to write down this month's help"]

export default function Documentation({ navigate }: Props) {
  const [s, setS] = useState<Saved>(() => {
    try { const v = JSON.parse(localStorage.getItem(KEY) || '{}'); return { page: typeof v.page === 'number' && v.page < PAGES.length ? v.page : 0, answers: v.answers && typeof v.answers === 'object' ? v.answers : {}, yeses: Array.isArray(v.yeses) ? v.yeses : [], submitted: !!v.submitted } } catch { return EMPTY }
  })
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(s)) } catch {} }, [s])
  const p = s.page
  const qStart = LEARN.length
  const last = PAGES.length - 1
  const qi = p - qStart
  const isQ = qi >= 0 && qi < QS.length
  const isResult = p === last
  const go = (n: number) => { setS(x => ({ ...x, page: n })); window.scrollTo(0, 0) }
  const toggle = (n: number) => setS(x => ({ ...x, yeses: x.yeses.includes(n) ? x.yeses.filter(v => v !== n) : [...x.yeses, n] }))
  const answer = (i: number, n: number) => setS(x => ({ ...x, answers: { ...x.answers, [i]: n } }))
  const correct = QS.filter((q, i) => s.answers[i] === q.a).length
  const pct = Math.round((correct / QS.length) * 100)
  const passed = pct >= PASS
  const q = isQ ? QS[qi] : null
  const nextDisabled = isQ && s.answers[qi] === undefined
  const title = PAGES[p]

  return (
    <div style={{ minHeight: '100vh', background: '#EAF3F9', color: '#22333F', fontSize: 17, lineHeight: 1.6 }}>
      <Masthead navigate={navigate} currentPage="documentation" />
      <CourseBar kicker="Short course" title="Documentation: CalAIM and the Housing Support Plan" step={p + 1} total={PAGES.length} onExit={() => navigate({ page: 'home' })} />

      <main key={p} style={{ maxWidth: '62em', margin: '0 auto', padding: '2.2em 1.4em 4em' }}>
        <p style={eyebrow}>{String(p + 1).padStart(2, '0')} · {isQ ? `Quick check · question ${qi + 1} of ${QS.length}` : title}</p>

        {p === 0 && (<>
          <h2 style={h2}>CalAIM Housing Community Supports, in one sentence</h2>
          <p style={lead}>It is a Medi-Cal benefit that pays us to help a member find housing, move in, and keep it. Everyone calls it HCS. Alameda County Health decides who is in it, and it does not pay rent.</p>
          <div style={{ ...card, background: '#1D6A96', border: 'none', marginBottom: '1em' }}>
            <p style={{ ...label, color: '#FFB238' }}>Plain version</p>
            <p style={{ margin: 0, fontSize: '1.4em', fontWeight: 600, color: '#fff' }}>Authorized. Enrolled. Helped. Written down.</p>
          </div>
          <div style={{ ...card, background: '#FFF4DE', border: 'none' }}>
            <strong style={{ color: '#1D6A96' }}>Not a test yet.</strong> Nobody expects you to know this today. Ask your manager or the Data and Compliance team as often as you need. Asking early is always the right call.
          </div>
        </>)}

        {p === 1 && (<>
          <h2 style={h2}>Three places to check. If they disagree, ask.</h2>
          <div style={grid}>
            <Box t="1 · Ask, and look at the card"><List items={['“Are you on Medi-Cal?”', 'The Medi-Cal number (CIN) is a 9, seven digits, then a letter. Example: 91234567A', 'Medi-Cal alone does not make someone CalAIM']} /></Box>
            <Box t="2 · Check HMIS"><List items={['Is there an enrollment in an HCS Housing Navigation or HCS Tenancy Sustaining project under our agency?', 'The Assessments tab shows HCS Authorizations and the Housing Supports Plan']} /></Box>
            <Box t="3 · Check Impact360"><List items={['Look for the Alameda County Health Authorization on the member record', 'If it does not match HMIS, HMIS is right. Tell Data and Compliance']} /></Box>
          </div>
          <div style={{ ...card, marginTop: '1em', background: '#FFF4DE', border: 'none' }}>
            <strong style={{ color: '#1D6A96' }}>We cannot put someone into HCS because they need it.</strong> Only Alameda County Health can authorize. If your member has Medi-Cal, needs housing help and is not authorized yet, tell your manager. Do not promise CalAIM services before the County says yes.
          </div>
        </>)}

        {p === 2 && (<>
          <h2 style={h2}>Keep them housed first. Get them housed. Then help them stay.</h2>
          <div style={grid}>
            <Box t="1 · Housing Problem Solving (HPS)"><p style={{ margin: '0 0 .5em' }}>Your member is housed, or nearly, and something is going wrong.</p><List items={['Ask: what would it take to stay housed?', 'Try the least disruptive thing first', 'Write down: housing kept, stabilized for now, or move to Navigation', 'A conversation, not a program. Anyone can start one']} /></Box>
            <Box t="2 · Housing Navigation (HN)"><p style={{ margin: '0 0 .5em' }}>Your member is unhoused. You help them find a place and move in.</p><List items={['Search units, applications, viewings', 'Gather ID, income and disability documents', 'Help apply for the deposit in Padmission', 'Record the move-in in HMIS, then hand off to TSS']} /></Box>
            <Box t="3 · Tenancy Sustaining (TSS)"><p style={{ margin: '0 0 .5em' }}>Your member is housed. You help them keep it.</p><List items={['Regular check-ins, home visits when needed', 'Rent on time, budgeting, benefits current', 'Sort landlord problems before a notice', 'Watch for late rent and shut-offs. Bring HPS back in']} /></Box>
          </div>
        </>)}

        {p === 3 && (<>
          <h2 style={h2}>Housing Deposits are no longer our program</h2>
          <p style={lead}>Abode Services runs Housing Deposits now. We work with the member on the deposit application in Padmission. Once it is approved, Abode enrolls the member under Abode, not under us.</p>
          <div style={grid}>
            <Box t="What you do"><List items={['Work with the member on the deposit application in Padmission', 'Until you have access, bring deposit applications to your manager', 'Keep the deposit in the Housing Support Plan as a goal and an action step']} /></Box>
            <Box t="The question in every case conference"><p style={{ margin: 0, fontSize: '1.2em', fontWeight: 600, color: '#1D6A96' }}>“What did we do to keep them housed first?”</p><p style={{ margin: '.5em 0 0' }}>If problem solving works, nobody needs Navigation. That is a good outcome, not a missed one.</p></Box>
          </div>
        </>)}

        {p === 4 && (<>
          <h2 style={h2}>It is their plan, in their words</h2>
          <p style={lead}>Every CalAIM member has a Housing Support Plan (HSP). It says what the member wants, what is in the way, and what you and they will do over the next six months. It lives in HMIS.</p>
          <div style={grid}>
            <Box t="What is in it"><List items={['Basics: name, HMIS ID, Medi-Cal number, dates, service', 'Their voice: what they want, what they are good at', 'What is in the way: one to three things', 'Goals: up to three, each with what, by when, your actions', 'Looking back: on later plans']} /></Box>
            <Box t="Why it matters to you"><p style={{ margin: 0 }}>It is what you work from every week. It is also what the County reads to see that the help was real. One document does both jobs, so write it well once.</p></Box>
          </div>
        </>)}

        {p === 5 && (<>
          <h2 style={h2}>Keep the clock</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 11em), 1fr))', gap: '.9em', marginBottom: '1.2em' }}>
            {[['15', 'days', 'Our goal for the first HSP'], ['30', 'days', 'The County rule. After 30 it is late'], ['6', 'months', 'Every plan is good for six months'], ['Sooner', '', 'Update when life changes: move-in, notice, new barrier']].map(([n, u, t]) => (
              <div key={n} style={{ ...card, textAlign: 'center' }}>
                <div style={{ fontSize: '2.4em', fontWeight: 600, color: '#F4941C', lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: '.8em', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#8A4E08' }}>{u}&nbsp;</div>
                <div style={{ marginTop: '.3em', fontSize: '.92em', color: '#3C4A55', lineHeight: 1.4 }}>{t}</div>
              </div>
            ))}
          </div>
          <Box t="Move-in"><p style={{ margin: 0 }}>When the lease is signed, the plan is rewritten with staying-housed goals before TSS begins.</p></Box>
        </>)}

        {p === 6 && (<>
          <h2 style={h2}>Extra paperwork for TSS members</h2>
          <div style={grid}>
            <Box t="Every 180 days: TSS Evaluation Checklist"><p style={{ margin: 0 }}>SHS-HSG-016. Twenty true or false statements about how stable the tenancy is, a score out of 20, and your recommendation. It goes with the HSP update and is uploaded to HMIS. A score of 16 or more means graduation should be considered.</p></Box>
            <Box t="Housing Crisis Plan"><p style={{ margin: 0 }}>SHS-HSG-015. Nine questions in the member’s own words about what a bad stretch looks like, who helps, and what not to do. It sits beside the HSP and is reviewed whenever the HSP is.</p></Box>
            <Box t="If the member no longer needs us"><p style={{ margin: 0 }}>Say so on the plan, attest that they are stable, and the member leaves TSS within 30 days. That is a success.</p></Box>
          </div>
        </>)}

        {p === 7 && (<>
          <h2 style={h2}>The plan takes one good conversation</h2>
          <p style={lead}>Use the prep worksheet (SHS-HSG-014) so you are not typing into HMIS while the member waits. Give it 30 to 45 minutes somewhere they are comfortable.</p>
          <Box t="While you are together"><ol style={{ margin: 0, paddingLeft: '1.2em', display: 'grid', gap: '.35em' }}>{['Start with them: “What do you want your housing to look like?”', 'Ask what they already have. That goes in strengths', 'Pick the one to three things that matter most right now', 'Turn each into a goal you both can see: what, by when', 'Say what you will do: two to five steps, and how often you meet', 'Read it back. Change anything they want. Note their agreement'].map(i => <li key={i}>{i}</li>)}</ol></Box>
        </>)}

        {p === 8 && (<>
          <h2 style={h2}>Goals you can both see</h2>
          <div style={grid}>
            <Box t="Instead of … try …">
              {[['Member will improve budgeting', 'Member will set up a rent reminder and pay rent by the 1st for the next three months. I will check in on the 28th each month.'], ['Member will look for housing', 'Member will apply to three buildings by October 31. I will pull the listings and go to viewings with them.']].map(([a, b]) => (
                <p key={a} style={{ margin: '0 0 .7em' }}><s style={{ color: '#8A97A1' }}>{a}</s><br /><strong style={{ color: '#1E6B43' }}>Try:</strong> {b}</p>
              ))}
            </Box>
            <Box t="Leave out"><List items={['Anything about immigration status. Say “referral to legal services”, not why', 'Any goal that is not about housing. If it would not help them get or keep a place, it goes somewhere else']} /></Box>
            <Box t="Member not engaging?"><p style={{ margin: 0 }}>You cannot write a plan without them. Keep the outreach going, write down every attempt, and talk to your manager. That is the right move, not a failure.</p></Box>
          </div>
        </>)}

        {p === 9 && (<>
          <h2 style={h2}>If you helped and did not write it up, the month does not count</h2>
          <p style={lead}>The County pays us for each enrolled member, for each month we gave at least one documented service. So every month we ask: Did we help this person? Is it written in HMIS?</p>
          <Box t="What “documented” means"><List items={['Something you did with or for the member: a call that moved something, a visit, a form, a landlord conversation', 'In HMIS within three business days. Same day when you can', 'Signing in at the kiosk is not a service. “Attended group” is not a service', 'A note says what you worked on and what happens next', 'Late is fine. Say it is late. Never change the date']} /></Box>
        </>)}

        {p === 10 && (<>
          <h2 style={h2}>Two systems, one rule</h2>
          <div style={grid}>
            <Box t="HMIS"><p style={{ margin: 0 }}>The county record: enrollments, the Housing Support Plan, every service you gave, Coordinated Entry, the move-in. If HMIS does not have it, it did not happen.</p></Box>
            <Box t="Impact360"><p style={{ margin: 0 }}>Our record: membership, care plans, your notes, what your supervisor sees, our reports.</p></Box>
          </div>
          <div style={{ ...card, marginTop: '1em', background: '#FFF4DE', border: 'none' }}><strong style={{ color: '#1D6A96' }}>If they disagree, HMIS is right.</strong> Tell Data and Compliance so Impact360 catches up.</div>
        </>)}

        {p === 11 && (<>
          <h2 style={h2}>Hand off in writing</h2>
          <div style={grid}>
            <Box t="When a member moves to another program or agency"><ol style={{ margin: 0, paddingLeft: '1.2em', display: 'grid', gap: '.35em' }}>{['Tell your manager. The manager talks to the County', 'Keep helping until the new program has picked up. No gap', 'Hand off in writing. If you cannot name who owns the next step, it is still yours', 'Update HMIS so the record shows the move, and Coordinated Entry stays active'].map(i => <li key={i}>{i}</li>)}</ol></Box>
            <Box t="Navigator to TSS: the most common one"><p style={{ margin: 0 }}>The lease is signed. The Navigator writes the hand-off, the plan is rewritten with staying-housed goals, and the Tenancy Sustaining Service Coordinator takes it from there. You can overlap for up to 30 days so the member is never alone in the change.</p></Box>
          </div>
        </>)}

        {p === 12 && (<>
          <h2 style={h2}>Four yeses before you start CalAIM work</h2>
          <div style={{ ...card, marginBottom: '1em' }}>
            {YESES.map((y, i) => (
              <label key={y} style={{ display: 'flex', gap: '.7em', alignItems: 'flex-start', padding: '.4em 0', cursor: 'pointer' }}>
                <input type="checkbox" checked={s.yeses.includes(i)} onChange={() => toggle(i)} style={{ marginTop: '.35em', width: 18, height: 18, accentColor: '#2680B3' }} />{y}
              </label>
            ))}
            <p style={{ margin: '.6em 0 0', fontSize: '.92em', color: '#6C7A85' }}>Any no? Ask before you start. It takes one message.</p>
          </div>
          <div style={{ ...card, background: '#1D6A96', border: 'none' }}>
            <p style={{ ...label, color: '#FFB238' }}>Keep this line</p>
            <p style={{ margin: 0, fontSize: '1.2em', fontWeight: 600, color: '#fff' }}>Authorized. Enrolled. A plan with the member. Helped this month. Written down.</p>
          </div>
          <p style={{ ...lead, marginTop: '1em' }}>Next: five scored questions. You need {PASS}% ({Math.ceil(QS.length * PASS / 100)} of {QS.length}) and can retake as often as you like.</p>
        </>)}

        {isQ && q && (<>
          <h2 style={{ ...h2, color: '#1D6A96', fontSize: 'clamp(1.3em, 3vw, 1.7em)' }}>{q.q}</h2>
          <div style={{ display: 'grid', gap: '.6em' }}>
            {q.opts.map((o, n) => {
              const chosen = s.answers[qi] === n
              return (
                <button key={n} onClick={() => answer(qi, n)} style={{ textAlign: 'left', padding: '.85em 1.1em', border: `2px solid ${chosen ? '#2680B3' : '#C9D6DF'}`, borderRadius: 12, background: chosen ? '#E8F1F6' : '#fff', fontFamily: 'inherit', fontSize: '1em', color: '#22333F', cursor: 'pointer' }}>
                  <strong style={{ marginRight: '.7em', color: '#2680B3' }}>{String.fromCharCode(65 + n)}</strong>{o}
                </button>
              )
            })}
          </div>
          <p style={{ margin: '1em 0 0', fontSize: '.84em', color: '#6C7A85' }}>Answers are explained on the score screen. You can go back and change an answer.</p>
        </>)}

        {isResult && (<>
          <div style={{ ...card, borderTop: `6px solid ${passed ? '#1E6B43' : '#F4941C'}`, marginBottom: '1.2em' }}>
            <p style={{ ...label, color: passed ? '#1E6B43' : '#8A4E08' }}>{passed ? 'Course complete' : 'Not yet'}</p>
            <p style={{ margin: '0 0 .4em', fontSize: '1.6em', fontWeight: 600, color: '#1D6A96' }}>{correct} of {QS.length} correct · {pct}%</p>
            <p style={{ margin: '0 0 1em', lineHeight: 1.55 }}>{passed ? 'Sign your training record with your supervisor, and keep the line: Authorized. Enrolled. A plan with the member. Helped this month. Written down.' : `You need ${PASS}% to complete. Review the explanations below, then retake.`}</p>
            <div style={{ display: 'flex', gap: '.8em', flexWrap: 'wrap' }}>
              {!passed && <button onClick={() => { setS(x => ({ ...x, answers: {}, submitted: false, page: qStart })); window.scrollTo(0, 0) }} style={btn(true)}>Retake the quick check</button>}
              <button onClick={() => navigate({ page: 'home' })} style={btn(passed)}>Back to training home</button>
            </div>
          </div>
          <div style={{ display: 'grid', gap: '.7em' }}>
            {QS.map((qq, i) => {
              const ok = s.answers[i] === qq.a
              return (
                <div key={qq.q} style={{ ...card, borderLeft: `5px solid ${ok ? '#1E6B43' : '#B23A22'}`, padding: '1em 1.2em' }}>
                  <p style={{ margin: '0 0 .3em', fontWeight: 600, color: '#1D6A96' }}>{i + 1}. {qq.q}</p>
                  <p style={{ margin: 0, lineHeight: 1.5 }}><strong style={{ color: ok ? '#1E6B43' : '#B23A22' }}>{ok ? 'Correct. ' : 'Not quite. '}</strong>{!ok && <>Answer: {qq.opts[qq.a]}. </>}{qq.why}</p>
                </div>
              )
            })}
          </div>
        </>)}

        {!isResult && (
          <div style={{ marginTop: '2em', display: 'flex', justifyContent: 'space-between', gap: '.8em' }}>
            <button onClick={() => go(p - 1)} style={{ ...btn(false), visibility: p === 0 ? 'hidden' : 'visible' }}>← Back</button>
            <button disabled={nextDisabled} onClick={() => go(p + 1)} style={btn(true, nextDisabled)}>{p === last - 1 ? 'See my score' : p === qStart - 1 ? 'Start the quick check' : 'Next'} →</button>
          </div>
        )}
        {isResult && <div style={{ marginTop: '1.4em' }}><button onClick={() => go(last - 1)} style={btn(false)}>← Back</button></div>}
      </main>
    </div>
  )
}
