<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div>
      <p>counter: {{ counter }}</p>
      <p>double counter: {{ doubleCounter }}</p>
      <button @click="resetCounter">Reset</button>
      <button @click="getCounter">get counter</button>
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

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
  },
  setup() {
    const store = useStore();

    const counter = computed(() => store.state.counter);
    const doubleCounter = computed(() => store.getters.doubledCounter);

    function resetCounter() {
      store.commit(MutationTypes.SET_COUNTER, 0);
    }

    async function getCounter() {
      const result = await store.dispatch(ActionTypes.GET_COUNTER, 256);
      console.log(result);
    }

    return {
      counter,
      doubleCounter,
      resetCounter,
      getCounter,
    };
  },
});
</script>
