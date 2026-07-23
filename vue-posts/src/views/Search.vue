<script setup>
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { AIRPORTS, defaultTravelDate } from '../data/flights.js';
import { startBridge } from '../bridge.js';

const router = useRouter();

const form = reactive({
  from: 'ADD',
  to: 'BJR',
  date: defaultTravelDate(),
  cabin: 'economy',
  passengers: 1,
});

onMounted(() => startBridge());

function swap() {
  const tmp = form.from;
  form.from = form.to;
  form.to = tmp;
}

function onSubmit() {
  if (form.from === form.to) return;
  const q = new URLSearchParams({
    from: form.from,
    to: form.to,
    date: form.date,
    cabin: form.cabin,
    pax: String(form.passengers),
  });
  router.push(`/results?${q.toString()}`);
}
</script>

<template>
  <div class="stack page">
    <div>
      <h1>Search flights</h1>
      <p class="muted">Ethiopia and nearby hubs · fares in ETB</p>
    </div>

    <form class="panel stack search-form" @submit.prevent="onSubmit">
      <div class="route-row">
        <label>
          From
          <select v-model="form.from" required>
            <option v-for="a in AIRPORTS" :key="a.code" :value="a.code">
              {{ a.city }} ({{ a.code }})
            </option>
          </select>
        </label>
        <button type="button" class="swap" aria-label="Swap cities" @click="swap">
          ⇄
        </button>
        <label>
          To
          <select v-model="form.to" required>
            <option v-for="a in AIRPORTS" :key="a.code" :value="a.code">
              {{ a.city }} ({{ a.code }})
            </option>
          </select>
        </label>
      </div>

      <div class="grid-2">
        <label>
          Departure
          <input v-model="form.date" type="date" required />
        </label>
        <label>
          Passengers
          <input
            v-model.number="form.passengers"
            type="number"
            min="1"
            max="6"
            required
          />
        </label>
      </div>

      <fieldset class="cabin-pick">
        <legend>Cabin</legend>
        <label class="chip">
          <input v-model="form.cabin" type="radio" value="economy" />
          Economy
        </label>
        <label class="chip">
          <input v-model="form.cabin" type="radio" value="business" />
          Cloud Nine (Business)
        </label>
      </fieldset>

      <button type="submit">Find flights</button>
    </form>
  </div>
</template>
