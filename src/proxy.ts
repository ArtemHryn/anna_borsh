import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((request) => {
  const isCabinetPage = request.nextUrl.pathname.startsWith("/cabinet");

  if (isCabinetPage && request.auth?.authError === "RefreshAccessTokenError") {
    const loginUrl = new URL("/login", request.nextUrl);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.href);
    return NextResponse.redirect(loginUrl);
  }

  const isAuthPage = [
    "/login",
    "/registration",
    "/restore-password",
    "/verify-email",
  ].includes(request.nextUrl.pathname);

  if (
    isAuthPage &&
    request.auth?.accessToken &&
    request.auth.authError !== "RefreshAccessTokenError"
  ) {
    const destination =
      request.auth.user?.role === "ADMIN"
        ? "/cabinet/admin/products"
        : "/cabinet/user/products";

    return NextResponse.redirect(new URL(destination, request.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/login", "/registration", "/cabinet", "/cabinet/:path*"],
};
