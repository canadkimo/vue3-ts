/* eslint-disable import/no-cycle */
import { ActionTree } from 'vuex';
import { UserState } from './state';
import { State } from '../state';
import { ArgumentedActionContext } from '../actions';
import { UserMutationTypes } from './mutations';

export enum UserActionTypes {
  SET_USER_ID = 'user/SET_USER_ID'
}

export interface UserActions {
  [UserActionTypes.SET_USER_ID](
    { commit }: ArgumentedActionContext,
    payload: string
  ): void;
}

export const actions: ActionTree<UserState, State> = {
  [UserActionTypes.SET_USER_ID]({ commit }, userID: string) {
    commit(UserMutationTypes.SET_USER_ID, userID);
  },
};
