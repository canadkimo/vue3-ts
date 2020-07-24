import { AcceptedLanguages, changeLang } from '@/plugins/i18n';
import { onBeforeRouteUpdate, useRouter } from 'vue-router';
import { localeRouteMiddleware } from '@/router';

export default function useLocale() {
  const router = useRouter();
  const changeLocale = (lang: AcceptedLanguages) => {
    const hasChanged = changeLang(lang);
    if (hasChanged) {
      const newRoute = {
        name: router.currentRoute.value.name,
        params: {
          ...router.currentRoute.value.params,
          lang,
        },
      };
      router.push(newRoute);
    }
  };

  onBeforeRouteUpdate((to, from, next) => {
    localeRouteMiddleware(to, from, next);
  });

  return {
    changeLocale,
  };
}
