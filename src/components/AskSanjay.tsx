import { useEffect, useState } from 'react'
import { SHEETS } from '../data/sheets'
import Portrait from './Portrait'

export const askSanjay = () => window.dispatchEvent(new Event('ask-sanjay'))

export const SanjayButton = () => (
  <button onClick={askSanjay} aria-label="Ask Sanjay a question" title="Ask Sanjay" style={{ flex: '0 0 auto', width: 36, height: 36, borderRadius: '50%', border: 'none', background: '#1D6A96', color: '#fff', fontFamily: 'inherit', fontSize: 18, fontWeight: 800, cursor: 'pointer' }}>?</button>
)

const Face = ({ size }: { size: number }) => (
  <div style={{ width: size, height: size, borderRadius: '50%', overflow: 'hidden', flex: '0 0 auto', background: '#D8E7F0' }}>
    <Portrait initials="SR" alt="Sanjay Rao" />
  </div>
)

export default function AskSanjay() {
  const [open, setOpen] = useState(false)
  const [pick, setPick] = useState<number | null>(null)

  useEffect(() => {
    const on = () => setOpen(true)
    window.addEventListener('ask-sanjay', on)
    return () => window.removeEventListener('ask-sanjay', on)
  }, [])

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} aria-label="Ask Sanjay" title="Ask Sanjay" style={{ position: 'fixed', right: 10, bottom: 10, zIndex: 50, display: 'flex', padding: 3, border: 'none', borderRadius: '50%', background: '#1D6A96', cursor: 'pointer', boxShadow: '0 4px 14px rgba(20,60,90,.35)' }}>
        <Face size={38} />
      </button>
    )
  }

  const s = pick === null ? null : SHEETS[pick]
  return (
    <div role="dialog" aria-label="Ask Sanjay" style={{ position: 'fixed', right: 16, bottom: 16, zIndex: 50, width: 'min(380px, calc(100vw - 32px))', maxHeight: 'min(560px, calc(100vh - 32px))', display: 'flex', flexDirection: 'column', background: '#fff', borderRadius: 18, overflow: 'hidden', boxShadow: '0 16px 48px rgba(20,60,90,.4)', border: '1px solid #C9D6DF', color: '#22333F', fontSize: 15, lineHeight: 1.5 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: '#1D6A96', color: '#fff' }}>
        <Face size={44} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700 }}>Sanjay Rao</div>
          <div style={{ fontSize: 12.5, color: '#CFE6F2' }}>Senior Housing Services Manager</div>
        </div>
        <button onClick={() => setOpen(false)} aria-label="Collapse" title="Collapse" style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: 26, lineHeight: 1, cursor: 'pointer', marginLeft: 'auto' }}>–</button>
        <button onClick={() => { setOpen(false); setPick(null) }} aria-label="Close" style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: 26, lineHeight: 1, cursor: 'pointer' }}>×</button>
      </div>
      <div style={{ padding: 16, overflowY: 'auto' }}>
        {s ? (
          <>
            <button onClick={() => setPick(null)} style={{ background: 'none', border: 'none', padding: 0, marginBottom: 10, color: '#1D6A96', fontFamily: 'inherit', fontWeight: 700, cursor: 'pointer' }}>← Back</button>
            <h3 style={{ margin: '0 0 2px', fontSize: 18, color: '#1D6A96' }}>{s.title}</h3>
            <p style={{ margin: '0 0 12px', fontSize: 13.5, color: '#8A4E08', fontWeight: 600 }}>{s.tag}</p>
            {s.body}
          </>
        ) : (
          <>
            <p style={{ margin: '0 0 12px' }}>Hi, I'm Sanjay. What do you need help with?</p>
            <div style={{ display: 'grid', gap: 8 }}>
              {SHEETS.map((x, i) => (
                <button key={x.title} onClick={() => setPick(i)} style={{ textAlign: 'left', padding: '11px 14px', border: '1.5px solid #C9D6DF', borderRadius: 12, background: '#F4F9FC', color: '#22333F', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>{x.title}</button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
