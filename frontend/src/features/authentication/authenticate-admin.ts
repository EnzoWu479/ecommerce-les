import { api } from '@/lib/axios';
import axios from 'axios';

export const authenticateAdmin = async (
  email: string,
  password: string
): Promise<boolean> => {
  try {
    await api.post('/api/login/admin', {
      email,
      password
    });
    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
};
