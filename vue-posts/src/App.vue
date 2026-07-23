<script setup>
import { computed } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router';
import ChoogaBridge, { startBridge } from './bridge.js';

startBridge();

const route = useRoute();
const showChrome = computed(() => route.path !== '/');
</script>

<template>
  <div class="app-shell">
    <header v-if="showChrome" class="topnav">
      <div class="brand">Chooga · Vue Posts</div>
      <nav class="nav-links">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/posts">Posts</RouterLink>
        <RouterLink to="/compose">Compose</RouterLink>
        <button type="button" class="secondary" @click="ChoogaBridge.close()">
          Close
        </button>
      </nav>
    </header>

    <RouterView />
  </div>
</template>
