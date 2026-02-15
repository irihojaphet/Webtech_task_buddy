<script setup>
const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['complete', 'delete'])
</script>

<template>
  <li
    class="task-item"
    :class="{ completed: task.completed }"
    role="listitem"
  >
    <span class="task-title">{{ task.title }}</span>
    <span v-if="task.category || task.dueDate || task.priority" class="task-meta">
      <span v-if="task.category" class="meta-tag">{{ task.category }}</span>
      <span
        v-if="task.priority"
        class="meta-tag priority"
        :data-priority="task.priority"
      >
        {{ task.priority }}
      </span>
      <span v-if="task.dueDate" class="meta-date">{{ task.dueDate }}</span>
    </span>
    <div class="task-actions">
      <button
        type="button"
        class="btn-action complete"
        aria-label="Mark task as complete"
        @click="emit('complete', task.id)"
      >
        Complete
      </button>
      <button
        type="button"
        class="btn-action delete"
        aria-label="Delete task"
        @click="emit('delete', task.id)"
      >
        Delete
      </button>
    </div>
  </li>
</template>

<style scoped>
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
</style>
