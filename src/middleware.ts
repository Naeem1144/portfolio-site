import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Request-level security headers.
 *
 * The CSP and the other static headers live in `next.config.ts` so they are
 * applied in one place, in the same response, without a second hop.
 *
 * This middleware only adds HSTS, which has to be conditional: sending it over
 * plain HTTP is meaningless, and pinning `includeSubDomains` + `preload` is a
 * commitment that should not be made for localhost.
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const { protocol } = request.nextUrl;

  if (protocol === "https:") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload",
    );
  }

  return response;
}

export const config = {
  /**
   * Without a matcher this edge function ran on every request, including
   * `/_next/static/*`, `/icon.svg` and the résumé PDF: 33.9 kB of middleware
   * to add a single header. Skipping static files and the metadata routes also
   * lets Next serve them straight from the CDN.
   */
  matcher: [
    /*
     * Everything except:
     *  - _next/static  (build output)
     *  - _next/image   (image optimizer)
     *  - favicon / icon / apple-icon / opengraph-image (metadata assets)
     *  - files with an extension (public files such as the résumé PDF)
     */
    "/((?!_next/static|_next/image|icon.svg|apple-icon.png|opengraph-image|.*\\.[\\w]+$).*)",
  ],
};
