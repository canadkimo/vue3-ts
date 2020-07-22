/* eslint-disable import/no-cycle */
import {
  createStore, Store as VuexStore, CommitOptions, DispatchOptions, ActionContext,
} from 'vuex';
import { state } from './state';
import { mutations, Mutations } from './mutations';
import { actions, Actions } from './actions';
import { getters, Getters } from './getters';
import user, { UserMutations } from './user';
import { UserActions } from './user/actions';

export const store = createStore({
  state,
  mutations,
  actions,
  getters,
  modules: {
    user,
  },
});

export type MutationsCombination = Mutations & UserMutations

export type ActionsCombination = Actions & UserActions

const stateCombination = {
  ...state,
  user: user.state,
};

export type Store = Omit<
  VuexStore<typeof stateCombination>,
  'getters' | 'commit' | 'dispatch'
  > & {
    commit<K extends keyof MutationsCombination, P extends Parameters<MutationsCombination[K]>[1]>(
      key: K,
      payload: P,
      options?: CommitOptions
    ): ReturnType<MutationsCombination[K]>;
  } & {
    dispatch<K extends keyof ActionsCombination>(
      key: K,
      payload: Parameters<ActionsCombination[K]>[1],
      options?: DispatchOptions
    ): ReturnType<ActionsCombination[K]>;
  } & {
    getters: {
      [K in keyof Getters]: ReturnType<Getters[K]>
    };
  };

export function useStore() {
  return store as Store;
}
