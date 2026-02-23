import { auth } from "@/lib/auth/auth";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (session) {
    if (
      request.nextUrl.pathname.startsWith("/sign-in") ||
      request.nextUrl.pathname.startsWith("/sign-up")
    ) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    if (request.nextUrl.pathname.startsWith("/admin")) {
      if (session.user.role !== "admin") {
        const url = request.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
      }
    }
  }

  if (
    !session &&
    !request.nextUrl.pathname.startsWith("/sign-in") &&
    !request.nextUrl.pathname.startsWith("/sign-up")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
