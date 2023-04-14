import { createRouter, createWebHistory } from 'vue-router';
import AppWireframe from '../components/AppWireframe.vue';

import LoginView from '../views/LoginView.vue';
import UserView from '../views/UserView.vue';
import BrowseView from '../views/BrowseView.vue';
import ReservationsView from '../views/ReservationsView.vue';

import ManageView from '../views/manage/ManageView.vue';
import ManageVehiclesView from '../views/manage/ManageVehiclesView.vue';
import ManageUsersView from '../views/manage/ManageUsersView.vue';
import ManageReservationsView from '../views/manage/ManageReservationsView.vue';
import { loginGuard, roleGuard } from './auth'

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
      beforeEnter: loginGuard,
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
          redirect: { name: 'manage-reservations' },
          beforeEnter: roleGuard('EMPLOYEE', 'MANAGER'),
          children: [
            {
              path: 'vehicles',
              name: 'manage-vehicles',
              component: ManageVehiclesView,
              beforeEnter: roleGuard('MANAGER'),
            },
            {
              path: 'users',
              name: 'manage-users',
              component: ManageUsersView,
              beforeEnter: roleGuard('MANAGER'),
            },
            {
              path: 'reservations',
              name: 'manage-reservations',
              component: ManageReservationsView,
            },
          ],
        },
        {
          path: '/user',
          name: 'user',
          component: UserView,
        },
      ],
    },
  ],
});

export default router;
