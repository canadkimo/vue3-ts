import axios, { AxiosError, AxiosResponse } from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
});

export interface ServiceError {
  status?: number;
  message?: string;
  code?: string;
  response?: AxiosResponse | null;
}

type ServiceReturnSuccess<T> = {
  isSuccess: true;
  data: T;
  error?: null;
}

type ServiceReturnError = {
  isSuccess: false;
  data?: null;
  error: ServiceError | null;
}

export type ServiceReturn<T> = ServiceReturnSuccess<T> | ServiceReturnError;

export const getServerError = (error: AxiosError): ServiceError | null => {
  if (!error) {
    return null;
  }

  const serviceError: ServiceError = {
    status: error.response?.status,
    message: error.message,
    code: error.code,
    response: error.response,
  };

  return serviceError;
};
