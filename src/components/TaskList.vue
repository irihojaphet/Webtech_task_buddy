<script setup>
import TaskItem from './TaskItem.vue'

defineProps({
  tasks: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['complete', 'delete'])
</script>

<template>
  <section class="task-list" aria-labelledby="task-list-heading">
    <h2 id="task-list-heading" class="visually-hidden">Your tasks</h2>
    <ul class="tasks" role="list">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @complete="emit('complete', $event)"
        @delete="emit('delete', $event)"
      />
    </ul>
  </section>
</template>

<style scoped>
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
</style>
