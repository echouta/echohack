import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Used in server code: pages, route handlers, server actions
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        // How Supabase reads the login cookies from the incoming request
        getAll() {
          return cookieStore.getAll();
        },
        // How Supabase saves updated cookies
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Pages aren't allowed to set cookies, only to read them.
            // That's fine: proxy.ts handles refreshing them instead.
          }
        },
      },
    }
  );
}