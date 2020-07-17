/* eslint-disable import/no-cycle */
import { MutationTree } from 'vuex';
import { State } from './state';

export enum MutationTypes {
  SET_COUNTER = 'SET_COUNTER',
}

export type Mutations<S = State> = {
  [MutationTypes.SET_COUNTER](state: S, payload: number): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_COUNTER](state, payload: number) {
    state.counter = payload;
  },
};
