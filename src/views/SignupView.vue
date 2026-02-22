<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function submit() {
  error.value = ''
  if (password.value.length < 3) {
    error.value = 'Password must be at least 3 characters.'
    return
  }
  loading.value = true
  const result = auth.signup(email.value, password.value, name.value)
  loading.value = false
  if (result.ok) {
    router.push('/dashboard')
  } else {
    error.value = result.error
  }
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1 class="auth-title">Create your account</h1>
      <p class="auth-subtitle">Join Task-Buddy</p>

      <form @submit.prevent="submit" class="auth-form">
        <p v-if="error" class="auth-error" role="alert">{{ error }}</p>
        <label for="signup-name">Name (optional)</label>
        <input
          id="signup-name"
          v-model="name"
          type="text"
          autocomplete="name"
          placeholder="Your name"
        />
        <label for="signup-email">Email address</label>
        <input
          id="signup-email"
          v-model="email"
          type="email"
          required
          autocomplete="email"
          placeholder="you@example.com"
        />
        <label for="signup-password">Password</label>
        <input
          id="signup-password"
          v-model="password"
          type="password"
          required
          autocomplete="new-password"
          placeholder="At least 3 characters"
        />
        <button type="submit" class="auth-submit" :disabled="loading">
          {{ loading ? 'Creating account…' : 'Sign up' }}
        </button>
      </form>

      <p class="auth-switch">
        Already have an account?
        <router-link to="/login">Sign in</router-link>
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
