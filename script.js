// Fetch the workouts.json file and initialize the app
fetch('workouts.json')
  .then(response => response.json())
  .then(workouts => {
    document.getElementById('generate-button').addEventListener('click', () => {
      const goal = document.getElementById('goal').value;
      const level = document.getElementById('level').value;
      const days = parseInt(document.getElementById('days').value, 10);

      // Validate user input
      if (!goal || !level || isNaN(days) || days < 1) {
        alert('Please fill out all fields correctly.');
        return;
      }

      // Generate the workout plan
      const schedule = generateWorkoutPlan(workouts, goal, level, days);

      // Display the generated schedule
      displaySchedule(schedule);
    });
  })
  .catch(error => {
    console.error('Error loading workouts.json:', error);
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '<p class="text-white">Failed to load workout data. Please try again later.</p>';
    outputDiv.classList.remove('hidden');
  });

// Function to generate a workout plan
function generateWorkoutPlan(db, goal, level, days) {
  const plan = [];

  if (!db[goal] || !db[goal][level]) return plan;

  const availableExercises = db[goal][level];
  const groupedExercises = {
    fullBody: availableExercises.filter(e => e.muscle_group === "Full Body"),
    core: availableExercises.filter(e => e.muscle_group === "Core"),
    legs: availableExercises.filter(e => e.muscle_group === "Legs"),
    chest: availableExercises.filter(e => e.muscle_group === "Chest"),
    back: availableExercises.filter(e => e.muscle_group === "Back")
  };

  const getExercises = (group, count = 3) => {
    const exercises = [];
    const used = new Set();

    while (exercises.length < count && used.size < groupedExercises[group].length) {
      const index = Math.floor(Math.random() * groupedExercises[group].length);
      const exercise = groupedExercises[group][index];
      if (!used.has(exercise.name)) {
        exercises.push(exercise);
        used.add(exercise.name);
      }
    }

    return exercises;
  };

  if (days <= 3) {
    plan.push({ day: "Day 1", exercises: getExercises("fullBody") });
    if (days > 1) plan.push({ day: "Day 2", exercises: getExercises("core") });
    if (days > 2) plan.push({ day: "Day 3", exercises: getExercises("fullBody") });
  } else {
    plan.push({ day: "Day 1", exercises: getExercises("fullBody") });
    plan.push({ day: "Day 2", exercises: getExercises("legs") });
    plan.push({ day: "Day 3", exercises: getExercises("core") });
    plan.push({ day: "Day 4", exercises: getExercises("chest") });
    plan.push({ day: "Day 5", exercises: getExercises("back") });

    for (let i = 6; i <= days; i++) {
      const repeat = i % 5 === 1 ? "fullBody" : i % 5 === 2 ? "legs" : i % 5 === 3 ? "core" : i % 5 === 4 ? "chest" : "back";
      plan.push({ day: `Day ${i}`, exercises: getExercises(repeat) });
    }
  }

  return plan;
}

// Function to display the workout schedule
function displaySchedule(plan) {
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = ''; // Clear previous output

  if (plan.length === 0) {
    outputDiv.innerHTML = '<p class="text-white">No workout plan could be generated. Please try again.</p>';
    outputDiv.classList.remove('hidden');
    return;
  }

  plan.forEach(day => {
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('day-card');

    const dayContent = `
      <h3 class="text-xl font-bold text-white mb-3">${day.day}</h3>
      <ul class="space-y-4">
        ${day.exercises.map(exercise => `
          <li>
            <p class="text-lg font-semibold text-orange-400">${exercise.name}</p>
            <p class="text-sm text-gray-300 mb-1">${exercise.instructions}</p>
            <p class="text-sm text-gray-400"><strong>Muscle Group:</strong> ${exercise.muscle_group || 'N/A'}</p>
            <div class="mt-2 space-x-2">
              <a href="${exercise.resources[0]}" target="_blank" class="text-blue-400 underline text-sm">📘 Learn More</a>
              <a href="${exercise.video}" target="_blank" class="text-blue-400 underline text-sm">▶️ Watch Video</a>
            </div>
          </li>
        `).join('')}
      </ul>
    `;

    dayDiv.innerHTML = dayContent;
    outputDiv.appendChild(dayDiv);
  });

  outputDiv.classList.remove('hidden');

  // Smooth scroll to output
  setTimeout(() => {
    outputDiv.scrollIntoView({ behavior: 'smooth' });
  }, 100); // Delay by 100ms to ensure content is rendered
}
