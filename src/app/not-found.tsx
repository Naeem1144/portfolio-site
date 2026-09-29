import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <main className="status-page">
      <div className="container">
        <p className="eyebrow">404 · Page not found</p>
        <h1>This page is an outlier.</h1>
        <p>
          There&rsquo;s nothing at this address. The projects, résumé and
          contact details are all on the home page.
        </p>
        <div className="status-actions">
          <Link href="/" className="button button--primary">
            <ArrowLeft size={17} aria-hidden="true" /> Back to the portfolio
          </Link>
          <a href={`mailto:${site.email}`} className="link">
            {site.email}
          </a>
        </div>
      </div>
    </main>
  );
}
