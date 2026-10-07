// Source: Training Script & Answer Key, Part 4 (Role reference). DCC is not in that document; its entry is a placeholder to confirm.
export type RoleReference = { reports: string; owns: string; receives: string; hands: string; meets: string; boundary: string; feels: string }

export const ROLE_REFERENCE: Record<string, RoleReference> = {
  "CD": {
    "reports": "Dr. Grace Okoro · reports to Executive Leadership",
    "owns": "Clinical standards, program direction, budget, compliance, and quality review for the division.",
    "receives": "Executive leadership, funders, and partners.",
    "hands": "The Social Worker and the Manager, who carry the work to the team.",
    "meets": "Case reviews, team huddles, Housing Clinic, and partner tables.",
    "boundary": "You lead through the team. You support staff to own their cases rather than carrying them yourself.",
    "feels": "That the whole team knows them, and that their care plan follows them wherever they go."
  },
  "HSW": {
    "reports": "Elena Castro · reports to the Clinical Director",
    "owns": "Coordinated Entry assessment, clinical triage, and the member’s care plan.",
    "receives": "Outreach & Linkage, the front desk, and Housing Clinic intake.",
    "hands": "The Housing Navigator, with the assessment, care plan, and documents ready.",
    "meets": "Housing Clinic, the office, and clinical follow-ups.",
    "boundary": "You assess and plan. The housing search belongs to the Navigator.",
    "feels": "Heard as a whole person, with a plan they helped write."
  },
  "SHSM": {
    "reports": "Sanjay Rao · reports to the Clinical Director",
    "owns": "Daily operations, supervision, caseloads, occupancy, and performance.",
    "receives": "The Clinical Director.",
    "hands": "Coordinators, navigators, and specialists.",
    "meets": "Team huddles, Housing Clinic, and case conferences.",
    "boundary": "You remove barriers for staff. Clinical decisions stay with clinical staff.",
    "feels": "That the handoffs feel seamless, like one team."
  },
  "SOC": {
    "reports": "Tanya Wells · reports to the Manager",
    "owns": "Field outreach, engagement, safety planning, and the Senior Ambassador Program.",
    "receives": "Community calls, partners, city teams, and Ambassadors.",
    "hands": "Outreach & Linkage, for documents and connection to intake.",
    "meets": "Encampments, curbside communities, and severe-weather response.",
    "boundary": "You engage and connect. Assessment belongs to the Social Worker.",
    "feels": "Seen and respected, before anyone asks them for anything."
  },
  "OLS": {
    "reports": "Curtis Boyd · reports to the Manager",
    "owns": "Linkage to benefits, documents, health care, and the handoff to intake.",
    "receives": "Street Outreach and partners.",
    "hands": "Housing Clinic intake and the Social Worker.",
    "meets": "The field, the office, and appointments.",
    "boundary": "You prepare and connect. You do not run the housing search.",
    "feels": "That someone is walking with them, not handing them a list."
  },
  "HSAA": {
    "reports": "Marisol Vega · reports to the Manager",
    "owns": "Housing Clinic scheduling, member flow, records, and front-desk coordination.",
    "receives": "Walk-ins, calls, and every other door.",
    "hands": "The right teammate for the need, with a warm introduction.",
    "meets": "The front desk and Housing Clinic.",
    "boundary": "You welcome and connect. Assessment and advice belong to clinical staff.",
    "feels": "Welcome, from the very first hello."
  },
  "HN": {
    "reports": "Carla Montez · reports to the Manager",
    "owns": "Housing preparation, search, applications, move-in, and about six months of transition support.",
    "receives": "The Housing Social Worker, with assessment and care plan.",
    "hands": "The TSS Coordinator, with a crisis response plan in place.",
    "meets": "The field, property tours, landlord meetings, and the new home.",
    "boundary": "You navigate housing. Clinical needs go back to the Social Worker.",
    "feels": "That someone will keep looking until they find the right fit."
  },
  "TSHC": {
    "reports": "Renee Dawson · reports to the Manager",
    "owns": "Transitional placements, bed assignments, and the move toward permanent housing.",
    "receives": "Housing Navigation and the Social Worker.",
    "hands": "The Navigator for permanent placement, and TSS after move-in.",
    "meets": "Our three transitional properties.",
    "boundary": "You hold the interim home. The permanent search stays with Navigation.",
    "feels": "Safe, settled, and still moving forward."
  },
  "TSSC": {
    "reports": "Hector Salas · reports to the Manager",
    "owns": "Tenancy support, landlord mediation, budgeting, eviction prevention, and crisis plans.",
    "receives": "The Housing Navigator, after the transition period.",
    "hands": "Natural supports and long-term services.",
    "meets": "The member’s home and the landlord’s office.",
    "boundary": "You sustain the tenancy. New housing searches return to Navigation.",
    "feels": "That they are home to stay."
  },
  "DCC": {
    "reports": "reports to the Manager",
    "owns": "Data quality in HMIS: profile reconciliation, enrollment checks, and compliance reporting.",
    "receives": "Records and assessments from every seat that touches HMIS.",
    "hands": "Clean, match-ready records back to the team and to county reporting.",
    "meets": "The office and data reviews, behind every member record.",
    "boundary": "You keep the record accurate. Casework and assessment stay with the care team.",
    "feels": "That they are found, counted, and never asked to start over."
  }
}
