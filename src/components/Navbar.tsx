import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { BRAND_NAME } from '../constants';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-6 py-4',
        isScrolled || !isHome ? 'bg-brand-cream/80 backdrop-blur-md border-b border-brand-brown/5 shadow-sm py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Desktop Links Left */}
        <div className="hidden md:flex items-center space-x-8 flex-1">
          {navLinks.slice(0, 2).map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                'text-sm uppercase tracking-widest hover:text-brand-sage transition-colors',
                isScrolled || !isHome ? 'text-brand-brown' : 'text-white'
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Logo */}
        <Link
          to="/"
          className={cn(
            'text-2xl font-serif tracking-tight font-medium transition-colors',
            isScrolled || !isHome ? 'text-brand-brown' : 'text-white'
          )}
        >
          {BRAND_NAME}
        </Link>

        {/* Desktop Links Right */}
        <div className="hidden md:flex items-center space-x-8 flex-1 justify-end">
          {navLinks.slice(2).map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                'text-sm uppercase tracking-widest hover:text-brand-sage transition-colors',
                isScrolled || !isHome ? 'text-brand-brown' : 'text-white'
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/admin" className={cn(
            'p-2 rounded-full transition-colors',
            isScrolled || !isHome ? 'hover:bg-brand-brown/5 text-brand-brown' : 'hover:bg-white/10 text-white'
          )}>
            <ShoppingBag className="w-5 h-5" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              'p-2 rounded-full transition-colors',
              isScrolled || !isHome ? 'text-brand-brown' : 'text-white'
            )}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-brand-cream border-t border-brand-brown/5 shadow-xl md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-8 space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg uppercase tracking-widest text-brand-brown hover:text-brand-sage transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg uppercase tracking-widest text-brand-brown hover:text-brand-sage transition-colors"
              >
                Admin Panel
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
