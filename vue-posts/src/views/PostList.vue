<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

const posts = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=20');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    posts.value = await res.json();
  } catch (e) {
    error.value = e.message || 'Failed to load posts';
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="stack">
    <div>
      <h1>JSONPlaceholder Posts</h1>
      <p class="muted">Listing from jsonplaceholder.typicode.com</p>
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
