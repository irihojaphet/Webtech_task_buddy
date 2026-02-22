<script setup>
defineProps({
  title: { type: String, required: true },
  value: { type: [String, Number], default: '' },
  subtitle: { type: String, default: '' },
  variant: { type: String, default: 'default' },
  progress: { type: Number, default: null }, // 0-100 for progress bar
})
</script>

<template>
  <div class="summary-card" :class="[variant]">
    <p class="card-title">{{ title }}</p>
    <p class="card-value">{{ value }}</p>
    <p v-if="subtitle" class="card-subtitle">{{ subtitle }}</p>
    <div v-if="progress != null" class="progress-wrap">
      <div class="progress-bar" :style="{ width: `${Math.min(100, Math.max(0, progress))}%` }"></div>
    </div>
  </div>
</template>

<style scoped>
.summary-card {
  background: #fff;
  border-radius: 12px;
  padding: 1.25rem;
  border: 1px solid #e0e8e0;
  min-width: 0;
}

.summary-card.warning .card-value,
.summary-card.warning .card-subtitle {
  color: #c62828;
}

.summary-card.success .card-value {
  color: #2e7d32;
}

.card-title {
  margin: 0 0 0.35rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: #78909c;
}

.card-value {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 700;
  color: #1b5e20;
}

.card-subtitle {
  margin: 0.25rem 0 0;
  font-size: 0.85rem;
  color: #546e7a;
}

.progress-wrap {
  margin-top: 0.75rem;
  height: 6px;
  background: #e0e8e0;
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: #2e7d32;
  border-radius: 3px;
  transition: width 0.3s ease;
}
</style>
