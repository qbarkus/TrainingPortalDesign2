import type { Route } from '../App'
import { dignityStatus, foundationRange, documentationStatus, practiceStatus, examStatus, roleStatus, journeyStatus, ceOverviewStatus, cesJourneyStatus, seatStepsStatus, type Status } from './status'
import { ROLE_PATHS } from './rolePaths'

export type Tag = 'CORE' | 'YOUR ROLE' | 'SYSTEM PRACTICE'
export type Mod = { n: string; tag: Tag; title: string; line: string; status: Status; go: Route }

export const currentRole = () => { try { return localStorage.getItem('smc-my-role') || '' } catch { return '' } }

export function buildModules(role: string): Mod[] {
  const title = ROLE_PATHS[role]?.title ?? 'Your seat'
  return [
    { n: '01', tag: 'CORE', title: "Welcome to St. Mary's Center", line: 'Mission, community, why the work matters.', status: dignityStatus(), go: { page: 'dignity' } },
    { n: '02', tag: 'CORE', title: 'Aging With Dignity', line: 'Respect, choice, safety, independence, community and hope, then the 20-question assessment.', status: dignityStatus(), go: { page: 'dignity' } },
    { n: '03', tag: 'CORE', title: 'Senior Housing Services', line: 'Who we are, structure, programs, and how the team works together.', status: foundationRange(11, 14), go: { page: 'foundation', start: 11 } },
    { n: '04', tag: 'CORE', title: 'The Road Home', line: 'The member journey and housing continuum.', status: journeyStatus(), go: { page: 'journey' } },
    { n: '05', tag: 'CORE', title: 'Coordinated Entry', line: 'How the coordinated housing system works, and where your role fits.', status: cesJourneyStatus(), go: { page: 'ces' } },
    { n: '06', tag: 'YOUR ROLE', title: `Your Role: ${title}`, line: 'Responsibilities, boundaries, collaboration, workflow.', status: roleStatus(), go: { page: 'role' } },
    { n: '07', tag: 'YOUR ROLE', title: "Ms. Evelyn Turner's Journey", line: 'Follow one member through the steps your seat owns.', status: seatStepsStatus(), go: { page: 'academy', act: 1 } },
    { n: '08', tag: 'SYSTEM PRACTICE', title: 'Practice the Decisions', line: '"What would you do next?" Real scenarios, mock records.', status: practiceStatus(), go: { page: 'practice' } },
    { n: '09', tag: 'SYSTEM PRACTICE', title: 'Documentation & Quality', line: 'What must be documented, where it belongs, and why.', status: documentationStatus(), go: { page: 'documentation' } },
    { n: '10', tag: 'YOUR ROLE', title: 'Ready for Practice', line: 'Scenario assessment and role check.', status: examStatus(), go: { page: 'exam', examType: 'rh' } },
  ]
}

const KEY = 'smc-celebrated'
const readSet = (): string[] | null => { try { const v = JSON.parse(localStorage.getItem(KEY) || 'null'); return Array.isArray(v) ? v : null } catch { return null } }
const writeSet = (v: string[]) => { try { localStorage.setItem(KEY, JSON.stringify(v)) } catch {} }

export function seedCelebrated() {
  if (readSet() === null) writeSet(buildModules(currentRole()).filter(m => m.status === 'Completed').map(m => m.n))
}

export function claimCelebration(only?: string): string | null {
  const seen = readSet() ?? []
  const done = buildModules(currentRole()).filter(m => m.status === 'Completed' && (!only || m.n === only)).map(m => m.n)
  const fresh = done.filter(n => !seen.includes(n))
  if (fresh.length === 0) return null
  writeSet([...new Set([...seen, ...(only ? [only] : done)])])
  return fresh[fresh.length - 1]
}

export type Stage = { n: string; phase: string; title: string; line: string; items: Mod[] }

export function buildStages(role: string): Stage[] {
  const mods = buildModules(role)
  const by = (...ns: string[]) => ns.map(n => mods.find(m => m.n === n)!)
  const title = ROLE_PATHS[role]?.title ?? 'Your seat'
  const seen = (() => { try { return (JSON.parse(localStorage.getItem('smc-kyp') || '{}')[role] || []).length } catch { return 0 } })()
  const kyp: Mod = { n: 'KYP', tag: 'YOUR ROLE', title: `Know Your Position: ${title}`, line: 'Your place in the relay, a day in your seat, handoffs, clocks and scenarios.', status: seen >= 4 ? 'Completed' : seen > 0 ? 'In progress' : 'Not started', go: { page: 'kyp', role } }
  return [
    { n: '1', phase: 'Foundation', title: 'Aging With Dignity', line: 'Who we are and how we serve.', items: by('02') },
    { n: '2', phase: 'Foundation', title: 'The Road Home', line: 'How a member moves through Senior Housing Services.', items: by('04') },
    { n: '3', phase: 'Foundation', title: 'Know Your Position', line: 'Senior Housing Services department training: how each position fits the relay.', items: [...by('03', '06'), kyp] },
    { n: '4', phase: 'Foundation', title: 'Coordinated Entry', line: 'The track, checkpoints, rules, queues and housing process.', items: by('05', '07') },
    { n: '5', phase: 'Short courses', title: 'Short Courses: Notes and Practice', line: 'Practice the decisions, then document them well.', items: by('08', '09') },
    { n: '6', phase: 'Final', title: 'Readiness Check and Certification', line: 'Show competency, then earn your Academy certificate.', items: by('10') },
  ]
}

export function stageStatus(st: Stage): Status {
  if (st.items.every(i => i.status === 'Completed')) return 'Completed'
  if (st.items.some(i => i.status !== 'Not started')) return 'In progress'
  return 'Not started'
}
