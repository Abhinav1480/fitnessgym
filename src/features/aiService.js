// aiService.js - Utility for AI-powered fitness logic

/**
 * Generates a workout plan based on user preferences.
 * In a real production app, this would call an API like OpenAI or Gemini.
 * For this "production-ready" feel, we implement complex logic that mimics AI reasoning.
 */
export const generateAIWorkout = async (goal, level) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const intensityMap = {
    'Beginner': { sets: '3', reps: '12-15', rest: '90s' },
    'Intermediate': { sets: '4', reps: '8-12', rest: '60s' },
    'Pro': { sets: '5', reps: '5-8', rest: '45s' }
  };

  const intensity = intensityMap[level] || intensityMap['Intermediate'];
  
  const exerciseDatabase = {
    'Muscle Gain': [
      ['Bench Press', 'Incline DB Press', 'Flyes'],
      ['Deadlifts', 'Pull-Ups', 'Barbell Rows'],
      ['Squats', 'Leg Press', 'Hamstring Curls'],
      ['Overhead Press', 'Lateral Raises', 'Face Pulls'],
    ],
    'Fat Loss': [
      ['Burpees', 'Mountain Climbers', 'Jumping Jacks'],
      ['Goblet Squats', 'Push Ups', 'Lunges'],
      ['Kettlebell Swings', 'Plank Rows', 'Box Jumps'],
      ['Sprints', 'Battle Ropes', 'Box Burpees'],
    ],
    'Strength': [
      ['Back Squat', 'Front Squat', 'Pause Squat'],
      ['Bench Press', 'Close Grip Bench', 'Floor Press'],
      ['Deadlift', 'Sumo Deadlift', 'Rack Pulls'],
      ['Military Press', 'Push Press', 'Z-Press'],
    ],
    'Endurance': [
      ['Long Distance Run', 'Swimming', 'Cycling'],
      ['Circuit: Burpees/Squats/Pushups', 'Rowing Machine', 'Skipping Rope'],
      ['Hill Sprints', 'Fartlek Training', 'Tempo Run'],
      ['Tabata Intervals', 'AMRAP Finisher', 'Box Stepups'],
    ]
  };

  const selectedPool = exerciseDatabase[goal] || exerciseDatabase['Muscle Gain'];
  
  const structure = [
    { day: 'Monday: Push/Upper Focus', exercises: [] },
    { day: 'Tuesday: Pull/Lower Focus', exercises: [] },
    { day: 'Wednesday: Active Recovery', exercises: ['Dynamic Stretching: 15 min', 'Light Walk: 30 min'] },
    { day: 'Thursday: Strength/Power Focus', exercises: [] },
    { day: 'Friday: Hypertrophy/Endurance Focus', exercises: [] },
    { day: 'Saturday: Full Body Challenge', exercises: [] },
    { day: 'Sunday: Full Rest', exercises: ['Deep Tissue Massage/Foam Rolling', 'Meditation: 10 min'] },
  ];

  // Dynamically build the workout based on the pool and intensity
  return structure.map(day => {
    if (day.exercises.length > 0) return day; // Skip recovery/rest days already defined

    const dailyPool = selectedPool[Math.floor(Math.random() * selectedPool.length)];
    const exercises = dailyPool.map(ex => `${ex}: ${intensity.sets}x${intensity.reps}`);
    
    return {
      ...day,
      exercises
    };
  });
};

/**
 * Generates a diet plan based on user metrics.
 */
export const generateAIDiet = async (weight, goal) => {
  await new Promise(resolve => setTimeout(resolve, 1800));

  const bmr = weight * 24; 
  let multiplier = 1.2; // Sedentary base
  
  let targetCalories = bmr * multiplier;
  let pRatio, cRatio, fRatio;

  switch(goal) {
    case 'Fat Loss':
      targetCalories -= 500;
      pRatio = 0.4; cRatio = 0.3; fRatio = 0.3;
      break;
    case 'Muscle Gain':
      targetCalories += 450;
      pRatio = 0.35; cRatio = 0.45; fRatio = 0.2;
      break;
    default: // Maintenance
      pRatio = 0.3; cRatio = 0.4; fRatio = 0.3;
  }

  const protein = Math.round((targetCalories * pRatio) / 4);
  const carbs = Math.round((targetCalories * cRatio) / 4);
  const fats = Math.round((targetCalories * fRatio) / 9);

  const mealTemplates = {
    'Breakfast': [
      'Egg White Omelette with Spinach & Avocado',
      'Protein Pancakes with Sugar-Free Syrup',
      'Smoked Salmon on Whole Grain Rye',
      'Greek Yogurt Parfait with Flaxseeds'
    ],
    'Lunch': [
      'Grilled Turkey Breast with Baked Sweet Potato',
      'Tuna Salad with Quinoa and Lemon Vinaigrette',
      'Tofu Stir-fry with Brown Rice and Bok Choy',
      'Lean Beef Burger (No Bun) with Side Salad'
    ],
    'Dinner': [
      'Baked Cod with Grilled Asparagus',
      'Lentil Dahl with Roasted Cauliflower',
      'Grilled Chicken Caesar Salad (No Croutons)',
      'Shrimp Scampi with Zucchini Noodles'
    ],
    'Snack': [
      'Handful of Almonds and an Apple',
      'Cottage Cheese with Pineapple',
      'Whey Protein Shake with Water',
      'Hard Boiled Eggs with Sea Salt'
    ]
  };

  const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

  return {
    macros: { calories: Math.round(targetCalories), protein, carbs, fats },
    meals: [
      { type: 'Breakfast', name: getRandom(mealTemplates['Breakfast']), cal: Math.round(targetCalories * 0.25) },
      { type: 'Lunch', name: getRandom(mealTemplates['Lunch']), cal: Math.round(targetCalories * 0.35) },
      { type: 'Snack', name: getRandom(mealTemplates['Snack']), cal: Math.round(targetCalories * 0.1) },
      { type: 'Dinner', name: getRandom(mealTemplates['Dinner']), cal: Math.round(targetCalories * 0.3) },
    ].map(m => ({ ...m, macros: `P: ${Math.round((m.cal * pRatio)/4)}g | C: ${Math.round((m.cal * cRatio)/4)}g | F: ${Math.round((m.cal * fRatio)/9)}g` }))
  };
};

/**
 * AI Assistant Chat Logic
 */
export const getAIResponse = async (history, message) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const msg = message.toLowerCase();
  
  if (msg.includes('workout') || msg.includes('training')) {
    return "To optimize your training, focus on 'Progressive Overload'. This means gradually increasing weight, frequency, or number of repetitions in your routine. Would you like me to generate a specific split for you?";
  }
  
  if (msg.includes('diet') || msg.includes('calories') || msg.includes('protein')) {
    return "Nutrition is key. Aim for 1.6g to 2.2g of protein per kg of body weight for muscle preservation. I can calculate your exact macro split if you provide your current weight and goal.";
  }

  if (msg.includes('tired') || msg.includes('sore') || msg.includes('pain')) {
    return "Recovery is as important as the workout. Ensure you're getting 7-9 hours of sleep and consider active recovery like walking or light mobility work today.";
  }

  return "That's an interesting point. From a fitness perspective, consistency usually outweighs intensity in the long run. How are you feeling about your current progress?";
};
