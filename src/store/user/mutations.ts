import { MutationTree } from 'vuex';
import { UserBasicInfo } from '@/api/user';
import { UserState } from './state';

export enum UserMutationTypes {
  SET_BASIC_INFO = 'user/SET_BASIC_INFO'
}

export type UserMutations<S = UserState> = {
  [UserMutationTypes.SET_BASIC_INFO](state: S, userInfo: UserBasicInfo): void;
};

export const mutations: MutationTree<UserState> & UserMutations = {
  [UserMutationTypes.SET_BASIC_INFO](state, userInfo: UserBasicInfo) {
    state.basicInfo = userInfo;
  },
};
