'use client';
import { COOKIES_NAME, LOCAL_STORAGE_NAME } from '@/config/constants';
import { IAccount } from '@/types/client';
import { Account } from '@prisma/client';
import { cookies } from 'next/headers';
import { create, createStore } from 'zustand';

export interface AuthStoreClient {
  isAuthenticated: boolean;
  user: IAccount | null;
  setUser: (user: IAccount) => void;
  login: (user: IAccount) => void;
  logout: () => void;
}

const storage = typeof localStorage != 'undefined' ? localStorage : null;

export const useAuthStoreClient = create<AuthStoreClient>(set => ({
  isAuthenticated: !!storage?.getItem(LOCAL_STORAGE_NAME.USER) || false,
  user: storage?.getItem(LOCAL_STORAGE_NAME.USER)
    ? JSON.parse(storage?.getItem(LOCAL_STORAGE_NAME.USER) as string)
    : null,
  setUser: user => set({ user }),
  login: (user: IAccount) =>
    set(() => {
      storage?.setItem(LOCAL_STORAGE_NAME.USER, JSON.stringify(user));
      return { isAuthenticated: true, user };
    }),
  logout: () => {
    storage?.removeItem(LOCAL_STORAGE_NAME.USER);
    set({ isAuthenticated: false, user: null });
  }
}));
