import { ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <a
            href="#home"
            className="footer-name"
            aria-label="Naeem Nagori, back to top"
          >
            Naeem Nagori<span>✳</span>
          </a>
          <a href="#home" className="back-to-top">
            BACK TO TOP
            <ArrowUp size={18} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Naeem Nagori</span>
          <span>Data analyst based in Ahmedabad, India.</span>
          <span>SQL · PYTHON · POWER BI</span>
        </div>
      </div>
    </footer>
  );
}
