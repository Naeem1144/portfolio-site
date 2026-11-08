# Portfolio design notes

## The idea: an analytical brief

The site reads the way a good analyst's brief reads: the finding first, then
the evidence, then the method in a footnote, then what to do next.

1. **Finding**: the hero says what I am and what I do, in one sentence.
2. **Evidence**: three results sit directly under it, each linking to the
   project that produced it.
3. **Method**: four projects, each with a drawing, the question, two numbers
   and the code. "How I did it" is one click down (opened on the first project).
4. **Person**: a short About, the credentials, and how I work.
5. **Action**: one way to get in touch, closing the page.

A hiring manager decides in about 30 seconds. Everything on the page either
carries information or gets them to the next piece of information. Anything
that only decorated was removed.

## Five rules

- **One point of emphasis.** The accent colour is a highlighter, not a theme.
  It marks the primary action (Get in touch), the one highlighted phrase per
  section, the brand's sample point, the result marker in the hero figure, and
  keyboard focus. Availability is green, because it is
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
- **Numbered like a report.** Sections (`01 Work`, `02 About`, `03 Contact` in
  both the section eyebrows and the header navigation), figures (Fig. 1 is the
  hero, Figs. 2 to 5 the projects), practice habits (`01` to `03`) and notes (1
  to 3) are all numbered. Projects carry their featured index (`01 / 04` to
  `04 / 04`) paired with their discipline and year on a top header bar.
- **Every headline number is sourced.** The hero results carry footnote
  markers, and a Sources list closes the work section. Beside it, "All 16
  projects on GitHub" is the page's secondary button (`.button--secondary`):
  outlined in ink, not accent, with an ink fill that sweeps in like the marker.
- **Numbers count into place.** `Odometer.tsx` rolls each digit through a full
  turn to its value, in the hero on load and in the project stats on arrival.
- **The drawings plot themselves.** Frame and labels appear, then the points in
  order (`--i` on each mark). On a mouse, a crosshair with an x/y readout
  follows the pointer on coordinate charts (`Plot.tsx`).
- **Graph paper** under the hero figure, dissolving at the edges.
- **The close** is the largest line on the page (`--fs-display`), "Got data?
  Let's talk." Under it, a three-line SQL query the visitor can edit: they pick
  who they are in the `WHERE` clause (a native select), the result row answers
  them, and the form's message prompt follows. Then my local time and when to
  expect a reply (`LocalTime.tsx`).
- **The sign-off** (`Signature.tsx`): the name set full width in a field of
  dots on the dark band. Dots lean away from the pointer and light up in the
  accent, a tap sends a ripple through them, and a slow sweep of light crosses
  them when idle. It carries no information on purpose: the page ends on a
  feeling, not a fact. It only animates while on screen, and rests once the
  field has settled and the idle sweep has finished its pass — a pointer or a
  tap wakes it again. With reduced motion the dots are still, and without
  JavaScript the name is set as plain type.

## Motion

Motion is part of the report, not a skin over it: the numbers count, the rule
draws, the figure shows its work. Section 16 of `globals.css` holds it, and
every resting state is the finished state. `RevealObserver.tsx` only holds back
blocks that start below the fold, so nothing on screen ever blinks out, and
with reduced motion or without JavaScript everything is simply there.

Durations are numbered and chosen by what the move is for, never by taste.
`--fast` and `--med` are the names the controls use; they alias steps 1 and 2.

| Token | Value | For |
| --- | --- | --- |
| `--dur-1` / `--fast` | 150ms | feedback: hover, press |
| `--dur-2` / `--med` | 300ms | controls: focus, disclosure |
| `--dur-3` | 480ms | reveals as blocks scroll in |
| `--dur-4` | 900ms | entrances |
| `--dur-5` | 1700ms | counting, plotting |
| `--stagger` | 50ms | a column of things stepping in |

Three curves: `--ease` (arrivals, decelerating), `--ease-inout` (travel, eased
at both ends), `--ease-spring` (a pop, with a little overshoot).

The budget: entrances settle within ~1.2s of load, reveals within 480ms and
storytelling beats (a curve drawing itself, a count running up) within 1.7s.
Nothing loops in the background; the live status dot and the signature's idle
sweep are the only passing exceptions, and both rest without input.

The hero loads in order: status, the headline wiped into place (clip and rise,
`h-set`), lede and actions, the figure booting, the results rule drawing, each
column rising, then its digits counting in — odometers staggered by column and
by digit — with the monogram drawing itself and popping its sample point last.

The figure runs on springs, not eases. Stage weights are critically damped so
the blend never overshoots into a double exposure; the camera may overshoot a
hair, and a stage change gets a small anticipation kick before the springs
carry it over. A switch is a scene: departing labels leave first (140ms), the
records travel with one-frame echoes, arriving labels type on from ~300ms, and
the set pieces follow on the stage clock — Stage 2's web grows outward from
each centroid and its hulls unroll; Stage 3's curve draws for ~900ms, the
ribbon unrolls behind it, stems drop in, and the cutoff marker falls onto the
peak. Under reduced motion every gate returns the finished frame: echoes off,
typing complete, weights instant.

The project drawings play their finding once, as they arrive. Each mark carries
its beat in the figure's sequence (`--d`, set by `at()` in `ProjectFigures.tsx`),
and staggered runs carry their index (`--i` × the figure's step): the cluster
map plots its points, then its hulls unroll and the group names land; the
schema stands its tables up, types their rows in reading order, then fades the
relations in; the dashboard's trend line draws itself while its three cuts
arrive row by row, their bars growing left to right, the two ends stamped as
the pen reaches them; the stage figure scans its slice top-down, then grows the
four bars, the hot stage's white labels waiting for their bar. A drawn series
is a `<path>` with `pathLength="1"` and a dash offset, so the line unrolls
instead of fading; bars grow from their baseline. Every sequence settles inside
1.7s, and under reduced motion each gate returns the finished frame.

Revealed blocks bring their lists in as rows: the block lands as one piece
while its rows settle one after another (`320ms + 70ms × --i`, 520ms each) —
the facts table, the credentials, the project sources and the three practices
read down instead of arriving as a slab. Row states live only in the
no-preference media block, so reduced motion (and no JS) shows the finished
list.

The closing band stages itself on the same system: the query prints its lines
one after another (70ms apart), the ways to reach out step in behind them and
the form's three rows land on one clock (90ms apart, everything settled inside
~1.4s). The sign-off knows one more trick: the footer's dot field inks itself
in from the left when it first arrives, and the idle sweep's clock starts at
that arrival, so the light crosses the name only once the name is there. Under
reduced motion the finished field is painted at once and nothing prints.

The one disclosure on the page opens like a sheet, not a switch. The method's
height travels from zero to its content over `--dur-2` (via `::details-content`,
which inherits the stylesheet's `interpolate-size` setting), the body settles in
60ms behind it, and the marker — drawn as two hairlines, not typed — folds its
vertical stroke away so the plus becomes a minus. Browsers without
`::details-content` still get the body's arrival; reduced motion and no JS get
the open sheet. Smaller acknowledgements use the same economy: the monogram's
sample point widens 1.45× under the pointer, and a pressed button or text button
moves down 1px, so touch gets a shape response as well as a colour one.

One shape this system cannot do: a block that can only ever sit in the bottom
12% of the viewport cannot be reveal-managed, because the observer's root
excludes that band at full scroll. The footer row is plain on purpose.

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
| `--fs-h1` | 38px to 66px | the hero sentence |
| `--fs-num` | 28px to 40px | the key figures and project indices |
| `--fs-display` | 44px to 120px | the closing line |
| `--fs-address` | 22px to 30px | the contact address |
| `--fs-signature` | 56px to 200px | the sign-off, set in dots |

Sizes are fluid (`clamp`) between the two ends. There is one corner radius
(6px) and one spacing scale (`--space-1` to `--space-9`, a 4px base).

## Layout

- Content is 75rem wide with a fluid gutter. Vertical rhythm between sections is
  `--section-y`, `clamp(4.5rem, 9vw, 8rem)`.
- The header is sticky, 4rem tall (3.5rem on phones), translucent paper, and
  automatically transitions into the `.night` token palette when scrolled over
  the dark Contact & Footer band. Section links use `scroll-padding-top` so
  anchors land clear of it.
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

- **Hero figure (`HeroFigure.tsx`)**: a three-stage interactive 3D/2D analytical
  lens showing how 180 raw records become a business decision:
  1. `01 Clean`: a `15 × 12` diagnostic matrix swept by a validation scanline that
     flags 18 anomalous rows (`×`) and locks 162 clean records.
  2. `02 Cluster`: a 3D perspective feature space with a floor lattice, where the
     162 clean records separate into three behavioural segments connected by 3D
     k-NN network filaments, projected 2D convex-hull floor footprints, and
     vertical centroid drop-lines.
  3. `03 Decide`: a non-linear net-lift response curve with vertical residual
     stems from each observation, a shaded 95% confidence band, and the optimal
     intervention cutoff marked in cobalt (`+31.4% lift`).
  Moving the pointer over the canvas wakes the loop at any time to orbit the 3D
  camera, inspect individual records (Stages 1–2), or scrub the decision cutoff
  along the response curve (Stage 3). On a mouse only, as in `Plot.tsx`: on
  touch the stage tabs and Replay carry the same content, and a drag scrolls
  the page as it should. Visitors can also switch stages directly
  (`01 Clean` · `02 Cluster` · `03 Decide`) or press `Replay`. With reduced
  motion it opens directly on the finished decision view; without JavaScript a
  static view of that same decision state stands in, revealed by a `<noscript>`
  rule so it never flashes. Its caption keeps the "Illustration:" wording of
  every other exhibit while the figure is at rest, and names the step only
  while the sequence plays or a stage has been chosen.
- **Project drawings**: SVG in a 500 by 360 space. Their text is sized in drawing
  units, so it would shrink with the screen. Seven size steps in `globals.css`
  (section 09, container queries) pick the smallest label size that still
  renders at 12px or more at each width — the frame's 12px padding counts,
  because it sits inside the container the queries measure. The four featured
  drawings were checked for collisions and clipping at every step, from 320px
  to 1440px, and again after the steps were corrected: the dashboard's three
  cuts read as rows so a label can never outgrow its column, the stage names
  are centred so their overflow splits across the gap, and the schema's row
  pitch leaves room for the largest step.
- Only four projects are shown (`SELECTED` in `ProjectsSection.tsx`). The
  drawings for the other three are kept in `ProjectFigures.tsx` but have not been
  checked at the small label steps. Check them the same way before featuring one.
- Plotted drawings read real values (`Plot.tsx`). Over the churn trend the
  crosshair snaps to the nearest drawn point and reports the value the line is
  drawn at, with the point's place in the series ("45% · 6/12") and a dot on
  the reading; over the cluster map it names the group under the pointer
  ("Group B"). The crosshair is only live inside the plotted area — pointing
  at a cut bar below the trend clears it — and touch is unaffected. The guide
  is plain data passed from the drawings, so the figures stay server rendered.

## Print

Paper gets the same page in its finished state, not a screenshot of a browser.
`@media print` (section 17) is the stylesheet; `PrintSheet.tsx` is the one
listener. Before the printer lays anything out, `beforeprint` freezes transitions
and animations, releases every block the reveal observer is still holding
(`[data-pending]`), and opens every project method, remembering which ones the
reader had open. `afterprint` closes only those it opened; the released blocks
stay revealed.

The palette becomes ink: warm paper to white, the night band with it, the accent
and every data tone to weights of grey (the machine's marker stays a grey band,
printed exactly, so a highlighted phrase still reads on a black-and-white
printer). The header turns into a letterhead; the navigation, form, sign-off dot
field, hero figure, plot crosshair and screen-only controls step out; the query
prints as the query it is. Each external link is followed by its target in
brackets, and the résumé carries its absolute URL in `data-print-href`. A
certificate's link gets a full line of its own so its URL is not squeezed into a
nine-rem column. Every project starts a fresh page — drawing first, then the
argument, method open and its control hidden — and About and Contact each start
one.

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
- Dead CSS, unused components and unused data (`src/lib/skills.ts` and legacy
  font files removed).

## Accessibility

Skip link, visible focus ring (2px accent), current section marked with
`aria-current="location"`, links that open a new tab say so to screen readers,
form errors are tied to their fields with `aria-describedby`, status messages
are announced politely, and reduced motion removes transitions, smooth scroll
and the animated figure. Under forced colours the page follows the system
palette, the highlight becomes an underline and the disclosure's drawn marker
becomes a typed sign.

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
- The closing band, measured row by row (first-ink and settle time per
  element): the query prints its lines 70ms apart, the intro and form rows
  90ms apart, everything settled inside 1.4s of the band arriving. The
  sign-off's ink-in was measured from canvas pixels: the left third of the
  field inks from ~0.3s and the right third reaches full ink by ~0.9s. Under
  reduced motion every row measures at rest on the first sample, the field is
  painted complete, and no block is pending.
- Figure labels, re-measured in the browser at 300, 320, 355, 390 and 1440:
  the smallest rendered label is 12.1px at 300 and 12.4px at 320, and the
  adjacent pairs in the featured drawings were checked at the glyph level
  (canvas ink measurement), not just the em box. The smallest step went from
  26 to 27 drawing units so the floor holds at 300px.
- The project method's disclosure, measured in the browser: opening travelled
  from 57px to 623px over ~330ms with the body settling 60ms behind it, and the
  marker's vertical stroke went from 100% to 0 while the horizontal stayed. A
  pressed button moves 1px; the monogram's point measures 1.45× under the
  pointer.
- Print, measured through the real CSS and a synthetic `beforeprint`:
  `beforeprint` opened all four methods, released the eight pending blocks and
  set the motion freeze; `afterprint` restored the reader's open methods.
  Paper styles computed to a white ground in both palettes, an `#111` accent,
  the marker as a 19px band at print type, three grey data tones, two-column
  certificate rows and URL suffixes (the résumé's absolute). The print pipeline
  produced 13 A4 pages, 829KB.
- Reduced motion, final pass: at load no block is pending and no animation is
  running; opening a method jumps 57px to 623px in the first frame with the
  marker already a minus; printing under reduced motion still opens all four
  methods and leaves nothing pending.
- Forced colours (Windows High Contrast): text, hairlines and links follow the
  system palette, focus draws a 2px outline at 3px, the highlighted phrase
  becomes an underline, and the drawn disclosure marker falls back to a typed
  + / − — it is a background image otherwise, which forced colours removes.
  The project drawings keep their data tones, as data should.
- Frame timing in the browser: a 3s full-page scroll held a 16.7ms median
  (p95 17.0, no frame over 33ms); opening a method and a hero-figure replay
  both held 16.7ms median with no long task. The dev server's initial load
  carried one hydration task (195–544ms across runs); replay, scroll and
  disclosure were sampled after it and held 60fps.
- `npm run typecheck`, `npm run lint` and `npm run build` pass.

The contact form's real submit path was not exercised, so no email was sent
during testing. Its error and success colours were measured but not triggered.
