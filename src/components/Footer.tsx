import { Link } from 'react-router-dom';

export default function Footer() {
  return (
<<<<<<< HEAD
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
=======
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
>>>>>>> ab48f71ea6e72d5988225bc7313d4c4300cbadae
              >
                Home
              </Link>
              <Link 
<<<<<<< HEAD
                to="/#services" 
                className="font-paragraph text-base opacity-80 hover:opacity-100 transition-opacity"
              >
                Services
              </Link>
              <Link 
                to="/#about" 
                className="font-paragraph text-base opacity-80 hover:opacity-100 transition-opacity"
=======
                to="/content" 
                className="font-paragraph text-base text-secondary-foreground hover:opacity-70 transition-opacity"
              >
                Content
              </Link>
              <Link 
                to="/#about" 
                className="font-paragraph text-base text-secondary-foreground hover:opacity-70 transition-opacity"
>>>>>>> ab48f71ea6e72d5988225bc7313d4c4300cbadae
              >
                About
              </Link>
              <Link 
                to="/#contact" 
<<<<<<< HEAD
                className="font-paragraph text-base opacity-80 hover:opacity-100 transition-opacity"
=======
                className="font-paragraph text-base text-secondary-foreground hover:opacity-70 transition-opacity"
>>>>>>> ab48f71ea6e72d5988225bc7313d4c4300cbadae
              >
                Contact
              </Link>
            </nav>
          </div>

<<<<<<< HEAD
          <div>
            <h4 className="font-heading text-xl mb-6">Contact</h4>
            <div className="flex flex-col gap-3 font-paragraph text-base opacity-80">
              <p>123 Style Avenue</p>
              <p>New York, NY 10001</p>
              <p>contact@inzbc.com</p>
              <p>(555) 123-4567</p>
=======
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
>>>>>>> ab48f71ea6e72d5988225bc7313d4c4300cbadae
            </div>
          </div>
        </div>

<<<<<<< HEAD
        <div className="border-t border-secondary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-sm opacity-60">
              © 2026 INZBC. All rights reserved.
=======
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-secondary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-sm text-secondary-foreground">
              © {new Date().getFullYear()} R. Ali. All rights reserved.
>>>>>>> ab48f71ea6e72d5988225bc7313d4c4300cbadae
            </p>
            <div className="flex gap-6">
              <Link 
                to="/privacy" 
<<<<<<< HEAD
                className="font-paragraph text-sm opacity-60 hover:opacity-100 transition-opacity"
=======
                className="font-paragraph text-sm text-secondary-foreground hover:opacity-70 transition-opacity"
>>>>>>> ab48f71ea6e72d5988225bc7313d4c4300cbadae
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
<<<<<<< HEAD
                className="font-paragraph text-sm opacity-60 hover:opacity-100 transition-opacity"
=======
                className="font-paragraph text-sm text-secondary-foreground hover:opacity-70 transition-opacity"
>>>>>>> ab48f71ea6e72d5988225bc7313d4c4300cbadae
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
