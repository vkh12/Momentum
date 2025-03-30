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
    const shuffled = groupedExercises[group].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
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
    dayDiv.style.flex = '1 1 calc(30% - 20px)';
    dayDiv.style.padding = '20px';
    dayDiv.style.border = '1px solid #ddd';
    dayDiv.style.borderRadius = '8px';
    dayDiv.style.backgroundColor = '#ffffff';
    dayDiv.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    dayDiv.style.transition = 'transform 0.2s, box-shadow 0.2s';
    dayDiv.style.maxWidth = '300px';

    dayDiv.addEventListener('mouseover', () => {
      dayDiv.style.transform = 'scale(1.025)';
      dayDiv.style.boxShadow = '0 6px 10px rgba(0, 0, 0, 0.15)';
    });

    dayDiv.addEventListener('mouseout', () => {
      dayDiv.style.transform = 'scale(1)';
      dayDiv.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });

    const dayContent = `
      <h3 style="font-size: 1.5rem; color: #333; margin-bottom: 10px;">${day.day}</h3>
      <ul style="list-style: none; padding: 0; margin: 0;">
        ${day.exercises.map(exercise => `
          <li style="margin-bottom: 15px;">
            <strong style="font-size: 1.1rem; color: #555;">${exercise.name}</strong>
            <p style="font-size: 0.9rem; color: #666; margin: 5px 0;">${exercise.instructions}</p>
            <p style="font-size: 0.9rem; color: #666; margin: 5px 0;">
              <strong>Muscle Group:</strong> ${exercise.muscle_group || 'N/A'}
            </p>
            <a href="${exercise.resources[0]}" target="_blank" style="color: #007BFF; text-decoration: none; font-size: 0.9rem;">
              &#128214; Learn More
            </a><br>
            <a href="${exercise.video}" target="_blank" style="color: #007BFF; text-decoration: none; font-size: 0.9rem;">
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