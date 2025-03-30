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