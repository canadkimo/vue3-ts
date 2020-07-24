import {
  RouteRecordRaw, createRouter, createWebHistory, RouteLocationNormalized,
  NavigationGuardNext,
} from 'vue-router';
import {
  languages, getUserLang, AcceptedLanguages, getLocalStorageLang, changeLang, defaultLang,
} from '@/plugins/i18n';
import NotFound from '@/views/NotFound.vue';
import { useStore } from '@/store';
import Default from '@/views/layout/Default.vue';
import userRoutes from './user';
import middlewarePipeline, { Middleware, MiddlewareContext } from './middlewarePipeline';

const languageOptions = languages.join('|');

export const localeRouteMiddleware = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const lang = to.params.lang?.toString() as AcceptedLanguages;
  const userDefaultLang = getUserLang(lang) as AcceptedLanguages;
  const localStorageLang = getLocalStorageLang();

  // local storage is the highest priority
  // if user has lang setting in local storage
  // redirect user to the local storage lang
  if (localStorageLang) {
    changeLang(localStorageLang);

    // if the lang is default lang, remove param to hide lang prefix on url
    if (localStorageLang === defaultLang && lang) {
      const { params } = to;
      delete params.lang;
      return next({
        ...to,
        params: {
          ...params,
          lang: '',
        },
        replace: true,
      });
    }

    // if url lang prefix is not equal to local storage lang
    // redirect to local storage lang
    if (localStorageLang !== lang && localStorageLang !== defaultLang) {
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
    changeLang(userDefaultLang);
    return next({
      ...to,
      params: {
        ...to.params,
        lang: userDefaultLang,
      },
      replace: true,
    });
  }

  changeLang(lang);
  return next();
};

const routes: Array<RouteRecordRaw> = [
  {
    path: `/:lang(${languageOptions})?`,
    component: Default,
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
