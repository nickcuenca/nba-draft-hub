# 🏀 NBA Draft Hub – Dallas Mavericks SWE Intern Project

A React + Vite frontend built for the Dallas Mavericks SWE Internship OA. This Draft Hub enables the Front Office to evaluate top NBA draft prospects, add scouting notes, compare players, and watch highlight videos—all in a data-driven, visually interactive hub.

## 🚀 Features

- 📋 **Big Board View**: Displays all draft prospects by averaged scout ranking or filtered by individual scouts, league, or position.
- 👤 **Player Profiles**: Rich profile page with team info, league, birth date (with age), height/weight, and more.
- 🧠 **Scouting Reports**: Add personal notes per player using a local `useState`-based form.
- 🔍 **Search + Filters**: Filter by league, position, scout rank, or search by name.
- 📊 **Player Comparison**: Side-by-side stat and physical comparisons with visual highlights for strengths.
- 🎥 **Highlight Videos**: Embedded YouTube highlight videos for many players with fullscreen viewing.
- 🎨 **Material UI Styling**: Responsive UI using MUI components with white-on-dark themed layout.
- 🧪 **Mobile-Responsive + Animations**: Fully responsive design with hover/flip animations and smooth navigation.
- 📤 **CSV Export**: Export current Big Board view to a CSV file.
- 🧠 **Data-Driven Architecture**: Automatically adapts to any provided JSON dataset.

## 🛠️ Tech Stack

- ⚛️ **React + Vite**
- 🎨 **Material UI**
- 🧭 **React Router**
- ⚙️ **useState, useEffect, useParams**
- 🚀 **Deployed on Netlify**

## 📂 Data

All player and scout data comes from `intern_project_data.json` in the `/data` directory. Player positions were inferred and added manually.

## 🧪 Local Development

```bash
npm install
npm run dev
```

## 🌐 Deployment

Deployed on [Netlify](https://cuenca-nba-draft-hub.netlify.app/). Final links submitted via the Mavericks Google Form.

## 👤 Author

Nicolás Cuenca – 2025 Software Engineering Internship Candidate