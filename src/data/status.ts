import { ASSESSMENT, PASS_PCT } from './foundation'
import { ORDER, ROLES } from './courseContent'
import { QS, PASS } from '../pages/Documentation'
import { QS as NQS, PASS as NPASS } from '../pages/Notes'

export type Status = 'Not started' | 'In progress' | 'Completed' | 'In development'

function read(key: string): any {
  try { return JSON.parse(localStorage.getItem(key) || 'null') } catch { return null }
}

export function foundationStatus(): Status {
  const v = read('smc-foundation')
  if (!v) return 'Not started'
  const answers = v.answers && typeof v.answers === 'object' ? v.answers : {}
  const correct = ASSESSMENT.filter((q, i) => answers[i] === q.a).length
  if (v.submitted && Math.round((correct / ASSESSMENT.length) * 100) >= PASS_PCT) return 'Completed'
  return v.page > 0 || v.first ? 'In progress' : 'Not started'
}

export function dignityStatus(): Status {
  const v = read('smc-dignity')
  if (!v) return 'Not started'
  if (v.passed) return 'Completed'
  return v.page > 0 || Object.keys(v.picks || {}).length ? 'In progress' : 'Not started'
}

export function documentationStatus(): Status {
  const v = read('smc-documentation')
  if (!v) return 'Not started'
  const answers = v.answers && typeof v.answers === 'object' ? v.answers : {}
  const correct = QS.filter((q, i) => answers[i] === q.a).length
  if (Object.keys(answers).length === QS.length && Math.round((correct / QS.length) * 100) >= PASS) return 'Completed'
  return v.page > 0 ? 'In progress' : 'Not started'
}

export function academyStatus(): Status {
  const p = read('smc-training-progress')
  if (!p) return 'Not started'
  const d = Array.isArray(p.d) ? p.d.length : 0
  return d > 0 || p.r ? 'In progress' : 'Not started'
}

export function notesStatus(): Status {
  const v = read('smc-notes')
  if (!v) return 'Not started'
  const answers = v.answers && typeof v.answers === 'object' ? v.answers : {}
  const correct = NQS.filter((q, i) => answers[i] === q.a).length
  if (Object.keys(answers).length === NQS.length && Math.round((correct / NQS.length) * 100) >= NPASS) return 'Completed'
  return v.page > 0 ? 'In progress' : 'Not started'
}

export function journeyStatus(): Status {
  const v = read('smc-roadhome')
  if (!v) return 'Not started'
  if (v.done) return 'Completed'
  return v.page > 0 ? 'In progress' : 'Not started'
}

export function cesJourneyStatus(): Status {
  const v = read('smc-ces-journey')
  if (!v) return 'Not started'
  if (v.done) return 'Completed'
  return v.page > 0 ? 'In progress' : 'Not started'
}

export function davidStatus(): Status {
  const v = read('smc-david')
  if (!v) return 'Not started'
  if (v.page >= 6) return 'Completed'
  return v.page > 0 ? 'In progress' : 'Not started'
}

export function practiceStatus(): Status {
  const v = read('smc-practice')
  if (!v) return 'Not started'
  if (v.page >= 6) return 'Completed'
  return v.page > 0 ? 'In progress' : 'Not started'
}

export function examStatus(): Status {
  const h = read('smc-exam-ces')
  if (!Array.isArray(h) || h.length === 0) return 'Not started'
  return h.some((e: any) => e && e.passed) ? 'Completed' : 'In progress'
}

export function foundationRange(start: number, end: number): Status {
  const v = read('smc-foundation')
  const page = v && typeof v.page === 'number' ? v.page : 0
  if (page >= end || (v && v.submitted)) return 'Completed'
  return page > start ? 'In progress' : 'Not started'
}

export function roleStatus(): Status {
  return read('smc-role-viewed') ? 'Completed' : 'Not started'
}

export function ceOverviewStatus(): Status {
  const p = read('smc-training-progress')
  const d = p && Array.isArray(p.d) ? p.d.length : 0
  return d > 0 ? 'Completed' : p && p.r ? 'In progress' : 'Not started'
}

export function seatStepsStatus(): Status {
  const p = read('smc-training-progress')
  const d: string[] = p && Array.isArray(p.d) ? p.d : []
  if (d.length === 0) return 'Not started'
  const role = (p && p.r) || ''
  const mine = role && ROLES[role] ? ORDER.filter(id => ROLES[role][id]) : ORDER
  return mine.length > 0 && mine.every(id => d.includes(id)) ? 'Completed' : 'In progress'
}
