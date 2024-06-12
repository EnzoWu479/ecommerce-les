import { GeminiAi } from '@/server/lib/ai/adapter/impl/GeminiAi';
import { AIAdapter } from '@/server/lib/ai/adapter/interface';

const COOKIE_PREFIX = '@LERMUNDO';
export const MAX_AGE = 60 * 60 * 24 * 30;
export const COOKIES_NAME = {
  ACCESS_TOKEN_ADMIN: `${COOKIE_PREFIX}_TOKEN_ADMIN`,
  TOKEN: `${COOKIE_PREFIX}_TOKEN_CLIENT`
};
export const LOCAL_STORAGE_NAME = {
  USER: `${COOKIE_PREFIX}_USER`
};
export const API_PUBLIC_ROUTES = ['/login'];
export const SHIPPING_COSTS = [10, 12, 15, 20];
export const AI_ADAPTER: AIAdapter = new GeminiAi();
