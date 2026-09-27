import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/** Social card shares the near-black, acid-yellow palette and signal monogram.
 * Satori reads the bundled Geist TTFs; numbers come from the existing site data.
 */

export const alt = `${site.name}, ${site.role}. ${site.proof.map((p) => `${p.value} ${p.label}`).join("; ")}.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GEIST = path.join(process.cwd(), "node_modules/geist/dist/fonts");

// `next.config.ts` lists these in `outputFileTracingIncludes`.
const [sans, mono] = await Promise.all([
  readFile(path.join(GEIST, "geist-sans/Geist-Medium.ttf")),
  readFile(path.join(GEIST, "geist-mono/GeistMono-Regular.ttf")),
]);

const PAPER = "#0c0e0f";
const INK = "#f2f4ed";
const INK_2 = "#bcc3bd";
const INK_3 = "#939e98";
const ACCENT = "#dfff00";
const LINE = "rgba(199, 212, 203, 0.2)";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER,
          padding: "60px 72px 52px",
          color: INK,
          fontFamily: "Geist",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            fontSize: 26,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 28 }}>
            <svg width="44" height="44" viewBox="0 0 40 40"><path d="M6 29V11L20 29V11L34 29V11" fill="none" stroke={INK} strokeWidth="3" /><circle cx="34" cy="11" r="4" fill={ACCENT} /></svg>
            {site.name}
          </div>
          <div style={{ display: "flex", color: INK_3 }}>{site.role}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Geist",
              fontSize: 84,
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
            }}
          >
            <div style={{ display: "flex" }}>Curiosity first.</div>
            <div style={{ display: "flex", color: ACCENT }}>Clarity follows.</div>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 48,
              borderTop: `2px solid ${INK}`,
              paddingTop: 22,
            }}
          >
            {site.proof.map((item, index) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  borderLeft: index === 0 ? "none" : `1px solid ${LINE}`,
                  paddingLeft: index === 0 ? 0 : 22,
                  paddingRight: 16,
                }}
              >
                <div style={{ display: "flex", fontFamily: "GeistMono", fontSize: 40, letterSpacing: "-0.03em" }}>
                  {item.value}
                </div>
                <div style={{ display: "flex", fontSize: 18, color: INK_2, marginTop: 8, lineHeight: 1.3 }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: sans, weight: 500, style: "normal" },
        { name: "GeistMono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
