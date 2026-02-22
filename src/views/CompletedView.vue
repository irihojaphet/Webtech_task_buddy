<script setup>
import { ref, computed } from 'vue'
import { useTasksStore } from '../stores/tasks'
import TaskCard from '../components/TaskCard.vue'
import CreateTaskModal from '../components/CreateTaskModal.vue'

const tasksStore = useTasksStore()
const showCreate = ref(false)

const tasks = computed(() => tasksStore.tasksByStatus.completed)
</script>

<template>
  <div class="page">
    <div class="page-header-row">
      <div>
        <h1 class="page-title">Done Tasks</h1>
        <p class="page-subtitle">Here's a list of your tasks for this week.</p>
      </div>
      <button type="button" class="btn-create" @click="showCreate = true">
        <span class="btn-create-icon">+</span> Create Task
      </button>
    </div>

    <div v-if="tasks.length" class="tasks-grid">
      <TaskCard v-for="task in tasks" :key="task.id" :task="task" :show-delete="false" />
    </div>

    <div v-else class="empty-state">
      <div class="empty-icon" aria-hidden="true">✓</div>
      <p class="empty-title">No tasks found</p>
      <p class="empty-desc">You don't have any tasks in this view.</p>
      <button type="button" class="btn-create-secondary" @click="showCreate = true">
        Create Task
      </button>
    </div>

    <p v-if="tasks.length" class="page-hint">Double-click a card to share.</p>
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

.empty-state {
  border: 2px dashed #c8e6c9;
  border-radius: 16px;
  padding: 3rem 2rem;
  text-align: center;
  background: #f1f8e9;
}

.empty-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto 1rem;
  background: #c8e6c9;
  color: #2e7d32;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
}

.empty-title {
  margin: 0 0 0.35rem;
  font-size: 1.15rem;
  font-weight: 700;
  color: #37474f;
}

.empty-desc {
  margin: 0 0 1.25rem;
  font-size: 0.95rem;
  color: #546e7a;
}

.btn-create-secondary {
  padding: 0.6rem 1.25rem;
  background: #fff;
  border: 1px solid #a5d6a7;
  border-radius: 10px;
  color: #1b5e20;
  font-weight: 600;
  cursor: pointer;
}

.btn-create-secondary:hover {
  background: #e8f5e9;
}

.page-hint {
  margin: 1rem 0 0;
  font-size: 0.85rem;
  color: #90a4ae;
  text-align: center;
}
</style>
