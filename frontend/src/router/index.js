import { createRouter, createWebHistory } from 'vue-router';
import AppWireframe from '../components/AppWireframe.vue';

import LoginView from '../views/LoginView.vue';
import BrowseView from '../views/BrowseView.vue';
import CheckoutView from '../views/CheckoutView.vue';
import ReservationsView from '../views/ReservationsView.vue';

import ManageView from '../views/manage/ManageView.vue';
import ManageVehiclesView from '../views/manage/ManageVehiclesView.vue';
import ManageUsersView from '../views/manage/ManageUsersView.vue';
import ManageReservationsView from '../views/manage/ManageReservationsView.vue';

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
      redirect: { name: 'browse' },
      children: [
        {
          path: 'browse',
          name: 'browse',
          component: BrowseView,
        },
        {
          path: 'checkout/:id',
          name: 'checkout-vehicle',
          component: CheckoutView,
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
          redirect: { name: 'manage-vehicles' },
          children: [
            {
              path: 'vehicles',
              name: 'manage-vehicles',
              component: ManageVehiclesView,
            },
            {
              path: 'users',
              name: 'manage-users',
              component: ManageUsersView,
            },
            {
              path: 'reservations',
              name: 'manage-reservations',
              component: ManageReservationsView,
            },
          ],
        },
      ],
    },
  ],
});

export default router;
