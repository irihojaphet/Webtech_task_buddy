# TaskBuddy

A small task manager built with **Vue 3**, **Pinia**, and **Vue Router**. Create tasks, set category/priority/due date, mark them complete, and delete them. Includes a simple counter and screen-reader-friendly markup (WCAG-oriented).

---

## Prerequisites

Before you run the project, you need:

| Requirement | Version / notes |
|-------------|-----------------|
| **Node.js** | `^20.19.0` or `>= 22.12.0` (see [nodejs.org](https://nodejs.org)) |
| **npm** | Comes with Node.js (v9+) |

To check your versions:

```bash
node -v   # e.g. v20.19.0 or v22.x
npm -v    # e.g. 10.x
```

If your Node version is too old, install a newer one from the link above or use a version manager (e.g. [nvm](https://github.com/nvm-sh/nvm)).

---

## How to run it

### 1. Get the code

Clone or download this repo, then open a terminal in the project folder:

```bash
cd task-buddy
```

### 2. Install dependencies

```bash
npm install
```

This installs Vue, Vite, Pinia, Vue Router, and the rest of the dependencies. You only need to do this once (or after pulling changes that update `package.json`).

### 3. Start the dev server

```bash
npm run dev
```

You should see something like:

```
  VITE v6.x.x  ready in xxx ms
  ➜  Local:   http://localhost:5173/
```

Open **http://localhost:5173** in your browser. You’ll be redirected to **http://localhost:5173/task**, where the task list and counter live.

---

## Available scripts

| Command | What it does |
|--------|------------------|
| `npm run dev` | Start the development server (hot reload) |
| `npm run build` | Build for production (output in `dist/`) |
| `npm run preview` | Serve the production build locally |
| `npm run test:unit` | Run unit tests (Vitest) |
| `npm run format` | Format source with oxfmt |

---

## Tech stack

- **Vue 3** (Composition API, `<script setup>`)
- **Vite** – build tool and dev server
- **Vue Router** – URL routing (e.g. `/task` → task page)
- **Pinia** – state (tasks list, counter)
- **Vitest** – unit tests

---

## Project structure (short)

```
task-buddy/
├── index.html
├── package.json
├── src/
│   ├── main.js           # App entry, mounts Vue + Pinia + Router
│   ├── App.vue           # Root: skip link + <router-view />
│   ├── router/index.js   # Routes (e.g. /task → TaskView)
│   ├── stores/
│   │   ├── counter.js    # Counter state
│   │   └── tasks.js      # Tasks state and CRUD
│   ├── views/
│   │   └── TaskView.vue  # Task list page
│   └── components/      # AddTaskForm, TaskList, TaskItem, CounterSection
├── PROJECT-GUIDE.md      # Step-by-step walkthrough of the code
└── README.md             # This file
```

---

## Learn more

- **Full code walkthrough** – See **PROJECT-GUIDE.md** in this repo for a toe-to-toe explanation of structure, router, stores, and components.
- **Vue 3** – [vuejs.org](https://vuejs.org)
- **Vite** – [vite.dev](https://vite.dev)
- **Pinia** – [pinia.vuejs.org](https://pinia.vuejs.org)
- **Vue Router** – [router.vuejs.org](https://router.vuejs.org)

---

## Optional: IDE and browser setup

- **Editor:** [VS Code](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (disable Vetur if you have it).
- **Browser:** Install [Vue Devtools](https://devtools.vuejs.org/) (Chrome/Firefox) to inspect components and Pinia state.

---

## Troubleshooting

- **`'vite' is not recognized`** – Run `npm install` in the project folder so dependencies (including Vite) are installed.
- **`Invalid Version` or missing module (e.g. `ms`)** – Delete `node_modules` and run `npm install` again. On Windows (PowerShell):  
  `Remove-Item -Recurse -Force node_modules; npm install`
- **Node version errors** – Ensure Node matches the **Prerequisites** (e.g. Node 20.19+ or 22.12+). Check with `node -v`.
