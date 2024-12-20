import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import getDb from "./models/server/dbSetup";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  await Promise.all([getDb()]);
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
