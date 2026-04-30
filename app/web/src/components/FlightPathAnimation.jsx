import React, { useEffect, useMemo } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Plane } from 'lucide-react';
import WorldMap from '@/components/WorldMap.jsx';
import { generateGreatCircleArc, mapCoordsToSVG } from '@/lib/cityData.js';

export default function FlightPathAnimation({ 
  startLocation, 
  destinationLocation, 
  planeColor = '#f59e0b',
  progress = 0 
}) {
  const motionProgress = useMotionValue(progress);

  useEffect(() => {
    // Ensure progress bounds between 0 and 1
    motionProgress.set(Math.min(Math.max(progress, 0), 1));
  }, [progress, motionProgress]);

  // Compute bezier curve data whenever locations change
  const arcData = useMemo(() => {
    return generateGreatCircleArc(startLocation.coordinates, destinationLocation.coordinates);
  }, [startLocation, destinationLocation]);

  const { cx, cy } = arcData.bezierControls;
  const start = arcData.bezierControls.start;
  const end = arcData.bezierControls.end;

  // Quadratic Bezier Math for Framer Motion Transform
  const planeX = useTransform(motionProgress, t => {
    return Math.pow(1-t, 2) * start.x + 2 * (1-t) * t * cx + Math.pow(t, 2) * end.x;
  });
  
  const planeY = useTransform(motionProgress, t => {
    return Math.pow(1-t, 2) * start.y + 2 * (1-t) * t * cy + Math.pow(t, 2) * end.y;
  });

  const planeRotate = useTransform(motionProgress, t => {
    const dx = 2 * (1-t) * (cx - start.x) + 2 * t * (end.x - cx);
    const dy = 2 * (1-t) * (cy - start.y) + 2 * t * (end.y - cy);
    return Math.atan2(dy, dx) * (180 / Math.PI);
  });

  return (
    <div className="w-full h-full min-h-[300px] md:min-h-[400px] bg-card rounded-2xl border shadow-sm relative overflow-hidden flex items-center justify-center">
      <WorldMap>
        {/* Background Flight Path */}
        <path 
          d={arcData.pathString} 
          fill="none" 
          stroke="hsl(var(--muted-foreground) / 0.2)" 
          strokeWidth="2" 
          strokeDasharray="6 6" 
          strokeLinecap="round"
        />

        {/* Active Flight Progress Trail */}
        <motion.path 
          d={arcData.pathString} 
          fill="none" 
          stroke={planeColor} 
          strokeWidth="3" 
          strokeLinecap="round"
          style={{ pathLength: motionProgress }}
          className="drop-shadow-sm"
        />

        {/* Start Point Highlight */}
        <g transform={`translate(${start.x}, ${start.y})`}>
          <circle cx="0" cy="0" r="4" fill={planeColor} className="opacity-80" />
          <circle cx="0" cy="0" r="10" fill="none" stroke={planeColor} strokeWidth="1.5" className="opacity-40" />
          <text y="-12" className="text-[12px] font-semibold fill-foreground/80 transition-opacity" textAnchor="middle">
            {startLocation.name}
          </text>
        </g>

        {/* End Point Highlight */}
        <g transform={`translate(${end.x}, ${end.y})`}>
          <circle cx="0" cy="0" r="4" fill="hsl(var(--muted-foreground))" className="opacity-60" />
          <circle cx="0" cy="0" r="10" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="2 2" className="opacity-40" />
          <text y="-12" className="text-[12px] font-semibold fill-foreground/80 transition-opacity" textAnchor="middle">
            {destinationLocation.name}
          </text>
        </g>

        {/* Animated Plane */}
        <motion.g 
          style={{ x: planeX, y: planeY, rotate: planeRotate }}
          className="drop-shadow-md z-10"
        >
          {/* Offset the icon so center is 0,0 and rotate 45deg to point right */}
          <g transform="translate(-12, -12) rotate(45, 12, 12)">
            <Plane size={24} fill={planeColor} color="white" strokeWidth={1.5} />
          </g>
        </motion.g>
      </WorldMap>
    </div>
  );
}