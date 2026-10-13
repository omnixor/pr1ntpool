import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { homeFor, roleOf, type Role } from "@/lib/supabase";

export function Placeholder({ role, title, text }: { role: Role; title: string; text: string }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) navigate({ to: "/login", replace: true });
    else if (roleOf(user) !== role) navigate({ to: homeFor(roleOf(user)), replace: true });
  }, [user, loading, role, navigate]);

  if (loading || !user) return null;
  const name = (user.user_metadata?.["name"] as string) || user.email;
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <p className="text-sm font-medium text-primary">Hi, {name}</p>
      <h1 className="mt-1 text-3xl font-bold">{title}</h1>
      <div className="mt-6 rounded-2xl border border-dashed border-border bg-muted p-10 text-center text-muted-foreground">
        {text}
      </div>
    </main>
  );
}
