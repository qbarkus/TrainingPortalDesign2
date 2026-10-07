# Paste-ready prompts

## Option A: Figma Make (AI). Attach `design-tokens.json`, `SPEC.md` and the `assets/` images, then paste this:

Build a multi-page training website for St. Mary's Center Senior Housing Services, a nonprofit serving older adults in West Oakland. Follow the attached SPEC.md exactly and use only the colors, type and radii in design-tokens.json.

Style: clean, professional, health-system grade. Font Jost (400, 500, 600). Navy #06304F for bars and headings, blue #1C5C7A for buttons and links, orange #F4941C only as an accent on the single main button, section eyebrows and the progress bar. White pages with soft #F2F7FA sections. 1px #DCE7EE borders, 10px button radius, 18px card radius. No gradients, no emoji.

Use the attached images as-is. Never crop wording or the tops of heads: portraits anchor 22% from the top, step scene images fit whole.

Pages:
1. Training Home: masthead, welcome-back bar, team cover image, intro with two buttons and a 3-row fact panel, two program cards (The Road Home, Coordinated Entry Academy), a 5-step numbered journey beside the arrival image, a 9-person team grid, a progress panel with a training code input and "Start fresh on this computer", a next bar and a navy footer.
2. Coordinated Entry Academy: four pages (Before you begin, Act One, Act Two, Act Three). Name and seat picker, step rows filtered by seat with Start or Redo, a living care plan panel at the bottom of every page, and a certificate on Act Three.
3. Course Player: opener with scene image and staff guide card, one decision per screen with feedback and a "What we want to avoid / The Aging with Dignity way" panel, a Clarity HMIS client profile mock, and a step-complete screen.
4. Exam: intro, one question per screen, results with score by category and an answer review.
5. Certificate: one landscape letter page, centered.

Make every page responsive to 375px, with 44px minimum tap targets. Add back and next navigation at the bottom of every page. Build reusable components first, then the pages.

## Option B: import the live site as editable layers (fastest)

1. Publish the `site` folder to Netlify.
2. In Figma, install the **html.to.design** plugin.
3. Paste each live URL (index.html, ces-academy.html, coordinated-entry/course/?course=1, exam.html, exam.html?exam=ces), set viewport 1440 and again at 375.
4. The plugin creates editable frames with real text and images. Then turn repeated pieces into components using SPEC.md section 3.
