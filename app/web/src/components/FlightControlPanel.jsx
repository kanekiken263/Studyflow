import React from 'react';
import { Shuffle, Plane, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { CITIES, calculateDistance } from '@/lib/cityData.js';

const COLOR_PRESETS = [
  { name: 'Amber', hex: '#f59e0b' },
  { name: 'Blue', hex: '#3b82f6' },
  { name: 'Red', hex: '#ef4444' },
  { name: 'Green', hex: '#10b981' },
  { name: 'Purple', hex: '#8b5cf6' },
  { name: 'Orange', hex: '#f97316' },
  { name: 'Cyan', hex: '#06b6d4' },
  { name: 'Pink', hex: '#ec4899' }
];

export default function FlightControlPanel({ 
  planeColor, 
  setPlaneColor, 
  startLocation, 
  setStartLocation, 
  destinationLocation, 
  setDestinationLocation,
  setRandomRoute,
  disabled = false
}) {
  const distance = calculateDistance(
    startLocation.coordinates.lat, 
    startLocation.coordinates.lng, 
    destinationLocation.coordinates.lat, 
    destinationLocation.coordinates.lng
  );

  const handleStartChange = (e) => {
    const city = CITIES.find(c => c.id === e.target.value);
    if (city && city.id !== destinationLocation.id) {
      setStartLocation(city);
    }
  };

  const handleDestChange = (e) => {
    const city = CITIES.find(c => c.id === e.target.value);
    if (city && city.id !== startLocation.id) {
      setDestinationLocation(city);
    }
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-4 border-b">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Plane className="w-5 h-5 text-primary" />
          Journey Settings
        </h3>
        <span className="text-sm font-medium bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
          {distance.toLocaleString()} km
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Route Selection */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Start Location
            </label>
            <div className="relative">
              <select 
                value={startLocation.id}
                onChange={handleStartChange}
                disabled={disabled}
                className="w-full appearance-none bg-background border border-input rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 transition-colors"
              >
                {CITIES.map(city => (
                  <option key={`start-${city.id}`} value={city.id} disabled={city.id === destinationLocation.id}>
                    {city.name} ({city.region})
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Destination
            </label>
            <div className="relative">
              <select 
                value={destinationLocation.id}
                onChange={handleDestChange}
                disabled={disabled}
                className="w-full appearance-none bg-background border border-input rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 transition-colors"
              >
                {CITIES.map(city => (
                  <option key={`dest-${city.id}`} value={city.id} disabled={city.id === startLocation.id}>
                    {city.name} ({city.region})
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full h-10 mt-2" 
            onClick={setRandomRoute}
            disabled={disabled}
          >
            <Shuffle className="w-4 h-4 mr-2" />
            Random Route
          </Button>
        </div>

        {/* Plane Customization */}
        <div className="space-y-4">
          <label className="text-sm font-medium text-muted-foreground">Plane Color</label>
          
          <div className="grid grid-cols-4 gap-2">
            {COLOR_PRESETS.map((preset) => (
              <button
                key={preset.hex}
                type="button"
                onClick={() => setPlaneColor(preset.hex)}
                disabled={disabled}
                className={`w-full aspect-square rounded-xl border-2 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center disabled:opacity-50 disabled:hover:scale-100 ${
                  planeColor === preset.hex ? 'border-primary ring-2 ring-primary ring-offset-2 ring-offset-card scale-105' : 'border-transparent'
                }`}
                style={{ backgroundColor: preset.hex }}
                aria-label={`Select ${preset.name} color`}
              />
            ))}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <div 
              className="w-10 h-10 rounded-lg border shadow-sm flex-shrink-0 flex items-center justify-center"
              style={{ backgroundColor: planeColor }}
            >
              <Plane className="w-5 h-5 text-white mix-blend-overlay opacity-80" />
            </div>
            <div className="flex-1 flex border rounded-lg overflow-hidden bg-background focus-within:ring-2 focus-within:ring-ring">
              <span className="px-3 py-2 text-sm text-muted-foreground bg-muted border-r font-mono">HEX</span>
              <input 
                type="text" 
                value={planeColor} 
                onChange={(e) => setPlaneColor(e.target.value)}
                disabled={disabled}
                maxLength={7}
                className="w-full px-3 py-2 text-sm font-mono focus:outline-none bg-transparent"
                placeholder="#000000"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}