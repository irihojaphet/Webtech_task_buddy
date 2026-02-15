<script setup>
import { useCounterStore } from '../stores/counter'

const counterStore = useCounterStore()
</script>

<template>
  <section class="counter-section" aria-labelledby="counter-heading">
    <h2 id="counter-heading" class="visually-hidden">Counter</h2>
    <p class="count-display">Count: {{ counterStore.count }}</p>
    <button
      type="button"
      class="btn btn-increase"
      aria-label="Increase count"
      @click="counterStore.increment"
    >
      Increase +
    </button>
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

.counter-section {
  padding: 1rem 0;
}

.count-display {
  margin: 0 0 0.5rem;
  font-size: 1rem;
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

.btn-increase {
  background: #2e7d32;
  color: #fff;
  margin-top: 0.25rem;
}

.btn-increase:hover {
  background: #1b5e20;
}
</style>
