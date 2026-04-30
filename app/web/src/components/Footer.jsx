import React from 'react';
import { GraduationCap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t bg-muted text-muted-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            <span className="font-semibold">StudyFlow</span>
          </div>

          <p className="text-sm">
            © 2026 StudyFlow. Focus better, achieve more.
          </p>

          <div className="flex items-center gap-4 text-sm">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}