import { RouteRecordRaw } from 'vue-router';
import auth from '@/middleware/auth';
import admin from '@/middleware/admin';

const userRoutes: Array<RouteRecordRaw> = [
  {
    path: 'user',
    name: 'User',
    meta: {
      middleware: [
        auth,
        admin,
      ],
    },
    component: () => import(/* webpackChunkName: "user" */ '../views/user/index.vue'),
  },
];

export default userRoutes;
