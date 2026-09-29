/**
 * The monogram: an N drawn as one continuous signal, ending on a single
 * highlighted sample point. It is the same idea as the accent colour, so it
 * appears in the header, the favicon and the social card.
 */
export function BrandMark() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" focusable="false" className="brand-mark">
      <path
        d="M6 29V11L20 29V11L34 29V11"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <circle cx="34" cy="11" r="4" className="brand-mark__point" />
    </svg>
  );
}
