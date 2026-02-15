# TaskBuddy Project Guide — Toe to Toe

A walkthrough of the project **structure** and **code**, in the order the app runs.

---

## 1. Project structure

```
task-buddy/
├── index.html              # Single HTML entry; Vue mounts here
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite + Vue plugin config
├── src/
│   ├── main.js             # App bootstrap: create app, Pinia, router, mount
│   ├── App.vue             # Root component (router outlet + global styles)
│   ├── router/
│   │   └── index.js        # Routes: URL → which Vue component to show
│   ├── stores/
│   │   ├── counter.js      # Counter state (count, increment)
│   │   └── tasks.js        # Tasks state and CRUD
│   ├── views/
│   │   └── TaskView.vue    # Page: task list screen
│   └── components/
│       ├── AddTaskForm.vue # Form to add a task
│       ├── TaskList.vue    # List wrapper; renders many TaskItem
│       ├── TaskItem.vue    # One task row (title, actions)
│       └── CounterSection.vue # Counter display + button
```

- **Views** = full pages (one per route).
- **Components** = reusable UI pieces used inside views (or other components).
- **Stores** = shared reactive state (Pinia).
- **Router** = maps URL path → view component.

---

## 2. How the app starts (entry → root)

### 2.1 `index.html`

```html
<div id="app"></div>
<script type="module" src="/src/main.js"></script>
```

- The only HTML that always exists. No Vue here, just a mount point `#app` and a script that loads `main.js` as an ES module.

### 2.2 `src/main.js`

```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
```

- **createApp(App)** — Creates the Vue app with `App.vue` as the root component.
- **app.use(createPinia())** — Enables Pinia so any component can use `useXxxStore()`.
- **app.use(router)** — Enables Vue Router so we can use `<router-view />` and change pages by URL.
- **app.mount('#app')** — Attaches the Vue app to the `<div id="app">` in `index.html`.

So: **HTML → main.js → App.vue + Pinia + Router → mount.**

---

## 3. Root component and routing

### 3.1 `src/App.vue`

```vue
<script setup>
import { useRoute } from 'vue-router'
import { watch } from 'vue'

const route = useRoute()

watch(
  () => route.path,
  () => {
    document.title = route.name === 'task' ? 'TaskBuddy' : 'TaskBuddy'
  },
  { immediate: true }
)
</script>

<template>
  <router-view />
</template>

<style>
/* global resets and body font */
</style>
```

- **`<router-view />`** — This is where the **current route’s component** is rendered. So when the URL is `/task`, the router renders `TaskView` inside this placeholder.
- **useRoute()** — Gives the current route (path, name, params, etc.).
- **watch(route.path, …)** — Updates `document.title` when the route changes; `immediate: true` runs once on load.
- **Style without `scoped`** — Applies to the whole app (e.g. `body`, box-sizing).

So: **App.vue is the shell; the actual page content is whatever the router puts in `<router-view />`.**

### 3.2 `src/router/index.js`

```js
import { createRouter, createWebHistory } from 'vue-router'
import TaskView from '../views/TaskView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/task' },
    { path: '/task', name: 'task', component: TaskView },
  ],
})

export default router
```

- **createWebHistory** — Uses real URLs like `/task` (no `#`).
- **path: '/'** — Visiting `/` redirects to `/task`.
- **path: '/task'** — Shows `TaskView.vue`; we give it **name: 'task'** so we can use `route.name` (e.g. in App.vue) or `router.push({ name: 'task' })` later.

So: **URL `/` or `/task` → TaskView.vue is rendered inside `<router-view />`.**

---

## 4. Shared state (Pinia stores)

Stores hold **reactive state** and **functions**. Components use them with `useXxxStore()`.

### 4.1 `src/stores/counter.js`

```js
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
```

- **defineStore('counter', setup)** — Defines a store with id `'counter'`. The second argument is a **setup function** that runs once per app.
- **ref(0)** — Reactive value; change with `count.value++`.
- **computed(...)** — Derived state; updates when `count` changes.
- **return { ... }** — What you return is what components get from `useCounterStore()`.

In any component: `const counterStore = useCounterStore()` then use `counterStore.count`, `counterStore.increment()`, etc.

### 4.2 `src/stores/tasks.js`

```js
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const TASK_CATEGORIES = ['Work', 'Personal', 'Shopping', 'Other']
export const TASK_PRIORITIES = ['Low', 'Medium', 'High']

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref([...])   // array of { id, title, completed, category, dueDate, priority }
  let nextId = 4

  const activeTasks = computed(() => tasks.value.filter((t) => !t.completed))
  const completedTasks = computed(() => tasks.value.filter((t) => t.completed))

  function addTask(title, options = {}) { ... }
  function updateTask(id, updates) { ... }
  function toggleComplete(id) { ... }
  function removeTask(id) { ... }
  function getTaskById(id) { ... }

  return { tasks, activeTasks, completedTasks, addTask, updateTask, toggleComplete, removeTask, getTaskById }
})
```

- **tasks** — Array of task objects; we add/remove/update this array and Vue updates the UI.
- **nextId** — Used when creating a new task so each has a unique `id`.
- **activeTasks / completedTasks** — Computed lists; you could use these for filtered views.
- **addTask(title, options)** — Pushes a new task with `id: nextId++`, and optional `category`, `priority`, `dueDate`.
- **toggleComplete(id)** — Flips `task.completed`.
- **removeTask(id)** — Removes the task from the array.

**TASK_CATEGORIES** and **TASK_PRIORITIES** are plain constants exported for use in the form (e.g. dropdowns).

So: **All task data and operations live in one place; components read and call these methods.**

---

## 5. The task page: `TaskView.vue`

This is the **page** you see at `/task`. It composes the form, the list, and the counter.

### 5.1 Script

```vue
<script setup>
import { useTasksStore } from '../stores/tasks'
import AddTaskForm from '../components/AddTaskForm.vue'
import TaskList from '../components/TaskList.vue'
import CounterSection from '../components/CounterSection.vue'

const tasksStore = useTasksStore()

function handleAddTask(payload) {
  tasksStore.addTask(payload.title, {
    category: payload.category,
    priority: payload.priority,
    dueDate: payload.dueDate,
  })
}

function handleComplete(id) {
  tasksStore.toggleComplete(id)
}

function handleDelete(id) {
  tasksStore.removeTask(id)
}
</script>
```

- **useTasksStore()** — Gets the shared tasks store.
- **handleAddTask(payload)** — Called when the form is submitted; calls `tasksStore.addTask(...)` with the payload from the form.
- **handleComplete(id) / handleDelete(id)** — Called when a task item emits; they call the store’s `toggleComplete` and `removeTask`.

So: **TaskView doesn’t hold task data; it wires store actions to child components.**

### 5.2 Template

```vue
<template>
  <div class="task-buddy" ...>
    <h1 class="title">TaskBuddy</h1>

    <AddTaskForm @submit="handleAddTask" />

    <TaskList
      :tasks="tasksStore.tasks"
      @complete="handleComplete"
      @delete="handleDelete"
    />

    <CounterSection />
  </div>
</template>
```

- **`<AddTaskForm @submit="handleAddTask" />`** — When the form emits `submit` with a payload, we run `handleAddTask`.
- **`:tasks="tasksStore.tasks"`** — Passes the reactive tasks array **down** to TaskList (one-way data flow).
- **`@complete` / `@delete`** — When TaskList (or a child) emits these events with an `id`, we run the handlers that call the store.

So: **Data flows down via props (`:tasks`), events flow up via `@submit`, `@complete`, `@delete`.**

---

## 6. Form component: `AddTaskForm.vue`

Responsible only for **input and submitting** a new task. It does **not** know about the store; it emits data to the parent.

### 6.1 Script

```vue
<script setup>
import { ref, computed } from 'vue'
import { TASK_CATEGORIES, TASK_PRIORITIES } from '../stores/tasks'

const title = ref('')
const category = ref('Personal')
const priority = ref('Medium')
const dueDate = ref('')
const showOptions = ref(false)

const canSubmit = computed(() => title.value.trim().length > 0)

const emit = defineEmits(['submit'])

function submit() {
  if (!canSubmit.value) return
  emit('submit', {
    title: title.value.trim(),
    category: category.value,
    priority: priority.value,
    dueDate: dueDate.value || null,
  })
  title.value = ''
  dueDate.value = ''
  category.value = 'Personal'
  priority.value = 'Medium'
  showOptions.value = false
}

function onKeydown(e) {
  if (e.key === 'Enter') submit()
}
</script>
```

- **ref('')** — Each form field is reactive; `v-model` in the template binds to these.
- **computed(canSubmit)** — Only allow submit when there is a non-empty title.
- **defineEmits(['submit'])** — This component can emit an event named `submit`.
- **emit('submit', { ... })** — Sends the new task data to the parent; parent (TaskView) then calls the store.
- **onKeydown** — Submit on Enter.

So: **Form owns its own local state; it doesn’t touch the store, it just emits.**

### 6.2 Template (conceptually)

- **v-model="title"** on the input — Two-way bind to `title` ref.
- **v-model="category"** / **v-model="priority"** on `<select>`, **v-model="dueDate"** on the date input — Same idea.
- **v-for="cat in TASK_CATEGORIES"** — Renders one `<option>` per category (and same for priorities).
- **:disabled="!canSubmit"** — Disable the Add button when title is empty.
- **@click="submit"** and **@keydown="onKeydown"** — Trigger submit.

So: **User types → refs update → on submit we emit one object to the parent.**

---

## 7. List and item: `TaskList.vue` and `TaskItem.vue`

### 7.1 `TaskList.vue`

- **Receives** `tasks` from the parent (TaskView) via **props**.
- **Renders** one **TaskItem** per task with **v-for**.
- **Forwards** `complete` and `delete` events (with the task `id`) back to the parent.

```vue
<TaskItem
  v-for="task in tasks"
  :key="task.id"
  :task="task"
  @complete="emit('complete', $event)"
  @delete="emit('delete', $event)"
/>
```

- **:key="task.id"** — Helps Vue track each row when the list changes.
- **:task="task"** — Passes the whole task object into TaskItem.
- **$event** — The argument passed when TaskItem does `emit('complete', task.id)` (so `$event` is the id).

So: **TaskList is a thin wrapper: props in, list of TaskItem, events out.**

### 7.2 `TaskItem.vue`

- **defineProps({ task })** — Receives one task object (required).
- **defineEmits(['complete', 'delete'])** — Can notify parent when user clicks Complete or Delete.

Template:

- **:class="{ completed: task.completed }"** — Toggle a CSS class when the task is completed (e.g. strikethrough).
- **{{ task.title }}** — Display title.
- **v-if** for category, priority, dueDate — Show meta only when present.
- **@click="emit('complete', task.id)"** and **@click="emit('delete', task.id)"** — Send the **id** up; the parent (and store) don’t need the full task, just the id.

So: **TaskItem only displays one task and emits which action and which id; it doesn’t call the store.**

---

## 8. Counter: `CounterSection.vue`

This component **does** use the store directly (no props/emits for the count).

```vue
<script setup>
import { useCounterStore } from '../stores/counter'

const counterStore = useCounterStore()
</script>

<template>
  ...
  <p>Count: {{ counterStore.count }}</p>
  <button @click="counterStore.increment">Increase +</button>
  ...
</template>
```

- **useCounterStore()** — Same store used anywhere in the app.
- **counterStore.count** — Reactive; when it changes, this template re-renders.
- **counterStore.increment()** — Updates the store; Vue updates all components that use `count`.

So: **CounterSection is a small UI that reads and mutates the counter store.**

---

## 9. Data flow summary

- **Stores (Pinia)**  
  - `tasks` and `count` live in stores.  
  - Components that need them call `useTasksStore()` or `useCounterStore()` and use the returned state and methods.

- **Parent → child (props)**  
  - TaskView passes `:tasks="tasksStore.tasks"` to TaskList.  
  - TaskList passes `:task="task"` to each TaskItem.

- **Child → parent (events)**  
  - AddTaskForm emits `submit` with payload → TaskView calls `tasksStore.addTask(...)`.  
  - TaskItem emits `complete` / `delete` with id → TaskList re-emits → TaskView calls `tasksStore.toggleComplete(id)` / `tasksStore.removeTask(id)`.

So: **Stores for shared state; props down, events up for component communication.**

---

## 10. Vue concepts used in this project

| Concept | Where |
|--------|--------|
| **Single File Component (.vue)** | Every component: `<script setup>`, `<template>`, `<style scoped>` |
| **ref()** | Form fields, `showOptions`, and in stores: `count`, `tasks` |
| **computed()** | `canSubmit`, `activeTasks`, `completedTasks`, `doubleCount` |
| **v-model** | Input and selects in AddTaskForm |
| **v-for** | TaskList over `tasks`; options over TASK_CATEGORIES / TASK_PRIORITIES |
| **v-if / v-show** | Conditional meta in TaskItem; optional form options in AddTaskForm |
| **:prop="value"** | Passing data down (e.g. `:tasks`, `:task`) |
| **@event="handler"** | Listening to child events (`@submit`, `@complete`, `@delete`) |
| **defineProps()** | TaskItem (task), TaskList (tasks) |
| **defineEmits()** | AddTaskForm (submit), TaskItem (complete, delete), TaskList (forwarding) |
| **Pinia useXxxStore()** | TaskView, CounterSection; and inside stores with ref/computed |
| **Router** | main.js (use router), App.vue (router-view), router/index.js (routes) |

---

## 11. Run and explore

- **Install:** `npm install`
- **Dev server:** `npm run dev` → open `http://localhost:5173`
- **Build:** `npm run build`

You can set breakpoints in the browser devtools (e.g. in `handleAddTask` or in the store’s `addTask`) and follow the flow from click → emit → parent handler → store → reactive update → re-render.

This is the full toe-to-toe picture: structure, entry, router, stores, and how each Vue component fits in and communicates.
