import type { CSSProperties } from "react";

const STRIP = "01234567890123456789";

/**
 * A number that rolls into place. Each digit is a strip of 0 to 9 twice over,
 * resting on its own value in the second run, so every digit travels at least
 * one full turn. The resting position is the default, so without CSS motion
 * (or with reduced motion) the number simply reads correctly.
 */
export function Odometer({ value }: { value: string }) {
  let position = 0;

  return (
    <span className="odo">
      <span className="sr-only">{value}</span>
      <span className="odo__track" aria-hidden="true">
        {[...value].map((char, i) => {
          if (!/\d/.test(char)) {
            return (
              <span key={i} className="odo__char">
                {char}
              </span>
            );
          }
          const style = { "--d": Number(char), "--p": position++ } as CSSProperties;
          return (
            <span key={i} className="odo__char odo__digit" style={style}>
              <span className="odo__strip">
                {[...STRIP].map((n, k) => (
                  <span key={k}>{n}</span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
