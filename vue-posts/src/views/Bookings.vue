<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { airportLabel, formatEtb } from '../data/flights.js';
import { loadBookings } from '../data/bookings.js';
import { startBridge } from '../bridge.js';

const bookings = ref([]);

onMounted(() => {
  startBridge();
  bookings.value = loadBookings();
});
</script>

<template>
  <div class="stack page">
    <div>
      <h1>My bookings</h1>
      <p class="muted">Tickets issued in this device session</p>
    </div>

    <p v-if="!bookings.length" class="panel muted">
      No tickets yet.
      <RouterLink to="/search">Search flights</RouterLink>
    </p>

    <RouterLink
      v-for="b in bookings"
      :key="b.pnr"
      :to="`/confirmation/${b.pnr}`"
      class="booking-card"
    >
      <div>
        <strong>{{ b.pnr }}</strong>
        <p class="muted">
          {{ b.flight.flightNo }} · {{ airportLabel(b.flight.from) }} →
          {{ airportLabel(b.flight.to) }}
        </p>
      </div>
      <span class="fare">{{ formatEtb(b.total) }}</span>
    </RouterLink>
  </div>
</template>
