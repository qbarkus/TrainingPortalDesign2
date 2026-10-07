import { useState } from 'react'
import logo from '../imports/SMC_Official_Logo_Horizontal.png'

type Props = { title: string; passPct: number }

function readName() {
  try { return JSON.parse(localStorage.getItem('smc-training-progress') || '{}').n || '' } catch { return '' }
}

function saveName(n: string) {
  try {
    const data = JSON.parse(localStorage.getItem('smc-training-progress') || '{"d":[]}')
    data.n = n
    localStorage.setItem('smc-training-progress', JSON.stringify(data))
  } catch {}
}

export default function Certificate({ title, passPct }: Props) {
  const [name, setName] = useState(readName)
  const [dateISO, setDateISO] = useState(() => new Date().toLocaleDateString('en-CA'))
  const date = dateISO ? new Date(dateISO + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''
  const ready = name.trim().length > 0

  return (
    <section style={{ marginBottom: 28 }}>
      <style>{`
        @page { size: 11in 8.5in; margin: 0; }
        @media print {
          body * { visibility: hidden !important; }
          .cert-sheet, .cert-sheet * { visibility: visible !important; }
          .cert-sheet { position: fixed; inset: 0; width: 100%; height: 100%; box-shadow: none !important; }
        }
      `}</style>
      <h2 style={{ margin: '0 0 12px', fontWeight: 600, fontSize: 20, color: '#22333F' }}>Your certificate</h2>
      <div className="no-print" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end', marginBottom: 16 }}>
        <label style={{ flex: '1 1 16em', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: '#6C7A85' }}>Name on certificate</span>
          <input
            value={name}
            onChange={e => { setName(e.target.value); saveName(e.target.value) }}
            placeholder="First and last name"
            style={{ padding: '12px 14px', border: '1.5px solid #C9D6DF', borderRadius: 10, fontFamily: 'inherit', fontSize: 16, color: '#22333F' }}
          />
        </label>
        <label style={{ flex: '0 1 12em', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: '#6C7A85' }}>Date</span>
          <input type="date" value={dateISO} onChange={e => setDateISO(e.target.value)} style={{ padding: '11px 14px', border: '1.5px solid #C9D6DF', borderRadius: 10, fontFamily: 'inherit', fontSize: 16, color: '#22333F' }} />
        </label>
        <button
          onClick={() => window.print()}
          disabled={!ready}
          style={{ fontFamily: 'inherit', fontWeight: 600, fontSize: 16, color: '#fff', background: ready ? '#2680B3' : '#9FB4C1', border: 'none', borderRadius: 999, padding: '13px 28px', cursor: ready ? 'pointer' : 'not-allowed' }}
        >
          Print certificate
        </button>
      </div>

      <div className="cert-sheet" style={{ background: '#fff', boxShadow: '0 16px 40px rgba(6,48,79,.1)', aspectRatio: '11 / 8.5', padding: '3.6%', containerType: 'inline-size' }}>
        <div style={{ height: '100%', border: '3px solid #1D6A96', outline: '1.5px solid #F4941C', outlineOffset: '-1.1cqw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4cqw' }}>
          <img src={logo} alt="St. Mary's Center" style={{ height: '9cqw' }} />
          <div style={{ fontSize: '1.4cqw', fontWeight: 600, letterSpacing: '.26em', textTransform: 'uppercase', color: '#8A4E08', marginTop: '2.7cqw' }}>Senior Housing Services Academy</div>
          <div style={{ fontSize: '4.4cqw', fontWeight: 600, color: '#1D6A96', marginTop: '.7cqw', lineHeight: 1.1 }}>Certificate of Completion</div>
          <div style={{ width: '11cqw', height: 3, background: '#F4941C', margin: '1.8cqw auto' }} />
          <div style={{ fontSize: '1.65cqw', color: '#5A6873' }}>This certifies that</div>
          <div style={{ fontSize: '4cqw', fontWeight: 500, color: '#22333F', marginTop: '.5cqw', minHeight: '5.2cqw', minWidth: '55cqw', borderBottom: '1.5px solid #C9D6DF', paddingBottom: 4 }}>{name.trim()}</div>
          <div style={{ fontSize: '1.65cqw', color: '#5A6873', marginTop: '1.3cqw' }}>has successfully completed</div>
          <div style={{ fontSize: '2.5cqw', fontWeight: 600, color: '#1D6A96', marginTop: '1.1cqw' }}>{title}</div>
          <div style={{ fontSize: '1.45cqw', color: '#5A6873', marginTop: '1.3cqw', maxWidth: '68cqw', lineHeight: 1.5 }}>with a passing score of {passPct}% or higher, and is prepared to serve older adults with compassion, excellence, and dignity.</div>
          <div style={{ display: 'flex', gap: '9cqw', marginTop: '3.6cqw', justifyContent: 'center' }}>
            <div style={{ borderTop: '1.5px solid #C9D6DF', paddingTop: 6, minWidth: '25cqw' }}>
              <div style={{ fontSize: '1.45cqw', fontWeight: 600, color: '#1D6A96' }}>Dr. Grace Okoro</div>
              <div style={{ fontSize: '1.15cqw', color: '#5A6873', letterSpacing: '.06em', textTransform: 'uppercase' }}>Clinical Director of Housing Services</div>
            </div>
            <div style={{ borderTop: '1.5px solid #C9D6DF', paddingTop: 6, minWidth: '25cqw' }}>
              <div style={{ fontSize: '1.45cqw', fontWeight: 600, color: '#1D6A96' }}>{date}</div>
              <div style={{ fontSize: '1.15cqw', color: '#5A6873', letterSpacing: '.06em', textTransform: 'uppercase' }}>Date of completion</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
