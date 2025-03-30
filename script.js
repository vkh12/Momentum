fetch('workouts.json')
  .then(response => {
    console.log("Fetching workouts.json...");
    return response.json();
  })
  .then(workouts => {
    console.log("Workouts loaded:", workouts);

    document.getElementById("regimenForm").addEventListener("submit", function (event) {
      event.preventDefault();
      console.log("Form submitted!");

      const goal = document.getElementById("goal").value;
      const experience = document.getElementById("experience").value;
      const days = parseInt(document.getElementById("days").value, 10);

      console.log("Goal:", goal, "Experience:", experience, "Days:", days);

      const workoutPlan = workouts[goal][experience];
      console.log("Workout Plan:", workoutPlan);

      const output = document.getElementById("output");
      const resultsDiv = document.querySelector(".results");

      let plan = `<strong>Your goal:</strong> ${goal}<br><strong>Experience level:</strong> ${experience}<br><strong>Training days:</strong> ${days}<br><br>`;
      plan += `<strong>Suggested Plan:</strong><br>`;

      for (let i = 1; i <= days; i++) {
        const workout = workoutPlan[(i - 1) % workoutPlan.length];
        plan += `Day ${i}: ${workout}<br>`;
      }

      output.innerHTML = plan;
      resultsDiv.style.display = "block";
    });
  })
  .catch(error => {
    console.error("Error loading workouts.json:", error);
    document.getElementById("output").innerHTML = "Failed to load workout data. Please try again later.";
    document.querySelector(".results").style.display = "block";
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
