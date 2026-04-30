import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Progress } from '@/components/ui/progress.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FlightPathAnimation from '@/components/FlightPathAnimation.jsx';
import FlightControlPanel from '@/components/FlightControlPanel.jsx';
import { useFlightPreferences } from '@/hooks/useFlightPreferences.js';

export default function TimerPage() {
  const [duration, setDuration] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef(null);

  const {
    planeColor,
    setPlaneColor,
    startLocation,
    setStartLocation,
    destinationLocation,
    setDestinationLocation,
    setRandomRoute,
    isLoaded
  } = useFlightPreferences();

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsComplete(true);
            const sessions = parseInt(localStorage.getItem('studyflow-sessions') || '0', 10);
            localStorage.setItem('studyflow-sessions', String(sessions + 1));
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    if (timeLeft === 0) {
      setTimeLeft(duration * 60);
      setIsComplete(false);
    }
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(duration * 60);
    setIsComplete(false);
  };

  const handleDurationChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setDuration(value);
      if (!isRunning) {
        setTimeLeft(value * 60);
        setIsComplete(false);
      }
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  // Progress from 0 to 1 based on time elapsed
  // If timer is not running and we're at starting time, it's 0.
  // If completed, it's 1.
  const progress = isComplete ? 1 : (1 - (timeLeft / (duration * 60)));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{`Timer (${minutes}:${seconds.toString().padStart(2, '0')}) - StudyFlow`}</title>
        <meta name="description" content="Focus timer with interactive flight journey mapping." />
      </Helmet>

      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="text-center space-y-3">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Focus Journey</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Set your timer, pick your flight path, and focus until you reach your destination.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Timer & Controls */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Timer Card */}
              <div className="bg-card rounded-2xl p-8 shadow-lg border space-y-8">
                <div className="flex justify-between items-center text-sm font-medium text-muted-foreground border-b pb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Focus Block</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <label htmlFor="duration">Minutes:</label>
                    <Input
                      id="duration"
                      type="number"
                      min="1"
                      max="180"
                      value={duration}
                      onChange={handleDurationChange}
                      disabled={isRunning}
                      className="w-20 h-8 text-center text-foreground font-semibold"
                    />
                  </div>
                </div>

                <motion.div
                  className="flex justify-center"
                  animate={isRunning ? { scale: [1, 1.02, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className={`text-7xl sm:text-8xl font-extrabold tracking-tighter tabular-nums ${
                    isRunning ? 'text-primary' : 'text-foreground'
                  }`}>
                    {minutes}:{seconds.toString().padStart(2, '0')}
                  </div>
                </motion.div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-muted-foreground">
                    <span>{Math.round(progress * 100)}% Complete</span>
                    <span>{duration}m Total</span>
                  </div>
                  <Progress value={progress * 100} className="h-3 bg-secondary" />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                  {!isRunning ? (
                    <Button
                      size="lg"
                      onClick={handleStart}
                      className="w-full sm:w-auto h-12 px-8 text-base bg-primary hover:bg-primary/90 transition-all active:scale-95"
                    >
                      <Play className="h-5 w-5 mr-2" />
                      Start Journey
                    </Button>
                  ) : (
                    <Button
                      size="lg"
                      variant="secondary"
                      onClick={handlePause}
                      className="w-full sm:w-auto h-12 px-8 text-base transition-all active:scale-95"
                    >
                      <Pause className="h-5 w-5 mr-2" />
                      Pause
                    </Button>
                  )}
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handleReset}
                    className="w-full sm:w-auto h-12 px-8 text-base transition-all active:scale-95"
                  >
                    <RotateCcw className="h-5 w-5 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>

              {/* Journey Settings Card */}
              {isLoaded && (
                <FlightControlPanel 
                  planeColor={planeColor}
                  setPlaneColor={setPlaneColor}
                  startLocation={startLocation}
                  setStartLocation={setStartLocation}
                  destinationLocation={destinationLocation}
                  setDestinationLocation={setDestinationLocation}
                  setRandomRoute={setRandomRoute}
                  disabled={isRunning}
                />
              )}
            </div>

            {/* Right Column: Interactive Map */}
            <div className="lg:col-span-7 h-full min-h-[400px] lg:min-h-[600px] flex flex-col">
              {isLoaded && (
                <FlightPathAnimation 
                  startLocation={startLocation}
                  destinationLocation={destinationLocation}
                  planeColor={planeColor}
                  progress={progress}
                />
              )}
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}