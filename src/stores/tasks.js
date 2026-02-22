import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

export const TASK_CATEGORIES = ['Work', 'Personal', 'Shopping', 'Other']
export const TASK_PRIORITIES = ['Low', 'Medium', 'High']
export const TASK_STATUSES = [
  { value: 'todo', label: 'To Do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
]

const STORAGE_PREFIX = 'taskbuddy_tasks_'

function getStorageKey() {
  const auth = useAuthStore()
  return auth.currentUser ? `${STORAGE_PREFIX}${auth.currentUser.id}` : null
}

function normalizeTask(t) {
  return {
    ...t,
    status: t.status ?? (t.completed ? 'completed' : 'todo'),
    description: t.description ?? null,
  }
}

function loadTasks() {
  const key = getStorageKey()
  if (!key) return []
  try {
    const raw = localStorage.getItem(key)
    const list = raw ? JSON.parse(raw) : []
    return list.map(normalizeTask)
  } catch {
    return []
  }
}

function saveTasks(tasks) {
  const key = getStorageKey()
  if (key) localStorage.setItem(key, JSON.stringify(tasks))
}

function todayStr() {
  const d = new Date()
  return d.toISOString().slice(0, 10)
}

export const useTasksStore = defineStore('tasks', () => {
  const auth = useAuthStore()
  const tasks = ref(loadTasks())

  let nextId = Math.max(0, ...tasks.value.map((t) => t.id)) + 1

  function reloadFromStorage() {
    tasks.value = loadTasks()
    nextId = Math.max(0, ...tasks.value.map((t) => t.id)) + 1
  }

  watch(
    () => auth.currentUser?.id,
    () => {
      reloadFromStorage()
    },
    { immediate: true }
  )

  watch(
    tasks,
    (val) => {
      saveTasks(val)
    },
    { deep: true }
  )

  const tasksByStatus = computed(() => ({
    todo: tasks.value.filter((t) => t.status === 'todo'),
    in_progress: tasks.value.filter((t) => t.status === 'in_progress'),
    completed: tasks.value.filter((t) => t.status === 'completed'),
  }))

  const todayTasks = computed(() => {
    const today = todayStr()
    return tasks.value.filter((t) => t.dueDate === today && t.status !== 'completed')
  })

  const upcomingTasks = computed(() => {
    const today = todayStr()
    return tasks.value.filter((t) => t.dueDate && t.dueDate > today && t.status !== 'completed')
  })

  const overdueTasks = computed(() => {
    const today = todayStr()
    return tasks.value.filter((t) => t.dueDate && t.dueDate < today && t.status !== 'completed')
  })

  const completionPercent = computed(() => {
    const n = tasks.value.length
    if (n === 0) return 0
    const done = tasks.value.filter((t) => t.status === 'completed').length
    return Math.round((done / n) * 100)
  })

  function addTask(payload) {
    const title = (payload?.title ?? '').trim()
    if (!title) return null
    const task = {
      id: nextId++,
      title,
      description: (payload?.description ?? '').trim() || null,
      status: payload?.status ?? 'todo',
      category: payload?.category ?? 'Personal',
      dueDate: payload?.dueDate || null,
      priority: payload?.priority ?? 'Medium',
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

  function setStatus(id, status) {
    return updateTask(id, { status })
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
    tasksByStatus,
    todayTasks,
    upcomingTasks,
    overdueTasks,
    completionPercent,
    addTask,
    updateTask,
    setStatus,
    removeTask,
    getTaskById,
    reloadFromStorage,
  }
})
