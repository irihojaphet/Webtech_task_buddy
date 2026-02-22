<script setup>
import { ref, computed } from 'vue'
import { useTasksStore } from '../stores/tasks'
import TaskCard from '../components/TaskCard.vue'
import CreateTaskModal from '../components/CreateTaskModal.vue'

const tasksStore = useTasksStore()
const showCreate = ref(false)

const tasks = computed(() => tasksStore.tasksByStatus.in_progress)
</script>

<template>
  <div class="page">
    <div class="page-header-row">
      <div>
        <h1 class="page-title">In Progress Tasks</h1>
        <p class="page-subtitle">Here's a list of your tasks for this week.</p>
      </div>
      <button type="button" class="btn-create" @click="showCreate = true">
        <span class="btn-create-icon">+</span> Create Task
      </button>
    </div>

    <div v-if="tasks.length" class="tasks-grid">
      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        :show-delete="true"
        @delete="tasksStore.removeTask($event)"
      />
    </div>

    <p class="page-hint">Double-click a card to share.</p>
  </div>

  <CreateTaskModal v-model="showCreate" />
</template>

<style scoped>
.page {
  max-width: 960px;
  margin: 0 auto;
}

.page-header-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.page-title {
  margin: 0 0 0.25rem;
  font-size: 1.75rem;
  font-weight: 700;
  color: #1b5e20;
}

.page-subtitle {
  margin: 0;
  font-size: 0.95rem;
  color: #546e7a;
}

.btn-create {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.25rem;
  background: #1b5e20;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
}

.btn-create:hover {
  background: #2e7d32;
}

.btn-create-icon {
  font-size: 1.25rem;
  line-height: 1;
}

.tasks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.page-hint {
  margin: 1rem 0 0;
  font-size: 0.85rem;
  color: #90a4ae;
  text-align: center;
}
</style>
