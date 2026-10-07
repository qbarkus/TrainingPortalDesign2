// Source: Senior Housing Services Academy Level 1 – Aging With Dignity Foundation (Training Script & Answer Key).
// Mini checks and assessment are parsed verbatim from the script. Page narration is summarized from the script's facts; confirm wording.
export type Mini = { id: string; q: string; opts: string[]; a: number; ok: string; no: string }
export type AssessQ = { q: string; opts: string[]; a: number; topic: string; page: number }

export const MINIS: Record<string, Mini> = {
  "M1": {
    "id": "M1",
    "q": "Every employee completes the Aging with Dignity Foundation before beginning role-specific training.",
    "opts": [
      "True",
      "False"
    ],
    "a": 0,
    "ok": "That's right — everyone starts here, because purpose comes before position.",
    "no": "Not quite — every employee starts with this Foundation academy first."
  },
  "M2": {
    "id": "M2",
    "q": "Our mission begins with:",
    "opts": [
      "Housing",
      "Aging with Dignity",
      "Documentation"
    ],
    "a": 1,
    "ok": "That's right — housing is one part of the journey, but dignity comes first.",
    "no": "Not quite. Housing and documentation matter — but our mission begins with Aging with Dignity."
  },
  "M3": {
    "id": "M3",
    "q": "Progress is only measured when someone obtains housing.",
    "opts": [
      "True",
      "False"
    ],
    "a": 1,
    "ok": "Correct — progress can look like replacing an ID, attending Housing Clinic, or trusting someone again. Every step matters.",
    "no": "Not quite — progress comes in many forms. Every step matters, not just housing."
  },
  "M4": {
    "id": "M4",
    "q": "Why do we say Housing is Health?",
    "opts": [
      "Because housing paperwork is required by healthcare providers",
      "Because stable housing makes it possible to manage medications, recover, sleep safely, and stay connected",
      "Because housed members no longer need our services"
    ],
    "a": 1,
    "ok": "That's right — when we help someone obtain or maintain housing, we improve health, safety, and quality of life.",
    "no": "Not quite. Housing is Health because stable housing supports medication, recovery, meals, sleep, healthcare access, and connection."
  },
  "M5": {
    "id": "M5",
    "q": "Where is Ms. Turner on the Housing Spectrum today?",
    "opts": [
      "Housed",
      "Housing Insecure",
      "Unhoused",
      "Permanently Housed"
    ],
    "a": 2,
    "ok": "Correct — she lost her apartment and is sleeping in her car, which means she is unhoused.",
    "no": "Not quite. Ms. Turner lost her apartment and is sleeping in her car — she is unhoused."
  },
  "M6": {
    "id": "M6",
    "q": "Do all members receive every service?",
    "opts": [
      "Yes — every member receives every service",
      "No — services are based on each member’s goals, needs, and circumstances"
    ],
    "a": 1,
    "ok": "Exactly — the goal is the right support at the right time, not a program for its own sake.",
    "no": "Not quite — services are matched to each member’s goals, needs, and circumstances."
  },
  "M7": {
    "id": "M7",
    "q": "Why do we call Housing Clinic the heartbeat of the department?",
    "opts": [
      "Because it is the largest program in the department",
      "Because it is where welcome, trust, assessment, planning, and collaboration come together",
      "Because all documentation is stored there"
    ],
    "a": 1,
    "ok": "That's right — it's where our whole department comes together around one shared purpose.",
    "no": "Not quite. Housing Clinic is the heartbeat because welcome, trust, assessment, planning, and collaboration all come together there."
  },
  "M8": {
    "id": "M8",
    "q": "Why are role boundaries important?",
    "opts": [
      "To make work easier",
      "To provide coordinated, consistent, and safe care while ensuring every team member understands their responsibilities"
    ],
    "a": 1,
    "ok": "Correct — boundaries protect members, improve communication, reduce duplication, and strengthen teamwork.",
    "no": "Not quite — boundaries exist to provide coordinated, consistent, and safe care."
  },
  "M9": {
    "id": "M9",
    "q": "Every role contributes to the member’s journey, even if they only interact with the member for a short period of time.",
    "opts": [
      "True",
      "False"
    ],
    "a": 0,
    "ok": "Correct — no one person changed Ms. Turner’s life. A coordinated team did.",
    "no": "Not quite — every role contributes, no matter how brief the interaction."
  }
}

export const ASSESSMENT: AssessQ[] = [
  {
    "q": "A member says, \"I’m not ready to look at apartments. I just want to replace my lost ID.\" What should you do?",
    "opts": [
      "Explain that housing must come first",
      "Help with the ID — replacing an ID is real progress",
      "Close their file until they’re ready for housing",
      "Refer them to another agency"
    ],
    "a": 1,
    "topic": "Philosophy",
    "page": 4
  },
  {
    "q": "Instead of asking \"What’s wrong with you?\", we ask:",
    "opts": [
      "\"What happened to your housing?\"",
      "\"What matters to you?\"",
      "\"What documents do you have?\"",
      "\"What is your income?\""
    ],
    "a": 1,
    "topic": "Philosophy",
    "page": 4
  },
  {
    "q": "A member declines the housing option you worked hard to find. What does Aging with Dignity look like here?",
    "opts": [
      "Tell them options are limited and they should accept it",
      "Note them as non-compliant",
      "Respect their choice and keep working toward a home that fits",
      "Pause their services for 90 days"
    ],
    "a": 2,
    "topic": "Philosophy",
    "page": 4
  },
  {
    "q": "Mr. Diaz, 71, keeps missing dialysis appointments while sleeping in his van. This best illustrates:",
    "opts": [
      "A transportation problem only",
      "Why Housing is Health — without stable housing, managing health becomes harder",
      "A scheduling issue for the clinic",
      "A reason to close his case"
    ],
    "a": 1,
    "topic": "Housing is Health",
    "page": 5
  },
  {
    "q": "When we help someone obtain or maintain housing, we improve:",
    "opts": [
      "Only their address",
      "Health, safety, and quality of life",
      "Our program statistics",
      "Their credit score"
    ],
    "a": 1,
    "topic": "Housing is Health",
    "page": 5
  },
  {
    "q": "Ms. Ruiz is still in her apartment, but a rent increase means she can no longer afford it and fears eviction. She is:",
    "opts": [
      "Housed",
      "Housing Insecure",
      "Unhoused",
      "Chronically Unhoused"
    ],
    "a": 1,
    "topic": "Housing Spectrum",
    "page": 7
  },
  {
    "q": "Marcus has been living unsheltered for over a year. On the spectrum, he is:",
    "opts": [
      "Housing Insecure",
      "Inadequately Housed",
      "Unhoused",
      "Chronically Unhoused"
    ],
    "a": 3,
    "topic": "Housing Spectrum",
    "page": 7
  },
  {
    "q": "Ms. Turner lost her apartment and is sleeping in her car. She is:",
    "opts": [
      "Housing Insecure",
      "Unhoused",
      "Inadequately Housed",
      "Chronically Unhoused"
    ],
    "a": 1,
    "topic": "Housing Spectrum",
    "page": 7
  },
  {
    "q": "True or False: A member only counts as making progress when they move to \"Permanently Housed.\"",
    "opts": [
      "True",
      "False"
    ],
    "a": 1,
    "topic": "Housing Spectrum",
    "page": 7
  },
  {
    "q": "Do all members receive every service the department offers?",
    "opts": [
      "Yes — every member receives every service",
      "No — services are based on each member’s goals, needs, and circumstances"
    ],
    "a": 1,
    "topic": "Our Department",
    "page": 8
  },
  {
    "q": "A member is housed but struggling with budgeting and a tense landlord relationship. The right connection is:",
    "opts": [
      "Street Outreach",
      "Housing Navigation",
      "Tenancy Sustaining Services",
      "Housing Clinic"
    ],
    "a": 2,
    "topic": "Our Department",
    "page": 8
  },
  {
    "q": "A senior living in an encampment has never engaged with any services. Who is designed to meet him where he is?",
    "opts": [
      "Street Outreach",
      "Housing Clinic",
      "Coordinated Entry",
      "Housing Navigation"
    ],
    "a": 0,
    "topic": "Our Department",
    "page": 8
  },
  {
    "q": "Housing Clinic is called the heartbeat of the department because:",
    "opts": [
      "It has the most staff",
      "It is where welcome, trust, assessment, planning, and collaboration come together",
      "It is open the longest hours",
      "It is where files are stored"
    ],
    "a": 1,
    "topic": "Housing Clinic",
    "page": 8
  },
  {
    "q": "A nervous first-time visitor arrives at Housing Clinic. What begins there?",
    "opts": [
      "A waiting list",
      "Welcome, trust, and the first steps of an action plan",
      "A housing lottery",
      "A compliance review"
    ],
    "a": 1,
    "topic": "Housing Clinic",
    "page": 8
  },
  {
    "q": "Ms. Turner has moved into her new apartment. Which support typically comes next?",
    "opts": [
      "Street Outreach",
      "Coordinated Entry",
      "Tenancy Sustaining Services",
      "Intake"
    ],
    "a": 2,
    "topic": "Member Journey",
    "page": 6
  },
  {
    "q": "\"No one starts over\" means:",
    "opts": [
      "Members must repeat their story to each new staff member",
      "Each role builds on the work and documentation of the role before it",
      "Only one person works with each member",
      "Assessments are optional"
    ],
    "a": 1,
    "topic": "Member Journey",
    "page": 6
  },
  {
    "q": "A member shares information that their Housing Navigator needs. You should:",
    "opts": [
      "Keep it to yourself — it was shared with you",
      "Document it and make a warm handoff to the Navigator",
      "Tell the member to repeat it later",
      "Post it in the break room"
    ],
    "a": 1,
    "topic": "Teamwork",
    "page": 9
  },
  {
    "q": "You’re a Housing Navigator and a member begins sharing a serious mental health crisis. The best response is:",
    "opts": [
      "Provide counseling yourself — helping means doing",
      "Change the subject",
      "Stay present, then connect them with the Housing Social Worker whose role fits this need",
      "End the meeting"
    ],
    "a": 2,
    "topic": "Boundaries",
    "page": 9
  },
  {
    "q": "Role boundaries exist primarily to:",
    "opts": [
      "Make work easier",
      "Provide coordinated, consistent, and safe care with clear responsibilities",
      "Limit how much staff talk to members",
      "Reduce paperwork"
    ],
    "a": 1,
    "topic": "Boundaries",
    "page": 9
  },
  {
    "q": "At the end of Ms. Turner’s journey, who changed her life?",
    "opts": [
      "Her Housing Navigator alone",
      "Her Social Worker alone",
      "A coordinated team — every role moved her forward",
      "The housing market"
    ],
    "a": 2,
    "topic": "Teamwork",
    "page": 9
  }
]

export const PASS_PCT = 80
