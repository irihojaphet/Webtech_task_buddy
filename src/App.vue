<script setup>
import { useRoute } from 'vue-router'
import { watch } from 'vue'

const route = useRoute()

watch(
  () => route.path,
  () => {
    document.title = route.name === 'task' ? 'TaskBuddy' : 'TaskBuddy'
  },
  { immediate: true }
)
</script>

<template>
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
</style>
