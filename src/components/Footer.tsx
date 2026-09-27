import { ArrowUp } from "lucide-react";
import { CopyrightYear } from "./CopyrightYear";
import { site } from "@/lib/site";
import { BrandMark } from "./BrandMark";

export function Footer() {
  return (
    <footer className="site-footer band">
      <div className="container">
        <p className="footer-signature" aria-hidden="true">Naeem Nagori<BrandMark /></p>
        <div className="site-footer__row">
          <p>
            © {site.copyrightStart}-<CopyrightYear /> {site.name} · {site.location}
          </p>
          <a href="#top" className="text-link text-link--small">
            Back to top <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
