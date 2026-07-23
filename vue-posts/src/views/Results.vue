<script setup>
import { computed, onMounted, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import {
  airportLabel,
  formatEtb,
  searchFlights,
} from '../data/flights.js';
import { startBridge } from '../bridge.js';

const route = useRoute();
const router = useRouter();
const ready = ref(false);

const query = computed(() => ({
  from: String(route.query.from || 'ADD'),
  to: String(route.query.to || 'BJR'),
  date: String(route.query.date || ''),
  cabin: String(route.query.cabin || 'economy'),
  pax: Number(route.query.pax || 1),
}));

const flights = computed(() =>
  searchFlights({
    from: query.value.from,
    to: query.value.to,
    date: query.value.date,
    cabin: query.value.cabin,
  }),
);

onMounted(() => {
  startBridge();
  ready.value = true;
});

function selectFlight(flight) {
  const q = new URLSearchParams({
    ...query.value,
    pax: String(query.value.pax),
  });
  router.push(`/flight/${encodeURIComponent(flight.id)}?${q.toString()}`);
}
</script>

<template>
  <div class="stack page">
    <RouterLink to="/search">← Edit search</RouterLink>

    <div>
      <h1>
        {{ airportLabel(query.from) }}
        <span class="arrow">→</span>
        {{ airportLabel(query.to) }}
      </h1>
      <p class="muted">
        {{ query.date }} · {{ query.cabin }} · {{ query.pax }} passenger{{
          query.pax > 1 ? 's' : ''
        }}
      </p>
    </div>

    <p v-if="ready && !flights.length" class="panel muted">
      No flights for that route/date. Try Addis Ababa to Bahir Dar.
    </p>

    <button
      v-for="f in flights"
      :key="f.id"
      type="button"
      class="flight-card"
      @click="selectFlight(f)"
    >
      <div class="flight-times">
        <div>
          <strong>{{ f.departLabel }}</strong>
          <span class="muted">{{ f.from }}</span>
        </div>
        <div class="duration">
          <span>{{ f.durationLabel }}</span>
          <span class="line" />
          <span class="muted">{{ f.aircraft }}</span>
        </div>
        <div>
          <strong>{{ f.arriveLabel }}</strong>
          <span class="muted">{{ f.to }}</span>
        </div>
      </div>
      <div class="flight-meta">
        <span class="flight-no">{{ f.flightNo }}</span>
        <span class="seats">{{ f.seatsLeft }} seats left</span>
        <span class="fare">{{ formatEtb(f.fare * query.pax) }}</span>
      </div>
    </button>
  </div>
</template>
