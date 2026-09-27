# Naeem Nagori | Portfolio

A single-page portfolio built with [Next.js](https://nextjs.org) (App Router)
and TypeScript, styled with one hand-written stylesheet (`src/app/globals.css`).
Statically prerendered, with a small client-side surface: header scroll-spy,
the project filter, the copy-email button and the contact form. It follows the
visitor's light/dark preference.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint (next/core-web-vitals + next/typescript)
npm run typecheck
```

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `EMAIL_ADDRESS` | **yes** | Where contact-form submissions are delivered. Also the SMTP account. |
| `EMAIL_PASSWORD` | **yes** | App password (Gmail) or SMTP password for that account. |
| `EMAIL_SERVICE` | no | Nodemailer service name. Defaults to `gmail`. |
| `EMAIL_HOST` | no | Set to use a custom SMTP server instead of a named service. |
| `EMAIL_PORT` | no | SMTP port. Defaults to `587`. |
| `EMAIL_SECURE` | no | `true` for port 465. Defaults to `false`. |
| `NEXT_PUBLIC_SITE_URL` | recommended | Deployed origin, e.g. `https://your-domain.com`. Used for `canonical`, Open Graph, `robots.txt` and `sitemap.xml`. Falls back to a Vercel slug. |

Copy `.env.example` to `.env.local` for local development. `.env*` is
gitignored, so do not commit credentials.

### Gmail

Gmail needs an [App Password](https://myaccount.google.com/apppasswords), not
your account password. Enable 2-Step Verification first. See
[`CONTACT_SETUP.md`](./CONTACT_SETUP.md) for the full walkthrough.

If `EMAIL_ADDRESS` or `EMAIL_PASSWORD` is missing, the contact endpoint returns
`502` and the visitor is told to email directly. It does not fail silently.

## Contact endpoint

`POST /api/contact` · `{"name": string, "email": string, "message": string}`

| Status | Meaning |
| --- | --- |
| `201` | Accepted and handed to the mail transport. |
| `400` | Missing, malformed or oversized field. |
| `429` | More than 5 accepted submissions from one IP in 10 minutes. Includes `Retry-After`. |
| `502` | The message could not be delivered. |

The throttle is an in-memory map: it resets when the serverless instance is
recycled and is not shared between instances. It stops casual spam, not a
determined attacker. Move it to a shared store (Upstash, Vercel KV) if that
matters.

## Deploying

1. Set `EMAIL_ADDRESS`, `EMAIL_PASSWORD` and `NEXT_PUBLIC_SITE_URL` in the host's
   environment settings.
2. `npm run build` should report every route as `○ (Static)`.
3. Deploy. `/opengraph-image` is rendered at build time and reads Geist from
   `node_modules` and Newsreader from `assets/og/`; `next.config.ts` lists them
   in `outputFileTracingIncludes` so they survive output-file tracing.

## Security

- Strict CSP in `next.config.ts`. `script-src` has no `unsafe-eval` in
  production; `img-src` and `connect-src` are locked to `'self'`.
  `'unsafe-inline'` remains; see the comment in `next.config.ts` for why a
  nonce is not used on a statically rendered page.
- `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`,
  `Permissions-Policy` and `Cross-Origin-Opener-Policy` are set on every
  response; HSTS is added over HTTPS only.
- `X-Powered-By` is disabled.
- `src/middleware.ts` only handles HSTS and skips static assets via a matcher.

## Structure

```
src/
  app/                  routes, metadata, error + 404 pages, social card
  components/           sections (mostly server components)
  lib/
    site.ts             name, email, URLs, hero results (single source of truth)
    projects.ts         project catalogue and derived filter counts
    skills.ts           skills, each linked to the projects that use it
    credentials.ts      certifications and their verification links
    email.ts            nodemailer transport + message templating
    site-url.ts         canonical origin
  middleware.ts
```

Content lives in `src/lib/*.ts`. Change the contact address, the GitHub
username or a project in one place and the header, the contact form, the
footer, the JSON-LD and the social card all follow.
