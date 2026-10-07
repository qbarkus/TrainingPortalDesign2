import { SanjayButton } from './AskSanjay'
import type { Route } from '../App'
import logo from '../imports/SMC_Official_Logo_Horizontal.png'

type Props = {
  navigate: (r: Route) => void
  variant?: 'light' | 'dark'
  currentPage?: string
}

function resetAll() {
  if (!window.confirm('Reset the Academy? This clears your name, role and all saved progress on this device, then returns to the welcome screen.')) return
  try {
    Object.keys(localStorage).filter(k => k.startsWith('smc-') || k === 'roadhome.v1').forEach(k => localStorage.removeItem(k))
  } catch {}
  window.location.reload()
}

export default function Masthead({ navigate, variant = 'light', currentPage }: Props) {
  const dark = variant === 'dark'

  return (
    <header className="site-header" style={{
      background: dark ? '#1D6A96' : '#FFFFFF',
      borderBottom: '3px solid #F4941C',
      position: 'sticky',
      overflow: 'hidden',
      top: 0,
      zIndex: 20,
      boxShadow: dark ? '0 4px 20px rgba(6,48,79,.25)' : '0 2px 12px rgba(6,48,79,.06)',
    }}>
      <svg aria-hidden width="150" height="64" viewBox="0 0 150 64" style={{ position: 'absolute', right: 0, top: 0, pointerEvents: 'none' }} fill="none" strokeWidth="2.5">
        <polygon points="96,-6 128,-6 144,22 128,50 96,50 80,22" stroke="#63C7EF" />
        <polygon points="120,-20 152,-20 168,8 152,36 120,36 104,8" stroke="#F4941C" />
      </svg>
      <div style={{ position: 'relative', maxWidth: 1180, margin: '0 auto', padding: '10px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
        <button
          onClick={() => navigate({ page: 'home' })}
          style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <span style={{ background: dark ? '#fff' : 'transparent', borderRadius: 9, padding: dark ? '4px 8px' : 0, display: 'inline-flex', flexShrink: 0 }}>
            <img src={logo} alt="St. Mary's Center" style={{ height: 60, width: 'auto' }} />
          </span>
          <span style={{
            paddingLeft: 16, borderLeft: dark ? 'none' : '1px solid #DCE7EE',
            fontSize: 12.5,
            fontWeight: 600,
            letterSpacing: '.1em',
            textTransform: 'uppercase' as const,
            color: dark ? '#CFE2EE' : '#1D6A96',
            lineHeight: 1.35,
            whiteSpace: 'nowrap' as const,
          }}>
            Senior Housing Services<br />Academy
          </span>
        </button>

        <nav className="site-nav" style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <NavLink dark={dark} active={currentPage === 'home'} onClick={() => navigate({ page: 'home' })}>
            Training home
          </NavLink>
          <NavLink dark={dark} active={currentPage === 'paths'} onClick={() => navigate({ page: 'paths' })}>
            Learning paths
          </NavLink>
          <NavLink dark={dark} active={currentPage === 'role'} onClick={() => navigate({ page: 'role' })}>
            My role
          </NavLink>
          <NavLink dark={dark} onClick={resetAll}>
            Reset
          </NavLink>
          <SanjayButton />
        </nav>
      </div>
    </header>
  )
}

function NavLink({ dark, active, onClick, children }: { dark: boolean; active?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'none',
        border: 'none',
        padding: '4px 0',
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontWeight: active ? 600 : 500,
        fontSize: 15,
        color: dark ? (active ? '#FFD69A' : '#fff') : (active ? '#1D6A96' : '#22333F'),
        borderBottom: active ? `2px solid ${dark ? '#FFD69A' : '#1D6A96'}` : '2px solid transparent',
        whiteSpace: 'nowrap' as const,
        transition: 'color .15s, border-color .15s',
      }}
    >
      {children}
    </button>
  )
}

export function LogoMark({ size = 40, color = '#1D6A96' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-label="St. Mary's Center">
      <rect width="40" height="40" rx="8" fill={color} />
      <text x="20" y="26" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="700" fontFamily="Open Sans, sans-serif">S</text>
    </svg>
  )
}

export function OrangeDivider() {
  return <div style={{ height: 3, background: '#F4941C' }} />
}
