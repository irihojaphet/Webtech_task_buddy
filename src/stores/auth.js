import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_USERS = 'taskbuddy_users'
const STORAGE_CURRENT = 'taskbuddy_current'

function saveUsers(users) {
  localStorage.setItem(STORAGE_USERS, JSON.stringify(users))
}

function getStoredUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_USERS)
    let users = raw ? JSON.parse(raw) : []
    if (users.length === 0) {
      users = [{ id: 'demo', email: 'student@taskbuddy.edu', password: '123', name: 'student' }]
      saveUsers(users)
    }
    return users
  } catch {
    return []
  }
}

function getStoredCurrent() {
  try {
    const raw = localStorage.getItem(STORAGE_CURRENT)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveCurrent(user) {
  if (user) localStorage.setItem(STORAGE_CURRENT, JSON.stringify(user))
  else localStorage.removeItem(STORAGE_CURRENT)
}

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref(getStoredCurrent())

  const isLoggedIn = computed(() => !!currentUser.value)

  function signup(email, password, name = '') {
    const users = getStoredUsers()
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: 'An account with this email already exists.' }
    }
    const id = String(Date.now())
    const user = { id, email: email.trim(), password, name: (name || email.split('@')[0]).trim() }
    users.push(user)
    saveUsers(users)
    const { password: _, ...safe } = user
    currentUser.value = safe
    saveCurrent(currentUser.value)
    return { ok: true }
  }

  function login(email, password) {
    const users = getStoredUsers()
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )
    if (!user) return { ok: false, error: 'Invalid email or password.' }
    const { password: _, ...safe } = user
    currentUser.value = safe
    saveCurrent(currentUser.value)
    return { ok: true }
  }

  function logout() {
    currentUser.value = null
    saveCurrent(null)
  }

  function initFromStorage() {
    currentUser.value = getStoredCurrent()
  }

  return { currentUser, isLoggedIn, signup, login, logout, initFromStorage }
})
