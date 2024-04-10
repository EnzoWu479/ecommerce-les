import { ENV } from '@/config/env';
import { AccountRoles } from '@prisma/client';
import jwt from 'jsonwebtoken';

export interface JWTResponse {
  infos: InfoProps;
}
interface InfoProps {
  id: string;
  role: AccountRoles[];
}
const sign = (infos: InfoProps) => {
  const token = jwt.sign({ infos }, ENV.secret_key || '');
  return token;
};
const verify = <T>(token: string) => {
  const response = jwt.verify(token, ENV.secret_key || '');

  return JSON.parse(JSON.stringify(response)) as JWTResponse;
};
const extract = <T>(token: string) => {
  const response = jwt.decode(token);

  return JSON.parse(JSON.stringify(response)) as JWTResponse;
};
export const jwtService = {
  sign,
  verify,
  extract
};
