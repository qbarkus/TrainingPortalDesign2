import { askSanjay } from '../components/AskSanjay'
import { useState, useEffect } from 'react'
import type { Route } from '../App'
import Masthead from '../components/Masthead'
import OrgChart from '../components/OrgChart'
import { ROLE_NAMES } from '../data/courseContent'
import { ROLE_REFERENCE } from '../data/jobDescriptions'

const Block = ({ t, children }: { t: string; children: React.ReactNode }) => (
  <section style={{ background: '#fff', border: '1px solid #C9D6DF', borderRadius: 16, padding: '20px 24px', boxShadow: '0 6px 18px rgba(29,106,150,.08)' }}>
    <h3 style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#F4941C' }}>{t}</h3>
    <div style={{ fontSize: 16.5, lineHeight: 1.55, color: '#22333F' }}>{children}</div>
  </section>
)

export default function MyRole({ navigate }: { navigate: (r: Route) => void }) {
  const [role, setRole] = useState<string>(() => { try { return localStorage.getItem('smc-my-role') || '' } catch { return '' } })
  const pick = (id: string) => { setRole(id); try { localStorage.setItem('smc-my-role', id) } catch {} }
  const ref = role ? ROLE_REFERENCE[role] : undefined
  useEffect(() => { if (ref) try { localStorage.setItem('smc-role-viewed', '1') } catch {} }, [ref])
  const link = (label: string, r: Route) => (
    <button onClick={() => navigate(r)} style={{ background: '#E7F3FB', color: '#1D6A96', border: 'none', borderRadius: 10, padding: '10px 16px', fontFamily: 'inherit', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>{label} →</button>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#EAF3F9', color: '#22333F' }}>
      <Masthead navigate={navigate} currentPage="role" />
      <section style={{ background: 'linear-gradient(160deg, #2680B3 0%, #1D6A96 100%)', color: '#fff' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '44px 32px 48px' }}>
          <p style={{ margin: '0 0 10px', fontSize: 13, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#FFD69A' }}>My role</p>
          <h1 style={{ margin: '0 0 10px', fontSize: 'clamp(30px, 4vw, 46px)', fontWeight: 700, lineHeight: 1.1 }}>{role ? ROLE_NAMES[role] : 'Choose your seat'}</h1>
          <p style={{ margin: 0, fontSize: 18, color: '#E1EEF4', maxWidth: '38em' }}>{ref ? ref.reports : 'Pick your position on the team chart and see only what applies to you.'}</p>
        </div>
      </section>

      <main style={{ maxWidth: 1180, margin: '0 auto', padding: '36px 32px 64px' }}>
        <h2 style={{ margin: '0 0 6px', fontSize: 'clamp(22px, 2.6vw, 28px)', fontWeight: 600, color: '#1D6A96' }}>Who we are, and where you fit</h2>
        <p style={{ margin: '0 0 8px', fontSize: 16, color: '#3C4A55' }}>Tap your position on the team chart. Everything below changes to match your seat.</p>
        <div style={{ marginBottom: 32 }}><OrgChart role={role} onSelect={pick} /></div>

        {ref ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 20, alignItems: 'start' }}>
            <Block t="Your responsibilities">{ref.owns}</Block>
            <Block t="Where the baton comes from">{ref.receives}</Block>
            <Block t="Where you pass it">{ref.hands}</Block>
            <Block t="Your boundary">{ref.boundary}</Block>
            <Block t="Where you work">{ref.meets}</Block>
            <Block t="What the member should feel">{ref.feels}</Block>
            <Block t="Your required training">
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {link('Aging With Dignity', { page: 'foundation' })}
                {link('Role academy', { page: 'academy' })}
                {link('Documentation', { page: 'documentation' })}
              </div>
            </Block>
            <Block t="Need a fast answer?">
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>{<button onClick={askSanjay} style={{ background: '#2680B3', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 18px', fontFamily: 'inherit', fontWeight: 700, cursor: 'pointer' }}>Ask Sanjay</button>}</div>
            </Block>
          </div>
        ) : (
          <p style={{ fontSize: 17, color: '#3C4A55' }}>{role ? 'That seat does not have a job description yet. Your supervisor will add it.' : 'Tap a position on the chart above to begin.'}</p>
        )}
      </main>
    </div>
  )
}
