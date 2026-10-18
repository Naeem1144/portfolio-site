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
  surface: "#ffffff",
  ink: "#14171a",
  ink2: "#474d54",
  ink3: "#636a71",
  /** The single accent: primary action, the brand's sample point, focus. */
  accent: "#2b3fe6",
  accentHover: "#1f30c4",
  onAccent: "#ffffff",
  error: "#b3261e",
  success: "#1b7a4b",
  /** The closing band. */
  night: "#101317",
  nightSurface: "#171b20",
  nightInk: "#f3f1ea",
  nightInk2: "#b9bdc2",
  nightInk3: "#8e949b",
  nightAccent: "#a5b0ff",
  nightAccentHover: "#c4ccff",
  nightOnAccent: "#0e1230",
  nightError: "#ff9a92",
  nightSuccess: "#7fdda8",
} as const;

export type Tokens = typeof tokens;
