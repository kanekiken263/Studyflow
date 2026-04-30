import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FlightAnimation from '@/components/FlightAnimation.jsx';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>StudyFlow - Your Journey to Mastery</title>
        <meta name="description" content="Track your study time, get instant AI answers, and build consistent learning habits that stick." />
      </Helmet>

      <Header />

      <main className="flex-1 relative flex flex-col items-center justify-center min-h-[100dvh] -mt-16 pt-24 pb-12 overflow-hidden">
        {/* Cinematic Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/95 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.12)_0%,transparent_60%)] dark:bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.2)_0%,transparent_60%)]" />
        </div>

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto flex flex-col items-center text-center space-y-12">
          
          {/* Hero Typography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="space-y-6 max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm border border-primary/20 mb-4">
              <BookOpen className="w-4 h-4" />
              <span>Smart learning companion</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground text-balance">
              Your Journey to <span className="text-accent relative whitespace-nowrap">Mastery<svg className="absolute -bottom-2 left-0 w-full h-3 text-accent/30" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" /></svg></span> Starts Here
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance mx-auto">
              Track your study time, get instant AI answers, and build consistent learning habits that stick. Watch your progress take flight.
            </p>
          </motion.div>

          {/* Centerpiece Flight Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="w-full max-w-5xl mx-auto shadow-2xl rounded-3xl overflow-hidden border border-primary/20 bg-card/50 backdrop-blur-sm p-2"
          >
            <FlightAnimation autoPlay={true} />
          </motion.div>

          {/* Primary Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="pt-4"
          >
            <Button 
              asChild 
              size="lg" 
              className="h-14 px-10 text-lg rounded-full bg-primary text-primary-foreground hover:bg-primary/90 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_hsl(var(--primary))] transition-all duration-300"
            >
              <Link to="/timer" className="flex items-center gap-2 group">
                Start Studying
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <p className="mt-4 text-sm text-muted-foreground font-medium">
              No credit card required. Free forever.
            </p>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
}