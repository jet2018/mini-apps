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
  <div class="stack welcome-panel">
    <div class="panel stack">
      <p class="eyebrow">Chooga Posts</p>
      <h1>Welcome, {{ name }}</h1>
      <p class="muted">
        {{
          bridge.hostConnected
            ? 'You are signed in through Awash. Choose how you want to continue.'
            : 'Running in demo mode. Choose how you want to continue.'
        }}
      </p>
      <div class="choice-grid">
        <button type="button" @click="router.push('/posts')">Browse posts</button>
        <button type="button" class="secondary" @click="router.push('/compose')">
          Compose a post
        </button>
      </div>
      <button
        v-if="bridge.hostConnected"
        type="button"
        class="secondary"
        @click="ChoogaBridge.close()"
      >
        Close mini-app
      </button>
    </div>
  </div>
</template>
