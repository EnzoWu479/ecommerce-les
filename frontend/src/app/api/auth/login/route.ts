import { COOKIES_NAME, MAX_AGE } from '@/config/constants';
import { serialize } from 'cookie';
import { sign } from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  const body = await request.json();
  const { email, password } = body;

  if (email !== 'admin' || password !== 'admin') {
    return NextResponse.json(
      {
        message: 'Unauthorized'
      },
      {
        status: 401
      }
    );
  }
  const secret = process.env.JWT_SECRET || '';

  const token = sign(
    {
      email
    },
    secret,
    {
      expiresIn: MAX_AGE
    }
  );
  const seralized = serialize(COOKIES_NAME.TOKEN, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: MAX_AGE,
    path: '/'
  });
  const response = {
    message: 'Authenticated!'
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { 'Set-Cookie': seralized }
  });
};
