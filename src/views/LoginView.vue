<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const email = ref('student@taskbuddy.edu')
const password = ref('123')
const error = ref('')
const loading = ref(false)

async function submit() {
  error.value = ''
  loading.value = true
  const result = auth.login(email.value, password.value)
  loading.value = false
  if (result.ok) {
    const redirect = route.query.redirect || '/dashboard'
    router.push(redirect)
  } else {
    error.value = result.error
  }
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1 class="auth-title">Sign in to your account</h1>
      <p class="auth-subtitle">Welcome back to Task-Buddy</p>

      <form @submit.prevent="submit" class="auth-form">
        <p v-if="error" class="auth-error" role="alert">{{ error }}</p>
        <label for="login-email">Email address</label>
        <input
          id="login-email"
          v-model="email"
          type="email"
          required
          autocomplete="email"
          placeholder="you@example.com"
        />
        <label for="login-password">Password</label>
        <input
          id="login-password"
          v-model="password"
          type="password"
          required
          autocomplete="current-password"
          placeholder="•••"
        />
        <button type="submit" class="auth-submit" :disabled="loading">
          {{ loading ? 'Signing in…' : 'Sign in' }}
        </button>
      </form>

      <p class="auth-demo">Demo: student@taskbuddy.edu / 123</p>
      <p class="auth-switch">
        Don't have an account?
        <router-link to="/signup">Sign up</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(145deg, #e8f5e9 0%, #c8e6c9 100%);
  padding: 1.5rem;
}

.auth-card {
  width: 100%;
  max-width: 400px;
  background: #fff;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 24px rgba(27, 94, 32, 0.12);
}

.auth-title {
  margin: 0 0 0.25rem;
  font-size: 1.75rem;
  font-weight: 700;
  color: #1b5e20;
}

.auth-subtitle {
  margin: 0 0 1.5rem;
  color: #558b2f;
  font-size: 0.95rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.auth-form label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #37474f;
}

.auth-form input {
  padding: 0.65rem 0.9rem;
  border: 1px solid #a5d6a7;
  border-radius: 8px;
  font-size: 1rem;
}

.auth-form input:focus {
  outline: none;
  border-color: #2e7d32;
  box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.2);
}

.auth-error {
  margin: 0;
  padding: 0.5rem;
  background: #ffebee;
  color: #c62828;
  border-radius: 6px;
  font-size: 0.9rem;
}

.auth-submit {
  margin-top: 0.5rem;
  padding: 0.75rem;
  background: #2e7d32;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
}

.auth-submit:hover:not(:disabled) {
  background: #1b5e20;
}

.auth-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.auth-demo {
  margin: 1rem 0 0;
  font-size: 0.8rem;
  color: #689f38;
}

.auth-switch {
  margin: 1rem 0 0;
  font-size: 0.9rem;
  color: #546e7a;
}

.auth-switch a {
  color: #2e7d32;
  font-weight: 600;
  text-decoration: underline;
}

.auth-switch a:hover {
  color: #1b5e20;
}
</style>
