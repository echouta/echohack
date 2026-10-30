import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  // Not logged in? Send them to the login page
  if (!data?.claims) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-blue-900 text-white">
      <h1 className="text-3xl font-bold">You're logged in</h1>
      <p className="mt-2">{data.claims.email}</p>
    </main>
  );
}