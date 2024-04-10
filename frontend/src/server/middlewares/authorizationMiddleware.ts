import { COOKIES_NAME } from '@/config/constants';
import { AccountRoles } from '@prisma/client';
import { verify } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers';
import { ResponseData } from '../shared/ResponseDataImp';
import { jwtService } from '../lib/jwt';

export const authorizationMiddleware = (roles: AccountRoles[]) => {
  const middleware = async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: () => Promise<void>
  ) => {
    const cookies = req.cookies;
    const token = cookies[COOKIES_NAME.TOKEN];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const response = jwtService.extract(token);
      const role = response.infos.role;

      if (!roles.some(r => role.includes(r))) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      next();
    } catch (error: any) {
      return res.status(400).json(new ResponseData(null, error.message, 400));
    }
  };
  return middleware;
};
