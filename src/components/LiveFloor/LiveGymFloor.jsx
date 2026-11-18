import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { EXERCISES } from '../../data/exercises';
import ExerciseDiagram from '../FormIllustrations/ExerciseDiagram';
import PostWorkoutShareCard from './PostWorkoutShareCard';
import { fireConfetti } from '../../utils/confetti';
import {
  Play,
  Pause,
  RotateCcw,
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  Volume2,
  VolumeX,
  Users,
  Trophy,
  ArrowRightLeft,
  ChevronDown,
  ChevronUp,
  Flame,
  Zap,
  Activity,
  AlertCircle,
  Sparkles,
  Info
} from 'lucide-react';

export default function LiveGymFloor() {
  const {
    activeWorkout,
    updateSet,
    addSet,
    removeSet,
    swapExerciseInActiveWorkout,
    finishActiveWorkout,
    voiceCoachEnabled,
    setVoiceCoachEnabled,
    speakVoiceCue,
    isPartnerSyncActive,
    setIsPartnerSyncActive,
    completedWorkoutSummary,
    setCompletedWorkoutSummary,
    showToast
  } = useApp();

  // Rest Timer State
  const [restSecondsRemaining, setRestSecondsRemaining] = useState(0);
  const [initialRestSeconds, setInitialRestSeconds] = useState(90);
  const [isRestTimerRunning, setIsRestTimerRunning] = useState(false);
  const restTimerRef = useRef(null);

  // Active Exercise Selected / Expanded index
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);

  // Warm-up Drawer Collapse State
  const [isWarmupOpen, setIsWarmupOpen] = useState(true);

  // Gym Partner State
  const [partnerSets, setPartnerSets] = useState([
    { exerciseId: 'ex-1', weight: 60, reps: 10, rpe: 8, completed: false },
    { exerciseId: 'ex-1', weight: 60, reps: 10, rpe: 8, completed: false },
    { exerciseId: 'ex-1', weight: 60, reps: 8, rpe: 8.5, completed: false }
  ]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (restTimerRef.current) clearInterval(restTimerRef.current);
    };
  }, []);

  // Timer Countdown Effect
  useEffect(() => {
    if (isRestTimerRunning && restSecondsRemaining > 0) {
      restTimerRef.current = setInterval(() => {
        setRestSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(restTimerRef.current);
            setIsRestTimerRunning(false);
            // Trigger voice cue announcement
            handleRestCompleted();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (restTimerRef.current) clearInterval(restTimerRef.current);
    }
    return () => {
      if (restTimerRef.current) clearInterval(restTimerRef.current);
    };
  }, [isRestTimerRunning, restSecondsRemaining]);

  const handleRestCompleted = () => {
    showToast('Rest over! Next set up.', 'coral');
    if (!activeWorkout) return;
    const currentEx = activeWorkout.exercises[activeExerciseIndex];
    if (currentEx) {
      const announcement = `Rest complete! Next up is ${currentEx.name}. Remember: ${currentEx.cues[0] || 'Keep form locked.'}`;
      speakVoiceCue(announcement);
    }
  };

  const startRestTimer = (seconds) => {
    setInitialRestSeconds(seconds);
    setRestSecondsRemaining(seconds);
    setIsRestTimerRunning(true);
    showToast(`Rest timer: ${seconds}s started`, 'emerald');
  };

  const adjustRestTime = (delta) => {
    setRestSecondsRemaining((prev) => Math.max(0, prev + delta));
  };

  const skipRest = () => {
    setIsRestTimerRunning(false);
    setRestSecondsRemaining(0);
    showToast('Rest skipped. Lock in!', 'emerald');
  };

  // Toggle set completion
  const handleToggleSet = (exIdx, setIdx) => {
    if (!activeWorkout) return;
    const currentSet = activeWorkout.exercises[exIdx].sets[setIdx];
    const willComplete = !currentSet.completed;

    updateSet(exIdx, setIdx, { completed: willComplete });

    if (willComplete) {
      const currentEx = activeWorkout.exercises[exIdx];
      const restTime = currentEx.restSeconds || 90;
      startRestTimer(restTime);
      speakVoiceCue(`Set ${setIdx + 1} logged at ${currentSet.weight} kilograms. Rest started.`);
    }
  };

  const handleFinish = () => {
    fireConfetti();
    finishActiveWorkout();
  };

  if (!activeWorkout) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
        <div className="w-16 h-16 rounded-3xl bg-apex-surface border border-apex-border flex items-center justify-center mb-4 text-slate-400">
          <Activity className="w-8 h-8 text-apex-emerald" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No Active Floor Session</h3>
        <p className="text-sm text-slate-400 max-w-md mb-6">
          Choose a routine from the Self-Train body-map, pick an AI-architected split, or start a recommended upper/lower workout.
        </p>
      </div>
    );
  }

  // Calculate live volume
  let liveUserTonnage = 0;
  let livePartnerTonnage = 0;

  activeWorkout.exercises.forEach((ex) => {
    ex.sets.forEach((s) => {
      if (s.completed) {
        liveUserTonnage += (Number(s.weight) || 0) * (Number(s.reps) || 0);
      }
    });
  });

  partnerSets.forEach((ps) => {
    if (ps.completed) {
      livePartnerTonnage += (Number(ps.weight) || 0) * (Number(ps.reps) || 0);
    }
  });

  const totalTonnageSum = Math.max(1, liveUserTonnage + livePartnerTonnage);
  const userTonnagePercent = Math.round((liveUserTonnage / totalTonnageSum) * 100);

  // Active exercise details for diagram
  const activeEx = activeWorkout.exercises[activeExerciseIndex] || activeWorkout.exercises[0];
  const activeExDef = EXERCISES.find((e) => e.id === activeEx.id) || activeEx;

  // Rest Timer Circular Calculation
  const timerProgress = initialRestSeconds > 0 ? (restSecondsRemaining / initialRestSeconds) * 100 : 0;
  const timerMinutes = Math.floor(restSecondsRemaining / 60);
  const timerSecs = restSecondsRemaining % 60;

  return (
    <div className="space-y-6 pb-20 animate-fade-in">
      {/* Top Floor Bar: Live Session Name, Voice Toggle, Partner Toggle, Finish Button */}
      <div className="bg-apex-card border border-apex-border rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-card-dark">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <span className="w-3.5 h-3.5 rounded-full bg-apex-emerald block shadow-glow-emerald"></span>
            <span className="w-3.5 h-3.5 rounded-full bg-apex-emerald absolute inset-0 animate-ping opacity-75"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-apex-emerald/10 text-apex-emerald border border-apex-emerald/30 font-bold">
                LIVE FLOOR COMPANION
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {activeWorkout.split.toUpperCase()} SPLIT
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white tracking-tight mt-0.5">
              {activeWorkout.name}
            </h2>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Voice Coach Toggle */}
          <button
            onClick={() => {
              setVoiceCoachEnabled(!voiceCoachEnabled);
              showToast(
                !voiceCoachEnabled ? 'Voice Coach Enabled (Web Speech)' : 'Voice Coach Muted',
                !voiceCoachEnabled ? 'emerald' : 'coral'
              );
            }}
            className={`p-2.5 rounded-xl border text-xs font-mono font-semibold flex items-center gap-1.5 transition-all ${
              voiceCoachEnabled
                ? 'bg-apex-emerald/15 border-apex-emerald text-apex-emerald shadow-glow-emerald'
                : 'bg-[#0B0F17] border-apex-border text-slate-400 hover:text-white'
            }`}
            title="Toggle Web Speech Voice cues on rest end"
          >
            {voiceCoachEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">Voice Coach</span>
          </button>

          {/* Gym Partner Sync Toggle */}
          <button
            onClick={() => {
              setIsPartnerSyncActive(!isPartnerSyncActive);
              showToast(
                !isPartnerSyncActive
                  ? 'Gym Partner Sync Activated! Log side-by-side.'
                  : 'Partner Sync Minimized',
                'emerald'
              );
            }}
            className={`p-2.5 rounded-xl border text-xs font-mono font-semibold flex items-center gap-1.5 transition-all ${
              isPartnerSyncActive
                ? 'bg-apex-coral/15 border-apex-coral text-apex-coral shadow-glow-coral'
                : 'bg-[#0B0F17] border-apex-border text-slate-400 hover:text-white'
            }`}
            title="Log sets side-by-side with your workout partner and compare tonnage"
          >
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Partner Sync</span>
          </button>

          {/* Complete Workout Button */}
          <button
            onClick={handleFinish}
            className="py-2.5 px-4 rounded-xl bg-apex-emerald hover:bg-apex-emeraldDark text-black text-xs font-black tracking-wide flex items-center gap-1.5 shadow-glow-emerald transition-all"
          >
            <Trophy className="w-4 h-4 fill-black" />
            <span>Finish Workout</span>
          </button>
        </div>
      </div>

      {/* Floating / Sticky Smart Auto-Rest Timer Bar */}
      {restSecondsRemaining > 0 && (
        <div className="bg-[#131A26] border-2 border-apex-emerald/80 rounded-2xl p-4 shadow-2xl animate-slide-up flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            {/* Visual Circular Timer */}
            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#1C2536"
                  strokeWidth="3.5"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#00E5A8"
                  strokeWidth="3.5"
                  strokeDasharray={`${timerProgress}, 100`}
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-xs font-mono font-bold text-white">
                  {timerMinutes}:{timerSecs < 10 ? `0${timerSecs}` : timerSecs}
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-apex-emerald font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ACTIVE REST INTERVAL</span>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                {activeEx?.name} next • Voice coach will cue the set
              </p>
            </div>
          </div>

          {/* Timer Adjustment Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => adjustRestTime(-30)}
              className="px-2.5 py-1.5 rounded-lg bg-apex-surface hover:bg-slate-700 text-xs font-mono text-slate-200 border border-apex-border"
            >
              -30s
            </button>
            <button
              onClick={() => adjustRestTime(+30)}
              className="px-2.5 py-1.5 rounded-lg bg-apex-surface hover:bg-slate-700 text-xs font-mono text-slate-200 border border-apex-border"
            >
              +30s
            </button>
            <button
              onClick={() => setIsRestTimerRunning(!isRestTimerRunning)}
              className="p-1.5 rounded-lg bg-apex-surface hover:bg-slate-700 text-slate-200 border border-apex-border"
            >
              {isRestTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={skipRest}
              className="px-3 py-1.5 rounded-lg bg-apex-coral hover:bg-apex-coralDark text-white text-xs font-mono font-bold transition-all shadow-glow-coral"
            >
              Skip
            </button>
          </div>
        </div>
      )}

      {/* Gym Partner Sync Head-to-Head Banner (If Enabled) */}
      {isPartnerSyncActive && (
        <div className="bg-apex-card border border-apex-coral/40 rounded-2xl p-4 sm:p-5 shadow-card-dark animate-fade-in space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-apex-coral font-bold flex items-center gap-1.5">
              <Users className="w-4 h-4 text-apex-coral" />
              GYM BUDDY HEAD-TO-HEAD TONNAGE METER
            </span>
            <span className="text-slate-400">Live Session Comparison</span>
          </div>

          {/* Tonnage Bar Comparison */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold font-mono">
              <span className="text-apex-emerald">You: {liveUserTonnage.toLocaleString()} kg</span>
              <span className="text-apex-coral">Partner: {livePartnerTonnage.toLocaleString()} kg</span>
            </div>
            <div className="w-full h-3 bg-[#0B0F17] rounded-full overflow-hidden flex border border-apex-border">
              <div
                style={{ width: `${userTonnagePercent}%` }}
                className="bg-apex-emerald h-full transition-all duration-500 shadow-glow-emerald"
              />
              <div
                style={{ width: `${100 - userTonnagePercent}%` }}
                className="bg-apex-coral h-full transition-all duration-500 shadow-glow-coral"
              />
            </div>
          </div>
        </div>
      )}

      {/* 5-Minute Dynamic Warm-Up & Ramp-Up Protocol */}
      <div className="bg-apex-card border border-apex-border rounded-2xl overflow-hidden shadow-card-dark">
        <button
          onClick={() => setIsWarmupOpen(!isWarmupOpen)}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-apex-surface/40 transition-colors"
        >
          <div className="flex items-center space-x-2.5">
            <Flame className="w-5 h-5 text-apex-coral" />
            <div>
              <span className="text-xs font-mono uppercase text-apex-coral font-bold block">
                5-Minute Dynamic Floor Protocol
              </span>
              <h4 className="text-sm font-bold text-white">
                Joint Lubrication & CNS Ramp-Up Sets
              </h4>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono">
            <span>{isWarmupOpen ? 'Collapse' : 'Expand'}</span>
            {isWarmupOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {isWarmupOpen && (
          <div className="p-4 pt-0 border-t border-apex-border/50 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-[#0B0F17] border border-apex-border space-y-1.5">
              <span className="font-mono text-apex-emerald font-bold block">1. Dynamic Mobility (3 mins)</span>
              <p>• 10 Shoulder band dislocates + arm circles (rotator cuff priming)</p>
              <p>• 8 Bodyweight deep squats with thoracic rotation reach</p>
              <p>• Scapular push-ups & active hangs to decompress spine</p>
            </div>
            <div className="p-3 rounded-xl bg-[#0B0F17] border border-apex-border space-y-1.5">
              <span className="font-mono text-apex-coral font-bold block">2. CNS Pyramidal Ramp-Up Sets</span>
              <p>• Set A: 50% Working Weight × 10 reps (warm groove)</p>
              <p>• Set B: 75% Working Weight × 4 reps (potentiate motor units)</p>
              <p>• Rest 90s before your first official working set!</p>
            </div>
          </div>
        )}
      </div>

      {/* Main Exercises Floor List */}
      <div className="space-y-4">
        {activeWorkout.exercises.map((exercise, exIdx) => {
          const isSelected = activeExerciseIndex === exIdx;
          const exDef = EXERCISES.find((e) => e.id === exercise.id) || exercise;

          return (
            <div
              key={exercise.id + exIdx}
              className={`bg-apex-card border rounded-2xl p-4 sm:p-5 transition-all shadow-card-dark ${
                isSelected ? 'border-apex-emerald/70' : 'border-apex-border'
              }`}
            >
              {/* Exercise Header & 1-Tap Swapper */}
              <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                <div
                  className="cursor-pointer"
                  onClick={() => setActiveExerciseIndex(exIdx)}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-apex-surface border border-apex-border text-[11px] font-mono font-bold text-white flex items-center justify-center">
                      {exIdx + 1}
                    </span>
                    <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-[#0B0F17] text-slate-400 border border-apex-border">
                      {exercise.equipment}
                    </span>
                    <span className="text-[11px] font-mono text-apex-emerald">
                      {exercise.targetReps} Reps • {exercise.restSeconds}s Rest
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                    {exercise.name}
                  </h3>
                </div>

                {/* Machine Bottleneck Swapper */}
                <div className="flex items-center gap-2">
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        swapExerciseInActiveWorkout(exIdx, e.target.value);
                      }
                    }}
                    value=""
                    className="bg-[#0B0F17] border border-apex-border hover:border-apex-emerald text-xs text-slate-300 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-apex-emerald font-mono cursor-pointer"
                  >
                    <option value="" disabled>
                      Swap (Machine Busy)...
                    </option>
                    {(exercise.swaps || []).map((swapId) => {
                      const swapEx = EXERCISES.find((e) => e.id === swapId);
                      return swapEx ? (
                        <option key={swapEx.id} value={swapEx.id}>
                          {swapEx.name} ({swapEx.equipment})
                        </option>
                      ) : null;
                    })}
                  </select>
                </div>
              </div>

              {/* Collapsible Dual-Phase Vector Diagram + Form Cues */}
              {isSelected && (
                <div className="mb-4 grid grid-cols-1 md:grid-cols-12 gap-3 p-3 bg-[#0B0F17] rounded-xl border border-apex-border">
                  <div className="md:col-span-5">
                    <ExerciseDiagram
                      type={exDef.diagramType || 'bench_press'}
                      muscleGroup={exercise.targetMuscle || 'Muscle'}
                    />
                  </div>
                  <div className="md:col-span-7 flex flex-col justify-between space-y-2 text-xs">
                    <div>
                      <div className="text-[10px] font-mono uppercase text-apex-emerald font-bold mb-1">
                        Active Form Execution Checklist
                      </div>
                      <div className="space-y-1 text-slate-300">
                        {(exercise.cues || []).map((cue, cIdx) => (
                          <div key={cIdx} className="flex items-start space-x-1.5">
                            <span className="text-apex-emerald">•</span>
                            <span>{cue}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {exercise.mistake && (
                      <div className="p-2 rounded-lg bg-[#1C2536] text-[11px] text-slate-300 border border-apex-coral/30">
                        <span className="text-apex-coral font-bold font-mono mr-1">Avoid:</span>
                        {exercise.mistake}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Set Logger Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-[10px] font-mono uppercase text-slate-400 border-b border-apex-border">
                      <th className="py-2 px-2 text-center">Set</th>
                      <th className="py-2 px-2">Previous</th>
                      <th className="py-2 px-2">Target</th>
                      <th className="py-2 px-2">Weight (kg)</th>
                      <th className="py-2 px-2">Reps</th>
                      <th className="py-2 px-2">RPE (1-10)</th>
                      <th className="py-2 px-2 text-center">Log</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-apex-border/40 text-xs">
                    {exercise.sets.map((set, setIdx) => {
                      const isComplete = set.completed;
                      const hasOverloadSuggested = set.targetWeight > set.prevWeight;

                      return (
                        <tr
                          key={setIdx}
                          className={`transition-colors ${
                            isComplete ? 'bg-apex-emerald/5' : 'hover:bg-apex-surface/20'
                          }`}
                        >
                          {/* Set Number */}
                          <td className="py-2 px-2 text-center font-mono font-bold text-slate-400">
                            {set.setNumber}
                          </td>

                          {/* Previous Session Value */}
                          <td className="py-2 px-2 font-mono text-slate-400 text-[11px]">
                            {set.prevWeight}kg × {set.prevReps}
                          </td>

                          {/* Progressive Overload Suggestion */}
                          <td className="py-2 px-2 font-mono">
                            <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#0B0F17] text-apex-emerald border border-apex-emerald/30 font-bold">
                              {set.targetWeight}kg × {set.targetReps}
                            </span>
                          </td>

                          {/* Weight Input */}
                          <td className="py-2 px-2">
                            <input
                              type="number"
                              step="0.5"
                              value={set.weight}
                              onChange={(e) =>
                                updateSet(exIdx, setIdx, {
                                  weight: Number(e.target.value) || 0
                                })
                              }
                              className="w-16 sm:w-20 bg-[#0B0F17] border border-apex-border rounded-lg px-2 py-1 text-white font-mono font-bold focus:border-apex-emerald focus:outline-none"
                            />
                          </td>

                          {/* Reps Input */}
                          <td className="py-2 px-2">
                            <input
                              type="number"
                              value={set.reps}
                              onChange={(e) =>
                                updateSet(exIdx, setIdx, {
                                  reps: Number(e.target.value) || 0
                                })
                              }
                              className="w-14 sm:w-16 bg-[#0B0F17] border border-apex-border rounded-lg px-2 py-1 text-white font-mono font-bold focus:border-apex-emerald focus:outline-none"
                            />
                          </td>

                          {/* RPE Selector */}
                          <td className="py-2 px-2">
                            <select
                              value={set.rpe}
                              onChange={(e) =>
                                updateSet(exIdx, setIdx, {
                                  rpe: Number(e.target.value)
                                })
                              }
                              className="bg-[#0B0F17] border border-apex-border rounded-lg px-1.5 py-1 text-slate-200 font-mono text-xs focus:border-apex-emerald focus:outline-none"
                            >
                              {[6, 7, 7.5, 8, 8.5, 9, 9.5, 10].map((val) => (
                                <option key={val} value={val}>
                                  @{val} {val >= 9 ? '🔥' : ''}
                                </option>
                              ))}
                            </select>
                          </td>

                          {/* Complete Checkbox */}
                          <td className="py-2 px-2 text-center">
                            <button
                              onClick={() => handleToggleSet(exIdx, setIdx)}
                              className={`p-1.5 rounded-xl border transition-all ${
                                isComplete
                                  ? 'bg-apex-emerald border-apex-emerald text-black shadow-glow-emerald'
                                  : 'bg-[#0B0F17] border-apex-border text-slate-500 hover:text-white'
                              }`}
                              title="Mark set complete (triggers auto-rest countdown)"
                            >
                              {isComplete ? (
                                <CheckCircle2 className="w-5 h-5 fill-black stroke-apex-emerald" />
                              ) : (
                                <Circle className="w-5 h-5" />
                              )}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Set Actions: Add Set, Remove Set */}
              <div className="flex items-center justify-between pt-3 mt-1 border-t border-apex-border/50">
                <button
                  onClick={() => addSet(exIdx)}
                  className="text-xs font-mono text-apex-emerald hover:underline flex items-center gap-1 font-semibold"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Set</span>
                </button>

                {exercise.sets.length > 1 && (
                  <button
                    onClick={() => removeSet(exIdx, exercise.sets.length - 1)}
                    className="text-xs font-mono text-slate-400 hover:text-apex-coral flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove Set</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Post-Workout PR & Share Card Modal */}
      {completedWorkoutSummary && (
        <PostWorkoutShareCard
          summary={completedWorkoutSummary}
          onClose={() => setCompletedWorkoutSummary(null)}
        />
      )}
    </div>
  );
}
