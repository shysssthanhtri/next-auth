import { auth } from '@/auth';
import {
  apiAuthPrefix,
  authRoutes,
  homeRoute,
  loginRoute,
  publicRoutes,
} from '@/config/routes';

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) return null;
  if (isAuthRoute) {
    if (isLoggedIn) return Response.redirect(new URL(homeRoute, nextUrl));
    return null;
  }
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL(loginRoute, nextUrl));
  }
  return null;
});

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
