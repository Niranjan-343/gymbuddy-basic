import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Dumbbell,
  Bot,
  PlayCircle,
  Activity,
  Flame,
  Zap
} from 'lucide-react';

export default function BottomNav() {
  const { activeTab, setActiveTab, activeWorkout } = useApp();

  const tabs = [
    {
      id: 'self-train',
      label: 'Self-Train',
      icon: Dumbbell,
      badge: null
    },
    {
      id: 'ai-coach',
      label: 'AI Coach',
      icon: Bot,
      badge: 'AI'
    },
    {
      id: 'live-floor',
      label: 'Live Floor',
      icon: PlayCircle,
      badge: activeWorkout ? 'Active' : null,
      isLiveHighlight: true
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: Activity,
      badge: null
    },
    {
      id: 'fuel-profile',
      label: 'Fuel & Profile',
      icon: Flame,
      badge: null
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0B0F17]/95 backdrop-blur-lg border-t border-apex-border px-2 py-1.5 sm:py-2 select-none">
      <div className="max-w-md mx-auto grid grid-cols-5 gap-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all relative ${
                isActive
                  ? 'text-apex-emerald font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {/* Active Indicator Top Glow */}
              {isActive && (
                <div className="absolute top-0 w-8 h-1 bg-apex-emerald rounded-full shadow-glow-emerald" />
              )}

              <div className="relative mt-0.5">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'
                  }`}
                />
                {tab.badge && (
                  <span
                    className={`absolute -top-1 -right-2 px-1 py-0.1 rounded text-[8px] font-mono font-bold leading-tight ${
                      tab.badge === 'Active'
                        ? 'bg-apex-emerald text-black shadow-glow-emerald animate-pulse'
                        : 'bg-apex-coral text-white'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </div>

              <span className="text-[10px] mt-1 font-mono tracking-tight truncate">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
