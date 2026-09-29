# Portfolio design notes

## The idea: an analytical brief

The site reads the way a good analyst's brief reads: the finding first, then
the evidence, then the method in a footnote, then what to do next.

1. **Finding**: the hero says what I am and what I do, in one sentence.
2. **Evidence**: three results sit directly under it, each linking to the
   project that produced it.
3. **Method**: three projects, each with a drawing, the question, two numbers
   and the code. "How I did it" is one click down.
4. **Person**: a short About, the credentials, and how I work.
5. **Action**: one way to get in touch, closing the page.

A hiring manager decides in about 30 seconds. Everything on the page either
carries information or gets them to the next piece of information. Anything
that only decorated was removed.

## Five rules

- **One point of emphasis.** The accent colour is a highlighter, not a theme.
  It marks the primary action (Email me), the one highlighted phrase per
  section, the reader's progress, the brand's sample point, the result marker
  in the hero figure, and keyboard focus. Availability is green, because it is
  a state, not an action. If a second thing wants the accent, one of them is
  wrong.
- **Type does the structure.** No cards, pills, badges or boxed panels.
  Hierarchy comes from size, weight, colour and hairlines.
- **Nothing under 12px, and only sizes from the scale.** This includes the
  labels inside the drawings.
- **One grid.** Every two-column section uses the same 7fr / 5fr split (the
  contact section mirrors it, 5fr / 7fr) with the same gap, so edges line up
  down the page.
- **Every element earns its place.** If it does not inform or navigate, cut it.

## Signature details

Each one is the brief metaphor made literal, so they read as one idea rather
than a set of effects.

- **The analyst's marker.** One phrase per section carries a low cobalt
  highlighter stroke: "decisions", "result", "Business first", "Let's talk.".
  It sweeps in as the section arrives. The tint is `--hl`.
- **Numbered like a report.** Sections (01 Work, 02 About, 03 Contact), figures
  (Fig. 1 is the hero, Figs. 2 to 4 the projects) and notes (1 to 3) are all
  numbered. Projects carry their catalogue number, "05 of 08".
- **Every headline number is sourced.** The hero results carry footnote
  markers, and a Sources list closes the work section. Beside it, "All 8
  projects on GitHub" is the page's secondary button (`.button--secondary`):
  outlined in ink, not accent, with an ink fill that sweeps in like the marker.
- **Numbers count into place.** `Odometer.tsx` rolls each digit through a full
  turn to its value, in the hero on load and in the project stats on arrival.
- **The drawings plot themselves.** Frame and labels appear, then the points in
  order (`--i` on each mark). On a mouse, a crosshair with an x/y readout
  follows the pointer (`Plot.tsx`).
- **Graph paper** under the hero figure, dissolving at the edges.
- **Reading progress** is the header's bottom rule, in the accent.
- **The close** is the largest line on the page (`--fs-display`), "Got data?
  Let's talk." Under it, a three-line SQL query the visitor can edit: they pick
  who they are in the `WHERE` clause (a native select), the result row answers
  them, and the form's message prompt follows. Then my local time and when to
  expect a reply (`LocalTime.tsx`).
- **The sign-off** (`Signature.tsx`): the name set full width in a field of
  dots on the dark band. Dots lean away from the pointer and light up in the
  accent, a tap sends a ripple through them, and a slow sweep of light crosses
  them when idle. It carries no information on purpose: the page ends on a
  feeling, not a fact. It only animates while on screen; with reduced motion
  the dots are still, and without JavaScript the name is set as plain type.

Motion rules (section 16 of `globals.css`): every resting state is the finished
state. `RevealObserver.tsx` only holds back blocks that start below the fold,
so nothing on screen ever blinks out, and with reduced motion or without
JavaScript everything is simply there.

## Palette

Warm paper, near-black ink and one cobalt accent. The dark band at the end
(contact and footer) is the same system with the tokens swapped.

| Role | Light | Night band |
| --- | --- | --- |
| Paper (page) | `#f6f4ee` | `#101317` |
| Surface (inputs, drawings) | `#ffffff` | `#171b20` |
| Ink (headings, body) | `#14171a` | `#f3f1ea` |
| Ink 2 (secondary text) | `#474d54` | `#b9bdc2` |
| Ink 3 (labels, captions) | `#636a71` | `#8e949b` |
| Accent | `#2b3fe6` (hover `#1f30c4`) | `#a5b0ff` (hover `#c4ccff`) |
| Text on accent | `#ffffff` | `#0e1230` |
| Error | `#b3261e` | `#ff9a92` |
| Success | `#1b7a4b` | `#7fdda8` |

Hairlines are the ink at 12% opacity. Control borders are the ink at 50% (45%
in the night band), which keeps input outlines above the 3:1 non-text contrast
minimum.

Contrast of text on paper: ink 16.4:1, ink 2 7.8:1, ink 3 5.0:1, accent 6.5:1,
white on accent 7.1:1. In the night band every text pair is between 5.6:1 and
16.5:1 (measured in the browser, including error, success and placeholder).

The tokens live in two places that must agree: `:root` and `.night` in
`src/app/globals.css`, and `src/lib/tokens.ts`, which the canvas, the social
card and the theme colour read because they cannot use CSS variables. Changing
the look of the whole site is a change to those two files.

## Type

Geist for everything, Geist Mono for numbers and labels. Both are self-hosted
variable fonts with metric-matched fallbacks, so text does not shift as they
load. One typeface family on purpose: the confidence comes from scale and
spacing, not from a second typeface.

| Token | Size | Used for |
| --- | --- | --- |
| `--fs-label` | 12px | eyebrows, mono labels |
| `--fs-small` | 14px | captions, meta, form help |
| `--fs-ui` | 16px | controls, nav |
| `--fs-body` | 17px | body copy |
| `--fs-lede` | 19px to 22px | the sentence under a heading |
| `--fs-h3` | 24px to 34px | project titles |
| `--fs-h2` | 34px to 56px | section headings |
| `--fs-h1` | 40px to 76px | the hero sentence |
| `--fs-num` | 28px to 40px | the key figures |

Sizes are fluid (`clamp`) between the two ends. There is one corner radius
(6px) and one spacing scale (`--space-1` to `--space-9`, a 4px base).

## Layout

- Content is 75rem wide with a fluid gutter. Vertical rhythm between sections is
  `--section-y`, `clamp(4.5rem, 9vw, 8rem)`.
- The header is sticky, 4rem tall (3.5rem on phones), translucent paper. Section
  links use `scroll-padding-top` so anchors land clear of it.
- Breakpoints: `56rem` stacks every two-column layout, `40rem` tightens the
  header and stacks the key figures, `26rem` hides the brand's text and leaves
  the mark.
- On narrow screens the order is finding, then evidence (the key figures), then
  the hero drawing. On short landscape screens (under 50rem tall) the hero gives
  back a little vertical space so the results stay in view with the claim.
- Touch: on touch screens every link, button and input is 44px or taller. With
  a mouse, links are at least 32px tall and buttons and inputs stay 44px or more.

## Figures

Every drawing shares one frame (`.exhibit`): the drawing, a hairline, and a
caption that says plainly what it is ("Illustration: ..."). Drawings are
illustrations of method, not screenshots, and carry no invented numbers. The
only figures shown are ones the project itself publishes.

- **Hero figure**: a canvas showing gradient descent finding the lowest point of
  an error surface. The camera looks down into the basins from above and in
  front (`ELEVATION` in `HeroFigure.tsx`), so both minima and the ball's whole
  path across the floor stay in view. It plays from step 1 on every load and
  reload, through six captioned steps, then rests on the result. The clock only
  runs while the canvas is on screen, so a visitor who scrolls down to it still
  sees it from the start. It stops drawing once finished, so a finished figure
  costs nothing. "Replay" runs it again. With reduced motion it opens on the
  finished picture.
- **Project drawings**: SVG in a 500 by 360 space. Their text is sized in drawing
  units, so it would shrink with the screen. Seven size steps in `globals.css`
  (section 09, container queries) pick the smallest label size that still
  renders at 12px or more at each width. The three featured drawings were
  checked for collisions and clipping at every step, from 320px to 1440px.
- Only three projects are shown (`SELECTED` in `ProjectsSection.tsx`). The
  drawings for the other five are kept in `ProjectFigures.tsx` but have not been
  checked at the small label steps. Check them the same way before featuring one.

## What was cut

- Everything from the earlier dark, acid-yellow direction: the graphite and
  yellow palette, the second serif typeface and its font files, the separate
  identity stylesheet.
- Project filter pills, tag lists, source sub-lists, a skills chip grid,
  IELTS and schooling side panels, link lists per project.
- Hero foot strip, tools line, scroll cue, raw-data toggle, tinted section
  backgrounds, entrance animations, card lifts. (A large footer signature came
  back later as the interactive sign-off, so it earns its place by being fun.)
- Cards, badges and pills as a visual device. Structure is type and hairlines.
- Dead CSS, unused components and unused data. `src/lib/skills.ts` is now
  unused and can be deleted.

## Accessibility

Skip link, visible focus ring (2px accent), current section marked with
`aria-current="location"`, links that open a new tab say so to screen readers,
form errors are tied to their fields with `aria-describedby`, status messages
are announced politely, and reduced motion removes transitions, smooth scroll
and the animated figure.

## Keeping it coherent

- Prefer a few well-explained projects over more projects. A new one should
  state the question, the work and its limits.
- Keep illustrations labelled as illustrations. Never fill a missing metric
  with a plausible number.
- New components use the existing tokens, the 6px radius and the type scale. If
  a new size or colour seems needed, it is probably a sign the design of the
  component is wrong.
- A real portrait or genuine project screenshots would add personal texture.
  Avoid stock imagery.

## Verification

Checked in a real browser with DOM measurements (screenshots were used only as
a sanity check):

- Widths 320, 360, 390, 768, 1024 and 1440: no horizontal overflow, no drawing
  label collisions or clipping, and (from 320 to 1024) no text under 12px.
- Hero fold: results fully above the fold at 1440 by 900 and 1920 by 1080, and
  the numbers in view at 1366 by 768.
- Touch targets: all 44px or more on coarse pointers.
- Contrast: all text and control pairs measured against the values above.
- Behaviour: nav section tracking, hero replay and auto-rest, reduced motion,
  the social card (1200 by 630).
- Signature layer: reveals, odometer rolls and plot-in measured over time; the
  crosshair readout stays inside the plot at its edges; under reduced motion
  nothing is held back, every digit rests on its value and no animation runs.
  Re-checked at 320, 390 and 1440 for overflow, small text and touch targets.
- `npm run typecheck`, `npm run lint` and `npm run build` pass.

The contact form's real submit path was not exercised, so no email was sent
during testing. Its error and success colours were measured but not triggered.
