import { addDays, format, subDays } from 'date-fns';
import { SensorData, OilHealthState, Alert, VehicleInfo } from '../types';

export const generateMockSensorHistory = (days: number = 30): SensorData[] => {
  const data: SensorData[] = [];
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = subDays(now, i);
    data.push({
      timestamp: date.getTime(),
      viscosity: 12 + Math.random() * 2 - (i / days) * 2, // Degrading over time
      temperature: 85 + Math.random() * 10,
      contamination: 0.1 + (i / days) * 0.8 + Math.random() * 0.1,
      metalParticles: Math.max(0, (i / days) * 50 - 20 + Math.random() * 10),
    });
  }
  return data;
};

export const MOCK_VEHICLE: VehicleInfo = {
  id: 'V-8829-X',
  make: 'Porsche',
  model: '911 Carrera S',
  year: 2023,
  engineType: '3.0L Twin-Turbo Flat-6',
  oilType: '0W-40 Synthetic (C40)',
  vin: 'WP0AB2A9XPS2XXXXX',
  mileage: 12450,
};

export const MOCK_HEALTH: OilHealthState = {
  percentage: 78,
  status: 'healthy',
  rulKm: 4200,
  rulDays: 45,
  lastServiceDate: '2023-10-15',
  nextServiceEstimate: format(addDays(new Date(), 45), 'yyyy-MM-dd'),
};

export const MOCK_ALERTS: Alert[] = [
  {
    id: '1',
    type: 'info',
    message: 'Oil analysis complete. Condition is stable.',
    timestamp: subDays(new Date(), 1).toISOString(),
    read: true,
  },
  {
    id: '2',
    type: 'warning',
    message: 'Slight increase in viscosity detected. Monitoring...',
    timestamp: subDays(new Date(), 3).toISOString(),
    read: true,
  }
];
