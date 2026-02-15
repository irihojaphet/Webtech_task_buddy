import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const TASK_CATEGORIES = ['Work', 'Personal', 'Shopping', 'Other']
export const TASK_PRIORITIES = ['Low', 'Medium', 'High']

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref([
    { id: 1, title: 'Learn Vue3', completed: false, category: 'Personal', dueDate: null, priority: 'Medium' },
    { id: 2, title: 'Build TaskBuddy', completed: false, category: 'Work', dueDate: null, priority: 'High' },
    { id: 3, title: 'Deploy', completed: false, category: 'Work', dueDate: null, priority: 'Medium' },
  ])

  let nextId = 4

  const activeTasks = computed(() => tasks.value.filter((t) => !t.completed))
  const completedTasks = computed(() => tasks.value.filter((t) => t.completed))

  function addTask(title, options = {}) {
    if (!title?.trim()) return null
    const task = {
      id: nextId++,
      title: title.trim(),
      completed: false,
      category: options.category ?? 'Personal',
      dueDate: options.dueDate ?? null,
      priority: options.priority ?? 'Medium',
    }
    tasks.value.push(task)
    return task
  }

  function updateTask(id, updates) {
    const i = tasks.value.findIndex((t) => t.id === id)
    if (i === -1) return false
    tasks.value[i] = { ...tasks.value[i], ...updates }
    return true
  }

  function toggleComplete(id) {
    const task = tasks.value.find((t) => t.id === id)
    if (!task) return false
    task.completed = !task.completed
    return true
  }

  function removeTask(id) {
    const i = tasks.value.findIndex((t) => t.id === id)
    if (i === -1) return false
    tasks.value.splice(i, 1)
    return true
  }

  function getTaskById(id) {
    return tasks.value.find((t) => t.id === id) ?? null
  }

  return {
    tasks,
    activeTasks,
    completedTasks,
    addTask,
    updateTask,
    toggleComplete,
    removeTask,
    getTaskById,
  }
})
