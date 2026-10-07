import { useEffect, useState, type ReactNode } from 'react'
import type { Route } from '../App'
import Masthead from '../components/Masthead'
import CourseBar from '../components/CourseBar'

type Saved = { page: number; answers: Record<number, number>; checks: number[]; fmt: 'PBION' | 'GRIP' }
const KEY = 'smc-notes'
const EMPTY: Saved = { page: 0, answers: {}, checks: [], fmt: 'PBION' }

const eyebrow = { margin: '0 0 .5em', fontSize: '.72em', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase' as const, color: '#F4941C' }
const h2 = { margin: '0 0 .5em', fontSize: 'clamp(1.6em, 3.8vw, 2.2em)', fontWeight: 700, lineHeight: 1.2, color: '#2680B3' }
const lead = { margin: '0 0 1.2em', fontSize: '1.08em', lineHeight: 1.6, color: '#3C4A55', maxWidth: '42em' }
const card = { background: '#fff', border: '1px solid #DCE7EE', borderRadius: 18, padding: '1.2em 1.4em' }
const label = { margin: '0 0 .4em', fontSize: '.72em', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' as const, color: '#8A4E08' }
const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 15em), 1fr))', gap: '.9em' }
const btn = (primary: boolean, disabled = false) => ({ padding: '.85em 1.8em', border: primary ? 'none' : '1.5px solid #C9D6DF', borderRadius: 12, background: disabled ? '#C9D6DF' : primary ? '#F4941C' : '#fff', color: primary ? '#fff' : '#22333F', fontFamily: 'inherit', fontSize: '1em', fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer' })

const Box = ({ t, children }: { t: string; children: ReactNode }) => (
  <div style={card}><p style={label}>{t}</p><div style={{ lineHeight: 1.55, color: '#3C4A55' }}>{children}</div></div>
)
const List = ({ items }: { items: string[] }) => (
  <ul style={{ margin: 0, paddingLeft: '1.1em', display: 'grid', gap: '.35em' }}>{items.map(i => <li key={i}>{i}</li>)}</ul>
)
const TONES = { key: ['#E7F3FB', '#2680B3', '#1D6A96'], warn: ['#FFF4DE', '#F4941C', '#8A4E08'], good: ['#E3F3EA', '#1E6B43', '#1E6B43'], stop: ['#FBE9E7', '#B23A22', '#8C2B18'] }
const Callout = ({ tone, t, children }: { tone: keyof typeof TONES; t: string; children: ReactNode }) => (
  <div style={{ background: TONES[tone][0], borderLeft: `5px solid ${TONES[tone][1]}`, borderRadius: 12, padding: '1em 1.2em', marginTop: '1em' }}>
    <strong style={{ color: TONES[tone][2] }}>{t}</strong>
    <div style={{ marginTop: '.25em', lineHeight: 1.55, color: '#22333F' }}>{children}</div>
  </div>
)
const KV = ({ rows }: { rows: [string, ReactNode][] }) => (
  <div style={{ ...card, padding: '.4em 1.2em' }}>
    {rows.map(([k, v], i) => (
      <div key={i} style={{ display: 'grid', gridTemplateColumns: 'minmax(7em, 11em) 1fr', gap: '.4em 1em', padding: '.65em 0', borderTop: i ? '1px solid #E7EEF3' : 'none' }}>
        <strong style={{ color: '#1D6A96' }}>{k}</strong><span style={{ color: '#3C4A55', lineHeight: 1.5 }}>{v}</span>
      </div>
    ))}
  </div>
)

const CHECKLIST = ['Is the service type correct, and does the category match what I wrote?', 'Is the contact method documented?', 'Did I say why I met with the member?', 'Did I name a specific barrier, not a general one?', 'Did I describe exactly what I did, and who else I spoke to?', 'Did I describe what the member did?', 'Did I document progress or an outcome, even a small one?', 'Do the next steps carry an owner and a date?', 'Is the service date the date I reached the member?', 'Is this note written fresh for this date, with no other member named?', 'Would someone who has never met this member understand today’s encounter?']

const PBION: [string, string][] = [['Purpose', 'Met the member at Housing Clinic to complete housing applications and move closer to stable housing.'], ['Barriers', 'Few affordable options and difficulty understanding eligibility rules and completing the forms. One property requires a birth certificate the member does not have.'], ['Intervention', 'I reviewed the available openings with the member, completed two applications, explained the eligibility rules, and went through the documents each one needs. I called the leasing agent, Ms. Alvarez, who confirmed the certificate can follow within 30 days.'], ['Outcome', 'Both applications submitted. The member repeated the rent calculation back on their own and named the documents still outstanding.'], ['Next steps', 'I will file the vital records request by Friday 9/12. The member will bring their award letter to Tuesday’s clinic.']]
const GRIP: [string, string][] = [['Goal', 'Met the member at Housing Clinic to complete housing applications and reach affordable housing options, supporting their effort to secure stable housing.'], ['Response', 'The member reported few affordable options, was unsure about eligibility rules, and is missing the birth certificate one property requires. During the visit they took an active part in completing both applications, repeated the rent calculation back on their own, and named the documents still outstanding.'], ['Intervention', 'I reviewed the openings, completed two applications with the member, answered their eligibility questions, went through the supporting documents, and called the leasing agent, Ms. Alvarez, who confirmed the certificate can follow within 30 days.'], ['Plan', 'I will file the vital records request by Friday 9/12 and follow up on both applications. The member will bring their award letter to Tuesday’s clinic.']]

export const PASS = 75
const ALL_QS: { note: string; q: string; opts: string[]; a: number; why: string }[] = [
  { note: '“Met with the member to discuss housing. The member reported difficulty finding housing and was thankful for the assistance. Staff discussed housing resources, answered questions and provided support. Staff will follow up next week.”', q: 'Would this note hold up?', opts: ['Yes. There was direct contact and it names a service', 'No. It says something happened, not what the provider did', 'No. Notes this short never bill'], a: 1, why: 'Does it say what the provider did, or only that something happened? “Discussed”, “provided support” and “follow up next week” have no objects, names, owners or dates.' },
  { note: 'The full Housing Clinic application note: Purpose, a named barrier, an intervention with verbs, objects and the leasing agent’s name, an outcome showing something moved, and next steps with two owners and two dates.', q: 'Would this note bill?', opts: ['Yes. Allowable activity, a narrative and direct contact', 'No. Housing Clinic notes never bill', 'No. It needs the member’s diagnosis'], a: 0, why: 'All three are true: an allowable activity, a narrative, and direct contact. The barrier is real, the intervention names who was spoken to, and the next steps carry owners and dates.' },
  { note: '“Called the member at 10:05, no answer, left a voicemail asking her to call back about housing. Called again at 3:20, no answer. Staff will try again if there is no response.”', q: 'What happens with this one?', opts: ['It bills as a Direct Contact Encounter', 'Enter it as No Contact / Not Billable. The brief contact note is enough', 'Do not enter it, because it cannot bill'], a: 1, why: 'Voicemail is not direct contact. Anything missing one of the three still gets entered, same best-fit category, as No Contact / Not Billable. The short form (Purpose, Intervention and Outcome, Next steps) is enough.' },
  { note: '“Member attended the weekly coffee hour at the Community Center and appeared engaged with the group.”', q: 'Would this bill?', opts: ['Yes, if the member appeared engaged', 'No. It is attendance with no staff involvement', 'Yes, as Client Engagement'], a: 1, why: 'Attendance with no staff involvement is real work in the room, but it is not a billable encounter. It describes the member, not something the provider did.' },
  { note: 'One record, service date 09/02. “Called the property manager on 9/2 about the repayment plan and advocated on the member’s behalf. Left her a message. Reached the member on 9/4 and explained the terms she had been offered. She agreed to the plan.”', q: 'How should this be entered?', opts: ['One record with service date 9/4', 'Two records: 9/2 as No Contact / Not Billable, 9/4 as a Direct Contact Encounter', 'One record with service date 9/2'], a: 1, why: 'The service date is the contact date, not the day you typed it. Work done without the member, then contact later, is two records, both under the same category.' },
  { note: 'The same words on 08/12, 08/19 and 08/26: “Checked in with tenant regarding housing stability. Tenant reports no new concerns. Will continue to monitor and support as needed.”', q: 'What is wrong here?', opts: ['Nothing. Consistent notes are good practice', 'Identical copied notes that do not say what the provider did. Each note is written fresh for its date', 'Only the third note is a problem'], a: 1, why: 'One note, one encounter. Never copy from an earlier note. The words are also vague: no barrier, no action, no outcome, no owner or date.' },
]

export const QS = [0, 1, 2, 4].map(i => ALL_QS[i])

type Screen = { title: string; render: (ctx: { s: Saved; set: (p: Partial<Saved>) => void }) => ReactNode }
const ALL_LEARN: Screen[] = [
  { title: 'Why we write it down', render: () => (<>
    <h2 style={h2}>Five steps, every time</h2>
    <p style={lead}>Our members are served whether or not we write it down. Our department only continues if we do.</p>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 9em), 1fr))', gap: '.7em' }}>
      {[['01', 'Consent', 'Before anything else', '#1D6A96'], ['02', 'Plan', 'Within thirty days', '#349CD4'], ['03', 'Contact', 'In person, phone or video', '#3A7D54'], ['04', 'Category', 'An allowable activity', '#F4941C'], ['05', 'Note', 'Within three business days', '#B85450']].map(([n, t, d, c]) => (
        <div key={n} style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', border: '1px solid #DCE7EE' }}>
          <div style={{ background: c, color: '#fff', padding: '.6em .8em', textAlign: 'center' }}><div style={{ fontSize: '1.5em', fontWeight: 700, lineHeight: 1 }}>{n}</div><div style={{ fontSize: '.72em', letterSpacing: '.18em', textTransform: 'uppercase', fontWeight: 700 }}>{t}</div></div>
          <div style={{ padding: '.7em .8em', fontSize: '.9em', textAlign: 'center', color: '#3C4A55' }}>{d}</div>
        </div>
      ))}
    </div>
    <Callout tone="key" t="Not a test yet">This course is about writing the service note: what bills, which category, and how to write it so someone who was not there can tell what you did.</Callout>
  </>) },
  { title: 'What makes an encounter billable', render: () => (<>
    <h2 style={h2}>Three things have to be true. All three, not two.</h2>
    <div style={{ display: 'grid', gap: '.8em', marginBottom: '1em' }}>
      {[['It is an allowable Housing Navigation or Tenancy Sustaining activity', 'And you pick the HMIS service category that matches it.'], ['It has a narrative', 'Purpose, barriers, actions taken, who was involved, and what came of it.'], ['There was direct contact: in person, by phone or by video', 'The member was there and you reached them. Email, text and voicemail are not direct contact.']].map(([t, d], i) => (
        <div key={t} style={{ ...card, display: 'flex', gap: '1em', alignItems: 'flex-start' }}>
          <span style={{ flexShrink: 0, width: 34, height: 34, borderRadius: '50%', background: '#1D6A96', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{i + 1}</span>
          <div><strong style={{ color: '#1D6A96' }}>{t}</strong><div style={{ color: '#5A6873' }}>{d}</div></div>
        </div>
      ))}
    </div>
    <p style={lead}>Anything missing one of the three still gets entered, same best-fit category, subcategory <strong>No Contact / Not Billable</strong>. That is not a failure. It is how the work shows.</p>
  </>) },
  { title: 'Two counting rules', render: () => (<>
    <h2 style={h2}>Two counting rules</h2>
    <KV rows={[['One per member per day', <>Several activities in one visit is normal. Pick the one category that carries most of the visit and summarize the rest inside that narrative. To bill three in a month they must sit on <strong>three different dates</strong>.</>], ['Service date is the contact date', <>Not the day you typed it. Work done without the member, then contact later, is <strong>two records</strong>: the no contact service on its own day, the direct contact encounter on the day you reached them.</>]]} />
  </>) },
  { title: 'Real work that is not billable', render: () => (<>
    <h2 style={h2}>Real work that is not a billable encounter</h2>
    <Box t="These are not encounters"><List items={['No direct contact, however much you did on the case', 'Scheduling, internal meetings, supervision, training, writing the note', '“The member attended weekly coffee hour.” Attendance with no staff involvement', '“Home Stretch emailed, number three on the waitlist.” A third-party update', '“Dropped by to pick up mail.” Incidental contact', '“Saw them in the hallway and said hello.” A welfare check with no engagement']} /></Box>
    <Callout tone="warn" t="Two categories were retired on 1 June 2026"><strong>Case Management</strong> and <strong>Individual Meeting</strong> no longer exist. If you find them on a printed job aid, tell your supervisor which one.</Callout>
  </>) },
  { title: 'Search, application or resource?', render: () => (<>
    <h2 style={h2}>Picking the category</h2>
    <p style={lead}>In the moment, ask which of these you did.</p>
    <div style={grid}>
      <Box t="HN 3 · The search"><p style={{ margin: 0 }}>Looking at listings and presenting options.</p></Box>
      <Box t="HN 4 · The application"><p style={{ margin: 0 }}>Completing and submitting applications, and getting documents ready.</p></Box>
      <Box t="HN 6 · The resource"><p style={{ margin: 0 }}>The resource that pays for or unlocks housing. Matching a member to a voucher is HN 6.</p></Box>
    </div>
    <Callout tone="key" t="The one-line test">HN 3 and HN 4 are the search and the application. HN 6 is the resource.</Callout>
  </>) },
  { title: 'When more than one fits', render: () => (<>
    <h2 style={h2}>Two subcategories, and that is all there is</h2>
    <KV rows={[['Direct Contact Encounter', 'The service came with direct contact: in person, phone or video, member present and reached.'], ['No Contact / Not Billable', 'The service happened without the member. Still entered, same category, on the day it happened.']]} />
    <p style={{ ...lead, marginTop: '1em' }}>Contact Attempt, Client Engagement and Other Services only offer the second, because those activities never bill.</p>
  </>) },
  { title: 'Three situations', render: () => (<>
    <h2 style={h2}>Three situations, and what to do</h2>
    <div style={{ display: 'grid', gap: '.8em' }}>
      <Box t="The service and the contact happen together"><p style={{ margin: 0 }}>You go through the lease with the member and explain how rent is paid. TSS 2, Direct Contact Encounter, service date that day.</p></Box>
      <Box t="The service happens, the contact never does"><p style={{ margin: 0 }}>1 April, the landlord calls about noise. You advocate for the member, then call them and get voicemail. TSS 4, No Contact / Not Billable, <strong>service date 1 April</strong>.</p></Box>
      <Box t="They happen on different days"><p style={{ margin: 0 }}>Same landlord call on 1 April, the member rings back on 3 April. <strong>Two records.</strong> The advocacy on 1 April as No Contact / Not Billable, and a Direct Contact Encounter on 3 April, both under TSS 4. How far apart they sit does not matter.</p></Box>
    </div>
  </>) },
  { title: 'One visit, several activities', render: () => (<>
    <h2 style={h2}>One visit, several activities</h2>
    <Box t="What to do"><List items={['Pick one category and enter it as the Direct Contact Encounter', 'Summarize all the activities inside that one narrative', 'Optionally enter the others on the same date as No Contact / Not Billable. No narrative needed, because the main entry carries it']} /></Box>
    <Callout tone="good" t="An enrollment meeting still has to land somewhere">It is not its own category. Pick the activity you actually discussed. If nothing you discussed touched an allowable activity, it is <strong>Client Engagement</strong>, and it does not bill.</Callout>
  </>) },
  { title: 'Two formats, one standard', render: () => (<>
    <h2 style={h2}>Use the format you think in</h2>
    <p style={lead}>Whichever you use, the same five things have to be answerable.</p>
    <div style={{ ...card, padding: '.4em 1.2em', marginBottom: '1em' }}>
      {[['Goal', 'Purpose', 'Why the member was seen today, and the goal behind the contact.'], ['Response', 'Barriers + Outcome', 'The current barriers to getting or keeping housing, and how the member participated, responded or progressed.'], ['Intervention', 'Intervention', 'What staff actually did: education, advocacy, coordination, application help, landlord contact, referrals.'], ['Plan', 'Next steps', 'What comes next for staff and for the member.']].map(([g, p, w], i) => (
        <div key={g} style={{ padding: '.65em 0', borderTop: i ? '1px solid #E7EEF3' : 'none' }}>
          <div style={{ display: 'flex', gap: '.6em', flexWrap: 'wrap', marginBottom: '.2em' }}>
            <span style={{ background: '#E7F3FB', color: '#1D6A96', padding: '1px 10px', borderRadius: 999, fontWeight: 700, fontSize: '.88em' }}>GRIP · {g}</span>
            <span style={{ background: '#FFF4DE', color: '#8A4E08', padding: '1px 10px', borderRadius: 999, fontWeight: 700, fontSize: '.88em' }}>PBION · {p}</span>
          </div>
          <span style={{ color: '#3C4A55' }}>{w}</span>
        </div>
      ))}
    </div>
    <Callout tone="key" t="Write it so that someone who was not there can tell what you did">Hold six prompts: Was this Housing Navigation or Tenancy Sustaining? Why did this contact happen? What is getting in the way? What did <em>you</em> do? What changed because of today? What still needs to happen, by whom, by when?</Callout>
  </>) },
  { title: 'The brief contact note', render: () => (<>
    <h2 style={h2}>Short when it is short</h2>
    <Callout tone="key" t="The brief contact note">Voicemails, scheduling, calls to a resource and unsuccessful attempts use a short form: <strong>Purpose, Intervention and Outcome, Next steps.</strong> Not billable, and the full note is not needed. Example: “Attempted to reach the member by phone about housing. Left a voicemail asking them to call back. Will attempt again if there is no response.”</Callout>
    <Callout tone="warn" t="Do not retype the fields">Service date, category, subcategory, method and program are already recorded as fields. Typing them again in the narrative creates a second version that can contradict the first.</Callout>
  </>) },
  { title: 'The same visit, written both ways', render: ({ s, set }) => {
    const rows = s.fmt === 'PBION' ? PBION : GRIP
    return (<>
      <h2 style={h2}>Neither version is better. Both would pass.</h2>
      <p style={lead}>One appointment at Housing Clinic.</p>
      <div style={{ display: 'flex', gap: '.5em', marginBottom: '.9em' }}>
        {(['PBION', 'GRIP'] as const).map(f => <button key={f} onClick={() => set({ fmt: f })} style={{ padding: '.55em 1.3em', borderRadius: 999, border: `2px solid ${s.fmt === f ? '#1D6A96' : '#C9D6DF'}`, background: s.fmt === f ? '#1D6A96' : '#fff', color: s.fmt === f ? '#fff' : '#1D6A96', fontFamily: 'inherit', fontWeight: 700, cursor: 'pointer' }}>{f}</button>)}
      </div>
      <KV rows={rows} />
      <Callout tone="good" t="What makes both of these work">The barrier is a real one, not a category. The intervention has verbs with objects and names who else was spoken to. The outcome shows something moved. The next steps carry two owners and two dates.</Callout>
    </>)
  } },
  { title: 'Words that carry weight', render: () => (<>
    <h2 style={h2}>Vague verbs are what audits catch</h2>
    <div style={grid}>
      <Box t="Strong action verbs"><span>Advocated · Coordinated · Assessed · Educated · Facilitated · Verified · Communicated · Supported · Connected · Monitored · Explained · Completed · Submitted · Obtained · Reviewed · Collaborated · Planned · Documented</span></Box>
      <Box t="Housing Navigation"><span>Assisted · Submitted · Completed · Obtained · Explained · Scheduled · Applied · Referred · Researched · Identified · Explored</span></Box>
      <Box t="Tenancy Sustaining"><span>Reviewed lease · Educated regarding tenant rights · Provided budgeting support · Coordinated with landlord · Developed crisis plan · Discussed conflict resolution · Reviewed rent ledger · Assisted with recertification · Addressed lease compliance</span></Box>
    </div>
    <p style={{ ...lead, marginTop: '1em' }}><strong>Name barriers specifically:</strong> limited income, poor credit, no identification, disability, transportation, limited technology access, language, difficulty completing paperwork, documentation requirements, limited social support, eviction history, criminal background, housing discrimination, lack of affordable housing, waitlists, landlord denials, delays in benefit approval.</p>
    <Callout tone="warn" t="Some belong in the barrier field, not the narrative">Behavioral health, substance use and medical conditions are real barriers and we work with them. In a housing note, write “coordinated with the member’s care team” or “attended a scheduled health appointment.” Never a diagnosis, never a condition name.</Callout>
  </>) },
  { title: 'Sentence starters', render: () => (<>
    <h2 style={h2}>When a note is hard to begin, begin here</h2>
    <div style={grid}>
      <Box t="Purpose or Goal"><List items={['Met with the member to complete an initial Housing Navigation assessment', 'Met with the member to review available housing opportunities', 'Met with the member to assist with completing a housing application', 'Met with the member to obtain required documentation for housing eligibility', 'Contacted the member by phone to coordinate housing-related services']} /></Box>
      <Box t="Intervention"><List items={['Staff reviewed the member’s budget to support housing stability', 'Staff provided problem-solving strategies to address housing barriers', 'Staff made referrals to community resources supporting the housing goal', 'Staff coordinated services with community partners']} /></Box>
      <Box t="Next steps or Plan"><List items={['Staff will follow up with the landlord regarding the application', 'Staff will monitor the status of the applications', 'The member will obtain the required documentation', 'The member will attend the scheduled housing appointment']} /></Box>
    </div>
    <Callout tone="stop" t="A starter is a beginning, not a note">Every one of these needs a specific object after it. “Staff made referrals to community resources” on its own is the vague sentence an audit catches. “Staff referred the member to the Eden I&amp;R utility assistance line and scheduled the intake call for 9/16” is a note.</Callout>
  </>) },
  { title: 'What never goes in a note', render: () => (<>
    <h2 style={h2}>What never goes in a note</h2>
    <p style={lead}>This is the part where one instance is a serious matter rather than something we coach.</p>
    <KV rows={[['One note, one encounter', 'Never copy from an earlier note, another member’s chart, or anywhere else. Similar work over several visits still gets written fresh for that date.'], ['No other member’s name', 'Not in the narrative, not as context, not even a first name.'], ['Write what you did', 'Not what you meant to do, not what usually happens, not what the plan says should have happened.'], ['Correct, do not delete', 'A wrong note gets corrected on the record. It does not disappear.']]} />
    <div style={{ height: '1em' }} />
    <KV rows={[['A diagnosis or clinical detail', '“Attended a scheduled health appointment.”'], ['Domestic violence or survivor status', 'Nothing. Coordinated Entry policy prohibits disclosing it.'], ['Behavioral health or substance use detail', '“Coordinated with the member’s care team.” Nothing further.'], ['A Social Security number or full date of birth', 'Nothing. Those are fields.'], ['Immigration status', 'Nothing, in any form, ever.'], ['An opinion about someone’s character', 'What you observed, in neutral words. “Declined the referral,” not “was uncooperative.”']]} />
    <Callout tone="stop" t="If you are unsure, ask before you write it">Your supervisor would far rather answer the question than find the answer in an audit. Nobody has ever been in trouble here for asking.</Callout>
  </>) },
  { title: 'Check your own note', render: ({ s, set }) => (<>
    <h2 style={h2}>Run this before you finalize</h2>
    <p style={lead}>It is the same list your supervisor uses.</p>
    <div style={card}>
      {CHECKLIST.map((c, i) => (
        <label key={c} style={{ display: 'flex', gap: '.7em', alignItems: 'flex-start', padding: '.45em 0', cursor: 'pointer', borderTop: i ? '1px solid #E7EEF3' : 'none' }}>
          <input type="checkbox" checked={s.checks.includes(i)} onChange={() => set({ checks: s.checks.includes(i) ? s.checks.filter(v => v !== i) : [...s.checks, i] })} style={{ marginTop: '.35em', width: 18, height: 18, accentColor: '#2680B3', flexShrink: 0 }} />{c}
        </label>
      ))}
    </div>
    <p style={{ margin: '.6em 0 0', fontSize: '.9em', color: '#6C7A85' }}>{s.checks.length} of {CHECKLIST.length} checked. This is practice, so it is saved but not scored.</p>
  </>) },
  { title: 'The clocks on your caseload', render: () => (<>
    <h2 style={h2}>The clocks that touch your caseload</h2>
    <KV rows={[['First outreach on a referral', '24 hours, best efforts. Six attempts minimum overall.'], ['Entering a service in HMIS', 'Three business days from the service date.'], ['Housing Support Plan', '30 days from enrollment, refreshed every 180 days.'], ['Billable encounters', 'Three a month, on three different service dates.'], ['Current Living Situation', 'Once a calendar month, or when circumstances change.'], ['CE Housing Assessment', 'Every 6 months. Crisis Assessment every 90 days.'], ['Lost to services', 'No encounter for 90 days, after documented outreach, means exit.'], ['Move-in to TSS', 'Within 30 days of move-in.']]} />
    <Callout tone="key" t="Next: score four notes">For each note, decide whether it bills and what is missing. You need {PASS}% ({Math.ceil(QS.length * PASS / 100)} of {QS.length}) and can retake as often as you like.</Callout>
  </>) },
]

const KEEP = ['Why we write it down', 'What makes an encounter billable', 'Real work that is not billable', 'Search, application or resource?', 'Two formats, one standard', 'The same visit, written both ways', 'What never goes in a note', 'Check your own note']
const LEARN = ALL_LEARN.filter(l => KEEP.includes(l.title))
const PAGES = [...LEARN.map(l => l.title), ...QS.map((_, i) => `Note ${String.fromCharCode(65 + i)}`), 'Your score']

export default function Notes({ navigate }: { navigate: (r: Route) => void }) {
  const [s, setS] = useState<Saved>(() => {
    try {
      const v = JSON.parse(localStorage.getItem(KEY) || '{}')
      return { page: typeof v.page === 'number' && v.page >= 0 && v.page < PAGES.length ? v.page : 0, answers: v.answers && typeof v.answers === 'object' ? v.answers : {}, checks: Array.isArray(v.checks) ? v.checks : [], fmt: v.fmt === 'GRIP' ? 'GRIP' : 'PBION' }
    } catch { return EMPTY }
  })
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(s)) } catch {} }, [s])
  const set = (p: Partial<Saved>) => setS(x => ({ ...x, ...p }))
  const p = s.page
  const qStart = LEARN.length
  const last = PAGES.length - 1
  const qi = p - qStart
  const isQ = qi >= 0 && qi < QS.length
  const isResult = p === last
  const go = (n: number) => { set({ page: n }); window.scrollTo(0, 0) }
  const correct = QS.filter((q, i) => s.answers[i] === q.a).length
  const pct = Math.round((correct / QS.length) * 100)
  const passed = pct >= PASS
  const q = isQ ? QS[qi] : null
  const nextDisabled = isQ && s.answers[qi] === undefined

  return (
    <div style={{ minHeight: '100vh', background: '#EAF3F9', color: '#22333F', fontSize: 17, lineHeight: 1.6 }}>
      <Masthead navigate={navigate} currentPage="notes" />
      <CourseBar kicker="Short course" title="Case Note Bootcamp" step={p + 1} total={PAGES.length} onExit={() => navigate({ page: 'home' })} />
      <main key={p} style={{ maxWidth: '62em', margin: '0 auto', padding: '2.2em 1.4em 4em' }}>
        <p style={eyebrow}>{String(p + 1).padStart(2, '0')} · {isQ ? `Score the note · ${qi + 1} of ${QS.length}` : PAGES[p]}</p>

        {p < qStart && LEARN[p].render({ s, set })}

        {isQ && q && (<>
          <div style={{ ...card, background: '#FBF6EF', borderLeft: '5px solid #F4941C', marginBottom: '1em' }}>
            <p style={label}>Note {String.fromCharCode(65 + qi)}</p>
            <p style={{ margin: 0, fontStyle: 'italic', lineHeight: 1.55, color: '#3C4A55' }}>{q.note}</p>
          </div>
          <h2 style={{ ...h2, color: '#1D6A96', fontSize: 'clamp(1.3em, 3vw, 1.7em)' }}>{q.q}</h2>
          <div style={{ display: 'grid', gap: '.6em' }}>
            {q.opts.map((o, n) => {
              const chosen = s.answers[qi] === n
              return (
                <button key={n} onClick={() => set({ answers: { ...s.answers, [qi]: n } })} style={{ textAlign: 'left', padding: '.85em 1.1em', border: `2px solid ${chosen ? '#2680B3' : '#C9D6DF'}`, borderRadius: 12, background: chosen ? '#E8F1F6' : '#fff', fontFamily: 'inherit', fontSize: '1em', color: '#22333F', cursor: 'pointer' }}>
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
            <p style={{ margin: '0 0 1em' }}>{passed ? 'Sign your training record with your supervisor. Before you finalize any note, ask: does it say what the provider did, or only that something happened?' : `You need ${PASS}% to complete. Review the explanations below, then retake.`}</p>
            <div style={{ display: 'flex', gap: '.8em', flexWrap: 'wrap' }}>
              {!passed && <button onClick={() => { set({ answers: {}, page: qStart }); window.scrollTo(0, 0) }} style={btn(true)}>Retake the scoring</button>}
              <button onClick={() => navigate({ page: 'home' })} style={btn(passed)}>Back to training home</button>
            </div>
          </div>
          <div style={{ display: 'grid', gap: '.7em' }}>
            {QS.map((qq, i) => {
              const ok = s.answers[i] === qq.a
              return (
                <div key={i} style={{ ...card, borderLeft: `5px solid ${ok ? '#1E6B43' : '#B23A22'}`, padding: '1em 1.2em' }}>
                  <p style={{ margin: '0 0 .3em', fontWeight: 600, color: '#1D6A96' }}>Note {String.fromCharCode(65 + i)}. {qq.q}</p>
                  <p style={{ margin: 0 }}><strong style={{ color: ok ? '#1E6B43' : '#B23A22' }}>{ok ? 'Correct. ' : 'Not quite. '}</strong>{!ok && <>Answer: {qq.opts[qq.a]}. </>}{qq.why}</p>
                </div>
              )
            })}
          </div>
        </>)}

        {!isResult && (
          <div style={{ marginTop: '2em', display: 'flex', justifyContent: 'space-between', gap: '.8em' }}>
            <button onClick={() => go(p - 1)} style={{ ...btn(false), visibility: p === 0 ? 'hidden' : 'visible' }}>← Back</button>
            <button disabled={nextDisabled} onClick={() => go(p + 1)} style={btn(true, nextDisabled)}>{p === last - 1 ? 'See my score' : p === qStart - 1 ? 'Score the notes' : 'Next'} →</button>
          </div>
        )}
        {isResult && <div style={{ marginTop: '1.4em' }}><button onClick={() => go(last - 1)} style={btn(false)}>← Back</button></div>}
      </main>
    </div>
  )
}
