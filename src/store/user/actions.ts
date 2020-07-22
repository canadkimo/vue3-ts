/* eslint-disable import/no-cycle */
import { ActionTree, ActionContext } from 'vuex';
import { getUserBasicInfo } from '@/api/user';
import { UserState } from './state';
import { State } from '../state';
import { UserMutationTypes, UserMutations } from './mutations';

export enum UserActionTypes {
  GET_USER_BASIC_INFO = 'user/GET_USER_BASIC_INFO'
}

export type ArgumentedActionContext = Omit<ActionContext<UserState, State>, 'commit'> & {
  commit<K extends keyof UserMutations>(
    key: K,
    payload: Parameters<UserMutations[K]>[1],
  ): ReturnType<UserMutations[K]>;
};

export interface UserActions {
  [UserActionTypes.GET_USER_BASIC_INFO](
    { commit }: ArgumentedActionContext,
    userID: string
  ): void;
}

export const actions: ActionTree<UserState, State> & UserActions = {
  async [UserActionTypes.GET_USER_BASIC_INFO]({ commit }, userID: string) {
    const response = await getUserBasicInfo(userID);
    if (response.isSuccess) {
      commit(UserMutationTypes.SET_BASIC_INFO, response.data);
    }
  },
};
