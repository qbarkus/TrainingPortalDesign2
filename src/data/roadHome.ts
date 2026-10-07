export type Who = 'ET' | 'CM' | 'EC' | 'HS' | 'RD' | 'MJ' | 'DM'
export const WHO: Record<Who, { name: string; role: string }> = {
  ET: { name: 'Ms. Evelyn Turner', role: 'Member' },
  CM: { name: 'Carla Montez', role: 'Housing Navigator' },
  EC: { name: 'Elena Castro', role: 'Housing Social Worker' },
  HS: { name: 'Hector Salas', role: 'TSS Coordinator' },
  RD: { name: 'Renee Dawson', role: 'TH & Housing Navigation Coordinator' },
  MJ: { name: 'Marcus Johnson', role: 'Member' },
  DM: { name: 'David Miller', role: 'Member' },
}

export type Block =
  | { k: 'n'; t: string }
  | { k: 'say'; w: Who; t: string }
  | { k: 'big'; t: string; sub?: string }
  | { k: 'list'; items: string[] }
  | { k: 'flow'; items: string[] }
  | { k: 'file'; kind: string; id: string; fields: [string, string, boolean?][]; note?: string }
  | { k: 'rows'; head: [string, string, string]; items: [string, string, string][] }

export type Step =
  | { t: 'story'; ch: string; eye: string; title?: string; blocks: Block[]; cta?: string; img?: string }
  | { t: 'cards'; ch: string; eye: string; title: string; intro?: string; cards: [string, string[]][] }
  | { t: 'decide'; ch: string; eye: string; title?: string; setup?: Block[]; q: string; opts: string[]; a: number; fb: string; wrong?: Record<number, string>; scored?: boolean; cc?: boolean }
  | { t: 'sort'; ch: string; eye: string; title: string; intro?: string; items: { p: string; v: string; n?: string; good: boolean }[] }
  | { t: 'multi'; ch: string; eye: string; title: string; intro: string; items: string[]; after: string }
  | { t: 'reflect'; ch: string; eye: string; prompt: string; themes?: string[]; prompts?: string[]; note?: string }
  | { t: 'take'; ch: string; big: string; sub?: string }
  | { t: 'result'; ch: string; eye: string }

const n = (t: string): Block => ({ k: 'n', t })
const say = (w: Who, t: string): Block => ({ k: 'say', w, t })
const big = (t: string, sub?: string): Block => ({ k: 'big', t, sub })
const list = (...items: string[]): Block => ({ k: 'list', items })
const file = (kind: string, id: string, fields: [string, string, boolean?][], note?: string): Block => ({ k: 'file', kind, id, fields, note })

const OPEN = 'Opening', PRO = 'Prologue'
const C = (i: number) => `Chapter ${i} of 8`
const CC = 'Case Conference'

export const STEPS: Step[] = [
  // OPENING
  { t: 'story', ch: OPEN, eye: 'Senior Housing Services Academy', title: 'The Road Home', blocks: [
    big('Every Member. Every Interaction. One Standard of Care.'),
    n('Aging With Dignity established how we show up. The Road Home teaches how we move the housing work forward.'),
  ] },
  { t: 'story', ch: OPEN, eye: 'The Road Home', title: 'Aging With Dignity across the housing journey', blocks: [
    n('The Road Home follows the real journey of older adults experiencing housing instability, homelessness, transition, and permanent housing.'),
    n('Staff will learn how each role connects across Senior Housing Services, from first contact and Coordinated Entry through Housing Navigation, Transitional Housing, permanent housing, and ongoing tenancy support.'),
    n('This is more than learning a workflow. It is learning how we work together so that every member experiences the same standard of dignity, accountability, documentation, and care at every point in their journey.'),
  ] },
  { t: 'story', ch: OPEN, eye: 'The Road Home · Learning pattern', title: 'See the person. Understand the situation. Make the right decision. Take the right action. Document the work.', blocks: [
    n('Throughout the Academy, each section connects the human story to the work:'),
    { k: 'flow', items: ['Story', 'Decision', 'Action', 'Documentation', 'Why It Matters', 'Quick Check'] },
    big('Every Member. Every Interaction. One Standard of Care.'),
    n('No matter where someone enters Senior Housing Services, which staff member they meet, or where they are in their housing journey, they should experience a coordinated system that is clear, respectful, responsive, and grounded in dignity.'),
  ] },
  { t: 'story', ch: OPEN, eye: 'The Road Home · The SHS journey', title: 'The SHS journey', blocks: [
    { k: 'flow', items: ['Outreach', 'Coordinated Entry', 'Housing Navigation', 'Transitional Housing', 'Permanent Housing', 'Tenancy Support'] },
    n('Different programs may serve different parts of the journey.'),
    big('The standard of care does not change.'),
    n('Every interaction should move the member forward, preserve dignity, clarify the next step, and leave a clear record for the staff member who comes next.'),
  ] },
  { t: 'story', ch: OPEN, eye: 'The Road Home', title: 'One housing journey. Many roles. One standard of care.', blocks: [
    n('This is not a course about clicking through screens or memorizing vocabulary. It is about judgment.'),
    list('What belongs to your role', 'What belongs to someone else', 'When the member decides', 'When staff must act', 'When consultation is needed', 'What must be documented', 'How to hand the work forward without making the member start over'),
    big('Finding Home. Keeping Home. No Dropped Baton.'),
  ] },
  { t: 'story', ch: OPEN, eye: 'The Road Home', title: 'Housing instability rarely arrives as one problem.', blocks: [
    n('Health may be changing. Income may be fixed. Documents may be missing. Transportation may be unreliable. A phone may be disconnected.'),
    n('Someone may be carrying grief, fear, exhaustion, family responsibilities, disability, or years of navigating systems that keep asking them to begin again.'),
    n('Our job is not to take over the journey. Our job is to make the road clearer. Understand the barrier. Know our role. Follow through. And keep the member involved in decisions about their own life.'),
  ] },
  { t: 'story', ch: OPEN, eye: 'The Road Home', title: 'Walk beside Ms. Evelyn Turner', blocks: [
    n('Over the next eight chapters, you will follow Ms. Evelyn Turner from housing instability toward permanent housing. Marcus Johnson and David Miller enter when their situations teach something different.'),
    n('You will not simply watch their journeys. You will make decisions inside them. Some will be procedural. Some will require judgment. Some will require you to recognize that the strongest next step belongs to someone else on the team.'),
    big('How do we move the housing work forward without taking the member out of the center of it?'),
  ], cta: 'Begin The Road Home' },

  // PROLOGUE
  { t: 'story', ch: PRO, eye: 'Prologue · Before your journey begins', title: 'Housing work is a relay', blocks: [
    n('No single staff person carries someone from first contact through long-term housing stability. Each role owns part of the journey. What matters is whether the baton reaches the next person clearly.'),
    big('One journey.', 'More than one role. No dropped baton.'),
  ] },
  { t: 'cards', ch: PRO, eye: 'Prologue · Follow the journey', title: 'Engage to Keeping Home', intro: 'Tap each stop along the pathway.', cards: [
    ['Engage', ['Staff meet people where they are: a café, a vehicle, the street, a Housing Clinic, the Community Center, or another program at St. Mary’s Center.', 'The first job is not to make the person understand our structure. It is to understand what brought them through the door.']],
    ['Membership', ['Membership creates the relationship with St. Mary’s Center.', 'It is not the same thing as enrollment in every housing program.']],
    ['Screen and assess', ['Housing screening and assessment help the team understand what is happening, what is urgent, what barriers exist, what strengths and resources already exist, and what housing pathway should be considered.']],
    ['Case opening', ['The Housing Services Manager reviews the recommendation, confirms the program pathway, opens the case, begins the Housing Support Plan, and assigns the work.', 'The Navigator should not have to recreate everything that happened before the case reached them.']],
    ['Finding Home', ['Housing Navigation carries the work toward permanent housing: search, applications, documents, housing opportunities, advocacy, preparation, and follow-through.']],
    ['Keeping Home', ['Once permanent housing is secured, the work changes. Finding housing becomes sustaining housing. That is where Tenancy Sustaining Services begins.']],
  ] },
  { t: 'story', ch: PRO, eye: 'Prologue · Meet Ms. Turner', title: 'Meet Ms. Evelyn Turner', blocks: [
    n('Evelyn is 68. She receives Social Security and SNAP. She manages Type 2 diabetes. She has limited family support. She owns a car. Right now, that car is also where she sleeps.'),
    n('Evelyn has managed a lot on her own. She is proud of that. She does not want staff making decisions around her.'),
    say('ET', '“I can use some help. But I still want to know what’s happening. And I want you to talk to me before people start making plans.”'),
    n('That statement tells us something important. Housing services may have procedures. The member still has agency.'),
  ] },
  { t: 'reflect', ch: PRO, eye: 'Reflect · Not scored', prompt: 'What could staff unintentionally do that would make Evelyn feel like housing is being done to her rather than with her?', themes: ['Make decisions before asking her', 'Talk about her while she is sitting in the room', 'Assume she will take any available unit', 'Overwhelm her with forms', 'Repeat questions she already answered', 'Focus only on deficits', 'Make promises staff cannot control'], note: 'Person-centered work is not passive. Staff still provide expertise. But expertise does not replace the member’s voice.' },
  { t: 'story', ch: PRO, eye: 'Prologue · No Wrong Door', title: 'Do not make the member carry the organization', blocks: [
    n('Evelyn does not arrive asking for Housing Navigation. She comes to St. Mary’s Center because a friend told her she could get lunch.'),
    say('ET', '“I heard y’all serve lunch here.”'),
    n('A staff member talks with her. During the conversation, Evelyn mentions that she has been sleeping in her vehicle. She entered through one door. That conversation opens another.'),
    big('Do not make the member carry the organization.'),
    n('That is No Wrong Door. It does not mean every staff member performs every service. It means we help people reach the right next step.'),
  ] },
  { t: 'decide', ch: PRO, eye: 'Decision · Prologue', setup: [n('Evelyn tells a Community Center staff member that she has been sleeping in her car.')], q: 'Which response best reflects No Wrong Door?', opts: ['“Housing isn’t handled here. You’ll need to call another department.”', '“Let me understand what’s happening and help connect you with the housing team.”', '“I can enroll you directly into Housing Navigation.”', '“You need to complete a housing application before we can talk about it.”'], a: 1, fb: 'No Wrong Door means the staff member helps create the connection. It does not mean bypassing assessment, eligibility, or role boundaries.' },
  { t: 'decide', ch: PRO, eye: 'Prologue checkpoint 1 of 3', q: 'By the time Ms. Turner’s Housing Navigation case reaches the Navigator, which statement should be true?', opts: ['The Navigator begins by making the first housing referral.', 'Coordinated Entry and assessment work have occurred, management has opened the case, and the plan has begun.', 'The Navigator completes the initial Housing Social Worker assessment.', 'Nothing should happen before Navigation.'], a: 1, fb: 'The Navigator receives a baton. They do not restart the entire journey.', scored: true },
  { t: 'decide', ch: PRO, eye: 'Prologue checkpoint 2 of 3', q: 'Safe Parking is best understood as:', opts: ['Permanent housing.', 'Temporary crisis stabilization.', 'A housing subsidy.', 'A parking benefit available after housing.'], a: 1, fb: 'Safe Parking may increase immediate safety and stability. It is not permanent housing.', scored: true },
  { t: 'decide', ch: PRO, eye: 'Prologue checkpoint 3 of 3', q: 'Which best describes a warm handoff?', opts: ['Send the referral and close your part.', 'Personally connect the member to the next person or service and make sure everyone understands what happens next.', 'Leave a detailed case note.', 'Keep every staff member involved forever.'], a: 1, fb: 'A referral is an action. A handoff is a transition.', scored: true },

  // CHAPTER 1
  { t: 'story', ch: C(1), eye: 'Chapter 1 · The Housing Support Plan', title: 'Month one', blocks: [
    n('Learning objective: use the Housing Support Plan as a shared roadmap for the work, not a form staff complete around the member.'),
    n('Evelyn’s Housing Navigation case is now open. The first month matters. There may be pressure to start sending applications immediately. Housing search matters. But strong Navigation starts by understanding what staff and the member are actually working toward.'),
    list('Establish trust', 'Review the assessment and known barriers', 'Begin the Housing Support Plan', 'Begin the Housing Passport', 'Explain the process', 'Identify immediate priorities', 'Start moving'),
  ] },
  { t: 'decide', ch: C(1), eye: 'Practice · Open her file', title: 'A new case lands on your desk', setup: [n('Carla has just been assigned Evelyn’s case. She opens the file.'), file('Case received · Open her file', 'HN-0068', [['Member', 'Evelyn Turner, 68'], ['Referral source', 'Community Center, Housing Pre-Screen done'], ['Triage assessment', 'Complete'], ['Case opened by', 'Housing Services Manager'], ['Release of information', 'Not on file', true], ['Backup contact', 'None listed', true], ['Housing Support Plan', 'Not started', true]], 'Open the file before you pick up the phone.')], q: 'What is missing that matters most right now?', opts: ['The list of available units.', 'A release of information and a backup contact, so Evelyn can be reached and information can move.', 'A completed lease application.', 'Nothing. The Manager already opened the case, so the file is complete.'], a: 1, fb: 'Without a current release, information cannot move between programs. With no backup contact, an older adult is simply hard to reach when a call matters.', wrong: { 0: 'Units come later. Right now the gaps are about safe, coordinated contact.', 2: 'An application is far down the road. The foundation comes first.', 3: 'Opening a case is not the same as a ready file. Reading the file for gaps is the Navigator’s first job.' } },
  { t: 'decide', ch: C(1), eye: 'Practice · What first?', title: 'First move on a new case', setup: [n('The file is open. Evelyn has not heard from Carla yet.')], q: 'What should Carla do first?', opts: ['Start sending applications so no time is lost.', 'Read the handoff, then reach out to Evelyn, introduce herself, explain the process, and begin the plan with her.', 'Wait until the Manager gives a list of tasks.', 'Ask Evelyn to bring every document before the first meeting.'], a: 1, fb: 'The first move is a warm, human one. Carla reads what was passed to her, then makes contact and begins the plan with Evelyn, not around her.', wrong: { 0: 'Housing search matters, but starting there skips trust, the plan, and Evelyn’s priorities.', 2: 'The Manager opened the case. The Navigator owns the next step.', 3: 'A long document list before any relationship feels like a barrier. Start by meeting her where she is.' } },
  { t: 'story', ch: C(1), eye: 'Chapter 1 · Three touchpoints', title: 'You will hear from me regularly', blocks: [
    say('CM', '“Ms. Turner, I want to make sure you always know where things stand. You’re going to hear from me regularly. Some conversations will be about applications. Some might be about documents. Sometimes we may just need to figure out what changed since the last time we talked.”'),
    n('The Road Home standard is three meaningful individual touchpoints per month. The point is not to manufacture activity. The point is to keep the housing work moving and make sure the member is not forgotten.'),
    list('1. Initial Navigation Appointment: understand Evelyn’s goals in her own words, review known barriers, explain what Housing Navigation can and cannot do.', '2. Housing Clinic Follow-Up: review documents, discuss opportunities, complete housing work together.', '3. Individual Check-In: phone, virtual, office, or community. Identify what changed and what needs to happen next.'),
  ] },
  { t: 'story', ch: C(1), eye: 'Chapter 1 · Building the plan', title: 'Not just whether there is a unit', blocks: [
    say('CM', '“Let’s talk about what would actually make a place work for you. Not just whether there’s a unit.”'),
    say('ET', '“First thing is the rent. I can’t be choosing between rent and medication again. And I’d rather not deal with stairs. I need to be able to get to my doctor too.”'),
    say('CM', '“Okay. Affordability. Accessibility. And being able to stay connected to your healthcare. Let’s put those into the plan.”'),
    n('Those are not side comments. They are housing considerations. The plan should reflect what matters to Evelyn and the steps required to move toward it.'),
    file('Housing Support Plan', 'HSP-0068', [['Member', 'Evelyn Turner, 68'], ['Her goal, in her words', '“I can’t be choosing between rent and medication again.”'], ['Must-haves', 'Affordable rent · No stairs · Close to her doctor'], ['Who owns the goals', 'Evelyn'], ['Navigator', 'Carla Montez'], ['Status', 'Draft, built with Evelyn']], 'The plan reads like Evelyn, not like a form.'),
  ] },
  { t: 'decide', ch: C(1), eye: 'Decision 1 · Who writes the goal?', setup: [say('ET', '“You’re the expert. Just put down whatever you think is best.”')], q: 'What should Carla do?', opts: ['Write the goals herself so Evelyn does not have to worry about it.', 'Invite Evelyn to identify what matters most and build the goals with her.', 'Use the same goals for every Housing Navigation participant.', 'Ask the Manager to decide what Evelyn should prioritize.'], a: 1, fb: 'Carla brings housing expertise. Evelyn brings expertise about her own life. A strong plan uses both.', wrong: { 0: 'It may feel helpful to take the work off Evelyn’s plate. But a plan written for her instead of with her can remove ownership from the person whose life the plan affects.', 2: 'Templates can help staff remember important areas. They should not erase individual priorities.', 3: 'The Manager has an oversight role. That does not transfer Evelyn’s personal choices to the Manager.' } },
  { t: 'decide', ch: C(1), eye: 'Practice · Which goal is stronger?', setup: [say('ET', '“I don’t want to lose another place because the rent eats up everything I have.”')], q: 'Choose the strongest plan language.', opts: ['Member will become financially responsible.', 'Staff will find affordable housing for Evelyn.', 'Evelyn will review housing options that fit her income and develop an affordable monthly housing budget with staff.', 'Housing is needed.'], a: 2, fb: 'The goal is specific, collaborative, actionable, and tied to what Evelyn said matters.' },
  { t: 'story', ch: C(1), eye: 'Chapter 1 · Plan timeline', title: '15 → 30 → 180', blocks: [
    big('15 → 30 → 180'),
    list('Completed within 15 days', 'Uploaded within 30 days', 'Updated every 180 days, or sooner when circumstances materially change'),
    n('The timeline is not there because a funder likes paperwork. A current plan tells the team what the work actually is.'),
  ] },
  { t: 'reflect', ch: C(1), eye: 'Reflect · Not scored', prompt: 'Where is the line between professional guidance and professional control?', themes: ['Explain options', 'Explain consequences', 'Structure next steps', 'Help reduce barriers', 'Challenge assumptions when needed, while still leaving meaningful personal decisions with the member'] },
  { t: 'decide', ch: C(1), eye: 'Chapter 1 check · 1 of 3', q: 'Who owns the goals in the Housing Support Plan?', opts: ['The Navigator.', 'The Manager.', 'The member, with staff support.', 'The housing provider.'], a: 2, fb: 'The plan is built with the member.', scored: true },
  { t: 'decide', ch: C(1), eye: 'Chapter 1 check · 2 of 3', q: 'How soon should the Housing Support Plan be completed and uploaded?', opts: ['Complete in 30 days; upload in 60.', 'Complete within 15 days; upload within 30.', 'Complete and upload within 15.', 'There is no timeline.'], a: 1, fb: 'The standard is 15 / 30 / 180. Fifteen days to complete, 30 to upload, 180 for routine updating or sooner when circumstances change.', scored: true },
  { t: 'decide', ch: C(1), eye: 'Chapter 1 check · 3 of 3', q: 'Evelyn’s transportation situation changes and one of her housing goals no longer makes sense. What should happen?', opts: ['Wait until the 180-day review.', 'Keep the existing goal because it was approved.', 'Update the plan when the change affects the housing work.', 'Close the goal without discussing it.'], a: 2, fb: 'A material change is a reason to update the plan now.', scored: true },
  { t: 'take', ch: C(1), big: 'The plan is not about Evelyn.', sub: 'The plan is built with Evelyn.' },

  // CHAPTER 2
  { t: 'story', ch: C(2), eye: 'Chapter 2 · Document readiness', title: 'Become ready before the call', blocks: [
    n('Learning objective: understand document readiness as active housing work.'),
    n('Housing opportunities can take months to appear. When they do, they can move quickly. The wrong time to discover a missing document is after the housing opportunity arrives.'),
    big('Readiness happens before opportunity.'),
  ] },
  { t: 'story', ch: C(2), eye: 'Chapter 2 · The Housing Passport', title: 'Where are we?', blocks: [
    say('CM', '“Let’s see where we are.”'),
    list('Photo ID', 'Social Security documentation', 'Income and benefit verification', 'Homelessness verification', 'Medical documentation where needed', 'Housing preferences', 'Emergency contact'),
    big('If the right housing opportunity opened today, could we act?'),
    file('Housing Passport', 'HP-0068', [['Photo ID', 'On file'], ['Social Security card', 'Missing. Replacement requested', true], ['Income verification', 'Award letter on file. Watch the expiration date', true], ['Medical verification', 'Ready'], ['Housing history', 'Complete'], ['Owner', 'Carla Montez, with Evelyn']], 'Flagged rows are the barriers waiting to be cleared.'),
  ] },
  { t: 'decide', ch: C(2), eye: 'Decision 2 · The missing Social Security card', setup: [say('ET', '“I know I had the card. I just don’t know where it went. Probably somewhere in that car.”'), n('A housing opportunity could come soon.')], q: 'What should Carla do?', opts: ['Submit applications without it.', 'Wait and see whether Evelyn finds it.', 'Begin the replacement process now and document the barrier and next action.', 'Pause Housing Navigation entirely.'], a: 2, fb: 'A missing document is a task to work. It is not a reason to stop the journey. Waiting turns a solvable barrier into a future emergency.' },
  { t: 'sort', ch: C(2), eye: 'Practice · Ready or not?', title: 'Tap each item to see where it stands', items: [
    { p: 'Current photo ID', v: 'Ready', good: true },
    { p: 'Expired photo ID', v: 'Not ready', n: 'An expired document can become a barrier when the opportunity arrives.', good: false },
    { p: 'Current income verification', v: 'Ready', good: true },
    { p: 'Income information more than 90 days old', v: 'Needs updating', good: false },
    { p: 'Current homelessness verification', v: 'Ready', good: true },
    { p: 'VOH/VOD older than 365 days', v: 'Needs updating', good: false },
  ] },
  { t: 'story', ch: C(2), eye: 'Chapter 2 · Housing ready', title: 'Readiness means we are able to respond', blocks: [
    n('Document readiness is not the entire picture. Housing-ready work can also include applications submitted, supporting documents verified, reasonable accommodations identified when needed, housing preferences discussed, available units reviewed, and property managers contacted.'),
    big('Day 90: ready to move when opportunity moves.'),
    n('By Day 90, the goal is a complete, verified Housing Passport. That does not guarantee a housing offer. It means the team has removed preventable delays that would stop Evelyn from acting when one appears.'),
  ] },
  { t: 'reflect', ch: C(2), eye: 'Reflect · Not scored', prompt: 'What happens to trust when we tell someone there may be a housing opportunity and only then discover that their packet cannot be submitted?', themes: ['False hope', 'Preventable delay', 'Missed opportunities', 'Distrust', 'Crisis-driven work', 'Inequity between members whose paperwork happened to be ready and those whose barriers were never addressed'] },
  { t: 'decide', ch: C(2), eye: 'Chapter 2 check · 1 of 3', q: 'What is the purpose of the Housing Passport?', opts: ['Replace the Housing Support Plan.', 'Keep required housing documentation current and ready for housing opportunities.', 'Determine whether the member deserves housing.', 'Store only identification documents.'], a: 1, fb: 'It keeps the member ready to act when an opportunity opens.', scored: true },
  { t: 'decide', ch: C(2), eye: 'Chapter 2 check · 2 of 3', q: 'By Day 90, what should be true of Evelyn’s Housing Passport?', opts: ['It should be started.', 'It may still be mostly incomplete.', 'Required documents should be complete and verified.', 'It should be transferred to the county.'], a: 2, fb: 'Day 90 is the readiness standard.', scored: true },
  { t: 'decide', ch: C(2), eye: 'Chapter 2 check · 3 of 3', q: 'Evelyn’s income verification expires while she is waiting. What should Carla do?', opts: ['Wait until the next unit opens.', 'Update it before it becomes a barrier.', 'Remove her from waitlists.', 'Close the Housing Passport.'], a: 1, fb: 'Keep the file ready so an expired document never stops an opportunity.', scored: true },
  { t: 'take', ch: C(2), big: 'A missing document is not paperwork waiting.', sub: 'It is a housing barrier waiting.' },

  // CHAPTER 3
  { t: 'story', ch: C(3), eye: 'Chapter 3 · Housing Navigation', title: 'Finding Home', blocks: [
    n('Learning objective: understand Housing Navigation as active, relationship-based work toward permanent housing.'),
    n('Housing Navigation is not “Your name is on the list. We’ll call you.” It is active work.'),
    file('Housing Search Log', 'HSL-0068', [['Preferred building', 'Senior building Evelyn chose'], ['Accessibility', 'Elevator, ground-floor access'], ['Application', 'Submitted with Evelyn’s approval'], ['Last direct contact', 'Logged with date and outcome'], ['Next step', 'Follow up on application status']], 'Navigation is movement, and the log shows it.'),
  ] },
  { t: 'cards', ch: C(3), eye: 'Chapter 3 · Explore', title: 'What Navigation includes', intro: 'Tap each area.', cards: [
    ['Affordable housing search', ['Identify senior and affordable housing opportunities that fit Evelyn’s income, needs, and preferences.']],
    ['Applications and waitlists', ['Submit applications. Maintain waitlist status. Respond to notices. Keep information current.']],
    ['Landlord communication', ['Communicate professionally with housing providers and property managers. Clarify requirements. Advocate appropriately.']],
    ['Interview preparation', ['Make sure Evelyn understands what to expect and can walk into housing interviews prepared.']],
    ['Monthly case updates', ['Verify income. Update documentation. Record progress. Identify new barriers.']],
    ['Stay connected', ['Three meaningful individual touchpoints. The purpose is simple: Evelyn should not disappear inside a caseload.']],
  ] },
  { t: 'sort', ch: C(3), eye: 'Practice · Does it count?', title: 'Does this count as direct contact?', intro: 'Tap each scenario.', items: [
    { p: 'Carla calls Evelyn. They speak for fifteen minutes about two housing applications and decide what Evelyn wants to submit.', v: 'Counts as direct contact', good: true },
    { p: 'Carla leaves a voicemail.', v: 'Does not count as completed direct contact', n: 'It should still be documented as an outreach attempt.', good: false },
    { p: 'Carla sends a text.', v: 'Does not count as direct contact', good: false },
    { p: 'Evelyn attends Housing Clinic. Carla meets with her individually and documents a housing update.', v: 'Counts', good: true },
    { p: 'Evelyn attends a group session. No individualized housing update is documented.', v: 'Does not count', good: false },
  ] },
  { t: 'decide', ch: C(3), eye: 'Decision 3 · One building', setup: [say('ET', '“I know where I want to live. That senior building over by my old neighborhood. That’s the one.”'), n('Carla checks. The building has a long waitlist. Three other appropriate buildings are taking applications now.')], q: 'What should Carla do?', opts: ['Apply only to Evelyn’s first choice and wait.', 'Talk through the options with Evelyn, keep her preferred building active, and apply broadly to other acceptable options now.', 'Apply to the other buildings without telling Evelyn.', 'Stop all applications until Evelyn feels certain.'], a: 1, fb: 'Evelyn’s preference matters. So does keeping opportunities open. Person-centered practice does not require the team to make the search unnecessarily narrow. It requires Evelyn to understand and participate in the decision.' },
  { t: 'reflect', ch: C(3), eye: 'Reflect · Not scored', prompt: 'What is the difference between honoring preference and allowing the housing search to stall?' },
  { t: 'decide', ch: C(3), eye: 'Chapter 3 check · 1 of 3', q: 'Which counts as direct contact?', opts: ['Leaving a voicemail.', 'Sending a text.', 'A phone call where Carla reaches Evelyn.', 'Group attendance with no individualized update.'], a: 2, fb: 'Direct contact means a real two-way conversation or individual meeting.', scored: true },
  { t: 'decide', ch: C(3), eye: 'Chapter 3 check · 2 of 3', q: 'Which best describes Housing Navigation?', opts: ['Waiting for a housing match.', 'Active search, applications, readiness, advocacy, member contact, and response to opportunities.', 'Completing housing paperwork only.', 'Coordinated Entry reassessment.'], a: 1, fb: 'Navigation is movement.', scored: true },
  { t: 'decide', ch: C(3), eye: 'Chapter 3 check · 3 of 3', q: 'Who decides whether Evelyn submits an application to a particular property?', opts: ['Evelyn, with information and support from staff.', 'Carla.', 'The Manager.', 'The property manager.'], a: 0, fb: 'Choice belongs to the member.', scored: true },
  { t: 'take', ch: C(3), big: 'Housing Navigation is movement.', sub: 'Not waiting.' },

  // CHAPTER 4
  { t: 'story', ch: C(4), eye: 'Chapter 4 · Cross-department collaboration', title: 'More than housing', blocks: [
    n('Learning objective: connect members to other supports without turning Housing Navigation into every service and without making the member coordinate the organization.'),
    n('Evelyn arrives for an appointment. She looks tired.'),
    say('ET', '“My food benefits got changed again. And I’ve missed two appointments with my doctor because getting over there is a mess.”'),
    n('Carla listens. These needs matter. But not every need becomes Carla’s job.'),
    big('No Wrong Door does not mean everyone does everything.', 'It means we recognize the need and help make the right connection.'),
  ] },
  { t: 'cards', ch: C(4), eye: 'Chapter 4 · Explore', title: 'Who owns what?', intro: 'Tap each role.', cards: [
    ['Housing Navigator', ['Keeps the housing work moving.']],
    ['Other community support', ['May address benefits, food access, transportation, connection, or another identified service need.']],
    ['Behavioral health', ['May become part of the support plan when indicated and with appropriate consent.']],
    ['Supervisors and clinical leadership', ['Support elevated situations, risk, consultation, and difficult decision-making.']],
    ['The member', ['Should understand why another person is becoming involved.']],
  ] },
  { t: 'sort', ch: C(4), eye: 'Practice · Referral or handoff?', title: 'Is this a strong handoff?', items: [
    { p: '“Here’s the number for the benefits office. Give them a call.”', v: 'Not a strong handoff', good: false },
    { p: '“There’s someone on our team who can help look at what changed with your benefits. If you’re okay with it, I can connect you. I’ll make sure they know what you’re asking for so you don’t have to start from the beginning.”', v: 'Strong', good: true },
  ] },
  { t: 'decide', ch: C(4), eye: 'Decision 4', setup: [n('Evelyn has a need outside Carla’s role.')], q: 'What should Carla do?', opts: ['Take over the other department’s job.', 'Tell Evelyn it is outside Housing Navigation and move on.', 'Explain the relevant support, confirm Evelyn wants the connection, make the referral or introduction, and make sure someone receives it.', 'Send an internal message without talking to Evelyn.'], a: 2, fb: 'The goal is not to collect referrals. The goal is to make connections that work.' },
  { t: 'reflect', ch: C(4), eye: 'Reflect · Not scored', prompt: 'How can “I referred her” still result in a dropped baton?', themes: ['No one accepted the referral', 'The member did not understand who would contact her', 'No appointment was scheduled', 'Wrong program', 'Staff expected the member to repeat everything', 'The referral remained untouched', 'Responsibility became unclear'] },
  { t: 'decide', ch: C(4), eye: 'Chapter 4 check · 1 of 3', q: 'No Wrong Door means:', opts: ['Every employee provides every service.', 'Staff help people reach the appropriate next service instead of sending them away.', 'Eligibility rules are optional.', 'Every need becomes Housing Navigation’s responsibility.'], a: 1, fb: 'Help make the right connection.', scored: true },
  { t: 'decide', ch: C(4), eye: 'Chapter 4 check · 2 of 3', q: 'When is an internal referral strongest?', opts: ['When it has been submitted.', 'When the member and receiving team both understand the connection and next step.', 'When it is documented in an email.', 'When the sending staff person closes their task.'], a: 1, fb: 'A referral is only as strong as the connection it creates.', scored: true },
  { t: 'decide', ch: C(4), eye: 'Chapter 4 check · 3 of 3', q: 'Who should understand why another program is becoming involved?', opts: ['Staff only.', 'Management only.', 'The member.', 'Data staff.'], a: 2, fb: 'The member should never be surprised by who is involved in their life.', scored: true },
  { t: 'take', ch: C(4), big: 'Do not make the member carry the organization.' },

  // CHAPTER 5
  { t: 'story', ch: C(5), eye: 'Chapter 5 · The Transitional Housing decision', title: 'One offer, two answers', blocks: [
    n('Learning objective: understand Transitional Housing as a stabilization bridge toward permanent housing and preserve member choice.'),
    n('A Transitional Housing opening becomes available. Evelyn is offered the option. Staff explain where it is, what the environment is like, what participation requires, and how permanent housing work would continue.'),
    say('ET', '“I appreciate it. But I know myself. Right now, I feel safer staying with my routine in the car than moving there.”'),
    n('Evelyn declines. Her Housing Navigation does not become a punishment. Her decision is documented. The permanent housing work continues.'),
  ] },
  { t: 'story', ch: C(5), eye: 'Chapter 5 · Meet Marcus Johnson', title: 'Marcus gets the same offer', blocks: [
    n('The same week, Marcus Johnson is offered Transitional Housing. Marcus recently exited residential treatment. He is sleeping at an encampment. He is approximately 90 days into housing work. His documentation is ready.'),
    say('MJ', '“I need somewhere to reset. But I need to know something. If I go there, are we still working on my own place?”'),
    say('RD', '“Yes. Transitional Housing is not the end of the housing search. It gives us somewhere more stable to work from while we keep moving toward permanent housing.”'),
    big('Transitional Housing is a bridge.', 'Not a destination.'),
    file('Program Case File', 'TH-0412', [['Member', 'Marcus Johnson'], ['Pathway', 'Transitional Housing referral'], ['Fit', 'Eligible and a reasonable fit'], ['Member decision', 'Marcus’s choice', true], ['Housing Navigation', 'Continues in parallel'], ['TH coordinator', 'Renee Dawson']], 'Fit is the team’s call. Acceptance is the member’s.'),
  ] },
  { t: 'decide', ch: C(5), eye: 'Decision 5', setup: [n('Marcus is eligible and appears to be a reasonable fit.')], q: 'Who decides whether he enters Transitional Housing?', opts: ['Marcus, after staff explain the option, expectations, and alternatives.', 'The Housing Navigator.', 'The Housing Services Manager.', 'The Transitional Housing Coordinator.'], a: 0, fb: 'Staff determine program eligibility and fit according to their roles. Marcus still decides whether to accept the option.' },
  { t: 'story', ch: C(5), eye: 'Chapter 5 · Parallel work', title: 'Two tracks move together', blocks: [
    big('Stabilize today.', 'Continue Finding Home.'),
    n('Transitional Housing does not put permanent housing on pause. For a participant in Transitional Housing, the Transitional Housing and Housing Navigation Coordinator carries both the residency and the permanent housing search. There is not a second parallel Navigator during the TH stay.'),
    { k: 'flow', items: ['Referral', 'Fit decision', 'Move-in', 'Active TH / Housing Navigation', 'Housing placement pending', 'Move-out', 'Permanent housing', 'Transition to TSS', 'Case closure'] },
  ] },
  { t: 'reflect', ch: C(5), eye: 'Reflect · Not scored', prompt: 'Why might a reasonable person decline Transitional Housing even when staff believe it could help?', themes: ['Safety', 'Privacy', 'Location', 'Rules', 'Past institutional experiences', 'Pets or belongings', 'Relationships', 'Fear of losing current routine', 'Previous shelter experience'], note: 'Understanding the reason is different from agreeing with the decision. Respecting choice does not prevent staff from discussing consequences honestly.' },
  { t: 'decide', ch: C(5), eye: 'Chapter 5 check · 1 of 3', q: 'Transitional Housing should be understood as:', opts: ['Permanent housing.', 'A bridge that provides stabilization while permanent housing remains the goal.', 'A consequence when Navigation is unsuccessful.', 'A replacement for Housing Navigation.'], a: 1, fb: 'It is a bridge, not a destination.', scored: true },
  { t: 'decide', ch: C(5), eye: 'Chapter 5 check · 2 of 3', q: 'A member declines Transitional Housing. What happens next?', opts: ['Housing services stop.', 'The decision is documented and appropriate permanent housing work continues.', 'The member is marked noncompliant.', 'The member loses other housing opportunities.', ], a: 1, fb: 'Declining is a choice, not a failure.', scored: true },
  { t: 'decide', ch: C(5), eye: 'Chapter 5 check · 3 of 3', q: 'Once Marcus enters Transitional Housing, who carries his Housing Navigation work?', opts: ['His former Housing Navigator continues simultaneously.', 'The TH & Housing Navigation Coordinator carries both the residency and permanent housing work.', 'The Housing Social Worker.', 'No one until he leaves TH.'], a: 1, fb: 'One coordinator carries both tracks.', scored: true },
  { t: 'take', ch: C(5), big: 'Stabilization can change the road.', sub: 'It does not change the destination.' },

  // CHAPTER 6
  { t: 'story', ch: C(6), eye: 'Chapter 6 · When a case goes quiet', title: 'Meet David Miller', blocks: [
    n('Learning objective: respond to loss of contact with structured re-engagement rather than assumptions or premature closure.'),
    n('David has been participating in Housing Navigation. Then he misses an appointment. Carla calls. No answer. She tries again. Still nothing. His phone eventually stops accepting calls. A case can become quiet very quickly.'),
    file('Contact Log', 'CL-0291', [['Member', 'David Miller'], ['Attempt 1', 'Phone, no answer. Message left'], ['Attempt 2', 'Text sent, no reply'], ['Attempt 3', 'Letter mailed, outreach tried at known spots'], ['Status', 'Active. Re-engagement in progress', true], ['Note', 'A missed appointment is information, not a verdict']], 'Every attempt is written down so the next person does not start over.'),
  ] },
  { t: 'multi', ch: C(6), eye: 'Explore · What might have happened?', title: 'What does silence mean?', intro: 'Tap every explanation that could be true.', items: ['Phone disconnected', 'Hospitalized', 'Transportation problem', 'Moved locations', 'Mental-health change', 'Family crisis', 'Lost belongings', 'Incarcerated', 'Embarrassed about missing the appointment', 'Simply missed contact'], after: 'You may not know. That is the point. Silence is information. It is not a decision.' },
  { t: 'decide', ch: C(6), eye: 'Decision 6', setup: [n('David has not responded to repeated contact.')], q: 'What should Carla do?', opts: ['Close the case for noncompliance.', 'Use a structured re-engagement approach, document attempts, use appropriate available contact pathways, and consult supervision as needed.', 'Stop documenting until David returns.', 'Remove him from housing applications.'], a: 1, fb: 'Loss of contact requires action. It does not automatically tell us why contact was lost.' },
  { t: 'story', ch: C(6), eye: 'Chapter 6 · Re-engagement standard', title: 'A staged response', blocks: [
    list('At 14 days without meaningful contact, increase outreach. Use at least three documented attempts across two or more channels. Do not wait passively for Day 30.', 'At 30 days, a Disengaged status requires supervisor sign-off.'),
    n('The case remains open and warm rather than being treated as automatically closed.'),
  ] },
  { t: 'decide', ch: C(6), eye: 'Scene · David returns', setup: [n('Several weeks later, David walks into St. Mary’s Center.'), say('DM', '“My phone got shut off. Then after I missed everything, I figured y’all probably closed me anyway.”')], q: 'Which response is strongest?', opts: ['“You should have called us somehow.”', '“You were about to lose your case.”', '“I’m glad you came in. Let’s look at where things stand and what changed.”', '“You’ll have to start over.”'], a: 2, fb: 'David came back. The first job is to re-establish connection and understand what changed. Accountability can still happen without making the return punitive.' },
  { t: 'reflect', ch: C(6), eye: 'Reflect · Not scored', prompt: 'What does a warm re-entry communicate to someone who has repeatedly experienced systems as difficult to return to?' },
  { t: 'decide', ch: C(6), eye: 'Chapter 6 check · 1 of 4', q: 'A missed appointment proves:', opts: ['The member is not motivated.', 'Nothing by itself.', 'The member wants the case closed.', 'The member has declined housing.'], a: 1, fb: 'It tells us contact was missed, not why.', scored: true },
  { t: 'decide', ch: C(6), eye: 'Chapter 6 check · 2 of 4', q: 'At 14 days without meaningful contact, staff should:', opts: ['Immediately close the case.', 'Increase outreach using multiple documented attempts and channels.', 'Wait until Day 30.', 'Remove pending housing applications.'], a: 1, fb: 'Do not wait passively for Day 30.', scored: true },
  { t: 'decide', ch: C(6), eye: 'Chapter 6 check · 3 of 4', q: 'Moving a member to Disengaged at 30 days requires:', opts: ['Nothing.', 'Supervisor sign-off.', 'A new Coordinated Entry assessment.', 'The member’s written agreement.'], a: 1, fb: 'The decision is not one staff person’s alone.', scored: true },
  { t: 'decide', ch: C(6), eye: 'Chapter 6 check · 4 of 4', q: 'David returns. What should happen first?', opts: ['Start the entire intake again.', 'Determine what changed, restore the connection, and identify the next housing action.', 'Ask him to explain why he was irresponsible.', 'Close and reopen the case.'], a: 1, fb: 'Restore the connection, then move the work forward.', scored: true },
  { t: 'take', ch: C(6), big: 'Re-engagement is part of engagement.' },

  // CHAPTER 7
  { t: 'story', ch: C(7), eye: 'Chapter 7 · Signing and handoff preparation', title: 'The call', blocks: [
    n('Learning objective: treat permanent housing placement as a coordinated transition, not simply the moment the housing search stops.'),
    n('Carla’s phone rings. The property manager at Friendly Manor has completed the review. Evelyn has been approved. Carla calls her.'),
    say('CM', '“Ms. Turner. They approved you.”'),
    n('Silence.'),
    say('ET', '“For the apartment?”'),
    say('CM', '“For the apartment.”'),
    say('ET', '“So this is real?”'),
    say('CM', '“This is real.”'),
    n('This is the moment everyone has been working toward. It is also the beginning of a major transition.'),
  ] },
  { t: 'story', ch: C(7), eye: 'Chapter 7 · Affordability', title: 'Do the numbers work?', blocks: [
    { k: 'rows', head: ['Monthly', 'Before', 'After'], items: [['Social Security income', '$1,650', '$1,650'], ['Rent', '$2,300', '$300'], ['SNAP', 'Yes', 'Yes'], ['Left for food, utilities, transportation, medication', 'Negative', 'Positive balance']] },
    n('Housing availability matters. Housing affordability determines whether the numbers can work after move-in.'),
    big('Housing is the goal.', 'Stability is the outcome.'),
    file('Affordability Check', 'AFF-0068', [['Monthly income', 'Social Security, verified'], ['Proposed rent', 'Within what Evelyn can sustain'], ['Utilities', 'Estimated and included', true], ['Medication costs', 'Counted, not ignored', true], ['Result', 'The numbers work with room to spare']], 'Available is not the same as affordable.'),
  ] },
  { t: 'story', ch: C(7), eye: 'Chapter 7 · Move coordination', title: 'A key does not create a stable tenancy', blocks: [
    list('Utilities', 'Furniture', 'Medication', 'Transportation', 'Food', 'Emergency contacts', 'Lease orientation', 'Community resources'),
    n('Move coordination should identify foreseeable problems before they become first-month crises.'),
  ] },
  { t: 'sort', ch: C(7), eye: 'Practice · What needs a plan?', title: 'Tap each situation', items: [
    { p: 'Evelyn’s electricity is not scheduled to start until three days after move-in.', v: 'Address it.', good: true },
    { p: 'Evelyn is unsure which bus will get her to her doctor.', v: 'Address it.', good: true },
    { p: 'Evelyn does not understand one section of her lease.', v: 'Review it or connect her with the appropriate person.', n: 'Do not assume she understands.', good: true },
    { p: 'Evelyn says she does not need furniture immediately.', v: 'Respect the decision.', n: 'Document any follow-up she wants.', good: true },
  ] },
  { t: 'decide', ch: C(7), eye: 'Decision 7', setup: [n('Evelyn signs the lease.')], q: 'What should Carla do next?', opts: ['Close the Housing Navigation case immediately.', 'Coordinate the transition and complete the warm handoff to TSS.', 'Wait until Evelyn has a tenancy problem.', 'Tell Evelyn to contact St. Mary’s Center if she needs anything.'], a: 1, fb: 'The key is not the finish line.' },
  { t: 'reflect', ch: C(7), eye: 'Reflect · Not scored', prompt: 'Why can the first 30 days after housing be both successful and risky at the same time?' },
  { t: 'decide', ch: C(7), eye: 'Chapter 7 check · 1 of 3', q: 'Why does affordability matter in addition to availability?', opts: ['Any available unit creates long-term stability.', 'Housing costs must leave enough resources for other essential needs.', 'SNAP pays the rent.', 'Affordable housing requires less follow-up.'], a: 1, fb: 'Stability depends on what is left after rent.', scored: true },
  { t: 'decide', ch: C(7), eye: 'Chapter 7 check · 2 of 3', q: 'Which belongs in move coordination?', opts: ['Utilities.', 'Medication access.', 'Transportation.', 'Lease orientation.', 'All of the above.'], a: 4, fb: 'Each is a foreseeable first-month problem.', scored: true },
  { t: 'decide', ch: C(7), eye: 'Chapter 7 check · 3 of 3', q: 'Permanent lease signing means:', opts: ['Every service relationship ends immediately.', 'Housing Navigation has reached a major transition point and a warm TSS handoff begins.', 'The member no longer requires a case.', 'Housing staff stop communicating.'], a: 1, fb: 'The baton moves to TSS.', scored: true },
  { t: 'take', ch: C(7), big: 'Getting the key matters.', sub: 'What happens after the key matters too.' },

  // CHAPTER 8
  { t: 'story', ch: C(8), eye: 'Chapter 8 · Warm handoff to TSS', title: 'Finding Home to Keeping Home', blocks: [
    n('Learning objective: transfer the relationship, context, risks, pending work, and member understanding, not merely a record.'),
    n('Carla has carried Finding Home. Evelyn now has a permanent lease. Hector Salas, the TSS Coordinator, will carry Keeping Home. This is where weak systems often drop the baton.'),
    list('The Navigator thinks: She’s housed.', 'The TSS Coordinator thinks: I’ll read the record.', 'The member thinks: Who is this person, and why am I starting over?'),
    n('The Road Home standard is different.'),
  ] },
  { t: 'story', ch: C(8), eye: 'Chapter 8 · The introduction', title: 'Three people, one conversation', blocks: [
    say('CM', '“Ms. Turner, you’ve met Hector before. Now that your lease is signed, I want the three of us to go through what happens next. Hector’s role is different from mine. My work focused on finding housing. His work is about helping you keep it.”'),
    say('HS', '“And I don’t need you to retell everything Carla already knows. We’ll go over the important pieces together. Then I want to hear what you want help with first.”'),
    say('ET', '“My biggest thing? I don’t want some little issue with the landlord to turn into me losing my place.”'),
    say('HS', '“Then that’s where we’ll start.”'),
    big('Finding Home → Keeping Home'),
  ] },
  { t: 'story', ch: C(8), eye: 'Chapter 8 · The handoff packet', title: 'Carry the full picture', blocks: [
    list('Housing history', 'Housing Support Plan', 'Housing Passport', 'Lease information', 'Benefits', 'Utilities', 'Known risks', 'Follow-up needs', 'Furniture needs', 'Community resources', 'Important contacts', 'Pending actions'),
    n('The purpose is not to create the largest packet possible. The purpose is to make sure Hector can continue the work without making Evelyn rebuild the story.'),
    file('Handoff Packet', 'HO-0068', [['Housing Support Plan', 'Attached'], ['Housing Passport', 'Attached'], ['Lease', 'Attached'], ['Benefits', 'Current'], ['Known risks', 'Documented', true], ['Receiving staff', 'Hector Salas, TSS Coordinator'], ['Introduction', 'Three-way, with Evelyn present']], 'Hector can continue the work without making Evelyn retell her story.'),
  ] },
  { t: 'sort', ch: C(8), eye: 'Practice · Warm or cold?', title: 'Tap each scenario', items: [
    { p: 'Carla emails Hector: “Evelyn housed. Please follow up.” Then she closes her work.', v: 'Cold', good: false },
    { p: 'Carla, Hector, and Evelyn meet. They review current concerns, pending tasks, housing information, and the next appointment. Everyone leaves knowing what they own.', v: 'Warm', good: true },
    { p: 'Carla enters an excellent case note. Evelyn does not know who Hector is.', v: 'Still cold', good: false },
    { p: 'Hector attends the lease-signing transition, meets Evelyn, reviews the packet, and schedules their first TSS contact.', v: 'Warm', good: true },
  ] },
  { t: 'story', ch: C(8), eye: 'Chapter 8 · The two exits', title: 'Two baton moments', blocks: [
    list('Exit 1, Permanent home: handoff to the TSS Coordinator. Next phase: Keeping Home / Tenancy Sustaining Services.', 'Exit 2, Transitional Housing: handoff to the TH & Housing Navigation Coordinator. Next phase: stabilization while permanent housing remains the goal.'),
    n('TSS begins at permanent lease signature through the warm handoff. Not when the first housing offer appears. Not weeks after move-in. Not after the Housing Navigation record has simply been closed.'),
  ] },
  { t: 'decide', ch: C(8), eye: 'Decision 8', setup: [n('Evelyn has signed her permanent lease.')], q: 'Who receives the warm handoff?', opts: ['TSS Coordinator.', 'Transitional Housing Coordinator.', 'Housing Social Worker.', 'No one. The case ends.'], a: 0, fb: 'Permanent housing is the transition from Finding Home into Keeping Home. The baton goes to TSS.' },
  { t: 'reflect', ch: C(8), eye: 'Reflect · Not scored', prompt: 'If Carla disappeared tomorrow, what would Hector need to know to continue helping Evelyn without making her start over?' },
  { t: 'decide', ch: C(8), eye: 'Chapter 8 check · 1 of 4', q: 'When does TSS begin?', opts: ['During initial outreach.', 'When Evelyn is placed on a housing waitlist.', 'At permanent lease signature through a warm handoff.', 'After the member experiences a tenancy problem.'], a: 2, fb: 'Lease signature through the warm handoff.', scored: true },
  { t: 'decide', ch: C(8), eye: 'Chapter 8 check · 2 of 4', q: 'What should the handoff include?', opts: ['Lease only.', 'HSP, Housing Passport, lease information, utilities, contacts, risks, and pending items as appropriate.', 'A phone number.', 'Nothing because TSS should complete its own assessment from scratch.'], a: 1, fb: 'Carry the full picture so the member does not rebuild the story.', scored: true },
  { t: 'decide', ch: C(8), eye: 'Chapter 8 check · 3 of 4', q: 'What is the core goal of TSS?', opts: ['Find a less expensive unit.', 'Close the case quickly.', 'Move the member to another property.', 'Help the member maintain stable housing.'], a: 3, fb: 'Keeping Home is the work.', scored: true },
  { t: 'decide', ch: C(8), eye: 'Chapter 8 check · 4 of 4', q: 'What makes a handoff warm?', opts: ['The sending staff wrote a detailed note.', 'The member, sending staff, and receiving staff share an understanding of the transition and next steps.', 'The referral is marked complete.', 'The prior case has been closed.'], a: 1, fb: 'Everyone leaves knowing what they own.', scored: true },
  { t: 'take', ch: C(8), big: 'A referral is not a handoff until someone catches it.' },

  // CASE CONFERENCE
  { t: 'story', ch: CC, eye: 'Final assessment · The Case Conference', title: 'Before you decide, listen.', blocks: [
    n('No successful housing case belongs to one person. Outreach made contact possible. Intake made the next step visible. Assessment gave the team an accurate picture. Management opened and assigned the case. Navigation carried the search. Partners addressed needs outside Navigation. And now TSS receives the next leg.'),
    n('You are going to see nine situations from across that journey. This is not a memory test.'),
    list('What protects the member?', 'What keeps the housing work moving?', 'Who owns the next action?', 'What must be documented?'),
    n('You need 80% to pass. You can review and retake.'),
  ], cta: 'Begin the Case Conference' },
  { t: 'decide', ch: CC, eye: "Case Conference · Question 1 of 9", title: "New Case", q: "A Housing Navigation case has just been assigned. What is the first priority?", opts: ["Schedule move-in.", "Review the Housing Social Worker’s assessment and CE status so you understand the case.", "Immediately submit applications.", "Close older cases first."], a: 1, fb: "Start by understanding the case before acting on it.", cc: true },
  { t: 'decide', ch: CC, eye: "Case Conference · Question 2 of 9", title: "Housing Match", q: "A Housing Match arrives with a 48-hour response window. What should happen?", opts: ["Wait until the next monthly meeting.", "Ask the member to handle it alone.", "Confirm eligibility, gather the required documentation, coordinate with the property manager and prepare the member within the response window.", "Forward it to the supervisor and move on."], a: 2, fb: "Housing opportunities move on external clocks. Urgency requires coordinated action, not panic.", cc: true },
  { t: 'decide', ch: CC, eye: "Case Conference · Question 3 of 9", title: "Missing Document", q: "Ms. Turner cannot locate her Social Security card. Best next step?", opts: ["Submit incomplete paperwork.", "Close the case.", "Help replace the document and continue moving the rest of the application.", "Wait until the next month."], a: 2, fb: "A missing document is a barrier to remove, not a reason to stop the journey.", cc: true },
  { t: 'decide', ch: CC, eye: "Case Conference · Question 4 of 9", title: "Member Stops Responding", q: "A member stops responding. What do you do?", opts: ["Close as noncompliant.", "Document every attempt, increase outreach and involve the supervisor; keep the case open.", "Stop contact attempts.", "Transfer to TSS."], a: 1, fb: "Document the facts, use the team and keep the door open.", cc: true },
  { t: 'decide', ch: CC, eye: "Case Conference · Question 5 of 9", title: "Permanent Lease Signed", q: "What is the Navigator’s final responsibility before stepping back?", opts: ["Nothing.", "Complete the documented warm handoff to TSS.", "Give Ms. Turner the TSS phone number.", "Wait 90 days."], a: 1, fb: "The baton moves at the defined transition. TSS begins the Keeping Home phase.", cc: true },
  { t: 'decide', ch: CC, eye: "Case Conference · Question 6 of 9", title: "Membership Without Housing Documents", q: "A 55+ senior wants membership but does not have photo ID or income documentation. Can membership move forward under the approved course rule?", opts: ["No.", "Only with supervisor override.", "Yes. Membership is the universal front door; housing documentation belongs later in the housing pathway.", "Yes, but no services may be used."], a: 2, fb: "Membership comes first. Housing documents belong to the housing pathway.", cc: true },
  { t: 'decide', ch: CC, eye: "Case Conference · Question 7 of 9", title: "Duplicate Record", q: "A referral arrives, but an older record appears under a different last name. What comes first?", opts: ["Create another record and merge later.", "Complete the duplicate-review process before creating another member record.", "Book the assessment first.", "Ask the member which record to use."], a: 1, fb: "One person should not become two histories.", cc: true },
  { t: 'decide', ch: CC, eye: "Case Conference · Question 8 of 9", title: "Marcus Enters Transitional Housing", q: "Marcus is approved for TH. What happens to the Navigation Care Plan?", opts: ["It transfers automatically.", "The Navigator closes their plan and the TSHC opens the hybrid TH/Housing Navigation plan.", "Both plans remain open.", "It closes only when he exits TH."], a: 1, fb: "Under the current approved workflow there is no parallel Housing Navigator during the TH stay.", cc: true },
  { t: 'decide', ch: CC, eye: "Case Conference · Question 9 of 9", title: "Late Documentation", q: "A service happened Friday. You realize Tuesday it was not documented. What should you do?", opts: ["Enter the note as though it were written Friday.", "Leave it undocumented.", "Enter it as a late entry using the actual service date and clearly indicate the late documentation.", "Ask another staff member to enter it."], a: 2, fb: "A late entry and backdating are not the same thing. Never make the record appear as though documentation occurred when it did not.", cc: true },
  { t: 'result', ch: CC, eye: 'Case Conference results' },
  { t: 'reflect', ch: CC, eye: 'Final reflection · Not scored', prompt: 'Before you complete The Road Home, think about your own role.', prompts: ['Where are you most likely to receive the baton?', 'What must be true before you pass it forward?', 'Where is the greatest risk of a dropped handoff in your current work?', 'What is one thing you can do differently so the member does not have to carry the organization?'] },
  { t: 'cards', ch: CC, eye: 'Rapid review', title: 'Twelve things to carry with you', intro: 'Tap a question to check your answer.', cards: [
    ['Who owns the housing choice?', ['The member.']],
    ['Who owns staff follow-through?', ['Staff.']],
    ['Does a voicemail count as direct contact?', ['No.']],
    ['Does an individualized Housing Clinic interaction count when documented?', ['Yes.']],
    ['What is the HSP timing standard?', ['15 / 30 / 180.']],
    ['What is the Day 90 goal?', ['A complete, verified Housing Passport.']],
    ['Does TH replace permanent housing?', ['No.']],
    ['Does a referral equal a completed handoff?', ['No.']],
    ['At 14 days with no meaningful contact?', ['Increase documented multi-channel outreach.']],
    ['At 30 days, Disengaged status requires?', ['Supervisor sign-off.']],
    ['When does TSS begin?', ['At permanent lease signature through the warm handoff.']],
    ['What is the goal after Finding Home?', ['Keeping Home.']],
  ] },
  { t: 'story', ch: 'Home', eye: 'The Road Home · Complete', title: 'Home was never one task.', blocks: [
    n('It took assessment. Planning. Documents. Searching. Waiting. Advocacy. Choice. Persistence. Coordination. And people who knew when to lead, when to support and when to pass the baton.'),
    n('Ms. Turner has reached permanent housing. Your part in the journey changes here. The standard of care does not.'),
    big('Every member. Every interaction. One standard of care.'),
  ] },
  { t: 'story', ch: 'Home', eye: 'Course close', title: 'The road is rarely straight', blocks: [
    n('Documents expire. Phones disconnect. Applications sit. Housing offers fall through. A member may say no. A new barrier may appear. A case may go quiet. A temporary option may become necessary. The work can still move.'),
    n('Good housing services do not depend on everything going perfectly. They depend on staff knowing how to respond when it does not.'),
    list('Know your role.', 'Do your part.', 'Document what happened.', 'Ask for consultation early.', 'Follow through.', 'Keep the member involved.'),
    n('And when your part of the journey ends, do not simply let go. Place the baton securely in the next person’s hand.'),
    big('Choice belongs to the member. Follow-through belongs to us.', 'One journey. More than one role. No dropped baton.'),
  ], cta: 'Complete The Road Home' },
]
