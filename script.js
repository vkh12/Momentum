document.getElementById('regimenForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const goal = document.getElementById('goal').value;
    const experience = document.getElementById('experience').value;
    const days = parseInt(document.getElementById('days').value);
    const output = document.getElementById('output');
  
    try {
      const response = await fetch('workouts.json');
      const data = await response.json();
  
      const workouts = generateWorkoutPlan(data, goal, experience, days);
      output.innerHTML = formatWorkoutPlan(workouts);
    } catch (error) {
      console.error("Error loading workout data:", error);
      output.innerHTML = "<p>Unable to load workout data. Please try again later.</p>";
    }
  });
  
  function generateWorkoutPlan(db, goal, level, days) {
    const plan = [];
    const availableExercises = db[goal][level];
    const shuffled = availableExercises.sort(() => 0.5 - Math.random());
  
    for (let i = 0; i < days; i++) {
      let dayWorkout = {
        day: `Day ${i + 1}`,
        exercises: shuffled.slice(i * 3, i * 3 + 3)
      };
  
      // If you run out of exercises, repeat from the beginning
      if (dayWorkout.exercises.length === 0) {
        dayWorkout.exercises = shuffled.slice(0, 3);
      }
  
      plan.push(dayWorkout);
    }
  
    return plan;
  }
  
  function formatWorkoutPlan(plan) {
    return plan.map(day => `
      <h3>${day.day}</h3>
      <ul>${day.exercises.map(ex => `<li>${ex}</li>`).join('')}</ul>
    `).join('');
  }
  