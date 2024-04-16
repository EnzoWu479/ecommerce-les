import { ENV } from '@/config/env';
import axios from 'axios';
import { cookies } from 'next/headers';
import { config } from 'process';

export const api = axios.create({
  baseURL: ENV.baseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});
// set cookies
// api.interceptors.request.use(config => {
//   if (typeof document === 'undefined') {
//     config.headers['Cookie'] =
//   }
//   return config;
// });

let retry = false;
api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !retry) {
      if (!retry) {
        retry = true;

        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);
