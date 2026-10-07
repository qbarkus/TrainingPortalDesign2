# Figma brief: update The Road Home and the Coordinated Entry Academy

Paste this into Figma Make, or hand it to a designer with the rest of the `figma-handoff` folder.
Everything below is a change to the existing trainings. The specs for how they are built today are in
`ROAD-HOME-SPEC.md` and `SPEC.md`; tokens are in the two `*-tokens.json` files; images are in `assets/`.

---

## The one rule for both trainings

Wherever the trainings contrast a weaker practice with ours, the two headings are:

**What we want to avoid** | **The Aging with Dignity way**

Retire "General practice" and "The St. Mary's Center way". Add this footnote once per training, on the
framework screen: *We follow Alameda County's Coordinated Entry policy. The Aging with Dignity framework is
how we apply it to adults 55 and older.*

---

## A. The Road Home (Part One)

Keep every chapter, decision, quiz and milestone exactly as built. Make these additions and changes only.

### A1. New screen: The Aging with Dignity way
- Place it between **PRO-00 Prologue** and **CH-01 Housing Support Plan**. Frame name `RH / 03b Framework`.
- Layout: eyebrow "The framework" (orange, 13px, 0.2em tracking, uppercase), H2 "The Aging with Dignity way"
  (Jost 600, 34px, `#1C5C7A`), the footnote line above as the intro paragraph, then a 2 x 4 grid of white cards
  (1px `#C9D6DF` border, radius 14, 18px padding). Each card: a 30px tinted number badge (`#E7F3FB` fill,
  `#1C5C7A` text), title in Jost 600 17px, one-line body in 15px `#3C4A55`.
- The eight cards, in order:
  1. Older adults, not clients in general. Every scenario is an adult 55 or older, in the situations our members actually arrive in.
  2. Screen, don't assume. Most older adults are independent. Frailty flags are things to check for, never a default picture. Route on what you find, not on age.
  3. Triage reads for aging. Add falls, memory change, unmanaged conditions and missed medications. Screen for elder abuse and financial exploitation, with Adult Protective Services as a parallel path.
  4. Resolutions that fit older adults. Adult children and in-law units, senior housing waitlists, board and care, and returning home with IHSS and in-home supports.
  5. Conversations that honor age. Pace for hearing and vision, respect capacity and consent, name grief and isolation, and work respectfully with family, caregivers and powers of attorney.
  6. REAL BASIC, read for seniors. Daily living needs made explicit when relevant, isolation named as a primary risk, and benefits pointed at Social Security, SSI, Medi-Cal and IHSS.
  7. Members, not clients. No Wrong Door, one record, and one care plan that leads every service after Coordinated Entry.
  8. Equity, twice over. In West Oakland, older Black adults carry the combined weight of racial inequity and ageism. We name that, not generalize it.
- One orange button: **Begin Chapter 1**. Back link to the Prologue.
- Add a milestone-rail state for this screen (current = orange dot, label "Framework").

### A2. Wording
- Every comparison panel: headings per the rule above.
- Any "the St. Mary's way" or "St. Mary's Center way" in body copy becomes "the Aging with Dignity way".
- Keep "St. Mary's Center" wherever it names the organisation (logo, footer, certificate).

### A3. Framework chip on chapter screens
- On each chapter's story band, add a small chip under the chapter title: "Aging with Dignity · {principle}",
  where the principle is the card number and title that chapter leans on most:
  Ch1 Housing Support Plan → 7 Members, not clients · Ch2 Document Readiness → 2 Screen, don't assume ·
  Ch3 Housing Navigation → 4 Resolutions that fit older adults · Ch4 Cross-Department Collaboration → 7 ·
  Ch5 Transitional Housing Decision → 2 · Ch6 When a Case Goes Quiet → 5 Conversations that honor age ·
  Ch7 Signing and Handoff → 5 · Ch8 Warm Handoff to TSS → 7.
- Chip style: pill, `#E7F3FB` fill, `#1C5C7A` text, Jost 600 12px, 0.08em tracking.

### A4. Certificate
- One landscape letter page (11 x 8.5 in), content centered, nothing bleeds to a second page.
- Add the line "Trained in the Aging with Dignity framework" under the training name.

### A5. Navigation
- Every screen ends with a Back / Next bar. The Final screen's Next goes to the Academy Exam.
- Add "Not you? Start fresh" to the welcome-back state on the Registration screen.

---

## B. Coordinated Entry Academy (Part Two)

### B1. Framework overview (already in the build, keep it)
- On page 1 "Before you begin", directly under the navy intro band and above "Tell us who you are", the same
  eight-card section as A1 (same component). Heading "The Aging with Dignity way".

### B2. Wording
- Comparison panel headings per the rule above, on every decision screen in the course player.
- Title on the opener of each step stays as is; add the framework chip (A3 style) with this mapping:
  Step 1 Triage → 3 Triage reads for aging · Step 2 HMIS Profile → 7 Members, not clients ·
  Step 3 Housing Problem Solving → 4 Resolutions that fit older adults · Step 4 Pre-Questions → 2 Screen, don't assume ·
  Step 5 Enrollment and Living Situation → 7 · Step 6 Crisis Assessment and Queue → 3 ·
  Transitional Housing (Marcus) → 2 · Step 7 Assessment, Match and Handoff → 5 Conversations that honor age.

### B3. Guides and portraits
- Each step opener shows the staff guide card (9 x 11em portrait, quote, name and role):
  Step 1 Marisol Vega · Step 2 Carla Montez · Step 3 Tanya Wells · Steps 4 and 5 Elena Castro ·
  Step 6 and Transitional Housing Renee Dawson · Step 7 Hector Salas.
- A smaller portrait chip rides the header of every decision screen ("Walking this with {name}").
- Portraits anchor 22% from the top; step scene images fit whole, never cropped.

### B4. Clarity HMIS profile screen
- Step 2 includes the illustrative Clarity client profile (masthead, search, client header "Turner, Evelyn",
  ACTIVE pill, nine tabs with PROFILE selected, nine fields, Backup contact and Release of information flagged
  red). DOB 03/14/1959, age 67. Footer: "Illustrative screen for training."

### B5. Living care plan
- Bottom of every Academy page: one row per step for the chosen seat, grey until done, then a green check with
  the line that step added. Steps show **Redo** once done.

### B6. Reset and resume
- "Not you? Start fresh" in the welcome-back bar and on Training Home. Course player header has
  **Restart this step** and **Save and exit**. Exam intro has **Clear my exam history**.

### B7. Exams
- Two banks on one screen design: Senior Housing Services Academy exam and Coordinated Entry exam.
- Rules shown on the intro: random order, no feedback until submit, autosave, unlimited retakes,
  pass = 85% and every critical item correct. Results show score by category and a per-question review.

---

## C. Shared components to update once, reuse everywhere

1. **Comparison panel**: two columns, left header "What we want to avoid" on white, right header
   "The Aging with Dignity way" on mint `#E8F3EF` with `#1E6B43` header text.
2. **Framework card** (the eight principles) and **Framework chip**.
3. **Guide card** and **portrait chip**.
4. **Back / Next bar**.
5. **Certificate**, landscape, one page.

## D. Content rules that must not change

- HRC is the first source for eviction prevention; SMC does not do rapid rehousing.
- Flexible funds are never cash and never paid to the participant.
- Current Living Situation at every encounter; auto-exit at 90 days (HPS) and 180 days (CE).
- Transitional housing is engagement-gated (90 days), not score-gated. Three sites, 24 units.
- Lease signature is the handoff point to TSS.
- Data and Compliance Coordinator only moves assessments from HMIS and reconciles data quality.
- Ms. Turner is Evelyn, never Linda. No em-dashes in copy. No emoji.

## E. Acceptance check

- Both trainings show the framework screen and the eight cards with identical wording.
- No screen still reads "General practice" or "St. Mary's Center way".
- Every image shows whole heads and whole wording.
- Certificates print to one landscape page each.
- Every screen has Back and Next.
