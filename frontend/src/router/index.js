import { createRouter, createWebHistory } from 'vue-router';
import AppWireframe from '../components/AppWireframe.vue';
import LoginView from '../views/LoginView.vue';
import BrowseView from '../views/BrowseView.vue';
import ReservationsView from '../views/ReservationsView.vue';
import ManageView from '../views/ManageView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/',
      component: AppWireframe,
      children: [
        {
          path: 'browse',
          name: 'browse',
          component: BrowseView,
        },
        {
          path: 'reservations',
          name: 'reservations',
          component: ReservationsView,
        },
        {
          path: 'manage',
          name: 'manage',
          component: ManageView,
        },
      ]
    },
  ],
});

export default router;
