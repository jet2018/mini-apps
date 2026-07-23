<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import ChoogaBridge, { displayNameFromUser, startBridge } from '../bridge.js';

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
  <div class="welcome-hero">
    <div class="welcome-copy stack">
      <p class="eyebrow">Habesha Airways</p>
      <h1>Welcome, {{ name }}</h1>
      <p class="lede">
        Book domestic and regional flights — pay securely with your Awash PIN.
      </p>
      <div class="choice-grid">
        <button type="button" @click="router.push('/search')">
          Search flights
        </button>
        <button type="button" class="secondary" @click="router.push('/bookings')">
          My bookings
        </button>
      </div>
      <button
        v-if="bridge.hostConnected"
        type="button"
        class="ghost"
        @click="ChoogaBridge.close()"
      >
        Close mini-app
      </button>
    </div>
  </div>
</template>
