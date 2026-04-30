import React from 'react';
import { CITIES, mapCoordsToSVG } from '@/lib/cityData.js';

export default function WorldMap({ children }) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-transparent">
      <svg 
        viewBox="0 0 1000 500" 
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Simplified abstract grid map representation */}
        <g className="map-land-fill">
          {/* North America */}
          <path d="M 150 100 Q 250 50 300 150 Q 280 220 220 250 Q 150 200 150 100 Z" />
          {/* South America */}
          <path d="M 280 250 Q 350 280 330 380 Q 290 420 270 350 Z" />
          {/* Europe & Africa */}
          <path d="M 450 100 Q 550 80 580 180 Q 550 220 480 200 Z" />
          <path d="M 480 200 Q 580 220 550 350 Q 480 380 450 280 Z" />
          {/* Asia */}
          <path d="M 580 100 Q 750 50 850 150 Q 800 250 650 220 Q 580 180 580 100 Z" />
          {/* Oceania */}
          <path d="M 800 350 Q 880 330 900 400 Q 850 450 800 350 Z" />
        </g>

        {/* City Markers */}
        {CITIES.map(city => {
          const { x, y } = mapCoordsToSVG(city.coordinates.lat, city.coordinates.lng);
          return (
            <g key={city.id} className="group transition-all cursor-pointer">
              <circle cx={x} cy={y} r="4" className="fill-muted-foreground/30 group-hover:fill-primary transition-colors" />
              {/* City Tooltip trigger area */}
              <circle cx={x} cy={y} r="15" fill="transparent" />
              <text 
                x={x} 
                y={y - 10} 
                className="text-[10px] fill-foreground font-medium opacity-0 group-hover:opacity-100 transition-opacity text-anchor-middle"
                textAnchor="middle"
              >
                {city.name}
              </text>
            </g>
          );
        })}

        {/* Render Flight Paths or planes over the map */}
        {children}
      </svg>
    </div>
  );
}