<template>
  <router-view></router-view>
  <div @click="changeLocale('zh-tw')">中文</div>
  <div @click="changeLocale('en-us')">英文</div>
</template>
<script lang="ts">
/* eslint-disable import/no-cycle */
import { defineComponent } from 'vue';
import useLocale from '@/composables/useLocale';

export default defineComponent({
  setup() {
    return {
      ...useLocale(),
    };
  },
});
</script>
