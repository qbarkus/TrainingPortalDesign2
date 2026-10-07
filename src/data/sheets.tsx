import type { ReactNode } from 'react'

const Row = ({ k, children }: { k: string; children: ReactNode }) => (
  <li style={{ display: 'flex', gap: 12, padding: '8px 0', borderTop: '1px solid #E7EEF3' }}>
    <strong style={{ flex: '0 0 8.5em', color: '#1D6A96' }}>{k}</strong><span>{children}</span>
  </li>
)

export const SHEETS: { title: string; tag: string; body: ReactNode }[] = [
  { title: 'Coordinated Entry workflow', tag: 'Access → Assess → Prioritize → Refer → House → Exit', body: (
    <ol style={{ margin: 0, paddingLeft: '1.2em', display: 'grid', gap: 4 }}>
      {['Access: a member connects at any door', 'Assess: complete the housing assessment and documentation', 'Prioritize: the county system ranks need', 'Refer: a referral connects the member to a housing resource', 'House: the member moves in, with the baton handed to TSS', 'Exit: close the CES enrollment in HMIS'].map(i => <li key={i}>{i}</li>)}
    </ol>) },
  { title: 'HMIS vs. Impact360', tag: 'If they disagree, HMIS is right', body: (
    <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
      <Row k="HMIS">The county record: enrollments, the Housing Support Plan, every service, Coordinated Entry, move-in.</Row>
      <Row k="Impact360">Our record: membership, care plans, notes, what your supervisor sees, our reports.</Row>
      <Row k="Mismatch">Tell Data and Compliance so Impact360 catches up.</Row>
    </ul>) },
  { title: 'Is my member CalAIM?', tag: 'Three places to check', body: (
    <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
      <Row k="Ask">“Are you on Medi-Cal?” Look at the card. Medi-Cal alone does not make someone CalAIM.</Row>
      <Row k="HMIS">Look for an HCS Housing Navigation or Tenancy Sustaining enrollment under our agency.</Row>
      <Row k="Impact360">Look for the Alameda County Health Authorization on the member record.</Row>
    </ul>) },
  { title: 'Housing Support Plan clock', tag: '15 · 30 · 6 months', body: (
    <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
      <Row k="15 days">Our goal for the first plan.</Row>
      <Row k="30 days">The county rule. After 30 it is late.</Row>
      <Row k="6 months">Every plan is good for six months. Update sooner when life changes.</Row>
    </ul>) },
  { title: 'Documented or not?', tag: 'Interaction summary basics', body: (
    <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
      <Row k="Counts">Something you did with or for the member, written in HMIS within three business days.</Row>
      <Row k="Does not">Kiosk sign-in, “attended group”, or anything unwritten.</Row>
      <Row k="Late?">Say it is late. Never change the date.</Row>
    </ul>) },
  { title: 'Warm handoff and HN → TSS', tag: 'Hand off in writing', body: (
    <ol style={{ margin: 0, paddingLeft: '1.2em', display: 'grid', gap: 4 }}>
      {['Tell your supervisor', 'Keep helping until the next program has picked up', 'Hand off in writing and name who owns the next step', 'Update HMIS so the record shows the move', 'Navigator to TSS can overlap up to 30 days'].map(i => <li key={i}>{i}</li>)}
    </ol>) },
]

