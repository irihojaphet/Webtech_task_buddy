<script setup>
import { computed } from 'vue'
import { useTasksStore } from '../stores/tasks'
import { TASK_STATUSES } from '../stores/tasks'

const props = defineProps({
  task: { type: Object, required: true },
  showDelete: { type: Boolean, default: false },
})

const emit = defineEmits(['delete', 'share'])

const tasksStore = useTasksStore()

const isOverdue = computed(() => {
  if (!props.task.dueDate) return false
  return props.task.dueDate < new Date().toISOString().slice(0, 10) && props.task.status !== 'completed'
})

const statusOptions = TASK_STATUSES

function onStatusChange(e) {
  const v = e.target.value
  if (v) tasksStore.setStatus(props.task.id, v)
}

function deleteTask() {
  emit('delete', props.task.id)
}
</script>

<template>
  <article
    class="task-card"
    :class="{ overdue: isOverdue }"
    @dblclick="emit('share', task)"
  >
    <div class="card-header">
      <span class="priority-tag" :class="task.priority?.toLowerCase()">{{ task.priority || 'Medium' }}</span>
      <button
        v-if="showDelete"
        type="button"
        class="delete-btn"
        aria-label="Delete task"
        @click.stop="deleteTask"
      >
        <span aria-hidden="true">×</span>
      </button>
    </div>
    <h3 class="card-title">{{ task.title }}</h3>
    <p v-if="task.description" class="card-description">{{ task.description }}</p>
    <div class="card-footer">
      <span v-if="task.dueDate" class="due-date" :class="{ overdue: isOverdue }">
        <span class="due-icon" aria-hidden="true">🕐</span>
        {{ isOverdue ? 'Overdue' : 'Due' }} {{ task.dueDate }}
      </span>
      <select
        class="status-select"
        :value="task.status"
        aria-label="Task status"
        @change="onStatusChange"
      >
        <option v-for="opt in statusOptions" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
    </div>
  </article>
</template>

<style scoped>
.task-card {
  background: #fff;
  border-radius: 12px;
  padding: 1.25rem;
  border: 1px solid #e0e8e0;
  transition: box-shadow 0.2s, border-color 0.2s;
}

.task-card:hover {
  border-color: #a5d6a7;
  box-shadow: 0 2px 12px rgba(27, 94, 32, 0.08);
}

.task-card.overdue {
  border-color: #ef9a9a;
  background: #fff8f8;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.priority-tag {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  text-transform: uppercase;
}

.priority-tag.high {
  background: #ffcdd2;
  color: #b71c1c;
}

.priority-tag.medium {
  background: #ffe0b2;
  color: #e65100;
}

.priority-tag.low {
  background: #c8e6c9;
  color: #1b5e20;
}

.delete-btn {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: #78909c;
  cursor: pointer;
  padding: 0 0.25rem;
  line-height: 1;
}

.delete-btn:hover {
  color: #c62828;
}

.card-title {
  margin: 0 0 0.35rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: #263238;
}

.card-description {
  margin: 0 0 0.75rem;
  font-size: 0.9rem;
  color: #546e7a;
  line-height: 1.4;
}

.card-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid #eceff1;
}

.due-date {
  font-size: 0.85rem;
  color: #546e7a;
}

.due-date.overdue {
  color: #c62828;
}

.due-icon {
  margin-right: 0.25rem;
}

.status-select {
  padding: 0.35rem 0.6rem;
  border: 1px solid #a5d6a7;
  border-radius: 6px;
  font-size: 0.85rem;
  background: #fff;
  color: #37474f;
}

.status-select:focus {
  outline: none;
  border-color: #2e7d32;
}
</style>
