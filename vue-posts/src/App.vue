<script setup>
import { RouterLink, RouterView } from 'vue-router';
import HostPanel from './components/HostPanel.vue';
</script>

<template>
  <div class="app-shell">
    <header class="topnav">
      <div class="brand">Chooga · Vue Posts</div>
      <nav class="nav-links">
        <RouterLink to="/">Posts</RouterLink>
        <RouterLink to="/compose">Compose</RouterLink>
      </nav>
    </header>

    <HostPanel />
    <RouterView />
  </div>
</template>
