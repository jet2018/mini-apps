<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import ChoogaBridge, { displayNameFromUser, startBridge } from '../bridge.js';
import { Plane, Ticket } from '../icons.js';

const router = useRouter();
const bridge = ref(ChoogaBridge.getState());

onMounted(() => {
  startBridge();
  ChoogaBridge.subscribe(state => {
    bridge.value = state;
  });
});

const name = computed(() => displayNameFromUser(bridge.value.user));
</script>

<template>
  <div class="stack welcome-page">
    <div class="stack">
      <h1>Welcome, {{ name }}</h1>
      <p class="lede">
        Book domestic and regional flights — pay with your Awash PIN.
      </p>
    </div>

    <div class="menu-grid">
      <button type="button" class="menu-card" @click="router.push('/search')">
        <span class="menu-icon">
          <Plane :size="26" :stroke-width="2" />
        </span>
        <span class="menu-copy">
          <strong>Search flights</strong>
          <span class="muted">ADD, Bahir Dar, DXB &amp; more</span>
        </span>
      </button>
      <button type="button" class="menu-card" @click="router.push('/bookings')">
        <span class="menu-icon">
          <Ticket :size="26" :stroke-width="2" />
        </span>
        <span class="menu-copy">
          <strong>My bookings</strong>
          <span class="muted">Tickets on this device</span>
        </span>
      </button>
    </div>
  </div>
</template>
