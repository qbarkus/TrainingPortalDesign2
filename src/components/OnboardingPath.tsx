import { useMemo } from 'react'
import type { Route } from '../App'
import { ROLES, ROLE_NAMES } from '../data/courseContent'

function read<T>(key: string, fallback: T): T {
  try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback } catch { return fallback }
}

export function useOnboarding() {
  return useMemo(() => {
    const p = read<{ n?: string; r?: string; d?: string[] }>('smc-training-progress', {})
    const exams = read<{ pct: number; passed?: boolean }[]>('smc-exam-ces', [])
    const required = p.r ? Object.keys(ROLES[p.r] || {}) : []
    const done = required.filter(s => (p.d || []).includes(s)).length
    return {
      name: p.n || '',
      roleName: p.r ? ROLE_NAMES[p.r] || p.r : '',
      profileDone: !!(p.n && p.r),
      done,
      total: required.length,
      stepsDone: required.length > 0 && done === required.length,
      attempts: exams.length,
      passed: exams.some(e => e.passed),
    }
  }, [])
}

export default function OnboardingPath({ navigate }: { navigate: (r: Route) => void }) {
  const o = useOnboarding()

  const stages = [
    { n: 1, title: 'Join the relay', detail: o.profileDone ? `${o.name} · ${o.roleName}` : 'Enter your name and choose your seat', done: o.profileDone, go: () => navigate({ page: 'academy', act: 0 }) },
    { n: 2, title: 'Carry your steps', detail: o.profileDone ? `${o.done} of ${o.total} steps finished` : 'Your seat decides which steps you own', done: o.stepsDone, go: () => navigate({ page: 'academy', act: 1 }) },
    { n: 3, title: 'Show you are ready', detail: o.passed ? 'Passed' : o.attempts ? `${o.attempts} attempt${o.attempts > 1 ? 's' : ''} so far · 80% needed` : '80% and every critical item correct', done: o.passed, go: () => navigate({ page: 'exam', examType: 'ces' }) },
    { n: 4, title: 'Print your certificate', detail: o.passed ? 'Ready to print' : 'Unlocks when you pass', done: false, go: () => navigate({ page: 'exam', examType: 'ces' }) },
  ]
  const current = stages.findIndex(s => !s.done)
  const next = stages[current === -1 ? 3 : current]
  const cta = !o.profileDone ? 'Begin onboarding' : current === -1 || current === 3 ? 'Get my certificate' : 'Continue: ' + next.title

  return (
    <section style={{ maxWidth: 1180, margin: '0 auto', padding: '48px 32px 0' }}>
      <div style={{ background: '#fff', border: '1px solid #DCE7EE', borderRadius: 18, padding: '28px 32px', boxShadow: '0 16px 40px rgba(6,48,79,.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap', marginBottom: 22 }}>
          <div>
            <p style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase', color: '#F4941C' }}>Your onboarding path</p>
            <h2 style={{ margin: 0, fontSize: 'clamp(22px, 2.6vw, 28px)', fontWeight: 600, color: '#1D6A96' }}>
              {o.name ? `${o.name.split(' ')[0]}, here is where you are` : 'Four legs to being ready for the job'}
            </h2>
          </div>
          <button onClick={next.go} style={{ background: '#F4941C', color: '#fff', border: 'none', borderRadius: 999, padding: '13px 28px', fontFamily: 'inherit', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>
            {cta} →
          </button>
        </div>
        <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 14 }}>
          {stages.map((s, i) => {
            const active = i === (current === -1 ? 3 : current)
            return (
              <li key={s.n}>
                <button onClick={s.go} style={{ width: '100%', height: '100%', textAlign: 'left', fontFamily: 'inherit', cursor: 'pointer', background: s.done ? '#EEF7F1' : active ? '#FFF3E4' : '#EAF3F9', border: `1.5px solid ${s.done ? '#BFE0D2' : active ? '#F4941C' : '#DCE7EE'}`, borderRadius: 14, padding: '16px 18px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: '50%', background: s.done ? '#1E6B43' : active ? '#F4941C' : '#9FB4C1', color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 10 }}>
                    {s.done ? '✓' : s.n}
                  </span>
                  <span style={{ display: 'block', fontWeight: 600, fontSize: 16, color: '#1D6A96', marginBottom: 2 }}>{s.title}</span>
                  <span style={{ display: 'block', fontSize: 14, color: '#5A6873', lineHeight: 1.4 }}>{s.detail}</span>
                </button>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
