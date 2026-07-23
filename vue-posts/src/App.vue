<script setup>
import { RouterView } from 'vue-router';
import { startBridge } from './bridge.js';
import AppNav from './components/AppNav.vue';

startBridge();
</script>

<template>
  <div class="app-shell">
    <div class="app-main">
      <RouterView />
    </div>
    <AppNav />
  </div>
</template>
