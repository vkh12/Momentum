# Momentum 🏋️‍♂️

Momentum is a lightweight, web-based application that generates personalized weekly gym regimens. Designed to help users stay consistent and motivated, it generates workout plans based on fitness goals, experience levels, and available training days—all using HTML, CSS, and JavaScript.

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Product Requirements](#product-requirements)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Overview

Momentum provides users with a quick and customizable way to generate weekly workout plans without requiring any login or backend support. The app leverages a JSON-based database to store exercises, ensuring scalability and ease of updates.

---

## Features

- **Personalized Plans:** Select from fitness goals (weight loss, muscle gain, endurance), experience levels, and days per week.
- **Dynamic Generation:** Generates a unique weekly regimen by randomly selecting exercises from a JSON database.
- **Responsive Design:** Fully functional on both mobile and desktop devices.
- **Lightweight & Fast:** No external dependencies and quick load times.

---

## Product Requirements

### Product Overview
Momentum is built for individuals who want a structured, easy-to-use tool for planning their weekly workouts. The app requires no user registration and works entirely client-side.

### Goals and Objectives
- **Ease of Use:** Provide an intuitive interface for generating workout plans.
- **Scalability:** Use a JSON database for storing exercises that can be easily updated.
- **Performance:** Ensure fast response times and smooth user interaction.
- **Extensibility:** Allow for future enhancements like custom workouts, dark mode, and exportable PDFs.

### Target Users
- **Primary:** Fitness enthusiasts, aged 16–40, looking for a simple tool to manage their workout routines.
- **Secondary:** Personal trainers seeking a quick reference for planning sessions.

### Functional Requirements
- Display a form with inputs for fitness goal, experience level, and available days.
- Load exercise data from a local JSON file (`workouts.json`).
- Generate and display a daily workout plan for each day of the week based on user input.
- Provide fallback routines if the requested days exceed available exercises.

### Non-Functional Requirements
- The app must operate entirely on the client-side.
- Load time should be under 1 second.
- Code must adhere to consistent naming conventions and a modular architecture.
- JSON data should be human-readable and easily maintainable.

### Tech Stack
| Technology     | Purpose                          |
|----------------|----------------------------------|
| HTML5          | Application structure            |
| CSS3           | Styling and responsive layout    |
| JavaScript ES6 | App logic and dynamic content    |
| JSON           | Exercise database                |
| Git            | Version control                  |

### Deployment Checklist
- Validate HTML/CSS for accessibility.
- Ensure JSON fetch is working in production.
- Minify and compress assets.
- Deploy on GitHub Pages, Netlify, or similar hosting service.

---

## Project Structure
momentum/
│
├── index.html         # Main HTML layout and UI
├── style.css          # CSS for layout and styling
├── script.js          # JavaScript logic for plan generation
├── workouts.json      # JSON-based exercise database
├── README.md          # Project documentation (with embedded PRD)
└── assets/            # (Optional) Images, logos, and preview screenshots
    └── preview.png

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari)
- A local development server (needed to load `workouts.json` due to browser fetch API restrictions)

#### Quick Start Options

- **Using Python 3 (Built-in Web Server)**
  ```bash
  python -m http.server 5500

 
