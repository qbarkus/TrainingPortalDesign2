import Portrait from '../components/Portrait'
import { TEAM } from '../data/team'
import { ROLE_NAMES } from '../data/courseContent'
import { ROLE_REFERENCE } from '../data/jobDescriptions'
import { askSanjay } from '../components/AskSanjay'
import type { Route } from '../App'
import Masthead from '../components/Masthead'
import StatusBadge from '../components/StatusBadge'
import teamCover from '../imports/team-cover.png'
import roadHome from '../imports/road-home-arrival.jpg'
import ceCover from '../imports/coordinated-entry-cover.png'
import mod1 from '../imports/image-6.png'
import mod2 from '../imports/image-7.png'
import mod3 from '../imports/image-8.png'
import mod4 from '../imports/image-9.png'
import frontDoor from '../imports/step-1-front-door.png'
import sheet from '../imports/Housing_Case_Management_Snapshot.png'
import { foundationStatus, documentationStatus, notesStatus, journeyStatus, davidStatus, practiceStatus, academyStatus, type Status } from '../data/status'

type Path = { num: string; title: string; line: string; topics: string[]; status: Status; cta?: string; go?: Route; tag?: string }

const sheetCrop = { backgroundImage: `url(${sheet})`, backgroundRepeat: 'no-repeat', backgroundSize: '322% auto', backgroundPosition: '50% 69%' }
const COVER: Record<string, React.CSSProperties> = {
  '01': { backgroundImage: `url(${mod1})`, backgroundSize: 'cover', backgroundPosition: 'center', aspectRatio: '1 / 1', height: 'auto' },
  '02': { backgroundImage: `url(${mod2})`, backgroundSize: 'cover', backgroundPosition: 'center', aspectRatio: '1 / 1', height: 'auto' },
  '03': { backgroundImage: `url(${mod3})`, backgroundSize: 'cover', backgroundPosition: 'center', aspectRatio: '1 / 1', height: 'auto' },
  '04': { backgroundImage: `url(${mod4})`, backgroundSize: 'cover', backgroundPosition: 'center', aspectRatio: '1 / 1', height: 'auto' },
  A: { backgroundImage: `url(${ceCover})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundColor: '#12476A' },
  B: sheetCrop,
  C: { backgroundImage: `url(${roadHome})`, backgroundSize: 'cover', backgroundPosition: 'center 30%' },
}

export default function Paths({ navigate }: { navigate: (r: Route) => void }) {
  const PATHS: Path[] = [
    { num: '01', title: 'Aging With Dignity', line: 'The why behind the work.', topics: ['Who we serve and why', 'Housing as a foundation for stability', 'Person-centered service delivery', 'How each role passes the baton'], status: foundationStatus(), cta: 'Begin', go: { page: 'foundation' }, tag: 'Required' },
    { num: '02', title: 'The Road Home', line: 'Follow Ms. Turner from first worry to the notes you write.', topics: ['Account, Referral, Program, Case', 'Care Plan and Benefits'], status: journeyStatus(), cta: 'Walk the road', go: { page: 'journey' }, tag: 'Required' },
    { num: '03', title: 'Coordinated Entry Academy', line: 'From access to assessment to housing connection.', topics: ['Access, assessment and referral', 'Your seat in the Coordinated Entry relay', 'The living care plan', 'Final exam and certificate'], status: academyStatus(), cta: 'Find my steps', go: { page: 'academy' }, tag: 'Required for role' },
    { num: '04', title: 'Case Note Bootcamp', line: 'Write it so someone who was not there can tell what you did.', topics: ['What makes an encounter billable', 'PBION and GRIP formats', 'What never goes in a note', 'Score four practice notes'], status: notesStatus(), cta: 'Start the bootcamp', go: { page: 'notes' }, tag: 'Required for role' },
  ]
  const MORE: Path[] = [
    { num: 'C', title: 'Mock Records Practice', line: 'Real scenarios, fictional records. Spot what is wrong.', topics: ['Vague notes and missing chain links', 'Duplicate accounts', 'When a file is ready to close'], status: practiceStatus(), cta: 'Open a mock record', go: { page: 'practice' }, tag: 'Scenarios' },
    { num: 'A', title: 'Documentation Short Course', line: 'Know it, write it with your member, keep the clock.', topics: ['CalAIM eligibility checks', 'The Housing Support Plan', 'HMIS and our own record'], status: documentationStatus(), cta: 'Start the short course', go: { page: 'documentation' }, tag: 'Required for role' },
    { num: 'B', title: 'David Miller: Staying Reachable', line: 'Missed contacts, re-engagement and knowing when a file is ready to close.', topics: ['Contact attempts and voicemails', 'Re-engagement', 'Closure readiness'], status: davidStatus(), cta: 'Start the short course', go: { page: 'david' } },
  ]
  const DAVID = MORE.splice(2, 1)[0]
  const card = (p: Path) => (
            <article key={p.num} style={{ background: '#fff', borderRadius: 16, border: '1px solid #C9D6DF', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 6px 18px rgba(29,106,150,.08)', opacity: p.go ? 1 : .88 }}>
              <div role="img" aria-label={p.title} style={{ height: 200, backgroundRepeat: 'no-repeat', backgroundColor: '#D8E7F0', position: 'relative', ...COVER[p.num] }}>
                {!/^\d/.test(p.num) && <span style={{ position: 'absolute', bottom: 12, left: 12, background: 'rgba(255,255,255,.94)', color: '#1D6A96', fontWeight: 700, fontSize: 13, letterSpacing: '.12em', padding: '5px 12px', borderRadius: 999 }}>SHORT COURSE</span>}
              </div>
              <div style={{ padding: '22px 26px 26px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <span />
                <span style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{p.tag && <span style={{ padding: '3px 11px', borderRadius: 999, background: '#E7F3FB', color: '#1D6A96', fontSize: 12.5, fontWeight: 700 }}>{p.tag}</span>}<StatusBadge status={p.status} /></span>
              </div>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, lineHeight: 1.2, color: '#1D6A96' }}>{p.title}</h2>
              <p style={{ margin: 0, fontSize: 16.5, fontStyle: 'italic', color: '#3C4A55' }}>{p.line}</p>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 5, flex: 1 }}>
                {p.topics.map(t => <li key={t} style={{ fontSize: 15, color: '#3C4A55' }}><span style={{ color: '#349CD4', fontWeight: 700, marginRight: 8 }}>✓</span>{t}</li>)}
              </ul>
              {p.go
                ? <button onClick={() => navigate(p.go!)} style={{ marginTop: 6, alignSelf: 'flex-start', background: '#F4941C', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 22px', fontFamily: 'inherit', fontWeight: 700, fontSize: 15.5, cursor: 'pointer' }}>{p.cta} →</button>
                : <p style={{ margin: '6px 0 0', fontSize: 14, color: '#6C7A85' }}>Coming soon. Your supervisor will share this path when it is ready.</p>}
            </div>
            </article>
          )

  return (
    <div style={{ minHeight: '100vh', background: '#EAF3F9', color: '#22333F' }}>
      <Masthead navigate={navigate} currentPage="paths" />
      <section style={{ background: 'linear-gradient(160deg, #2680B3 0%, #1D6A96 100%)', color: '#fff', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '48px 32px 52px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 36, alignItems: 'center' }}>
          <div>
            <p style={{ margin: '0 0 10px', fontSize: 13, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#FFD69A' }}>Learning paths</p>
            <h1 style={{ margin: '0 0 12px', fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 700, lineHeight: 1.08 }}>Aging With Dignity, from first connection to housing stability</h1>
            <p style={{ margin: 0, fontSize: 19, lineHeight: 1.55, color: '#E1EEF4', maxWidth: '38em' }}>Pick the path that fits your seat. Each one is short, practical, and ends with one clear next step.</p>
          </div>
          <img src={teamCover} alt="The St. Mary's Center housing team" style={{ width: '100%', height: 'auto', maxHeight: 300, objectFit: 'cover', borderRadius: 18, border: '4px solid rgba(255,255,255,.85)', boxShadow: '0 18px 40px rgba(10,40,60,.35)' }} />
        </div>
      </section>

      <main style={{ maxWidth: 1180, margin: '0 auto', padding: '44px 32px 20px' }}>
        <p style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#F4941C' }}>Academy 1</p>
        <h2 style={{ margin: '0 0 20px', fontSize: 'clamp(25px, 3vw, 32px)', fontWeight: 700, color: '#1D6A96' }}>Foundations: Who We Serve, How the Journey Works, and How We Document It</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: 22 }}>
          {PATHS.map(card)}
        </div>

        <p style={{ margin: '56px 0 6px', fontSize: 13, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#F4941C' }}>Short courses</p>
        <h2 style={{ margin: '0 0 20px', fontSize: 'clamp(25px, 3vw, 32px)', fontWeight: 700, color: '#1D6A96' }}>Practice with real scenarios</h2>
        <article style={{ background: '#fff', borderRadius: 16, border: '1px solid #C9D6DF', overflow: 'hidden', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', boxShadow: '0 6px 18px rgba(29,106,150,.08)' }}>
          <div role="img" aria-label="Short courses" style={{ minHeight: 220, backgroundRepeat: 'no-repeat', backgroundColor: '#D8E7F0', position: 'relative', ...COVER.C }}>
            <span style={{ position: 'absolute', bottom: 12, left: 12, background: 'rgba(255,255,255,.94)', color: '#1D6A96', fontWeight: 700, fontSize: 13, letterSpacing: '.12em', padding: '5px 12px', borderRadius: 999 }}>SHORT COURSES</span>
          </div>
          <div style={{ padding: '24px 28px', gridColumn: 'span 2', minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, flexWrap: 'wrap', marginBottom: 6 }}>
              <h3 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: '#1D6A96' }}>Short courses</h3>
              <span style={{ fontSize: 14.5, fontWeight: 600, color: '#3C4A55' }}>{MORE.filter(m => m.status === 'Completed').length} of {MORE.length} complete</span>
            </div>
            <p style={{ margin: '0 0 14px', fontSize: 16, color: '#3C4A55' }}>One set, two parts. Take them in any order.</p>
            <div style={{ display: 'grid', gap: 10 }}>
              {MORE.map((m, i) => (
                <div key={m.num} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px 14px', border: '1.5px solid #DCE7EE', borderRadius: 12, padding: '12px 16px' }}>
                  <span style={{ flex: '0 0 auto', width: 32, height: 32, borderRadius: '50%', background: '#E7F3FB', color: '#1D6A96', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
                  <span style={{ flex: '1 1 14em', minWidth: 0 }}>
                    <span style={{ display: 'block', fontSize: 17, fontWeight: 700, color: '#1D6A96' }}>{m.title}</span>
                    <span style={{ display: 'block', fontSize: 14.5, color: '#3C4A55', lineHeight: 1.4 }}>{m.line}</span>
                  </span>
                  <StatusBadge status={m.status} />
                  <button onClick={() => navigate(m.go!)} style={{ background: '#F4941C', color: '#fff', border: 'none', borderRadius: 10, padding: '9px 18px', fontFamily: 'inherit', fontWeight: 700, fontSize: 14.5, cursor: 'pointer' }}>{m.status === 'Not started' ? 'Start' : m.status === 'Completed' ? 'Review' : 'Continue'} →</button>
                </div>
              ))}
            </div>
          </div>
        </article>

        <p style={{ margin: '56px 0 6px', fontSize: 13, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#F4941C' }}>Outreach</p>
        <h2 style={{ margin: '0 0 8px', fontSize: 'clamp(25px, 3vw, 32px)', fontWeight: 700, color: '#1D6A96' }}>Reaching people where they are</h2>
        <p style={{ margin: '0 0 22px', fontSize: 17, lineHeight: 1.55, color: '#3C4A55', maxWidth: '42em' }}>Most of our members do not start at a desk. Outreach is how the baton is first picked up: in the field, at the curb, at the door, with respect before any paperwork. Street outreach and the outreach team come first in the relay.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 22, marginBottom: 22 }}>
          <div style={{ background: '#fff', border: '1px solid #C9D6DF', borderRadius: 16, padding: '22px 26px', boxShadow: '0 6px 18px rgba(29,106,150,.08)' }}>
            <h3 style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#F4941C' }}>Street outreach</h3>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 9 }}>
              {['Field outreach to encampments, curbside communities and severe-weather response', 'Engagement first: a name, a hello and a reason to come back tomorrow', 'Safety planning with the person, not for them', 'Calls from the community, partners, city teams and Senior Ambassadors', 'Warm handoff to Outreach & Linkage for documents and connection to intake'].map(t => <li key={t} style={{ fontSize: 15.5, lineHeight: 1.45, color: '#22333F' }}><span style={{ color: '#349CD4', fontWeight: 700, marginRight: 8 }}>✓</span>{t}</li>)}
            </ul>
          </div>
          <div style={{ background: '#fff', border: '1px solid #C9D6DF', borderRadius: 16, padding: '22px 26px', boxShadow: '0 6px 18px rgba(29,106,150,.08)' }}>
            <h3 style={{ margin: '0 0 14px', fontSize: 13, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#F4941C' }}>Our outreach team</h3>
            <div style={{ display: 'grid', gap: 16 }}>
              {(['SOC', 'OLS'] as const).map(id => {
                const t = TEAM.find(x => x.role === ROLE_NAMES[id])!
                return (
                  <div key={id} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{ width: 64, height: 64, flex: '0 0 auto', borderRadius: '50%', overflow: 'hidden', background: t.color }}><Portrait initials={t.initials} alt={t.name} /></div>
                    <div>
                      <div style={{ fontSize: 17, fontWeight: 700, color: '#1D6A96' }}>{t.name}</div>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: '#8A4E08', marginBottom: 4 }}>{t.role}</div>
                      <div style={{ fontSize: 15, lineHeight: 1.45, color: '#3C4A55' }}>{ROLE_REFERENCE[id].owns}</div>
                    </div>
                  </div>
                )
              })}
            </div>
            <p style={{ margin: '16px 0 0', fontSize: 15, color: '#3C4A55' }}>What the member should feel: <em>seen and respected, before anyone asks them for anything.</em></p>
          </div>
        </div>

        <div style={{ background: '#E7F3FB', borderRadius: 16, padding: '20px 26px', marginBottom: 22 }}>
          <h3 style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#1D6A96' }}>When someone cannot be reached</h3>
          <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.55, color: '#22333F' }}>A missed appointment or a voicemail is not the end of outreach. Keep trying, document every attempt, respect "not right now", and talk to your manager before you decide a file is ready to close. Practice it with David Miller below.</p>
        </div>
        <div style={{ maxWidth: 420 }}>{card(DAVID)}</div>

        <div style={{ marginTop: 40, background: '#1D6A96', color: '#fff', borderRadius: 16, padding: '26px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 24em' }}>
            <h3 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 700 }}>Need a fast answer on the job?</h3>
            <p style={{ margin: 0, color: '#E1EEF4' }}>Sanjay Rao, our Senior Housing Services Manager, answers common job questions in one screen.</p>
          </div>
          <button onClick={askSanjay} style={{ background: '#F4941C', color: '#fff', border: 'none', borderRadius: 10, padding: '13px 24px', fontFamily: 'inherit', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Ask Sanjay →</button>
        </div>
      </main>
      <div style={{ height: 56 }} />
    </div>
  )
}
