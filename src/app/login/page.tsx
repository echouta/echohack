"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);

  async function signInWithGoogle() {
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    // If Supabase refused, show the reason instead of failing silently
    if (error) {
      setError(error.message);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-blue-900">
      <button
        onClick={signInWithGoogle}
        className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-900 hover:bg-blue-100"
      >
        Sign in with Google
      </button>
      {error && <p className="mt-4 text-red-300">{error}</p>}
    </main>
  );
}