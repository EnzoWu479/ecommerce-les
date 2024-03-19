import { create, createStore } from 'zustand';

export interface AuthStore {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const useAuthStore = create<AuthStore>(set => ({
  isAuthenticated: false,
  setIsAuthenticated: isAuthenticated => set({ isAuthenticated })
}));
