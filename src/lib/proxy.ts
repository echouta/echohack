import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

// Next.js runs this before every matching request
export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  // Run on every page EXCEPT images and Next.js's internal files,
  // which don't need a login check
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};