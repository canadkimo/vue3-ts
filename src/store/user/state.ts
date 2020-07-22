import { UserBasicInfo } from '@/api/user';

export interface UserState {
  basicInfo: UserBasicInfo | null;
}

export const state: UserState = {
  basicInfo: null,
};
