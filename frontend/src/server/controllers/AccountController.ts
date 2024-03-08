import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import container from '../lib/inversify/container';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';
import { COOKIES_NAME } from '@/config/constants';
import { compare } from 'bcrypt';

export class AccountController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = container.get<PrismaClient>(PrismaClient);
  }

  public static async login(req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = req.body;
    const account = await prisma?.account.findUnique({
      where: { email }
    });

    if (!account) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await compare(password, account.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = sign({ role: account.roles }, process.env.JWT_SECRET || '');

    res.setHeader(
      'Set-Cookie',
      serialize(COOKIES_NAME.TOKEN, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/'
      })
    );

    res.status(200).json({ message: 'Logged in' });
  }

  public static async logout(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader(
      'Set-Cookie',
      serialize(COOKIES_NAME.TOKEN, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(0),
        path: '/'
      })
    );

    res.status(200).json({ message: 'Logged out' });
  }
}
