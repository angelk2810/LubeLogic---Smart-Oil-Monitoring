import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../utils/cn';

interface GaugeProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  status?: 'healthy' | 'monitor' | 'service';
}

export const HealthGauge: React.FC<GaugeProps> = ({ 
  value, 
  size = 200, 
  strokeWidth = 12,
  status = 'healthy' 
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  const colors = {
    healthy: '#10b981', // emerald-500
    monitor: '#f59e0b', // amber-500
    service: '#f43f5e', // rose-500
  };

  const currentColor = colors[status];

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-zinc-800"
        />
        {/* Progress Circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={currentColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-4xl font-bold font-mono tracking-tighter"
        >
          {Math.round(value)}%
        </motion.span>
        <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold">
          Oil Health
        </span>
      </div>
    </div>
  );
};
