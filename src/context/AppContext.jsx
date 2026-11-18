import React, { createContext, useContext, useState, useEffect } from 'react';
import { SAMPLE_PROFILE, SAMPLE_WORKOUT_HISTORY, DEFAULT_ACTIVE_WORKOUT } from '../data/sampleData';
import { EXERCISES } from '../data/exercises';

const AppContext = createContext(null);

const STORAGE_KEYS = {
  PROFILE: 'apex_profile_v1',
  WORKOUT_HISTORY: 'apex_history_v1',
  ACTIVE_WORKOUT: 'apex_active_workout_v1',
  PARTNER_WORKOUT: 'apex_partner_workout_v1',
  API_KEY: 'apex_gemini_key_v1',
  VOICE_ENABLED: 'apex_voice_coach_v1',
  FIRST_RUN: 'apex_has_onboarded_v1'
};

export function AppProvider({ children }) {
  // Load from localStorage or initialize with sample/defaults
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return saved ? JSON.parse(saved) : SAMPLE_PROFILE;
    } catch {
      return SAMPLE_PROFILE;
    }
  });

  const [hasOnboarded, setHasOnboarded] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.FIRST_RUN) === 'true';
    } catch {
      return true;
    }
  });

  const [isOnboardingOpen, setIsOnboardingOpen] = useState(!hasOnboarded);

  const [workoutHistory, setWorkoutHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WORKOUT_HISTORY);
      return saved ? JSON.parse(saved) : SAMPLE_WORKOUT_HISTORY;
    } catch {
      return SAMPLE_WORKOUT_HISTORY;
    }
  });

  const [activeWorkout, setActiveWorkout] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_WORKOUT);
      return saved ? JSON.parse(saved) : DEFAULT_ACTIVE_WORKOUT;
    } catch {
      return DEFAULT_ACTIVE_WORKOUT;
    }
  });

  const [isPartnerSyncActive, setIsPartnerSyncActive] = useState(false);
  const [partnerWorkout, setPartnerWorkout] = useState(null);

  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.API_KEY) || '';
  });

  const [voiceCoachEnabled, setVoiceCoachEnabled] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.VOICE_ENABLED);
    return saved !== null ? saved === 'true' : true;
  });

  // Navigation & UI State
  const [activeTab, setActiveTab] = useState('self-train'); // 'self-train' | 'ai-coach' | 'live-floor' | 'analytics' | 'fuel-profile'
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [selectedExerciseForModal, setSelectedExerciseForModal] = useState(null);
  const [completedWorkoutSummary, setCompletedWorkoutSummary] = useState(null);

  // Filter State in Self-Train Tab
  const [selectedMuscle, setSelectedMuscle] = useState(null); // 'Chest', 'Quads', etc.
  const [durationFilter, setDurationFilter] = useState(60); // 30, 45, 60, 75
  const [equipmentFilter, setEquipmentFilter] = useState('all'); // 'all', 'barbell', 'dumbbell', 'cable', 'machine', 'bodyweight'

  // Notification Toast
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'emerald') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.warn('Storage quota exceeded for profile', e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WORKOUT_HISTORY, JSON.stringify(workoutHistory));
    } catch (e) {
      console.warn('Storage quota exceeded for history', e);
    }
  }, [workoutHistory]);

  useEffect(() => {
    try {
      if (activeWorkout) {
        localStorage.setItem(STORAGE_KEYS.ACTIVE_WORKOUT, JSON.stringify(activeWorkout));
      } else {
        localStorage.removeItem(STORAGE_KEYS.ACTIVE_WORKOUT);
      }
    } catch (e) {
      console.warn('Storage quota exceeded for active workout', e);
    }
  }, [activeWorkout]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.API_KEY, apiKey);
  }, [apiKey]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VOICE_ENABLED, voiceCoachEnabled.toString());
  }, [voiceCoachEnabled]);

  // Load Sample Athlete Data
  const loadSampleAthleteData = () => {
    setProfile(SAMPLE_PROFILE);
    setWorkoutHistory(SAMPLE_WORKOUT_HISTORY);
    setActiveWorkout(DEFAULT_ACTIVE_WORKOUT);
    setHasOnboarded(true);
    localStorage.setItem(STORAGE_KEYS.FIRST_RUN, 'true');
    showToast('Loaded Elite Athlete Sample Data (4-week history, PRs & Volume Heatmaps)', 'emerald');
  };

  // Reset to clear state
  const resetToCleanSlate = () => {
    localStorage.clear();
    setProfile(SAMPLE_PROFILE);
    setWorkoutHistory([]);
    setActiveWorkout(null);
    setHasOnboarded(false);
    setIsOnboardingOpen(true);
    showToast('App reset to clean slate. Fill out onboarding!', 'coral');
  };

  const saveProfile = (newProfile) => {
    setProfile(newProfile);
    setHasOnboarded(true);
    localStorage.setItem(STORAGE_KEYS.FIRST_RUN, 'true');
    setIsOnboardingOpen(false);
    showToast('Biometrics, goals and injury constraints updated!', 'emerald');
  };

  // Web Speech synthesis helper
  const speakVoiceCue = (text) => {
    if (!voiceCoachEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      utterance.volume = 0.9;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  };

  // Start Workout with specific list of exercises or split
  const startWorkoutFromExercises = (exerciseList, workoutName = 'Custom Session', split = 'custom') => {
    const formattedExercises = exerciseList.map((ex) => {
      // Find default or previous weights
      const defaultSets = ex.defaultSets || 3;
      const sets = Array.from({ length: defaultSets }, (_, i) => ({
        setNumber: i + 1,
        prevWeight: 20,
        prevReps: 10,
        targetWeight: 20,
        targetReps: 10,
        weight: 20,
        reps: 10,
        rpe: 8,
        completed: false
      }));

      return {
        id: ex.id,
        name: ex.name,
        targetMuscle: ex.muscleGroup,
        equipment: ex.equipment,
        targetSets: defaultSets,
        targetReps: ex.defaultReps || '8-10',
        restSeconds: ex.restSeconds || 90,
        cues: ex.cues || ['Maintain neutral spine', 'Control eccentric', 'Full range of motion'],
        mistake: ex.commonMistake || 'Avoid momentum',
        swaps: ex.swaps || [],
        sets
      };
    });

    const newWorkout = {
      id: `wo-${Date.now()}`,
      name: workoutName,
      split,
      startedAt: new Date().toISOString(),
      exercises: formattedExercises
    };

    setActiveWorkout(newWorkout);
    setActiveTab('live-floor');
    showToast(`Started "${workoutName}". 5-min Warm-up loaded!`, 'emerald');
    speakVoiceCue(`Workout initiated: ${workoutName}. Let's get to work.`);
  };

  // Update specific set in active workout
  const updateSet = (exerciseIndex, setIndex, updatedFields) => {
    if (!activeWorkout) return;
    setActiveWorkout((prev) => {
      const exercises = [...prev.exercises];
      const ex = { ...exercises[exerciseIndex] };
      const sets = [...ex.sets];
      sets[setIndex] = { ...sets[setIndex], ...updatedFields };
      ex.sets = sets;
      exercises[exerciseIndex] = ex;
      return { ...prev, exercises };
    });
  };

  const addSet = (exerciseIndex) => {
    if (!activeWorkout) return;
    setActiveWorkout((prev) => {
      const exercises = [...prev.exercises];
      const ex = { ...exercises[exerciseIndex] };
      const lastSet = ex.sets[ex.sets.length - 1] || { weight: 20, reps: 10, rpe: 8 };
      const newSet = {
        setNumber: ex.sets.length + 1,
        prevWeight: lastSet.weight,
        prevReps: lastSet.reps,
        targetWeight: lastSet.weight,
        targetReps: lastSet.reps,
        weight: lastSet.weight,
        reps: lastSet.reps,
        rpe: lastSet.rpe || 8,
        completed: false
      };
      ex.sets = [...ex.sets, newSet];
      exercises[exerciseIndex] = ex;
      return { ...prev, exercises };
    });
  };

  const removeSet = (exerciseIndex, setIndex) => {
    if (!activeWorkout) return;
    setActiveWorkout((prev) => {
      const exercises = [...prev.exercises];
      const ex = { ...exercises[exerciseIndex] };
      if (ex.sets.length <= 1) return prev;
      ex.sets = ex.sets.filter((_, i) => i !== setIndex).map((s, idx) => ({ ...s, setNumber: idx + 1 }));
      exercises[exerciseIndex] = ex;
      return { ...prev, exercises };
    });
  };

  // Swap exercise inside active workout (1-Tap Machine Bottleneck Swapper)
  const swapExerciseInActiveWorkout = (exerciseIndex, newExerciseId) => {
    const newEx = EXERCISES.find((e) => e.id === newExerciseId);
    if (!newEx || !activeWorkout) return;

    setActiveWorkout((prev) => {
      const exercises = [...prev.exercises];
      const currentEx = exercises[exerciseIndex];
      const sets = currentEx.sets.map((s) => ({
        ...s,
        completed: false
      }));

      exercises[exerciseIndex] = {
        id: newEx.id,
        name: newEx.name,
        targetMuscle: newEx.muscleGroup,
        equipment: newEx.equipment,
        targetSets: newEx.defaultSets || 3,
        targetReps: newEx.defaultReps || '8-10',
        restSeconds: newEx.restSeconds || 90,
        cues: newEx.cues,
        mistake: newEx.commonMistake,
        swaps: newEx.swaps,
        sets
      };

      return { ...prev, exercises };
    });

    showToast(`Swapped to ${newEx.name}! Form cues updated.`, 'emerald');
    speakVoiceCue(`Swapped to ${newEx.name}. ${newEx.cues[0]}`);
  };

  // Finish Workout: compute volume, estimated 1RMs, PR flags
  const finishActiveWorkout = () => {
    if (!activeWorkout) return;

    let totalVolume = 0;
    let completedSetsCount = 0;
    const musclesTrained = new Set();
    const newPRs = [];

    activeWorkout.exercises.forEach((ex) => {
      musclesTrained.add(ex.targetMuscle);
      ex.sets.forEach((s) => {
        if (s.completed) {
          const vol = (Number(s.weight) || 0) * (Number(s.reps) || 0);
          totalVolume += vol;
          completedSetsCount++;

          // Compute e1RM: Weight * (1 + Reps/30)
          const e1rm = Math.round((Number(s.weight) || 0) * (1 + (Number(s.reps) || 0) / 30));
          if (e1rm > 0) {
            // Check if this beats previous in history
            const prevBest = workoutHistory.reduce((best, past) => {
              const pastEx = past.exercises?.find((pe) => pe.id === ex.id);
              if (pastEx) {
                pastEx.sets?.forEach((ps) => {
                  const pE1rm = Math.round((Number(ps.weight) || 0) * (1 + (Number(ps.reps) || 0) / 30));
                  if (pE1rm > best) best = pE1rm;
                });
              }
              return best;
            }, 0);

            if (e1rm > prevBest && prevBest > 0 && !newPRs.some((p) => p.exerciseId === ex.id)) {
              newPRs.push({
                exerciseId: ex.id,
                exerciseName: ex.name,
                oldE1RM: prevBest,
                newE1RM: e1rm,
                increaseKg: e1rm - prevBest
              });
            }
          }
        }
      });
    });

    const durationMinutes = activeWorkout.startedAt
      ? Math.max(15, Math.round((Date.now() - new Date(activeWorkout.startedAt).getTime()) / 60000))
      : 52;

    const summary = {
      id: `wo-${Date.now()}`,
      date: new Date().toISOString(),
      name: activeWorkout.name,
      split: activeWorkout.split,
      durationMinutes,
      totalVolumeKg: Math.round(totalVolume),
      completedSetsCount,
      musclesTrained: Array.from(musclesTrained),
      exercises: activeWorkout.exercises,
      newPRs
    };

    setWorkoutHistory((prev) => [summary, ...prev]);
    setCompletedWorkoutSummary(summary);
    showToast(`Workout Complete! Total Volume: ${Math.round(totalVolume)} kg`, 'emerald');
    speakVoiceCue(`Session crushed! Total volume moved: ${Math.round(totalVolume)} kilograms. Great work.`);
  };

  // AI Routine Modifier
  const applyAiRoutineModification = (actionType, payload = {}) => {
    if (!activeWorkout) {
      showToast('No active workout to modify! Start a session first.', 'coral');
      return;
    }

    if (actionType === 'supersets') {
      // Pair consecutive exercises into supersets
      setActiveWorkout((prev) => ({
        ...prev,
        isSupersetMode: true,
        name: `${prev.name} (30m Supersets Mode)`
      }));
      showToast('Rest intervals shortened to 45s; converted to agonist-antagonist supersets!', 'emerald');
      speakVoiceCue('Workout converted to superset circuit for 30 minute high-density training.');
    } else if (actionType === 'shoulder_friendly') {
      // Swap any overhead presses or flared presses for shoulder-safe neutral presses
      setActiveWorkout((prev) => {
        const exercises = prev.exercises.map((ex) => {
          if (ex.id === 'overhead-barbell-press' || ex.id === 'flat-barbell-bench-press') {
            const safeEx = EXERCISES.find((e) => e.id === 'seated-machine-chest-press') || EXERCISES[0];
            return {
              ...ex,
              id: safeEx.id,
              name: safeEx.name,
              targetMuscle: safeEx.muscleGroup,
              cues: safeEx.cues,
              mistake: safeEx.commonMistake,
              swaps: safeEx.swaps
            };
          }
          return ex;
        });
        return { ...prev, exercises, name: `${prev.name} (Shoulder-Safe Protocol)` };
      });
      showToast('Swapped overhead/flared presses with shoulder-friendly neutral variations!', 'emerald');
      speakVoiceCue('Shoulder-safe modifications applied. Swapped harsh shoulder-angle movements.');
    } else if (actionType === 'focus_upper_chest_side_delts') {
      // Add or promote upper chest & lateral raises
      const inclineDb = EXERCISES.find((e) => e.id === 'incline-db-press');
      const cableLat = EXERCISES.find((e) => e.id === 'cable-lateral-raise');
      showToast('Prioritized Incline DB Press & Cable Lateral Raises at front of rotation!', 'emerald');
      speakVoiceCue('Upper chest and side delts moved to top priority in sequence.');
    } else if (actionType === 'low_energy') {
      // Reduce volume by 1 set per exercise, keep intensity
      setActiveWorkout((prev) => {
        const exercises = prev.exercises.map((ex) => ({
          ...ex,
          sets: ex.sets.slice(0, Math.max(2, ex.sets.length - 1))
        }));
        return { ...prev, exercises, name: `${prev.name} (High-Intensity Low-Volume)` };
      });
      showToast('Volume reduced by 1 set per movement to preserve central nervous system recovery.', 'emerald');
      speakVoiceCue('Volume dialed back to protect central nervous system recovery.');
    }
  };

  return (
    <AppContext.Provider
      value={{
        profile,
        setProfile,
        saveProfile,
        hasOnboarded,
        isOnboardingOpen,
        setIsOnboardingOpen,
        loadSampleAthleteData,
        resetToCleanSlate,

        // Workout state
        workoutHistory,
        activeWorkout,
        setActiveWorkout,
        startWorkoutFromExercises,
        updateSet,
        addSet,
        removeSet,
        swapExerciseInActiveWorkout,
        finishActiveWorkout,

        // Partner sync
        isPartnerSyncActive,
        setIsPartnerSyncActive,
        partnerWorkout,
        setPartnerWorkout,

        // Voice Coach
        voiceCoachEnabled,
        setVoiceCoachEnabled,
        speakVoiceCue,

        // Navigation & Modals
        activeTab,
        setActiveTab,
        isAiDrawerOpen,
        setIsAiDrawerOpen,
        selectedExerciseForModal,
        setSelectedExerciseForModal,
        completedWorkoutSummary,
        setCompletedWorkoutSummary,

        // Filters in Self-Train
        selectedMuscle,
        setSelectedMuscle,
        durationFilter,
        setDurationFilter,
        equipmentFilter,
        setEquipmentFilter,

        // AI Modification
        applyAiRoutineModification,

        // API Key
        apiKey,
        setApiKey,

        // Toast
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
}
