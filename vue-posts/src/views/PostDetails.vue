<script setup>
import { onMounted, ref, watch } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
  id: { type: [String, Number], required: true },
});

const post = ref(null);
const author = ref(null);
const loading = ref(true);
const error = ref(null);

async function load() {
  loading.value = true;
  error.value = null;
  post.value = null;
  author.value = null;
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${props.id}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    post.value = await res.json();
    const userRes = await fetch(`https://jsonplaceholder.typicode.com/users/${post.value.userId}`);
    if (userRes.ok) author.value = await userRes.json();
  } catch (e) {
    error.value = e.message || 'Failed to load post';
  } finally {
    loading.value = false;
  }
}

onMounted(load);
watch(() => props.id, load);
</script>

<template>
  <div class="stack">
    <RouterLink to="/">← Back to list</RouterLink>

    <p v-if="loading" class="muted">Loading post…</p>
    <p v-else-if="error" class="error">Error: {{ error }}</p>

    <div v-else-if="post" class="panel stack">
      <h1>{{ post.title }}</h1>
      <p class="muted" v-if="author">
        By {{ author.name }} ({{ author.email }}) · user #{{ post.userId }}
      </p>
      <p>{{ post.body }}</p>
      <pre>{{ JSON.stringify(post, null, 2) }}</pre>
    </div>
  </div>
</template>
