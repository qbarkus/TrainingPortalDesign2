import { CONTENT, GUIDE, ROLES, ROLE_NAMES, ORDER } from '../data/courseContent'
import { ROLE_REFERENCE } from '../data/jobDescriptions'
import Portrait from './Portrait'
import { TEAM, type TeamMember } from '../data/team'

function Face({ p, size }: { p: TeamMember; size: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: 16, background: p.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.3, fontWeight: 700, overflow: 'hidden', flexShrink: 0 }}>
      <Portrait initials={p.initials} alt={p.name} />
    </div>
  )
}

export default function MeetTeam({ name, roleId }: { name: string; roleId: string }) {
  const mySteps = ORDER.filter(id => ROLES[roleId]?.[id])
  const jd = ROLE_REFERENCE[roleId]
  const guideNames = mySteps.map(id => GUIDE[id].name)
  const guides = TEAM.filter(t => guideNames.includes(t.name))
  const others = TEAM.filter(t => !guideNames.includes(t.name))
  const stepsBy = (n: string) => mySteps.filter(id => GUIDE[id].name === n).map(id => id.replace('S', 'Step '))

  return (
    <section style={{ maxWidth: '62em', margin: '0 auto', padding: '2.4em 1.4em 0' }}>
      <p style={{ margin: '0 0 .5em', fontSize: '.72em', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#F4941C' }}>Page 3 of 3 · Your role and your team</p>
      <h2 style={{ margin: '0 0 .7em', fontSize: 'clamp(1.6em, 3.8vw, 2.2em)', fontWeight: 600, color: '#2680B3' }}>Meet the team, {name.trim().split(' ')[0]}</h2>

      <div style={{ background: '#fff', border: '1px solid #DCE7EE', borderRadius: 18, padding: '1.6em', boxShadow: '0 16px 40px rgba(6,48,79,.08)', marginBottom: '1.6em' }}>
        <p style={{ margin: '0 0 .3em', fontSize: '.72em', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#8A4E08' }}>Your job description</p>
        <h3 style={{ margin: '0 0 .4em', fontSize: '1.5em', fontWeight: 600, color: '#1D6A96' }}>{ROLE_NAMES[roleId]}</h3>
        <p style={{ margin: '0 0 1.1em', fontSize: '.86em', color: '#6C7A85' }}>{jd.reports}</p>
        <p style={{ margin: '0 0 1.2em', lineHeight: 1.6, color: '#22333F' }}><strong style={{ color: '#2680B3' }}>You own: </strong>{jd.owns}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 15em), 1fr))', gap: '.8em', marginBottom: '1.3em' }}>
          {([['You receive the baton from', jd.receives], ['You pass the baton to', jd.hands], ['Meets members', jd.meets], ['Your boundary', jd.boundary], ['The member feels', jd.feels]] as const).map(([k, v]) => (
            <div key={k} style={{ background: '#EAF3F9', borderRadius: 12, padding: '.8em 1em' }}>
              <div style={{ fontSize: '.7em', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: '#2680B3', marginBottom: '.25em' }}>{k}</div>
              <div style={{ fontSize: '.94em', lineHeight: 1.5, color: '#22333F' }}>{v}</div>
            </div>
          ))}
        </div>
        <div>
          <div style={{ fontSize: '.8em', fontWeight: 700, color: '#2680B3', marginBottom: '.5em' }}>The CE steps you own</div>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 15em), 1fr))', gap: '.35em' }}>
            {mySteps.map(id => (
              <li key={id} style={{ borderLeft: '4px solid #F4941C', background: '#F7FBFD', borderRadius: 8, padding: '.4em .8em', fontSize: '.94em' }}>
                <strong style={{ color: '#8A4E08' }}>{id.replace('S', 'Step ')}</strong> · {CONTENT[id].title}
              </li>
            ))}
          </ul>
        </div>
        <p style={{ margin: '1.2em 0 0', fontSize: '.8em', color: '#6C7A85' }}>Role reference from the Senior Housing Services training. Your official job description from HR is the source of record.</p>
      </div>

      <h3 style={{ margin: '0 0 .8em', fontSize: '1.2em', fontWeight: 600, color: '#1D6A96' }}>Your guides on the steps you own</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 17em), 1fr))', gap: '.9em', marginBottom: '1.6em' }}>
        {guides.map(p => (
          <div key={p.name} style={{ display: 'flex', gap: '1em', background: '#2680B3', borderRadius: 16, padding: '1em', color: '#fff' }}>
            <Face p={p} size={88} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: '1.05em' }}>{p.name}</div>
              <div style={{ fontSize: '.86em', color: '#CFE2EE', marginBottom: '.4em' }}>{p.role}</div>
              <div style={{ fontSize: '.78em', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: '#FFD69A' }}>{stepsBy(p.name).join(' · ')}</div>
            </div>
          </div>
        ))}
      </div>

      <h3 style={{ margin: '0 0 .8em', fontSize: '1.2em', fontWeight: 600, color: '#1D6A96' }}>The rest of the team you will pass the baton to</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 10em), 1fr))', gap: '.9em' }}>
        {others.map(p => (
          <div key={p.name} style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '.5em' }}><Face p={p} size={72} /></div>
            <div style={{ fontWeight: 600, fontSize: '.92em', color: '#1D6A96' }}>{p.name}</div>
            <div style={{ fontSize: '.8em', color: '#5A6873' }}>{p.role}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
