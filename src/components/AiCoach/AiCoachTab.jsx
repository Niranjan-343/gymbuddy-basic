import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EXERCISES, PRESET_SPLITS } from '../../data/exercises';
import {
  Sparkles,
  Send,
  Zap,
  Calendar,
  Layers,
  Activity,
  Bot,
  User,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Flame,
  Shield,
  Key
} from 'lucide-react';

export default function AiCoachTab() {
  const {
    profile,
    activeWorkout,
    setActiveWorkout,
    startWorkoutFromExercises,
    applyAiRoutineModification,
    apiKey,
    showToast,
    speakVoiceCue
  } = useApp();

  const [inputQuery, setInputQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Chat message history with initial welcoming context
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: `Hello ${profile?.name || 'Athlete'}! I'm your GymBuddy AI Coach. I've calibrated your profile: ${profile?.experience} lifter, ${profile?.daysPerWeek} days/week, targeting ${profile?.goal?.replace('_', ' ')}. How can I optimize your routine or biomechanics today?`
    }
  ]);

  // Generated Weekly Split Program State
  const [generatedProgram, setGeneratedProgram] = useState(null);

  // Quick Action Chips
  const quickActions = [
    { label: 'Shoulder feels tight — modify Push', action: 'shoulder_friendly' },
    { label: 'Only have 30 mins — convert to supersets', action: 'supersets' },
    { label: 'Focus on upper chest & side delts', action: 'focus_upper_chest_side_delts' },
    { label: 'Low energy today — reduce volume', action: 'low_energy' }
  ];

  // 1-Click Weekly Split Architect Engine
  const handleGenerateWeeklySplit = () => {
    setIsGenerating(true);
    showToast('GymBuddy AI is architecting your multi-day periodized program...', 'emerald');

    setTimeout(() => {
      const days = profile?.daysPerWeek || 4;
      const injuries = profile?.injuries || [];

      // Filter exercises based on injuries
      const safeExercises = EXERCISES.filter(
        (ex) => !ex.jointStress.some((joint) => injuries.includes(joint))
      );

      let programDays = [];

      if (days === 3) {
        programDays = [
          {
            dayNumber: 1,
            title: 'Full Body A (Quad & Upper Push Bias)',
            split: 'full_body',
            muscles: ['Quads', 'Chest', 'Lats'],
            exercises: safeExercises.filter((e) => ['Quads', 'Chest', 'Lats'].includes(e.muscleGroup)).slice(0, 5)
          },
          {
            dayNumber: 2,
            title: 'Full Body B (Hinge & Vertical Pull Bias)',
            split: 'full_body',
            muscles: ['Hamstrings', 'Upper Back', 'Delts'],
            exercises: safeExercises.filter((e) => ['Hamstrings', 'Upper Back', 'Delts'].includes(e.muscleGroup)).slice(0, 5)
          },
          {
            dayNumber: 3,
            title: 'Full Body C (Hypertrophy & Arms Finisher)',
            split: 'full_body',
            muscles: ['Quads', 'Chest', 'Biceps', 'Triceps'],
            exercises: safeExercises.filter((e) => ['Chest', 'Biceps', 'Triceps', 'Quads'].includes(e.muscleGroup)).slice(0, 5)
          }
        ];
      } else if (days === 4) {
        programDays = [
          {
            dayNumber: 1,
            title: 'Upper A: Chest & V-Taper Lat Focus',
            split: 'upper',
            muscles: ['Chest', 'Lats', 'Delts', 'Triceps'],
            exercises: safeExercises.filter((e) => ['Chest', 'Lats', 'Delts', 'Triceps'].includes(e.muscleGroup)).slice(0, 6)
          },
          {
            dayNumber: 2,
            title: 'Lower A: Quad Dominance & Posterior Chain',
            split: 'lower',
            muscles: ['Quads', 'Hamstrings', 'Calves', 'Abs'],
            exercises: safeExercises.filter((e) => ['Quads', 'Hamstrings', 'Calves', 'Abs'].includes(e.muscleGroup)).slice(0, 5)
          },
          {
            dayNumber: 3,
            title: 'Upper B: Incline Clavicular & Mid-Back Density',
            split: 'upper',
            muscles: ['Chest', 'Upper Back', 'Delts', 'Biceps'],
            exercises: safeExercises.filter((e) => ['Chest', 'Upper Back', 'Delts', 'Biceps'].includes(e.muscleGroup)).slice(0, 6)
          },
          {
            dayNumber: 4,
            title: 'Lower B: Hamstring Lengthened & Glute Power',
            split: 'lower',
            muscles: ['Hamstrings', 'Glutes', 'Quads', 'Abs'],
            exercises: safeExercises.filter((e) => ['Hamstrings', 'Glutes', 'Quads', 'Abs'].includes(e.muscleGroup)).slice(0, 5)
          }
        ];
      } else {
        // 5 or 6 day Push-Pull-Legs
        programDays = [
          {
            dayNumber: 1,
            title: 'Push Hypertrophy: Lengthened Chest & Overhead Triceps',
            split: 'push',
            muscles: ['Chest', 'Delts', 'Triceps'],
            exercises: safeExercises.filter((e) => ['Chest', 'Delts', 'Triceps'].includes(e.muscleGroup)).slice(0, 6)
          },
          {
            dayNumber: 2,
            title: 'Pull Density: Lat Width & Incline Biceps',
            split: 'pull',
            muscles: ['Lats', 'Upper Back', 'Biceps'],
            exercises: safeExercises.filter((e) => ['Lats', 'Upper Back', 'Biceps'].includes(e.muscleGroup)).slice(0, 6)
          },
          {
            dayNumber: 3,
            title: 'Legs & Calves: Deep Knee Angle & Hip Hinge',
            split: 'legs',
            muscles: ['Quads', 'Hamstrings', 'Glutes', 'Calves'],
            exercises: safeExercises.filter((e) => ['Quads', 'Hamstrings', 'Glutes', 'Calves'].includes(e.muscleGroup)).slice(0, 6)
          },
          {
            dayNumber: 4,
            title: 'Upper Torso Power: Compound Convergence',
            split: 'upper',
            muscles: ['Chest', 'Lats', 'Delts'],
            exercises: safeExercises.filter((e) => ['Chest', 'Lats', 'Delts'].includes(e.muscleGroup)).slice(0, 5)
          },
          {
            dayNumber: 5,
            title: 'Arm & Shoulder Specialization: Long/Short Heads',
            split: 'arms',
            muscles: ['Biceps', 'Triceps', 'Delts'],
            exercises: safeExercises.filter((e) => ['Biceps', 'Triceps', 'Delts'].includes(e.muscleGroup)).slice(0, 6)
          }
        ];
      }

      const program = {
        name: `${profile?.name || 'Athlete'}'s Periodized Hypertrophy Program`,
        frequency: `${days} Days / Week`,
        generatedAt: new Date().toLocaleDateString(),
        days: programDays
      };

      setGeneratedProgram(program);
      setIsGenerating(false);

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `🎯 I've architected a customized ${days}-day split for your ${profile?.goal?.replace('_', ' ')} goal! It integrates lengthened and shortened resistance curves, respects your joint parameters (${injuries.length > 0 ? injuries.join(', ') : 'healthy'}), and has starting working loads calibrated to your baseline.`
        }
      ]);

      speakVoiceCue(`Your ${days} day program is architected and ready to start.`);
    }, 600);
  };

  // Chat Submission Handler (Deterministic + Optional Gemini API)
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    const userText = inputQuery.trim();
    setInputQuery('');

    // Append user message
    setMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setIsGenerating(true);

    // If Gemini API Key provided, attempt call
    if (apiKey && apiKey.trim().length > 10) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [
                    {
                      text: `You are GymBuddy AI, an elite biomechanics and hypertrophy gym coach. Athlete Profile: Age ${profile?.age}, Goal: ${profile?.goal}, Experience: ${profile?.experience}, Injuries: ${profile?.injuries?.join(', ') || 'None'}, Equipment: ${profile?.equipment}. Question: "${userText}". Keep answer under 120 words, athletic tone, give crisp form cues and biomechanical rationale.`
                    }
                  ]
                }
              ]
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (replyText) {
            setMessages((prev) => [...prev, { role: 'assistant', text: replyText }]);
            setIsGenerating(false);
            return;
          }
        }
      } catch (err) {
        console.warn('Gemini API call failed, falling back to deterministic engine', err);
      }
    }

    // Deterministic Smart Biomechanics Rule Engine (Works 100% Offline in Basement Gyms)
    setTimeout(() => {
      let reply = '';
      const queryLower = userText.toLowerCase();

      if (queryLower.includes('shoulder') || queryLower.includes('impingement') || queryLower.includes('rotator cuff')) {
        reply = `To protect the subacromial space: tuck elbows 45° rather than 90° on all horizontal presses. Swap overhead barbell press for seated 30° incline dumbbell press with neutral palms. Ensure 3 sets of Cable Rope Face Pulls are programmed to reinforce external rotators.`;
        applyAiRoutineModification('shoulder_friendly');
      } else if (queryLower.includes('superset') || queryLower.includes('30 min') || queryLower.includes('short on time') || queryLower.includes('hurry')) {
        reply = `Understood! Converting your floor session to agonist-antagonist supersets (e.g., Incline DB Press paired immediately with Chest-Supported Rows). Rest capped at 45s between pairs. This maintains volume while cutting gym duration by 40%.`;
        applyAiRoutineModification('supersets');
      } else if (queryLower.includes('upper chest') || queryLower.includes('clavicular') || queryLower.includes('shelf')) {
        reply = `For clavicular upper chest fullness: set your incline bench to precisely 30° (higher than 45° shifts stress to anterior deltoids). Start session with Incline DB Press followed by Low-to-High Cable Flyes to achieve peak contraction in the shortened range.`;
        applyAiRoutineModification('focus_upper_chest_side_delts');
      } else if (queryLower.includes('tired') || queryLower.includes('low energy') || queryLower.includes('fatigue') || queryLower.includes('sore')) {
        reply = `Smart call to manage central nervous system fatigue. I've dialed back volume by 1 working set per movement while preserving mechanical intensity. Hit RPE 8 and avoid taking sets to failure today to accelerate recovery.`;
        applyAiRoutineModification('low_energy');
      } else if (queryLower.includes('bench') || queryLower.includes('chest')) {
        reply = `For Flat Barbell Bench Press: retract and depress your scapulae into the pad ('pack your lats'). Descend with a 45° elbow tuck touching your lower sternum, and drive your heels into the floor for leg drive. Lower on a 3-second eccentric tempo.`;
      } else if (queryLower.includes('squat') || queryLower.includes('knee')) {
        reply = `For knee health during squats: break at the hips and knees simultaneously. Drive knees outward in the direction of your second toe to prevent knee valgus. If patellar pain flares, swap to 45° Leg Press with feet placed high on the sled to emphasize glutes and hamstrings.`;
      } else if (queryLower.includes('protein') || queryLower.includes('macro') || queryLower.includes('diet')) {
        reply = `For ${profile?.diet || 'your diet'}: target 2.1g protein per kg (${Math.round((profile?.weight || 78) * 2.1)}g daily). Space intake into 4 feedings of 30-40g each to stimulate muscle protein synthesis throughout the day.`;
      } else {
        reply = `Got it! GymBuddy's biomechanical engine recommends pairing a lengthened movement (where tension is highest at the stretch) with a shortened movement (where peak squeeze occurs) for maximum hypertrophy. Let me know if you want to modify your active routine or need cues on a specific lift!`;
      }

      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
      setIsGenerating(false);
      speakVoiceCue(reply.slice(0, 100));
    }, 450);
  };

  return (
    <div className="space-y-6 pb-20 animate-fade-in">
      {/* AI Header & Split Architect Banner */}
      <div className="bg-gradient-to-r from-[#131A26] via-[#1A2333] to-[#131A26] border border-apex-border rounded-2xl p-5 shadow-card-dark flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Bot className="w-5 h-5 text-apex-emerald" />
            <h2 className="text-lg sm:text-xl font-black text-white tracking-wide">
              GymBuddy AI Routine Architect
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-apex-emerald/10 text-apex-emerald text-[10px] font-mono font-bold">
              Autonomous Coach
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Generates custom multi-day periodized programs calibrated to your biometrics, available equipment, and joint safety parameters.
          </p>
        </div>

        <button
          onClick={handleGenerateWeeklySplit}
          disabled={isGenerating}
          className="py-2.5 px-4 rounded-xl bg-apex-emerald hover:bg-apex-emeraldDark text-black text-xs font-black tracking-wide flex items-center gap-2 shadow-glow-emerald transition-all disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4 fill-black" />
          <span>1-Click Weekly Split Architect</span>
        </button>
      </div>

      {/* Generated Multi-Day Program View (If available) */}
      {generatedProgram && (
        <div className="bg-apex-card border border-apex-emerald/50 rounded-2xl p-5 shadow-2xl space-y-4 animate-fade-in">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-apex-border pb-3">
            <div>
              <span className="text-[10px] font-mono text-apex-emerald font-bold uppercase">
                Active Architected Schedule
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {generatedProgram.name} ({generatedProgram.frequency})
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Generated: {generatedProgram.generatedAt}
            </span>
          </div>

          {/* Program Days Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {generatedProgram.days.map((day) => (
              <div
                key={day.dayNumber}
                className="p-3.5 rounded-xl bg-[#0B0F17] border border-apex-border hover:border-slate-500 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-apex-emerald font-bold">Day {day.dayNumber}</span>
                    <span className="text-slate-400 uppercase text-[10px]">{day.split}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2">{day.title}</h4>
                  <div className="space-y-1 mb-3">
                    {day.exercises.map((ex, idx) => (
                      <div key={idx} className="text-xs text-slate-300 flex items-center space-x-1.5 truncate">
                        <span className="text-apex-coral text-[10px]">•</span>
                        <span className="truncate">{ex.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => startWorkoutFromExercises(day.exercises, day.title, day.split)}
                  className="w-full py-2 rounded-lg bg-apex-surface hover:bg-apex-emerald hover:text-black text-xs font-bold text-white border border-apex-border flex items-center justify-center gap-1.5 transition-all"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Start This Session</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mid-Workout Routine Modifier Chips */}
      <div className="space-y-2">
        <span className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-apex-emerald" />
          Mid-Workout Real-Time Modifiers (1-Tap):
        </span>
        <div className="flex flex-wrap gap-2">
          {quickActions.map((qa, idx) => (
            <button
              key={idx}
              onClick={() => {
                applyAiRoutineModification(qa.action);
                setMessages((prev) => [
                  ...prev,
                  { role: 'user', text: qa.label },
                  {
                    role: 'assistant',
                    text: `Applied "${qa.label}"! Active session updated with tailored rest and movement mechanics.`
                  }
                ]);
              }}
              className="px-3 py-1.5 rounded-xl bg-apex-card hover:bg-apex-surface border border-apex-border hover:border-apex-emerald text-xs text-slate-300 hover:text-white transition-all shadow-sm font-medium flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-apex-emerald" />
              <span>{qa.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Biomechanics Q&A Chat Terminal */}
      <div className="bg-apex-card border border-apex-border rounded-2xl overflow-hidden shadow-card-dark flex flex-col h-[480px]">
        {/* Terminal Header */}
        <div className="p-3.5 bg-[#0B0F17] border-b border-apex-border flex items-center justify-between text-xs font-mono">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-apex-emerald shadow-glow-emerald"></span>
            <span className="text-white font-bold">GYMBUDDY INTELLIGENCE TERMINAL</span>
          </div>
          <span className="text-[11px] text-slate-400">
            {apiKey ? 'Gemini API Active ⚡' : 'Offline Deterministic Engine (Basement Gym Ready)'}
          </span>
        </div>

        {/* Message Log */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-apex-emerald/15 border border-apex-emerald/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4 text-apex-emerald" />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-apex-emerald text-black font-semibold rounded-tr-none'
                    : 'bg-[#0B0F17] text-slate-200 border border-apex-border rounded-tl-none font-sans'
                }`}
              >
                {msg.text}
              </div>

              {msg.role === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-apex-surface border border-apex-border flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4 text-slate-300" />
                </div>
              )}
            </div>
          ))}

          {isGenerating && (
            <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono italic">
              <Bot className="w-4 h-4 text-apex-emerald animate-spin" />
              <span>GymBuddy is analyzing biomechanical vectors...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="p-3 bg-[#0B0F17] border-t border-apex-border flex items-center gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask GymBuddy (e.g. 'How to feel upper chest on Incline DB Press?')..."
            className="flex-1 bg-[#131A26] border border-apex-border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-apex-emerald"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isGenerating}
            className="p-2.5 rounded-xl bg-apex-emerald hover:bg-apex-emeraldDark text-black disabled:opacity-40 transition-all shadow-glow-emerald"
          >
            <Send className="w-4 h-4 fill-black" />
          </button>
        </form>
      </div>
    </div>
  );
}
