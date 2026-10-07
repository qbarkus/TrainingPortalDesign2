import type { Block, Step } from './roadHome'
import cvOpen from '../imports/image-20.png'
import cvLearn from '../imports/image-28.png'
import cvHps from '../imports/image-21.png'
import cvM1 from '../imports/image-19.png'
import cvDoc from '../imports/image-23.png'
import cvPre from '../imports/image-25.png'
import cvEnroll from '../imports/image-24.png'
import cvCrisis from '../imports/image-26.png'
import cvAssess from '../imports/image-27.png'
import cvMatch from '../imports/image-18.png'
import cvQueue from '../imports/image-29.png'

const n = (t: string): Block => ({ k: 'n', t })
const big = (t: string, sub?: string): Block => ({ k: 'big', t, sub })
const list = (...items: string[]): Block => ({ k: 'list', items })
const say = (w: 'ET' | 'EC' | 'CM', t: string): Block => ({ k: 'say', w, t })

const S = 'Coordinated Entry'
const CLOSE = 'Coordinated Entry · Close'

const story = (ch: string, eye: string, title: string, blocks: Block[], cta?: string): Step => ({ t: 'story', ch, eye, title, blocks, cta })
const cover = (ch: string, eye: string, img: string, cta = 'Begin'): Step => ({ t: 'story', ch, eye, blocks: [], img, cta })
const dq = (ch: string, eye: string, q: string, opts: string[], a: number, fb: string, setup?: Block[]): Step =>
  ({ t: 'decide', ch, eye, q, opts, a, fb, scored: true, ...(setup ? { setup } : {}) })

const H1 = '4.1 · Housing Problem Solving & Triage'
const M1 = '1 · Foundations'
const M2 = '2 · Housing Problem-Solving'
const M3 = '3 · Pre-Questions and Routing'
const M4 = '4 · CE Enrollment'
const M5 = '5 · Current Living Situation'
const M6 = '6 · Crisis Assessment'
const M7 = '7 · Housing Assessment'
const M8 = '8 · Score and Threshold'
const M9 = '9 · The Housing Queue'
const M12 = '10 · Receiving a Match'

export const CE_STEPS: Step[] = [
  cover(S, 'Coordinated Entry', cvOpen),
  story(S, 'Coordinated Entry', 'Now let’s put the training into practice.', [
    n('You already completed the long County and HMIS training series. It was detailed. It was technical. And yes, it was exhausting.'),
    n('This section is different. We are not going to reteach the entire system. We are going to show you how that training connects to the work you actually do at St. Mary’s Center.'),
    list('What happens first?', 'What belongs to your role?', 'What happens in HMIS?', 'What happens in IMPACT360?', 'What moves the member forward?'),
    n('Then we follow Ms. Evelyn Turner from housing concern to Coordinated Entry, Housing Navigation, and permanent housing.'),
  ]),
  story(S, 'Coordinated Entry', 'This is the application piece.', [
    n('You have already done the heavy lifting: terminology, assessments, workflow rules, system steps, and compliance requirements. We know it was a lot.'),
    n('So we are not putting you through it again. We take what you learned and put it into a real St. Mary’s Center workflow, one person at a time.'),
    { k: 'flow', items: ['County / HMIS Training', 'St. Mary’s Center Practice', 'Evelyn’s Journey'] },
    n('The goal is not to memorize another process. The goal is to look at Evelyn’s situation and know three things:'),
    list('Where are we?', 'What happens next?', 'Who owns the next action?'),
  ], 'Start Coordinated Entry →'),
  cover(S, 'What you will learn', cvLearn, 'Continue'),
  story(S, 'Section 4', 'How we assess the housing crisis, problem-solve early, and move the work forward.', [
    { k: 'rows', head: ['Part', 'What it covers', ''], items: [
      ['4.1', 'Housing Problem Solving & Triage', 'Start with the housing problem in front of us. Understand what happened, what is urgent, and what can be resolved now.'],
      ['4.2', 'Understanding Coordinated Entry', 'What CES does, what it does not do, and how St. Mary’s Center fits into the larger system.'],
      ['4.3', 'Ms. Evelyn Turner’s Journey', 'From housing concern through triage, problem solving, Coordinated Entry, Housing Navigation, permanent housing, and exit.'],
    ] },
  ]),
  { t: 'cards', ch: S, eye: 'Before we start', title: 'What we own. What we do not.', intro: 'Tap each card. This line shows up in every module.', cards: [
    ['We control', ['The quality of our engagement', 'Accurate assessments', 'Accurate Current Living Situation documentation', 'Timely updates and appropriate referrals', 'Follow-up and document readiness', 'Clear communication and warm handoffs']],
    ['We do not control', ['When housing becomes available', 'Every county prioritization decision', 'Which specific resource opens next', 'Whether a property accepts an applicant', 'Housing inventory']],
  ] },
  { t: 'story', ch: S, eye: 'Ms. Turner is the thread', title: 'One journey. Multiple systems.', blocks: [
    { k: 'flow', items: ['Housing Concern', 'Triage + Housing Problem Solving', 'Housing Assessment', 'Coordinated Entry', 'Program Recommendation', 'Case Opening', 'Housing Navigation'] },
    n('After that: queue, match, housing process, permanent housing, and exit.'),
    n('Her story does not restart in each module. What staff did last time shapes what happens next.'),
  ] },

  cover(H1, '4.1 · System Access & HPS', cvHps),
  story(H1, '4.1 · Triage', 'Do not start with the system. Start with the housing problem.', [
    n('Before we talk about scores, queues, or Coordinated Entry, we start with the housing problem in front of us.'),
    n('At St. Mary’s Center, triage is where Housing Problem Solving begins. Triage helps us understand:'),
    list('What happened?', 'Where is the person staying tonight?', 'Is there an immediate safety concern?', 'Is the housing loss recent, current, or imminent?', 'Is there a realistic way to prevent the loss or resolve the crisis?', 'What support, relationship, resource, or option may already exist?', 'Does the person need a deeper housing assessment and Coordinated Entry?'),
  ]),
  story(H1, '4.1 · Evelyn', 'Evelyn says: “I’ve been sleeping in my car.”', [
    say('ET', 'I’ve been sleeping in my car.'),
    n('The first response should not be: “Let’s start your CES assessment.”'),
    big('Tell me what happened with your housing.', 'Then we learn more.'),
    list('Did she lose housing because rent became unaffordable?', 'Was there an eviction?', 'Could she return somewhere safely?', 'Is there family or another support she would actually consider?', 'Is there a short-term financial or mediation option?', 'Is there an immediate health or safety issue?', 'What has already been tried?'),
  ]),
  story(H1, '4.1 · What it is', 'Housing Problem Solving is not talking someone out of services.', [
    n('It means making sure we understand whether there is a realistic, safe, person-centered solution before assuming the only next step is a deeper homeless-system process.'),
  ]),
  dq(H1, '4.1 · Triage decision', 'What should staff do?', [
    'Tell her to call family before continuing.',
    'Complete a brief Housing Problem Solving conversation, document what was explored, and move her forward to the appropriate housing assessment and Coordinated Entry pathway.',
    'Skip triage and open Housing Navigation immediately.',
    'Tell her she must solve the problem on her own before receiving services.',
  ], 1, 'Housing Problem Solving is part of triage. We explore realistic options without forcing a solution that is unsafe, unwanted, or unlikely to last. If the problem cannot be resolved at that level, we keep moving.',
    [n('Evelyn says she lost housing because her rent increased beyond what she could afford. She has been sleeping in her car for several weeks. She does not have a safe housing option she can return to.')]),
  { t: 'cards', ch: H1, eye: '4.1 · In practice', title: 'What it should explore. What it should never become.', intro: 'Tap each card.', cards: [
    ['Ask practical questions', ['“What happened with your last housing?”', '“Is there anywhere you could safely return, even temporarily?”', '“Is there anyone you would want us to help you talk with?”', '“Is money the main barrier, or is something else going on?”', '“Is there a landlord or family situation that could be mediated?”', '“What have you already tried?”', '“What would make an option workable or not workable for you?”']],
    ['Avoid', ['Pressuring the member to return somewhere unsafe', 'Assuming family equals a housing resource', 'Treating temporary shelter as a permanent solution', 'Delaying Coordinated Entry when the situation clearly requires it', 'Using problem solving as a reason to deny access to housing services', 'Making promises about resources we do not control']],
  ] },
  story(H1, '4.1 · The pathway', 'Problem solve first. Do not block the pathway.', [
    { k: 'flow', items: ['Housing Concern', 'Triage + Housing Problem Solving', 'Housing Assessment', 'Coordinated Entry', 'Program Recommendation', 'Case Opening', 'Housing Navigation'] },
    n('Triage is an active decision point, not just a pre-screen.'),
  ]),

  cover(M1, 'Module 1 · Program Overview', cvM1),
  story(M1, 'Foundations', 'Coordinated Entry is a pathway. It is not a promise of housing.', [
    n('Coordinated Entry is how the community assesses housing needs, prioritizes, refers, and matches people to available resources.'),
    n('It is not one numbered waiting list. Describing it that way creates expectations the system may not be able to meet.'),
    n('St. Mary’s Center owns the quality of our work. We do not control every decision made by the larger system.'),
  ]),
  dq(M1, 'Foundations', 'Which response is best?', [
    '“Yes. Once we enroll you, you’ll be placed in line for housing.”',
    '“Pretty much. Your position depends on your assessment score.”',
    '“Coordinated Entry is the process the community uses to assess housing needs and connect people to available housing resources. It isn’t one numbered waiting list.”',
    '“It’s mostly an HMIS requirement.”',
  ], 2, 'Coordinated Entry is a system for assessment, prioritization, referral, and matching. Calling it a traditional waiting list sets up a promise the system may not keep.',
    [say('ET', 'So Coordinated Entry is the housing list, right?')]),
  dq(M1, 'Foundations', 'Which statement best describes the staff responsibility in Coordinated Entry?', [
    'Guarantee that members receive housing.',
    'Complete accurate work, maintain current information, explain the process clearly, and follow through on the steps SMC owns.',
    'Decide which member receives the next available housing unit.',
    'Keep members enrolled until housing is guaranteed.',
  ], 1, 'SMC does not control housing inventory or every county decision. We do control the quality, accuracy, timeliness, and follow-through of our own work.'),
  dq(M1, 'Foundations', 'Which statement should guide CE practice?', [
    'The system’s rules are more important than member choice.',
    'Member choice means staff can ignore system requirements.',
    'The system has rules, and the member still has choices.',
    'Staff should make the decision most likely to result in housing.',
  ], 2, 'Strong CE practice holds both at once. Staff follow system requirements and protect the member’s right to understand options and decide.'),

  cover(M2, 'Documenting HPS', cvDoc),
  story(M2, 'Housing Problem-Solving', 'Ms. Turner’s landlord gave her a notice.', [
    n('She has not lost her housing yet. She may be able to stay with her daughter for a little while, but she is not sure that is workable.'),
    say('ET', 'My landlord gave me a notice. My daughter says I might be able to stay with her for a little while, but I don’t know.'),
    n('Start with what is happening now. Is there a safe, realistic option that could prevent or quickly resolve homelessness? Do not skip ahead to a later CE step.'),
  ]),
  dq(M2, 'Housing Problem-Solving', 'What should happen first?', [
    'Open a Housing Navigation case.',
    'Immediately complete the Housing Assessment.',
    'Understand the immediate housing situation and begin Housing Problem-Solving.',
    'Add Ms. Turner to the Housing Queue.',
  ], 2, 'Start by understanding the housing crisis and whether a safe, realistic option could prevent or quickly resolve homelessness.'),
  dq(M2, 'Housing Problem-Solving', 'What is the purpose of Housing Problem-Solving?', [
    'Convince the member to stay with family instead of entering CE.',
    'Explore safe and realistic options that may prevent or resolve the immediate housing crisis.',
    'Determine who qualifies for Housing Navigation.',
    'Replace the Housing Assessment.',
  ], 1, 'Housing Problem-Solving explores possibilities. It is never used to pressure someone into an unsafe or inappropriate arrangement.'),
  dq(M2, 'Housing Problem-Solving', 'What should staff do?', [
    'Count the sister’s home as an available housing option because it exists.',
    'Tell Ms. Turner family options must be tried before CE.',
    'Explore the situation without assuming that family availability means the option is safe or appropriate.',
    'Contact the sister without Ms. Turner’s permission.',
  ], 2, 'An available address is not automatically a viable option. Ask, listen, and respect what the member tells you about safety and feasibility.',
    [n('Ms. Turner tells staff she could technically stay with her sister, but the relationship is unsafe.')]),

  cover(M3, 'Pre-Questions', cvPre),
  story(M3, 'Pre-Questions and Routing', 'Pre-Questions are a routing point.', [
    n('They help staff decide which part of the CE process should happen next. They do not decide whether someone deserves housing.'),
    n('Before you start, say what you are doing and why. “Some of these questions are personal. I’ll explain why we ask them, and if something isn’t clear, stop me.”'),
  ]),
  dq(M3, 'Pre-Questions and Routing', 'Why are CE Pre-Questions important?', [
    'They determine whether the member deserves housing.',
    'They help route the member into the appropriate CE pathway.',
    'They replace the Crisis Assessment.',
    'They determine the final housing placement.',
  ], 1, 'Think of Pre-Questions as a routing point. They tell staff which part of the CE process comes next.'),
  dq(M3, 'Pre-Questions and Routing', 'Which statement is most accurate?', [
    'Staff should choose either crisis services or permanent housing.',
    'Her immediate crisis need and longer-term housing need can exist at the same time.',
    'Permanent housing should be addressed first.',
    'CE cannot begin until the immediate crisis ends.',
  ], 1, 'Immediate stabilization and the permanent-housing pathway can move together. Do not force a false either/or choice.',
    [n('Ms. Turner is sleeping in her car tonight and also needs a permanent housing solution.')]),

  cover(M4, 'CE Enrollment & CLS', cvEnroll),
  story(M4, 'CE Enrollment', 'Enrollment means she has entered the process.', [
    n('Ms. Turner’s enrollment and Current Living Situation get documented. That is the start of her CE record, not an approval.'),
    big('Assessment ≠ Housing', 'Enrollment is a door. Not a destination.'),
  ]),
  dq(M4, 'CE Enrollment', 'What does CE enrollment mean?', [
    'Housing has been approved.',
    'The member has entered the Coordinated Entry process.',
    'The member has qualified for Housing Navigation.',
    'The member has been assigned a permanent housing resource.',
  ], 1, 'Enrollment means the member has entered the coordinated process. It is not a housing approval or guarantee.'),
  dq(M4, 'CE Enrollment', 'What is the primary risk?', [
    'Nothing. Enrollment is the only required step.',
    'The record may not accurately represent where Ms. Turner is in the process.',
    'Ms. Turner automatically enters Housing Navigation.',
    'Her assessment score increases.',
  ], 1, 'CE is a continuing process. Documentation tells the next staff member where the member is and what still needs to happen.',
    [n('Staff complete Ms. Turner’s CE enrollment but do not complete the required follow-up documentation.')]),

  story(M5, 'Current Living Situation', 'Keep Current Living Situation current.', [
    n('If Ms. Turner moves from her car to shelter, stays temporarily with family, enters the hospital, or returns to an unsheltered setting, the record needs to reflect that.'),
    n('Accurate CLS documentation keeps the system working from the same facts. It helps prevent the member from becoming invisible because the record went stale.'),
    big('If the situation changes, update the record.'),
  ]),
  dq(M5, 'Current Living Situation', 'What should happen?', [
    'Leave the Current Living Situation unchanged until her Housing Assessment is updated.',
    'Update the Current Living Situation to reflect what is true now.',
    'Close CE because she is no longer unsheltered.',
    'Open a new CE enrollment.',
  ], 1, 'If the situation changes, the record changes with it. CE decisions should be based on current facts.',
    [n('Last week Ms. Turner was sleeping in her car. Today she tells you she entered a shelter.')]),
  dq(M5, 'Current Living Situation', 'Does the contact still matter?', [
    'No. Only housing changes need to be documented.',
    'Yes. Appropriate contact and CLS documentation help keep her CE information current.',
    'Only if she receives a housing referral.',
    'Only if the contact lasts at least 30 minutes.',
  ], 1, 'Keeping the CE record current keeps the member visible and gives a reliable history of engagement.',
    [n('You speak with Ms. Turner today. Her Current Living Situation has not changed.')]),
  dq(M5, 'Current Living Situation', 'Which documentation is best?', [
    '“Client disappeared.”',
    '“Client is noncompliant.”',
    '“Staff have not yet been able to re-establish contact. Outreach attempts documented.”',
    '“Client refuses services.”',
  ], 2, 'Document what happened, not a judgment about the person. Lack of contact does not tell us why the member has not responded.',
    [n('Staff have not been able to reach Ms. Turner.')]),

  cover(M6, 'Crisis Assessment & Queue', cvCrisis),
  story(M6, 'Crisis Assessment', 'The crisis assessment looks at tonight.', [
    n('It considers Ms. Turner’s immediate housing crisis within CE. It does not replace the longer-term housing assessment.'),
    say('EC', 'I want to make sure we’re covering tonight and what comes after. Those are two different conversations.'),
  ]),
  dq(M6, 'Crisis Assessment', 'What is the primary purpose of the Crisis Assessment?', [
    'Guarantee emergency shelter.',
    'Assess immediate crisis needs within the CE process.',
    'Determine Housing Navigation eligibility.',
    'Replace the Housing Assessment.',
  ], 1, 'The Crisis Assessment addresses immediate housing crisis needs. It does not replace the longer-term housing assessment.'),
  dq(M6, 'Crisis Assessment', 'Should staff automatically consider her housing crisis resolved?', [
    'Yes.',
    'No. Staff should determine whether the placement resolves the housing need or is temporary while another pathway continues.',
    'Yes, unless she refuses the shelter.',
    'Only the member can determine that.',
  ], 1, 'Shelter can stabilize tonight without resolving the need for permanent housing. Understand what the placement means in her journey.',
    [n('Ms. Turner receives a temporary shelter placement.')]),

  cover(M7, 'Housing Assessment & Gate', cvAssess),
  story(M7, 'Housing Assessment', 'The assessment gives us information.', [
    n('It helps the system understand Ms. Turner’s permanent-housing needs. It does not make the housing decision.'),
    say('EC', 'This assessment helps the system understand your housing needs. It doesn’t guarantee a housing placement.'),
    big('We do not change the facts to create eligibility.'),
  ]),
  dq(M7, 'Housing Assessment', 'What can staff safely tell her?', [
    '“You’re approved for housing.”',
    '“You’re now guaranteed a place on the Housing Queue.”',
    '“This assessment helps the system understand your housing needs. There are still additional eligibility and system steps.”',
    '“Your score tells us how soon you’ll be housed.”',
  ], 2, 'A completed assessment is important. But assessment, queue placement, matching, and housing are different milestones.',
    [n('Ms. Turner completes her Housing Assessment.')]),
  dq(M7, 'Housing Assessment', 'What should staff do?', [
    'Change it because housing is the goal.',
    'Ask Ms. Turner to choose the answer that creates eligibility.',
    'Document what is true, even when the answer affects eligibility.',
    'Leave the field blank.',
  ], 2, 'Eligibility follows the facts. We do not change facts to create eligibility.',
    [n('A staff member believes changing one assessment answer would help Ms. Turner meet a housing threshold.')]),

  story(M8, 'Score and Threshold', 'A score is one part of the picture.', [
    n('Ms. Turner will ask what her score means. Explain what the assessment does without turning the score into a promise.'),
    big('Assessment ≠ Queue', 'Queue ≠ Match · Match ≠ Move-In'),
  ]),
  dq(M8, 'Score and Threshold', 'What is the best response?', [
    '“Probably.”',
    '“Yes. Higher scores are housed first.”',
    '“Your assessment is one part of how the system understands your needs. It does not guarantee a housing placement or tell us exactly when housing will become available.”',
    '“We aren’t allowed to discuss your assessment.”',
  ], 2, 'Explain what the assessment does without turning the score into a promise.',
    [say('ET', 'My score is high. Does that mean I’m getting housing?')]),
  dq(M8, 'Score and Threshold', 'Which statement is correct?', [
    'Assessment = Housing Queue.',
    'Housing Queue = Housing Match.',
    'Housing Match = Move-In.',
    'Each is a different step in the housing process.',
  ], 3, 'Assessment is not the queue. The queue is not a match. A match is not a move-in. Each milestone has its own requirements.'),

  cover(M9, 'The Queue', cvQueue),
  story(M9, 'The Housing Queue', 'A queue is not a traditional waiting list.', [
    n('Ms. Turner is active on the appropriate queue. That does not mean staff stop engaging her.'),
    say('ET', 'So am I actually on a list now, or what?'),
    big('A queue is not the work.', 'While the member waits, the work continues.'),
  ]),
  dq(M9, 'The Housing Queue', 'What is the best response?', [
    'Give her an estimated number.',
    'Tell her the system does not work like one traditional numbered waiting list and explain what happens next.',
    'Tell her staff are not allowed to discuss CE.',
    'Tell her the number does not matter.',
  ], 1, 'Do not invent certainty the system does not provide. Explain the process in plain language.',
    [say('ET', 'What number am I on the list?')]),
  dq(M9, 'The Housing Queue', 'What should Housing Navigation staff do?', [
    'Wait until CE sends a match.',
    'Continue housing-readiness and navigation work.',
    'Close her Housing Navigation case.',
    'Stop contacting her so she does not become frustrated.',
  ], 1, 'While Ms. Turner waits, staff continue document readiness, housing search, barrier resolution, and engagement.',
    [n('Ms. Turner is now on a housing queue.')]),

  cover(M12, 'Receiving a Match', cvMatch),
  story(M12, 'Receiving a Match', 'A match is not a move-in.', [
    n('Celebrate progress without promising an outcome that has not been confirmed. Then help Ms. Turner decide whether this option works for her.'),
    say('ET', 'I want the apartment. I just don’t want to move somewhere I can’t get to my doctor.'),
    big('Choice belongs to the member.', 'Accuracy belongs to staff.'),
  ]),
  dq(M12, 'Receiving a Match', 'What should staff say?', [
    '“Yes. Congratulations.”',
    '“Probably. We just need the paperwork.”',
    '“This is an important next step, but there are still eligibility, application, property, and approval steps before the housing is final.”',
    '“We can’t tell you anything until move-in.”',
  ], 2, 'Celebrate progress without promising an outcome that has not been confirmed.',
    [say('ET', 'So the apartment is mine?')]),
  dq(M12, 'Receiving a Match', 'What should staff do?', [
    'Tell her to accept because housing opportunities are rare.',
    'Explain the option and potential consequences, explore her concerns, and allow Ms. Turner to make the decision.',
    'Decline it for her.',
    'Tell her declining means she no longer wants housing.',
  ], 1, 'Choice belongs to Ms. Turner. Staff make sure she has enough information to decide, then accurately document what she chooses.',
    [say('ET', 'I don’t think that location will work. My doctors are all in Oakland and I don’t drive.')]),
  dq(M12, 'Receiving a Match', 'Which sentence best reflects strong CE practice?', [
    '“Take whatever housing you can get.”',
    '“If you say no, we can’t help you.”',
    '“Let’s look at the option, what works for you, what doesn’t, and what accepting or declining could mean.”',
    '“The system already made the decision.”',
  ], 2, 'Explain. Explore. Preserve choice. Document the decision. We do not use policy language to pressure someone into accepting an option.'),

  { t: 'reflect', ch: CLOSE, eye: 'Reflect · Not scored', prompt: 'Ms. Turner finishes the process and says: “A lot of people helped me. But I never felt like I had to start all over every time I talked to somebody.” What made that possible?', themes: ['Staff shared responsibility without losing continuity', 'Each person understood their role', 'Documentation carried the story forward', 'Handoffs were completed', 'The member understood what was happening', 'Ms. Turner stayed the decision-maker'], note: 'One journey. More than one role. No dropped baton.' },
  story(CLOSE, 'Coordinated Entry · Close', 'Coordinated Entry is a system. People experience it through us.', [
    list('Know your role.', 'Document what is true.', 'Explain what happens next.', 'Do not promise what you do not control.', 'Keep the member visible.', 'Pass the baton clearly.'),
    big('One journey. More than one role. No dropped baton.'),
  ], 'Finish'),
]
