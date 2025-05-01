import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req) {
  const token = await getToken({ req, secret });
  const { pathname } = req.nextUrl;

  const isAuth = !!token;

  const isProtectedPath = pathname.startsWith("/profile");

  if (isProtectedPath && !isAuth) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  if (pathname === "/profile") {
    return NextResponse.redirect(new URL("/profile/tasks", req.url));
  }

  if (pathname === "/auth" && isAuth) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/auth"],
};
