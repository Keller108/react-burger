export const SHOP_ROUTE = '/';
export const LOGIN_ROUTE = '/login';
export const REGISTER_ROUTE = '/register';
export const FORGOT_ROUTE = '/forgot-password';
export const RESET_ROUTE = '/reset-password';
export const PROFILE_ROUTE = '/profile';
export const FEED_ROUTE = '/feed';
export const ORDERS_ROUTE = '/orders';

export const BASE_URL = 'https://norma.nomoreparties.space/api';

export const REGISTER_URL = `${BASE_URL}/auth/register`;
export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const LOGOUT_URL = `${BASE_URL}/auth/logout`;
export const USER_URL = `${BASE_URL}/auth/user`;
export const TOKEN_URL = `${BASE_URL}/auth/token`;

export const FORGOT_URL = `${BASE_URL}/password-reset`;
export const PASSWORD_RESET_URL = `${BASE_URL}/password-reset/reset`;

export const INGREDIENTS_PATH = `${BASE_URL}/ingredients`;
export const ORDERS_PATH = `${BASE_URL}/orders`;

export const ORDERS_FEED_PATH = 'wss://norma.nomoreparties.space/orders/all';