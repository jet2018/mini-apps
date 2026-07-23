<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import ChoogaBridge, { startBridge } from '../bridge.js';

const posts = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  startBridge();
  ChoogaBridge.showProgress({ message: 'Loading posts…' });
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=20');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    posts.value = await res.json();
  } catch (e) {
    error.value = e.message || 'Failed to load posts';
    ChoogaBridge.toast(error.value, 'error');
  } finally {
    ChoogaBridge.dismissProgress();
    loading.value = false;
  }
});

onUnmounted(() => {
  ChoogaBridge.dismissProgress();
});
</script>

<template>
  <div class="stack">
    <div>
      <h1>Posts</h1>
      <p class="muted">Pick a post to read, or compose a new one.</p>
    </div>

    <p v-if="loading" class="muted">Loading posts…</p>
    <p v-else-if="error" class="error">Error: {{ error }}</p>

    <div v-else class="post-list">
      <RouterLink
        v-for="post in posts"
        :key="post.id"
        :to="`/post/${post.id}`"
        class="post-card"
      >
        <h3>#{{ post.id }} · {{ post.title }}</h3>
        <p class="muted">{{ post.body.slice(0, 120) }}…</p>
      </RouterLink>
    </div>
  </div>
</template>
