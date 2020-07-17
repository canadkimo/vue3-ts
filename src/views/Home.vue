<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div>
      <p>counter: {{ counter }}</p>
      <p>double counter: {{ doubleCounter }}</p>
      <button @click="resetCounter">Reset</button>
      <button @click="getCounter">get counter</button>
      <p>User ID {{ userID }}</p>
      <input @change="setUserID" type="text">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/actions';
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import { MutationTypes } from '../store/mutations';
import { UserActionTypes } from '../store/user/actions';

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
  },
  setup() {
    const store = useStore();

    const counter = computed(() => store.state.counter);
    const doubleCounter = computed(() => store.getters.doubledCounter);
    const userID = computed(() => store.state.user.id);

    function resetCounter() {
      store.commit(MutationTypes.SET_COUNTER, 0);
    }

    async function getCounter() {
      const result = await store.dispatch(ActionTypes.GET_COUNTER, 256);
      console.log(result);
    }

    function setUserID(event: Event) {
      const { target } = event;
      if (target) {
        const { value } = target as HTMLInputElement;
        store.dispatch(UserActionTypes.SET_USER_ID, value);
      }
    }

    return {
      counter,
      doubleCounter,
      resetCounter,
      getCounter,
      setUserID,
      userID,
    };
  },
});
</script>
