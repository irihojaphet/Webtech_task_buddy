<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const navItems = [
  { path: '/dashboard', name: 'dashboard', label: 'Dashboard' },
  { path: '/todo', name: 'todo', label: 'To Do' },
  { path: '/in-progress', name: 'inProgress', label: 'In Progress' },
  { path: '/completed', name: 'completed', label: 'Completed' },
]

const isActive = (item) => route.name === item.name

const displayName = computed(() => auth.currentUser?.name || auth.currentUser?.email?.split('@')[0] || 'User')

const initial = computed(() => (displayName.value.charAt(0) || 'U').toUpperCase())

function logout() {
  auth.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="app-layout">
    <aside class="sidebar" aria-label="Main navigation">
      <h1 class="sidebar-brand">
        <router-link to="/dashboard" class="brand-link">Task-Buddy</router-link>
      </h1>
      <nav class="sidebar-nav" aria-label="Primary">
        <router-link
          v-for="item in navItems"
          :key="item.name"
          :to="item.path"
          class="nav-link"
          :class="{ active: isActive(item) }"
        >
          {{ item.label }}
        </router-link>
      </nav>
      <div class="sidebar-account" aria-label="Account">
        <p class="account-label">ACCOUNT</p>
        <div class="account-user">
          <span class="avatar" aria-hidden="true">{{ initial }}</span>
          <span class="username">{{ displayName }}</span>
        </div>
        <button type="button" class="logout-btn" @click="logout">Log out</button>
      </div>
    </aside>
    <main id="main-content" class="main">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
  background: #f5f7f5;
}

.sidebar {
  width: 240px;
  min-width: 240px;
  background: #fff;
  border-right: 1px solid #e0e8e0;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 0;
}

.sidebar-brand {
  margin: 0 1rem 1.5rem;
  font-size: 1.25rem;
  font-weight: 700;
}

.brand-link {
  color: #1b5e20;
  text-decoration: none;
}

.brand-link:hover {
  color: #2e7d32;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.nav-link {
  padding: 0.6rem 1rem;
  color: #37474f;
  text-decoration: none;
  font-weight: 500;
  border-radius: 0 8px 8px 0;
  margin: 0 0.5rem;
  transition: background 0.15s, color 0.15s;
}

.nav-link:hover {
  background: #e8f5e9;
  color: #1b5e20;
}

.nav-link.active {
  background: #c8e6c9;
  color: #1b5e20;
}

.sidebar-account {
  margin-top: auto;
  padding: 1rem 1rem 0;
  border-top: 1px solid #e0e8e0;
}

.account-label {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #78909c;
  margin: 0 0 0.5rem;
}

.account-user {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #1b5e20;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
}

.username {
  font-size: 0.95rem;
  color: #263238;
}

.logout-btn {
  background: none;
  border: none;
  color: #c62828;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.25rem 0;
  font-weight: 500;
}

.logout-btn:hover {
  text-decoration: underline;
}

.main {
  flex: 1;
  overflow: auto;
  padding: 1.5rem 2rem;
}
</style>
