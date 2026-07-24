<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import {
  airportLabel,
  formatEtb,
  resolveFlight,
} from '../data/flights.js';
import ChoogaBridge, { displayNameFromUser, startBridge } from '../bridge.js';
import { saveBooking } from '../data/bookings.js';

const route = useRoute();
const router = useRouter();
const paying = ref(false);
const bridge = ref(ChoogaBridge.getState());

const flight = computed(() =>
  resolveFlight({
    flightNo: String(route.query.flightNo || ''),
    from: String(route.query.from || ''),
    to: String(route.query.to || ''),
    date: String(route.query.date || ''),
    cabin: String(route.query.cabin || 'economy'),
  }),
);

const pax = computed(() => Number(route.query.pax || 1));
const total = computed(() =>
  flight.value ? flight.value.fare * pax.value : 0,
);

const resultsQuery = computed(() => {
  const q = {
    from: String(route.query.from || ''),
    to: String(route.query.to || ''),
    date: String(route.query.date || ''),
    cabin: String(route.query.cabin || 'economy'),
    pax: String(route.query.pax || 1),
  };
  return `/results?${new URLSearchParams(q).toString()}`;
});

const passenger = reactive({
  fullName: '',
  phone: '',
  email: '',
});

onMounted(() => {
  startBridge();
  ChoogaBridge.subscribe(state => {
    bridge.value = state;
    if (!passenger.fullName) {
      passenger.fullName = displayNameFromUser(state.user);
    }
    if (!passenger.phone && state.user?.phone_number) {
      passenger.phone = state.user.phone_number;
    }
    if (!passenger.email && state.user?.email) {
      passenger.email = state.user.email;
    }
  });
});

async function pay() {
  if (!flight.value || paying.value) return;
  paying.value = true;
  try {
    const payment = await ChoogaBridge.payments.initiate({
      amount: total.value,
      currency: 'ETB',
      reference: `HA_${flight.value.flightNo}_${Date.now().toString(36)}`,
      description: `${flight.value.flightNo} ${flight.value.from}→${flight.value.to}`,
      metadata: {
        flightId: flight.value.id,
        passengers: pax.value,
        cabin: flight.value.cabin,
      },
    });

    if (payment?.ok === false) {
      ChoogaBridge.toast(payment?.reason || 'Payment cancelled', 'error');
      return;
    }

    const booking = {
      pnr: `ET${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      flight: flight.value,
      passengers: pax.value,
      passenger: { ...passenger },
      total: total.value,
      payment,
    };
    saveBooking(booking);
    ChoogaBridge.toast('Ticket issued', 'success');
    router.replace(`/confirmation/${booking.pnr}`);
  } catch (e) {
    ChoogaBridge.toast(e?.message || 'Payment failed', 'error');
  } finally {
    paying.value = false;
  }
}
</script>

<template>
  <div v-if="!flight" class="stack page">
    <RouterLink to="/search">← Search again</RouterLink>
    <p class="error">Flight not found. Search again.</p>
  </div>

  <div v-else class="stack page">
    <RouterLink :to="resultsQuery">← Back to results</RouterLink>

    <div class="panel stack">
      <p class="eyebrow">{{ flight.airline }} · {{ flight.flightNo }}</p>
      <h1>
        {{ airportLabel(flight.from) }}
        <span class="arrow">→</span>
        {{ airportLabel(flight.to) }}
      </h1>
      <p class="muted">
        {{ flight.date }} · {{ flight.departLabel }}–{{ flight.arriveLabel }} ·
        {{ flight.durationLabel }}
      </p>
      <ul class="facts">
        <li>{{ flight.aircraft }}</li>
        <li>{{ flight.cabin }} · {{ flight.baggage }}</li>
        <li>{{ flight.meal }}</li>
        <li>{{ pax }} passenger{{ pax > 1 ? 's' : '' }}</li>
      </ul>
      <p class="fare-lg">{{ formatEtb(total) }}</p>
    </div>

    <form class="panel stack" @submit.prevent="pay">
      <h2>Passenger</h2>
      <label>
        Full name (as on ID)
        <input v-model="passenger.fullName" required autocomplete="name" />
      </label>
      <label>
        Mobile
        <input
          v-model="passenger.phone"
          type="tel"
          required
          placeholder="+2519…"
          autocomplete="tel"
        />
      </label>
      <label>
        Email (optional)
        <input v-model="passenger.email" type="email" autocomplete="email" />
      </label>
      <button type="submit" :disabled="paying">
        {{ paying ? 'Waiting for PIN…' : `Pay ${formatEtb(total)}` }}
      </button>
      <p class="muted tiny">
        Awash will ask for your PIN. This demo authorizes payment without a live
        debit.
      </p>
    </form>
  </div>
</template>
