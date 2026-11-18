// APEX Form AI - Sample Athlete Data
// Realistic 4-week progression, plateau markers, and recovery state for instant demo

export const SAMPLE_PROFILE = {
  name: 'Aryan Varma',
  age: 26,
  sex: 'male',
  height: 178, // cm
  weight: 78, // kg
  goal: 'hypertrophy', // hypertrophy | strength | fat_loss | conditioning
  experience: 'intermediate', // beginner | intermediate | advanced
  baselineWeights: {
    bench: 85,
    squat: 110,
    latPulldown: 70
  },
  daysPerWeek: 4,
  sessionDuration: 60, // mins
  equipment: 'commercial_gym', // commercial_gym | db_bench | cables_machines | home_bodyweight
  diet: 'eggetarian', // vegetarian | eggetarian | non_vegetarian | vegan
  injuries: ['knee'], // shoulder | lower_back | knee | none
  notes: 'Focusing on upper chest clavicular fullness, V-taper lat width, and knee-friendly quad overload.'
};

export const SAMPLE_WORKOUT_HISTORY = [
  // Week 1 - Session 1: Push
  {
    id: 'wo-01',
    date: '2026-10-21T08:00:00Z',
    name: 'Push Hypertrophy A',
    split: 'push',
    durationMinutes: 58,
    totalVolumeKg: 7820,
    musclesTrained: ['Chest', 'Delts', 'Triceps'],
    exercises: [
      {
        id: 'flat-barbell-bench-press',
        name: 'Flat Barbell Bench Press',
        sets: [
          { weight: 80, reps: 8, rpe: 8, completed: true },
          { weight: 80, reps: 8, rpe: 8.5, completed: true },
          { weight: 80, reps: 7, rpe: 9, completed: true }
        ]
      },
      {
        id: 'incline-db-press',
        name: 'Incline Dumbbell Press',
        sets: [
          { weight: 28, reps: 10, rpe: 8, completed: true },
          { weight: 28, reps: 9, rpe: 8.5, completed: true },
          { weight: 28, reps: 8, rpe: 9, completed: true }
        ]
      },
      {
        id: 'standing-cable-flye',
        name: 'Standing Cable Flye / Crossover',
        sets: [
          { weight: 15, reps: 14, rpe: 8.5, completed: true },
          { weight: 15, reps: 12, rpe: 9, completed: true }
        ]
      },
      {
        id: 'db-lateral-raise',
        name: 'Dumbbell Lateral Raise',
        sets: [
          { weight: 12, reps: 15, rpe: 8.5, completed: true },
          { weight: 12, reps: 14, rpe: 9, completed: true },
          { weight: 12, reps: 12, rpe: 9.5, completed: true }
        ]
      },
      {
        id: 'overhead-cable-tricep-extension',
        name: 'Overhead Cable Tricep Extension',
        sets: [
          { weight: 22.5, reps: 12, rpe: 8.5, completed: true },
          { weight: 22.5, reps: 10, rpe: 9, completed: true }
        ]
      }
    ]
  },

  // Week 1 - Session 2: Pull
  {
    id: 'wo-02',
    date: '2026-10-23T08:30:00Z',
    name: 'Pull Hypertrophy A',
    split: 'pull',
    durationMinutes: 62,
    totalVolumeKg: 8450,
    musclesTrained: ['Lats', 'Upper Back', 'Biceps'],
    exercises: [
      {
        id: 'lat-pulldown',
        name: 'Overhead Lat Pulldown',
        sets: [
          { weight: 65, reps: 10, rpe: 8, completed: true },
          { weight: 65, reps: 9, rpe: 8.5, completed: true },
          { weight: 65, reps: 8, rpe: 9, completed: true }
        ]
      },
      {
        id: 'chest-supported-t-bar-row',
        name: 'Chest-Supported T-Bar Row',
        sets: [
          { weight: 50, reps: 10, rpe: 8, completed: true },
          { weight: 50, reps: 10, rpe: 8.5, completed: true },
          { weight: 50, reps: 8, rpe: 9, completed: true }
        ]
      },
      {
        id: 'incline-db-curl',
        name: 'Incline Dumbbell Bicep Curl',
        sets: [
          { weight: 14, reps: 12, rpe: 8.5, completed: true },
          { weight: 14, reps: 10, rpe: 9, completed: true }
        ]
      }
    ]
  },

  // Week 2 - Session 3: Legs
  {
    id: 'wo-03',
    date: '2026-10-25T08:00:00Z',
    name: 'Legs & Posterior Chain',
    split: 'legs',
    durationMinutes: 65,
    totalVolumeKg: 10900,
    musclesTrained: ['Quads', 'Hamstrings', 'Glutes', 'Calves'],
    exercises: [
      {
        id: 'leg-press',
        name: '45° Plate-Loaded Leg Press',
        sets: [
          { weight: 180, reps: 12, rpe: 8, completed: true },
          { weight: 190, reps: 10, rpe: 8.5, completed: true },
          { weight: 200, reps: 10, rpe: 9, completed: true }
        ]
      },
      {
        id: 'romanian-deadlift',
        name: 'Barbell Romanian Deadlift (RDL)',
        sets: [
          { weight: 90, reps: 10, rpe: 8, completed: true },
          { weight: 95, reps: 8, rpe: 8.5, completed: true },
          { weight: 95, reps: 8, rpe: 9, completed: true }
        ]
      },
      {
        id: 'seated-leg-curl',
        name: 'Seated Hamstring Leg Curl',
        sets: [
          { weight: 45, reps: 12, rpe: 8.5, completed: true },
          { weight: 45, reps: 11, rpe: 9, completed: true }
        ]
      }
    ]
  },

  // Week 2 - Session 4: Push Progression
  {
    id: 'wo-04',
    date: '2026-10-28T08:00:00Z',
    name: 'Push Hypertrophy B',
    split: 'push',
    durationMinutes: 60,
    totalVolumeKg: 8200,
    musclesTrained: ['Chest', 'Delts', 'Triceps'],
    exercises: [
      {
        id: 'flat-barbell-bench-press',
        name: 'Flat Barbell Bench Press',
        sets: [
          { weight: 82.5, reps: 8, rpe: 8.5, completed: true },
          { weight: 82.5, reps: 7, rpe: 9, completed: true },
          { weight: 82.5, reps: 6, rpe: 9.5, completed: true }
        ]
      },
      {
        id: 'incline-db-press',
        name: 'Incline Dumbbell Press',
        sets: [
          { weight: 30, reps: 8, rpe: 8.5, completed: true },
          { weight: 30, reps: 7, rpe: 9, completed: true }
        ]
      }
    ]
  },

  // Week 3 - Session 5: Pull Progression
  {
    id: 'wo-05',
    date: '2026-10-31T08:15:00Z',
    name: 'Pull Hypertrophy B',
    split: 'pull',
    durationMinutes: 60,
    totalVolumeKg: 8900,
    musclesTrained: ['Lats', 'Upper Back', 'Biceps'],
    exercises: [
      {
        id: 'lat-pulldown',
        name: 'Overhead Lat Pulldown',
        sets: [
          { weight: 67.5, reps: 9, rpe: 8.5, completed: true },
          { weight: 67.5, reps: 8, rpe: 9, completed: true },
          { weight: 67.5, reps: 8, rpe: 9, completed: true }
        ]
      }
    ]
  },

  // Week 3 - Session 6: Legs
  {
    id: 'wo-06',
    date: '2026-11-03T08:00:00Z',
    name: 'Legs & Calves Focus',
    split: 'legs',
    durationMinutes: 63,
    totalVolumeKg: 11400,
    musclesTrained: ['Quads', 'Hamstrings', 'Glutes', 'Calves'],
    exercises: [
      {
        id: 'leg-press',
        name: '45° Plate-Loaded Leg Press',
        sets: [
          { weight: 200, reps: 10, rpe: 8.5, completed: true },
          { weight: 210, reps: 10, rpe: 9, completed: true }
        ]
      },
      {
        id: 'romanian-deadlift',
        name: 'Barbell Romanian Deadlift (RDL)',
        sets: [
          { weight: 100, reps: 8, rpe: 8.5, completed: true },
          { weight: 100, reps: 8, rpe: 9, completed: true }
        ]
      }
    ]
  },

  // Week 4 - Session 7: Push Plateau Observation 1 (Bench 85kg x 6, RPE 9.5)
  {
    id: 'wo-07',
    date: '2026-11-06T08:00:00Z',
    name: 'Push Strength Focus',
    split: 'push',
    durationMinutes: 62,
    totalVolumeKg: 8650,
    musclesTrained: ['Chest', 'Delts', 'Triceps'],
    exercises: [
      {
        id: 'flat-barbell-bench-press',
        name: 'Flat Barbell Bench Press',
        sets: [
          { weight: 85, reps: 6, rpe: 9.5, completed: true },
          { weight: 85, reps: 6, rpe: 9.5, completed: true },
          { weight: 85, reps: 5, rpe: 10, completed: true }
        ]
      },
      {
        id: 'incline-db-press',
        name: 'Incline Dumbbell Press',
        sets: [
          { weight: 30, reps: 8, rpe: 9, completed: true },
          { weight: 30, reps: 7, rpe: 9.5, completed: true }
        ]
      }
    ]
  },

  // Week 4 - Session 8: Pull
  {
    id: 'wo-08',
    date: '2026-11-08T08:30:00Z',
    name: 'Pull & Grip Power',
    split: 'pull',
    durationMinutes: 59,
    totalVolumeKg: 9100,
    musclesTrained: ['Lats', 'Upper Back', 'Biceps'],
    exercises: [
      {
        id: 'lat-pulldown',
        name: 'Overhead Lat Pulldown',
        sets: [
          { weight: 70, reps: 8, rpe: 8.5, completed: true },
          { weight: 70, reps: 8, rpe: 9, completed: true },
          { weight: 70, reps: 7, rpe: 9.5, completed: true }
        ]
      }
    ]
  },

  // Week 4 - Session 9: Legs
  {
    id: 'wo-09',
    date: '2026-11-10T08:00:00Z',
    name: 'Leg Hypertrophy',
    split: 'legs',
    durationMinutes: 64,
    totalVolumeKg: 11800,
    musclesTrained: ['Quads', 'Hamstrings', 'Glutes'],
    exercises: [
      {
        id: 'leg-press',
        name: '45° Plate-Loaded Leg Press',
        sets: [
          { weight: 215, reps: 10, rpe: 9, completed: true },
          { weight: 220, reps: 8, rpe: 9.5, completed: true }
        ]
      }
    ]
  },

  // Week 4 - Session 10: Push Plateau Observation 2 (Bench 85kg x 6, RPE 9.5)
  {
    id: 'wo-10',
    date: '2026-11-12T08:00:00Z',
    name: 'Push Hypertrophy',
    split: 'push',
    durationMinutes: 58,
    totalVolumeKg: 8600,
    musclesTrained: ['Chest', 'Delts', 'Triceps'],
    exercises: [
      {
        id: 'flat-barbell-bench-press',
        name: 'Flat Barbell Bench Press',
        sets: [
          { weight: 85, reps: 6, rpe: 9.5, completed: true },
          { weight: 85, reps: 6, rpe: 9.5, completed: true },
          { weight: 85, reps: 5, rpe: 10, completed: true }
        ]
      }
    ]
  },

  // Recent 1: Session 11 (2 days ago - 48h ago) - Pull
  {
    id: 'wo-11',
    date: '2026-11-15T09:00:00Z',
    name: 'Pull & Biceps Lengthened Focus',
    split: 'pull',
    durationMinutes: 61,
    totalVolumeKg: 9350,
    musclesTrained: ['Lats', 'Upper Back', 'Biceps'],
    exercises: [
      {
        id: 'lat-pulldown',
        name: 'Overhead Lat Pulldown',
        sets: [
          { weight: 70, reps: 8, rpe: 9, completed: true },
          { weight: 70, reps: 8, rpe: 9, completed: true },
          { weight: 70, reps: 8, rpe: 9.5, completed: true }
        ]
      },
      {
        id: 'chest-supported-t-bar-row',
        name: 'Chest-Supported T-Bar Row',
        sets: [
          { weight: 55, reps: 10, rpe: 8.5, completed: true },
          { weight: 55, reps: 9, rpe: 9, completed: true }
        ]
      },
      {
        id: 'incline-db-curl',
        name: 'Incline Dumbbell Bicep Curl',
        sets: [
          { weight: 16, reps: 10, rpe: 9, completed: true },
          { weight: 16, reps: 9, rpe: 9.5, completed: true }
        ]
      }
    ]
  },

  // Recent 2: Session 12 (Yesterday - 22h ago) - Push Plateau Observation 3 (Stall flag triggered!)
  {
    id: 'wo-12',
    date: '2026-11-17T08:30:00Z',
    name: 'Push - Heavy Compounds',
    split: 'push',
    durationMinutes: 62,
    totalVolumeKg: 8580,
    musclesTrained: ['Chest', 'Delts', 'Triceps'],
    exercises: [
      {
        id: 'flat-barbell-bench-press',
        name: 'Flat Barbell Bench Press',
        sets: [
          { weight: 85, reps: 6, rpe: 9.5, completed: true },
          { weight: 85, reps: 5, rpe: 10, completed: true },
          { weight: 85, reps: 5, rpe: 10, completed: true }
        ]
      },
      {
        id: 'incline-db-press',
        name: 'Incline Dumbbell Press',
        sets: [
          { weight: 30, reps: 7, rpe: 9.5, completed: true },
          { weight: 30, reps: 6, rpe: 10, completed: true }
        ]
      },
      {
        id: 'db-lateral-raise',
        name: 'Dumbbell Lateral Raise',
        sets: [
          { weight: 14, reps: 12, rpe: 9, completed: true },
          { weight: 14, reps: 12, rpe: 9.5, completed: true }
        ]
      }
    ]
  }
];

// Exercise 1RM Progression Data Points for Recharts Analytics
export const SAMPLE_1RM_PROGRESSION = [
  { session: 'W1 D1', date: 'Oct 21', benchE1RM: 98.6, squatE1RM: 132.0, latE1RM: 86.6, rdlE1RM: 114.0 },
  { session: 'W1 D2', date: 'Oct 24', benchE1RM: 98.6, squatE1RM: 135.0, latE1RM: 86.6, rdlE1RM: 114.0 },
  { session: 'W2 D1', date: 'Oct 28', benchE1RM: 104.5, squatE1RM: 138.5, latE1RM: 88.0, rdlE1RM: 120.0 },
  { session: 'W2 D2', date: 'Oct 31', benchE1RM: 104.5, squatE1RM: 138.5, latE1RM: 89.5, rdlE1RM: 120.0 },
  { session: 'W3 D1', date: 'Nov 03', benchE1RM: 104.5, squatE1RM: 143.0, latE1RM: 89.5, rdlE1RM: 126.6 },
  { session: 'W3 D2', date: 'Nov 06', benchE1RM: 102.0, squatE1RM: 143.0, latE1RM: 93.3, rdlE1RM: 126.6 },
  { session: 'W4 D1', date: 'Nov 10', benchE1RM: 102.0, squatE1RM: 146.6, latE1RM: 93.3, rdlE1RM: 126.6 },
  { session: 'W4 D2', date: 'Nov 12', benchE1RM: 102.0, squatE1RM: 146.6, latE1RM: 93.3, rdlE1RM: 126.6 },
  { session: 'W4 D3', date: 'Nov 17', benchE1RM: 102.0, squatE1RM: 146.6, latE1RM: 94.0, rdlE1RM: 126.6 }
];

// Muscle Group MEV / MAV / MRV Benchmarks & Current Weekly Sets
export const MUSCLE_VOLUME_DATA = [
  { muscle: 'Chest', weeklySets: 16, mev: 10, mavMin: 14, mavMax: 18, mrv: 22, status: 'optimal' },
  { muscle: 'Lats', weeklySets: 14, mev: 8, mavMin: 12, mavMax: 16, mrv: 20, status: 'optimal' },
  { muscle: 'Upper Back', weeklySets: 23, mev: 10, mavMin: 14, mavMax: 18, mrv: 22, status: 'overreaching' },
  { muscle: 'Quads', weeklySets: 12, mev: 8, mavMin: 12, mavMax: 16, mrv: 18, status: 'optimal' },
  { muscle: 'Hamstrings', weeklySets: 10, mev: 6, mavMin: 10, mavMax: 14, mrv: 16, status: 'optimal' },
  { muscle: 'Delts', weeklySets: 17, mev: 10, mavMin: 14, mavMax: 18, mrv: 22, status: 'optimal' },
  { muscle: 'Biceps', weeklySets: 11, mev: 6, mavMin: 10, mavMax: 14, mrv: 16, status: 'optimal' },
  { muscle: 'Triceps', weeklySets: 12, mev: 6, mavMin: 10, mavMax: 14, mrv: 16, status: 'optimal' },
  { muscle: 'Glutes', weeklySets: 8, mev: 6, mavMin: 10, mavMax: 14, mrv: 18, status: 'understimulated' },
  { muscle: 'Calves', weeklySets: 6, mev: 8, mavMin: 12, mavMax: 16, mrv: 20, status: 'understimulated' },
  { muscle: 'Abs', weeklySets: 9, mev: 6, mavMin: 10, mavMax: 14, mrv: 18, status: 'optimal' }
];

// Initial active workout template for Live Floor
export const DEFAULT_ACTIVE_WORKOUT = {
  id: 'live-today',
  name: 'Today: Upper Torso Hypertrophy & Arms',
  split: 'upper',
  startedAt: null, // set on start
  exercises: [
    {
      id: 'incline-db-press',
      name: 'Incline Dumbbell Press',
      targetMuscle: 'Chest (Upper)',
      equipment: 'dumbbell',
      targetSets: 3,
      targetReps: '8-10',
      restSeconds: 120,
      cues: ['Set 30° incline', 'Wrists over elbows', 'Converge without clanging'],
      mistake: 'Setting bench too steep shifting tension to front deltoids.',
      swaps: ['flat-barbell-bench-press', 'incline-barbell-press', 'seated-machine-chest-press'],
      sets: [
        { setNumber: 1, prevWeight: 28, prevReps: 10, targetWeight: 30, targetReps: 10, weight: 30, reps: 10, rpe: 8.5, completed: false },
        { setNumber: 2, prevWeight: 28, prevReps: 9, targetWeight: 30, targetReps: 9, weight: 30, reps: 9, rpe: 9, completed: false },
        { setNumber: 3, prevWeight: 28, prevReps: 8, targetWeight: 30, targetReps: 9, weight: 30, reps: 9, rpe: 9.5, completed: false }
      ]
    },
    {
      id: 'lat-pulldown',
      name: 'Overhead Lat Pulldown',
      targetMuscle: 'Lats',
      equipment: 'cable',
      targetSets: 3,
      targetReps: '8-10',
      restSeconds: 120,
      cues: ['10° torso lean', 'Drive elbows into back pockets', '1s chest squeeze'],
      mistake: 'Violent hip swinging momentum.',
      swaps: ['pull-ups', 'single-arm-lat-pulldown', 'lat-prayer-pulldown'],
      sets: [
        { setNumber: 1, prevWeight: 67.5, prevReps: 9, targetWeight: 70, targetReps: 8, weight: 70, reps: 8, rpe: 8.5, completed: false },
        { setNumber: 2, prevWeight: 67.5, prevReps: 8, targetWeight: 70, targetReps: 8, weight: 70, reps: 8, rpe: 9, completed: false },
        { setNumber: 3, prevWeight: 67.5, prevReps: 8, targetWeight: 70, targetReps: 8, weight: 70, reps: 8, rpe: 9.5, completed: false }
      ]
    },
    {
      id: 'chest-supported-t-bar-row',
      name: 'Chest-Supported T-Bar Row',
      targetMuscle: 'Upper Back',
      equipment: 'machine',
      targetSets: 3,
      targetReps: '10-12',
      restSeconds: 90,
      cues: ['Sternum flat on pad', 'Flare elbows 45° for upper back', '2s eccentric stretch'],
      mistake: 'Lifting chest off pad to cheat reps.',
      swaps: ['barbell-bent-over-row', 'seated-cable-row', 'one-arm-db-row'],
      sets: [
        { setNumber: 1, prevWeight: 52.5, prevReps: 10, targetWeight: 55, targetReps: 10, weight: 55, reps: 10, rpe: 8, completed: false },
        { setNumber: 2, prevWeight: 52.5, prevReps: 10, targetWeight: 55, targetReps: 10, weight: 55, reps: 10, rpe: 8.5, completed: false },
        { setNumber: 3, prevWeight: 52.5, prevReps: 9, targetWeight: 55, targetReps: 9, weight: 55, reps: 9, rpe: 9, completed: false }
      ]
    },
    {
      id: 'cable-lateral-raise',
      name: 'Behind-the-Back Cable Lateral Raise',
      targetMuscle: 'Delts (Side)',
      equipment: 'cable',
      targetSets: 3,
      targetReps: '12-15',
      restSeconds: 75,
      cues: ['Pulley at wrist level', 'Lead with side delt', 'Constant bottom tension'],
      mistake: 'Jerking cable with torso swing.',
      swaps: ['db-lateral-raise', 'machine-lateral-raise'],
      sets: [
        { setNumber: 1, prevWeight: 7.5, prevReps: 15, targetWeight: 10, targetReps: 12, weight: 10, reps: 12, rpe: 8, completed: false },
        { setNumber: 2, prevWeight: 7.5, prevReps: 14, targetWeight: 10, targetReps: 12, weight: 10, reps: 12, rpe: 8.5, completed: false },
        { setNumber: 3, prevWeight: 7.5, prevReps: 12, targetWeight: 10, targetReps: 12, weight: 10, reps: 12, rpe: 9, completed: false }
      ]
    },
    {
      id: 'incline-db-curl',
      name: 'Incline Dumbbell Bicep Curl',
      targetMuscle: 'Biceps (Long Head)',
      equipment: 'dumbbell',
      targetSets: 3,
      targetReps: '10-12',
      restSeconds: 90,
      cues: ['45° bench angle', 'Elbows pinned back behind torso', 'Supinate pinkies hard at top'],
      mistake: 'Swinging elbows forward turning it into a shoulder lift.',
      swaps: ['preacher-curl', 'standing-barbell-curl'],
      sets: [
        { setNumber: 1, prevWeight: 14, prevReps: 12, targetWeight: 16, targetReps: 10, weight: 16, reps: 10, rpe: 8.5, completed: false },
        { setNumber: 2, prevWeight: 14, prevReps: 10, targetWeight: 16, targetReps: 10, weight: 16, reps: 10, rpe: 9, completed: false }
      ]
    },
    {
      id: 'overhead-cable-tricep-extension',
      name: 'Overhead Cable Tricep Extension',
      targetMuscle: 'Triceps (Long Head)',
      equipment: 'cable',
      targetSets: 3,
      targetReps: '10-12',
      restSeconds: 90,
      cues: ['Upper arms angled forward', 'Elbows pointing ahead', 'Spread rope ends at extension'],
      mistake: 'Flaring elbows sideways losing long head tension.',
      swaps: ['tricep-rope-pushdown', 'barbell-skullcrusher'],
      sets: [
        { setNumber: 1, prevWeight: 22.5, prevReps: 12, targetWeight: 25, targetReps: 10, weight: 25, reps: 10, rpe: 8.5, completed: false },
        { setNumber: 2, prevWeight: 22.5, prevReps: 10, targetWeight: 25, targetReps: 10, weight: 25, reps: 10, rpe: 9, completed: false }
      ]
    }
  ]
};
