# Figma handoff: SMC Senior Housing Services Training

## Start here (15 minutes)

1. **Fonts:** install Jost from Google Fonts on your computer.
2. **Tokens:** in Figma, install **Tokens Studio**, then import `design-tokens.json`. (No plugin? Create the colors as Figma Variables by hand; the file lists every value with its purpose.)
3. **Images:** drag the `assets/` folder into a Figma page named `Assets`.
4. **Pick a route:**
   - **Fastest:** import the live site with the html.to.design plugin. See `FIGMA-MAKE-PROMPT.md`, Option B.
   - **AI build:** open Figma Make, attach `SPEC.md`, `design-tokens.json` and the images, and paste the prompt in `FIGMA-MAKE-PROMPT.md`, Option A.
   - **By hand:** build the components in `SPEC.md` section 3, then the frames in section 4.
5. **Reference:** `reference/` has screenshots of every current screen. `source/` has the full page files with exact copy, roles, steps and exam questions.

## Folder

- `README.md`: this file
- `SPEC.md`: system rules, components, screens, states, people, content rules (Training Home, Academy, player, exam)
- `ROAD-HOME-SPEC.md` + `road-home-tokens.json`: The Road Home framework, screen map, role tracks and the Aging with Dignity overview to add
- `assets/road-home/`: all 23 images from The Road Home, in order of appearance
- `design-tokens.json`: colors, type, radius, spacing, shadows
- `FIGMA-MAKE-PROMPT.md`: paste-ready prompts
- `assets/logo`, `assets/covers`, `assets/team`, `assets/scenes`: every image in use
- `reference/`: screenshots of the current build
- `source/`: current page source (open in a text editor for copy)

The Road Home is a finished training. Rebuild it in Figma from ROAD-HOME-SPEC.md if you want to extend it (for example, to add the Aging with Dignity overview screen); the live file stays as it is.
