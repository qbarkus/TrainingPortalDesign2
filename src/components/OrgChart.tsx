import { TEAM } from '../data/team'
import Portrait from './Portrait'
import { PORTRAITS } from '../data/portraits'

const ID_BY_INITIALS: Record<string, string> = { GO: 'CD', EC: 'HSW', SR: 'SHSM', TW: 'SOC', CB: 'OLS', MV: 'HSAA', CM: 'HN', RD: 'TSHC', HS: 'TSSC' }
const byId = (id: string) => TEAM.find(t => ID_BY_INITIALS[t.initials] === id)

const Node = ({ id, me, onPick }: { id: string; me: boolean; onPick: (id: string) => void }) => {
  const p = byId(id)
  return (
    <button onClick={() => onPick(id)} aria-pressed={me} style={{ position: 'relative', width: 124, minHeight: 212, boxSizing: 'border-box', padding: '22px 6px 12px', background: me ? '#FFF6E8' : '#fff', border: `2px ${p ? 'solid' : 'dashed'} ${me ? '#F4941C' : '#C9D6DF'}`, borderRadius: 16, boxShadow: me ? '0 8px 22px rgba(244,148,28,.28)' : '0 4px 12px rgba(29,106,150,.08)', textAlign: 'center', fontFamily: 'inherit', cursor: 'pointer', color: '#22333F' }}>
      {me && <span style={{ position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)', background: '#F4941C', color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 999, whiteSpace: 'nowrap' }}>This is you</span>}
      <div style={{ width: 76, height: 88, margin: '0 auto 8px', borderRadius: 14, overflow: 'hidden', background: p?.color || '#E3ECF2', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700, outline: me ? '3px solid #F4941C' : '1px solid #DCE7EE', outlineOffset: 2 }}>
        {p && PORTRAITS[p.initials] ? <img src={PORTRAITS[p.initials]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 10%' }} /> : p ? <Portrait initials={p.initials} alt={p.name} /> : <span style={{ color: '#6C7A85' }}>?</span>}
      </div>
      <div style={{ fontSize: 13.5, fontWeight: 700, color: '#1D6A96' }}>{p ? p.name : 'Open seat'}</div>
      <div style={{ fontSize: 12, color: '#5A6873', marginTop: 2, lineHeight: 1.3 }}>{p ? p.role : 'Data and Compliance Coordinator'}</div>
    </button>
  )
}

type T = { id: string; kids?: T[] }
const TREE: T = { id: 'CD', kids: [{ id: 'HSW' }, { id: 'SHSM', kids: ['SOC', 'OLS', 'HSAA', 'HN', 'TSHC', 'TSSC', 'DCC'].map(id => ({ id })) }] }

const Line = ({ h = 24 }: { h?: number }) => <div style={{ width: 2, height: h, background: '#9FBBCC', margin: '0 auto' }} />

export default function OrgChart({ role, onSelect }: { role: string; onSelect: (id: string) => void }) {
  const render = (t: T): React.ReactNode => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Node id={t.id} me={role === t.id} onPick={onSelect} />
      {t.kids && (
        <>
          <Line />
          <div style={{ display: 'flex' }}>
            {t.kids.map((k, i, a) => (
              <div key={k.id} style={{ position: 'relative', padding: '0 4px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {a.length > 1 && <div style={{ position: 'absolute', top: 0, height: 2, background: '#9FBBCC', left: i === 0 ? '50%' : 0, right: i === a.length - 1 ? '50%' : 0 }} />}
                <Line />
                {render(k)}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )

  return (
    <div style={{ overflowX: 'auto', paddingTop: 16, paddingBottom: 8 }}>
      <div style={{ width: 'max-content', margin: '0 auto' }}>{render(TREE)}</div>
    </div>
  )
}
