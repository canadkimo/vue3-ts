import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import {
  languages, getUserLang, AcceptedLanguages, getLocalStorageLang,
} from '@/plugins/i18n';
import Root from '@/Root.vue';
import userRoutes from './user';

const languageOptions = languages.join('|');

const routes: Array<RouteRecordRaw> = [
  {
    path: `/:lang(${languageOptions})?`,
    component: Root,
    beforeEnter: ((to, from, next) => {
      const lang = to.params.lang?.toString() as AcceptedLanguages;
      const defaultLang = getUserLang(lang) as AcceptedLanguages;
      const localStorageLang = getLocalStorageLang();

      if (localStorageLang) {
        if (localStorageLang === 'zh-tw' && lang) {
          const { params } = to;
          delete params.lang;
          return next({
            ...to,
            params,
            replace: true,
          });
        }
        if (localStorageLang !== lang && localStorageLang !== 'zh-tw') {
          return next({
            ...to,
            params: {
              ...to.params,
              lang: localStorageLang,
            },
            replace: true,
          });
        }
        return next();
      }

      if (!languages.includes(lang)) {
        return next({
          ...to,
          params: {
            ...to.params,
            lang: defaultLang,
          },
          replace: true,
        });
      }
      return next();
    }),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
      },
      {
        path: 'about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
      },
      ...userRoutes,
    ],
  },
  {
    path: '/:anythingElse',
    component: Root,
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const defaultLang = 'zh-tw';
//   const lang = to.params.lang?.toString();

//   if (languages.includes(lang)) {
//     if (i18n.global.locale.value !== lang) {
//       i18n.global.locale.value = lang;
//     }
//     return next();
//   }
//   return next({ path: `/${defaultLang}` });
// });

export default router;
