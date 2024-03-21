const COOKIE_PREFIX = '@LERMUNDO';
export const MAX_AGE = 60 * 60 * 24 * 30;
export const COOKIES_NAME = {
  ACCESS_TOKEN_ADMIN: `${COOKIE_PREFIX}_TOKEN_ADMIN`,
  TOKEN: `${COOKIE_PREFIX}_TOKEN_CLIENT`
};
export const API_PUBLIC_ROUTES = [
  "/login",
]