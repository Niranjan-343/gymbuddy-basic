import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EXERCISES } from '../../data/exercises';
import ExerciseDiagram from '../FormIllustrations/ExerciseDiagram';
import {
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Zap,
  Play,
  ArrowRightLeft,
  ChevronDown,
  Info,
  ShieldAlert
} from 'lucide-react';

export default function ExerciseCard({
  exercise,
  onStartWithExercise,
  onAskCoachAboutExercise,
  isLiveMode = false,
  onSwapInActiveWorkout = null,
  activeWorkoutIndex = null
}) {
  const { profile, showToast } = useApp();
  const [isSwapDropdownOpen, setIsSwapDropdownOpen] = useState(false);

  // Check if exercise conflicts with user's injury constraints
  const injuryConflicts = (exercise.jointStress || []).filter((joint) =>
    (profile?.injuries || []).includes(joint)
  );
  const hasInjuryWarning = injuryConflicts.length > 0;

  // Resistance profile metadata
  const resistanceBadgeInfo = {
    lengthened: {
      label: 'Lengthened Stretch Overload',
      bg: 'bg-emerald-500/10 text-apex-emerald border-apex-emerald/30',
      description: 'Maximum mechanical tension at end range (stretch-mediated hypertrophy)'
    },
    shortened: {
      label: 'Shortened Peak Contraction',
      bg: 'bg-apex-coral/10 text-apex-coral border-apex-coral/30',
      description: 'Maximum mechanical tension at peak muscular squeeze'
    },
    constant: {
      label: 'Constant Tension Profile',
      bg: 'bg-apex-cyan/10 text-apex-cyan border-apex-cyan/30',
      description: 'Smooth resistance curve across entire range of motion'
    }
  };

  const resistanceStyle =
    resistanceBadgeInfo[exercise.resistanceProfile] || resistanceBadgeInfo.constant;

  // Find equivalent swap options
  const swapOptions = (exercise.swaps || [])
    .map((swapId) => EXERCISES.find((e) => e.id === swapId))
    .filter(Boolean);

  const handleSwapClick = (newExerciseId) => {
    setIsSwapDropdownOpen(false);
    if (onSwapInActiveWorkout && activeWorkoutIndex !== null) {
      onSwapInActiveWorkout(activeWorkoutIndex, newExerciseId);
    } else {
      showToast(`Selected equivalent swap: ${EXERCISES.find((e) => e.id === newExerciseId)?.name}`, 'emerald');
    }
  };

  return (
    <div className="bg-apex-card border border-apex-border rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-slate-600 transition-all shadow-card-dark relative group">
      {/* Top Bar: Muscle & Equipment badges + Bottleneck Swapper */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-[#0B0F17] text-white border border-apex-border">
              {exercise.muscleGroup}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-apex-surface text-slate-300 border border-apex-border">
              {exercise.equipment}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-mono border ${resistanceStyle.bg}`}
              title={resistanceStyle.description}
            >
              {exercise.resistanceProfile.toUpperCase()}
            </span>
          </div>

          {/* 1-Tap Machine Bottleneck Swapper */}
          <div className="relative">
            <button
              onClick={() => setIsSwapDropdownOpen(!isSwapDropdownOpen)}
              className="px-2.5 py-1 rounded-lg bg-[#0B0F17] hover:bg-apex-surface border border-apex-border hover:border-apex-emerald text-[11px] font-mono text-slate-300 hover:text-white flex items-center gap-1.5 transition-all shadow-sm"
              title="Replace immediately if this gym machine or barbell rack is occupied"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-apex-emerald" />
              <span className="hidden sm:inline">Swap (Machine Busy)</span>
              <span className="sm:hidden">Swap</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {/* Dropdown Menu for Swaps */}
            {isSwapDropdownOpen && (
              <div className="absolute right-0 top-8 mt-1 w-64 bg-[#131A26] border border-apex-emerald/50 rounded-xl shadow-2xl p-2 z-50 animate-fade-in">
                <div className="text-[10px] font-mono uppercase text-slate-400 px-2 py-1 border-b border-apex-border mb-1">
                  Biomechanically Equivalent Swaps:
                </div>
                {swapOptions.length > 0 ? (
                  swapOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleSwapClick(opt.id)}
                      className="w-full text-left p-2 rounded-lg hover:bg-apex-surface text-xs text-slate-200 hover:text-white flex items-center justify-between transition-colors"
                    >
                      <div>
                        <div className="font-semibold">{opt.name}</div>
                        <div className="text-[10px] text-slate-400 uppercase font-mono">
                          {opt.equipment} • {opt.resistanceProfile}
                        </div>
                      </div>
                      <span className="text-[10px] text-apex-emerald font-mono">Match</span>
                    </button>
                  ))
                ) : (
                  <div className="p-2 text-xs text-slate-400">No direct swaps defined</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Exercise Title */}
        <h4 className="text-base sm:text-lg font-bold text-white tracking-tight mb-0.5">
          {exercise.name}
        </h4>
        <p className="text-xs text-slate-400 mb-3 font-mono">
          Focus: <span className="text-slate-300">{exercise.subTarget}</span>
        </p>

        {/* Injury Warning Badge if applicable */}
        {hasInjuryWarning && (
          <div className="mb-3 p-2 rounded-xl bg-apex-coral/10 border border-apex-coral/30 flex items-center gap-2 text-xs text-apex-coral font-medium">
            <ShieldAlert className="w-4 h-4 shrink-0 text-apex-coral" />
            <span>
              Joint Caution: Flags your profile's {injuryConflicts.join(', ')} sensitivity. Consider using the 1-Tap Swapper above.
            </span>
          </div>
        )}

        {/* Dual-Phase SVG Form Illustration */}
        <div className="mb-4">
          <ExerciseDiagram
            type={exercise.diagramType}
            muscleGroup={exercise.muscleGroup}
          />
        </div>

        {/* Execution Checklist (3 Crisp Form Cues) */}
        <div className="space-y-1.5 mb-3 bg-[#0B0F17]/80 p-3 rounded-xl border border-apex-border/70">
          <div className="text-[10px] font-mono uppercase tracking-wider text-apex-emerald font-bold mb-1 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-apex-emerald" />
            Apex Form Execution Checklist
          </div>
          {exercise.cues.map((cue, idx) => (
            <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-apex-emerald shrink-0 mt-0.5" />
              <span>{cue}</span>
            </div>
          ))}
        </div>

        {/* Common Mistake Warning Badge */}
        <div className="p-2.5 rounded-xl bg-[#1C2536] border border-apex-coral/20 flex items-start gap-2 mb-4">
          <AlertTriangle className="w-3.5 h-3.5 text-apex-coral shrink-0 mt-0.5" />
          <div className="text-[11px] leading-tight text-slate-300">
            <span className="font-bold text-apex-coral font-mono mr-1">Avoid:</span>
            {exercise.commonMistake}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center gap-2 pt-2 border-t border-apex-border">
        <button
          onClick={() => onStartWithExercise && onStartWithExercise(exercise)}
          className="flex-1 py-2 px-3 rounded-xl bg-apex-emerald hover:bg-apex-emeraldDark text-black font-bold text-xs tracking-wide flex items-center justify-center gap-1.5 transition-all shadow-glow-emerald"
        >
          <Play className="w-3.5 h-3.5 fill-black" />
          <span>Start Lift</span>
        </button>

        <button
          onClick={() => onAskCoachAboutExercise && onAskCoachAboutExercise(exercise)}
          className="py-2 px-3 rounded-xl bg-apex-surface hover:bg-slate-700 border border-apex-border text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
          title="Ask AI Coach about biomechanics, setup, or alternatives for this lift"
        >
          <Sparkles className="w-3.5 h-3.5 text-apex-emerald" />
          <span>Ask Coach</span>
        </button>
      </div>
    </div>
  );
}
