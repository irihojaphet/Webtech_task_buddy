<script setup>
import { ref, computed } from 'vue'
import { useTasksStore, TASK_CATEGORIES, TASK_PRIORITIES } from '../stores/tasks'
import { useCounterStore } from '../stores/counter'

const tasksStore = useTasksStore()
const counterStore = useCounterStore()

const newTaskTitle = ref('')
const newTaskCategory = ref('Personal')
const newTaskPriority = ref('Medium')
const newTaskDueDate = ref('')
const showAddOptions = ref(false)

const canAddTask = computed(() => newTaskTitle.value.trim().length > 0)

function addTask() {
  if (!canAddTask.value) return
  tasksStore.addTask(newTaskTitle.value, {
    category: newTaskCategory.value,
    priority: newTaskPriority.value,
    dueDate: newTaskDueDate.value || null,
  })
  newTaskTitle.value = ''
  newTaskDueDate.value = ''
  newTaskCategory.value = 'Personal'
  newTaskPriority.value = 'Medium'
  showAddOptions.value = false
}

function handleKeydown(e) {
  if (e.key === 'Enter') addTask()
}
</script>

<template>
  <div class="task-buddy" role="main" aria-label="TaskBuddy task manager">
    <h1 class="title" id="taskbuddy-heading">TaskBuddy</h1>

    <section class="add-task" aria-labelledby="add-task-heading">
      <h2 id="add-task-heading" class="visually-hidden">Add new task</h2>
      <div class="add-task-row">
        <label for="new-task-input" class="visually-hidden">New task</label>
        <input
          id="new-task-input"
          v-model="newTaskTitle"
          type="text"
          placeholder="New Task"
          aria-label="New task title"
          class="task-input"
          @keydown="handleKeydown"
        />
        <button
          type="button"
          class="btn btn-add"
          :disabled="!canAddTask"
          aria-label="Add task"
          @click="addTask"
        >
          Add Task
        </button>
      </div>
      <div v-if="showAddOptions" class="add-options">
        <label for="new-task-category">Category</label>
        <select id="new-task-category" v-model="newTaskCategory" aria-label="Task category">
          <option v-for="cat in TASK_CATEGORIES" :key="cat" :value="cat">{{ cat }}</option>
        </select>
        <label for="new-task-priority">Priority</label>
        <select id="new-task-priority" v-model="newTaskPriority" aria-label="Task priority">
          <option v-for="p in TASK_PRIORITIES" :key="p" :value="p">{{ p }}</option>
        </select>
        <label for="new-task-due">Due date</label>
        <input
          id="new-task-due"
          v-model="newTaskDueDate"
          type="date"
          aria-label="Due date"
          class="due-input"
        />
      </div>
      <button
        type="button"
        class="btn-options-toggle"
        aria-expanded="showAddOptions"
        @click="showAddOptions = !showAddOptions"
      >
        {{ showAddOptions ? 'Hide options' : 'Category, priority & due date' }}
      </button>
    </section>

    <section class="task-list" aria-labelledby="task-list-heading">
      <h2 id="task-list-heading" class="visually-hidden">Your tasks</h2>
      <ul class="tasks" role="list">
        <li
          v-for="task in tasksStore.tasks"
          :key="task.id"
          class="task-item"
          :class="{ completed: task.completed }"
          role="listitem"
        >
          <span class="task-title">{{ task.title }}</span>
          <span v-if="task.category || task.dueDate || task.priority" class="task-meta">
            <span v-if="task.category" class="meta-tag">{{ task.category }}</span>
            <span v-if="task.priority" class="meta-tag priority" :data-priority="task.priority">
              {{ task.priority }}
            </span>
            <span v-if="task.dueDate" class="meta-date">{{ task.dueDate }}</span>
          </span>
          <div class="task-actions">
            <button
              type="button"
              class="btn-action complete"
              aria-label="Mark task as complete"
              @click="tasksStore.toggleComplete(task.id)"
            >
              Complete
            </button>
            <button
              type="button"
              class="btn-action delete"
              aria-label="Delete task"
              @click="tasksStore.removeTask(task.id)"
            >
              Delete
            </button>
          </div>
        </li>
      </ul>
    </section>

    <section class="counter-section" aria-labelledby="counter-heading">
      <h2 id="counter-heading" class="visually-hidden">Counter</h2>
      <p class="count-display">Count: {{ counterStore.count }}</p>
      <button
        type="button"
        class="btn btn-increase"
        aria-label="Increase count"
        @click="counterStore.increment"
      >
        Increase +
      </button>
    </section>
  </div>
</template>

<style scoped>
.task-buddy {
  max-width: 560px;
  margin: 0 auto;
  padding: 1.5rem;
  min-height: 100vh;
  background: #e8f5e9;
}

.title {
  margin: 0 0 1.25rem;
  font-size: 2rem;
  font-weight: 700;
  color: #6a1b9a;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.add-task {
  margin-bottom: 1.5rem;
}

.add-task-row {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.task-input {
  flex: 1;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  border: 1px solid #a5d6a7;
  border-radius: 6px;
  background: #fff;
}

.task-input:focus {
  outline: 2px solid #6a1b9a;
  outline-offset: 2px;
}

.btn {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.btn:focus {
  outline: 2px solid #6a1b9a;
  outline-offset: 2px;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-add,
.btn-increase {
  background: #2e7d32;
  color: #fff;
}

.btn-add:hover:not(:disabled),
.btn-increase:hover {
  background: #1b5e20;
}

.add-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  align-items: center;
}

.add-options label {
  font-size: 0.875rem;
  color: #333;
}

.add-options select,
.due-input {
  padding: 0.35rem 0.5rem;
  border: 1px solid #a5d6a7;
  border-radius: 4px;
  background: #fff;
}

.btn-options-toggle {
  background: none;
  border: none;
  color: #2e7d32;
  font-size: 0.875rem;
  cursor: pointer;
  text-decoration: underline;
}

.btn-options-toggle:hover {
  color: #1b5e20;
}

.task-list {
  margin-bottom: 1.5rem;
}

.tasks {
  list-style: none;
  padding: 0;
  margin: 0;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.task-item {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e0e0e0;
}

.task-item:last-child {
  border-bottom: none;
}

.task-item.completed .task-title {
  text-decoration: line-through;
  color: #757575;
}

.task-title {
  flex: 1 1 100%;
  font-size: 1rem;
}

.task-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  font-size: 0.8rem;
}

.meta-tag {
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  background: #e0e0e0;
  color: #424242;
}

.meta-tag.priority[data-priority='High'] {
  background: #ffcdd2;
  color: #b71c1c;
}

.meta-date {
  color: #616161;
}

.task-actions {
  display: flex;
  gap: 0.5rem;
  margin-left: auto;
}

.btn-action {
  padding: 0.35rem 0.6rem;
  font-size: 0.875rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: transparent;
}

.btn-action:focus {
  outline: 2px solid #6a1b9a;
  outline-offset: 2px;
}

.btn-action.complete {
  color: #2e7d32;
  font-weight: 500;
}

.btn-action.complete:hover {
  text-decoration: underline;
}

.btn-action.delete {
  color: #c62828;
  font-weight: 500;
}

.btn-action.delete:hover {
  text-decoration: underline;
}

.counter-section {
  padding: 1rem 0;
}

.count-display {
  margin: 0 0 0.5rem;
  font-size: 1rem;
}

.btn-increase {
  margin-top: 0.25rem;
}
</style>
