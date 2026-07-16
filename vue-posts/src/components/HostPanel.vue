<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { ChoogaBridge } from '../chooga-bridge.js';

const EXTERNAL_DOCS = 'https://jsonplaceholder.typicode.com';
const bridge = ref(ChoogaBridge.getState());
let unsubscribe = () => {};

onMounted(() => {
  ChoogaBridge.init();
  unsubscribe = ChoogaBridge.subscribe(next => {
    bridge.value = next;
  });
});

onUnmounted(() => unsubscribe());

const tokenPreview = () =>
  bridge.value.session?.token ? `${bridge.value.session.token.slice(0, 28)}…` : '—';
</script>

<template>
  <section class="host-panel">
    <details open>
      <summary>
        Host bridge
        <span class="status-pill" :class="{ off: !bridge.hostConnected }">
          {{ bridge.hostConnected ? 'connected' : 'standalone' }}
        </span>
      </summary>

      <div class="stack" style="margin-top: 0.75rem">
        <div class="muted">
          Ready sent: {{ bridge.readySent ? 'yes' : 'no' }} · Theme:
          {{ bridge.theme?.mode || '—' }} / {{ bridge.theme?.primary_color || 'default' }}
        </div>

        <div>
          <strong>Session</strong>
          <pre>{{ JSON.stringify({ token: tokenPreview(), expires_at: bridge.session?.expires_at || null }, null, 2) }}</pre>
        </div>

        <div>
          <strong>User</strong>
          <pre>{{ JSON.stringify(bridge.user || null, null, 2) }}</pre>
        </div>

        <div>
          <strong>Safe area</strong>
          <pre>{{ JSON.stringify(bridge.safeArea || null, null, 2) }}</pre>
        </div>

        <div>
          <strong>Last capability</strong>
          <pre>{{ JSON.stringify(bridge.lastCapability || null, null, 2) }}</pre>
        </div>

        <div class="row">
          <button type="button" @click="ChoogaBridge.requestCapability('user.identity')">
            Request identity
          </button>
          <button type="button" @click="ChoogaBridge.requestCapability('user.phone')">
            Request phone
          </button>
          <button type="button" class="secondary" @click="ChoogaBridge.openExternal(EXTERNAL_DOCS)">
            Open docs
          </button>
          <button type="button" class="secondary" @click="ChoogaBridge.close()">
            Close mini-app
          </button>
        </div>
      </div>
    </details>
  </section>
</template>
