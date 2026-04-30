import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, GraduationCap } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext.jsx';
import { Button } from '@/components/ui/button';

export default function Header() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/timer', label: 'Timer' },
    { path: '/todo', label: 'To-Do' },
    { path: '/chatbot', label: 'Chatbot' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              StudyFlow
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground/80 hover:text-foreground hover:bg-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="transition-all duration-200 hover:bg-muted"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </div>

        <nav className="md:hidden flex items-center gap-1 pb-3 overflow-x-auto">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                location.pathname === link.path
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground/80 hover:text-foreground hover:bg-muted'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}