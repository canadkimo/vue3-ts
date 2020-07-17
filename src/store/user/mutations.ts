import { MutationTree } from 'vuex';
import { UserState } from './state';

export enum UserMutationTypes {
  SET_USER_ID = 'user/SET_USER_ID'
}

export type UserMutations<S = UserState> = {
  [UserMutationTypes.SET_USER_ID](state: S, userID: string): void;
};

export const mutations: MutationTree<UserState> & UserMutations = {
  [UserMutationTypes.SET_USER_ID](state, userID: string) {
    state.id = userID;
  },
};
