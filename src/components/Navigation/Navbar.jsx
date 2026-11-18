import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Activity,
  Volume2,
  VolumeX,
  Sparkles,
  User,
  Zap,
  Play,
  RotateCcw
} from 'lucide-react';

export default function Navbar() {
  const {
    activeWorkout,
    activeTab,
    setActiveTab,
    setIsOnboardingOpen,
    loadSampleAthleteData,
    voiceCoachEnabled,
    setVoiceCoachEnabled,
    profile,
    showToast
  } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-[#0B0F17]/90 backdrop-blur-md border-b border-apex-border px-4 sm:px-6 py-3 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div
          onClick={() => setActiveTab('self-train')}
          className="flex items-center space-x-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-apex-emerald/15 border border-apex-emerald/40 flex items-center justify-center shadow-glow-emerald group-hover:scale-105 transition-transform">
            <Zap className="w-5 h-5 text-apex-emerald fill-apex-emerald" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-base sm:text-lg font-black tracking-tight text-white">
                GymBuddy
              </span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-apex-emerald text-black">
                AI
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono -mt-0.5 tracking-wider hidden sm:block">
              Intelligent Self-Training & Gym Floor Companion
            </p>
          </div>
        </div>

        {/* Center / Right Status & Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Active Workout Floor Badge */}
          {activeWorkout && (
            <button
              onClick={() => setActiveTab('live-floor')}
              className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 text-xs font-mono font-bold transition-all ${
                activeTab === 'live-floor'
                  ? 'bg-apex-emerald text-black border-apex-emerald shadow-glow-emerald'
                  : 'bg-apex-emerald/15 text-apex-emerald border-apex-emerald/40 hover:bg-apex-emerald/25'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-apex-emerald animate-ping" />
              <span>Live Floor Active</span>
            </button>
          )}

          {/* Load Sample Athlete Data Fast Button */}
          <button
            onClick={loadSampleAthleteData}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#131A26] hover:bg-apex-surface border border-apex-border hover:border-apex-emerald text-slate-300 hover:text-white text-xs font-mono transition-all"
            title="Load 4-Week History, PRs, and Fatigue Landmarks for Demo Preview"
          >
            <Sparkles className="w-3.5 h-3.5 text-apex-emerald" />
            <span>Load Sample Data</span>
          </button>

          {/* Voice Coach Audio Toggle */}
          <button
            onClick={() => {
              setVoiceCoachEnabled(!voiceCoachEnabled);
              showToast(
                !voiceCoachEnabled ? 'Voice Coach Enabled (Web Speech)' : 'Voice Coach Muted',
                !voiceCoachEnabled ? 'emerald' : 'coral'
              );
            }}
            className={`p-2 rounded-xl border transition-all ${
              voiceCoachEnabled
                ? 'bg-apex-emerald/15 border-apex-emerald text-apex-emerald shadow-glow-emerald'
                : 'bg-[#131A26] border-apex-border text-slate-400 hover:text-white'
            }`}
            title="Voice Coach Web Speech toggle"
          >
            {voiceCoachEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Profile & Onboarding Settings */}
          <button
            onClick={() => setIsOnboardingOpen(true)}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-[#131A26] hover:bg-apex-surface border border-apex-border hover:border-slate-500 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-all"
            title="Open Calibration & Biometrics Profile"
          >
            <User className="w-4 h-4 text-apex-emerald" />
            <span className="hidden sm:inline font-mono">{profile?.name || 'Athlete'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
