import { createRouter, createWebHistory } from 'vue-router';
import Welcome from './views/Welcome.vue';
import Search from './views/Search.vue';
import Results from './views/Results.vue';
import Book from './views/Book.vue';
import Bookings from './views/Bookings.vue';
import Confirmation from './views/Confirmation.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'welcome', component: Welcome },
    { path: '/search', name: 'search', component: Search },
    { path: '/results', name: 'results', component: Results },
    { path: '/flight/:id', name: 'book', component: Book },
    { path: '/bookings', name: 'bookings', component: Bookings },
    { path: '/confirmation/:pnr', name: 'confirmation', component: Confirmation },
  ],
});

export default router;
