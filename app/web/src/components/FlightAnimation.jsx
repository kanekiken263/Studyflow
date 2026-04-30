import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useAnimationFrame } from 'framer-motion';
import { Plane, MapPin, Flag } from 'lucide-react';

export default function FlightAnimation({ progress = 0, isComplete = false, autoPlay = false }) {
  const navigate = useNavigate();
  
  // Motion value to track the normalized progress (0 to 1)
  const motionProgress = useMotionValue(0);

  // If autoPlay is true, loop the animation continuously
  useAnimationFrame((t) => {
    if (autoPlay && !isComplete) {
      // Loop every 10 seconds
      motionProgress.set((t % 10000) / 10000);
    }
  });

  // Sync with external progress when not auto-playing
  useEffect(() => {
    if (!autoPlay) {
      motionProgress.set(Math.min(Math.max(progress, 0), 1));
    }
  }, [progress, autoPlay, motionProgress]);

  // Quadratic Bezier Curve Math
  // P0 (Start) = { x: 60, y: 160 }
  // P1 (Control) = { x: 400, y: -40 }
  // P2 (End) = { x: 740, y: 160 }
  
  // x(t) = (1-t)^2 * 60 + 2(1-t)t * 400 + t^2 * 740
  // Simplified: x(t) = 60 + 680t
  const planeX = useTransform(motionProgress, t => 60 + 680 * t);
  
  // y(t) = (1-t)^2 * 160 + 2(1-t)t * -40 + t^2 * 160
  // Simplified: y(t) = 400t^2 - 400t + 160
  const planeY = useTransform(motionProgress, t => 400 * Math.pow(t, 2) - 400 * t + 160);
  
  // Derivative for rotation (tangent angle)
  // dx/dt = 680
  // dy/dt = 800t - 400
  // angle = atan2(dy, dx)
  const planeRotate = useTransform(motionProgress, t => {
    const dx = 680;
    const dy = 800 * t - 400;
    return Math.atan2(dy, dx) * (180 / Math.PI);
  });

  const handleInteraction = () => {
    navigate('/timer');
  };

  return (
    <div 
      onClick={handleInteraction}
      className="relative w-full max-w-4xl mx-auto aspect-[3/1] min-h-[200px] bg-[#1e3a8a] rounded-3xl overflow-visible shadow-2xl cursor-pointer group transition-transform duration-500 hover:scale-[1.02] hover:shadow-[0_20px_40px_-15px_rgba(30,58,138,0.5)]"
      role="button"
      aria-label="Navigate to Timer"
    >
      {/* Minimalist Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-3xl pointer-events-none" />
      
      <svg 
        viewBox="0 0 800 240" 
        className="w-full h-full overflow-visible drop-shadow-md"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background Dashed Path */}
        <path 
          d="M 60 160 Q 400 -40 740 160" 
          fill="none" 
          stroke="rgba(255,255,255,0.15)" 
          strokeWidth="3" 
          strokeDasharray="8 8" 
          strokeLinecap="round"
        />

        {/* Active Solid Path (Trail) */}
        <motion.path 
          d="M 60 160 Q 400 -40 740 160" 
          fill="none" 
          stroke="#f59e0b" 
          strokeWidth="4" 
          strokeLinecap="round"
          style={{ pathLength: motionProgress }}
          className="drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]"
        />

        {/* Start Marker */}
        <g transform="translate(60, 160)" className="text-white/80 group-hover:text-white transition-colors">
          <circle cx="0" cy="0" r="6" fill="currentColor" />
          <circle cx="0" cy="0" r="14" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-30" />
        </g>

        {/* Destination Marker */}
        <g transform="translate(740, 160)" className="text-[#f59e0b]">
          <circle cx="0" cy="0" r="6" fill="currentColor" />
          <circle cx="0" cy="0" r="16" fill="none" stroke="currentColor" strokeWidth="2" className="animate-pulse-subtle" />
        </g>

        {/* Animated Plane */}
        <motion.g 
          style={{ x: planeX, y: planeY, rotate: planeRotate }}
          className="text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
        >
          {/* 
            Lucide Plane points top-right (-45deg in SVG coords). 
            We rotate it +45deg so it points right (0deg) to align with our tangent math.
            We also translate it so its center is at 0,0.
          */}
          <g transform="translate(-16, -16) rotate(45, 16, 16)">
            <Plane size={32} fill="currentColor" strokeWidth={1.5} />
          </g>
        </motion.g>
      </svg>

      {/* HTML Overlays for Tooltips (Better accessibility and styling than SVG text) */}
      
      {/* Start Label */}
      <div className="absolute bottom-6 left-[7.5%] -translate-x-1/2 flex flex-col items-center opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <MapPin className="w-4 h-4 text-white mb-1" />
        <span className="text-xs font-semibold text-white uppercase tracking-wider">Start</span>
      </div>

      {/* Destination Label */}
      <div className="absolute bottom-6 right-[7.5%] translate-x-1/2 flex flex-col items-center opacity-80 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <Flag className="w-4 h-4 text-accent mb-1" />
        <span className="text-xs font-semibold text-accent uppercase tracking-wider">Goal</span>
      </div>

      {/* Interactive Plane Tooltip */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium shadow-xl transform -translate-y-8">
          {autoPlay ? "Click to start your journey" : "Keep going!"}
        </div>
      </div>
    </div>
  );
}