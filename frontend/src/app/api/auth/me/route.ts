import { COOKIES_NAME } from '@/config/constants';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const cookieStore = cookies();

  const token = cookieStore.get(COOKIES_NAME.TOKEN);

  if (!token) {
    return NextResponse.json(
      {
        message: 'Unauthorized'
      },
      {
        status: 401
      }
    );
  }
  try {
    verify(token.value, process.env.JWT_SECRET || '');

    const response = {
      user: 'Authenticated!'
    };

    return new Response(JSON.stringify(response), {
      status: 200
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Something went wrong!'
      },
      {
        status: 400
      }
    );
  }
};
