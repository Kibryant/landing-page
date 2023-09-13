import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth-token")?.value;

  const verifiedToken = !!token && (await verifyAuth(token));
  console.log("VERIFIED TOKEN: " + verifiedToken);

  if (req.nextUrl.pathname.startsWith("/login-adm") && !verifiedToken) {
    return;
  }

  const url = req.url;

  // if(!verifiedToken) {
  //   if(req.nextUrl.pathname.startsWith("/api/adm")) {
  //     NextResponse.json({
  //       error: true,
  //       message: "authentication required",
  //       status: 401
  //     })
  //   }
  // }

  if (url.startsWith("/login-adm") && verifiedToken) {
    return NextResponse.redirect(new URL("/adm", url));
  }

  if (!verifiedToken) {
    return NextResponse.redirect(new URL("/login-adm", url));
  }
}

export const config = {
  matcher: ["/login-adm", "/adm"]
};