import { ENV } from '@/config/env';
import jwt from 'jsonwebtoken';

export interface JWTResponse<T> {
  infos: T;
}

const sign = <T>(infos: T) => {
  const token = jwt.sign({ infos }, ENV.secret_key || '');
  return token;
};
const verify = <T>(token: string) => {
  const response = jwt.verify(token, ENV.secret_key || '');

  return JSON.parse(JSON.stringify(response)) as JWTResponse<T>;
};
export const jwtService = {
  sign,
  verify
};
