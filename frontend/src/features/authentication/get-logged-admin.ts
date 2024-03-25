import axios from 'axios';

export const getLoggedClient = async (): Promise<boolean> => {
  const { data } = await axios.get('/api/me/admin');
  return true;
};
