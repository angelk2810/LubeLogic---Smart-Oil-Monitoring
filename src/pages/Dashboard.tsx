import React from 'react';
import { 
  Droplets, 
  Thermometer, 
  AlertTriangle, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight,
  TrendingUp,
  ShieldCheck,
  Leaf,
  DollarSign
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { motion } from 'motion/react';
import { HealthGauge } from '../components/HealthGauge';
import { MOCK_HEALTH, MOCK_VEHICLE, generateMockSensorHistory } from '../utils/mockData';
import { format } from 'date-fns';

const sensorHistory = generateMockSensorHistory(14);

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">System Overview</h2>
          <p className="text-zinc-500 text-sm">Real-time diagnostics for {MOCK_VEHICLE.make} {MOCK_VEHICLE.model}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">System Live</span>
          </div>
          <div className="text-right">
            <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Last Sync</p>
            <p className="text-sm font-mono text-zinc-300">{format(new Date(), 'HH:mm:ss')}</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Health Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-12"
        >
          <HealthGauge value={MOCK_HEALTH.percentage} status={MOCK_HEALTH.status} size={240} />
          
          <div className="flex-1 space-y-6">
            <div>
              <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Status Analysis</h3>
              <p className="text-xl font-semibold text-white">Oil condition is optimal for current engine load.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">Remaining Life</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-white">{MOCK_HEALTH.rulKm}</span>
                  <span className="text-zinc-500 text-xs">km</span>
                </div>
              </div>
              <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">Est. Service</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-white">{MOCK_HEALTH.rulDays}</span>
                  <span className="text-zinc-500 text-xs">days</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 rounded-xl transition-colors text-sm">
                Schedule Service
              </button>
              <button className="flex-1 border border-zinc-700 hover:bg-zinc-800 text-white font-bold py-3 rounded-xl transition-colors text-sm">
                Full Report
              </button>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats Column */}
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Environmental Impact</h3>
              <Leaf className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-2xl font-bold text-white">12.4L</p>
                  <p className="text-xs text-zinc-500">Oil Saved (YTD)</p>
                </div>
                <div className="flex items-center text-emerald-500 text-xs font-bold">
                  <ArrowUpRight className="w-3 h-3" />
                  15%
                </div>
              </div>
              <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[65%]" />
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Cost Savings</h3>
              <DollarSign className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-2xl font-bold text-white">$420.50</p>
                  <p className="text-xs text-zinc-500">Estimated Savings</p>
                </div>
                <div className="flex items-center text-emerald-500 text-xs font-bold">
                  <ArrowUpRight className="w-3 h-3" />
                  $85.00
                </div>
              </div>
              <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[45%]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white font-bold">Viscosity Trend</h3>
              <p className="text-xs text-zinc-500">Kinematic Viscosity @ 100°C (cSt)</p>
            </div>
            <TrendingUp className="w-5 h-5 text-zinc-500" />
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sensorHistory}>
                <defs>
                  <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={(t) => format(t, 'MMM d')} 
                  stroke="#52525b" 
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#52525b" 
                  fontSize={10} 
                  tickLine={false}
                  axisLine={false}
                  domain={['dataMin - 1', 'dataMax + 1']}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '12px' }}
                  labelStyle={{ color: '#71717a' }}
                  itemStyle={{ color: '#10b981' }}
                  labelFormatter={(t) => format(t, 'MMM d, yyyy')}
                />
                <Area 
                  type="monotone" 
                  dataKey="viscosity" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorVis)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white font-bold">Contamination Levels</h3>
              <p className="text-xs text-zinc-500">Particle count & moisture (ppm)</p>
            </div>
            <Droplets className="w-5 h-5 text-zinc-500" />
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sensorHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={(t) => format(t, 'MMM d')} 
                  stroke="#52525b" 
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#52525b" 
                  fontSize={10} 
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '12px' }}
                  labelStyle={{ color: '#71717a' }}
                  itemStyle={{ color: '#f59e0b' }}
                  labelFormatter={(t) => format(t, 'MMM d, yyyy')}
                />
                <Bar dataKey="contamination" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
