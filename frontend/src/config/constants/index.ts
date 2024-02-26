const COOKIE_PREFIX = '@MySiteJWT';
export const MAX_AGE = 60 * 60 * 24 * 30;
export const COOKIES_NAME = {
  TOKEN: `${COOKIE_PREFIX}_TOKEN`
};
export const API_PUBLIC_ROUTES = [
  "/login",
]