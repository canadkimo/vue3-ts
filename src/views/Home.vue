<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div>
      {{ t('message.language') }}
      {{ t('message.plural', { n: 10 }) }}
      {{ t('message.plural', { n: 0 }) }}
      <router-link :to="{ name: 'User' }">User</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
  },
  setup() {
    return {
      ...useI18n(),
    };
  },
});
</script>
