import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-background border-b border-primary/10">
      <div className="max-w-[100rem] mx-auto px-8 md:px-16 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 border-2 border-primary flex items-center justify-center">
              <span className="font-heading text-lg text-primary">R</span>
            </div>
            <span className="font-heading text-xl text-primary">R. Ali</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className="font-paragraph text-base text-primary hover:opacity-70 transition-opacity"
            >
              Home
            </Link>
            <Link 
              to="/content" 
              className="font-paragraph text-base text-primary hover:opacity-70 transition-opacity"
            >
              Content
            </Link>
            <Link 
              to="/#about" 
              className="font-paragraph text-base text-primary hover:opacity-70 transition-opacity"
            >
              About
            </Link>
            <Link 
              to="/#contact" 
              className="font-paragraph text-base text-primary hover:opacity-70 transition-opacity"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-primary"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-6 pb-4 flex flex-col gap-4 border-t border-primary/10 pt-6">
            <Link 
              to="/" 
              className="font-paragraph text-base text-primary hover:opacity-70 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/content" 
              className="font-paragraph text-base text-primary hover:opacity-70 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
            >
              Content
            </Link>
            <Link 
              to="/#about" 
              className="font-paragraph text-base text-primary hover:opacity-70 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/#contact" 
              className="font-paragraph text-base text-primary hover:opacity-70 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
