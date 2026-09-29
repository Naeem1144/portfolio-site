import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
import { tokens } from "@/lib/tokens";

/**
 * The social card is the page's hero, at card size: same paper, same
 * statement, same three results, same monogram. Satori reads the bundled Geist
 * TTFs; every number comes from the site data.
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

const RULE = "rgba(20, 23, 26, 0.16)";

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
          background: tokens.paper,
          padding: "60px 72px 56px",
          color: tokens.ink,
          fontFamily: "Geist",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <svg width="44" height="44" viewBox="0 0 40 40">
              <path
                d="M6 29V11L20 29V11L34 29V11"
                fill="none"
                stroke={tokens.ink}
                strokeWidth="3"
              />
              <circle cx="34" cy="11" r="4" fill={tokens.accent} />
            </svg>
            {site.name}
          </div>
          <div style={{ display: "flex", color: tokens.ink3 }}>{site.role}</div>
        </div>

        <div
          style={{
            display: "flex",
            maxWidth: 980,
            fontSize: 78,
            lineHeight: 1.04,
            letterSpacing: "-0.04em",
          }}
        >
          Data analyst who turns business questions into decisions.
        </div>

        <div
          style={{
            display: "flex",
            borderTop: `1px solid ${RULE}`,
            paddingTop: 28,
          }}
        >
          {site.proof.map((item, index) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                paddingLeft: index === 0 ? 0 : 32,
                paddingRight: 24,
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontFamily: "GeistMono",
                  fontSize: 46,
                  letterSpacing: "-0.03em",
                }}
              >
                {item.value}
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 8,
                  fontSize: 21,
                  lineHeight: 1.3,
                  color: tokens.ink2,
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
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
