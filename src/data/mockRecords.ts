export type Field = [string, string, boolean?]
export type Scenario = {
  title: string
  setup: string
  record: { kind: string; id: string; fields: Field[] }
  q: string
  opts: string[]
  a: number
  feedback: string
  fix: string
}

export const SCENARIOS: Scenario[] = [
  {
    title: 'The note that says nothing',
    setup: 'Rosa Delgado (mock) came to the Housing Clinic. Your teammate wrote this note and asked you to look it over before it is saved.',
    record: { kind: 'Touchpoint', id: 'TP-2041', fields: [
      ['Member', 'Rosa Delgado, 71'],
      ['Service type', 'Housing Navigation'],
      ['Contact', 'In person, 45 min'],
      ['Note', 'Met with member to discuss housing. Member was thankful for the help. Staff went over resources and answered questions.', true],
    ] },
    q: 'What is the biggest problem with this note?',
    opts: ['It is too long', 'Someone who was not there cannot tell what was done or what moved', 'It should not mention the member was thankful'],
    a: 1,
    feedback: 'No purpose, no named barrier, no action with an object, no outcome and no next step.',
    fix: 'Rewrite it with Purpose, Barriers, Intervention, Outcome and Next steps. Name the application, the barrier and who you called.',
  },
  {
    title: 'The account that is already there',
    setup: 'A new referral arrives for Walter Kimura (mock). When you search, two Accounts show up.',
    record: { kind: 'Account search', id: '2 results', fields: [
      ['Account 1', 'Walter Kimura · DOB 03/14/1952 · created 2023'],
      ['Account 2', 'Walt Kimura · DOB 03/14/1952 · created 2024', true],
      ['Open cases', 'Account 1 has one closed Case. Account 2 has none.'],
    ] },
    q: 'What do you do?',
    opts: ['Create a third Account so the record is clean', 'Use Account 2 because it is newer', 'Attach the referral to the original Account and tell your manager about the duplicate'],
    a: 2,
    feedback: 'One person, one Account. Duplicates split the history, so the next worker cannot see what was already tried.',
    fix: 'Attach to the original, flag Account 2 for merge, and do not start new work on the duplicate.',
  },
  {
    title: 'The case with no door',
    setup: 'You open a Case for Loretta Banks (mock) and notice something is missing in the chain.',
    record: { kind: 'Case', id: 'CS-0318', fields: [
      ['Account', 'Loretta Banks, 67'],
      ['Referral', 'Coordinated Entry, received 09/03'],
      ['Program', 'Not selected', true],
      ['Care Plan', 'Housing goal drafted, not signed'],
      ['Touchpoints', '2 logged'],
    ] },
    q: 'What has to be fixed first?',
    opts: ['Select the Program the member is enrolled in', 'Delete the Care Plan and start over', 'Nothing, Program is optional'],
    a: 0,
    feedback: 'The Program is the door. Without it the Case cannot be tied to a service, so the work cannot be billed or reported.',
    fix: 'Link the Case to the correct Program, then ask the member to review and sign the Care Plan.',
  },
  {
    title: 'The bus pass with no note',
    setup: 'At month end you review Samuel Okafor (mock). A benefit was recorded, but something is off.',
    record: { kind: 'Benefit', id: 'BN-0772', fields: [
      ['Member', 'Samuel Okafor, 74'],
      ['Benefit', 'Monthly bus pass, 09/10'],
      ['Linked Touchpoint', 'None', true],
      ['Care Plan goal', 'Get to medical appointments'],
    ] },
    q: 'What is missing?',
    opts: ['A Touchpoint that shows what staff did and why', 'A second bus pass', 'A new Care Plan goal'],
    a: 0,
    feedback: 'A Benefit is what the member received. A Touchpoint is what staff did. If it is not written down, it did not happen.',
    fix: 'Add a Touchpoint for 09/10 that explains the need, links to the goal and names who handed the pass over.',
  },
  {
    title: 'Three calls, then what?',
    setup: 'Eleanor Whitfield (mock) has not responded for three weeks. You are thinking about closing the file.',
    record: { kind: 'Contact log', id: 'CL-1190', fields: [
      ['09/02', 'Called, voicemail left'],
      ['09/09', 'Called, no answer'],
      ['09/16', 'Called, voicemail left'],
      ['Visit', 'No visit attempted', true],
      ['Manager consult', 'None', true],
    ] },
    q: 'Is the file ready to close for no contact?',
    opts: ['Yes, three attempts is enough', 'Not yet. Try another way, talk to your manager, and document each step', 'Yes, but only if you delete the voicemails from the log'],
    a: 1,
    feedback: 'A voicemail is an attempt, not contact. Use a different method and get a second opinion before you close.',
    fix: 'Try a visit or a call to her listed contact, consult your manager, log every attempt, then decide.',
  },
]
