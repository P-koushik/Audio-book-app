export const ROUTES = {
  LOGIN: 'Login',
  SIGN_UP: 'SignUp',
  FORGOT_PASSWORD: 'ForgotPassword',
  AUTH: 'Auth',
  APP: 'App',
  PROFILE: 'Profile',
  SEARCH: 'Search',
  ADD: 'Add',
} as const;

export type AuthScreenRoute =
  | typeof ROUTES.LOGIN
  | typeof ROUTES.SIGN_UP
  | typeof ROUTES.FORGOT_PASSWORD;

export type RootRoute = typeof ROUTES.AUTH | typeof ROUTES.APP;

export type AppTabRoute = typeof ROUTES.PROFILE | typeof ROUTES.SEARCH | typeof ROUTES.ADD;
