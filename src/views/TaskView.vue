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

<template>
  <div class="task-buddy" role="main" aria-label="TaskBuddy task manager">
    <h1 class="title" id="taskbuddy-heading">TaskBuddy</h1>

    <AddTaskForm @submit="handleAddTask" />

    <TaskList
      :tasks="tasksStore.tasks"
      @complete="handleComplete"
      @delete="handleDelete"
    />

    <CounterSection />
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
</style>
