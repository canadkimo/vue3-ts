import { RouteRecordRaw } from 'vue-router';
import auth from '@/middleware/auth';

const userRoutes: Array<RouteRecordRaw> = [
  {
    path: 'user',
    name: 'User',
    meta: {
      middleware: [
        auth,
      ],
    },
    component: () => import(/* webpackChunkName: "user" */ '../views/user/index.vue'),
  },
];

export default userRoutes;
