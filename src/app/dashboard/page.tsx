import { Suspense } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// The page itself: this outer shell can be prerendered
export default function DashboardPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-blue-900 text-white">
      <Suspense fallback={<p>Loading...</p>}>
        <UserInfo />
      </Suspense>
    </main>
  );
}

// The per-person part: reads cookies, so it runs fresh for each visitor
async function UserInfo() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (!data?.claims) {
    redirect("/login");
  }

  return (
    <>
      <h1 className="text-3xl font-bold">You're logged in</h1>
      <p className="mt-2">{data.claims.email}</p>
    </>
  );
}