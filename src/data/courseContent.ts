export type StepId = 'S1' | 'S2' | 'S3' | 'S4' | 'S5' | 'S6' | 'S7';

export const ORDER: StepId[] = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7'];

export const ROLES: Record<string, Record<string, boolean>> = {
  SOC:  { S1:true, S3:true, S4:true },
  OLS:  { S1:true, S2:true, S3:true, S4:true },
  HSAA: { S1:true, S2:true, S5:true },
  HSW:  { S1:true, S2:true, S3:true, S4:true, S5:true, S6:true, S7:true },
  SHSM: { S1:true, S2:true, S3:true, S4:true, S5:true, S6:true, S7:true },
  HN:   { S1:true, S2:true, S3:true, S5:true, S6:true, S7:true },
  TSHC: { S1:true, S4:true, S6:true, S7:true },
  TSSC: { S1:true, S5:true, S7:true },
  DCC:  { S1:true, S2:true, S5:true, S7:true },
  CD:   { S1:true, S2:true, S3:true, S4:true, S5:true, S6:true, S7:true },
};

export const ROLE_NAMES: Record<string, string> = {
  SOC:  'Street Outreach Coordinator',
  OLS:  'Outreach & Linkage Specialist',
  HSAA: 'Housing Services Admin Assistant',
  HSW:  'Housing Social Worker',
  SHSM: 'Senior Housing Services Manager',
  HN:   'Housing Navigator',
  TSHC: 'Transitional Housing Coordinator',
  TSSC: 'Tenancy Sustaining Services Coordinator',
  DCC:  'Data and Compliance Coordinator',
  CD:   'Clinical Director',
};

export const ROLE_IDS = Object.keys(ROLES) as Array<keyof typeof ROLES>;

export const GUIDE: Record<StepId, { name: string; role: string; initials: string; color: string; line: string }> = {
  S1: { name: 'Marisol Vega', role: 'Housing Services Admin Assistant', initials: 'MV', color: '#2680B3',
    line: 'I am usually the first person a senior speaks to. What I notice in the first two minutes decides where she goes next.' },
  S2: { name: 'Carla Montez', role: 'Housing Navigator', initials: 'CM', color: '#1D6A96',
    line: 'A duplicate record has cost people I know a match. I search before I create, every single time.' },
  S3: { name: 'Tanya Wells', role: 'Street Outreach Coordinator', initials: 'TW', color: '#1E6B43',
    line: 'Most of my conversations should end a crisis, not start a wait. I ask what would actually resolve this.' },
  S4: { name: 'Elena Castro', role: 'Housing Social Worker', initials: 'EC', color: '#4A2F6E',
    line: 'I can promise her the next step, and that I will walk it with her. I cannot promise a placement.' },
  S5: { name: 'Elena Castro', role: 'Housing Social Worker', initials: 'EC', color: '#4A2F6E',
    line: 'Quiet months are normal for our members. The living situation entry is what keeps her on the queue.' },
  S6: { name: 'Renee Dawson', role: 'Transitional Housing Coordinator', initials: 'RD', color: '#8A4E08',
    line: 'Before I remove anyone from the queue I ask one question: is this placement her resolution, or a waiting room?' },
  S7: { name: 'Hector Salas', role: 'Tenancy Sustaining Services Coordinator', initials: 'HS', color: '#2C5F2E',
    line: 'I receive the baton at the lease signature. Everything Carla gathered before the call is why it lands.' },
};

export const SCENE: Record<StepId, { alt: string; plan: string; icon: string }> = {
  S1: { icon: '🚪', alt: 'Triage: the opening conversation', plan: 'Safety, health and housing status confirmed; member welcomed.' },
  S2: { icon: '📋', alt: 'HMIS Profile: one record, searched before created', plan: 'One profile, searched before created, with a current release on file.' },
  S3: { icon: '🤝', alt: 'Housing Problem Solving: resolve before assess', plan: 'Problem-solving conversation held; resolution attempted and documented.' },
  S4: { icon: '🔀', alt: 'Pre-Questions: the fork in the road', plan: 'Next step routed: crisis assessment, housing assessment, or neither.' },
  S5: { icon: '📝', alt: 'CE Enrollment: once per episode', plan: 'CE enrollment open; Current Living Situation recorded at every contact.' },
  S6: { icon: '🏠', alt: 'Crisis Assessment: shelter, queue, the removal rule', plan: 'Crisis needs assessed; queue standing protected while she waits.' },
  S7: { icon: '🗝️', alt: 'Housing Assessment: the gate, the match, the handoff', plan: 'Housing assessment complete, match readiness held, lease signed and handed to TSS.' },
};

export const MOTIF: Record<string, { p: string; a: string; alt: string }> = {
  door:   { p: 'M58 18 h44 v72 h-44 z M92 54 h7', a: 'M40 90 h80', alt: 'A door' },
  route:  { p: 'M18 82 C 52 82 48 26 82 26 S 112 82 142 82', a: 'M82 26 v-10', alt: 'A route with a marker' },
  folder: { p: 'M28 38 h40 l9 11 h55 v42 h-104 z', a: 'M46 62 h40', alt: 'A case folder' },
  keys:   { p: 'M36 58 h58 M56 58 v11 M72 58 v11', a: 'M104 58 m-11 0 a11 11 0 1 0 22 0 a11 11 0 1 0 -22 0', alt: 'A set of keys' },
  chair:  { p: 'M52 26 v44 M52 70 h44 M96 26 v44 M58 70 v16 M90 70 v16', a: 'M40 90 h80', alt: 'A chair by a window' },
  clock:  { p: 'M80 52 m-27 0 a27 27 0 1 0 54 0 a27 27 0 1 0 -54 0', a: 'M80 32 v20 h15', alt: 'A clock marking a deadline' },
  table:  { p: 'M30 54 h100 M48 54 v28 M112 54 v28', a: 'M62 40 h36', alt: 'A kitchen table' },
  bag:    { p: 'M48 44 h64 v44 h-64 z M68 44 a12 12 0 0 1 24 0', a: 'M48 62 h64', alt: 'A packed bag' },
  list:   { p: 'M38 34 h84 M38 54 h84 M38 74 h52', a: 'M126 74 h-8', alt: 'A queue list' },
  stack:  { p: 'M40 34 h80 v52 h-80 z M40 52 h80 M40 69 h80', a: 'M56 43 h20', alt: 'A stack of member records' },
};

export const ROLE_PART: Record<StepId, Record<string, string>> = {
  S1: {
    SOC: 'You are usually the first contact, often outdoors. Triage is your opening conversation, and what you notice in it decides everything downstream.',
    OLS: 'You meet people at the door and in the community. You run triage and decide whether this is a 911 call, a safety referral, or a housing conversation.',
    HSAA: 'You are the front desk, so you are often the first person a senior speaks to. You confirm safety and housing status and hand off warmly.',
    TSSC: 'You rarely run triage, but you need to recognize it, because a housed member in crisis re-enters the system through this step.',
    DCC: 'You do not run triage, but every field you reconcile starts here. Knowing what triage captures tells you what the record should contain.',
    '': 'Every seat needs this step. Triage is where the county workflow starts, whoever is standing there.',
  },
  S2: {
    HSAA: 'You search and create profiles. Searching before creating is the single habit that prevents duplicate records.',
    DCC: 'This step is your core work: moving assessments from HMIS and reconciling for data quality control.',
    OLS: 'You capture in the field; clinical review and Clarity entry follow. Your notes are step one of three.',
    '': 'The profile is the container for everything that follows. Search first, always.',
  },
  S3: {
    SOC: 'Problem solving is your main tool. Most of your conversations should attempt a resolution before any assessment.',
    OLS: 'You offer problem solving to every person newly accessing services, and document the attempt either way.',
    HN: 'You need this because a member may return to problem solving after an assessment, and because flexible fund rules are yours to apply correctly.',
    '': 'Housing Problem Solving is offered to everyone. Many crises end here and never need an assessment at all.',
  },
  S4: {
    SOC: 'You route the next step. The pre-questions decide crisis assessment, housing assessment, or neither.',
    TSHC: 'You need the routing rules because transitional housing sits behind the crisis road.',
    '': 'The pre-questions are the fork in the road. They decide which assessment, if any, comes next.',
  },
  S5: {
    HSAA: 'You often record the enrollment and the living situation. Doing it at every contact is what keeps a member on the queue.',
    DCC: 'Auto-exits are a data problem before they are a housing problem. This step is where you prevent them.',
    TSSC: 'After the lease, the record still has to stay current. This step explains why.',
    '': 'Enrollment opens the door. Current Living Situation is what keeps it open.',
  },
  S6: {
    TSHC: 'The crisis queue and the transitional housing pathway are your daily work, including the removal rule.',
    HN: 'You need the crisis rules because an interim placement can quietly cost a member their queue standing.',
    '': 'Crisis assessment opens shelter, safe parking and transitional housing, and the queue rules decide who stays on.',
  },
  S7: {
    HN: 'Match readiness is your seat\'s responsibility, and most match loss is preventable here.',
    TSSC: 'You receive the baton at the lease signature. This step ends where your work begins.',
    DCC: 'You move the housing assessment from HMIS and reconcile it. Stale assessments are a match risk.',
    '': 'The assessment, the gate the county sets, the match we protect but do not make, and the handoff.',
  },
};

export type Beat = {
  motif: string;
  h: string;
  body: string;
  q: string;
  opts: string[];
  fb: string[];
  a: number;
  diffG: string;
  diffS: string;
  src: string;
  mock?: boolean;
};

export type Quiz = {
  q: string;
  opts: string[];
  a: number;
  w: string;
};

export type Senior = {
  title: string;
  body: string;
  risk: string;
  points: { head: string; body: string }[];
};

export type CourseStep = {
  title: string;
  mins: number;
  openTitle: string;
  openBody: string;
  done: string;
  senior: Senior;
  pages: Beat[];
  quiz: Quiz[];
};

export const CONTENT: Record<StepId, CourseStep> = {
  S1: {
    title: 'CE Step 1 · Triage', mins: 7,
    openTitle: 'Safety, health, housing status, in that order',
    openBody: 'Triage is the county\'s first CE step and the opening of every service engagement. You introduce yourself, ask a small number of direct questions, and decide the next action: emergency care, a safety referral, or a housing conversation. It takes minutes, and it sets everything that follows.',
    done: 'You can open a triage conversation, screen without assuming, and decide the right next action.',
    senior: {
      title: 'Triage is where ageism does its damage',
      body: 'The three triage questions are the same for a 25-year-old and a 75-year-old. What changes is how easily an older adult\'s answers get misread, in both directions: real risk missed as normal ageing, or independence overwritten by an assumption of decline.',
      risk: 'Route a senior on age rather than evidence and you can send an independent 67-year-old toward a care setting she never needed, or miss the fall risk in a member who says she is fine.',
      points: [
        { head: 'They rarely say the word homeless', body: 'Ask where someone slept last night rather than whether they are homeless. Many older adults are invisibly housed, staying with a relative with no legal right to remain.' },
        { head: 'Screen for the senior-specific flags', body: 'Falls, memory changes, missed medications, elder abuse and financial exploitation are alerts to check for, never a default picture of aging.' },
        { head: 'Most older adults are independent', body: 'A housing crisis at 67 is usually about rent and fixed income, not decline. Screen for what is present and route on what you find.' },
      ],
    },
    pages: [
      { motif: 'door', h: 'No wrong door', body: 'Ms. Evelyn Turner came to the Community Cafe for lunch, not to an office marked Coordinated Entry. She mentions that her rent went up again and she is not sure she can stay.',
        q: 'She is asking for help finding permanent housing, and Housing Navigation sounds right. What has to happen first?',
        opts: ['Enroll her in Housing Navigation now, while a Navigator has capacity', 'Complete Coordinated Entry first: it is the required front door to Navigation', 'Wait for a medical or agency referral before opening anything'],
        fb: ['Navigation cannot open ahead of Coordinated Entry, whatever the capacity looks like this week.', 'Correct. Coordinated Entry is the front door, and no Housing Navigation begins without it.', 'No referral is needed. Any door at the Center can start the journey today.'], a: 1,
        diffG: 'Sending a walk-in to whichever program has an opening, and starting intake there instead of at Coordinated Entry.', diffS: 'Any staff member can start the journey, and Coordinated Entry is completed first. No Navigation begins without CE.',
        src: 'CE 2.0 Course 1, Overview; CE 2.0 workflow step 1' },
      { motif: 'bag', h: 'The three triage questions', body: 'You sit down with her properly and work through the opening questions the county workflow asks for.',
        q: 'What are the three things triage confirms before anything else?',
        opts: ['Income, household size, and length of homelessness', 'Urgent health needs, safety needs, and literal homelessness', 'Age, disability status, and benefit eligibility'],
        fb: ['Those belong to the assessment, much later in the workflow.', 'Correct. Urgent health goes to 911, safety needs go to a violence prevention resource, and literal homelessness moves to the profile step.', 'Eligibility is not a triage question. Triage is about safety and status.'], a: 1,
        diffG: 'Opening with demographics and eligibility questions before asking what is happening for her.', diffS: 'Safety and health come first, every time, and the housing conversation only opens once those are settled.',
        src: 'CE 2.0 Course 2A, System Access: triage steps' },
    ],
    quiz: [
      { q: 'An older adult tells you she is staying with her cousin for a while and is fine. What does the triage step call for?',
        opts: ['Record her as housed and close the contact', 'Ask where she slept last night and screen for safety and health', 'Refer her straight to a housing assessment'], a: 1,
        w: 'Doubled-up and invisibly housed situations are exactly what triage is meant to surface. The sleep question captures her real status without asking her to accept a label.' },
      { q: 'During triage a member describes chest pain and shortness of breath. What is the next action?',
        opts: ['Finish the housing questions, then suggest she see a doctor', 'Refer to 911 or emergency medical care', 'Note it on the assessment for later'], a: 1,
        w: 'Urgent health needs are the first triage question for a reason. Emergency care comes before any housing conversation.' },
    ],
  },
  S2: {
    title: 'CE Step 2 · HMIS Profile', mins: 6,
    openTitle: 'One person, one record, searched before created',
    openBody: 'Once someone is literally homeless and the housing conversation is open, the county workflow calls for a profile in HMIS Clarity. You search for an existing record, create or update it, and add contact information and a release. Everything after this hangs off that one record.',
    done: 'You can build and maintain a clean record that will not cost a member a match later.',
    senior: {
      title: 'Older adults are the easiest people to duplicate',
      body: 'Long histories, name changes, married and maiden names, records created years ago at a different agency, and gaps of months between contacts all make an older adult more likely to end up with two half-records than almost anyone else in the system.',
      risk: 'A duplicate splits her history in two. Her assessment sits on one record and her queue standing on the other, and a match can pass her by without anyone noticing.',
      points: [
        { head: 'Search wider for seniors', body: 'Try maiden names, hyphenated names and common misspellings before creating anything. A record from six years ago still counts.' },
        { head: 'Contact information is a match-readiness item', body: 'Capture a backup contact, a caregiver, or an adult child. A senior in a hospital bed cannot answer her own phone when the match call comes.' },
        { head: 'Keep the release current', body: 'An expired release stops information moving between agencies at exactly the moment a match needs it.' },
      ],
    },
    pages: [
      { motif: 'folder', h: 'Search before you create', body: 'Ms. R. returns after four months away. You cannot find her in the first search screen you try.',
        q: 'What do you do next?',
        opts: ['Create a new profile so the history starts clean', 'Keep searching for the existing record and any open enrollment before creating anything', 'Ask the county to merge whatever turns up later'],
        fb: ['A duplicate splits her history in two and can quietly cost her a match.', 'Correct. Search first, always, including for an existing problem-solving enrollment.', 'Merges happen late, if at all. The duplicate does its damage in the meantime.'], a: 1,
        diffG: 'Creating a new record when a returning member does not turn up in the first search.', diffS: 'Search before you create. Duplicate records break counts and block matches, so the search is part of the work.',
        src: 'CE 2.0 Course 2A, HMIS profile; ACHMIS client search' },
      { motif: 'folder', mock: true, h: 'The profile screen itself', body: 'This is the Clarity client profile for Ms. Evelyn Turner. Every later step writes to this one record: the enrollment, the living situations, the assessment, the referral.',
        q: 'Her profile is created and saved. Looking at this screen, what is the most urgent gap before she is match-ready?',
        opts: ['Her middle name is not filled in', 'No release of information on file, and no backup contact', 'The unique identifier should have been chosen manually'],
        fb: ['Nice to have, but it does not stop anything.', 'Correct. Without a current release, information cannot move between agencies, and with no backup contact an older adult in a hospital bed is simply unreachable when the match call comes.', 'Clarity assigns the unique identifier. It is never chosen by staff.'], a: 1,
        diffG: 'Treating the profile as finished once the identity fields are saved.', diffS: 'A profile is not finished until the release is current and a backup contact or caregiver is on file. For seniors that contact is often what saves the match.',
        src: 'ACHMIS Clarity client profile; CE 2.0 Course 2A, HMIS profile' },
      { motif: 'stack', h: 'Three steps, one record', body: 'You had the conversation in the field this morning. The entry has to reach Clarity without the field losing its warmth or the record losing its accuracy.',
        q: 'What is the documentation workflow?',
        opts: ['Field staff enter Clarity directly at the end of the visit', 'Field capture, then clinical review, then the Data and Compliance Coordinator enters Clarity', 'The supervisor writes it up from the team huddle'],
        fb: ['Direct field entry skips the clinical review the workflow depends on.', 'Correct. Three steps, in that order, every time.', 'A huddle is not the record, and the note has to come from the person who was there.'], a: 1,
        diffG: 'Entering contacts straight into Clarity from the field and skipping clinical review.', diffS: 'Three steps: field capture, clinical review, then Coordinator entry into Clarity. The Coordinator moves assessments from HMIS and reconciles for data quality control.',
        src: 'Aging with Dignity blueprint 6.5, three-step HMIS workflow' },
    ],
    quiz: [
      { q: 'You are about to create a profile for a 78-year-old who says she has never been to any agency before. What should you still do?',
        opts: ['Create the profile; her word is enough', 'Search anyway, including for former names', 'Ask her to bring documentation first'], a: 1,
        w: 'Members frequently forget or never knew about a record opened at another agency. Searching costs a minute; a duplicate costs a match.' },
      { q: 'Who enters the assessment into Clarity in our workflow?',
        opts: ['Whoever had the contact', 'The Data and Compliance Coordinator, after clinical review', 'The Housing Navigator'], a: 1,
        w: 'Field capture, then clinical review, then Coordinator entry. The Coordinator moves assessments from HMIS and reconciles them for data quality control.' },
    ],
  },
  S3: {
    title: 'CE Step 3 · Housing Problem Solving', mins: 8,
    openTitle: 'Resolve the crisis, rather than assess and wait',
    openBody: 'Housing Problem Solving is the heart of CE 2.0 and is offered to every person newly accessing the crisis response system. It is a strengths-based conversation about what would actually resolve this crisis, using the person\'s own network and resources. The county\'s aim is a 20 percent resolution rate.',
    done: 'You can hold a dignified problem-solving conversation and route eviction risk to the right door first.',
    senior: {
      title: 'An older adult\'s resolution menu looks different',
      body: 'Problem solving works from what a person already has. For a senior that is rarely a new job and a shared apartment; it is benefits that were never claimed, a family room that is available, a senior housing waitlist, or the supports that make staying put possible.',
      risk: 'Offer a 72-year-old the standard resolution menu and nothing on it fits, so the conversation collapses into a shelter referral she cannot use and a queue she may wait years on.',
      points: [
        { head: 'Income and benefits are the foundation', body: 'Social Security, SSI, Medi-Cal and IHSS are often the difference between a crisis and a stable tenancy. An unfinished benefits claim is a resolution waiting to happen.' },
        { head: 'Staying put is a resolution', body: 'In-home supports, a repair, a rent negotiation or an IHSS package can keep a senior in the home she already has, which beats any placement we could find her.' },
        { head: 'Family and senior-specific options', body: 'An adult child\'s spare room, an ADU, a board and care, or a senior housing waitlist are real options that a general menu never mentions.' },
      ],
    },
    pages: [
      { motif: 'clock', h: 'An eviction notice', body: 'Mr. D., 60, fell behind on rent after his wife died. He has an eviction notice in his bag and has told no one in his family.',
        q: 'What is the first source for eviction prevention help?',
        opts: ['St. Mary\'s Center flexible funds, straight away', 'The county Housing Resource Center, then turn internal to SMC supports', 'A rapid rehousing application'],
        fb: ['Flexible funds come last, not first, and only once the plan is clear.', 'Correct. The Housing Resource Center is the source to access eviction prevention first, and only then do we turn internal to SMC.', 'We do not do rapid rehousing. That is not our program.'], a: 1,
        diffG: 'Opening our own prevention help or a rapid rehousing application before going to the Housing Resource Center.', diffS: 'We do not do rapid rehousing. The Housing Resource Center is the first source for eviction prevention, then we turn internal to SMC supports.',
        src: 'SMC Housing Services practice; county HPS Policy rev. 5/14/2025' },
      { motif: 'table', h: 'Start with what he already has', body: 'You work the problem together. His son has a spare room, his SSI application was never finished, and his church has a small rental fund.',
        q: 'Where does the problem-solving conversation start?',
        opts: ['With a flexible fund request that covers the arrears', 'With his own network and benefits: the room, the SSI claim, the church fund', 'With a shelter reservation, in case the eviction proceeds'],
        fb: ['Money last. Many resolutions need no flexible funds at all.', 'Correct. Income and benefits are the foundation, and the resolution menu starts with what he already has.', 'Shelter is a fallback, not a resolution to build a plan on.'], a: 1,
        diffG: 'Leading with money, so the conversation becomes about eligibility instead of the member\'s own options.', diffS: 'Flexible funds are last, not first. Income, benefits, family, and senior housing options are the resolution menu.',
        src: 'HPS Policy rev. 5/14/2025; senior resolution pathways' },
      { motif: 'keys', h: 'When funds are genuinely needed', body: 'The plan is clear and it needs 400 dollars for a move-in fee to land it.',
        q: 'How is that 400 dollars paid?',
        opts: ['Cash to Mr. D., so he can handle it himself', 'Paid to the landlord or vendor, or on a trackable card. Never cash', 'Reimbursed to Mr. D. after he pays it'],
        fb: ['Never cash, and never direct to the participant.', 'Correct. Third-party payment or a trackable card only, inside the county caps.', 'Reimbursement is still a payment to the participant, and it is not allowed.'], a: 1,
        diffG: 'Handing over cash or paying the member directly to save time.', diffS: 'Never cash, never direct to the participant, even as reimbursement. Third-party or trackable payment only.',
        src: 'HPS Policy rev. 5/14/2025, flexible funds' },
    ],
    quiz: [
      { q: 'Who should be offered Housing Problem Solving?',
        opts: ['Only people who score too low for housing resources', 'Every person newly accessing crisis response services', 'Only people at imminent risk, not those already homeless'], a: 1,
        w: 'HPS is embedded at every access point and offered to everyone accessing services for the first time, and remains available to people already in the system.' },
      { q: 'A 70-year-old could stay in her current unit if her IHSS package and a grab-bar installation were in place. What is that?',
        opts: ['Not a housing outcome, so it does not count', 'A valid problem-solving resolution', 'Only relevant after a housing assessment'], a: 1,
        w: 'Staying housed is the best resolution there is. In-home supports and small repairs keep a senior in the home she already has, with no queue and no placement.' },
    ],
  },
  S4: {
    title: 'CE Step 4 · Pre-Questions', mins: 5,
    openTitle: 'The fork: which assessment, if any',
    openBody: 'If problem solving does not resolve the crisis, the pre-questions decide the road. Crisis assessment for shelter, safe parking or transitional housing. Housing assessment toward permanent housing. Sometimes neither.',
    done: 'You can route the next step with confidence, and say it kindly and honestly.',
    senior: {
      title: 'The words you use here follow her for years',
      body: 'For an older adult the routing conversation is often the moment she decides whether this system is worth trusting. A promise made lightly at the fork is repaid by a colleague eighteen months later.',
      risk: 'Tell a senior her score looks strong and she will plan her life around a placement we cannot guarantee. Tell her nothing and she disappears from the system entirely.',
      points: [
        { head: 'Route on the goal, not the sleeping arrangement', body: 'Couch-surfing is a housing crisis. If her goal is a permanent place she can manage, the housing assessment is the road, while safety and health stay on the plan.' },
        { head: 'Never promise a placement, a timeline, or a score', body: 'You can promise the next step, and that you will walk it with her. That is all any of us can honestly offer.' },
        { head: 'Say clearly what happens if the answer is no', body: 'If she is not going onto a queue, she needs to hear it plainly, along with what support does exist and when to come back.' },
      ],
    },
    pages: [
      { motif: 'route', h: 'The fork', body: 'Ms. R., 68, was discharged from the hospital with nowhere settled to return to. She has stayed a few nights each with friends from church. She wants a permanent place she can manage.',
        q: 'Where do the pre-questions point?',
        opts: ['Crisis assessment only: she has no fixed place tonight', 'Housing assessment, while safety and health stay on the plan', 'No assessment: she has places to sleep'],
        fb: ['Safety matters, but her stated goal is a permanent home, and that is the road.', 'Correct. The housing assessment is the road, and her health and safety stay live on the care plan.', 'Couch-surfing counts, and doing nothing leaves her outside the system.'], a: 1,
        diffG: 'Treating a senior with somewhere to sleep tonight as housed and putting her off.', diffS: 'Couch-surfing is a housing crisis. The pre-questions route on the goal, and we keep checking health and safety.',
        src: 'CE 2.0 workflow step 4, pre-questions' },
      { motif: 'door', h: 'Saying it well', body: 'She asks what the assessment means for her chances.',
        q: 'What can you tell her?',
        opts: ['That the assessment decides whether she qualifies for housing', 'That it is the next step, and that you will walk it with her', 'That a good score means she will be housed soon'],
        fb: ['It is not a verdict on her, and framing it that way makes the conversation heavier than it is.', 'Correct. The routing is a next step, never a verdict, and never a promise.', 'Never promise a placement, a timeline, or a score outcome.'], a: 1,
        diffG: 'Telling a member where she stands or roughly how long it will take.', diffS: 'We never promise a placement, a timeline, or a score outcome. A promise made at the front door is repaid by someone else at the back.',
        src: 'Appendix A, Course 2 critical item 9' },
    ],
    quiz: [
      { q: 'The pre-questions indicate a member is not appropriate for either queue. What does the county workflow require you to do?',
        opts: ['End the contact; there is nothing further to offer', 'Clearly communicate that she is not on a queue, what support does exist, and when to come back', 'Put her on the housing queue anyway so she is not lost'], a: 1,
        w: 'The workflow is explicit: communicate clearly that the person is not on the queue and not prioritized, and cover referrals, application support, and when to return.' },
      { q: 'A member is interested in shelter or safe parking tonight. Which road do the pre-questions send her down?',
        opts: ['Crisis assessment', 'Housing assessment', 'Both simultaneously, by default'], a: 0,
        w: 'Interest in shelter, transitional housing or safe parking routes to the crisis assessment and the crisis queue. A housing assessment may follow if she is also eligible and interested in permanent housing.' },
    ],
  },
  S5: {
    title: 'CE Step 5 · CE Enrollment and Living Situation', mins: 6,
    openTitle: 'Enrollment opens the door; the living situation keeps it open',
    openBody: 'CE enrollment places a member into the one countywide Coordinated Entry program, once per episode. From that moment the record has to stay alive, because the queues quietly drop records that go quiet. A Current Living Situation at every encounter is the habit that prevents it.',
    done: 'You know what enrollment opens, and the one habit that keeps it alive.',
    senior: {
      title: 'Long waits and quiet months are normal for seniors',
      body: 'An older adult may wait many months on a queue with few contacts in between, especially if she is doubled-up, in a facility, or simply not in crisis this week. That quiet is exactly what auto-exit logic reads as gone.',
      risk: 'She falls off every queue without a letter, a phone call, or a single person noticing, and often nobody finds out until the day a match would have arrived.',
      points: [
        { head: 'Hospital and facility stays are the danger window', body: 'A two-week rehab stay with no contact is how a senior silently exits. Record the living situation from wherever she actually is.' },
        { head: 'Record it at every encounter', body: 'Every contact, however brief, is an opportunity to update the living situation. A phone call counts.' },
        { head: 'Know the two clocks', body: 'Problem-solving enrollments auto-exit at 90 days of inactivity, Coordinated Entry at 180. They are different clocks and they are easy to confuse.' },
      ],
    },
    pages: [
      { motif: 'folder', h: 'Enrollment opens the door', body: 'Ms. Turner\'s assessment is done and you are completing her Coordinated Entry enrollment.',
        q: 'How often does that enrollment happen?',
        opts: ['Once per episode', 'Annually, at recertification', 'Each time she comes in with a new need'],
        fb: ['Correct. Once per episode. Duplicate enrollments are one of the two most common data findings.', 'Recertification is a different process from Coordinated Entry enrollment.', 'New needs are services on the same enrollment, not new enrollments.'], a: 0,
        diffG: 'Opening a new enrollment each time a member comes in with a new request.', diffS: 'Coordinated Entry enrollment happens once per episode, in the one countywide CE program.',
        src: 'Clarity CE Enrollment form; Appendix A, Course 2 critical item 8' },
      { motif: 'clock', h: 'The silent exit', body: 'She is on the Housing Queue and waiting. Contacts get further apart as the months pass.',
        q: 'What is the risk you are managing in the record?',
        opts: ['Her assessment score drifting downward over time', 'A silent auto-exit that removes her from every queue', 'The queue reordering itself around newer applicants'],
        fb: ['Scores do not drift on their own. Inactivity is the risk.', 'Correct. Without a Current Living Situation the record auto-exits, silently, and stays out until someone notices.', 'Position is not the exposure here. Falling out of the queue entirely is.'], a: 1,
        diffG: 'Assuming an enrollment stays active while months pass without a recorded living situation.', diffS: 'Current Living Situation at every encounter. Problem solving auto-exits at 90 days of inactivity, Coordinated Entry at 180.',
        src: 'Clarity Current Living Situation form; Appendix A items 2 and 8' },
    ],
    quiz: [
      { q: 'A member you enrolled six months ago has had no recorded contact. What has most likely happened?',
        opts: ['Nothing; her enrollment stays open until closed', 'She has auto-exited and is off the queues', 'Her score has been recalculated'], a: 1,
        w: 'Coordinated Entry auto-exits at 180 days of inactivity. Without a Current Living Situation at each encounter, the record removes itself from the very queue holding her place.' },
      { q: 'Ms. Turner is in a skilled nursing facility for three weeks. What do you record?',
        opts: ['Nothing until she is discharged', 'A Current Living Situation reflecting where she is staying', 'A new CE enrollment on her return'], a: 1,
        w: 'Record the living situation from wherever she actually is. Facility stays are the most common way a senior quietly falls off a queue.' },
    ],
  },
  S6: {
    title: 'CE Step 6 · Crisis Assessment and Queue', mins: 7,
    openTitle: 'Shelter, safe parking, transitional housing, and the removal rule',
    openBody: 'The crisis assessment opens the crisis resources and determines a member\'s place on the crisis queue. The county does the crisis matching. Our job is an accurate assessment, an honest conversation about likelihood in the next 90 days, and a record that stays alive while she waits.',
    done: 'You can work the crisis queue without losing anyone during the wait.',
    senior: {
      title: 'The obvious crisis answer is often the wrong one for an elder',
      body: 'Congregate shelter is the default crisis resource, and for a frail older adult it can be unusable, unsafe, or the thing that ends her willingness to engage at all. An assessment that hides that produces a placement that fails within a week.',
      risk: 'A senior refuses a placement that was never going to work, gets recorded as declining services, and quietly loses standing she spent months earning.',
      points: [
        { head: 'Record what a placement must accommodate', body: 'Mobility, medical equipment, medication schedules and care needs belong in the assessment, in her own words where you can.' },
        { head: 'Wariness is not refusal', body: 'An older adult saying she is frightened of a congregate setting is giving you fit information, not declining services. Never record it as a refusal.' },
        { head: 'Be honest about the next 90 days', body: 'The workflow asks you to communicate the real likelihood of shelter or transitional housing plainly. False hope costs more than a hard answer.' },
      ],
    },
    pages: [
      { motif: 'chair', h: 'Options weighed for an elder', body: 'Mr. T., 72, has been in an encampment for eight months. He has diabetes, limited mobility, and is wary of congregate shelter.',
        q: 'What belongs in the crisis assessment about the congregate option?',
        opts: ['Leave it out: preferences slow the placement down', 'Record the mobility and health needs and his stated concerns, plainly', 'Mark him as refusing services'],
        fb: ['An assessment that hides the fit problem produces a placement that fails.', 'Correct. The assessment carries what the placement has to accommodate, in his words where possible.', 'Wariness is not refusal, and recording it that way harms him.'], a: 1,
        diffG: 'Offering whatever crisis bed is open and leaving a senior\'s mobility and health needs out of the assessment.', diffS: 'Crisis options are weighed for frail elders, and the assessment carries what a placement has to accommodate.',
        src: 'CE 2.0 workflow step 6, crisis assessment' },
      { motif: 'list', h: 'The removal rule', body: 'Marcus moves into shelter while he waits for a St. Mary\'s Center transitional housing unit to open.',
        q: 'What happens to his place on the crisis queue?',
        opts: ['He comes off it: he is sheltered now', 'He stays on it: the shelter is a holding spot, not his resolution', 'His record is paused until a unit opens'],
        fb: ['Removal applies when the placement is the resolution. This one is a waiting room.', 'Correct. An interim placement while he still waits for transitional housing means he stays on the queue, with the record kept current.', 'There is no pause. An unattended record exits itself.'], a: 1,
        diffG: 'Removing a member from the crisis queue as soon as she has a bed, even when it is only a holding spot.', diffS: 'Ask whether the placement is the resolution or a holding spot. If he is still waiting for transitional housing he stays on the queue.',
        src: 'Crisis-queue removal rule, blueprint 6.5' },
      { motif: 'door', h: 'Our own transitional housing', body: 'A member asks whether a higher assessment score would get her into St. Mary\'s Center transitional housing sooner.',
        q: 'What is the accurate answer?',
        opts: ['Yes: a higher score moves her up the transitional housing list', 'No: our transitional housing is engagement gated, not score gated', 'Only the Clinical Director can influence the order'],
        fb: ['A score does not open that door, and telling a senior otherwise is a promise we cannot keep.', 'Correct. The pathway is CE enrollment, then 90 days of engagement, then a fit review, then a unit.', 'Nobody moves a member up by decision. The pathway is the pathway.'], a: 1,
        diffG: 'Telling a member a higher score will get her into our transitional housing sooner.', diffS: 'St. Mary\'s Center transitional housing is engagement gated, not score gated. Three sites, 24 units, and the wait is real.',
        src: 'Appendix A, Course 2 critical item 6; blueprint 6.6' },
    ],
    quiz: [
      { q: 'A frail 80-year-old is offered a congregate shelter bed and says she is frightened to take it. How is that recorded?',
        opts: ['As a refusal of services', 'As fit information in the assessment, describing what a placement must accommodate', 'Not recorded; it is a personal preference'], a: 1,
        w: 'Wariness is fit information, not refusal. Recording it as a refusal can cost her standing, and hiding it produces a placement that fails.' },
      { q: 'A member is placed in safe parking while still waiting for transitional housing. Her crisis queue standing is:',
        opts: ['Removed, because she is placed', 'Retained, because the placement is a holding spot', 'Suspended until a unit opens'], a: 1,
        w: 'Ask whether the placement resolves the crisis or is a waiting room. Still waiting for TH means she stays on the queue, with the record kept current.' },
    ],
  },
  S7: {
    title: 'CE Step 7 · Housing Assessment, Queue and Match', mins: 8,
    openTitle: 'The gate, the doors around it, and the handoff at the end',
    openBody: 'The housing assessment produces a score, and a county-determined flag decides whether the Housing Queue opens. Matching happens on the county side. What is ours is the accuracy of the assessment, the readiness that makes a match land, and the warm handoff at the lease signature.',
    done: 'You walked the full county workflow, from triage to a signed lease and the handoff to Tenancy Sustaining Services.',
    senior: {
      title: 'Most lost matches for seniors are preventable by us',
      body: 'The match call comes once, and it does not wait. For an older adult the reasons it fails are almost always logistical rather than clinical: she was in hospital, the phone number was old, the documents were never gathered, the assessment had aged out.',
      risk: 'She reaches the top of a queue she waited two years for and loses the unit because nobody could reach her for four days.',
      points: [
        { head: 'Document readiness outranks queue date', body: 'Identity, income, homeless verification and disability verification, gathered in advance and filed. A member at the top with no documents does not move.' },
        { head: 'Backup contacts are the senior-specific safeguard', body: 'A caregiver, an adult child, a power of attorney, plus hospital and facility follow-up. Unreachable is a preventable failure.' },
        { head: 'Watch the doors that bypass the score', body: 'Medically Frail Housing and Medical Respite do not use the assessment score at all, and spotting them early is often the fastest safe route.' },
      ],
    },
    pages: [
      { motif: 'list', h: 'The gate', body: 'You have completed a housing assessment. A score comes out of it, and a county-determined flag decides whether the Housing Queue opens.',
        q: 'A colleague says the threshold for your members is fixed at 80. What is the accurate answer?',
        opts: ['Correct: 80 is the permanent supportive housing bar in policy', 'The thresholds are current practice, set and adjusted by the Management Entity at least annually', 'Correct: 70 is the bar, so 80 is wrong'],
        fb: ['The number in use today is not fixed law, and quoting it as permanent will make you wrong within a year.', 'Correct. Know where the number comes from and that it can move. Confirm current practice before you quote it.', '70 is the families threshold and it is not ours, but the bigger error is treating any number as permanent.'], a: 1,
        diffG: 'Quoting threshold numbers to members as if they were fixed rules.', diffS: 'Thresholds are current practice confirmed in training, not fixed law. The Management Entity sets and adjusts them at least annually.',
        src: 'Appendix A item 10; county threshold job aid rev. 11/28/2021' },
      { motif: 'door', h: 'Doors that do not use the score', body: 'Ms. R. is recovering from surgery, too frail to recover on the street. Mr. T. has significant functional limitation and heavy emergency-department use.',
        q: 'Where does each one belong?',
        opts: ['Both onto the Housing Queue, waiting on the score', 'Ms. R. to Medical Respite by her medical provider, and Mr. T. referred to Medically Frail Housing', 'Both referred to Medically Frail Housing'],
        fb: ['Both of these needs sit outside the housing-assessment score, so the queue is the slow, wrong door.', 'Correct. Medical Respite is short-term post-acute care. Medically Frail is acuity-based and referred to Health Care for the Homeless.', 'Respite and Medically Frail are different pathways with different referrals.'], a: 1,
        diffG: 'Putting every assessed member on the Housing Queue to wait, and missing faster medical doors.', diffS: 'Two parallel doors bypass the score. Spotting them early is often the fastest route to a safe placement.',
        src: 'Medically Frail Housing program, Sept 2025; blueprint 6.7' },
      { motif: 'keys', h: 'The signature, and the baton', body: 'Ms. Turner signs her permanent lease at her own kitchen table. Carla is beside her. Hector, the Tenancy Sustaining Services Coordinator, is waiting to be introduced.',
        q: 'At what point does the baton pass from Coordinated Entry and Navigation to Tenancy Sustaining Services?',
        opts: ['When the housing offer is accepted', 'At the permanent lease signature, then the warm handoff', 'On move-in day, once the furniture is in'],
        fb: ['An accepted offer is not a tenancy. The lease is the moment that changes her status.', 'Correct. The permanent lease signature is the point the baton passes, and the handoff is made warmly, in person where possible.', 'Move-in follows the lease. Waiting until then leaves the handoff undocumented and late.'], a: 1,
        diffG: 'Closing the case at move-in and passing it on with only a referral note.', diffS: 'The permanent lease signature is the handoff point. Carla introduces Hector in person, documents the handoff, and the care plan continues without a gap.',
        src: 'The Road Home, warm handoff to TSS; case closure' },
    ],
    quiz: [
      { q: 'Two members sit near the top of the queue. One has her four core documents on file; the other has none gathered. What does that difference mean?',
        opts: ['Nothing; queue date decides who moves', 'Readiness decides who actually moves', 'The unready member is removed from the queue'], a: 1,
        w: 'Document readiness outranks queue date. A person at the top of a queue with no documents does not move.' },
      { q: 'A member asks you to get her the next available apartment. What is true?',
        opts: ['We can prioritize within our own caseload', 'We do not match; the county\'s matching hub matches from the queues and readiness is ours', 'We can request a named unit for her'], a: 1,
        w: 'We do not match. We feed the queues, keep her match-ready, and receive the referral. That is exactly what staff can promise.' },
    ],
  },
};

export const ACTS: { label: string; steps: StepId[] }[] = [
  { label: 'Act One', steps: ['S1', 'S2', 'S3'] },
  { label: 'Act Two', steps: ['S4', 'S5', 'S6'] },
  { label: 'Act Three', steps: ['S7'] },
];

export const STEP_MINS: Record<StepId, number> = {
  S1: 7, S2: 6, S3: 8, S4: 5, S5: 6, S6: 7, S7: 8,
};

export const EXAM_QUESTIONS = [
  { scenario: 'Ms. Evelyn Turner comes to the Community Cafe for lunch and mentions her rent went up. She asks about housing help.',
    q: 'She asks to be enrolled in Housing Navigation right away. What has to happen first?',
    opts: ['Enroll her in Navigation; the team has capacity today', 'Complete Coordinated Entry first: it is the required front door', 'Wait for a referral from her doctor'],
    a: 1, critical: true, category: 'CE Workflow', step: 'S1' },
  { scenario: 'During triage, a member describes chest pain and shortness of breath.',
    q: 'What is the next action?',
    opts: ['Finish the housing questions, then suggest she see a doctor', 'Refer to 911 or emergency medical care', 'Note it on the assessment for a follow-up appointment'],
    a: 1, critical: true, category: 'Triage', step: 'S1' },
  { scenario: 'Ms. R. returns after four months away. You cannot find her in the first search screen.',
    q: 'What do you do next?',
    opts: ['Create a new profile so the history starts clean', 'Keep searching, including under former names, before creating anything', 'Ask the county to merge whatever turns up later'],
    a: 1, critical: false, category: 'HMIS', step: 'S2' },
  { scenario: 'A colleague enters a Coordinated Entry assessment directly into Clarity after a field visit.',
    q: 'Which step in the workflow has been skipped?',
    opts: ['Nothing; direct entry is standard practice', 'Clinical review between field capture and Coordinator entry', 'The supervisor approval step'],
    a: 1, critical: false, category: 'HMIS', step: 'S2' },
  { scenario: 'Mr. D., 60, has an eviction notice after falling behind on rent since his wife died.',
    q: 'What is the first source for eviction prevention help?',
    opts: ['St. Mary\'s Center flexible funds', 'The county Housing Resource Center', 'A rapid rehousing application'],
    a: 1, critical: true, category: 'Problem Solving', step: 'S3' },
  { scenario: 'A plan is clear and needs $400 for a move-in fee. The member offers to handle the payment himself.',
    q: 'How is that $400 paid?',
    opts: ['Cash to the member, so he can handle it himself', 'Paid to the landlord or vendor, or on a trackable card. Never cash', 'Reimbursed to the member after he pays it'],
    a: 1, critical: true, category: 'Problem Solving', step: 'S3' },
  { scenario: 'Ms. R., 68, was discharged from the hospital with nowhere settled to return to. She has stayed with church friends and wants a permanent place she can manage.',
    q: 'Where do the pre-questions point?',
    opts: ['Crisis assessment only: she has no fixed place tonight', 'Housing assessment, while safety and health stay on the plan', 'No assessment: she has places to sleep'],
    a: 1, critical: false, category: 'Pre-Questions', step: 'S4' },
  { scenario: 'A member asks what the housing assessment means for her chances.',
    q: 'What can you honestly tell her?',
    opts: ['That the assessment decides whether she qualifies for housing', 'That it is the next step, and that you will walk it with her', 'That a good score means she will be housed soon'],
    a: 1, critical: true, category: 'Pre-Questions', step: 'S4' },
  { scenario: 'Ms. Turner\'s assessment is done and you are completing her Coordinated Entry enrollment.',
    q: 'How often does that CE enrollment happen?',
    opts: ['Once per episode', 'Annually, at recertification', 'Each time she comes in with a new need'],
    a: 0, critical: false, category: 'Enrollment', step: 'S5' },
  { scenario: 'A member has been on the Housing Queue for six months with no recorded contact.',
    q: 'What has most likely happened?',
    opts: ['Nothing; her enrollment stays open until closed', 'She has auto-exited and is off the queues', 'Her score has been recalculated'],
    a: 1, critical: true, category: 'Enrollment', step: 'S5' },
  { scenario: 'Mr. T., 72, has been in an encampment for eight months. He has diabetes, limited mobility, and is wary of congregate shelter.',
    q: 'What belongs in the crisis assessment?',
    opts: ['Leave his preferences out: they slow the placement down', 'Record his mobility and health needs and his stated concerns, plainly', 'Mark him as refusing services'],
    a: 1, critical: false, category: 'Crisis Queue', step: 'S6' },
  { scenario: 'Marcus moves into shelter while waiting for a transitional housing unit to open.',
    q: 'What happens to his crisis queue standing?',
    opts: ['He comes off it: he is sheltered now', 'He stays on it: the shelter is a holding spot, not his resolution', 'His record is paused until a unit opens'],
    a: 1, critical: true, category: 'Crisis Queue', step: 'S6' },
  { scenario: 'A member asks whether a higher assessment score would get her into St. Mary\'s Center transitional housing sooner.',
    q: 'What is the accurate answer?',
    opts: ['Yes: a higher score moves her up the list', 'No: our transitional housing is engagement gated, not score gated', 'Only the Clinical Director can influence the order'],
    a: 1, critical: true, category: 'Crisis Queue', step: 'S6' },
  { scenario: 'You have completed a housing assessment. A colleague says the threshold is fixed at 80.',
    q: 'What is accurate?',
    opts: ['Correct: 80 is the permanent supportive housing bar', 'Thresholds are current practice, adjusted by the Management Entity at least annually', 'The bar is actually 70, so your colleague is wrong'],
    a: 1, critical: false, category: 'Housing Queue', step: 'S7' },
  { scenario: 'Ms. Turner signs her permanent lease. Hector, the Tenancy Sustaining Services Coordinator, is waiting to be introduced.',
    q: 'At what point does the baton pass to Tenancy Sustaining Services?',
    opts: ['When the housing offer is accepted', 'At the permanent lease signature, with a warm handoff', 'On move-in day, once the furniture is in'],
    a: 1, critical: false, category: 'Housing Queue', step: 'S7' },
];
