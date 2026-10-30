import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Google → Supabase → here, with ?code=... in the address
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    // Trade the one-time code for a real session (stored in cookies)
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}/dashboard`);
    }
  }

  // Something went wrong: send them back to try again
  return NextResponse.redirect(`${origin}/login?error=true`);
}