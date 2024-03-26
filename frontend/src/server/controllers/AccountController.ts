import { AccountRoles, PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import container from '../lib/inversify/container';
import { sign, verify } from 'jsonwebtoken';
import { serialize } from 'cookie';
import { COOKIES_NAME, MAX_AGE } from '@/config/constants';
import { AccountRepository } from '../repositories/AccountRepository';
import { inject, injectable } from 'inversify';
import { ResponseData } from '../shared/ResponseDataImp';
import { accountSchema } from '../validations/account.schema';
import { NextHandler } from 'next-connect';
import { ENV } from '@/config/env';
import { hashService } from '@/server/lib/bcrypt';
import { jwtService } from '../lib/jwt';
import { SingletonClass } from '../singleton/SingletonClass';

// @injectable()
export class AccountController {
  private accountRepository: AccountRepository;

  constructor() {
    this.accountRepository = SingletonClass.getInstance(AccountRepository);
  }

  public async login(
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextHandler,
    role: AccountRoles
  ) {
    try {
      const { email, password } = accountSchema.parse(req.body);
      console.log(this.accountRepository !== undefined);

      const account = await this.accountRepository.findByEmail(email);
      const error = new ResponseData(null, 'Email ou senha incorretos', 401);
      if (!account) {
        return res
          .status(400)
          .json(new ResponseData(null, 'Email ou senha incorretos', 400));
      }

      if (!account.roles.includes(role)) {
        return res.status(401).json(error);
      }

      const isPasswordValid = await hashService.compareHash(
        password,
        account.password
      );

      if (!isPasswordValid) {
        return res.status(400).json(error);
      }

      const token = jwtService.sign({ id: account.id, role: account.roles });

      const cookieName =
        role === AccountRoles.ADMIN
          ? COOKIES_NAME.ACCESS_TOKEN_ADMIN
          : COOKIES_NAME.TOKEN;

      res.setHeader(
        'Set-Cookie',
        serialize(`${cookieName}`, token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: MAX_AGE,
          path: '/'
        })
      );

      res.status(200).json({ message: 'Logged in' });
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  }

  public async logout(
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextHandler,
    role: AccountRoles
  ) {
    const cookieName =
      role === AccountRoles.ADMIN
        ? COOKIES_NAME.ACCESS_TOKEN_ADMIN
        : COOKIES_NAME.TOKEN;
    res.setHeader(
      'Set-Cookie',
      serialize(cookieName, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(0),
        path: '/'
      })
    );

    res.status(200).json({ message: 'Logged out' });
  }

  public async me(
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextHandler,
    role: AccountRoles
  ) {
    const cookieName =
      role === AccountRoles.ADMIN
        ? COOKIES_NAME.ACCESS_TOKEN_ADMIN
        : COOKIES_NAME.TOKEN;
    const token = req.cookies[cookieName];

    if (!token) {
      return res.status(401).json({ message: 'Unaut' });
    }
    try {
      const infos = jwtService.verify<{ id: string; role: AccountRoles }>(
        token
      );
      // verify(token.value, process.env.JWT_SECRET || '');

      const response = {
        user: 'Authenticated!'
      };

      return new Response(JSON.stringify(response), {
        status: 200
      });
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
      // return NextResponse.json(
      //   {
      //     message: 'Something went wrong!'
      //   },
      //   {
      //     status: 400
      //   }
      // );
    }
    try {
    } catch (error) {}
  }
}
