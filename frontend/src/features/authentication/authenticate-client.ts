import { IAccount } from '@/types/client';
import axios from 'axios';

export const authenticateClient = async (email: string, password: string) => {
  const { data } = await axios.post<IAccount>('/api/login', {
    email,
    password
  });
  return data;
};
