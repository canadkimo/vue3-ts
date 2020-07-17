import { state, UserState as State } from './state';
import { actions, UserActions as Actions } from './actions';
import { mutations, UserMutations as Mutations } from './mutations';

export default {
  state,
  actions,
  mutations,
};

export type UserMutations = Mutations;
export type UserActions = Actions;
export type UserState = State;
