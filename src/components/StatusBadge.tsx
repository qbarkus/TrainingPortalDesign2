import type { Status } from '../data/status'

const TONE: Record<Status, { bg: string; fg: string }> = {
  'Not started': { bg: '#E7EEF3', fg: '#3C4A55' },
  'In progress': { bg: '#FFF4DE', fg: '#8A4E08' },
  Completed: { bg: '#E3F3EA', fg: '#1E6B43' },
  'In development': { bg: '#EEF1F4', fg: '#6C7A85' },
}

export default function StatusBadge({ status }: { status: Status }) {
  const t = TONE[status]
  return <span style={{ display: 'inline-block', padding: '3px 11px', borderRadius: 999, background: t.bg, color: t.fg, fontSize: 12.5, fontWeight: 700, whiteSpace: 'nowrap' }}>{status}</span>
}
