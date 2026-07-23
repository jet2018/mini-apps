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
      <RouterLink to="/" class="brand">
        <span class="mark">HA</span>
        Habesha Airways
      </RouterLink>
      <nav class="nav-links">
        <RouterLink to="/search">Search</RouterLink>
        <RouterLink to="/bookings">Bookings</RouterLink>
        <button type="button" class="ghost" @click="ChoogaBridge.close()">
          Close
        </button>
      </nav>
    </header>
    <RouterView />
  </div>
</template>
