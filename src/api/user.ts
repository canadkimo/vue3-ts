import { axiosInstance, ServiceReturn, getServerError } from '@/api/axios';

export interface UserBasicInfo {
  userID: string;
  firstName: string;
  surName: string;
  email: string;
}

export const getUserBasicInfo = async (userID: string) => {
  let result: ServiceReturn<UserBasicInfo> = {
    isSuccess: false,
    error: null,
  };
  try {
    const response = await axiosInstance.get(`/${userID}/users`);
    if (response.data) {
      const { profile, _id } = response.data;
      result = {
        isSuccess: true,
        data: {
          userID: _id.$id,
          firstName: profile.first_name,
          surName: profile.surname,
          email: profile.email,
        },
      };
    }
  } catch (error) {
    result.error = getServerError(error);
  }
  return result;
};
