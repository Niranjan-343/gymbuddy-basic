import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FOOD_DATABASE,
  calculateBMR,
  calculateTDEE,
  calculateMacros,
  getSupplementTimingProtocol
} from '../../data/nutritionData';
import {
  Flame,
  Droplet,
  Zap,
  Sparkles,
  Shield,
  Clock,
  Key,
  RotateCcw,
  User,
  Activity,
  Heart,
  ChevronRight,
  Sun,
  Moon,
  Coffee
} from 'lucide-react';

export default function FuelProfileTab() {
  const {
    profile,
    saveProfile,
    setIsOnboardingOpen,
    loadSampleAthleteData,
    resetToCleanSlate,
    apiKey,
    setApiKey,
    showToast
  } = useApp();

  const [localApiKey, setLocalApiKey] = useState(apiKey);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');

  // Compute live nutritional stats
  const bmr = calculateBMR(
    profile?.weight || 78,
    profile?.height || 178,
    profile?.age || 26,
    profile?.sex || 'male'
  );
  const tdee = calculateTDEE(bmr, profile?.daysPerWeek || 4);
  const macros = calculateMacros(profile?.weight || 78, tdee, profile?.goal || 'hypertrophy');
  const timingProtocol = getSupplementTimingProtocol(
    profile?.diet || 'eggetarian',
    profile?.goal || 'hypertrophy',
    profile?.weight || 78
  );

  // Filter foods for the athlete's diet
  const athleteDiet = profile?.diet || 'eggetarian';
  const filteredFoods = FOOD_DATABASE.filter((food) => {
    const matchesDiet = food.dietCategory.includes(athleteDiet);
    if (selectedCategoryFilter === 'all') return matchesDiet;
    return matchesDiet && food.category.toLowerCase().includes(selectedCategoryFilter.toLowerCase());
  });

  const handleSaveApiKey = (e) => {
    e.preventDefault();
    setApiKey(localApiKey.trim());
    showToast('Gemini API Key updated! AI Coach now uses direct LLM reasoning.', 'emerald');
  };

  return (
    <div className="space-y-6 pb-20 animate-fade-in">
      {/* Top Banner: Macro Target Readout */}
      <div className="bg-apex-card border border-apex-border rounded-2xl p-5 shadow-card-dark space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <Flame className="w-5 h-5 text-apex-coral" />
              <h2 className="text-lg sm:text-xl font-black text-white tracking-wide">
                Hypertrophy Fuel & Macro Nutrition
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Calibrated for {profile?.name || 'Athlete'} • {profile?.diet?.toUpperCase()} DIET • {profile?.goal?.toUpperCase()}
            </p>
          </div>

          <button
            onClick={() => setIsOnboardingOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-apex-surface hover:bg-slate-700 text-xs font-mono text-slate-200 border border-apex-border flex items-center gap-1.5 transition-all"
          >
            <User className="w-3.5 h-3.5 text-apex-emerald" />
            <span>Edit Biometrics & Calibration</span>
          </button>
        </div>

        {/* 4 Macro Hero Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-4 rounded-xl bg-[#0B0F17] border border-apex-border">
            <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center justify-center gap-1">
              <Flame className="w-3 h-3 text-apex-coral" />
              Daily Calories
            </div>
            <div className="text-2xl font-black text-white font-mono mt-1">
              {macros.calories.toLocaleString()}
            </div>
            <div className="text-[10px] text-apex-emerald font-mono mt-0.5">
              {profile?.goal === 'hypertrophy' ? '+300 kcal Lean Bulk' : 'Maintenance'}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0B0F17] border border-apex-border">
            <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center justify-center gap-1">
              <Zap className="w-3 h-3 text-apex-coral" />
              Protein Target
            </div>
            <div className="text-2xl font-black text-apex-coral font-mono mt-1">
              {macros.protein}g
            </div>
            <div className="text-[10px] text-slate-400 font-mono mt-0.5">
              2.1g per kg bodyweight
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0B0F17] border border-apex-border">
            <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center justify-center gap-1">
              <Activity className="w-3 h-3 text-apex-cyan" />
              Carbohydrates
            </div>
            <div className="text-2xl font-black text-apex-cyan font-mono mt-1">
              {macros.carbs}g
            </div>
            <div className="text-[10px] text-slate-400 font-mono mt-0.5">
              Muscle Glycogen & Pump
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0B0F17] border border-apex-border">
            <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center justify-center gap-1">
              <Droplet className="w-3 h-3 text-apex-emerald" />
              Hydration Goal
            </div>
            <div className="text-2xl font-black text-apex-emerald font-mono mt-1">
              {macros.waterLiters}L
            </div>
            <div className="text-[10px] text-slate-400 font-mono mt-0.5">
              Cellular Volumization
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Automated Pre-Workout vs Post-Workout Nutrient Timing Split */}
      <div className="bg-apex-card border border-apex-border rounded-2xl p-5 shadow-card-dark space-y-4">
        <div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-apex-emerald" />
            <h3 className="text-base font-bold text-white">
              Peri-Workout Nutrient Timing & Whey Protocol
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Optimizes the cellular leucine trigger (mTORC1) and rapid glycogen resynthesis window around your floor session.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pre-Workout Card */}
          <div className="p-4 rounded-xl bg-[#0B0F17] border border-apex-border space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-apex-emerald text-xs font-bold font-mono">
                <Sun className="w-4 h-4 text-apex-emerald" />
                <span>PRE-WORKOUT PRIMER</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-apex-emerald/10 text-apex-emerald border border-apex-emerald/30">
                {timingProtocol.preWorkout.window}
              </span>
            </div>
            <div className="text-xs text-slate-300 font-medium">
              Objective: {timingProtocol.preWorkout.goal}
            </div>
            <div className="space-y-2 pt-1">
              {timingProtocol.preWorkout.items.map((item, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-[#131A26] border border-apex-border/60 text-xs">
                  <div className="flex justify-between items-center text-slate-200 font-semibold mb-0.5">
                    <span>{item.name}</span>
                    <span className="font-mono text-apex-emerald text-[11px]">{item.dosage}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">{item.example}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Post-Workout Card */}
          <div className="p-4 rounded-xl bg-[#0B0F17] border border-apex-border space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-apex-coral text-xs font-bold font-mono">
                <Zap className="w-4 h-4 text-apex-coral" />
                <span>POST-WORKOUT ANABOLIC WINDOW</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-apex-coral/10 text-apex-coral border border-apex-coral/30">
                {timingProtocol.postWorkout.window}
              </span>
            </div>
            <div className="text-xs text-slate-300 font-medium">
              Objective: {timingProtocol.postWorkout.goal}
            </div>
            <div className="space-y-2 pt-1">
              {timingProtocol.postWorkout.items.map((item, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-[#131A26] border border-apex-border/60 text-xs">
                  <div className="flex justify-between items-center text-slate-200 font-semibold mb-0.5">
                    <span>{item.name}</span>
                    <span className="font-mono text-apex-coral text-[11px]">{item.dosage}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">{item.example}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: High-Protein Indian & Global Food Database */}
      <div className="bg-apex-card border border-apex-border rounded-2xl p-5 shadow-card-dark space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-apex-emerald" />
              <h3 className="text-base font-bold text-white">
                Bioavailable High-Protein Food Library ({athleteDiet.toUpperCase()})
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Paneer, Soya chunks, Whey, Dal, and Egg bio-absorption scores for vegetarian & non-vegetarian lifters.
            </p>
          </div>
        </div>

        {/* Food Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredFoods.map((food) => (
            <div
              key={food.id}
              className="p-3.5 rounded-xl bg-[#0B0F17] border border-apex-border hover:border-slate-500 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="text-sm font-bold text-white">{food.name}</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-apex-coral/10 text-apex-coral border border-apex-coral/30 font-bold whitespace-nowrap">
                    {food.protein}g Protein
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-400 mb-2">
                  Serving: {food.serving} • {food.calories} kcal
                </div>

                {/* Macro breakdown pills */}
                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-300 mb-2">
                  <span className="px-1.5 py-0.5 bg-[#1C2536] rounded">P: {food.protein}g</span>
                  <span className="px-1.5 py-0.5 bg-[#1C2536] rounded">C: {food.carbs}g</span>
                  <span className="px-1.5 py-0.5 bg-[#1C2536] rounded">F: {food.fats}g</span>
                </div>

                <p className="text-[11px] text-slate-400 leading-snug mb-2">
                  <span className="text-slate-300 font-semibold">Absorption:</span> {food.bioavailabilityScore}
                </p>
              </div>

              <div className="pt-2 border-t border-apex-border/60 text-[10px] text-apex-emerald font-mono flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-apex-emerald shrink-0" />
                <span className="truncate">{food.tip}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4: Settings & Data Management */}
      <div className="bg-apex-card border border-apex-border rounded-2xl p-5 shadow-card-dark space-y-4">
        <div>
          <h3 className="text-base font-bold text-white mb-1">
            Application Settings & Storage
          </h3>
          <p className="text-xs text-slate-400">
            GymBuddy works 100% offline in basement gym floors with instant localStorage persistence.
          </p>
        </div>

        {/* Gemini API Key Input Form */}
        <form onSubmit={handleSaveApiKey} className="p-4 rounded-xl bg-[#0B0F17] border border-apex-border space-y-2">
          <label className="text-xs font-mono uppercase text-slate-300 flex items-center gap-1.5">
            <Key className="w-3.5 h-3.5 text-apex-emerald" />
            Optional Gemini API Key (For Uncapped Real-time Reasoning)
          </label>
          <div className="flex gap-2">
            <input
              type="password"
              value={localApiKey}
              onChange={(e) => setLocalApiKey(e.target.value)}
              placeholder="Paste AI Studio API key (Optional - app works offline without it)..."
              className="flex-1 bg-[#131A26] border border-apex-border rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-apex-emerald"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-apex-emerald hover:bg-apex-emeraldDark text-black text-xs font-bold transition-all shadow-glow-emerald"
            >
              Save Key
            </button>
          </div>
          <p className="text-[10px] text-slate-500">
            Stored only in your browser's private localStorage. Never sent to any external server.
          </p>
        </form>

        {/* Reset & Demo Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            onClick={loadSampleAthleteData}
            className="px-4 py-2 rounded-xl bg-apex-surface hover:bg-slate-700 text-xs font-mono font-bold text-white border border-apex-border flex items-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4 text-apex-emerald" />
            <span>Reload Elite Athlete Sample Data (Demo)</span>
          </button>

          <button
            onClick={resetToCleanSlate}
            className="px-4 py-2 rounded-xl bg-transparent hover:bg-apex-coral/15 text-xs font-mono font-bold text-apex-coral border border-apex-coral/40 flex items-center gap-2 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset App & Clear All Local Data</span>
          </button>
        </div>
      </div>
    </div>
  );
}
