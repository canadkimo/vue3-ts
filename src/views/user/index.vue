<template>
  <div>
    User Page
    Lnag: {{ locale }}
    {{ t('message.language') }}
    {{ t('message.plural', { n: 10 }) }}
    {{ t('message.plural', { n: 0 }) }}
    <button @click="getUserBasicInfo('1')">取得使用者資料</button>
    <ul v-if="userBasicInfo">
      <li>
        UserID: {{ userBasicInfo.userID }}
      </li>
      <li>First Name: {{ userBasicInfo.firstName }}</li>
      <li>Sur Name: {{ userBasicInfo.surName }}</li>
      <li>Email: {{ userBasicInfo.email }}</li>
    </ul>
    <router-link to="/">Home</router-link>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '../../store';
import { UserActionTypes } from '../../store/user/actions';

export default defineComponent({
  setup() {
    const store = useStore();
    const userBasicInfo = computed(() => store.state.user.basicInfo);
    const getUserBasicInfo = (userID: string) => {
      store.dispatch(UserActionTypes.GET_USER_BASIC_INFO, userID);
    };

    return {
      ...useI18n(),
      getUserBasicInfo,
      userBasicInfo,
    };
  },
});
</script>
