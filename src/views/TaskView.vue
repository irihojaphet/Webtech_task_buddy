<script setup>
import { ref, nextTick } from 'vue'
import { useTasksStore } from '../stores/tasks'
import AddTaskForm from '../components/AddTaskForm.vue'
import TaskList from '../components/TaskList.vue'
import CounterSection from '../components/CounterSection.vue'

const tasksStore = useTasksStore()
const statusMessage = ref('')

function announceToScreenReader(message) {
  statusMessage.value = ''
  nextTick(() => {
    statusMessage.value = message
  })
  setTimeout(() => {
    statusMessage.value = ''
  }, 1000)
}

function handleAddTask(payload) {
  tasksStore.addTask(payload.title, {
    category: payload.category,
    priority: payload.priority,
    dueDate: payload.dueDate,
  })
  announceToScreenReader(`Task added: ${payload.title}. List has ${tasksStore.tasks.length} task${tasksStore.tasks.length === 1 ? '' : 's'}.`)
}

function handleComplete(id) {
  const task = tasksStore.getTaskById(id)
  tasksStore.toggleComplete(id)
  const newState = task?.completed ? 'incomplete' : 'completed'
  announceToScreenReader(`Task marked as ${newState}.`)
}

function handleDelete(id) {
  const task = tasksStore.getTaskById(id)
  const title = task?.title ?? 'Task'
  tasksStore.removeTask(id)
  announceToScreenReader(`${title} deleted. ${tasksStore.tasks.length} task${tasksStore.tasks.length === 1 ? '' : 's'} remaining.`)
}
</script>

<template>
  <main
    id="main-content"
    class="task-buddy"
    role="main"
    aria-labelledby="taskbuddy-heading"
    aria-label="TaskBuddy task manager"
  >
    <h1 class="title" id="taskbuddy-heading">TaskBuddy</h1>

    <!-- Live region: screen readers announce when this text changes -->
    <div
      class="sr-only"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {{ statusMessage }}
    </div>

    <AddTaskForm @submit="handleAddTask" />

    <TaskList :tasks="tasksStore.tasks" @complete="handleComplete" @delete="handleDelete" />

    <CounterSection />
  </main>
</template>

<style scoped>
.sr-only {
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
</style>
