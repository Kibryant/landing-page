import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";

export async function middleware(req: NextRequest) {
  // const token = req.cookies.get("auth-token");
  const token = req.cookies.get("auth_token")?.value;
  const url = req.url;
  // console.log(token);
  console.log("token::: " + token);

  const verifiedToken = !!token && (await verifyAuth(token));
  if (req.nextUrl.pathname.startsWith("/login-adm") && !verifiedToken) {
    return;
  }
  if (!verifiedToken) {
    return NextResponse.redirect(new URL("/login-adm", url));
  }

  console.log("VERIFIED TOKEN: " + verifiedToken);

  // if(!verifiedToken) {
  //   if(req.nextUrl.pathname.startsWith("/api/adm")) {
  //     NextResponse.json({
  //       error: true,
  //       message: "authentication required",
  //       status: 401
  //     })
  //   }
  // }

  if (req.nextUrl.pathname.startsWith("/login-adm") && verifiedToken) {
    return NextResponse.redirect(new URL("/adm", url));
  }

  // if (url.startsWith("/adm/products") && !verifiedToken) {
  //   return NextResponse.redirect(new URL("/login-adm", url));
  // }
}

export const config = {
  matcher: ["/login-adm", "/adm"]
};
