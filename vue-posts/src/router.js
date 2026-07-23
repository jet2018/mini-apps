import { createRouter, createWebHistory } from 'vue-router';
import Welcome from './views/Welcome.vue';
import PostList from './views/PostList.vue';
import PostDetails from './views/PostDetails.vue';
import ComposePost from './views/ComposePost.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'welcome', component: Welcome },
    { path: '/posts', name: 'list', component: PostList },
    { path: '/post/:id', name: 'details', component: PostDetails, props: true },
    { path: '/compose', name: 'compose', component: ComposePost },
  ],
});

export default router;
