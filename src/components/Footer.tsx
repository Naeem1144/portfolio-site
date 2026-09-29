import { ArrowUp } from "lucide-react";
import { CopyrightYear } from "./CopyrightYear";
import { Signature } from "./Signature";
import { site } from "@/lib/site";

/** The sign-off: the name, set large in dots you can play with, then a last line. */
export function Footer() {
  return (
    <footer className="site-footer night">
      <div className="container">
        <Signature />
        <div className="site-footer__row">
          <p>
            © {site.copyrightStart}–<CopyrightYear /> {site.name}
          </p>
          <p className="site-footer__thanks">Thanks for scrolling all the way down.</p>
          <a href="#top" className="link">
            Back to top
            <ArrowUp className="link__icon link__icon--up" size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
