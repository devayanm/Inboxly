import React from "react";
import { Github, Twitter, Mail, Zap, Users, MessageSquare, Globe } from 'lucide-react';
import { useTheme } from '../App.jsx';

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

const Footer = () => {
  const { isDark } = useTheme();

  const footerSections = [
    {
      title: "Product",
      icon: <Zap className="w-4 h-4" />,
      links: [
        { name: "Features", href: "#" },
        { name: "Pricing", href: "#" },
        { name: "Security", href: "#" },
        { name: "Integrations", href: "#" }
      ]
    },
    {
      title: "Company",
      icon: <Users className="w-4 h-4" />,
      links: [
        { name: "About", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Contact", href: "#" }
      ]
    },
    {
      title: "Support",
      icon: <MessageSquare className="w-4 h-4" />,
      links: [
        { name: "Help Center", href: "#" },
        { name: "Documentation", href: "#" },
        { name: "System Status", href: "#" },
        { name: "Community", href: "#" }
      ]
    },
    {
      title: "Resources",
      icon: <Globe className="w-4 h-4" />,
      links: [
        { name: "Case Studies", href: "#" },
        { name: "Templates", href: "#" },
        { name: "Partners", href: "#" },
        { name: "Developers", href: "#" }
      ]
    }
  ];

  return (
    <footer className={`
      ${isDark
        ? 'bg-slate-900 border-slate-800'
        : 'bg-slate-50 border-slate-200'
      } 
      border-t
    `}>
      <div className="container mx-auto px-2 py-4">

        {/* Single Grid Layout for All Screen Sizes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-4">

          {/* Brand Section - Takes full width on mobile, 2 columns on large screens */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <InboxlyLogo />
              <span className={`${isDark ? 'text-white' : 'text-slate-900'} text-xl font-bold`}>
                Inboxly
              </span>
            </div>
            <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'} text-sm leading-relaxed mb-6`}>
              The modern messaging platform built for developers and businesses.
              Connect, collaborate, and communicate seamlessly across teams.
            </p>

            {/* Newsletter Signup */}
            {/* <div className="space-y-3">
              <p className={`${isDark ? 'text-white' : 'text-slate-900'} font-medium text-sm`}>
                Stay updated
              </p>
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`
                    px-4 py-2 rounded-lg text-sm border transition-colors
                    ${isDark 
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:border-blue-500' 
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500'
                    }
                    focus:outline-none focus:ring-2 focus:ring-blue-500/20
                  `}
                />
                <button className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                  Subscribe
                </button>
              </div>
            </div> */}
          </div>
          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Footer Links - Each section takes 1 column */}
            {footerSections.map((section, index) => (
              <div key={index} className="lg:col-span-1">
                <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'} text-sm mb-3 flex items-center gap-2`}>
                  {section.icon}
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className={`
                        text-sm transition-colors
                        ${isDark
                            ? 'text-slate-400 hover:text-white'
                            : 'text-slate-600 hover:text-slate-900'
                          }
                      `}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`
          pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-4
          ${isDark ? 'border-slate-800' : 'border-slate-200'}
        `}>
          {/* Copyright and Legal Links */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm">
            <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              © {new Date().getFullYear()} Inboxly, Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs">
              <a href="#" className={`${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'} transition-colors`}>
                Privacy Policy
              </a>
              <a href="#" className={`${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'} transition-colors`}>
                Terms of Service
              </a>
              <a href="#" className={`${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'} transition-colors`}>
                Cookies
              </a>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://twitter.com/inboxly"
              className={`
                w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200
                ${isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white'
                  : 'bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 shadow-sm'
                }
                hover:scale-110 hover:shadow-lg
              `}
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/inboxly"
              className={`
                w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200
                ${isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white'
                  : 'bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 shadow-sm'
                }
                hover:scale-110 hover:shadow-lg
              `}
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="mailto:hello@inboxly.com"
              className={`
                w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200
                ${isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white'
                  : 'bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 shadow-sm'
                }
                hover:scale-110 hover:shadow-lg
              `}
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;