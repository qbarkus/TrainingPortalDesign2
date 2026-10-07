# SMC Senior Housing Services Training: Figma build spec

Everything a designer (or Figma Make) needs to rebuild the training site screen for screen.
Tokens are in `design-tokens.json`. Images are in `assets/`. Full page source is in `source/` for exact copy.

---

## 1. Rules of the system

- **One font:** Jost, weights 400 / 500 / 600. Headings are 600, never heavier.
- **Orange is an accent, not a fill.** It appears only on the single main button per screen, section eyebrows, the progress bar fill, and one rule under the masthead.
- **Navy** for bars and headings, **blue** for every other button and link.
- **No gradients, no emoji, no multicolour strips.**
- **Images never crop wording or heads.** Portraits anchor 22% from the top; scene images on step openers fit whole (contain), never cover.
- **Minimum sizes:** body 15px, tap targets 44px tall, text contrast 4.5:1 or better.
- **Breakpoints:** desktop 1180 content, tablet 768, mobile 375. Two-column sections stack below ~840px.

## 2. Pages and the flow between them

```
Training Home ─┬─> The Road Home (existing, do not redesign) ──> Academy Exam
               ├─> Coordinated Entry Academy ──> Course Player (one per step) ──> Coordinated Entry Exam
               └─> Exams (two banks, same screen)
```

Every page ends with a **previous / next bar** so staff can move forward and back in order.

| Page | Frame name in Figma | Width |
|---|---|---|
| Training Home | `01 Home` | 1440 desktop, 375 mobile |
| Academy, page 1: Before you begin | `02 Academy / Begin` | 1440 / 375 |
| Academy, pages 2 to 4: Act One, Two, Three | `02 Academy / Act 1-3` | 1440 / 375 |
| Course Player: opener, decision, step complete | `03 Player / Opener`, `/ Decision`, `/ Complete` | 1440 / 375 |
| Exam: intro, question, results | `04 Exam / Intro`, `/ Question`, `/ Results` | 1440 / 375 |
| Certificate (print) | `05 Certificate` | 11 x 8.5 in landscape, one page, centered |

---

## 3. Components to build first (one page in Figma called Components)

1. **Masthead**: logo left (52px tall), divider, "SENIOR HOUSING SERVICES / TRAINING" eyebrow in 2 lines, nav right (4 links). Variant: dark (navy bar, white text, mark logo on a white chip) for the Academy, player and exam.
2. **Welcome-back bar**: navy. "Welcome back, {name}." + muted summary, orange **Resume training**, outline **Not you? Start fresh**. Hidden when there is no saved progress.
3. **Buttons**: Primary (orange fill, white), Secondary (blue fill, white), Outline (white, 1.5px blue border, blue text), Ghost link (blue text, underlined). Height 48, radius 10, padding 12 x 24.
4. **Eyebrow + heading** pair: orange 13px uppercase 0.2em tracking, then H2 navy.
5. **Program card**: 3:2 image top, padding 26/28, eyebrow "Part One · 45 minutes", H3, paragraph, blue text link with arrow. Whole card is the link. Border 1px, radius 18.
6. **Fact row panel**: white card, three rows split by subtle borders, label + sub left, value right in blue.
7. **Numbered list row**: 34px tinted circle number, name 17/600, description muted. Top border between rows.
8. **Portrait tile**: 3:4 image, radius 14, name 16/600 navy, role 14 muted. Grid auto-fill min 200px, gap 24.
9. **Step row** (Academy): left 7.5em image strip, title, "Done" pill, minutes, description, Start / Redo button. Left border 5px: orange when to do, green when done.
10. **Act nav pills**: Before you begin / Act One / Act Two / Act Three. Selected = blue fill.
11. **Living care plan panel**: mint background, one row per step, grey until done then green check with the line it added.
12. **Player header**: navy bar, mark logo on white chip, "← My steps", course title + rail label, **Restart this step**, **Save and exit**. 6px progress bar below, orange fill.
13. **Guide card**: navy band, 9 x 11em portrait (radius 16, white 4px border), italic quote, name and role in orange tint.
14. **Decision block**: navy story band (motif + "Stop 2 of 4" + title + body), cream "Decide" prompt box, 3 option buttons, feedback strip (green or red left rule), then the **What we want to avoid / The Aging with Dignity way** two-column panel, then a source line.
15. **Clarity HMIS profile mock**: dark top bar "CLARITY HUMAN SERVICES" + search, client header with initials avatar and ACTIVE pill, tab row (PROFILE active), 9-field grid, two fields flagged red, cream footer "Illustrative screen for training".
16. **Exam question**: navy scenario band, white question card, lettered options A to C, Critical item pill, category pill.
17. **Results**: pass / not passed header with a coloured top rule, score and critical-items tiles, score-by-category bars, per-question review cards with reference line.
18. **Certificate**: landscape, navy and orange frame rule, logo, name, role, date, training name.

---

## 4. Screen notes

### 01 Home
1. Masthead (light).
2. Welcome-back bar (state: returning user).
3. Cover: `assets/covers/team-cover.png`, full content width, radius 18, on canvas background.
4. Intro, 2 columns: eyebrow "Welcome to the training site", display heading "One member journey. One standard of care.", paragraph, buttons **Start The Road Home** (primary) + **Open the Academy** (outline). Right column: fact row panel (Part One 45 min, Part Two 60 min, Final exams 85% to pass).
5. "Your training path / Two parts, in either order": two program cards (`road-home-card.png`, `coordinated-entry-cover.png`).
6. Two columns: `road-home-arrival.jpg` with caption, and "Each role runs one part, then hands it on" with the 5-row numbered list (Engage, Assess, Plan, Connect, Thrive).
7. "The same faces guide both trainings": 9 portrait tiles from `assets/team/`.
8. "Your progress" panel: code input + Restore, ghost link **Start fresh on this computer**, status message.
9. Next bar: **Next: The Road Home →**. Footer navy.

### 02 Academy
- Page 1 Before you begin: full-width CE cover image, navy intro band ("Part Two of The Road Home", paragraph, **Find my steps**), then name field + seat dropdown (10 seats), progress bar and seat blurb once chosen.
- Pages 2 to 4, one per Act: Act eyebrow + title + blurb, the seat's step rows only, then the living care plan panel at the bottom of every page, then Back / Next.
- Act Three only: certificate card (unlocks when all the seat's steps are done) and the transfer code panel.
- Acts: One = steps 1, 2A, 2B. Two = 3A, 3B, 4. Three = 5, 6.

### 03 Course Player
- Opener: scene image (fit whole), guide card, "Your part in this step" panel for the chosen seat, three fact tiles, **Start**.
- Decision screens: one decision per screen (see component 14). Forward is enabled only after an answer.
- Senior impact screen and short quiz before Complete.
- Complete: "Added to Ms. Turner's care plan" mint box, score line, **Take the baton: next step →**, **Back to my steps**.

### 04 Exam
- Two banks on one design: Senior Housing Services Academy exam and Coordinated Entry exam.
- Intro: team cover, three tiles (questions, 85% to pass, critical items), "What this exam covers" two-column panel, previous attempts strip with **Clear my exam history**, **Start the exam**.
- Rules: random order, no feedback until submit, answers autosave, unlimited retakes, pass = 85% and every critical item correct.

---

## 5. States to draw for each interactive component

- Buttons: default, hover, focus (3px orange outline, 2px offset), disabled (45% opacity).
- Options: default, selected, correct, incorrect, revealed-correct.
- Step row: to do, done.
- Care plan row: waiting, added.
- Welcome-back bar: hidden, returning.
- Exam: not started, in progress (resumed), passed, not passed.

## 6. People

**Staff (guides):** Tanya Wells (Street Outreach Coordinator), Curtis Boyd (Outreach & Linkage Specialist), Marisol Vega (Housing Services Admin Assistant), Elena Castro (Housing Social Worker), Carla Montez (Housing Navigator), Renee Dawson (Transitional Housing Coordinator), Hector Salas (Tenancy Sustaining Services Coordinator), Sanjay Rao (Senior Housing Services Manager), Dr. Grace Okoro (Clinical Director of Housing Services).

**Members in scenarios:** Ms. Evelyn Turner (always Evelyn, never Linda), Mr. D., Ms. R., Mr. T., Marcus.

## 7. Content rules that must survive the rebuild

- HRC is the first source for eviction prevention; SMC does not do rapid rehousing.
- Flexible funds are never cash and never paid to the participant.
- Current Living Situation at every encounter; auto-exit at 90 days (HPS) and 180 days (CE).
- Data and Compliance Coordinator only moves assessments from HMIS and reconciles data quality.
- Headings on the comparison panel read **What we want to avoid** and **The Aging with Dignity way**.
- No em-dashes in copy.

## 8. Behaviour that Figma cannot do (note for developers)

Progress saves in the browser under `smc-training-progress`, `roadhome.v1`, `smc-course-pos-{id}` and `smc-exam-{id}`. "Start fresh" clears all four on that device. The training code moves progress between computers. Prototype these as flows, not as real storage.
