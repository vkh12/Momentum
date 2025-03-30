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
    document.getElementById('output').innerHTML = 'Failed to load workout data. Please try again later.';
    document.querySelector('.results').style.display = 'block';
  });

// Function to generate a workout plan
function generateWorkoutPlan(db, goal, level, days) {
  const plan = [];

  // Validate the structure of the data
  if (!db[goal]) {
    console.error(`Goal "${goal}" not found in the database.`);
    return plan;
  }
  if (!db[goal][level]) {
    console.error(`Level "${level}" not found for goal "${goal}" in the database.`);
    return plan;
  }

  const availableExercises = db[goal][level];
  if (!Array.isArray(availableExercises) || availableExercises.length === 0) {
    console.error(`No exercises available for goal "${goal}" and level "${level}".`);
    return plan;
  }

  // Group exercises by muscle group
  const groupedExercises = {
    fullBody: availableExercises.filter(e => e.muscle_group === "Full Body"),
    core: availableExercises.filter(e => e.muscle_group === "Core"),
    legs: availableExercises.filter(e => e.muscle_group === "Legs"),
    chest: availableExercises.filter(e => e.muscle_group === "Chest"),
    back: availableExercises.filter(e => e.muscle_group === "Back")
  };

  // Helper function to get exercises for a specific muscle group
  const getExercises = (group, count = 3) => {
    const exercises = [];
    const usedExercises = new Set(); // Track used exercises to avoid repetition

    while (exercises.length < count && usedExercises.size < groupedExercises[group].length) {
      const randomIndex = Math.floor(Math.random() * groupedExercises[group].length);
      const selectedExercise = groupedExercises[group][randomIndex];

      if (!usedExercises.has(selectedExercise.name)) { // Ensure exercise is not repeated
        exercises.push(selectedExercise);
        usedExercises.add(selectedExercise.name); // Add exercise name to the set
      }
    }

    return exercises;
  };

  if (days <= 3) {
    // For 3 days or less: Full Body and Core focus
    plan.push({ day: "Day 1", exercises: getExercises("fullBody") });
    if (days > 1) plan.push({ day: "Day 2", exercises: getExercises("core") });
    if (days > 2) plan.push({ day: "Day 3", exercises: getExercises("fullBody") });
  } else {
    // For more than 3 days: Split by muscle group, full body, and core
    plan.push({ day: "Day 1", exercises: getExercises("fullBody") });
    plan.push({ day: "Day 2", exercises: getExercises("legs") });
    plan.push({ day: "Day 3", exercises: getExercises("core") });
    plan.push({ day: "Day 4", exercises: getExercises("chest") });
    plan.push({ day: "Day 5", exercises: getExercises("back") });

    // For more than 5 days: Repeat days
    for (let i = 6; i <= days; i++) {
      const repeatDay = i % 5 === 1 ? "fullBody" : i % 5 === 2 ? "legs" : i % 5 === 3 ? "core" : i % 5 === 4 ? "chest" : "back";
      plan.push({ day: `Day ${i}`, exercises: getExercises(repeatDay) });
    }
  }

  return plan;
}

// Function to display the workout schedule
function displaySchedule(plan) {
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = ''; // Clear previous output

  if (plan.length === 0) {
    outputDiv.innerHTML = '<p>No workout plan could be generated. Please try again.</p>';
    outputDiv.style.display = 'block';
    return;
  }

  const row = document.createElement('div');
  row.style.display = 'flex';
  row.style.flexWrap = 'wrap';
  row.style.gap = '20px';
  row.style.justifyContent = 'center';

  plan.forEach(day => {
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('day-card');

    dayDiv.addEventListener('mouseover', () => {
      dayDiv.classList.add('day-card-hover');
    });

    dayDiv.addEventListener('mouseout', () => {
      dayDiv.classList.remove('day-card-hover');
    });

    const dayContent = `
      <h3 class="day-title">${day.day}</h3>
      <ul class="exercise-list">
        ${day.exercises.map(exercise => `
          <li class="exercise-item">
            <strong class="exercise-name">${exercise.name}</strong>
            <p class="exercise-instructions">${exercise.instructions}</p>
            <p class="exercise-muscle-group">
              <strong>Muscle Group:</strong> ${exercise.muscle_group || 'N/A'}
            </p>
            <a href="${exercise.resources[0]}" target="_blank" class="exercise-link">
              &#128214; Learn More
            </a><br>
            <a href="${exercise.video}" target="_blank" class="exercise-link">
              &#9654; Watch Video
            </a>
          </li>
        `).join('')}
      </ul>
    `;

    dayDiv.innerHTML = dayContent;
    row.appendChild(dayDiv);
  });

  outputDiv.appendChild(row);
  outputDiv.style.display = 'block';
}