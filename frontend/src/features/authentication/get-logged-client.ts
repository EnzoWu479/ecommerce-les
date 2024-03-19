import axios from 'axios';

export const getLoggedClient = async (): Promise<boolean> => {
  const { data } = await axios.get('/api/auth/me');
  return true;
};
