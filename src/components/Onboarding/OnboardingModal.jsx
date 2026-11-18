import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { calculateBMR, calculateTDEE, calculateMacros } from '../../data/nutritionData';
import {
  X,
  ChevronRight,
  ChevronLeft,
  Activity,
  Flame,
  Shield,
  Dumbbell,
  Clock,
  Calendar,
  Check,
  Sparkles,
  Zap
} from 'lucide-react';

export default function OnboardingModal({ isOpen, onClose }) {
  const { profile, saveProfile, loadSampleAthleteData } = useApp();

  const [step, setStep] = useState(1);

  // Form local state initialized with existing profile
  const [formData, setFormData] = useState({
    name: profile?.name || 'Athlete',
    age: profile?.age || 26,
    sex: profile?.sex || 'male',
    height: profile?.height || 178,
    weight: profile?.weight || 78,
    goal: profile?.goal || 'hypertrophy',
    experience: profile?.experience || 'intermediate',
    baselineWeights: {
      bench: profile?.baselineWeights?.bench || 80,
      squat: profile?.baselineWeights?.squat || 100,
      latPulldown: profile?.baselineWeights?.latPulldown || 65
    },
    daysPerWeek: profile?.daysPerWeek || 4,
    sessionDuration: profile?.sessionDuration || 60,
    equipment: profile?.equipment || 'commercial_gym',
    diet: profile?.diet || 'eggetarian',
    injuries: profile?.injuries || []
  });

  if (!isOpen) return null;

  // Live Biometrics Calculation
  const liveBmr = calculateBMR(formData.weight, formData.height, formData.age, formData.sex);
  const liveTdee = calculateTDEE(liveBmr, formData.daysPerWeek);
  const liveMacros = calculateMacros(formData.weight, liveTdee, formData.goal);

  const toggleInjury = (injuryKey) => {
    if (injuryKey === 'none') {
      setFormData((prev) => ({ ...prev, injuries: [] }));
      return;
    }
    setFormData((prev) => {
      const exists = prev.injuries.includes(injuryKey);
      const updated = exists
        ? prev.injuries.filter((i) => i !== injuryKey)
        : [...prev.injuries.filter((i) => i !== 'none'), injuryKey];
      return { ...prev, injuries: updated };
    });
  };

  const handleFinish = () => {
    saveProfile(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-[#131A26] border border-apex-border rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden my-auto">
        {/* Header with Progress Bar */}
        <div className="p-4 sm:p-5 border-b border-apex-border bg-[#0B0F17]/80 flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-apex-emerald shadow-glow-emerald"></span>
              <h3 className="text-lg font-bold text-white tracking-wide">
                GymBuddy Calibration Protocol
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Step {step} of 5 — {
                step === 1 ? 'Biometrics & Energy Output' :
                step === 2 ? 'Primary Athletic Goal' :
                step === 3 ? 'Strength & Working Baseline' :
                step === 4 ? 'Schedule & Equipment' :
                'Dietary Fuel & Injury Protection'
              }
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                loadSampleAthleteData();
                onClose();
              }}
              className="text-[11px] font-mono text-apex-emerald hover:underline px-2 py-1 bg-apex-emerald/10 rounded-lg border border-apex-emerald/30"
              title="Skip setup and load elite sample profile"
            >
              Load Demo Data
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-apex-surface text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 5-Step Progress Line */}
        <div className="w-full bg-[#1C2536] h-1.5 flex">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`flex-1 h-full transition-all duration-300 ${
                s <= step ? 'bg-apex-emerald' : 'bg-transparent'
              }`}
            />
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* STEP 1: Biometrics */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                    Athlete Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#0B0F17] border border-apex-border rounded-xl px-3 py-2 text-white text-sm focus:border-apex-emerald focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                    Biological Sex
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['male', 'female'].map((sex) => (
                      <button
                        key={sex}
                        type="button"
                        onClick={() => setFormData({ ...formData, sex })}
                        className={`py-2 rounded-xl text-xs font-semibold capitalize border transition-all ${
                          formData.sex === sex
                            ? 'bg-apex-emerald text-black border-apex-emerald font-bold'
                            : 'bg-[#0B0F17] text-slate-300 border-apex-border hover:border-slate-500'
                        }`}
                      >
                        {sex}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                    Age (Yrs)
                  </label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) || 25 })}
                    className="w-full bg-[#0B0F17] border border-apex-border rounded-xl px-3 py-2 text-white text-sm focus:border-apex-emerald focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: Number(e.target.value) || 175 })}
                    className="w-full bg-[#0B0F17] border border-apex-border rounded-xl px-3 py-2 text-white text-sm focus:border-apex-emerald focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) || 75 })}
                    className="w-full bg-[#0B0F17] border border-apex-border rounded-xl px-3 py-2 text-white text-sm focus:border-apex-emerald focus:outline-none"
                  />
                </div>
              </div>

              {/* Real-time BMR & TDEE Readout Card */}
              <div className="bg-[#0B0F17] border border-apex-border rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 text-apex-emerald">
                    <Activity className="w-3.5 h-3.5" />
                    Auto-Computed Metabolic Profile
                  </span>
                  <span>Mifflin-St Jeor Engine</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="p-2 rounded-lg bg-apex-surface">
                    <div className="text-[10px] text-slate-400 font-mono">Basal BMR</div>
                    <div className="text-base font-bold text-white font-mono">{liveBmr} <span className="text-[10px] font-normal text-slate-400">kcal</span></div>
                  </div>
                  <div className="p-2 rounded-lg bg-apex-surface">
                    <div className="text-[10px] text-slate-400 font-mono">Active TDEE</div>
                    <div className="text-base font-bold text-apex-emerald font-mono">{liveTdee} <span className="text-[10px] font-normal text-slate-400">kcal</span></div>
                  </div>
                  <div className="p-2 rounded-lg bg-apex-surface">
                    <div className="text-[10px] text-slate-400 font-mono">Daily Protein</div>
                    <div className="text-base font-bold text-apex-coral font-mono">{liveMacros.protein}g</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Goal */}
          {step === 2 && (
            <div className="space-y-3 animate-fade-in">
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Select Primary Objective
              </label>
              {[
                {
                  id: 'hypertrophy',
                  title: 'Hypertrophy (Maximum Muscle Gain)',
                  desc: 'Volume-driven hypertrophy optimizing lengthened/shortened resistance profiles. +300 kcal lean surplus.',
                  badge: 'Recommended for Aesthetics'
                },
                {
                  id: 'strength',
                  title: 'Strength & Power Output',
                  desc: 'Focus on compound neural adaptations, low-rep heavy sets (85-90% 1RM), and progressive overload.',
                  badge: 'Powerlifting / Heavy Loading'
                },
                {
                  id: 'fat_loss',
                  title: 'Fat Loss & Recomposition',
                  desc: 'Preserve lean mass with high protein (2.2g/kg), maintain mechanical tension with -450 kcal deficit.',
                  badge: 'Shred & Conditioning'
                },
                {
                  id: 'conditioning',
                  title: 'General Fitness & Longevity',
                  desc: 'Balanced athletic engine, joint mobility, cardiovascular endurance, and functional stamina.',
                  badge: 'Total Health'
                }
              ].map((g) => (
                <div
                  key={g.id}
                  onClick={() => setFormData({ ...formData, goal: g.id })}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    formData.goal === g.id
                      ? 'bg-apex-surface border-apex-emerald shadow-glow-emerald'
                      : 'bg-[#0B0F17] border-apex-border hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-bold text-white">{g.title}</h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-apex-emerald/10 text-apex-emerald border border-apex-emerald/30">
                      {g.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{g.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* STEP 3: Experience & Calibration */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-2">
                  Training Experience Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'beginner', title: 'Beginner', sub: '< 1 Year' },
                    { id: 'intermediate', title: 'Intermediate', sub: '1–3 Years' },
                    { id: 'advanced', title: 'Advanced', sub: '3+ Years' }
                  ].map((exp) => (
                    <button
                      key={exp.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, experience: exp.id })}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        formData.experience === exp.id
                          ? 'bg-apex-emerald text-black border-apex-emerald font-bold'
                          : 'bg-[#0B0F17] text-slate-300 border-apex-border hover:border-slate-500'
                      }`}
                    >
                      <div className="text-xs font-bold">{exp.title}</div>
                      <div className={`text-[10px] font-mono ${formData.experience === exp.id ? 'text-black/80' : 'text-slate-400'}`}>
                        {exp.sub}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                  Baseline Working Loads (Optional Calibration in kg)
                </label>
                <p className="text-[11px] text-slate-400 mb-2">
                  Used by GymBuddy to prefill your starting floor sets with progressive overload targets.
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[11px] text-slate-300 block mb-1">Bench Press</label>
                    <input
                      type="number"
                      value={formData.baselineWeights.bench}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          baselineWeights: { ...formData.baselineWeights, bench: Number(e.target.value) || 60 }
                        })
                      }
                      className="w-full bg-[#0B0F17] border border-apex-border rounded-xl px-3 py-2 text-white text-sm font-mono focus:border-apex-emerald focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-300 block mb-1">Back Squat</label>
                    <input
                      type="number"
                      value={formData.baselineWeights.squat}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          baselineWeights: { ...formData.baselineWeights, squat: Number(e.target.value) || 80 }
                        })
                      }
                      className="w-full bg-[#0B0F17] border border-apex-border rounded-xl px-3 py-2 text-white text-sm font-mono focus:border-apex-emerald focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-300 block mb-1">Lat Pulldown</label>
                    <input
                      type="number"
                      value={formData.baselineWeights.latPulldown}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          baselineWeights: { ...formData.baselineWeights, latPulldown: Number(e.target.value) || 55 }
                        })
                      }
                      className="w-full bg-[#0B0F17] border border-apex-border rounded-xl px-3 py-2 text-white text-sm font-mono focus:border-apex-emerald focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Schedule & Equipment */}
          {step === 4 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-2">
                  Weekly Frequency & Session Length
                </label>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <span className="text-[11px] text-slate-300 block mb-1">Days Per Week</span>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[3, 4, 5, 6].map((days) => (
                        <button
                          key={days}
                          type="button"
                          onClick={() => setFormData({ ...formData, daysPerWeek: days })}
                          className={`py-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                            formData.daysPerWeek === days
                              ? 'bg-apex-emerald text-black border-apex-emerald'
                              : 'bg-[#0B0F17] text-slate-300 border-apex-border'
                          }`}
                        >
                          {days}d
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-300 block mb-1">Target Duration</span>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[30, 45, 60, 75].map((dur) => (
                        <button
                          key={dur}
                          type="button"
                          onClick={() => setFormData({ ...formData, sessionDuration: dur })}
                          className={`py-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                            formData.sessionDuration === dur
                              ? 'bg-apex-emerald text-black border-apex-emerald'
                              : 'bg-[#0B0F17] text-slate-300 border-apex-border'
                          }`}
                        >
                          {dur}m
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-2">
                  Available Training Equipment
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'commercial_gym', title: 'Full Commercial Gym', desc: 'Barbells, cables, machines, dumbbells' },
                    { id: 'db_bench', title: 'Dumbbells + Bench', desc: 'Apartment or home bench setup' },
                    { id: 'cables_machines', title: 'Cables + Machines', desc: 'Hotel or corporate fitness center' },
                    { id: 'home_bodyweight', title: 'Bodyweight + Bands', desc: 'Minimal home basement setup' }
                  ].map((eq) => (
                    <button
                      key={eq.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, equipment: eq.id })}
                      className={`p-2.5 rounded-xl text-left border transition-all ${
                        formData.equipment === eq.id
                          ? 'bg-apex-surface border-apex-emerald shadow-sm'
                          : 'bg-[#0B0F17] border-apex-border text-slate-400 hover:border-slate-500'
                      }`}
                    >
                      <div className="text-xs font-bold text-white">{eq.title}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{eq.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Diet & Injury Constraints */}
          {step === 5 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-2">
                  Dietary Preference (Nutrition Engine)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'vegetarian', title: 'Vegetarian', sub: 'Paneer, Soya, Dal' },
                    { id: 'eggetarian', title: 'Eggetarian', sub: 'Eggs + Veg' },
                    { id: 'non_vegetarian', title: 'Non-Veg', sub: 'Chicken, Fish, Eggs' },
                    { id: 'vegan', title: 'Vegan', sub: 'Tofu, Soya, Pulses' }
                  ].map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, diet: d.id })}
                      className={`p-2 rounded-xl text-center border transition-all ${
                        formData.diet === d.id
                          ? 'bg-apex-emerald text-black border-apex-emerald font-bold'
                          : 'bg-[#0B0F17] text-slate-300 border-apex-border hover:border-slate-500'
                      }`}
                    >
                      <div className="text-xs font-bold">{d.title}</div>
                      <div className={`text-[9px] font-mono ${formData.diet === d.id ? 'text-black/80' : 'text-slate-400'}`}>
                        {d.sub}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                  Joint / Injury Safeguards (Multi-Select)
                </label>
                <p className="text-[11px] text-slate-400 mb-2">
                  Exercises that place extreme shear force on selected joints will be automatically filtered or swapped.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'shoulder', title: 'Shoulder Impingement', note: 'Filters flared presses & behind-neck OHP' },
                    { id: 'lower_back', title: 'Lower Back Sensitivity', note: 'Swaps heavy spinal loads with chest-supported rows' },
                    { id: 'knee', title: 'Knee Pain / Patellar', note: 'Replaces deep leg extensions with box squats & RDLs' },
                    { id: 'none', title: 'None / 100% Healthy', note: 'All staple compound lifts enabled' }
                  ].map((inj) => {
                    const isSelected =
                      inj.id === 'none'
                        ? formData.injuries.length === 0
                        : formData.injuries.includes(inj.id);

                    return (
                      <button
                        key={inj.id}
                        type="button"
                        onClick={() => toggleInjury(inj.id)}
                        className={`p-2.5 rounded-xl text-left border transition-all ${
                          isSelected
                            ? 'bg-apex-coral/15 border-apex-coral text-white font-semibold'
                            : 'bg-[#0B0F17] border-apex-border text-slate-400 hover:border-slate-500'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span>{inj.title}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-apex-coral" />}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{inj.note}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-4 sm:p-5 border-t border-apex-border bg-[#0B0F17]/80 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 rounded-xl bg-apex-surface hover:bg-slate-700 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div></div>
          )}

          {step < 5 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-5 py-2 rounded-xl bg-apex-emerald hover:bg-apex-emeraldDark text-black text-xs font-bold flex items-center gap-1.5 shadow-glow-emerald transition-all"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-6 py-2 rounded-xl bg-apex-emerald hover:bg-apex-emeraldDark text-black text-xs font-extrabold flex items-center gap-1.5 shadow-glow-emerald transition-all"
            >
              <Zap className="w-4 h-4 fill-black" />
              <span>Complete Calibration & Enter GymBuddy</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
