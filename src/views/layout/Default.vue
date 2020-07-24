<template>
  <router-view></router-view>
  <div @click="changeLocale('zh-tw')">中文</div>
  <div @click="changeLocale('en-us')">英文</div>
</template>
<script lang="ts">
/* eslint-disable import/no-cycle */
import { defineComponent } from 'vue';
import { AcceptedLanguages, changeLang } from '@/plugins/i18n';
import { useRouter, onBeforeRouteUpdate } from 'vue-router';
import { localeRouteMiddleware } from '@/router';

export default defineComponent({
  setup() {
    const router = useRouter();
    const changeLocale = (code: AcceptedLanguages) => {
      const hasChanged = changeLang(code);
      if (hasChanged) {
        const newRoute = {
          name: router.currentRoute.value.name,
          params: {
            ...router.currentRoute.value.params,
            lang: code,
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
  },
});
</script>
