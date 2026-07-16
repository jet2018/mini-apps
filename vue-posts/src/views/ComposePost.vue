<script setup>
import { reactive, ref } from 'vue';
import { RouterLink } from 'vue-router';

const form = reactive({
  title: '',
  body: '',
  userId: 1,
});
const result = ref(null);
const error = ref(null);
const submitting = ref(false);

async function onSubmit() {
  submitting.value = true;
  error.value = null;
  result.value = null;
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({
        title: form.title,
        body: form.body,
        userId: Number(form.userId) || 1,
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    result.value = await res.json();
  } catch (e) {
    error.value = e.message || 'Failed to create post';
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <div class="stack">
    <RouterLink to="/">← Back to list</RouterLink>

    <div class="panel stack">
      <h1>Compose post</h1>
      <p class="muted">POSTs to JSONPlaceholder (fake create — returns an id).</p>

      <form class="stack" @submit.prevent="onSubmit">
        <label>
          Title
          <input v-model="form.title" required placeholder="Hello Chooga" />
        </label>
        <label>
          Body
          <textarea v-model="form.body" rows="5" required placeholder="Write something…" />
        </label>
        <label>
          User ID
          <input v-model="form.userId" type="number" min="1" required />
        </label>
        <button type="submit" :disabled="submitting">
          {{ submitting ? 'Submitting…' : 'Create post' }}
        </button>
      </form>

      <p v-if="error" class="error">Error: {{ error }}</p>
      <div v-if="result">
        <h3>API response</h3>
        <pre>{{ JSON.stringify(result, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>
