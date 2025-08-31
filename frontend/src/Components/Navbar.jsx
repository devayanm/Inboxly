import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Sun, Menu, X, Zap, Star, MessageSquare, Users } from 'lucide-react';
import { useTheme } from '../App.jsx'; // Import the theme hook

// InboxlyLogo Component
const InboxlyLogo = ({ className }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M14 0C6.268 0 0 6.268 0 14C0 21.732 6.268 28 14 28C21.732 28 28 21.732 28 14C28 6.268 21.732 0 14 0ZM21.238 8.792L14.448 19.642C14.21 19.994 13.79 19.994 13.552 19.642L6.762 8.792C6.562 8.505 6.79 8.05 7.14 8.05H8.484C8.75 8.05 9.002 8.218 9.118 8.47L14 18.004L18.882 8.47C18.998 8.218 19.25 8.05 19.516 8.05H20.86C21.21 8.05 21.438 8.505 21.238 8.792Z" fill="url(#logo-gradient)" />
    <defs>
      <linearGradient id="logo-gradient" x1="14" y1="0" x2="14" y2="28" gradientUnits="userSpaceOnUse">
        <stop stopColor="#A57BFF" />
        <stop offset="1" stopColor="#8C52FF" />
      </linearGradient>
    </defs>
  </svg>
);

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme(); // Use centralized theme
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // Proper React Router navigation

  // Handle navigation with proper React Router
  const handleNavigation = (path) => {
    if (path.startsWith('#')) {
      // Smooth scroll to section for anchor links
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Use React Router navigation for routes
      navigate(path); 
      window.scrollTo({ top: 0, behavior: 'smooth' });   
    }
  };

  // Close mobile menu when clicking on a link
  const handleMobileNavClick = (path) => {
    setMenuOpen(false);
    handleNavigation(path);
  };

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const navLinks = [
    { href: '#features', label: 'Features', icon: <Zap className="w-4 h-4" /> },
    { href: '#pricing', label: 'Pricing', icon: <Star className="w-4 h-4" /> },
    { href: '/docs', label: 'Docs', icon: <MessageSquare className="w-4 h-4" /> },
    { href: '#company', label: 'Company', icon: <Users className="w-4 h-4" /> }
  ];

  return (
    <>
      {/* nav */}
      <nav className={`
        py-4 border-b sticky top-0 backdrop-blur-md z-50 transition-all duration-300
        ${isDark 
          ? 'border-slate-800 bg-[#0B0F19]/90 shadow-lg shadow-slate-900/20' 
          : 'border-slate-200 bg-white/50 shadow-sm shadow-slate-900/5'
        }
      `}>
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo - Clickable to go home */}
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => handleNavigation('/')}
            >
              <InboxlyLogo />
              <span className={`
                ${isDark ? 'text-white' : 'text-slate-900'} 
                text-xl font-bold tracking-tight
              `}>
                Inboxly
              </span>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`
                md:hidden p-2 rounded-lg transition-colors duration-200
                ${isDark 
                  ? 'text-slate-400 hover:text-white hover:bg-slate-800' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }
              `}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavigation(link.href)}
                  className={`
                    flex items-center gap-2 transition-all duration-200 cursor-pointer active:text-blue-500 active:scale-95
                    ${isDark 
                      ? 'text-slate-300 hover:text-white' 
                      : 'text-slate-600 hover:text-slate-900'
                    }
                    hover:scale-105 transform
                  `}
                >
                  {link.icon}
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`
                  p-2 rounded-lg transition-all duration-200 cursor-pointer
                  ${isDark 
                    ? 'hover:bg-slate-800 text-slate-400 hover:text-yellow-400' 
                    : 'hover:bg-slate-100 text-slate-600 hover:text-blue-500'
                  }
                  hover:scale-110 transform
                `}
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              {/* Profile Link */}
              <button
                onClick={() => handleNavigation("/profile")}
                className={`
                  px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer
                  ${isDark 
                    ? 'text-slate-300 hover:text-white hover:bg-slate-800' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }
                `}
              >
                Profile
              </button>

              {/* Get Started Button */}
              <button
                onClick={() => handleNavigation("/auth")}
                className="
                  bg-gradient-to-r from-blue-500 to-purple-600 text-white 
                  font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 cursor-pointer text-sm
                  hover:from-blue-600 hover:to-purple-700 hover:shadow-lg hover:scale-105 transform
                  focus:outline-none focus:ring-2 focus:ring-blue-500/20
                "
              >
                Get Started
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className={`
            md:hidden border-t transition-all duration-300 ease-in-out
            ${isDark ? 'border-slate-800 bg-[#0B0F19]/95' : 'border-slate-200 bg-white/75'}
            backdrop-blur-md
          `}>
            <div className="container mx-auto px-4 py-6">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleMobileNavClick(link.href)}
                    className={`
                      flex items-center gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer text-left w-full active:text-blue-500 active:scale-95
                      ${isDark 
                        ? 'text-slate-300 hover:text-white hover:bg-slate-800/50' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }
                    `}
                  >
                    {link.icon}
                    <span className="font-medium">{link.label}</span>
                  </button>
                ))}

                {/* Mobile Actions */}
                <div className="pt-4 border-t border-slate-700/50 space-y-4">
                  {/* Theme Toggle */}
                  <button
                    onClick={toggleTheme}
                    className={`
                      flex items-center gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer w-full text-left
                      ${isDark 
                        ? 'text-slate-300 hover:text-white hover:bg-slate-800/50' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }
                    `}
                    aria-label="Toggle theme"
                  >
                    {isDark ? (
                      <>
                        <Sun className="w-5 h-5" />
                        <span className="font-medium">Light Mode</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-5 h-5" />
                        <span className="font-medium">Dark Mode</span>
                      </>
                    )}
                  </button>

                  {/* Profile */}
                  <button
                    onClick={() => handleMobileNavClick("/profile")}
                    className={`
                      flex items-center gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer w-full text-left
                      ${isDark 
                        ? 'text-slate-300 hover:text-white hover:bg-slate-800/50' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }
                    `}
                  >
                    <Users className="w-5 h-5" />
                    <span className="font-medium">Profile</span>
                  </button>

                  {/* Get Started Button */}
                  <button
                    onClick={() => handleMobileNavClick("/auth")}
                    className="
                      bg-gradient-to-r from-blue-500 to-purple-600 text-white 
                      font-semibold py-3 px-4 rounded-lg transition-all duration-200 cursor-pointer text-sm w-full
                      hover:from-blue-600 hover:to-purple-700 hover:shadow-lg
                      flex items-center justify-center gap-2
                    "
                  >
                    Get Started
                  </button>
                </div>
              </nav>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;