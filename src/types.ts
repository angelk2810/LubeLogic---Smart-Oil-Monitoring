export interface SensorData {
  timestamp: number;
  viscosity: number;
  temperature: number;
  contamination: number;
  metalParticles: number;
}

export interface OilHealthState {
  percentage: number;
  status: 'healthy' | 'monitor' | 'service';
  rulKm: number;
  rulDays: number;
  lastServiceDate: string;
  nextServiceEstimate: string;
}

export interface Alert {
  id: string;
  type: 'info' | 'warning' | 'critical';
  message: string;
  timestamp: string;
  read: boolean;
}

export interface VehicleInfo {
  id: string;
  make: string;
  model: string;
  year: number;
  engineType: string;
  oilType: string;
  vin: string;
  mileage: number;
}
