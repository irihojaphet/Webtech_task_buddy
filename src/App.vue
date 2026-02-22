<script setup>
import { useRoute } from 'vue-router'
import { watch } from 'vue'

const route = useRoute()

watch(
  () => route.name,
  (name) => {
    const titles = {
      login: 'Sign in – Task-Buddy',
      signup: 'Sign up – Task-Buddy',
      dashboard: 'Dashboard – Task-Buddy',
      todo: 'To Do – Task-Buddy',
      inProgress: 'In Progress – Task-Buddy',
      completed: 'Done – Task-Buddy',
    }
    document.title = titles[name] || 'Task-Buddy'
  },
  { immediate: true }
)
</script>

<template>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <router-view />
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
}

/* Skip link: visible on focus for keyboard and screen reader users */
.skip-link {
  position: absolute;
  top: -100px;
  left: 0.5rem;
  z-index: 100;
  padding: 0.75rem 1rem;
  background: #6a1b9a;
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  border-radius: 0 0 6px 6px;
  transition: top 0.2s;
}

.skip-link:focus {
  top: 0;
  outline: 3px solid #fff;
  outline-offset: 2px;
}
</style>
