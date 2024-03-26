import { ENV } from '@/config/env';
import axios from 'axios';

export const api = axios.create({
  baseURL: ENV.baseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});
