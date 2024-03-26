import { NextRequest, NextResponse } from 'next/server';
// import 'reflect-metadata';

export function middleware(request: NextRequest) {
  return NextResponse.next();
}
