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

<template>
  <section class="add-task" aria-labelledby="add-task-heading">
    <h2 id="add-task-heading" class="visually-hidden">Add new task</h2>
    <div class="add-task-row">
      <label for="new-task-input" class="visually-hidden">New task</label>
      <input
        id="new-task-input"
        v-model="title"
        type="text"
        placeholder="New Task"
        aria-label="New task title"
        class="task-input"
        @keydown="onKeydown"
      />
      <button
        type="button"
        class="btn btn-add"
        :disabled="!canSubmit"
        aria-label="Add task"
        @click="submit"
      >
        Add Task
      </button>
    </div>
    <div v-show="showOptions" class="add-options">
      <label for="new-task-category">Category</label>
      <select id="new-task-category" v-model="category" aria-label="Task category">
        <option v-for="cat in TASK_CATEGORIES" :key="cat" :value="cat">
          {{ cat }}
        </option>
      </select>
      <label for="new-task-priority">Priority</label>
      <select id="new-task-priority" v-model="priority" aria-label="Task priority">
        <option v-for="p in TASK_PRIORITIES" :key="p" :value="p">
          {{ p }}
        </option>
      </select>
      <label for="new-task-due">Due date</label>
      <input
        id="new-task-due"
        v-model="dueDate"
        type="date"
        aria-label="Due date"
        class="due-input"
      />
    </div>
    <button
      type="button"
      class="btn-options-toggle"
      :aria-expanded="showOptions"
      @click="showOptions = !showOptions"
    >
      {{ showOptions ? 'Hide options' : 'Category, priority & due date' }}
    </button>
  </section>
</template>

<style scoped>
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

.btn-add {
  background: #2e7d32;
  color: #fff;
}

.btn-add:hover:not(:disabled) {
  background: #1b5e20;
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
</style>
