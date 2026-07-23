<script setup>
import { onMounted, reactive, ref } from 'vue';
import { RouterLink } from 'vue-router';
import ChoogaBridge, { displayNameFromUser, startBridge } from '../bridge.js';

const form = reactive({
  title: '',
  body: '',
});
const author = ref('there');
const result = ref(null);
const error = ref(null);
const submitting = ref(false);

onMounted(() => {
  startBridge();
  ChoogaBridge.subscribe(state => {
    author.value = displayNameFromUser(state.user);
  });
});

async function onSubmit() {
  submitting.value = true;
  error.value = null;
  result.value = null;
  ChoogaBridge.showProgress({ message: 'Publishing…' });
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({
        title: form.title,
        body: form.body,
        userId: 1,
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    result.value = await res.json();
    ChoogaBridge.toast('Post created', 'success');
  } catch (e) {
    error.value = e.message || 'Failed to create post';
    ChoogaBridge.toast(error.value, 'error');
  } finally {
    ChoogaBridge.dismissProgress();
    submitting.value = false;
  }
}
</script>

<template>
  <div class="stack">
    <RouterLink to="/posts">← Back to posts</RouterLink>

    <div class="panel stack">
      <h1>Compose post</h1>
      <p class="muted">Publishing as {{ author }} via the host-connected mini-app.</p>

      <form class="stack" @submit.prevent="onSubmit">
        <label>
          Title
          <input v-model="form.title" required placeholder="Hello Chooga" />
        </label>
        <label>
          Body
          <textarea v-model="form.body" rows="5" required placeholder="Write something…" />
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
