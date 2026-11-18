// APEX Form AI - Comprehensive Exercise Database
// 42+ staple movements with biomechanical resistance profiles, form cues, injury filters, and bottleneck swaps

export const EXERCISES = [
  // ==================== CHEST ====================
  {
    id: 'flat-barbell-bench-press',
    name: 'Flat Barbell Bench Press',
    muscleGroup: 'Chest',
    subTarget: 'Mid & Lower Pectorals',
    equipment: 'barbell',
    movementPattern: 'horizontal_press',
    resistanceProfile: 'lengthened', // peak tension at chest level
    jointStress: ['shoulder'],
    diagramType: 'bench_press',
    defaultSets: 4,
    defaultReps: '6-8',
    restSeconds: 180,
    cues: [
      'Retract and depress scapulae into bench before un-racking',
      'Lower bar with 45–60° elbow tuck to touch lower sternum',
      'Drive feet into floor and press in a slight arc back over shoulders'
    ],
    commonMistake: 'Flaring elbows 90° out causing anterior shoulder shear and rotator cuff impingement.',
    swaps: ['incline-db-press', 'seated-machine-chest-press', 'flat-db-press', 'dips-chest']
  },
  {
    id: 'incline-db-press',
    name: 'Incline Dumbbell Press',
    muscleGroup: 'Chest',
    subTarget: 'Clavicular (Upper) Pectorals',
    equipment: 'dumbbell',
    movementPattern: 'incline_press',
    resistanceProfile: 'lengthened',
    jointStress: ['shoulder'],
    diagramType: 'incline_press',
    defaultSets: 3,
    defaultReps: '8-10',
    restSeconds: 120,
    cues: [
      'Set bench to 30° incline to bias upper chest rather than front delts',
      'Keep wrists stacked directly over elbows throughout the descent',
      'Converge dumbbells slightly at peak without banging them together'
    ],
    commonMistake: 'Setting bench too steep (>45°) shifting stimulus away from clavicular chest to front deltoids.',
    swaps: ['flat-barbell-bench-press', 'incline-barbell-press', 'seated-machine-chest-press', 'standing-cable-flye']
  },
  {
    id: 'standing-cable-flye',
    name: 'Standing Cable Flye / Crossover',
    muscleGroup: 'Chest',
    subTarget: 'Sternal Pectorals (Inner/Mid)',
    equipment: 'cable',
    movementPattern: 'horizontal_adduction',
    resistanceProfile: 'shortened', // peak tension in fully contracted cross-body position
    jointStress: [],
    diagramType: 'cable_fly',
    defaultSets: 3,
    defaultReps: '12-15',
    restSeconds: 90,
    cues: [
      'Maintain a slight 15° forward torso lean and soft bend in elbows',
      'Sweep hands forward and together in a wide hugging motion',
      'Squeeze chest hard for 1 second at full peak adduction'
    ],
    commonMistake: 'Over-extending arms backward past shoulder plane under heavy load causing anterior capsule strain.',
    swaps: ['pec-deck-flye', 'incline-db-press', 'flat-db-flye']
  },
  {
    id: 'pec-deck-flye',
    name: 'Pec Deck Machine Flye',
    muscleGroup: 'Chest',
    subTarget: 'Sternal Pectorals',
    equipment: 'machine',
    movementPattern: 'horizontal_adduction',
    resistanceProfile: 'shortened',
    jointStress: [],
    diagramType: 'cable_fly',
    defaultSets: 3,
    defaultReps: '10-12',
    restSeconds: 90,
    cues: [
      'Adjust seat height so handles align with mid-chest level',
      'Keep shoulder blades pinned to the pad; lead with your elbows',
      'Control the 3-second negative stretch without letting weights clang'
    ],
    commonMistake: 'Rounding shoulders forward at peak contraction to reach handles together instead of using chest.',
    swaps: ['standing-cable-flye', 'flat-db-press', 'seated-machine-chest-press']
  },
  {
    id: 'seated-machine-chest-press',
    name: 'Seated Machine Chest Press',
    muscleGroup: 'Chest',
    subTarget: 'Mid & Lower Pectorals',
    equipment: 'machine',
    movementPattern: 'horizontal_press',
    resistanceProfile: 'constant',
    jointStress: [],
    diagramType: 'bench_press',
    defaultSets: 3,
    defaultReps: '10-12',
    restSeconds: 90,
    cues: [
      'Set handles at nipple height with feet firmly planted',
      'Drive elbows straight ahead along machine converging arc',
      'Stop just shy of elbow hyperextension to keep continuous tension'
    ],
    commonMistake: 'Letting shoulders shrug upward toward ears during the concentric phase.',
    swaps: ['flat-barbell-bench-press', 'incline-db-press', 'flat-db-press']
  },
  {
    id: 'flat-db-press',
    name: 'Flat Dumbbell Press',
    muscleGroup: 'Chest',
    subTarget: 'Mid Pectorals',
    equipment: 'dumbbell',
    movementPattern: 'horizontal_press',
    resistanceProfile: 'lengthened',
    jointStress: ['shoulder'],
    diagramType: 'bench_press',
    defaultSets: 3,
    defaultReps: '8-10',
    restSeconds: 120,
    cues: [
      'Kick dumbbells up using knees and lock shoulders back into bench',
      'Descend until dumbbells graze outer chest for a deep lengthened stretch',
      'Press up along a smooth converging arc stopping 2 inches apart'
    ],
    commonMistake: 'Dropping dumbbells abruptly at the bottom without controlling eccentric tension.',
    swaps: ['flat-barbell-bench-press', 'seated-machine-chest-press', 'incline-db-press']
  },
  {
    id: 'dips-chest',
    name: 'Parallel Bar Dips (Chest Bias)',
    muscleGroup: 'Chest',
    subTarget: 'Lower Pectorals & Triceps',
    equipment: 'bodyweight',
    movementPattern: 'vertical_press',
    resistanceProfile: 'lengthened',
    jointStress: ['shoulder'],
    diagramType: 'bench_press',
    defaultSets: 3,
    defaultReps: '8-12',
    restSeconds: 120,
    cues: [
      'Lean torso forward 30° with elbows flared slightly outward',
      'Lower until upper arms are parallel to floor (90° elbow bend)',
      'Press through heels of palms focusing on contracting lower chest'
    ],
    commonMistake: 'Staying completely vertical which shifts the entire load onto triceps and shoulder joints.',
    swaps: ['flat-barbell-bench-press', 'standing-cable-flye', 'seated-machine-chest-press']
  },

  // ==================== BACK (LATS & UPPER BACK) ====================
  {
    id: 'lat-pulldown',
    name: 'Overhead Lat Pulldown',
    muscleGroup: 'Lats',
    subTarget: 'Latissimus Dorsi (Width)',
    equipment: 'cable',
    movementPattern: 'vertical_pull',
    resistanceProfile: 'shortened',
    jointStress: [],
    diagramType: 'lat_pulldown',
    defaultSets: 4,
    defaultReps: '8-10',
    restSeconds: 120,
    cues: [
      'Grip bar 1.5x shoulder width; lean back slightly (10-15°)',
      'Initiate pull by driving elbows straight down toward your back pockets',
      'Touch bar to upper chest and pause for 1 second of lat squeeze'
    ],
    commonMistake: 'Swinging back violently from the hips using momentum rather than lat depression.',
    swaps: ['pull-ups', 'single-arm-lat-pulldown', 'lat-prayer-pulldown']
  },
  {
    id: 'pull-ups',
    name: 'Wide-Grip Pull-Ups',
    muscleGroup: 'Lats',
    subTarget: 'Latissimus Dorsi & Teres Major',
    equipment: 'bodyweight',
    movementPattern: 'vertical_pull',
    resistanceProfile: 'lengthened',
    jointStress: ['shoulder'],
    diagramType: 'lat_pulldown',
    defaultSets: 3,
    defaultReps: '6-10',
    restSeconds: 150,
    cues: [
      'Dead hang with arms fully extended to stretch lats at the bottom',
      'Engage shoulder blades down before bending elbows',
      'Pull until chin clears bar, driving chest toward the bar'
    ],
    commonMistake: 'Kicking legs or kipping to generate momentum instead of strict vertical lat pull.',
    swaps: ['lat-pulldown', 'single-arm-lat-pulldown', 'seated-cable-row']
  },
  {
    id: 'single-arm-lat-pulldown',
    name: 'Single-Arm Neutral Lat Pulldown',
    muscleGroup: 'Lats',
    subTarget: 'Lower Lat Fibers',
    equipment: 'cable',
    movementPattern: 'vertical_pull',
    resistanceProfile: 'lengthened',
    jointStress: [],
    diagramType: 'lat_pulldown',
    defaultSets: 3,
    defaultReps: '10-12',
    restSeconds: 90,
    cues: [
      'Use a D-handle with neutral grip aligned directly in lat line of pull',
      'Allow full elevation of scapula at top for maximal lat stretch',
      'Drive elbow down against hip without twisting torso'
    ],
    commonMistake: 'Over-rotating upper torso away from the pulley during concentric pull.',
    swaps: ['lat-pulldown', 'seated-cable-row', 'one-arm-db-row']
  },
  {
    id: 'barbell-bent-over-row',
    name: 'Barbell Bent-Over Row',
    muscleGroup: 'Upper Back',
    subTarget: 'Rhomboids, Mid-Traps & Lats',
    equipment: 'barbell',
    movementPattern: 'horizontal_row',
    resistanceProfile: 'shortened',
    jointStress: ['lower_back'],
    diagramType: 'row',
    defaultSets: 4,
    defaultReps: '6-8',
    restSeconds: 150,
    cues: [
      'Hinge at hips to 45° with neutral spine and slight knee bend',
      'Pull bar toward lower ribs/belly button pulling through elbows',
      'Squeeze shoulder blades together at peak without jerking torso up'
    ],
    commonMistake: 'Spinal flexion (rounding lower back) under heavy load putting lumbar discs at risk.',
    swaps: ['chest-supported-t-bar-row', 'seated-cable-row', 'one-arm-db-row']
  },
  {
    id: 'chest-supported-t-bar-row',
    name: 'Chest-Supported T-Bar Row',
    muscleGroup: 'Upper Back',
    subTarget: 'Mid Trapezius & Rhomboids',
    equipment: 'machine',
    movementPattern: 'horizontal_row',
    resistanceProfile: 'shortened',
    jointStress: [], // Lower-back safe! Perfect swap for lower_back pain
    diagramType: 'row',
    defaultSets: 3,
    defaultReps: '8-12',
    restSeconds: 120,
    cues: [
      'Press sternum flat against pad to completely eliminate lower-back strain',
      'Flare elbows 45° for upper back or keep tight to sides for lats',
      'Retract scapulae fully at top; stretch forward at the bottom'
    ],
    commonMistake: 'Lifting chest off pad to cheat the last 2 inches of range.',
    swaps: ['barbell-bent-over-row', 'seated-cable-row', 'one-arm-db-row']
  },
  {
    id: 'seated-cable-row',
    name: 'Seated Cable Row (Close Grip)',
    muscleGroup: 'Upper Back',
    subTarget: 'Mid Back & Lats',
    equipment: 'cable',
    movementPattern: 'horizontal_row',
    resistanceProfile: 'shortened',
    jointStress: ['lower_back'],
    diagramType: 'row',
    defaultSets: 3,
    defaultReps: '10-12',
    restSeconds: 90,
    cues: [
      'Sit tall with knees slightly bent and chest puffed out',
      'Pull handle to navel driving elbows straight back behind body',
      'Hold peak squeeze for 1s, then return under controlled 2s count'
    ],
    commonMistake: 'Excessive torso swinging back and forth creating momentum.',
    swaps: ['chest-supported-t-bar-row', 'barbell-bent-over-row', 'one-arm-db-row']
  },
  {
    id: 'one-arm-db-row',
    name: 'One-Arm Dumbbell Row',
    muscleGroup: 'Upper Back',
    subTarget: 'Latissimus Dorsi & Rhomboids',
    equipment: 'dumbbell',
    movementPattern: 'horizontal_row',
    resistanceProfile: 'lengthened',
    jointStress: [],
    diagramType: 'row',
    defaultSets: 3,
    defaultReps: '10-12',
    restSeconds: 90,
    cues: [
      'Brace knee and hand on bench with back flat parallel to floor',
      'Let dumbbell hang down for full lat and rhomboid stretch',
      'Pull dumbbell in an arc toward your hip pocket, not your armpit'
    ],
    commonMistake: 'Yanking weight straight up to chest using bicep instead of lat.',
    swaps: ['chest-supported-t-bar-row', 'seated-cable-row', 'barbell-bent-over-row']
  },
  {
    id: 'lat-prayer-pulldown',
    name: 'Straight-Arm Cable Lat Prayer',
    muscleGroup: 'Lats',
    subTarget: 'Teres Major & Lat Sweeps',
    equipment: 'cable',
    movementPattern: 'pullover',
    resistanceProfile: 'lengthened', // peak stretch overhead
    jointStress: [],
    diagramType: 'lat_pulldown',
    defaultSets: 3,
    defaultReps: '12-15',
    restSeconds: 90,
    cues: [
      'Hinge hips back slightly with arms extended overhead holding rope or bar',
      'Keep elbows fixed with a soft 10° bend throughout movement',
      'Sweep arms down to upper thighs in a wide circular arc contracting lats'
    ],
    commonMistake: 'Bending elbows into a tricep pushdown mid-rep.',
    swaps: ['lat-pulldown', 'pull-ups', 'single-arm-lat-pulldown']
  },

  // ==================== SHOULDERS (DELTS) ====================
  {
    id: 'overhead-barbell-press',
    name: 'Standing Barbell Overhead Press (OHP)',
    muscleGroup: 'Delts',
    subTarget: 'Anterior (Front) Delts & Triceps',
    equipment: 'barbell',
    movementPattern: 'vertical_press',
    resistanceProfile: 'lengthened',
    jointStress: ['shoulder', 'lower_back'],
    diagramType: 'overhead_press',
    defaultSets: 4,
    defaultReps: '5-7',
    restSeconds: 180,
    cues: [
      'Squeeze glutes and brace core tightly to protect lumbar spine',
      'Rest bar on clavicle with forearms perfectly vertical',
      'Press straight up, tucking chin back as bar passes face, then lock overhead'
    ],
    commonMistake: 'Hyperextending lower back into a makeshift incline press when weight gets heavy.',
    swaps: ['seated-db-shoulder-press', 'seated-machine-shoulder-press', 'arnold-press']
  },
  {
    id: 'seated-db-shoulder-press',
    name: 'Seated Dumbbell Shoulder Press',
    muscleGroup: 'Delts',
    subTarget: 'Anterior & Lateral Delts',
    equipment: 'dumbbell',
    movementPattern: 'vertical_press',
    resistanceProfile: 'lengthened',
    jointStress: ['shoulder'],
    diagramType: 'overhead_press',
    defaultSets: 3,
    defaultReps: '8-10',
    restSeconds: 120,
    cues: [
      'Set bench back to 80° (slight tilt) to prevent shoulder impingement',
      'Angle elbows 30° inward in scapular plane rather than straight sideways',
      'Press overhead along smooth converging arc to gentle tap at top'
    ],
    commonMistake: 'Flaring elbows directly out 90° stressing the acromioclavicular joint.',
    swaps: ['overhead-barbell-press', 'seated-machine-shoulder-press', 'arnold-press']
  },
  {
    id: 'db-lateral-raise',
    name: 'Dumbbell Lateral Raise',
    muscleGroup: 'Delts',
    subTarget: 'Lateral (Side) Deltoids',
    equipment: 'dumbbell',
    movementPattern: 'shoulder_raise',
    resistanceProfile: 'shortened', // peak load at top 90°
    jointStress: ['shoulder'],
    diagramType: 'lateral_raise',
    defaultSets: 4,
    defaultReps: '12-15',
    restSeconds: 90,
    cues: [
      'Tilt torso forward 10° with elbows slightly bent and fixed',
      'Lead with elbows as if pouring water from two jugs',
      'Raise only to shoulder height (90°); do not shrug with upper traps'
    ],
    commonMistake: 'Using leg drive and swinging body to fling heavy dumbbells up.',
    swaps: ['cable-lateral-raise', 'machine-lateral-raise']
  },
  {
    id: 'cable-lateral-raise',
    name: 'Behind-the-Back Cable Lateral Raise',
    muscleGroup: 'Delts',
    subTarget: 'Lateral (Side) Deltoids',
    equipment: 'cable',
    movementPattern: 'shoulder_raise',
    resistanceProfile: 'lengthened', // constant tension from bottom lengthened position
    jointStress: [],
    diagramType: 'lateral_raise',
    defaultSets: 3,
    defaultReps: '12-15',
    restSeconds: 90,
    cues: [
      'Set pulley at knee/wrist height and stand slightly forward',
      'Pull across body leading with outer deltoid up to shoulder plane',
      'Control the 3-second descent for continuous tension in bottom stretch'
    ],
    commonMistake: 'Letting wrist collapse or jerking cable with the torso.',
    swaps: ['db-lateral-raise', 'machine-lateral-raise']
  },
  {
    id: 'face-pull',
    name: 'Cable Rope Face Pull',
    muscleGroup: 'Delts',
    subTarget: 'Posterior (Rear) Delts & External Rotators',
    equipment: 'cable',
    movementPattern: 'horizontal_row',
    resistanceProfile: 'shortened',
    jointStress: [],
    diagramType: 'cable_fly',
    defaultSets: 3,
    defaultReps: '15-20',
    restSeconds: 75,
    cues: [
      'Set pulley at eye level with rope attachment; thumbs facing backward',
      'Pull rope towards bridge of nose while externally rotating hands back',
      'Hold peak double-bicep rear pose for 1 full second'
    ],
    commonMistake: 'Using excessive weight and turning the movement into a chest-level row.',
    swaps: ['reverse-pec-deck', 'rear-delt-db-flye']
  },
  {
    id: 'reverse-pec-deck',
    name: 'Reverse Pec Deck Flye',
    muscleGroup: 'Delts',
    subTarget: 'Posterior (Rear) Deltoids',
    equipment: 'machine',
    movementPattern: 'horizontal_abduction',
    resistanceProfile: 'shortened',
    jointStress: [],
    diagramType: 'cable_fly',
    defaultSets: 3,
    defaultReps: '12-15',
    restSeconds: 75,
    cues: [
      'Sit facing machine with chest firmly against pad, arms horizontal',
      'Use open-hand or neutral grip and push outward using rear delts',
      'Keep shoulder blades relatively still so rear delts do the isolation'
    ],
    commonMistake: 'Retracting scapulae aggressively which turns it into a rhomboid exercise.',
    swaps: ['face-pull', 'rear-delt-db-flye']
  },

  // ==================== LEGS (QUADS, HAMSTRINGS, GLUTES, CALVES) ====================
  {
    id: 'barbell-back-squat',
    name: 'Barbell Back Squat',
    muscleGroup: 'Quads',
    subTarget: 'Vastus Lateralis, Medialis & Glute Max',
    equipment: 'barbell',
    movementPattern: 'squat',
    resistanceProfile: 'lengthened', // maximum torque at bottom hole
    jointStress: ['knee', 'lower_back'],
    diagramType: 'squat',
    defaultSets: 4,
    defaultReps: '6-8',
    restSeconds: 180,
    cues: [
      'Rest bar securely on upper traps (high bar) or rear delts (low bar)',
      'Brace abdomen with 360° diaphragmatic breath (Valsalva)',
      'Break at hips and knees together, driving knees out in line with toes to parallel'
    ],
    commonMistake: 'Knee valgus (knees caving inward) and lumbar tuck at bottom depth.',
    swaps: ['leg-press', 'hack-squat', 'goblet-squat', 'db-bulgarian-split-squat']
  },
  {
    id: 'leg-press',
    name: '45° Plate-Loaded Leg Press',
    muscleGroup: 'Quads',
    subTarget: 'Quadriceps & Glutes',
    equipment: 'machine',
    movementPattern: 'squat',
    resistanceProfile: 'lengthened',
    jointStress: ['knee'],
    diagramType: 'leg_press',
    defaultSets: 4,
    defaultReps: '10-12',
    restSeconds: 120,
    cues: [
      'Place feet shoulder-width in middle of sled with toes slightly angled',
      'Keep lower back and tailbone glued to pad throughout full range',
      'Descend to 90° knee angle without letting pelvic butt-wink occur'
    ],
    commonMistake: 'Letting tailbone peel off the pad at bottom, crushing lumbar vertebrae.',
    swaps: ['barbell-back-squat', 'hack-squat', 'db-bulgarian-split-squat']
  },
  {
    id: 'leg-extension',
    name: 'Leg Extension Machine',
    muscleGroup: 'Quads',
    subTarget: 'Rectus Femoris (Peak Extension)',
    equipment: 'machine',
    movementPattern: 'knee_extension',
    resistanceProfile: 'shortened', // maximum tension at full straight leg lockout
    jointStress: ['knee'],
    diagramType: 'leg_extension',
    defaultSets: 3,
    defaultReps: '12-15',
    restSeconds: 90,
    cues: [
      'Align knee joints directly with the machine pivot axis',
      'Extend legs smoothly and squeeze quads hard for 1 full second at top',
      'Lower under 3-second control without letting weight stack touch'
    ],
    commonMistake: 'Kicking weight up fast and violently hyperextending knees.',
    swaps: ['sissy-squat', 'db-bulgarian-split-squat']
  },
  {
    id: 'db-bulgarian-split-squat',
    name: 'Dumbbell Bulgarian Split Squat',
    muscleGroup: 'Quads',
    subTarget: 'Quads & Glute Max (Lengthened)',
    equipment: 'dumbbell',
    movementPattern: 'lunge',
    resistanceProfile: 'lengthened',
    jointStress: ['knee'],
    diagramType: 'squat',
    defaultSets: 3,
    defaultReps: '8-10 / leg',
    restSeconds: 90,
    cues: [
      'Rest rear foot laces down on bench with front foot 2-3 feet ahead',
      'Drop rear knee down toward floor while keeping front shin relatively upright',
      'Push through front midfoot to return to top position'
    ],
    commonMistake: 'Taking too short a stance pushing excessive shear through front knee patella.',
    swaps: ['leg-press', 'barbell-back-squat', 'walking-lunges']
  },
  {
    id: 'romanian-deadlift',
    name: 'Barbell Romanian Deadlift (RDL)',
    muscleGroup: 'Hamstrings',
    subTarget: 'Hamstrings & Gluteal Fold',
    equipment: 'barbell',
    movementPattern: 'hinge',
    resistanceProfile: 'lengthened', // peak hamstring stretch at bottom hinge
    jointStress: ['lower_back'],
    diagramType: 'deadlift',
    defaultSets: 4,
    defaultReps: '8-10',
    restSeconds: 150,
    cues: [
      'Start standing with soft knee bend; push hips backward like shutting a door',
      'Keep bar skimming down thighs and shins with spine locked rigid',
      'Hinge only until hamstrings reach end of stretch (mid-shin level), then drive hips forward'
    ],
    commonMistake: 'Squatting the weight down or rounding spine once hamstrings run out of flexibility.',
    swaps: ['seated-leg-curl', 'lying-leg-curl', 'db-romanian-deadlift']
  },
  {
    id: 'seated-leg-curl',
    name: 'Seated Hamstring Leg Curl',
    muscleGroup: 'Hamstrings',
    subTarget: 'Biceps Femoris & Semitendinosus',
    equipment: 'machine',
    movementPattern: 'knee_flexion',
    resistanceProfile: 'shortened',
    jointStress: [], // Extremely safe for lower back!
    diagramType: 'leg_curl',
    defaultSets: 3,
    defaultReps: '10-12',
    restSeconds: 90,
    cues: [
      'Lock thigh pad securely over quads to prevent hips rising',
      'Dorsiflex ankles (toes up towards shins) to optimize hamstring recruitment',
      'Curl heel pad fully under seat and pause for 1 second'
    ],
    commonMistake: 'Allowing hips to lift off the seat during the forceful curl.',
    swaps: ['lying-leg-curl', 'romanian-deadlift']
  },
  {
    id: 'lying-leg-curl',
    name: 'Lying Hamstring Leg Curl',
    muscleGroup: 'Hamstrings',
    subTarget: 'Hamstring Peak Contraction',
    equipment: 'machine',
    movementPattern: 'knee_flexion',
    resistanceProfile: 'shortened',
    jointStress: ['lower_back'],
    diagramType: 'leg_curl',
    defaultSets: 3,
    defaultReps: '10-12',
    restSeconds: 90,
    cues: [
      'Keep pelvis pressed flat into pad to prevent lumbar hyperextension',
      'Align knee joints with pivot point; curl heels all the way to glutes',
      'Control eccentric return under 3-second eccentric tempo'
    ],
    commonMistake: 'Arching lower back violently off the pad to lift heavier weights.',
    swaps: ['seated-leg-curl', 'romanian-deadlift']
  },
  {
    id: 'barbell-hip-thrust',
    name: 'Barbell Hip Thrust',
    muscleGroup: 'Glutes',
    subTarget: 'Gluteus Maximus (Peak Extension)',
    equipment: 'barbell',
    movementPattern: 'bridge',
    resistanceProfile: 'shortened', // peak tension at horizontal lockout
    jointStress: [],
    diagramType: 'hip_thrust',
    defaultSets: 4,
    defaultReps: '10-12',
    restSeconds: 120,
    cues: [
      'Rest upper back against bench with padded barbell across hip crease',
      'Feet shoulder-width apart; shins vertical at top of movement',
      'Drive hips to full extension and squeeze glutes hard for 2 seconds with ribs down'
    ],
    commonMistake: 'Hyperextending lumbar spine at top instead of achieving posterior pelvic tilt.',
    swaps: ['cable-glute-kickback', 'romanian-deadlift', 'db-bulgarian-split-squat']
  },
  {
    id: 'cable-glute-kickback',
    name: 'Standing Cable Glute Kickback',
    muscleGroup: 'Glutes',
    subTarget: 'Gluteus Maximus & Medius',
    equipment: 'cable',
    movementPattern: 'hip_extension',
    resistanceProfile: 'shortened',
    jointStress: [],
    diagramType: 'hip_thrust',
    defaultSets: 3,
    defaultReps: '12-15',
    restSeconds: 75,
    cues: [
      'Strap ankle cuff to low pulley; lean torso 45° holding frame',
      'Kick leg straight back in line with glute fibers',
      'Squeeze glute at apex without rotating hips or arching spine'
    ],
    commonMistake: 'Swinging the leg with lower back arching instead of pure hip extension.',
    swaps: ['barbell-hip-thrust', 'romanian-deadlift']
  },
  {
    id: 'standing-calf-raise',
    name: 'Standing Machine Calf Raise',
    muscleGroup: 'Calves',
    subTarget: 'Gastrocnemius',
    equipment: 'machine',
    movementPattern: 'calf_raise',
    resistanceProfile: 'lengthened', // peak deep ankle dorsiflexion stretch
    jointStress: [],
    diagramType: 'calf_raise',
    defaultSets: 4,
    defaultReps: '12-15',
    restSeconds: 75,
    cues: [
      'Balls of feet on block with knees straight but unlocked',
      'Lower heels as deep as possible and hold bottom stretch for 2 full seconds',
      'Explode up onto big toes and hold top contraction for 1 second'
    ],
    commonMistake: 'Bouncing up and down using Achilles tendon elasticity instead of muscular work.',
    swaps: ['seated-calf-raise', 'leg-press-calf-raise']
  },
  {
    id: 'seated-calf-raise',
    name: 'Seated Calf Raise',
    muscleGroup: 'Calves',
    subTarget: 'Soleus',
    equipment: 'machine',
    movementPattern: 'calf_raise',
    resistanceProfile: 'shortened',
    jointStress: [],
    diagramType: 'calf_raise',
    defaultSets: 3,
    defaultReps: '15-20',
    restSeconds: 60,
    cues: [
      'Sit with knees bent at 90° to slacken the gastrocnemius and target the soleus',
      'Descend into full bottom stretch and pause for 2 seconds',
      'Press through balls of feet to maximal ankle plantarflexion'
    ],
    commonMistake: 'Using short rapid half-reps without reaching the bottom stretch.',
    swaps: ['standing-calf-raise']
  },

  // ==================== ARMS (BICEPS & TRICEPS) ====================
  {
    id: 'incline-db-curl',
    name: 'Incline Dumbbell Bicep Curl',
    muscleGroup: 'Biceps',
    subTarget: 'Long Head (Peak & Stretch)',
    equipment: 'dumbbell',
    movementPattern: 'arm_curl',
    resistanceProfile: 'lengthened', // shoulder extension puts long head into deep passive stretch
    jointStress: ['shoulder'],
    diagramType: 'incline_curl',
    defaultSets: 3,
    defaultReps: '10-12',
    restSeconds: 90,
    cues: [
      'Set bench to 45-60° and let arms hang completely straight downward',
      'Curl dumbbells up while keeping elbows pinned back behind torso',
      'Supinate wrists (pinkies up) hard at the top of the curl'
    ],
    commonMistake: 'Swinging elbows forward during the curl, turning it into a front-delt lift.',
    swaps: ['preacher-curl', 'standing-barbell-curl', 'bayesian-cable-curl']
  },
  {
    id: 'preacher-curl',
    name: 'EZ-Bar Preacher Curl',
    muscleGroup: 'Biceps',
    subTarget: 'Short Head & Brachialis',
    equipment: 'barbell',
    movementPattern: 'arm_curl',
    resistanceProfile: 'shortened', // peak overload at mid-to-shortened range with arm forward
    jointStress: [],
    diagramType: 'bicep_curl',
    defaultSets: 3,
    defaultReps: '10-12',
    restSeconds: 90,
    cues: [
      'Armpits wedged firmly into top edge of pad with triceps flat against vinyl',
      'Curl bar up stopping slightly before vertical to keep continuous tension',
      'Lower bar with strict 3-second control stopping just shy of elbow hyperextension'
    ],
    commonMistake: 'Dropping weight quickly to bottom bounce risking bicep tendon strain.',
    swaps: ['incline-db-curl', 'standing-barbell-curl', 'hammer-curl']
  },
  {
    id: 'standing-barbell-curl',
    name: 'Standing EZ-Bar Bicep Curl',
    muscleGroup: 'Biceps',
    subTarget: 'Overall Bicep Mass',
    equipment: 'barbell',
    movementPattern: 'arm_curl',
    resistanceProfile: 'shortened',
    jointStress: [],
    diagramType: 'bicep_curl',
    defaultSets: 3,
    defaultReps: '8-10',
    restSeconds: 90,
    cues: [
      'Grip cambered EZ-bar with hands just inside shoulder width',
      'Pin elbows against ribs; curl bar smoothly toward clavicle',
      'Do not allow elbows to drift forward more than 2 inches'
    ],
    commonMistake: 'Rocking torso backward to swing heavy weights up.',
    swaps: ['incline-db-curl', 'preacher-curl', 'hammer-curl']
  },
  {
    id: 'hammer-curl',
    name: 'Standing Neutral Dumbbell Hammer Curl',
    muscleGroup: 'Biceps',
    subTarget: 'Brachialis & Brachioradialis (Forearm)',
    equipment: 'dumbbell',
    movementPattern: 'arm_curl',
    resistanceProfile: 'constant',
    jointStress: [],
    diagramType: 'bicep_curl',
    defaultSets: 3,
    defaultReps: '10-12',
    restSeconds: 75,
    cues: [
      'Hold dumbbells with palms facing each other (neutral grip)',
      'Curl upward keeping wrists locked rigid and forearms tight',
      'Squeeze brachialis at peak contraction for 1 second'
    ],
    commonMistake: 'Flaring elbows outward or swinging hips.',
    swaps: ['preacher-curl', 'rope-cable-hammer-curl']
  },
  {
    id: 'overhead-cable-tricep-extension',
    name: 'Overhead Cable Tricep Extension',
    muscleGroup: 'Triceps',
    subTarget: 'Long Head (Lengthened Stretch)',
    equipment: 'cable',
    movementPattern: 'arm_extension',
    resistanceProfile: 'lengthened', // shoulder flexion puts tricep long head in deep stretch
    jointStress: ['shoulder'],
    diagramType: 'tricep_overhead',
    defaultSets: 3,
    defaultReps: '10-12',
    restSeconds: 90,
    cues: [
      'Face away from high/mid pulley holding rope behind head',
      'Keep upper arms angled forward and elbows pointing ahead',
      'Extend forearms forward, spreading rope ends apart at full extension'
    ],
    commonMistake: 'Flaring elbows wide sideways, losing long-head tension.',
    swaps: ['tricep-rope-pushdown', 'barbell-skullcrusher']
  },
  {
    id: 'tricep-rope-pushdown',
    name: 'Cable Tricep Rope Pushdown',
    muscleGroup: 'Triceps',
    subTarget: 'Lateral & Medial Heads (Shortened)',
    equipment: 'cable',
    movementPattern: 'arm_extension',
    resistanceProfile: 'shortened', // peak contraction at bottom elbow lockout
    jointStress: [],
    diagramType: 'tricep_pushdown',
    defaultSets: 3,
    defaultReps: '12-15',
    restSeconds: 75,
    cues: [
      'Stand with slight forward torso tilt; pin elbows firmly against ribs',
      'Push rope downward until elbows are fully locked out',
      'Flare rope ends apart at bottom for maximal lateral head squeeze'
    ],
    commonMistake: 'Letting elbows travel forward and backward turning it into a press.',
    swaps: ['overhead-cable-tricep-extension', 'barbell-skullcrusher']
  },
  {
    id: 'barbell-skullcrusher',
    name: 'EZ-Bar Lying Skullcrusher',
    muscleGroup: 'Triceps',
    subTarget: 'Long & Lateral Heads',
    equipment: 'barbell',
    movementPattern: 'arm_extension',
    resistanceProfile: 'lengthened',
    jointStress: ['shoulder'],
    diagramType: 'tricep_overhead',
    defaultSets: 3,
    defaultReps: '8-10',
    restSeconds: 90,
    cues: [
      'Lie flat holding EZ-bar with arms angled back slightly (15°) past vertical',
      'Hinge only at elbows to lower bar toward hairline/forehead',
      'Drive forearms back up while maintaining 15° back angle'
    ],
    commonMistake: 'Flaring elbows outward or letting bar drift forward over chest.',
    swaps: ['overhead-cable-tricep-extension', 'tricep-rope-pushdown']
  },

  // ==================== ABS & CORE ====================
  {
    id: 'cable-kneeling-crunch',
    name: 'Kneeling Cable Rope Crunch',
    muscleGroup: 'Abs',
    subTarget: 'Rectus Abdominis (Shortened)',
    equipment: 'cable',
    movementPattern: 'core_flexion',
    resistanceProfile: 'shortened',
    jointStress: [],
    diagramType: 'cable_crunch',
    defaultSets: 3,
    defaultReps: '12-15',
    restSeconds: 75,
    cues: [
      'Kneel facing or away from high pulley holding rope next to ears',
      'Fix hips in place; flex spine by curling ribs down toward pelvis',
      'Exhale completely at bottom peak squeeze; inhale on stretch back up'
    ],
    commonMistake: 'Hinging at hips like a bow instead of actively flexing the spine.',
    swaps: ['hanging-leg-raise', 'ab-wheel-rollout']
  },
  {
    id: 'hanging-leg-raise',
    name: 'Hanging Leg / Knee Raise',
    muscleGroup: 'Abs',
    subTarget: 'Lower Rectus Abdominis & Deep Core',
    equipment: 'bodyweight',
    movementPattern: 'core_flexion',
    resistanceProfile: 'lengthened',
    jointStress: ['shoulder'],
    diagramType: 'hanging_leg_raise',
    defaultSets: 3,
    defaultReps: '10-15',
    restSeconds: 75,
    cues: [
      'Dead hang from bar with core pre-braced and shoulders active',
      'Curl pelvis upward toward ribcage rather than just swinging legs up',
      'Lower legs slowly with 3-second control without swinging body'
    ],
    commonMistake: 'Swinging legs with hip flexor momentum without pelvic posterior tilt.',
    swaps: ['cable-kneeling-crunch', 'ab-wheel-rollout']
  },
  {
    id: 'ab-wheel-rollout',
    name: 'Ab Wheel Rollout',
    muscleGroup: 'Abs',
    subTarget: 'Anti-Extension Core & Lat Stability',
    equipment: 'bodyweight',
    movementPattern: 'core_anti_extension',
    resistanceProfile: 'lengthened',
    jointStress: ['lower_back'],
    diagramType: 'cable_crunch',
    defaultSets: 3,
    defaultReps: '8-12',
    restSeconds: 90,
    cues: [
      'Kneel with wheel under shoulders, glutes clenched and spine slightly rounded',
      'Roll wheel forward smoothly as far as you can while maintaining braced core',
      'Pull back by contracting abs and squeezing hips forward'
    ],
    commonMistake: 'Letting lower back sag into hyperextension, placing shear force on lumbar spine.',
    swaps: ['cable-kneeling-crunch', 'hanging-leg-raise']
  }
];

// Split Definitions for Quick Selection
export const PRESET_SPLITS = [
  {
    id: 'push',
    name: 'Push (Chest, Delts, Triceps)',
    description: 'Anterior chain power & hypertrophy with balanced lengthened + shortened pairs',
    muscles: ['Chest', 'Delts', 'Triceps'],
    exerciseIds: [
      'flat-barbell-bench-press',
      'incline-db-press',
      'standing-cable-flye',
      'db-lateral-raise',
      'overhead-cable-tricep-extension',
      'tricep-rope-pushdown'
    ]
  },
  {
    id: 'pull',
    name: 'Pull (Lats, Upper Back, Rear Delts, Biceps)',
    description: 'V-taper lat width, mid-back density, and dual-profile bicep overload',
    muscles: ['Lats', 'Upper Back', 'Biceps'],
    exerciseIds: [
      'lat-pulldown',
      'chest-supported-t-bar-row',
      'face-pull',
      'lat-prayer-pulldown',
      'incline-db-curl',
      'preacher-curl'
    ]
  },
  {
    id: 'legs',
    name: 'Legs (Quads, Hamstrings, Glutes, Calves)',
    description: 'Quad tear-drop development, knee-friendly hamstring curls, and calf stretch',
    muscles: ['Quads', 'Hamstrings', 'Glutes', 'Calves'],
    exerciseIds: [
      'barbell-back-squat',
      'romanian-deadlift',
      'leg-press',
      'seated-leg-curl',
      'barbell-hip-thrust',
      'standing-calf-raise'
    ]
  },
  {
    id: 'upper',
    name: 'Upper Body Complete',
    description: 'Comprehensive high-efficiency upper torso compound workout',
    muscles: ['Chest', 'Lats', 'Delts', 'Biceps', 'Triceps'],
    exerciseIds: [
      'incline-db-press',
      'lat-pulldown',
      'chest-supported-t-bar-row',
      'cable-lateral-raise',
      'incline-db-curl',
      'overhead-cable-tricep-extension'
    ]
  },
  {
    id: 'lower',
    name: 'Lower Body & Core',
    description: 'Total lower kinetic chain strength, posterior chain power, and anti-extension abs',
    muscles: ['Quads', 'Hamstrings', 'Glutes', 'Abs'],
    exerciseIds: [
      'leg-press',
      'romanian-deadlift',
      'leg-extension',
      'seated-leg-curl',
      'cable-kneeling-crunch'
    ]
  },
  {
    id: 'arms',
    name: 'Arm Specialization (Guns & Shoulders)',
    description: 'Maximum arm hyper-trophy targeting both heads of biceps and all 3 tricep heads',
    muscles: ['Biceps', 'Triceps', 'Delts'],
    exerciseIds: [
      'incline-db-curl',
      'preacher-curl',
      'overhead-cable-tricep-extension',
      'tricep-rope-pushdown',
      'cable-lateral-raise',
      'face-pull'
    ]
  },
  {
    id: 'full_body',
    name: 'Full Body Athletic Engine',
    description: 'Total body balance for busy 3-day/week athletes',
    muscles: ['Quads', 'Chest', 'Lats', 'Hamstrings', 'Delts'],
    exerciseIds: [
      'barbell-back-squat',
      'flat-barbell-bench-press',
      'lat-pulldown',
      'romanian-deadlift',
      'cable-lateral-raise',
      'cable-kneeling-crunch'
    ]
  }
];
