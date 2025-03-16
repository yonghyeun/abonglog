import { type NextRequest } from "next/server";

import { updateSession } from "@/shared/route/supabaseMiddleware";

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);
  response.headers.set("X-Robots-Tag", "all");
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    // "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/write/:path*",
    "/temp/:path*"
  ]
};
