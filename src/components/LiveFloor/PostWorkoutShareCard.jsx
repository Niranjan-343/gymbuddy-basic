import React, { useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Trophy,
  Flame,
  Clock,
  Dumbbell,
  Share2,
  Download,
  CheckCircle2,
  X,
  Sparkles,
  Zap,
  TrendingUp
} from 'lucide-react';

export default function PostWorkoutShareCard({ summary, onClose }) {
  const { profile, showToast } = useApp();
  const cardRef = useRef(null);

  if (!summary) return null;

  const handleShare = async () => {
    const text = `🔥 Crushed ${summary.name} on GymBuddy AI!\n🏋️ Total Volume: ${summary.totalVolumeKg.toLocaleString()} kg\n⏱️ Duration: ${summary.durationMinutes} mins\n💪 Muscles Trained: ${summary.musclesTrained.join(', ')}\n#GymBuddy #StrengthProgress`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'GymBuddy Workout Summary',
          text
        });
      } catch (err) {
        // Fallback to clipboard
        navigator.clipboard.writeText(text);
        showToast('Workout stats copied to clipboard!', 'emerald');
      }
    } else {
      navigator.clipboard.writeText(text);
      showToast('Workout stats copied to clipboard!', 'emerald');
    }
  };

  const handleDownload = () => {
    // Generate an SVG-based downloadable image or data URL
    const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750" style="background:#0B0F17;font-family:sans-serif;">
        <rect width="600" height="750" fill="#0B0F17"/>
        <rect x="25" y="25" width="550" height="700" rx="24" fill="#131A26" stroke="#243147" stroke-width="2"/>
        <circle cx="60" cy="70" r="14" fill="#00E5A8"/>
        <text x="85" y="78" fill="#FFFFFF" font-size="22" font-weight="900" letter-spacing="1">GYMBUDDY AI</text>
        <text x="535" y="76" fill="#00E5A8" font-size="12" font-family="monospace" text-anchor="end">SESSION COMPLETE</text>
        
        <text x="50" y="140" fill="#94A3B8" font-size="14" font-family="monospace">${new Date(summary.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</text>
        <text x="50" y="175" fill="#FFFFFF" font-size="26" font-weight="bold">${summary.name}</text>
        
        <!-- Big Volume Display -->
        <rect x="50" y="210" width="500" height="130" rx="16" fill="#0B0F17" stroke="#243147"/>
        <text x="80" y="255" fill="#94A3B8" font-size="13" font-family="monospace">TOTAL TONNAGE MOVED</text>
        <text x="80" y="315" fill="#00E5A8" font-size="52" font-weight="900" font-family="monospace">${summary.totalVolumeKg.toLocaleString()}</text>
        <text x="320" y="315" fill="#94A3B8" font-size="24" font-family="monospace">KG</text>

        <!-- Metric Grid -->
        <rect x="50" y="360" width="240" height="100" rx="16" fill="#1C2536"/>
        <text x="75" y="395" fill="#94A3B8" font-size="12" font-family="monospace">DURATION</text>
        <text x="75" y="435" fill="#FFFFFF" font-size="30" font-weight="bold" font-family="monospace">${summary.durationMinutes} <tspan font-size="16" fill="#94A3B8">MINS</tspan></text>
        
        <rect x="310" y="360" width="240" height="100" rx="16" fill="#1C2536"/>
        <text x="335" y="395" fill="#94A3B8" font-size="12" font-family="monospace">SETS COMPLETED</text>
        <text x="335" y="435" fill="#FF5A36" font-size="30" font-weight="bold" font-family="monospace">${summary.completedSetsCount} <tspan font-size="16" fill="#94A3B8">SETS</tspan></text>

        <!-- Muscles Trained Heatmap -->
        <text x="50" y="495" fill="#94A3B8" font-size="13" font-family="monospace">TARGET ACTIVATION HEATMAP</text>
        <rect x="50" y="515" width="500" height="80" rx="14" fill="#0B0F17" stroke="#243147"/>
        <text x="75" y="560" fill="#00E5A8" font-size="18" font-weight="bold">${summary.musclesTrained.join('  •  ')}</text>

        <!-- Athlete Tag -->
        <line x1="50" y1="625" x2="550" y2="625" stroke="#243147"/>
        <text x="50" y="665" fill="#FFFFFF" font-size="14" font-weight="bold">${profile?.name || 'Aryan Varma'}</text>
        <text x="50" y="685" fill="#94A3B8" font-size="11" font-family="monospace">Power / Hypertrophy Engine • Calibrated in Basement Gym</text>
        <text x="550" y="675" fill="#FF5A36" font-size="14" font-weight="bold" text-anchor="end">PR LOGGED 🔥</text>
      </svg>
    `;

    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `gymbuddy-workout-${Date.now()}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Graphic Share Card downloaded (SVG)!', 'emerald');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-[#131A26] border border-apex-border rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden my-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#0B0F17]/80 hover:bg-apex-surface text-slate-400 hover:text-white border border-apex-border"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Share Card Outer Container */}
        <div ref={cardRef} className="p-6 sm:p-8 space-y-6 bg-gradient-to-b from-[#131A26] to-[#0B0F17]">
          {/* Header */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-apex-emerald/15 border border-apex-emerald/40 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-apex-emerald" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-apex-emerald uppercase tracking-widest">
                  Workout Crushed
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-apex-emerald animate-ping"></span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {summary.name}
              </h3>
            </div>
          </div>

          {/* Big Volume Hero Banner */}
          <div className="p-5 rounded-2xl bg-[#0B0F17] border border-apex-border relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-apex-emerald/10 to-transparent pointer-events-none" />
            <div className="text-xs font-mono uppercase text-slate-400 mb-1 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-apex-emerald" />
              Total Mechanical Tonnage
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-apex-emerald">
                {summary.totalVolumeKg.toLocaleString()}
              </span>
              <span className="text-base sm:text-lg font-mono text-apex-emerald font-bold">
                KG
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Surpassed baseline stimulus threshold for myofibrillar protein synthesis.
            </p>
          </div>

          {/* 3 Metric Pills */}
          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="p-3 rounded-2xl bg-[#1C2536] border border-apex-border">
              <div className="text-[10px] text-slate-400 font-mono flex items-center justify-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                Time
              </div>
              <div className="text-lg font-bold text-white font-mono mt-0.5">
                {summary.durationMinutes}m
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-[#1C2536] border border-apex-border">
              <div className="text-[10px] text-slate-400 font-mono flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-apex-emerald" />
                Hard Sets
              </div>
              <div className="text-lg font-bold text-apex-emerald font-mono mt-0.5">
                {summary.completedSetsCount}
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-[#1C2536] border border-apex-border">
              <div className="text-[10px] text-slate-400 font-mono flex items-center justify-center gap-1">
                <Flame className="w-3 h-3 text-apex-coral" />
                Est. Cal
              </div>
              <div className="text-lg font-bold text-apex-coral font-mono mt-0.5">
                ~{Math.round(summary.durationMinutes * 6.8)}
              </div>
            </div>
          </div>

          {/* New PR Badge if any */}
          {summary.newPRs && summary.newPRs.length > 0 ? (
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-apex-gold/20 via-apex-coral/15 to-transparent border border-apex-gold/40 space-y-1">
              <div className="flex items-center space-x-1.5 text-apex-gold text-xs font-bold font-mono">
                <Sparkles className="w-4 h-4 text-apex-gold" />
                <span>NEW ESTIMATED 1RM PERSONAL RECORD!</span>
              </div>
              {summary.newPRs.map((pr, idx) => (
                <div key={idx} className="text-xs text-white flex justify-between items-center pt-0.5">
                  <span className="font-semibold">{pr.exerciseName}</span>
                  <span className="font-mono text-apex-gold font-bold">
                    {pr.newE1RM} kg (+{pr.increaseKg} kg)
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-apex-surface/80 border border-apex-border flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-apex-emerald" />
                Progressive Overload Target Achieved
              </span>
              <span className="font-mono text-apex-emerald font-bold">+2.5kg Target Next</span>
            </div>
          )}

          {/* Muscle Heatmap Chips */}
          <div>
            <div className="text-[11px] font-mono uppercase text-slate-400 mb-2">
              Muscles Stimulated Today:
            </div>
            <div className="flex flex-wrap gap-2">
              {summary.musclesTrained.map((muscle) => (
                <span
                  key={muscle}
                  className="px-3 py-1 rounded-xl text-xs font-semibold bg-[#0B0F17] text-white border border-apex-coral/40 flex items-center gap-1.5 shadow-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-apex-coral animate-pulse" />
                  {muscle}
                </span>
              ))}
            </div>
          </div>

          {/* Share & Download Actions */}
          <div className="flex items-center gap-3 pt-3 border-t border-apex-border">
            <button
              onClick={handleShare}
              className="flex-1 py-3 px-4 rounded-xl bg-apex-emerald hover:bg-apex-emeraldDark text-black text-xs font-extrabold flex items-center justify-center gap-2 shadow-glow-emerald transition-all"
            >
              <Share2 className="w-4 h-4 fill-black" />
              <span>Share Workout Graphic</span>
            </button>
            <button
              onClick={handleDownload}
              className="py-3 px-4 rounded-xl bg-apex-surface hover:bg-slate-700 border border-apex-border text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-2 transition-all"
              title="Download Graphic as SVG"
            >
              <Download className="w-4 h-4" />
              <span>Save Card</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
