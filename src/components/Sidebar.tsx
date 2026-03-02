import React from 'react';
import { 
  LayoutDashboard, 
  Activity, 
  BarChart3, 
  Bell, 
  User, 
  Settings, 
  LogOut,
  Zap
} from 'lucide-react';
import { cn } from '../utils/cn';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'monitoring', icon: Activity, label: 'Live Monitoring' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'alerts', icon: Bell, label: 'Alerts' },
    { id: 'profile', icon: User, label: 'Vehicle Profile' },
    { id: 'admin', icon: Settings, label: 'Admin Panel' },
  ];

  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
          <Zap className="text-black w-6 h-6 fill-current" />
        </div>
        <div>
          <h1 className="text-white font-bold tracking-tight leading-none">LubeLogic</h1>
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Systems v2.4</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
              activeTab === item.id 
                ? "bg-zinc-900 text-white shadow-sm" 
                : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 transition-colors",
              activeTab === item.id ? "text-emerald-500" : "group-hover:text-zinc-300"
            )} />
            <span className="font-medium text-sm">{item.label}</span>
            {activeTab === item.id && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500" />
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-zinc-900">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-rose-400 transition-colors rounded-xl">
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
