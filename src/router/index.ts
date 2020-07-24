import {
  RouteRecordRaw, createRouter, createWebHistory, RouteLocationNormalized, NavigationGuardNext,
} from 'vue-router';
import {
  languages, getUserLang, AcceptedLanguages, getLocalStorageLang,
} from '@/plugins/i18n';
import Root from '@/Root.vue';
import NotFound from '@/views/NotFound.vue';
import { useStore } from '@/store';
import userRoutes from './user';
import middlewarePipeline, { Middleware, MiddlewareContext } from './middlewarePipeline';

const languageOptions = languages.join('|');

const localeRouteMiddleware = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
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
};

const routes: Array<RouteRecordRaw> = [
  {
    path: `/:lang(${languageOptions})?`,
    component: Root,
    beforeEnter: ((to, from, next) => {
      localeRouteMiddleware(to, from, next);
    }),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
      },
      ...userRoutes,
    ],
  },
  {
    path: '/404',
    component: NotFound,
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }
  const middleware = to.meta.middleware as Array<Middleware>;
  const context: MiddlewareContext = {
    to,
    from,
    next,
    store: useStore(),
  };

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});

export default router;
