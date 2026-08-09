import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-secondary text-secondary-foreground">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-heading text-2xl mb-6">INZBC</h3>
            <p className="font-paragraph text-base opacity-80">
              Where tradition meets innovation in premium grooming services.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-xl mb-6">Quick Links</h4>
            <nav className="flex flex-col gap-3">
              <Link 
                to="/" 
                className="font-paragraph text-base opacity-80 hover:opacity-100 transition-opacity"
              >
                Home
              </Link>
              <Link 
                to="/#services" 
                className="font-paragraph text-base opacity-80 hover:opacity-100 transition-opacity"
              >
                Services
              </Link>
              <Link 
                to="/#about" 
                className="font-paragraph text-base opacity-80 hover:opacity-100 transition-opacity"
              >
                About
              </Link>
              <Link 
                to="/#contact" 
                className="font-paragraph text-base opacity-80 hover:opacity-100 transition-opacity"
              >
                Contact
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="font-heading text-xl mb-6">Contact</h4>
            <div className="flex flex-col gap-3 font-paragraph text-base opacity-80">
              <p>123 Style Avenue</p>
              <p>New York, NY 10001</p>
              <p>contact@inzbc.com</p>
              <p>(555) 123-4567</p>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-sm opacity-60">
              © 2026 INZBC. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link 
                to="/privacy" 
                className="font-paragraph text-sm opacity-60 hover:opacity-100 transition-opacity"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="font-paragraph text-sm opacity-60 hover:opacity-100 transition-opacity"
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
