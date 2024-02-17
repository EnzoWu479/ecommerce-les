import { sign } from 'crypto';
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

  // const token = sign(
  //   secret,
  //   {
  //     email
  //   },
  //   {}
  // );
};
