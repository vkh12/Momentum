# Momentum 

**Momentum** is a lightweight, web-based application that generates personalized weekly gym regimens. 

Designed to help users stay consistent and motivated, it generates workout plans based on fitness goals, experience levels, and available training days—all using HTML, CSS, and JavaScript.

##### Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Product Requirements](#product-requirements)
- [Project Structure](#project-structure)
- [Sprint Planning](#sprint-planning)
- [Getting Started](#getting-started)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

# Overview

Momentum provides users with a quick and customizable way to generate weekly workout plans without requiring any login or backend support. The app leverages a JSON-based database to store exercises, ensuring scalability and ease of updates.

---

# Features

- **Personalized Plans:** Select from fitness goals (weight loss, muscle gain, endurance), experience levels, and days per week.
- **Dynamic Generation:** Generates a unique weekly regimen by randomly selecting exercises from a JSON database.
- **Responsive Design:** Fully functional on both mobile and desktop devices.
- **Lightweight & Fast:** No external dependencies and quick load times.

---

# Product Requirements

## Product Overview
Momentum is built for individuals who want a structured, easy-to-use tool for planning their weekly workouts. The app requires no user registration and works entirely client-side.

## Goals and Objectives
- **Ease of Use:** Provide an intuitive interface for generating workout plans.
- **Scalability:** Use a JSON database for storing exercises that can be easily updated.
- **Performance:** Ensure fast response times and smooth user interaction.
- **Extensibility:** Allow for future enhancements like custom workouts, dark mode, and exportable PDFs.

## Target Users
- **Primary:** Fitness enthusiasts, aged 16–40, looking for a simple tool to manage their workout routines.
- **Secondary:** Personal trainers seeking a quick reference for planning sessions.

## Functional Requirements
- Display a form with inputs for fitness goal, experience level, and available days.
- Load exercise data from a local JSON file (`workouts.json`).
- Generate and display a daily workout plan for each day of the week based on user input.
- Provide fallback routines if the requested days exceed available exercises.

## Non-Functional Requirements
- The app must operate entirely on the client-side.
- Load time should be under 1 second.
- Code must adhere to consistent naming conventions and a modular architecture.
- JSON data should be human-readable and easily maintainable.

## Tech Stack
| Technology     | Purpose                          |
|----------------|----------------------------------|
| HTML5          | Application structure            |
| CSS3           | Styling and responsive layout    |
| JavaScript ES6 | App logic and dynamic content    |
| JSON           | Exercise database                |
| Git            | Version control                  |

## Deployment Checklist
- [X] Validate HTML/CSS for accessibility.
- [X] Ensure JSON fetch is working in production.
- [X] Minify and compress assets.
- [ ] Deploy on GitHub Pages, Netlify, or similar hosting service.
---

# Project Directory
momentum/ 
│
├── index.html         # Main HTML layout and UI
├── style.css          # CSS for layout and styling
├── script.js          # JavaScript logic for plan generation
├── workouts.json      # JSON-based exercise database
├── README.md          # Project documentation (with embedded PRD)
└── assets/            # (Optional) Images, logos, and preview screenshots
    └── 

# Sprint Planning

Momentum is developed using agile-inspired sprints to ensure iterative progress, frequent testing, and continuous delivery of value. Each sprint lasts **~1 week** with clear goals and deliverables.

---

## Sprint 1: MVP – Core Functionality

**Duration:** March 30, 2025 - April 5, 2025 (1 Week)  
**Goal:** Build a functional gym regimen generator with a static frontend.

### Deliverables:
- [x] Set up project structure (HTML, CSS, Vanilla JS)
- [x] Create and load `workouts.json` data file
- [x] Build user form to collect goal, experience, and availability
- [x] Generate weekly plan dynamically
- [x] Display workouts by day
- [x] Create modern and responsive UI styling to reflect accesibility guidelines

---

## Sprint 2: Usability + UI Improvements

**Duration:** April 6, 2025 - April 12, 2025 (1 Week)  
**Goal:** Enhance user experience and add polish.

### Deliverables:
- [ ] Refine CSS for desktop and mobile responsiveness
- [ ] Add error handling for form validation & fetch failures
- [ ] Create loading state when generating workouts
- [ ] Highlight active day or allow day-by-day expansion
- [ ] Add preview image (GIF/screenshot) for README

---

## Sprint 3: Feature Expansion

**Duration:** April 13, 2025 - April 19, 2025 (1 Week) 
**Goal:** Extend core features based on feedback.

### Deliverables:
- [ ] Allow users to save their plan using `localStorage`
- [ ] Add “Regenerate Plan” button
- [ ] Add custom workout input support
- [ ] Build PDF export / print-friendly view
- [ ] Dark/light mode toggle

---

## Sprint 4: Deployment + Docs

**Duration:** April 20, 2025 - April 26, 2025 (1 Week)  
**Goal:** Prepare project for public release.

### Deliverables:
- [ ] Finalize README with visuals and deployment instructions
- [ ] Deploy to GitHub Pages or Netlify
- [ ] Add favicon and logo
- [ ] Final code cleanup and linting

---

## Backlog (Future Sprints)

- User login & backend for saving multiple plans
- AI-based workout optimization
- Nutrition tracking module
- Daily progress checklist
- Community feature to share regimens

---

## Agile Notes

- Standups: Solo check-ins or journal entries in a dev log
- Retros: Reflect at the end of each sprint on what's working, what to improve
- Tasks managed in GitHub Issues or Trello (optional)

---

# Getting Started

## Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari)
- A local development server (needed to load `workouts.json` due to browser fetch API restrictions)

### Quick Start Options

- **Using Python 3 (Built-in Web Server)**
    ```bash
    python -m http.server 5500
    ```
- Open your browser and go to: [http://localhost:5500](http://localhost:5500)