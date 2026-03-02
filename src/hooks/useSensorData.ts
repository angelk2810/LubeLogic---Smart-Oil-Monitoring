import { useState, useEffect } from 'react';
import { SensorData } from '../types';

export function useSensorData() {
  const [currentData, setCurrentData] = useState<SensorData>({
    timestamp: Date.now(),
    viscosity: 10.5,
    temperature: 92,
    contamination: 0.4,
    metalParticles: 12,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentData(prev => ({
        timestamp: Date.now(),
        viscosity: prev.viscosity + (Math.random() - 0.5) * 0.1,
        temperature: 90 + Math.random() * 5,
        contamination: prev.contamination + Math.random() * 0.01,
        metalParticles: prev.metalParticles + (Math.random() > 0.9 ? 1 : 0),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return currentData;
}
