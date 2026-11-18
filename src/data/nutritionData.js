// APEX Form AI - High-Protein Macro & Supplement Nutrition Engine
// Specialized for Indian Vegetarian, Eggetarian, Non-Veg, and Vegan athlete profiles

export const FOOD_DATABASE = [
  // ================= Indian Vegetarian & Eggetarian Staples =================
  {
    id: 'soya-chunks',
    name: 'Soya Chunks / Mealmaker',
    category: 'Vegetarian High-Protein',
    dietCategory: ['vegetarian', 'eggetarian', 'vegan', 'non_vegetarian'],
    serving: '100g (dry)',
    protein: 52,
    carbs: 33,
    fats: 0.5,
    calories: 345,
    bioavailabilityScore: '92% (Rich in BCAA & Glutamine)',
    timing: 'Post-Workout / Main Meal',
    iconName: 'Sparkles',
    tip: 'Boil with pinch of salt, rinse twice in cold water and squeeze dry for neutral taste.'
  },
  {
    id: 'paneer-lowfat',
    name: 'Low-Fat Cottage Cheese / Paneer',
    category: 'Vegetarian Dairy',
    dietCategory: ['vegetarian', 'eggetarian', 'non_vegetarian'],
    serving: '100g',
    protein: 25,
    carbs: 4,
    fats: 3,
    calories: 145,
    bioavailabilityScore: '85% (Slow-digesting Casein)',
    timing: 'Pre-Bed / Dinner',
    iconName: 'Moon',
    tip: 'Slow-digesting micellar casein feeds muscle protein synthesis across 7 hours of sleep.'
  },
  {
    id: 'whey-isolate',
    name: 'Whey Protein Isolate (Cold-Filtered)',
    category: 'Supplement / Rapid Absorption',
    dietCategory: ['vegetarian', 'eggetarian', 'non_vegetarian'],
    serving: '1 scoop (32g)',
    protein: 27,
    carbs: 1.5,
    fats: 0.5,
    calories: 120,
    bioavailabilityScore: '100% (PDCAAS 1.0, 3g Leucine)',
    timing: 'Immediate Post-Workout',
    iconName: 'Zap',
    tip: 'Triggers the leucine threshold (mTORC1) within 35 minutes of workout completion.'
  },
  {
    id: 'greek-yogurt',
    name: 'Greek Yogurt / Hung Curd',
    category: 'Vegetarian Dairy',
    dietCategory: ['vegetarian', 'eggetarian', 'non_vegetarian'],
    serving: '100g',
    protein: 10,
    carbs: 4,
    fats: 0.5,
    calories: 60,
    bioavailabilityScore: '88% (Gut microbiome + Casein)',
    timing: 'Mid-Day Snack / Post-Workout',
    iconName: 'Heart',
    tip: 'High probiotic bacterial count accelerates gut micronutrient absorption.'
  },
  {
    id: 'whole-eggs',
    name: 'Whole Pasture Eggs (Boiled / Omelette)',
    category: 'Eggetarian Whole Food',
    dietCategory: ['eggetarian', 'non_vegetarian'],
    serving: '2 large whole eggs (100g)',
    protein: 13,
    carbs: 1,
    fats: 10,
    calories: 146,
    bioavailabilityScore: '100% (Gold Standard BV 100)',
    timing: 'Breakfast / Pre-Workout',
    iconName: 'Sun',
    tip: 'Yolk contains choline, omega-3, and cholesterol essential for testosterone synthesis.'
  },
  {
    id: 'egg-whites',
    name: 'Pasteurized Egg Whites',
    category: 'Eggetarian Lean Protein',
    dietCategory: ['eggetarian', 'non_vegetarian'],
    serving: '100ml / ~3 whites',
    protein: 11,
    carbs: 0.7,
    fats: 0.2,
    calories: 48,
    bioavailabilityScore: '98% (Zero fat, rapid digestion)',
    timing: 'Breakfast / Snack',
    iconName: 'Activity',
    tip: 'Pure albumin protein with zero saturated fats, ideal for aggressive cutting phases.'
  },
  {
    id: 'yellow-moong-dal',
    name: 'Yellow Moong Dal / Lentil Khichdi',
    category: 'Vegetarian Whole Lentil',
    dietCategory: ['vegetarian', 'eggetarian', 'vegan', 'non_vegetarian'],
    serving: '100g (cooked)',
    protein: 8,
    carbs: 20,
    fats: 0.5,
    calories: 116,
    bioavailabilityScore: '75% (Pair with rice for complete amino acid profile)',
    timing: 'Lunch / Pre-Workout Fuel',
    iconName: 'Coffee',
    tip: 'Combines methionine (from grains) and lysine (from dal) into complete protein.'
  },
  {
    id: 'tofu-firm',
    name: 'Organic Sprouted Firm Tofu',
    category: 'Vegan Plant Protein',
    dietCategory: ['vegetarian', 'eggetarian', 'vegan', 'non_vegetarian'],
    serving: '100g',
    protein: 17,
    carbs: 2,
    fats: 8,
    calories: 144,
    bioavailabilityScore: '86% (Isoflavone rich)',
    timing: 'Lunch / Dinner',
    iconName: 'Shield',
    tip: 'Pan-sear in cold-pressed mustard oil with cumin, turmeric, and black pepper.'
  },
  {
    id: 'chicken-breast',
    name: 'Skinless Chicken Breast (Grilled)',
    category: 'Non-Vegetarian Lean Meat',
    dietCategory: ['non_vegetarian'],
    serving: '100g (cooked)',
    protein: 31,
    carbs: 0,
    fats: 3.5,
    calories: 165,
    bioavailabilityScore: '94% (High natural creatine)',
    timing: 'Post-Workout / Main Meal',
    iconName: 'Flame',
    tip: 'Contains 450mg of natural carnosine and creatine per 100g serving.'
  },
  {
    id: 'rolled-oats',
    name: 'Rolled Oats with Cinnamon & Chia',
    category: 'Complex Carb Energy',
    dietCategory: ['vegetarian', 'eggetarian', 'vegan', 'non_vegetarian'],
    serving: '50g (dry)',
    protein: 6.5,
    carbs: 34,
    fats: 3,
    calories: 190,
    bioavailabilityScore: 'High Beta-Glucan fiber',
    timing: 'Pre-Workout (60-90m prior)',
    iconName: 'TrendingUp',
    tip: 'Sustained low-glycemic glycogen replenishment prevents mid-workout energy crashes.'
  }
];

// Helper calculations
export function calculateBMR(weightKg, heightCm, ageYears, sex) {
  if (sex === 'male') {
    return Math.round(10 * weightKg + 6.25 * heightCm - 5 * ageYears + 5);
  } else {
    return Math.round(10 * weightKg + 6.25 * heightCm - 5 * ageYears - 161);
  }
}

export function calculateTDEE(bmr, daysPerWeek) {
  let multiplier = 1.35; // base
  if (daysPerWeek <= 3) multiplier = 1.375;
  else if (daysPerWeek <= 4) multiplier = 1.5;
  else if (daysPerWeek <= 5) multiplier = 1.6;
  else multiplier = 1.725;

  return Math.round(bmr * multiplier);
}

export function calculateMacros(weightKg, tdee, goal) {
  let targetCalories = tdee;
  if (goal === 'hypertrophy') {
    targetCalories = tdee + 300; // Controlled lean surplus
  } else if (goal === 'fat_loss') {
    targetCalories = tdee - 450; // Moderate sustainable deficit
  } else if (goal === 'strength') {
    targetCalories = tdee + 150;
  }

  // Protein target: 2.1g per kg bodyweight
  const proteinGrams = Math.round(weightKg * 2.1);
  const proteinCalories = proteinGrams * 4;

  // Fats target: 25% of total calories
  const fatCalories = Math.round(targetCalories * 0.25);
  const fatGrams = Math.round(fatCalories / 9);

  // Remainder to Carbs
  const carbCalories = Math.max(0, targetCalories - proteinCalories - fatCalories);
  const carbGrams = Math.round(carbCalories / 4);

  return {
    calories: targetCalories,
    protein: proteinGrams,
    carbs: carbGrams,
    fats: fatGrams,
    waterLiters: Number((weightKg * 0.04).toFixed(1))
  };
}

// Pre-Workout vs Post-Workout Nutrient Timing Split
export function getSupplementTimingProtocol(diet, goal, weightKg) {
  const isVeg = diet === 'vegetarian' || diet === 'vegan';
  const preProtein = isVeg ? '15g Plant/Whey isolate or 100g Greek Yogurt' : '2 Boiled Eggs or 20g Whey';
  const postProtein = isVeg ? '30g Whey Isolate / Soya Blend (3g Leucine)' : '30g Whey Isolate + 100g Grilled Chicken/Fish';

  return {
    preWorkout: {
      window: '45–60 Minutes Before Session',
      goal: 'Cellular Glycogen Saturation & Nitric Oxide Vasodilation',
      items: [
        { name: 'Complex Carbohydrate', dosage: '40–50g Carbs', example: '1 Banana + 40g Oats with pinch of Himalayan pink salt' },
        { name: 'Light Protein Primer', dosage: '15–20g Protein', example: preProtein },
        { name: 'Ergogenic Caffeine / L-Citrulline', dosage: '150–200mg Caffeine + 6g Citrulline Malate', example: 'Black Americano or Non-stim Pre-workout pump' },
        { name: 'Hydration Electrolytes', dosage: '500ml Water + 300mg Sodium', example: 'Prevents intra-set muscle cramping and enhances muscle pump' }
      ]
    },
    postWorkout: {
      window: 'Within 30–60 Minutes Post Session',
      goal: 'mTORC1 Muscle Protein Synthesis & Glycogen Super-Compensation',
      items: [
        { name: 'Rapid Leucine-Rich Whey', dosage: '28–35g Protein', example: postProtein },
        { name: 'High-Glycemic Fast Carbohydrate', dosage: '40–60g Carbs', example: 'White rice flakes (Poha), Honey on toast, or 300ml Tender coconut water' },
        { name: 'Creatine Monohydrate (Creapure)', dosage: '5g Daily', example: 'Replenishes intramuscular phosphocreatine stores for maximal strength output' },
        { name: 'Hydration Recovery', dosage: '750ml Water', example: 'Drink 1.5x of estimated sweat volume lost during floor session' }
      ]
    }
  };
}
