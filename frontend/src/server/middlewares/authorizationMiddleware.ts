import { COOKIES_NAME } from '@/config/constants';
import { AccountRoles } from '@prisma/client';
import { verify } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers';

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
      const response = verify(token, process.env.JWT_SECRET || '');
      const { role } = response as { role: AccountRoles };

      if (!roles.includes(role)) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      next();
    } catch (error) {
      return res.status(400).json({ message: 'Something went wrong!' });
    }
  };
  return middleware;
};
