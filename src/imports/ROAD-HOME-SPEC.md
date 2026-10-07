# The Road Home: Figma framework

The Road Home is the finished Part One training. This document captures its design system and
structure so it can be rebuilt or extended in Figma without touching the live file. Tokens below
are read directly from the production file. Images are in `assets/road-home/` (23 exported, numbered
in the order they appear).

The Aging with Dignity framework (section 6) is the lens for the whole training. Use the same
wording everywhere: **the Aging with Dignity way**.

---

## 1. Visual system (as built)

**Font:** Jost, 300 to 700. Headings 600. Body 17px, line-height 1.6. Em-based scale.

**Colors, by frequency of use in the file**

| Role | Hex | Where |
|---|---|---|
| Primary blue | `#1C5C7A` | Headings, primary buttons, decision bands |
| Accent orange | `#F4941C` | Main call to action, eyebrows, progress fill, key-moment rule |
| Success green | `#2E7D50` | Done states, correct answers, milestone reached |
| Deep blue | `#0D4F7A` | Hero and chapter bands |
| Mint | `#E8F3EF` | Care plan and "what we do" panels |
| Bright blue | `#349CD4` | Links, small accents |
| Alert red | `#C4462F` | Incorrect answers, risk flags |
| Amber text | `#B5670A` | Orange text on cream (contrast-safe) |
| Green text | `#1E6B43` | Green text on mint |
| Canvas | `#F2F7FA` | Page background sections |
| Tint | `#E7F3FB` | Badges, image wells |
| Cream | `#FBF0DA` | Decide prompt boxes |
| Blush | `#FBECE8` | Incorrect feedback background |
| Border | `#C9D6DF` | Inputs and cards |
| Mint border | `#BFE0D2` | Care plan rows |

**Radii:** 6 (small chips), 12 (buttons, inputs), 14 (rows), 16 to 18 (cards), 20 to 24 (hero panels), 50% (avatars).

**Rules:** one orange action per screen, white or canvas pages, 1px borders, soft navy shadows, no gradients in content areas, no emoji.

---

## 2. Screen map (frame names)

| Label | Screen | What it does |
|---|---|---|
| Registration | `RH / 00 Registration` | Name, role (11 options), department (6 options). Seeds the role track. |
| Cinematic Intro | `RH / 01 Intro` | Full-bleed arrival image, title, start. |
| Case Assignment | `RH / 02 Case Assignment` | Ms. Evelyn Turner's case lands on the learner's desk. |
| PRO-00 | `RH / 03 Prologue` | Before Your Journey Begins. |
| CH-01 | `RH / Ch 1 Housing Support Plan` | Carla and Ms. Turner build the plan. |
| CH-02 | `RH / Ch 2 Document Readiness` | Sorting documents into the housing folder. |
| CH-03 | `RH / Ch 3 Housing Navigation` | Search, match, offer. |
| CH-04 | `RH / Ch 4 Cross-Department Collaboration` | Case conference with the team. |
| CH-05 | `RH / Ch 5 Transitional Housing Decision` | Marcus and the 90-day gate. |
| CH-06 | `RH / Ch 6 When a Case Goes Quiet` | CLS and keeping the record alive. |
| CH-07 | `RH / Ch 7 Signing and Handoff` | Lease signature at the kitchen table. |
| CH-08 | `RH / Ch 8 Warm Handoff to TSS` | Hector receives the baton. |
| FINAL | `RH / 09 Final` | Summary and milestones complete. |
| CERT-01 | `RH / 10 Certificate` | Landscape letter, one page, centered. |
| Role track | `RH / Role Track` | Six-scene track per role, 3 decisions, 5 quiz items. |

Each chapter follows one grammar: **scene image, story beat, Decide (3 options), feedback, milestone added.**

---

## 3. Journey milestones (progress rail)

Care Plan Assigned → Housing Support Plan → Document Ready → Housing Search → Housing Match →
Housing Offer → Move-In Day → Warm Handoff → Home

The rail sits under the masthead. Reached = green, current = orange, ahead = border only.

---

## 4. Role tracks (six milestones each)

- **Housing Navigator:** Care Plan, Housing Support Plan, Document Ready, Search, Match and Offer, Move-In, Warm Handoff
- **Housing Social Worker:** Referral In, Assessment, Coordinated Entry, Eligibility, Care Plan, Warm Handoff
- **TSS Coordinator:** Warm Handoff In, Stabilize, Home Visits, Lease Compliance, Eviction Prevention, Graduation
- **Transitional Housing & Housing Navigation Coordinator:** Referral (90-day gate), Fit Decision, Move-In, Residency, Housing Search, Move-Out / Handoff
- **Street Outreach Coordinator:** Strategy & Routes, Team Safety, Field Engagement, Partnerships, Weather Response, Warm Handoff
- **Outreach & Linkage Specialist:** Engage, Meet a Need, Create the Lead, Document Readiness, Warm Handoff, Confirm the Catch
- **Housing Services Admin Assistant:** Welcome, Search & Verify, Membership, Duplicate Check, Triage & Route, Schedule
- **Data & Compliance Coordinator:** Data Quality, HMIS Standards, Duplicate Search, Reporting, Compliance, Audit Readiness
- **Senior Housing Services Manager** and **Clinical Director:** oversight tracks (see source)

Transitional Housing stages in the file: Client Identification & Pre-Screening, Clinical Assessment & Interview Approval, House Meeting & Application, Application Review & File Setup, OHA Submission, Inspection Scheduling, Move-In (Inspection Passes), If Inspection Fails, Home Sweet Home.

---

## 5. People

**Staff:** Carla Montez (Housing Navigator, lead guide), Elena Castro, Hector Salas, Renee Dawson, Marisol Vega, Curtis Boyd, Tonya Wells, Sanjay Rao, Dr. Grace Okoro, Justin Yoon.
**Members:** Ms. Evelyn Turner (always Evelyn), Marcus Johnson, David Miller.

---

## 6. The Aging with Dignity way (overview to add)

Add this as one screen between the Prologue and Chapter 1, and reuse the eight cards as the
right-hand column heading on every comparison panel: **What we want to avoid / The Aging with Dignity way**.

Intro line: *We follow Alameda County's Coordinated Entry policy. The Aging with Dignity framework is how we apply it to adults 55 and older. Eight shifts carry through every step of this training.*

1. **Older adults, not clients in general.** Every scenario is an adult 55 or older, in the situations our members actually arrive in.
2. **Screen, don't assume.** Most older adults are independent. Frailty flags are things to check for, never a default picture. Route on what you find, not on age.
3. **Triage reads for aging.** Add falls, memory change, unmanaged conditions and missed medications. Screen for elder abuse and financial exploitation, with Adult Protective Services as a parallel path.
4. **Resolutions that fit older adults.** Adult children and in-law units, senior housing waitlists, board and care, and returning home with IHSS and in-home supports.
5. **Conversations that honor age.** Pace for hearing and vision, respect capacity and consent, name grief and isolation, and work respectfully with family, caregivers and powers of attorney.
6. **REAL BASIC, read for seniors.** Daily living needs made explicit when relevant, isolation named as a primary risk, and benefits pointed at Social Security, SSI, Medi-Cal and IHSS.
7. **Members, not clients.** No Wrong Door, one record, and one care plan that leads every service after Coordinated Entry.
8. **Equity, twice over.** In West Oakland, older Black adults carry the combined weight of racial inequity and ageism. We name that, not generalize it.

Layout: eyebrow "The framework", H2 "The Aging with Dignity way", intro paragraph, then a 2 x 4 grid of white cards (number badge in tint, title 600, one-line body). Same component as the Academy page.

---

## 7. Content rules that must survive

- HRC is the first source for eviction prevention; SMC does not do rapid rehousing.
- Flexible funds are never cash and never paid to the participant.
- Current Living Situation at every encounter; auto-exit at 90 days (HPS) and 180 days (CE).
- Transitional housing is engagement-gated (90 days), not score-gated.
- Lease signature is the handoff point to TSS.
- No em-dashes in copy. Ms. Turner is Evelyn, never Linda.

## 8. Saved state (for developers)

`roadhome.v1` holds name, role, department, screen, scene, role-track progress and quiz answers.
"Start fresh" on Training Home clears it.
