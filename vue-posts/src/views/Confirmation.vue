<script setup>
import { computed, onMounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { airportLabel, formatEtb } from '../data/flights.js';
import { getBooking } from '../data/bookings.js';
import { startBridge } from '../bridge.js';

const route = useRoute();
const booking = computed(() => getBooking(route.params.pnr));

onMounted(() => startBridge());
</script>

<template>
  <div v-if="!booking" class="stack page">
    <p class="error">Booking not found on this device.</p>
    <RouterLink to="/bookings">My bookings</RouterLink>
  </div>

  <div v-else class="stack page">
    <div class="panel success-banner stack">
      <div class="success-icon" aria-hidden="true">✓</div>
      <p class="eyebrow">Payment successful</p>
      <h1>Ticket issued</h1>
      <p class="lede">
        Your Awash PIN authorized this booking. Keep your PNR for check-in.
      </p>
    </div>

    <div class="panel ticket stack">
      <p class="eyebrow">Boarding pass · Habesha Airways</p>
      <h1>{{ booking.pnr }}</h1>
      <p class="lede">
        {{ airportLabel(booking.flight.from) }}
        <span class="arrow">→</span>
        {{ airportLabel(booking.flight.to) }}
      </p>
      <div class="ticket-grid">
        <div>
          <span class="muted">Flight</span>
          <strong>{{ booking.flight.flightNo }}</strong>
        </div>
        <div>
          <span class="muted">Date</span>
          <strong>{{ booking.flight.date }}</strong>
        </div>
        <div>
          <span class="muted">Depart</span>
          <strong>{{ booking.flight.departLabel }}</strong>
        </div>
        <div>
          <span class="muted">Arrive</span>
          <strong>{{ booking.flight.arriveLabel }}</strong>
        </div>
        <div>
          <span class="muted">Passenger</span>
          <strong>{{ booking.passenger.fullName }}</strong>
        </div>
        <div>
          <span class="muted">Paid</span>
          <strong>{{ formatEtb(booking.total) }}</strong>
        </div>
        <div v-if="booking.payment?.reference">
          <span class="muted">Payment ref</span>
          <strong class="mono">{{ booking.payment.reference }}</strong>
        </div>
      </div>
    </div>

    <div class="row">
      <RouterLink class="button" to="/search">Book another</RouterLink>
      <RouterLink class="button secondary" to="/bookings">All bookings</RouterLink>
    </div>
  </div>
</template>
