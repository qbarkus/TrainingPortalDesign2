import { useState } from 'react'
import type { Route } from '../App'
import { ROLE_NAMES } from '../data/courseContent'
import cover from '../imports/image-16.png'

const field: React.CSSProperties = { position: 'absolute', left: '78.47%', width: '18.42%', boxSizing: 'border-box', border: '2px solid #B9C9E6', borderRadius: 8, background: '#fff', color: '#22333F', fontFamily: 'inherit', fontSize: 'clamp(10px, 1vw, 16px)', padding: '0 2%' }

export default function Cover({ navigate }: { navigate: (r: Route) => void }) {
  const saved = (() => { try { const d = JSON.parse(localStorage.getItem('smc-training-progress') || '{}'); const r = localStorage.getItem('smc-my-role') || d.r || ''; return d.n || r ? { n: String(d.n || ''), r } : null } catch { return null } })()
  const [asking, setAsking] = useState(!!saved)
  const [name, setName] = useState('')
  const [role, setRole] = useState('')

  function sameRole() { setName(saved?.n || ''); setRole(saved?.r || ''); setAsking(false) }
  function someoneElse() {
    try { Object.keys(localStorage).filter(k => k.startsWith('smc-') || k === 'roadhome.v1').forEach(k => localStorage.removeItem(k)) } catch {}
    setName(''); setRole(''); setAsking(false)
  }

  function enter(e: React.FormEvent) {
    e.preventDefault()
    if (!role) return
    try {
      const raw = localStorage.getItem('smc-training-progress')
      const data = raw ? JSON.parse(raw) : { d: [] }
      data.n = name.trim()
      data.r = role
      localStorage.setItem('smc-training-progress', JSON.stringify(data))
      if (role) localStorage.setItem('smc-my-role', role)
    } catch {}
    navigate({ page: 'home' })
  }

  const nameInput = (s?: React.CSSProperties) => <input aria-label="Your name" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" autoComplete="given-name" style={{ ...s }} />
  const roleSelect = (s?: React.CSSProperties) => (
    <select aria-label="Your role" value={role} onChange={e => setRole(e.target.value)} style={{ ...s }}>
      <option value="">Select your role</option>
      {Object.keys(ROLE_NAMES).map(id => <option key={id} value={id}>{ROLE_NAMES[id]}</option>)}
    </select>
  )
  const enterLabel = 'Enter Training Journey →'

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {asking && saved && (
        <div role="dialog" aria-modal="true" aria-label="Welcome back" style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(6,48,79,.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: '#fff', borderRadius: 18, padding: '28px 28px 24px', maxWidth: 460, width: '100%', boxShadow: '0 24px 60px rgba(6,48,79,.35)' }}>
            <p style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: '#F4941C' }}>Welcome back</p>
            <h2 style={{ margin: '0 0 6px', fontSize: 26, fontWeight: 700, color: '#12476A' }}>Is this {saved.n || 'you'}?</h2>
            <p style={{ margin: '0 0 20px', color: '#3C4A55', lineHeight: 1.5 }}>{saved.r && ROLE_NAMES[saved.r] ? `Saved on this device as ${ROLE_NAMES[saved.r]}.` : 'Progress is saved on this device.'} Pick one so the right person's progress is kept.</p>
            <div style={{ display: 'grid', gap: 10 }}>
              <button onClick={() => navigate({ page: 'home' })} style={{ border: 'none', borderRadius: 10, background: '#F4941C', color: '#fff', fontFamily: 'inherit', fontWeight: 700, fontSize: 16, padding: 14, cursor: 'pointer' }}>Yes, continue my training</button>
              <button onClick={sameRole} style={{ border: '1.5px solid #2680B3', borderRadius: 10, background: '#fff', color: '#1D6A96', fontFamily: 'inherit', fontWeight: 700, fontSize: 16, padding: 13, cursor: 'pointer' }}>Same person, different role</button>
              <button onClick={someoneElse} style={{ border: '1.5px solid #C9D6DF', borderRadius: 10, background: '#fff', color: '#3C4A55', fontFamily: 'inherit', fontWeight: 600, fontSize: 16, padding: 13, cursor: 'pointer' }}>No, someone else (start fresh)</button>
            </div>
          </div>
        </div>
      )}
      <form onSubmit={enter}>
        <div className="cover-art">
          <img src={cover} alt="Welcome to the Senior Housing Services Academy at St. Mary's Center. Enter your name and role to begin your training journey." />
          <div className="cover-overlay" style={{ position: 'absolute', inset: 0 }}>
            {nameInput({ ...field, top: '51.33%', height: '5.31%' })}
            {roleSelect({ ...field, top: '62.7%', height: '5.42%' })}
            <button type="submit" style={{ position: 'absolute', left: '78.47%', width: '18.42%', top: '70.9%', height: '6.4%', border: 'none', borderRadius: 8, background: '#F4941C', color: '#fff', fontFamily: 'inherit', fontWeight: 700, fontSize: 'clamp(10px, 1.1vw, 18px)', whiteSpace: 'nowrap', cursor: role ? 'pointer' : 'not-allowed', opacity: 1, filter: role ? 'none' : 'saturate(.8)' }}>{enterLabel}</button>
          </div>
        </div>
        <div className="cover-below" style={{ maxWidth: 480, margin: '0 auto', padding: '28px 24px 40px', gap: 14 }}>
          <h2 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: '#12476A' }}>Let's get started!</h2>
          {nameInput({ width: '100%', boxSizing: 'border-box', border: '2px solid #B9C9E6', borderRadius: 8, padding: '14px', fontFamily: 'inherit', fontSize: 16 })}
          {roleSelect({ width: '100%', boxSizing: 'border-box', border: '2px solid #B9C9E6', borderRadius: 8, padding: '14px', fontFamily: 'inherit', fontSize: 16, background: '#fff' })}
          <button type="submit" style={{ border: 'none', borderRadius: 10, background: '#F4941C', color: '#fff', fontFamily: 'inherit', fontWeight: 700, fontSize: 17, padding: '15px', cursor: role ? 'pointer' : 'not-allowed', opacity: role ? 1 : .75 }}>{enterLabel}</button>
        </div>
      </form>
    </div>
  )
}
