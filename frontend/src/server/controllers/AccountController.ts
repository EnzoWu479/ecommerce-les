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
import { changePasswordSchema } from '../validations/changePassword.schema';

// @injectable()
export class AccountController {
  private accountRepository: AccountRepository;

  constructor() {
    this.accountRepository = SingletonClass.getInstance(AccountRepository);
    this.changeClientPassword = this.changeClientPassword.bind(this);
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

      res.status(200).json(account);
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
  public async changePassword(req: NextApiRequest, res: NextApiResponse) {
    const body = changePasswordSchema.parse(req.body);

    const account = await this.accountRepository.findById(body.accountId);

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    const isPasswordValid = await hashService.compareHash(
      body.password,
      account.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const newPassword = await hashService.generateHash(body.newPassword);

    await this.accountRepository.update(account.id, {
      password: newPassword
    });

    return res.status(200).json({ message: 'Password changed' });
  }
  public async changeClientPassword(req: NextApiRequest, res: NextApiResponse) {
    const clientId = req.query.id as string;
    const body = changePasswordSchema.parse(req.body);

    const account = await this.accountRepository.findByClientId(clientId);

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    const isPasswordValid = await hashService.compareHash(
      body.password,
      account.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const newPassword = await hashService.generateHash(body.newPassword);

    await this.accountRepository.update(account.id, {
      password: newPassword
    });

    return res.status(200).json({ message: 'Password changed' });
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
