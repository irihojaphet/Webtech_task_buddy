<script setup>
import { ref, watch } from 'vue'
import { useTasksStore } from '../stores/tasks'
import { TASK_PRIORITIES } from '../stores/tasks'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'created'])

const tasksStore = useTasksStore()

const title = ref('')
const description = ref('')
const priority = ref('Medium')
const dueDate = ref('')

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      title.value = ''
      description.value = ''
      priority.value = 'Medium'
      dueDate.value = ''
    }
  }
)

function close() {
  emit('update:modelValue', false)
}

function submit() {
  const t = title.value.trim()
  if (!t) return
  tasksStore.addTask({
    title: t,
    description: description.value.trim() || null,
    priority: priority.value,
    dueDate: dueDate.value || null,
    status: 'todo',
  })
  emit('created')
  close()
}
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" class="modal-backdrop" @click.self="close">
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="create-task-title">
        <div class="modal-header">
          <h2 id="create-task-title">Create Task</h2>
          <button type="button" class="close-btn" aria-label="Close" @click="close">×</button>
        </div>
        <form @submit.prevent="submit" class="modal-form">
          <label for="task-title">Title</label>
          <input id="task-title" v-model="title" type="text" required placeholder="Task title" />
          <label for="task-desc">Description (optional)</label>
          <textarea id="task-desc" v-model="description" rows="2" placeholder="Details…"></textarea>
          <label for="task-priority">Priority</label>
          <select id="task-priority" v-model="priority">
            <option v-for="p in TASK_PRIORITIES" :key="p" :value="p">{{ p }}</option>
          </select>
          <label for="task-due">Due date (optional)</label>
          <input id="task-due" v-model="dueDate" type="date" />
          <div class="modal-actions">
            <button type="button" class="btn-cancel" @click="close">Cancel</button>
            <button type="submit" class="btn-submit">Create Task</button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal {
  background: #fff;
  border-radius: 16px;
  width: 100%;
  max-width: 420px;
  max-height: 90vh;
  overflow: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e0e8e0;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.25rem;
  color: #1b5e20;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #78909c;
  cursor: pointer;
  padding: 0 0.25rem;
  line-height: 1;
}

.close-btn:hover {
  color: #37474f;
}

.modal-form {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal-form label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #37474f;
}

.modal-form input,
.modal-form textarea,
.modal-form select {
  padding: 0.6rem 0.75rem;
  border: 1px solid #a5d6a7;
  border-radius: 8px;
  font-size: 1rem;
}

.modal-form input:focus,
.modal-form textarea:focus,
.modal-form select:focus {
  outline: none;
  border-color: #2e7d32;
  box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.2);
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.btn-cancel {
  padding: 0.6rem 1rem;
  background: #fff;
  border: 1px solid #b0bec5;
  border-radius: 8px;
  color: #546e7a;
  font-weight: 600;
  cursor: pointer;
}

.btn-cancel:hover {
  background: #eceff1;
}

.btn-submit {
  padding: 0.6rem 1rem;
  background: #2e7d32;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.btn-submit:hover {
  background: #1b5e20;
}
</style>
