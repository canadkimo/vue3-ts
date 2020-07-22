/* eslint-disable import/no-cycle */
import { ActionTree, ActionContext } from 'vuex';
import { MutationTypes, Mutations } from './mutations';
import { State } from './state';

export enum ActionTypes {
  GET_COUNTER = 'GET_COUNTER'
}

export type ArgumentedActionContext = Omit<ActionContext<State, State>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>;
};

export interface Actions {
  [ActionTypes.GET_COUNTER](
    { commit }: ArgumentedActionContext,
    payload: number
  ): Promise<number>;
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.GET_COUNTER]({ commit }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = 256;
        commit(MutationTypes.SET_COUNTER, data);
        resolve(data);
      }, 500);
    });
  },
};
