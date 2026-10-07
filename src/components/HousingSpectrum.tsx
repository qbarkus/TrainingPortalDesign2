import { useState } from 'react'
import sheet from '../imports/image-13.png'

const STAGES = [
  { n: 1, name: 'Stably Housed', def: 'Safe, stable, appropriate housing', color: '#1D6A96', group: 0,
    scenario: 'Mr. Alvarez, 71, has lived in his apartment for years. His rent is steady and he feels safe at home.',
    role: ['Keep in touch and celebrate stability.', 'Share what help exists, just in case.', 'Invite feedback on how we can serve better.'],
    next: ['Confirm housing remains safe and affordable.', 'Share resources and our contact information.', 'Check in again at the next review.'] },
  { n: 2, name: 'Housing Inadequate', def: 'Housing exists but does not meet basic needs', color: '#1D6A96', group: 0,
    scenario: 'Mrs. Chen, 78, has a roof, but the heat has been broken for months and the stairs are unsafe for her.',
    role: ['Listen for the unsafe or unmet need.', 'Connect to repairs, accessibility and benefits.', 'Prevent a poor fit from becoming a loss of home.'],
    next: ['Document what is unsafe or missing.', 'Refer to repair or accessibility resources.', 'Follow up until the problem is fixed.'] },
  { n: 3, name: 'Housing Insecure', def: 'At risk of losing housing', color: '#F4941C', group: 0,
    scenario: 'David Miller, 63, is one month behind on rent after a temporary loss of income. He has received a warning notice and is worried he may lose his apartment.',
    role: ['Early intervention and proactive outreach.', 'Problem-solving and connection to benefits and community resources.', 'Prevent the loss of housing before crisis deepens.'],
    next: ['Assess immediate risk and current housing status.', 'Connect to rental assistance, benefits, or financial counseling.', 'Open the right referral pathway and follow up.'] },
  { n: 4, name: 'Unhoused', def: 'No fixed, regular, adequate nighttime residence', color: '#F4941C', group: 1,
    scenario: 'Ms. Turner, 74, lost her apartment and now sleeps in her car. She is polite, tired and unsure who to trust.',
    role: ['Meet her where she is, with respect.', 'Build trust before paperwork.', 'Housing first: move toward a home quickly.'],
    next: ['Make a warm handoff to the Housing Clinic.', 'Start assessment and a care plan around what matters to her.', 'Begin the housing search with her.'] },
  { n: 5, name: 'Chronically Unhoused', def: 'Long term or repeated homelessness with a disabling condition', color: '#F4941C', group: 1,
    scenario: 'Mr. Reed, 68, has been living outside for more than a year and has a health condition that makes every day harder.',
    role: ['Stay consistent. Trust takes time.', 'Coordinate health, housing and benefits together.', 'Never give up on finding the right fit.'],
    next: ['Prioritize through Coordinated Entry.', 'Pair housing with supportive services.', 'Keep showing up, and follow up after move-in.'] },
]

const CX = [528, 680, 833, 987, 1141]
const AW = 120, AH = 104, AY = 308
const Art = ({ k, size }: { k: number; size: number | string }) => (
  <div role="img" aria-hidden style={{ width: size, aspectRatio: `${AW} / ${AH}`, margin: '0 auto', backgroundImage: `url(${sheet})`, backgroundRepeat: 'no-repeat', backgroundSize: `${(1672 / AW) * 100}% auto`, backgroundPosition: `${((CX[k] - AW / 2) / (1672 - AW)) * 100}% ${(AY / (941 - AH)) * 100}%`, mixBlendMode: 'multiply', WebkitMaskImage: 'radial-gradient(ellipse at center, #000 74%, transparent 90%)', maskImage: 'radial-gradient(ellipse at center, #000 74%, transparent 90%)' }} />
)
const Check = () => <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden style={{ flex: '0 0 auto', marginTop: 2 }}><circle cx="10" cy="10" r="10" fill="#F4941C" /><path d="M5.5 10.5l3 3 6-6.5" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
const List = ({ items }: { items: string[] }) => (
  <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '.5em' }}>
    {items.map(t => <li key={t} style={{ display: 'flex', gap: '.6em', lineHeight: 1.45, color: '#22333F' }}><Check />{t}</li>)}
  </ul>
)
const h4: React.CSSProperties = { margin: '1.2em 0 .5em', fontSize: '1.05em', fontWeight: 700, color: '#12476A', paddingTop: '.9em', borderTop: '1px solid #DCE7EE' }

export default function HousingSpectrum({ onNext }: { onNext?: () => void }) {
  const [i, setI] = useState(2)
  const s = STAGES[i]
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 6, marginBottom: 6 }}>
        <div style={{ gridColumn: '1 / 4', textAlign: 'center', padding: '.6em .4em', borderRadius: 12, background: '#E1F0FA', color: '#1D6A96', fontSize: '.92em' }}><b style={{ letterSpacing: '.06em' }}>PREVENTION</b><br />stages 1 to 3, so she never loses her home</div>
        <div style={{ gridColumn: '4 / 6', textAlign: 'center', padding: '.6em .4em', borderRadius: 12, background: '#FDEBD3', color: '#B2620A', fontSize: '.92em' }}><b style={{ letterSpacing: '.06em' }}>RESPONSE</b><br />stages 4 to 5, housing first</div>
      </div>
      <div role="tablist" aria-label="Housing spectrum stages" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 6, marginBottom: '1.2em' }}>
        {STAGES.map((x, k) => {
          const on = k === i
          return (
            <button key={x.n} role="tab" aria-selected={on} onClick={() => setI(k)} style={{ position: 'relative', textAlign: 'center', padding: '1.3em .3em .8em', border: `2px solid ${on ? '#F4941C' : x.group ? '#F6D3A6' : '#BDD9EC'}`, borderRadius: 14, background: on ? '#FFF6E8' : '#fff', boxShadow: on ? '0 8px 22px rgba(244,148,28,.3)' : 'none', fontFamily: 'inherit', cursor: 'pointer', color: '#22333F' }}>
              <span style={{ position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)', width: 28, height: 28, borderRadius: '50%', background: on || x.group ? '#F4941C' : '#1D6A96', color: '#fff', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{x.n}</span>
              <div className="spectrum-art"><Art k={k} size="70%" /></div>
              <div className="spectrum-name" style={{ fontWeight: 700, fontSize: 'clamp(.78em, 1.8vw, 1em)', lineHeight: 1.2, color: '#12476A' }}>{x.name}</div>
              <div className="spectrum-def" style={{ fontSize: '.8em', color: '#5A6873', marginTop: '.4em', lineHeight: 1.3 }}>{x.def}</div>
            </button>
          )
        })}
      </div>
      <div style={{ background: '#fff', border: '1px solid #C9D6DF', borderRadius: 18, padding: '1.3em 1.5em', boxShadow: '0 6px 18px rgba(29,106,150,.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
          <div style={{ width: 84, flex: '0 0 auto' }}><Art k={i} size="100%" /></div>
          <div>
            <div style={{ fontSize: '.76em', fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#F4941C' }}>Stage {s.n}</div>
            <h3 style={{ margin: '.1em 0 .2em', fontSize: '1.5em', fontWeight: 700, color: '#1D6A96' }}>{s.name}</h3>
            <p style={{ margin: 0, color: '#5A6873' }}>{s.def}</p>
          </div>
        </div>
        <h4 style={h4}>Real-world scenario</h4>
        <p style={{ margin: 0, lineHeight: 1.55 }}>{s.scenario}</p>
        <h4 style={h4}>Our role</h4>
        <List items={s.role} />
        <h4 style={h4}>Best next step</h4>
        <List items={s.next} />
      </div>
      <p style={{ margin: '1em 0 0', fontSize: '.95em', color: '#3C4A55' }}>The spectrum is a description, not a ranking. We name the state, never the person. Every stage deserves dignity, respect and our full support.</p>
      {onNext && <div style={{ textAlign: 'center', marginTop: '1.2em' }}><button onClick={onNext} style={{ background: '#F4941C', color: '#fff', border: 'none', borderRadius: 999, padding: '.9em 2em', fontFamily: 'inherit', fontWeight: 700, fontSize: '1.05em', cursor: 'pointer' }}>Continue to Our Programs →</button></div>}
    </div>
  )
}
