export const CITIES = [
  { id: 'nyc', name: 'New York', region: 'North America', coordinates: { lat: 40.7128, lng: -74.0060 } },
  { id: 'lon', name: 'London', region: 'Europe', coordinates: { lat: 51.5074, lng: -0.1278 } },
  { id: 'tyo', name: 'Tokyo', region: 'Asia', coordinates: { lat: 35.6762, lng: 139.6503 } },
  { id: 'syd', name: 'Sydney', region: 'Oceania', coordinates: { lat: -33.8688, lng: 151.2093 } },
  { id: 'par', name: 'Paris', region: 'Europe', coordinates: { lat: 48.8566, lng: 2.3522 } },
  { id: 'dxb', name: 'Dubai', region: 'Middle East', coordinates: { lat: 25.2048, lng: 55.2708 } },
  { id: 'sin', name: 'Singapore', region: 'Asia', coordinates: { lat: 1.3521, lng: 103.8198 } },
  { id: 'bom', name: 'Mumbai', region: 'Asia', coordinates: { lat: 19.0760, lng: 72.8777 } },
  { id: 'gru', name: 'São Paulo', region: 'South America', coordinates: { lat: -23.5505, lng: -46.6333 } },
  { id: 'mex', name: 'Mexico City', region: 'North America', coordinates: { lat: 19.4326, lng: -99.1332 } },
  { id: 'cai', name: 'Cairo', region: 'Africa', coordinates: { lat: 30.0444, lng: 31.2357 } },
  { id: 'bkk', name: 'Bangkok', region: 'Asia', coordinates: { lat: 13.7563, lng: 100.5018 } },
  { id: 'ist', name: 'Istanbul', region: 'Europe/Asia', coordinates: { lat: 41.0082, lng: 28.9784 } },
  { id: 'hkg', name: 'Hong Kong', region: 'Asia', coordinates: { lat: 22.3193, lng: 114.1694 } },
  { id: 'lax', name: 'Los Angeles', region: 'North America', coordinates: { lat: 34.0522, lng: -118.2437 } }
];

export function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
    
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return Math.round(R * c);
}

// Map latitude/longitude to a 1000x500 SVG ViewBox coordinates
export function mapCoordsToSVG(lat, lng) {
  // Simple Equirectangular projection mapping
  const x = (lng + 180) * (1000 / 360);
  const y = (90 - lat) * (500 / 180);
  return { x, y };
}

// Generate points for a great circle path visually optimized for flat SVG map
export function generateGreatCircleArc(startCoords, endCoords, points = 50) {
  const start = mapCoordsToSVG(startCoords.lat, startCoords.lng);
  const end = mapCoordsToSVG(endCoords.lat, endCoords.lng);
  
  // Calculate a control point to create a beautiful Bezier curve arching upwards
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  
  // Base offset on distance to make longer flights arch higher
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  // Determine if we are wrapping around the map (e.g. Asia to America)
  // If distance on X is > 500, it's crossing the Pacific. We'll simplify by limiting the curve.
  let isWrapping = Math.abs(dx) > 500;
  
  let cx, cy;
  
  if (isWrapping) {
    // If wrapping, we'll just draw a direct or slightly curved line for simplicity in this visual
    cx = (start.x + end.x) / 2;
    cy = (start.y + end.y) / 2 - (distance * 0.1);
  } else {
    // Normal curving
    cx = (start.x + end.x) / 2;
    // Arch upwards (negative Y in SVG)
    cy = (start.y + end.y) / 2 - (distance * 0.3);
  }

  // Generate intermediate points along the Quadratic Bezier curve
  const pathPoints = [];
  for (let i = 0; i <= points; i++) {
    const t = i / points;
    const x = Math.pow(1-t, 2) * start.x + 2 * (1-t) * t * cx + Math.pow(t, 2) * end.x;
    const y = Math.pow(1-t, 2) * start.y + 2 * (1-t) * t * cy + Math.pow(t, 2) * end.y;
    pathPoints.push({ x, y });
  }

  return {
    pathString: `M ${start.x} ${start.y} Q ${cx} ${cy} ${end.x} ${end.y}`,
    pathPoints,
    bezierControls: { start, end, cx, cy }
  };
}