import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth-token")?.value;
}

export const config = {
  matcher: ["/adm", "/login-adm"]
};
