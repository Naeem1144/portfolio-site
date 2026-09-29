/**
 * Design tokens for places CSS custom properties cannot reach: the hero canvas
 * (before it has read the computed style), the social card, and the browser
 * theme colour.
 *
 * These mirror the `:root` and `.night` blocks in globals.css. Change a colour
 * in both places, or better, only in globals.css and here.
 */

export const tokens = {
  /** The page. Warm off-white, so long reading is easy on the eye. */
  paper: "#f6f4ee",
  ink: "#14171a",
  ink2: "#474d54",
  ink3: "#636a71",
  /** The single accent: primary action, the brand's sample point, focus. */
  accent: "#2b3fe6",
  onAccent: "#ffffff",
  /** The closing band. */
  night: "#101317",
  nightInk: "#f3f1ea",
  nightAccent: "#a5b0ff",
} as const;

export type Tokens = typeof tokens;
