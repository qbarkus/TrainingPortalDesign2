type Props = { kicker: string; title: string; step: number; total: number; onExit: () => void }

export default function CourseBar({ kicker, title, step, total, onExit }: Props) {
  return (
    <div style={{ background: '#fff', borderBottom: '1px solid #DCE7EE' }}>
      <div style={{ maxWidth: '62em', margin: '0 auto', padding: '.8em 1.4em', display: 'flex', alignItems: 'center', gap: '1em', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 14em', minWidth: 0 }}>
          <div style={{ fontSize: '.72em', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#8A4E08' }}>{kicker}</div>
          <div style={{ fontSize: '.98em', fontWeight: 600, color: '#1D6A96' }}>{title}</div>
        </div>
        <span style={{ fontSize: '.84em', color: '#5A6873' }}>Screen {step} of {total}</span>
        <button onClick={onExit} style={{ padding: '.6em 1.1em', border: '1.5px solid #C9D6DF', borderRadius: 12, background: '#fff', color: '#22333F', fontFamily: 'inherit', fontSize: '.84em', fontWeight: 600, cursor: 'pointer' }}>Save and exit</button>
      </div>
      <div style={{ height: '.35em', background: '#E7EEF3' }}>
        <div style={{ height: '100%', width: `${(step / total) * 100}%`, background: '#F4941C', transition: 'width .3s' }} />
      </div>
    </div>
  )
}
