fetch('workouts.json')
  .then(response => response.json())
  .then(workouts => {
    document.getElementById("regimenForm").addEventListener("submit", function (event) {
      event.preventDefault();

      const days = parseInt(document.getElementById("days").value, 10);
      const goal = document.getElementById("goal").value;
      const experience = document.getElementById("experience").value;

      const schedule = generateWorkoutPlan(workouts, goal, experience, days);
      displaySchedule(schedule, days);
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
    const dayWorkout = {
      day: `Day ${i + 1}`,
      exercises: shuffled.slice(i * 3, i * 3 + 3)
    };

    if (dayWorkout.exercises.length === 0) {
      dayWorkout.exercises = shuffled.slice(0, 3);
    }

    plan.push(dayWorkout);
  }

  return plan;
}

function displaySchedule(plan, days) {
  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = "";

  const row = document.createElement("div");
  row.style.display = "flex";
  row.style.flexWrap = "wrap";
  row.style.gap = "10px";

  plan.forEach(day => {
    const dayDiv = document.createElement("div");
    dayDiv.style.flex = "1";
    dayDiv.style.padding = "10px";
    dayDiv.style.border = "1px solid #ccc";
    dayDiv.style.borderRadius = "4px";
    dayDiv.style.backgroundColor = "#f9f9f9";

    const dayContent = `
      <h3>${day.day}</h3>
      <ul>
        ${day.exercises.map(exercise => `
          <li>
            <strong>${exercise.name}</strong>
            <p>${exercise.instructions}</p>
            <a href="${exercise.resources}" target="_blank">Learn More</a><br>
            <a href="${exercise.video}" target="_blank">Watch Video</a>
          </li>
        `).join('')}
      </ul>
    `;

    dayDiv.innerHTML = dayContent;
    row.appendChild(dayDiv);
  });

  outputDiv.appendChild(row);
  document.querySelector(".results").style.display = "block";
}
