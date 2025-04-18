import { auth } from "./auth";

export default auth((req) => {  //auth : current session in server-side context
  const isLoginPage = req.nextUrl.pathname.startsWith("/login");
  const isAuthUser = !!req.auth;
  if (isLoginPage) {
    if (isAuthUser) {
      return Response.redirect(new URL("/", req.url));  // if user authenticated, move away from login to home
    }
    return null;
  }
  if (!isAuthUser) {  //if not authenticated, move from protected page to login page
    return Response.redirect(new URL("/login", req.url));
  }
});

export const config = {
    matcher : ["/", "/editor/:path", "/login"],  //pages on which middleware works
};
