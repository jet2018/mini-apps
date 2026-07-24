<script setup>
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import ChoogaBridge from '../bridge.js';
import { House, Plane, Search, Ticket, X } from '../icons.js';

const route = useRoute();

const isHome = computed(() => route.path === '/');
const isSearch = computed(() =>
  ['/search', '/results', '/book'].includes(route.path),
);
const isBookings = computed(() =>
  route.path === '/bookings' || route.path.startsWith('/confirmation'),
);
</script>

<template>
  <nav class="app-nav" aria-label="Main">
    <RouterLink to="/" class="nav-item" :class="{ on: isHome }">
      <House :size="22" :stroke-width="2.1" />
      <span>Home</span>
    </RouterLink>
    <RouterLink to="/search" class="nav-item" :class="{ on: isSearch }">
      <Search :size="22" :stroke-width="2.1" />
      <span>Search</span>
    </RouterLink>
    <RouterLink to="/bookings" class="nav-item" :class="{ on: isBookings }">
      <Ticket :size="22" :stroke-width="2.1" />
      <span>Bookings</span>
    </RouterLink>
    <button type="button" class="nav-item" @click="ChoogaBridge.close()">
      <X :size="22" :stroke-width="2.1" />
      <span>Close</span>
    </button>
  </nav>
</template>
