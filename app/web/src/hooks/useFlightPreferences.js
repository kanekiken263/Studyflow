import { useState, useEffect } from 'react';
import { CITIES } from '@/lib/cityData.js';

export function useFlightPreferences() {
  const [planeColor, setPlaneColor] = useState('#f59e0b');
  const [startLocation, setStartLocation] = useState(CITIES[0]);
  const [destinationLocation, setDestinationLocation] = useState(CITIES[1]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const savedColor = localStorage.getItem('studyflow-plane-color');
      const savedStartId = localStorage.getItem('studyflow-start-location');
      const savedDestId = localStorage.getItem('studyflow-dest-location');

      if (savedColor) setPlaneColor(savedColor);
      
      if (savedStartId) {
        const city = CITIES.find(c => c.id === savedStartId);
        if (city) setStartLocation(city);
      }
      
      if (savedDestId) {
        const city = CITIES.find(c => c.id === savedDestId);
        if (city) setDestinationLocation(city);
      }
    } catch (error) {
      console.warn('Failed to load flight preferences', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to local storage whenever preferences change
  useEffect(() => {
    if (!isLoaded) return;
    
    try {
      localStorage.setItem('studyflow-plane-color', planeColor);
      localStorage.setItem('studyflow-start-location', startLocation.id);
      localStorage.setItem('studyflow-dest-location', destinationLocation.id);
    } catch (error) {
      console.warn('Failed to save flight preferences', error);
    }
  }, [planeColor, startLocation, destinationLocation, isLoaded]);

  const setRandomRoute = () => {
    const randomStart = CITIES[Math.floor(Math.random() * CITIES.length)];
    let randomDest = CITIES[Math.floor(Math.random() * CITIES.length)];
    
    // Ensure destination is different from start
    while (randomDest.id === randomStart.id) {
      randomDest = CITIES[Math.floor(Math.random() * CITIES.length)];
    }
    
    setStartLocation(randomStart);
    setDestinationLocation(randomDest);
  };

  return {
    planeColor,
    setPlaneColor,
    startLocation,
    setStartLocation,
    destinationLocation,
    setDestinationLocation,
    setRandomRoute,
    isLoaded
  };
}