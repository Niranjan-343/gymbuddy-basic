import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PRESET_SPLITS } from '../../data/exercises';
import { Layers, Activity, Sparkles, RotateCw, CheckCircle2 } from 'lucide-react';

export default function InteractiveBodyMap({ onSelectMuscle, selectedMuscle }) {
  const [view, setView] = useState('front'); // 'front' | 'back'
  const { MUSCLE_VOLUME_DATA } = useApp();

  // Muscle mapping data
  const muscleData = {
    Chest: { name: 'Chest (Pectorals)', view: 'front', status: 'Optimal MAV (16 sets)', color: '#00E5A8' },
    Delts: { name: 'Deltoids (Shoulders)', view: 'both', status: 'Optimal (17 sets)', color: '#00E5A8' },
    Biceps: { name: 'Biceps Brachii', view: 'front', status: 'Optimal (11 sets)', color: '#00E5A8' },
    Triceps: { name: 'Triceps Brachii', view: 'back', status: 'Optimal (12 sets)', color: '#00E5A8' },
    Abs: { name: 'Core & Abdominals', view: 'front', status: 'Optimal (9 sets)', color: '#00E5A8' },
    Quads: { name: 'Quadriceps', view: 'front', status: 'Optimal (12 sets)', color: '#00E5A8' },
    Calves: { name: 'Calves (Gastrocnemius/Soleus)', view: 'both', status: 'Under-stimulated (6 sets)', color: '#38BDF8' },
    Lats: { name: 'Latissimus Dorsi (Lats)', view: 'back', status: 'Optimal (14 sets)', color: '#00E5A8' },
    'Upper Back': { name: 'Upper Back & Traps', view: 'back', status: 'High Volume MRV (23 sets)', color: '#FF5A36' },
    Hamstrings: { name: 'Hamstrings', view: 'back', status: 'Optimal (10 sets)', color: '#00E5A8' },
    Glutes: { name: 'Gluteus Maximus', view: 'back', status: 'MEV Zone (8 sets)', color: '#38BDF8' }
  };

  const handleMuscleClick = (muscleKey) => {
    if (selectedMuscle === muscleKey) {
      onSelectMuscle(null);
    } else {
      onSelectMuscle(muscleKey);
    }
  };

  const isSelected = (muscleKey) => selectedMuscle === muscleKey;

  return (
    <div className="bg-apex-card border border-apex-border rounded-2xl p-4 sm:p-5 shadow-card-dark relative overflow-hidden">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-apex-emerald" />
            <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
              Anatomical Muscle Map
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-apex-emerald/10 text-apex-emerald text-[11px] font-mono font-medium">
              Interactive SVG
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Tap any muscle group to filter biomechanically balanced routines
          </p>
        </div>

        {/* View Toggle: Front vs Back */}
        <div className="flex items-center bg-[#0B0F17] p-1 rounded-xl border border-apex-border">
          <button
            onClick={() => setView('front')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              view === 'front'
                ? 'bg-apex-emerald text-black shadow-glow-emerald'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Front View
          </button>
          <button
            onClick={() => setView('back')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              view === 'back'
                ? 'bg-apex-emerald text-black shadow-glow-emerald'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Back View
          </button>
        </div>
      </div>

      {/* Main Diagram Area */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* SVG Graphic (Center stage) */}
        <div className="md:col-span-6 flex flex-col items-center justify-center relative py-2">
          <div className="w-full max-w-[280px] h-[340px] relative bg-[#0B0F17]/60 rounded-2xl border border-apex-border/60 p-2 flex items-center justify-center">
            {view === 'front' ? (
              // FRONT VIEW ANATOMICAL SVG
              <svg viewBox="0 0 200 320" className="w-full h-full select-none cursor-pointer">
                {/* Silhouette Base Shadow */}
                <path
                  d="M 100 20 C 108 20 115 27 115 36 C 115 45 108 52 100 52 C 92 52 85 45 85 36 C 85 27 92 20 100 20 Z"
                  fill="#1C2536"
                />

                {/* Neck & Traps */}
                <path d="M 90 52 L 80 62 L 120 62 L 110 52 Z" fill="#243147" />

                {/* Front Delts (Left & Right) */}
                <path
                  d="M 72 65 Q 60 75 62 92 Q 74 88 78 72 Z"
                  fill={isSelected('Delts') ? '#00E5A8' : '#243147'}
                  stroke={isSelected('Delts') ? '#00E5A8' : '#32425E'}
                  strokeWidth="1.5"
                  className="transition-colors hover:fill-apex-coral cursor-pointer"
                  onClick={() => handleMuscleClick('Delts')}
                >
                  <title>Deltoids (Shoulders)</title>
                </path>
                <path
                  d="M 128 65 Q 140 75 138 92 Q 126 88 122 72 Z"
                  fill={isSelected('Delts') ? '#00E5A8' : '#243147'}
                  stroke={isSelected('Delts') ? '#00E5A8' : '#32425E'}
                  strokeWidth="1.5"
                  className="transition-colors hover:fill-apex-coral cursor-pointer"
                  onClick={() => handleMuscleClick('Delts')}
                >
                  <title>Deltoids (Shoulders)</title>
                </path>

                {/* Chest (Pectoralis Major Left & Right) */}
                <path
                  d="M 78 68 Q 98 70 98 88 Q 80 94 72 82 Z"
                  fill={isSelected('Chest') ? '#FF5A36' : isSelected('Push') ? '#00E5A8' : '#2D3B55'}
                  stroke={isSelected('Chest') ? '#FF5A36' : '#3D5075'}
                  strokeWidth="1.5"
                  style={isSelected('Chest') ? { filter: 'drop-shadow(0 0 6px #FF5A36)' } : {}}
                  className="transition-all hover:fill-apex-coral cursor-pointer"
                  onClick={() => handleMuscleClick('Chest')}
                >
                  <title>Chest (Pectorals)</title>
                </path>
                <path
                  d="M 122 68 Q 102 70 102 88 Q 120 94 128 82 Z"
                  fill={isSelected('Chest') ? '#FF5A36' : isSelected('Push') ? '#00E5A8' : '#2D3B55'}
                  stroke={isSelected('Chest') ? '#FF5A36' : '#3D5075'}
                  strokeWidth="1.5"
                  style={isSelected('Chest') ? { filter: 'drop-shadow(0 0 6px #FF5A36)' } : {}}
                  className="transition-all hover:fill-apex-coral cursor-pointer"
                  onClick={() => handleMuscleClick('Chest')}
                >
                  <title>Chest (Pectorals)</title>
                </path>

                {/* Biceps (Left & Right) */}
                <path
                  d="M 58 92 Q 52 110 57 122 Q 65 116 63 94 Z"
                  fill={isSelected('Biceps') ? '#00E5A8' : '#243147'}
                  stroke={isSelected('Biceps') ? '#00E5A8' : '#32425E'}
                  strokeWidth="1.5"
                  className="transition-colors hover:fill-apex-coral cursor-pointer"
                  onClick={() => handleMuscleClick('Biceps')}
                >
                  <title>Biceps Brachii</title>
                </path>
                <path
                  d="M 142 92 Q 148 110 143 122 Q 135 116 137 94 Z"
                  fill={isSelected('Biceps') ? '#00E5A8' : '#243147'}
                  stroke={isSelected('Biceps') ? '#00E5A8' : '#32425E'}
                  strokeWidth="1.5"
                  className="transition-colors hover:fill-apex-coral cursor-pointer"
                  onClick={() => handleMuscleClick('Biceps')}
                >
                  <title>Biceps Brachii</title>
                </path>

                {/* Forearms */}
                <path d="M 55 125 L 48 155 L 56 155 L 63 125 Z" fill="#1C2536" />
                <path d="M 145 125 L 152 155 L 144 155 L 137 125 Z" fill="#1C2536" />

                {/* Abs / Core */}
                <path
                  d="M 85 92 L 115 92 L 112 142 L 88 142 Z"
                  fill={isSelected('Abs') ? '#00E5A8' : '#232E42'}
                  stroke={isSelected('Abs') ? '#00E5A8' : '#32425E'}
                  strokeWidth="1.5"
                  className="transition-colors hover:fill-apex-emerald cursor-pointer"
                  onClick={() => handleMuscleClick('Abs')}
                >
                  <title>Core & Abdominals</title>
                </path>
                {/* Ab grid lines */}
                <line x1="86" y1="108" x2="114" y2="108" stroke="#131A26" strokeWidth="1.5" />
                <line x1="87" y1="125" x2="113" y2="125" stroke="#131A26" strokeWidth="1.5" />
                <line x1="100" y1="92" x2="100" y2="142" stroke="#131A26" strokeWidth="1.5" />

                {/* Hips / Pelvis */}
                <path d="M 86 142 L 114 142 L 120 162 L 80 162 Z" fill="#1A2332" />

                {/* Quads (Left & Right) */}
                <path
                  d="M 82 165 Q 75 195 82 225 Q 96 225 98 165 Z"
                  fill={isSelected('Quads') ? '#FF5A36' : '#2D3B55'}
                  stroke={isSelected('Quads') ? '#FF5A36' : '#3D5075'}
                  strokeWidth="1.5"
                  style={isSelected('Quads') ? { filter: 'drop-shadow(0 0 6px #FF5A36)' } : {}}
                  className="transition-all hover:fill-apex-coral cursor-pointer"
                  onClick={() => handleMuscleClick('Quads')}
                >
                  <title>Quadriceps (Vastus Medialis/Lateralis)</title>
                </path>
                <path
                  d="M 118 165 Q 125 195 118 225 Q 104 225 102 165 Z"
                  fill={isSelected('Quads') ? '#FF5A36' : '#2D3B55'}
                  stroke={isSelected('Quads') ? '#FF5A36' : '#3D5075'}
                  strokeWidth="1.5"
                  style={isSelected('Quads') ? { filter: 'drop-shadow(0 0 6px #FF5A36)' } : {}}
                  className="transition-all hover:fill-apex-coral cursor-pointer"
                  onClick={() => handleMuscleClick('Quads')}
                >
                  <title>Quadriceps</title>
                </path>

                {/* Knees */}
                <circle cx="88" cy="232" r="5" fill="#1C2536" />
                <circle cx="112" cy="232" r="5" fill="#1C2536" />

                {/* Calves (Front/Tibialis) */}
                <path
                  d="M 84 240 Q 78 265 85 285 L 94 285 Q 94 265 92 240 Z"
                  fill={isSelected('Calves') ? '#00E5A8' : '#243147'}
                  stroke={isSelected('Calves') ? '#00E5A8' : '#32425E'}
                  strokeWidth="1.5"
                  className="transition-colors hover:fill-apex-coral cursor-pointer"
                  onClick={() => handleMuscleClick('Calves')}
                >
                  <title>Calves (Tibialis/Calf)</title>
                </path>
                <path
                  d="M 116 240 Q 122 265 115 285 L 106 285 Q 106 265 108 240 Z"
                  fill={isSelected('Calves') ? '#00E5A8' : '#243147'}
                  stroke={isSelected('Calves') ? '#00E5A8' : '#32425E'}
                  strokeWidth="1.5"
                  className="transition-colors hover:fill-apex-coral cursor-pointer"
                  onClick={() => handleMuscleClick('Calves')}
                >
                  <title>Calves</title>
                </path>

                {/* Feet */}
                <ellipse cx="88" cy="296" rx="9" ry="5" fill="#1C2536" />
                <ellipse cx="112" cy="296" rx="9" ry="5" fill="#1C2536" />
              </svg>
            ) : (
              // BACK VIEW ANATOMICAL SVG
              <svg viewBox="0 0 200 320" className="w-full h-full select-none cursor-pointer">
                {/* Head (Back) */}
                <ellipse cx="100" cy="36" rx="15" ry="17" fill="#1C2536" />

                {/* Traps & Upper Back */}
                <path
                  d="M 88 52 L 100 78 L 112 52 L 132 68 L 100 102 L 68 68 Z"
                  fill={isSelected('Upper Back') ? '#FF5A36' : '#2D3B55'}
                  stroke={isSelected('Upper Back') ? '#FF5A36' : '#3D5075'}
                  strokeWidth="1.5"
                  style={isSelected('Upper Back') ? { filter: 'drop-shadow(0 0 6px #FF5A36)' } : {}}
                  className="transition-all hover:fill-apex-coral cursor-pointer"
                  onClick={() => handleMuscleClick('Upper Back')}
                >
                  <title>Upper Back & Trapezius</title>
                </path>

                {/* Rear Delts */}
                <path
                  d="M 68 68 Q 58 78 62 90 Q 72 85 76 72 Z"
                  fill={isSelected('Delts') ? '#00E5A8' : '#243147'}
                  stroke={isSelected('Delts') ? '#00E5A8' : '#32425E'}
                  strokeWidth="1.5"
                  className="transition-colors hover:fill-apex-coral cursor-pointer"
                  onClick={() => handleMuscleClick('Delts')}
                >
                  <title>Rear Deltoids</title>
                </path>
                <path
                  d="M 132 68 Q 142 78 138 90 Q 128 85 124 72 Z"
                  fill={isSelected('Delts') ? '#00E5A8' : '#243147'}
                  stroke={isSelected('Delts') ? '#00E5A8' : '#32425E'}
                  strokeWidth="1.5"
                  className="transition-colors hover:fill-apex-coral cursor-pointer"
                  onClick={() => handleMuscleClick('Delts')}
                >
                  <title>Rear Deltoids</title>
                </path>

                {/* Lats (Left & Right V-Taper) */}
                <path
                  d="M 74 88 Q 98 102 98 136 Q 80 136 76 112 Z"
                  fill={isSelected('Lats') ? '#00E5A8' : '#2D3B55'}
                  stroke={isSelected('Lats') ? '#00E5A8' : '#3D5075'}
                  strokeWidth="1.5"
                  style={isSelected('Lats') ? { filter: 'drop-shadow(0 0 6px #00E5A8)' } : {}}
                  className="transition-all hover:fill-apex-emerald cursor-pointer"
                  onClick={() => handleMuscleClick('Lats')}
                >
                  <title>Latissimus Dorsi (Lats)</title>
                </path>
                <path
                  d="M 126 88 Q 102 102 102 136 Q 120 136 124 112 Z"
                  fill={isSelected('Lats') ? '#00E5A8' : '#2D3B55'}
                  stroke={isSelected('Lats') ? '#00E5A8' : '#3D5075'}
                  strokeWidth="1.5"
                  style={isSelected('Lats') ? { filter: 'drop-shadow(0 0 6px #00E5A8)' } : {}}
                  className="transition-all hover:fill-apex-emerald cursor-pointer"
                  onClick={() => handleMuscleClick('Lats')}
                >
                  <title>Latissimus Dorsi (Lats)</title>
                </path>

                {/* Triceps (Left & Right) */}
                <path
                  d="M 58 92 Q 52 110 57 124 Q 65 116 63 94 Z"
                  fill={isSelected('Triceps') ? '#00E5A8' : '#243147'}
                  stroke={isSelected('Triceps') ? '#00E5A8' : '#32425E'}
                  strokeWidth="1.5"
                  className="transition-colors hover:fill-apex-coral cursor-pointer"
                  onClick={() => handleMuscleClick('Triceps')}
                >
                  <title>Triceps Brachii (All 3 Heads)</title>
                </path>
                <path
                  d="M 142 92 Q 148 110 143 124 Q 135 116 137 94 Z"
                  fill={isSelected('Triceps') ? '#00E5A8' : '#243147'}
                  stroke={isSelected('Triceps') ? '#00E5A8' : '#32425E'}
                  strokeWidth="1.5"
                  className="transition-colors hover:fill-apex-coral cursor-pointer"
                  onClick={() => handleMuscleClick('Triceps')}
                >
                  <title>Triceps Brachii</title>
                </path>

                {/* Lower Back / Spinal Erectors */}
                <path d="M 92 136 L 108 136 L 106 156 L 94 156 Z" fill="#243147" />

                {/* Glutes (Gluteus Maximus Left & Right) */}
                <path
                  d="M 76 158 Q 98 158 98 188 Q 74 188 74 165 Z"
                  fill={isSelected('Glutes') ? '#00E5A8' : '#243147'}
                  stroke={isSelected('Glutes') ? '#00E5A8' : '#32425E'}
                  strokeWidth="1.5"
                  className="transition-colors hover:fill-apex-coral cursor-pointer"
                  onClick={() => handleMuscleClick('Glutes')}
                >
                  <title>Gluteus Maximus</title>
                </path>
                <path
                  d="M 124 158 Q 102 158 102 188 Q 126 188 126 165 Z"
                  fill={isSelected('Glutes') ? '#00E5A8' : '#243147'}
                  stroke={isSelected('Glutes') ? '#00E5A8' : '#32425E'}
                  strokeWidth="1.5"
                  className="transition-colors hover:fill-apex-coral cursor-pointer"
                  onClick={() => handleMuscleClick('Glutes')}
                >
                  <title>Gluteus Maximus</title>
                </path>

                {/* Hamstrings (Left & Right) */}
                <path
                  d="M 76 190 Q 72 215 80 232 Q 96 232 98 190 Z"
                  fill={isSelected('Hamstrings') ? '#FF5A36' : '#2D3B55'}
                  stroke={isSelected('Hamstrings') ? '#FF5A36' : '#3D5075'}
                  strokeWidth="1.5"
                  style={isSelected('Hamstrings') ? { filter: 'drop-shadow(0 0 6px #FF5A36)' } : {}}
                  className="transition-all hover:fill-apex-coral cursor-pointer"
                  onClick={() => handleMuscleClick('Hamstrings')}
                >
                  <title>Hamstrings (Biceps Femoris)</title>
                </path>
                <path
                  d="M 124 190 Q 128 215 120 232 Q 104 232 102 190 Z"
                  fill={isSelected('Hamstrings') ? '#FF5A36' : '#2D3B55'}
                  stroke={isSelected('Hamstrings') ? '#FF5A36' : '#3D5075'}
                  strokeWidth="1.5"
                  style={isSelected('Hamstrings') ? { filter: 'drop-shadow(0 0 6px #FF5A36)' } : {}}
                  className="transition-all hover:fill-apex-coral cursor-pointer"
                  onClick={() => handleMuscleClick('Hamstrings')}
                >
                  <title>Hamstrings</title>
                </path>

                {/* Calves (Back Gastrocnemius) */}
                <path
                  d="M 80 240 Q 72 260 84 285 L 94 285 Q 96 260 92 240 Z"
                  fill={isSelected('Calves') ? '#00E5A8' : '#243147'}
                  stroke={isSelected('Calves') ? '#00E5A8' : '#32425E'}
                  strokeWidth="1.5"
                  className="transition-colors hover:fill-apex-coral cursor-pointer"
                  onClick={() => handleMuscleClick('Calves')}
                >
                  <title>Calves (Gastrocnemius Diamond)</title>
                </path>
                <path
                  d="M 120 240 Q 128 260 116 285 L 106 285 Q 104 260 108 240 Z"
                  fill={isSelected('Calves') ? '#00E5A8' : '#243147'}
                  stroke={isSelected('Calves') ? '#00E5A8' : '#32425E'}
                  strokeWidth="1.5"
                  className="transition-colors hover:fill-apex-coral cursor-pointer"
                  onClick={() => handleMuscleClick('Calves')}
                >
                  <title>Calves</title>
                </path>

                {/* Feet */}
                <ellipse cx="88" cy="296" rx="8" ry="5" fill="#1C2536" />
                <ellipse cx="112" cy="296" rx="8" ry="5" fill="#1C2536" />
              </svg>
            )}

            {/* Quick Helper Floating Badge */}
            <div className="absolute bottom-2 left-2 right-2 text-center pointer-events-none">
              <span className="text-[10px] font-mono text-slate-400 bg-[#0B0F17]/80 px-2 py-0.5 rounded border border-apex-border">
                {selectedMuscle ? `Selected: ${selectedMuscle}` : 'Click any muscle to inspect'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Info & Preset Splits Hub */}
        <div className="md:col-span-6 flex flex-col justify-between space-y-4">
          {/* Active Selection Readout */}
          <div className="bg-[#0B0F17] p-3.5 rounded-xl border border-apex-border">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-mono uppercase text-slate-400">Target Stimulus</span>
              {selectedMuscle && (
                <button
                  onClick={() => onSelectMuscle(null)}
                  className="text-[11px] text-apex-coral hover:underline font-mono"
                >
                  Clear filter
                </button>
              )}
            </div>
            {selectedMuscle ? (
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-apex-emerald shadow-glow-emerald"></div>
                  <h4 className="text-base font-bold text-white">
                    {muscleData[selectedMuscle]?.name || selectedMuscle}
                  </h4>
                </div>
                <p className="text-xs text-slate-400">
                  Status: <span className="text-apex-emerald font-medium">{muscleData[selectedMuscle]?.status}</span>
                </p>
                <p className="text-[11px] text-slate-500">
                  Exercises below are filtered to lengthen & shorten this exact kinetic chain.
                </p>
              </div>
            ) : (
              <p className="text-xs text-slate-400">
                All muscle groups visible. Tap a muscle on the anatomy figure or choose a preset split below.
              </p>
            )}
          </div>

          {/* Preset Splits Fast Buttons */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-apex-emerald" />
                Biomechanical Preset Splits
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PRESET_SPLITS.map((split) => (
                <button
                  key={split.id}
                  onClick={() => {
                    // Pick the primary muscle for this split
                    onSelectMuscle(split.muscles[0]);
                  }}
                  className={`p-2.5 rounded-xl text-left border transition-all ${
                    split.muscles.includes(selectedMuscle)
                      ? 'bg-apex-surface border-apex-emerald text-white shadow-sm'
                      : 'bg-[#0B0F17] border-apex-border text-slate-300 hover:border-slate-500'
                  }`}
                >
                  <div className="text-xs font-bold leading-tight flex items-center justify-between">
                    <span>{split.name.split(' (')[0]}</span>
                    {split.muscles.includes(selectedMuscle) && (
                      <CheckCircle2 className="w-3 h-3 text-apex-emerald shrink-0" />
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5 truncate font-mono">
                    {split.muscles.join(', ')}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
