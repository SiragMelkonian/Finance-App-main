import { updateSession } from "@/lib/supabase/middleware";
import { NextResponse } from "next/server";

export async function proxy(request) {
  const response = await updateSession(request);

  // ⚠️ user is usually attached via cookies/session
  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");
  const isLogin = request.nextUrl.pathname.startsWith("/login");

  // You need to read session from cookies instead of calling getUser directly
  const hasSession =
    request.cookies.get("sb-access-token") ||
    request.cookies.get("supabase-auth-token");

  // 🚫 Not logged in
  if (!hasSession && isDashboard) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ Already logged in
  if (hasSession && isLogin) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
