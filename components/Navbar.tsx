import React, { useState, useEffect } from 'react';
import { Menu, X, Lock } from 'lucide-react';
import LoginModal from './LoginModal';

interface NavbarProps {
  onOpenAdminPanel: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenAdminPanel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      setIsOpen(false);
      element.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  const navLinks = [
    { name: 'Início', href: '#hero' },
    { name: 'Sobre', href: '#about' },
    { name: 'Tecnologias', href: '#skills' },
    { name: 'Portfólio', href: '#portfolio' },
    { name: 'Contato', href: '#contact' },
  ];

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex-shrink-0 flex items-center">
              <a 
                href="#hero" 
                onClick={(e) => handleNavClick(e, '#hero')}
                className={`text-2xl font-bold tracking-tighter ${scrolled ? 'text-slate-900' : 'text-slate-900 lg:text-slate-800'}`}
              >
                Dev<span className="text-primary-600">Portfólio</span>
              </a>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-slate-600 hover:text-primary-600 font-medium transition-colors text-sm uppercase tracking-wide cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => setShowLogin(true)}
                className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 rounded-full text-slate-600 hover:text-primary-600 hover:border-primary-200 hover:bg-primary-50 transition-all text-sm font-medium"
              >
                <Lock size={14} />
                Área Admin
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-700 hover:text-primary-600 focus:outline-none"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-slate-100">
            <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col items-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block w-full text-center px-3 py-4 text-base font-medium text-slate-700 hover:text-primary-600 hover:bg-slate-50 rounded-md cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => {
                  setIsOpen(false);
                  setShowLogin(true);
                }}
                className="w-full text-center px-3 py-4 text-base font-medium text-primary-600 hover:bg-primary-50 rounded-md cursor-pointer flex justify-center items-center gap-2"
              >
                <Lock size={16} />
                Área do Desenvolvedor
              </button>
            </div>
          </div>
        )}
      </nav>

      <LoginModal 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)} 
        onSuccess={onOpenAdminPanel}
      />
    </>
  );
};

export default Navbar;