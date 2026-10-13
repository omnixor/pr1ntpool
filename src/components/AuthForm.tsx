import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { homeFor, roleOf, supabase, type Role } from "@/lib/supabase";
import { cn } from "@/lib/utils";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("customer");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) {
      toast.error("Accounts aren't connected yet. Please connect the backend first.");
      return;
    }
    setBusy(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { role, name }, emailRedirectTo: window.location.origin + "/login" },
        });
        if (error) throw error;
        if (!data.session) return setSent(true);
        navigate({ to: homeFor(roleOf(data.user)) });
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: homeFor(roleOf(data.user)) });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  if (sent)
    return (
      <Card>
        <h1 className="text-2xl font-bold">Check your email</h1>
        <p className="mt-2 text-muted-foreground">
          We sent a confirmation link to {email}. Confirm it, then log in.
        </p>
      </Card>
    );

  return (
    <Card>
      <h1 className="text-2xl font-bold">{mode === "signup" ? "Create your account" : "Welcome back"}</h1>
      <form onSubmit={submit} className="mt-6 space-y-4">
        {mode === "signup" && (
          <>
            <div className="grid grid-cols-2 gap-2">
              {(["customer", "shop"] as Role[]).map((r) => (
                <Button
                  type="button"
                  variant="outline"
                  key={r}
                  onClick={() => setRole(r)}
                  className={cn(
                    "h-auto rounded-2xl border p-3 text-left text-sm transition flex-col items-start gap-1 whitespace-normal",
                    role === r ? "border-primary bg-accent text-accent-foreground" : "border-border",
                  )}
                >
                  <div className="font-semibold">{r === "customer" ? "Customer" : "Print shop"}</div>
                  <div className="text-xs text-muted-foreground">
                    {r === "customer" ? "Start or join pools" : "Fulfil pool orders"}
                  </div>
                </Button>
              ))}
            </div>
            <Field label="Name">
              <Input required value={name} onChange={(e) => setName(e.target.value)} />
            </Field>
          </>
        )}
        <Field label="Email">
          <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <Field label="Password">
          <Input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
        </Field>
        <Button type="submit" className="w-full rounded-full" disabled={busy}>
          {busy ? "Please wait…" : mode === "signup" ? "Sign up" : "Log in"}
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        {mode === "signup" ? "Already have an account? " : "New here? "}
        <Link to={mode === "signup" ? "/login" : "/signup"} className="font-medium text-primary">
          {mode === "signup" ? "Log in" : "Sign up"}
        </Link>
      </p>
    </Card>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">{children}</div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
