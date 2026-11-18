import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EXERCISES, PRESET_SPLITS } from '../../data/exercises';
import InteractiveBodyMap from '../BodyMap/InteractiveBodyMap';
import ExerciseCard from '../ExerciseHub/ExerciseCard';
import {
  Play,
  Filter,
  Clock,
  Dumbbell,
  Layers,
  Sparkles,
  Zap,
  Activity,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export default function SelfTrainTab() {
  const {
    profile,
    startWorkoutFromExercises,
    selectedMuscle,
    setSelectedMuscle,
    durationFilter,
    setDurationFilter,
    equipmentFilter,
    setEquipmentFilter,
    setActiveTab,
    showToast
  } = useApp();

  // Search query filter
  const [searchQuery, setSearchQuery] = useState('');

  // Apply constraint filters (Muscle, Equipment, Duration, Search)
  const filteredExercises = EXERCISES.filter((ex) => {
    // Muscle filter
    if (selectedMuscle && ex.muscleGroup !== selectedMuscle) {
      return false;
    }
    // Equipment filter
    if (equipmentFilter !== 'all' && ex.equipment !== equipmentFilter) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = ex.name.toLowerCase().includes(q);
      const matchMuscle = ex.muscleGroup.toLowerCase().includes(q);
      const matchTarget = ex.subTarget.toLowerCase().includes(q);
      if (!matchName && !matchMuscle && !matchTarget) return false;
    }
    return true;
  });

  // Limit exercises count by duration filter (30m ~ 3-4 exercises, 45m ~ 4-5 exercises, 60m ~ 6 exercises, 75m ~ 7-8 exercises)
  const maxExercisesForDuration =
    durationFilter === 30 ? 4 :
    durationFilter === 45 ? 5 :
    durationFilter === 60 ? 6 : 8;

  const routineForFloor = filteredExercises.slice(0, maxExercisesForDuration);

  // Biomechanical Resistance-Profile Balancer Engine
  // Find lengthened and shortened pairs within the currently displayed exercises
  const lengthenedEx = routineForFloor.find((e) => e.resistanceProfile === 'lengthened');
  const shortenedEx = routineForFloor.find((e) => e.resistanceProfile === 'shortened');

  const handleStartRoutine = () => {
    if (routineForFloor.length === 0) {
      showToast('No exercises match current filters! Reset filters to start.', 'coral');
      return;
    }
    const routineName = selectedMuscle
      ? `${selectedMuscle} Hypertrophy Protocol`
      : `Self-Trained ${durationFilter}m Session`;
    startWorkoutFromExercises(routineForFloor, routineName, 'self_trained');
  };

  return (
    <div className="space-y-6 pb-20 animate-fade-in">
      {/* Interactive Anatomical Body Map */}
      <InteractiveBodyMap
        selectedMuscle={selectedMuscle}
        onSelectMuscle={setSelectedMuscle}
      />

      {/* Real-Time Constraint Filters Bar */}
      <div className="bg-apex-card border border-apex-border rounded-2xl p-4 sm:p-5 shadow-card-dark space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-apex-emerald" />
            <h3 className="text-sm font-bold text-white tracking-wide">
              Gym Floor Constraint Filters
            </h3>
          </div>

          {/* Quick Clear */}
          {(selectedMuscle || equipmentFilter !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedMuscle(null);
                setEquipmentFilter('all');
                setSearchQuery('');
              }}
              className="text-xs font-mono text-apex-coral hover:underline"
            >
              Reset All Filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          {/* Duration Selector (30/45/60/75m) */}
          <div className="sm:col-span-5 flex items-center space-x-2">
            <span className="text-xs font-mono text-slate-400 whitespace-nowrap flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-apex-emerald" />
              Duration:
            </span>
            <div className="grid grid-cols-4 gap-1.5 flex-1">
              {[30, 45, 60, 75].map((mins) => (
                <button
                  key={mins}
                  onClick={() => setDurationFilter(mins)}
                  className={`py-1.5 rounded-xl text-xs font-mono font-bold border transition-all ${
                    durationFilter === mins
                      ? 'bg-apex-emerald text-black border-apex-emerald shadow-glow-emerald'
                      : 'bg-[#0B0F17] text-slate-300 border-apex-border hover:border-slate-500'
                  }`}
                >
                  {mins}m
                </button>
              ))}
            </div>
          </div>

          {/* Equipment Selector */}
          <div className="sm:col-span-4 flex items-center space-x-2">
            <span className="text-xs font-mono text-slate-400 whitespace-nowrap flex items-center gap-1">
              <Dumbbell className="w-3.5 h-3.5 text-apex-emerald" />
              Gear:
            </span>
            <select
              value={equipmentFilter}
              onChange={(e) => setEquipmentFilter(e.target.value)}
              className="w-full bg-[#0B0F17] border border-apex-border text-xs text-white rounded-xl px-2.5 py-1.5 focus:border-apex-emerald focus:outline-none font-mono cursor-pointer"
            >
              <option value="all">All Equipment (Gym Floor)</option>
              <option value="barbell">Barbells Only</option>
              <option value="dumbbell">Dumbbells Only</option>
              <option value="cable">Cables Only</option>
              <option value="machine">Machines Only</option>
              <option value="bodyweight">Bodyweight Only</option>
            </select>
          </div>

          {/* Search Box */}
          <div className="sm:col-span-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 40+ lifts..."
              className="w-full bg-[#0B0F17] border border-apex-border rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-apex-emerald focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Biomechanical Resistance-Profile Balancer Banner */}
      {lengthenedEx && shortenedEx && (
        <div className="bg-gradient-to-r from-emerald-950/30 via-apex-surface to-orange-950/30 border border-apex-border rounded-2xl p-4 shadow-card-dark flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-apex-emerald/15 border border-apex-emerald/30 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-apex-emerald" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase text-apex-emerald font-bold">
                  Biomechanical Resistance Balancer
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-apex-emerald/10 text-apex-emerald">
                  Optimal Hypertrophy Match
                </span>
              </div>
              <div className="text-xs text-slate-200 mt-0.5">
                Paired <span className="text-apex-emerald font-bold">{lengthenedEx.name}</span> (Lengthened Stretch) +{' '}
                <span className="text-apex-coral font-bold">{shortenedEx.name}</span> (Peak Contraction)
              </div>
            </div>
          </div>

          <button
            onClick={handleStartRoutine}
            className="py-2 px-4 rounded-xl bg-apex-emerald hover:bg-apex-emeraldDark text-black text-xs font-black tracking-wide flex items-center gap-1.5 shadow-glow-emerald transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-black" />
            <span>Start Calibrated Routine ({routineForFloor.length} Lifts)</span>
          </button>
        </div>
      )}

      {/* Exercise Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="text-xs font-mono uppercase text-slate-400">
            Available Exercises ({filteredExercises.length} Found)
          </div>
          <span className="text-xs font-mono text-slate-500">
            {durationFilter}m cap: showing top {routineForFloor.length} movements
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {routineForFloor.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onStartWithExercise={(ex) => {
                startWorkoutFromExercises([ex], `${ex.name} Session`, 'single_exercise');
              }}
              onAskCoachAboutExercise={(ex) => {
                setActiveTab('ai-coach');
                showToast(`Loaded ${ex.name} into AI Coach terminal`, 'emerald');
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
