import { NextResponse } from "next/server";
import {
  PROFILE_COMMON_PAGE,
  PROFILE_PAGE_AUTHORITIES,
} from "./constants/profile-pages";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  const token = await getToken({ req, secret });

  const isAuth = !!token;

  // If is already authenticated
  const isAuthPath = pathname.startsWith("/auth");

  if (isAuthPath && isAuth) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  // If is not authenticated
  const isProfilePath = pathname.startsWith("/profile");

  const isProtectedPath = isProfilePath; // in future use with "... || otherPath || otherPath ...""

  if (isProtectedPath && !isAuth) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  // If profile path
  if (isProtectedPath) {
    const profilePage = pathname.split("/").filter(Boolean)[1] || "";
    const userRole = token?.user?.role;
    const userAvailablePages = PROFILE_PAGE_AUTHORITIES[userRole];

    if (
      !userAvailablePages.includes(profilePage) &&
      !Object.values(PROFILE_COMMON_PAGE).includes(profilePage)
    ) {
      return NextResponse.redirect(
        new URL(`/profile/${userAvailablePages[0]}`, req.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/auth"],
};
