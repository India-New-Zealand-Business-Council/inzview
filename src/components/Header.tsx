import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="w-full bg-background border-b border-primary/10">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-heading text-2xl lg:text-3xl text-primary">
            INZBC
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className="font-paragraph text-base text-primary hover:opacity-70 transition-opacity"
            >
              Home
            </Link>
            <Link 
              to="/#services" 
              className="font-paragraph text-base text-primary hover:opacity-70 transition-opacity"
            >
              Services
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

          <button className="md:hidden font-paragraph text-base text-primary">
            Menu
          </button>
        </div>
      </div>
    </header>
  );
}
