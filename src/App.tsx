import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { OilAssistant } from './components/OilAssistant';
import { MOCK_VEHICLE, MOCK_HEALTH } from './utils/mockData';
import { useSensorData } from './hooks/useSensorData';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  BarChart3, 
  Bell, 
  User, 
  Settings,
  AlertCircle,
  Cpu,
  History,
  ShieldAlert,
  TrendingUp
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  LineChart,
  Line
} from 'recharts';
import { generateMockSensorHistory } from './utils/mockData';

const sensorHistory = generateMockSensorHistory(30);
const projectionData = [
  ...sensorHistory.slice(-10),
  { timestamp: Date.now() + 86400000 * 5, viscosity: 8.5, isProjection: true },
  { timestamp: Date.now() + 86400000 * 10, viscosity: 7.8, isProjection: true },
  { timestamp: Date.now() + 86400000 * 15, viscosity: 7.2, isProjection: true },
  { timestamp: Date.now() + 86400000 * 20, viscosity: 6.5, isProjection: true },
];

// Placeholder components for other pages
const Monitoring = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-white">Live Sensor Streams</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: 'Viscosity', value: '10.2', unit: 'cSt', icon: Activity, color: 'text-emerald-500' },
        { label: 'Temperature', value: '94.5', unit: '°C', icon: Activity, color: 'text-rose-500' },
        { label: 'Contamination', value: '0.42', unit: '%', icon: Activity, color: 'text-amber-500' },
        { label: 'Metal Particles', value: '14', unit: 'ppm', icon: Activity, color: 'text-zinc-400' },
      ].map((s, i) => (
        <div key={i} className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl">
          <div className="flex justify-between items-start mb-4">
            <div className={s.color}><s.icon className="w-5 h-5" /></div>
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Live</span>
          </div>
          <p className="text-3xl font-mono font-bold text-white">{s.value}<span className="text-sm font-normal text-zinc-500 ml-1">{s.unit}</span></p>
          <p className="text-xs text-zinc-500 mt-1">{s.label}</p>
        </div>
      ))}
    </div>
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
      <h3 className="text-lg font-bold text-white mb-6">Real-time Spectral Analysis</h3>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sensorHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
            <XAxis dataKey="timestamp" hide />
            <YAxis stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '12px' }}
              itemStyle={{ color: '#10b981' }}
            />
            <Area type="step" dataKey="metalParticles" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
            <Area type="step" dataKey="contamination" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

const Analytics = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-white">Predictive Analytics</h2>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
        <h3 className="text-lg font-bold text-white mb-6">Degradation Forecast (ML Projection)</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={projectionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis 
                dataKey="timestamp" 
                tickFormatter={(t) => new Date(t).toLocaleDateString()} 
                stroke="#52525b" 
                fontSize={10}
              />
              <YAxis stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '12px' }}
                labelFormatter={(t) => new Date(t).toLocaleDateString()}
              />
              <Line 
                type="monotone" 
                dataKey="viscosity" 
                stroke="#10b981" 
                strokeWidth={3} 
                dot={(props: any) => props.payload.isProjection ? <circle cx={props.cx} cy={props.cy} r={4} fill="#f43f5e" /> : null}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex gap-4 text-xs">
          <div className="flex items-center gap-2 text-zinc-400">
            <div className="w-3 h-0.5 bg-emerald-500" /> Historical Data
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <div className="w-3 h-0.5 bg-rose-500 border-t border-dashed" /> ML Projection
          </div>
        </div>
      </div>
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-6">
        <h3 className="text-lg font-bold text-white">Model Confidence</h3>
        <div className="flex flex-col items-center py-8">
          <div className="text-5xl font-bold text-emerald-500">98.2%</div>
          <p className="text-zinc-500 text-sm mt-2">Prediction Accuracy</p>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Data Points</span>
            <span className="text-white">1.2M</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Model Version</span>
            <span className="text-white">v4.1-Lube</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Alerts = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-white">System Alerts</h2>
    <div className="space-y-4">
      {[
        { title: 'Maintenance Due Soon', desc: 'Oil health dropped below 80%. Consider scheduling service in the next 1,000 km.', type: 'warning', date: '2 hours ago' },
        { title: 'Sensor Calibration', desc: 'Viscosity sensor recalibrated successfully.', type: 'info', date: '1 day ago' },
        { title: 'Anomaly Detected', desc: 'Brief temperature spike detected during high-load operation. No action required.', type: 'info', date: '3 days ago' },
      ].map((a, i) => (
        <div key={i} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex gap-4">
          <div className={a.type === 'warning' ? 'text-amber-500' : 'text-emerald-500'}>
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h4 className="font-bold text-white">{a.title}</h4>
              <span className="text-xs text-zinc-500">{a.date}</span>
            </div>
            <p className="text-sm text-zinc-400 mt-1">{a.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Profile = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-white">Vehicle Profile</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center">
            <Cpu className="w-8 h-8 text-emerald-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{MOCK_VEHICLE.make} {MOCK_VEHICLE.model}</h3>
            <p className="text-zinc-500">{MOCK_VEHICLE.year} • {MOCK_VEHICLE.vin}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-y-4 pt-4">
          <div>
            <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Engine</p>
            <p className="text-white">{MOCK_VEHICLE.engineType}</p>
          </div>
          <div>
            <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Oil Type</p>
            <p className="text-white">{MOCK_VEHICLE.oilType}</p>
          </div>
          <div>
            <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Mileage</p>
            <p className="text-white">{MOCK_VEHICLE.mileage.toLocaleString()} km</p>
          </div>
          <div>
            <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Usage Pattern</p>
            <p className="text-white">Performance / Daily</p>
          </div>
        </div>
      </div>
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
        <h3 className="text-lg font-bold text-white mb-6">Service History</h3>
        <div className="space-y-6">
          {[
            { date: 'Oct 15, 2023', type: 'Full Synthetic Oil Change', km: '10,240 km' },
            { date: 'Apr 12, 2023', type: 'Break-in Service', km: '2,000 km' },
          ].map((s, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-px bg-zinc-800 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{s.type}</p>
                <p className="text-xs text-zinc-500">{s.date} • {s.km}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Admin = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-white">System Administration</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl">
        <div className="flex items-center gap-3 mb-4">
          <ShieldAlert className="text-emerald-500 w-5 h-5" />
          <h3 className="font-bold text-white">Sensor Health</h3>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Viscosity Sensor</span>
            <span className="text-emerald-500 font-bold">ONLINE</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Temp Sensor</span>
            <span className="text-emerald-500 font-bold">ONLINE</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Particle Sensor</span>
            <span className="text-emerald-500 font-bold">ONLINE</span>
          </div>
        </div>
      </div>
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl">
        <div className="flex items-center gap-3 mb-4">
          <History className="text-emerald-500 w-5 h-5" />
          <h3 className="font-bold text-white">Uptime</h3>
        </div>
        <p className="text-3xl font-bold text-white">99.99%</p>
        <p className="text-xs text-zinc-500 mt-1">Last 30 days</p>
      </div>
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl">
        <div className="flex items-center gap-3 mb-4">
          <Cpu className="text-emerald-500 w-5 h-5" />
          <h3 className="font-bold text-white">Edge Processing</h3>
        </div>
        <p className="text-3xl font-bold text-white">12ms</p>
        <p className="text-xs text-zinc-500 mt-1">Average Latency</p>
      </div>
    </div>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const sensorData = useSensorData();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'monitoring': return <Monitoring />;
      case 'analytics': return <Analytics />;
      case 'alerts': return <Alerts />;
      case 'profile': return <Profile />;
      case 'admin': return <Admin />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-zinc-100 font-sans selection:bg-emerald-500/30">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="max-w-7xl mx-auto"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <OilAssistant context={{ vehicle: MOCK_VEHICLE, health: MOCK_HEALTH, currentSensors: sensorData }} />
    </div>
  );
}
