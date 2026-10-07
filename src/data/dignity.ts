export type Check = { kicker: string; q: string; setup?: string; opts: string[]; a: number; label: string; why: string }
export type Screen =
  | { kind: 'text'; eyebrow: string; title: string; paras: string[]; list?: string[]; lines?: string[]; image?: 'arrival' | 'team' | 'turner' }
  | { kind: 'slide'; slide: 'welcome' | 'framework' | 'ageism1' | 'ageism2' | 'ageism3' | 'practice' | 'door' | 'spectrum' | 'supports' | 'move'; alt: string; quiz?: boolean; hot?: 'next' }
  | { kind: 'check'; eyebrow: string; title: string; check: Check }
  | { kind: 'reflect'; eyebrow: string; title: string; setup: string; quote: string; ask: string; model: string }

export const SCREENS: Screen[] = [
  { kind: 'slide', slide: 'welcome', alt: "Welcome to Aging With Dignity. One Agency. One Member Journey. One Standard of Care.", hot: 'next' },
  { kind: 'text', image: 'arrival', eyebrow: 'Why we do this work', title: 'Why we do this work', paras: [
    'Welcome to St. Mary’s Center.',
    'The work we do is practical. Housing applications. Assessments. Outreach. Appointments. Documents. Referrals. Follow-up.',
    'But underneath every task is a more important question: how does the way we do this work help someone age with dignity?',
    'At St. Mary’s Center, Aging With Dignity is a practice standard. It means recognizing that every older adult comes to us with history, strengths, preferences, relationships, losses, survival strategies, and a right to remain involved in decisions about their own life.',
  ] },
  { kind: 'text', eyebrow: 'How we look', title: 'Look beyond the behavior', paras: [
    'Trauma-informed practice asks us to look beyond the behavior in front of us. Instead of asking “Why won’t this person cooperate?” we become curious: “What may be making this difficult right now?”',
    'Instead of assuming someone is unmotivated because they missed an appointment, we ask what barrier may be getting in the way. Instead of taking over because something would be faster, we ask what support would allow the member to remain in control.',
    'This does not mean avoiding boundaries, accountability, or difficult conversations. It means practicing them with clarity, respect, transparency, and consistency.',
    'Throughout this academy, keep one question in mind: what response protects dignity and still moves the work forward?',
  ] },
  { kind: 'text', eyebrow: 'Who we are', title: 'Who we are', paras: [
    'St. Mary’s Center serves people in a community shaped by deep history, resilience, displacement, inequality, culture, family, and connection.',
    'Our members may be navigating housing instability alongside health concerns, transportation barriers, lost documents, disconnected phones, shelter schedules, fixed incomes, grief, disability, family responsibilities, or years of navigating systems that have not always treated them with respect.',
    'Our job is not to make assumptions based on age, housing status, appearance, behavior, or circumstance. Our job is to ask, assess, listen, explain, and follow through.',
    'That is how Hope, Healing, Justice, and Community become more than words. They become practice.',
  ] },
  { kind: 'slide', slide: 'framework', alt: "Our Aging With Dignity framework: Dignity, respect every person. Whole-Person Care, see the full picture. Coordination, one shared journey. Stability, support safety and housing. Access, no wrong door." },
  { kind: 'check', eyebrow: 'Mini check · Dignity in Practice', title: 'Dignity in Practice', check: { kicker: 'Mini check', q: 'Which statement best reflects Aging With Dignity?', opts: ['Staff should always make the safest decision for the member.', 'Staff should avoid difficult conversations with members who have experienced trauma.', 'Staff should combine professional expertise with respect for the member’s voice, preferences, safety, and choices.', 'Staff should allow members to determine every program requirement.'], a: 2, label: 'Strong response', why: 'Aging With Dignity is neither staff control nor hands-off service. It is partnership: expertise, transparency, choice, safety, and respect.' } },
  { kind: 'slide', slide: 'ageism1', alt: "Let\u2019s talk about ageism. Ageism is when people are judged, limited, or dismissed because of age. It can be obvious or subtle. Ageism is one way dignity can be compromised." },
  { kind: 'slide', slide: 'ageism2', alt: "Which of these are examples of ageism? Select Yes or No on each card.", quiz: true },
  { kind: 'slide', slide: 'ageism3', alt: "The impact of ageism: declines in physical health, lower self-esteem and confidence, increased risk of isolation, barriers to housing access, and fewer service opportunities." },
  { kind: 'text', eyebrow: "Ageism: A Dignity Risk", title: "Ageism is one way dignity can be compromised", paras: [
    "Aging With Dignity asks us to notice when assumptions about age begin shaping access, choice, communication, housing decisions, or expectations.",
    "Ageism limits potential. Respect opens possibilities.",
  ] },
  { kind: 'slide', slide: 'practice', alt: "Dignity in practice: explain before acting, respect choice, listen without judgment, use objective respectful language, and make handoffs internal, not the member\u2019s burden." },
  { kind: 'text', eyebrow: 'Respect', title: 'Respect', paras: [
    'Respect begins before we agree with someone.',
    'It shows up in tone. In privacy. In whether we explain why we are asking a personal question. In whether we speak directly to the member instead of speaking around them.',
    'And in whether we remember that receiving services does not remove someone’s right to be treated as an adult.',
  ] },
  { kind: 'check', eyebrow: 'Respect · Scenario', title: 'Read the Situation', check: { kicker: 'Read the Situation', setup: 'A staff member is meeting with a 71-year-old member. The member’s daughter frequently answers questions for him.', q: 'What is the strongest first response?', opts: ['Continue speaking with the daughter because she knows him best.', 'Ask the member how he would like his daughter involved in the conversation.', 'Ask the daughter to leave.', 'Assume the daughter has permission because she came with him.'], a: 1, label: 'Why it matters', why: 'Respect includes asking the member how they want others involved. Family support can be valuable without replacing the member’s voice.' } },
  { kind: 'text', eyebrow: 'Choice', title: 'Choice', paras: [
    'Choice is not the absence of requirements. Programs have rules. Housing providers have eligibility criteria. Deadlines matter. Safety matters. The difference is how we communicate those realities.',
    'Choice means we explain what is required, identify what options exist, and make the consequences clear. And when the decision belongs to the member, we respect that decision.',
  ], lines: ['Inform.', 'Offer.', 'Respect.', 'Document.'] },
  { kind: 'check', eyebrow: 'Choice · Scenario', title: 'Dignity in Practice', check: { kicker: 'Dignity in Practice', setup: 'Ms. Turner declines a unit staff believes would be a good option.', q: 'What should staff say next?', opts: ['“You may not get another opportunity like this.”', '“Can you tell me what is not working for you about this unit?”', '“We really think this is the right choice.”', '“I’ll document that you refused housing.”'], a: 1, label: 'Strong response', why: 'Before interpreting the decision, understand it. Location, accessibility, safety, transportation, neighborhood history, or past experiences may matter.' } },
  { kind: 'text', eyebrow: 'Safety', title: 'Safety', paras: [
    'Safety includes physical safety. It also includes emotional and psychological safety.',
    'Staff create safety when we explain before we act, protect privacy, avoid unnecessary surprises, and maintain predictable boundaries.',
    'Sometimes safety requires saying no. Sometimes it requires slowing the interaction down. Sometimes it requires immediate escalation. Trauma-informed care does not mean ignoring behavior that puts people at risk.',
  ] },
  { kind: 'check', eyebrow: 'Safety · Scenario', title: 'Trauma-Informed Judgment', check: { kicker: 'Trauma-Informed Judgment', setup: 'A frustrated member begins yelling at the front desk after learning that a required document is missing.', q: 'What is the best first response?', opts: ['“You need to calm down.”', 'Match their tone so expectations are clear.', 'Lower the temperature, acknowledge the frustration, explain the issue clearly, and move the conversation to a more private setting if appropriate.', 'Immediately end the interaction.'], a: 2, label: 'Why it matters', why: 'De-escalation protects dignity and safety. Clear boundaries can follow without adding unnecessary confrontation.' } },
  { kind: 'text', eyebrow: 'Independence', title: 'Independence', paras: [
    'Aging does not equal incapacity. Support should strengthen a person’s ability to act, choose, understand, and participate.',
    'Doing everything for someone may feel helpful. Sometimes it is necessary. But when staff routinely take over tasks a member can do with support, we can unintentionally reduce independence.',
  ] },
  { kind: 'check', eyebrow: 'Independence · Scenario', title: 'What Would You Do Next?', check: { kicker: 'What Would You Do Next?', setup: 'A 74-year-old member wants to complete her own online housing applications but is unsure how to use the portal.', q: 'Best response?', opts: ['Complete the applications for her.', 'Ask whether a younger relative can help.', 'Walk through the portal with her and provide assistance while allowing her to remain in control.', 'Give her the website address and ask her to return when finished.'], a: 2, label: 'Why it matters', why: 'Support independence without withdrawing support.' } },
  { kind: 'text', eyebrow: 'Community', title: 'Community', paras: [
    'A home matters. So does belonging.',
    'Connection. A safe neighborhood. Someone who notices when you are missing. A place to eat with other people. A familiar bus route. A church, barber shop, community center, corner store, friend, or neighbor.',
    'Housing stability is important, but dignity is larger than an address.',
  ] },
  { kind: 'reflect', eyebrow: 'Community · Reflection', title: 'Reflection', setup: 'A member signs a lease but tells you:', quote: '“I’m glad I have a place, but I don’t know anybody over there.”', ask: 'What might a dignity-centered response consider besides the move-in itself?', model: 'Community connection, transportation, familiar supports, social isolation, nearby services, safety, and how the member wants to stay connected to people and places that matter to them.' },
  { kind: 'text', eyebrow: 'Hope', title: 'Hope', paras: [
    'Hope is not false reassurance. Hope is not promising something we cannot control. Hope is helping someone see a next step when the whole process feels impossible.',
    'Sometimes hope looks like a housing offer. Sometimes it looks like finally replacing an ID. Sometimes it looks like a member returning after three months out of contact.',
    'Sometimes it is simply this: “Here is what happens next, and here is who is responsible.”',
  ] },
  { kind: 'check', eyebrow: 'Hope · Scenario', title: 'Trust Builder or Trust Breaker?', check: { kicker: 'Trust Builder or Trust Breaker?', setup: 'A member asks: “You can get me housed next month, right?”', q: 'Best response?', opts: ['“Yes, we should be able to.”', '“Just stay positive.”', '“I can’t promise a date, but I can explain what we can do, what depends on other systems, and what your next steps are.”', '“There are no guarantees.”'], a: 2, label: 'Why it matters', why: 'Trust grows through honesty and follow-through, not promises we cannot control.' } },
  { kind: 'text', eyebrow: 'Screen, don’t assume', title: 'Screen, Don’t Assume', paras: [
    'This is one of the most important habits in our work.',
  ], list: ['A missed appointment does not automatically mean lack of motivation.', 'A quiet member does not automatically lack understanding.', 'Anger does not automatically mean aggression.', 'Age does not automatically mean incapacity.', 'Homelessness does not tell us what happened before it.'] },
  { kind: 'check', eyebrow: 'Screen, don’t assume · Scenario', title: 'Screen or Assume?', check: { kicker: 'Screen or Assume?', setup: 'Mr. Jackson has missed two appointments. Staff later learn his phone was disconnected, he has been leaving shelter by 6:00 a.m., and he has not consistently had bus fare.', q: 'Which interpretation is strongest?', opts: ['Mr. Jackson is not ready for housing services.', 'He is not prioritizing housing.', 'There are barriers affecting his ability to engage consistently.', 'His case should be closed.'], a: 2, label: 'Feedback', why: 'Missed appointments are information. They are not, by themselves, a diagnosis of motivation.' } },
  { kind: 'slide', slide: 'door', alt: "No wrong door. Every door is the right door. Membership, then referral and triage, then program match, then enrollment and support. The member should not have to figure out our system alone." },
  { kind: 'text', eyebrow: 'Housing is health', title: 'Housing is health', paras: [
    'Stable housing can affect whether someone can store medication, sleep, eat regularly, recover from illness, maintain hygiene, keep appointments, manage chronic conditions, and remain connected to support.',
    'That is why housing work is not simply about finding a unit. It is about creating the conditions for stability.',
    'But we also remember: housing is an outcome, not the whole person.',
  ] },
  { kind: 'slide', slide: 'spectrum', alt: "The Aging With Dignity Housing Spectrum: Housed, Inadequately Housed, Housing Insecure, Unhoused, Chronically Unhoused. Housing is not a straight line. People move forward, backward, or remain in place. Every stage is ours." },
  { kind: 'check', eyebrow: 'Mini check', title: 'Is the journey over?', check: { kicker: 'Mini check', q: 'A member is permanently housed. Does that automatically mean their housing journey is complete?', opts: ['Yes', 'No'], a: 1, label: 'Why', why: 'Move-in begins a new phase. Stabilization, tenancy support, health, community connection, and retention still matter.' } },
  { kind: 'slide', slide: 'supports', alt: "Whole-person supports across the spectrum: mental health, meals and nutrition, community and connection, benefits assistance, friendly visiting, wellness services, leadership and advocacy. Support follows the person, not just a housing category." },
  { kind: 'slide', slide: 'move', alt: "People move. We move with them. Continuity, connection, choice, and community. When health changes the road ahead, who gets to decide what home should look like?" },
  { kind: 'text', image: 'turner', eyebrow: 'Meet Ms. Turner', title: 'Meet Ms. Turner', paras: [
    'Ms. Evelyn Turner is 68. After a serious illness disrupted her income and housing, she lost her apartment. She is now sleeping in her car.',
    'She has managed far more than a housing crisis. She has made decisions, adapted, solved problems, protected herself, and continued moving forward.',
    'She is not a housing problem to solve. She is our neighbor.',
    'As you follow her journey, pay attention not only to what staff do, but how they do it.',
  ] },
  { kind: 'text', image: 'team', eyebrow: 'One team', title: 'One journey. One team.', paras: [
    'No single person carries the whole journey. The strongest service systems make responsibility visible.',
  ], list: ['Who owns this step?', 'Who needs to know?', 'What does the member understand?', 'Has the handoff actually happened?'], lines: ['A referral is not complete simply because someone clicked Send.'] },
  { kind: 'check', eyebrow: 'One team · Scenario', title: 'Keep the Handoff Warm', check: { kicker: 'Keep the Handoff Warm', setup: 'A member is transitioning from Housing Navigation to Tenancy Sustaining Services after signing a permanent lease.', q: 'Which response reflects the strongest handoff?', opts: ['Close the Housing Navigation case and email TSS.', 'Give the member the TSS phone number.', 'Explain the transition, introduce the TSS staff person, share appropriate information, confirm the first next step, and make sure the member understands who now owns follow-up.', 'Ask TSS to review the record when available.'], a: 2, label: 'Why it matters', why: 'A warm handoff protects continuity. The member should not have to carry the internal system between departments.' } },
  { kind: 'text', eyebrow: 'Before the assessment', title: 'What you have seen', paras: [
    'You have now seen Aging With Dignity through several lenses: respect, choice, safety, independence, community, hope.',
    'You have also seen the practice underneath those principles.',
  ], list: ['Ask before assuming.', 'Explain before acting.', 'Be clear about what you can promise.', 'Protect privacy.', 'Support independence.', 'Recognize barriers without removing accountability.', 'Maintain boundaries without withdrawing care.', 'When responsibility changes hands, make the handoff visible.'], lines: ['The assessment that follows is not designed to reward memorization. You will see situations that require judgment. Ask yourself: what response best protects dignity, supports safety and choice, respects role boundaries, and keeps the work moving forward?'] },
]

export type AQ = { topic: string; critical: boolean; q: string; opts: string[]; a: number; fb: string }
const q = (topic: string, critical: boolean, text: string, opts: string[], a: number, fb = ''): AQ => ({ topic, critical, q: text, opts, a, fb })
export const ASSESSMENT: AQ[] = [
  q('Dignity and privacy', true, 'Ms. Turner is discussing a sensitive housing issue at the front desk while several people are nearby. Best action?', ['Continue because she started the conversation.', 'Lower your voice and continue.', 'Offer to move the conversation to a more private setting.', 'Ask everyone nearby to move.'], 2, 'Privacy is part of safety and respect.'),
  q('Repeated storytelling', false, 'A member says: “I already told somebody all of this.” Best response?', ['“Everyone has their own forms.”', '“Let me first check what we already have so you do not have to repeat anything unnecessarily.”', '“We have to start from the beginning.”', '“It should only take a few minutes.”'], 1),
  q('Missed appointments', false, 'Three missed appointments should automatically be interpreted as:', ['Lack of motivation', 'Disengagement', 'A reason to assess what may be interfering with participation', 'Grounds for closure'], 2),
  q('Member voice', true, 'Staff believe a particular housing option is best. The member disagrees. The first step should be:', ['Explain why staff are correct.', 'Ask what concerns the member about the option.', 'Contact a family member.', 'Document noncompliance.'], 1),
  q('Trauma-informed boundaries', true, 'Trauma-informed care means:', ['Avoiding consequences.', 'Allowing difficult behavior because trauma may explain it.', 'Maintaining safety and boundaries while responding with respect, clarity, and awareness of what may be driving the behavior.', 'Letting members decide all program rules.'], 2),
  q('Independence', false, 'Which action most supports independence?', ['Completing tasks for a member whenever possible.', 'Providing enough information and assistance for the member to participate as fully as possible.', 'Referring seniors to family for complex decisions.', 'Avoiding technology-based tasks.'], 1),
  q('Honest expectations', true, 'A member asks staff to guarantee housing within 30 days. The strongest response is:', ['“We’ll make it happen.”', '“Probably.”', 'Clearly explain what staff can do, what cannot be guaranteed, and what happens next.', 'Avoid discussing timelines.'], 2),
  q('Observable documentation', false, 'Which note is stronger?', ['“Member was difficult and refused to cooperate.”', '“Member declined to complete the application today and stated she wanted additional time to review the terms. Staff reviewed next steps and agreed to follow up Friday.”'], 1),
  q('Cultural humility', false, 'Cultural humility requires staff to:', ['Learn enough about every culture to know what members prefer.', 'Stay curious, recognize the limits of their own assumptions, and ask the member.', 'Treat everyone exactly the same.', 'Avoid discussing culture.'], 1),
  q('Housing and health', false, 'Why can housing stability affect health?', ['Housing solves most medical conditions.', 'Stable housing can influence sleep, medication storage, nutrition, recovery, safety, and access to care.', 'Housed people use healthcare less.', 'Housing services are healthcare.'], 1),
  q('Role boundary', false, 'A Housing Navigator recognizes a concern that requires a different professional role. What should happen?', ['Ignore it because it is outside the Navigator role.', 'Handle the entire issue.', 'Recognize the concern, respond to immediate safety needs, and make the appropriate handoff.', 'Tell the member to find the correct department.'], 2),
  q('Member-centered goal', false, 'Staff want a member to submit housing applications. The member says replacing a lost ID is the priority. Best next step?', ['Keep the application goal.', 'Revisit the plan and align the next step with the member’s immediate barrier and housing pathway.', 'Require both.', 'Wait until the member changes priorities.'], 1),
  q('Behavior under stress', false, 'A member raises their voice after learning paperwork is incomplete. Best first approach?', ['“Calm down.”', 'Immediately end the conversation.', 'Reduce escalation, acknowledge the frustration, clarify the issue, and set boundaries as needed.', 'Ignore the behavior.'], 2),
  q('Age and capacity', true, 'Which statement is correct?', ['Older adults generally need staff to make complex decisions.', 'Age alone does not determine capacity.', 'Family should make major decisions after age 70.', 'Staff should take over when systems are complicated.'], 1),
  q('Community', false, 'Why should staff consider community when discussing housing?', ['Members should remain in the neighborhood where they currently receive services.', 'Housing decisions may affect social connection, transportation, safety, familiar supports, and belonging.', 'Community is more important than affordability.', 'It is not relevant once a unit is available.'], 1),
  q('Warm handoff', true, 'A warm handoff is complete when:', ['A referral is entered.', 'An email is sent.', 'The receiving person or team has accepted responsibility and the member understands the next step.', 'The original staff member closes their task.'], 2),
  q('Choice', false, 'Choice means:', ['Members may ignore program requirements.', 'Staff inform, offer options where possible, respect decisions, and clearly explain consequences or limits.', 'Staff should never recommend an option.', 'Members decide which eligibility criteria apply.'], 1),
  q('Trust', false, 'Which action is most likely to build trust?', ['Offering reassurance even when the outcome is uncertain.', 'Being consistent about what you say you will do and explaining when something changes.', 'Avoiding bad news.', 'Keeping conversations short.'], 1),
  q('Progress', false, 'Which represents meaningful progress?', ['Only permanent housing.', 'Only completed case-plan goals.', 'Progress may include housing outcomes, documents, engagement, safety, stability, connection, and member-defined goals.', 'Progress is determined by staff.'], 2),
  q('Final judgment', true, 'Which statement best reflects Aging With Dignity?', ['Do whatever is necessary to get the best outcome for the member.', 'Be kind and flexible whenever possible.', 'Combine professional judgment, clear boundaries, transparency, safety, choice, respect, and the member’s voice throughout the work.', 'Let members direct the entire process.'], 2),
]
