import bcrypt from 'bcrypt';


const generateHash = async (payload: string): Promise<string> => {
  return bcrypt.hash(payload, 8);
};
const compareHash = async (
  payload: string,
  hashed: string
): Promise<boolean> => {
  return bcrypt.compare(payload, hashed);
};

export const hashService = {
  generateHash,
  compareHash
};
