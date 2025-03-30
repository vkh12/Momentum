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

  // Shuffle exercises and create a plan for the specified number of days
  const shuffled = availableExercises.sort(() => 0.5 - Math.random());

  for (let i = 0; i < days; i++) {
    const startIndex = (i * 3) % shuffled.length;
    let dayWorkout = {
      day: `Day ${i + 1}`,
      exercises: shuffled.slice(startIndex, startIndex + 3)
    };

    // Adjust for cases where there are fewer than 3 exercises
    if (dayWorkout.exercises.length < 3) {
      dayWorkout.exercises = dayWorkout.exercises.concat(
        shuffled.slice(0, 3 - dayWorkout.exercises.length)
      );
    }

    // Ensure no duplicate exercises if the array length is less than 3
    dayWorkout.exercises = Array.from(new Set(dayWorkout.exercises));

    plan.push(dayWorkout);
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
  row.style.gap = '10px';

  plan.forEach(day => {
    const dayDiv = document.createElement('div');
    dayDiv.style.flex = '1';
    dayDiv.style.padding = '10px';
    dayDiv.style.border = '1px solid #ccc';
    dayDiv.style.borderRadius = '4px';
    dayDiv.style.backgroundColor = '#f9f9f9';

    const dayContent = `
      <h3>${day.day}</h3>
      <ul>
        ${day.exercises.map(exercise => `
          <li>
            <strong>${exercise.name}</strong>
            <p>${exercise.instructions}</p>
            <p><strong>Muscle Group:</strong> ${exercise.muscle_group || 'N/A'}</p>
            <a href="${exercise.resources[0]}" target="_blank">Learn More</a><br>
            <a href="${exercise.video}" target="_blank">Watch Video</a>
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
