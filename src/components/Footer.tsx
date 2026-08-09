import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-secondary">
      <div className="max-w-[100rem] mx-auto px-8 md:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 border-2 border-secondary-foreground flex items-center justify-center">
                <span className="font-heading text-lg text-secondary-foreground">R</span>
              </div>
              <span className="font-heading text-xl text-secondary-foreground">R. Ali</span>
            </Link>
            <p className="font-paragraph text-base text-secondary-foreground leading-relaxed">
              Crafting excellence through timeless stories and innovative perspectives.
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="font-heading text-xl text-secondary-foreground mb-6">
              Navigation
            </h3>
            <nav className="flex flex-col gap-3">
              <Link 
                to="/" 
                className="font-paragraph text-base text-secondary-foreground hover:opacity-70 transition-opacity"
              >
                Home
              </Link>
              <Link 
                to="/content" 
                className="font-paragraph text-base text-secondary-foreground hover:opacity-70 transition-opacity"
              >
                Content
              </Link>
              <Link 
                to="/#about" 
                className="font-paragraph text-base text-secondary-foreground hover:opacity-70 transition-opacity"
              >
                About
              </Link>
              <Link 
                to="/#contact" 
                className="font-paragraph text-base text-secondary-foreground hover:opacity-70 transition-opacity"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-heading text-xl text-secondary-foreground mb-6">
              Connect
            </h3>
            <div className="flex flex-col gap-3">
              <p className="font-paragraph text-base text-secondary-foreground">
                info@rali.com
              </p>
              <p className="font-paragraph text-base text-secondary-foreground">
                +1 (555) 123-4567
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-secondary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-sm text-secondary-foreground">
              © {new Date().getFullYear()} R. Ali. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link 
                to="/privacy" 
                className="font-paragraph text-sm text-secondary-foreground hover:opacity-70 transition-opacity"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="font-paragraph text-sm text-secondary-foreground hover:opacity-70 transition-opacity"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
