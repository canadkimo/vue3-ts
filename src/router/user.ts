import { RouteRecordRaw } from 'vue-router';

const userRoutes: Array<RouteRecordRaw> = [
  {
    path: '/user',
    name: 'User',
    component: () => import(/* webpackChunkName: "user" */ '../views/user/index.vue'),
  },
];

export default userRoutes;
