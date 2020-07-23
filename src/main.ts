import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store';
import { i18n } from './plugins/i18n';

createApp(App).use(i18n).use(router).use(store)
  .mount('#app');
